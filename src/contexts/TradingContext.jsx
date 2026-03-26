import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc, updateDoc, addDoc, collection, query, where, orderBy, getDocs, limit } from "firebase/firestore";

const TradingContext = createContext(null);
export function useTrading() { return useContext(TradingContext); }

// Google Sheet URLs (same as screener)
const SHEET_URLS = [
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWUEPUEjhHmatIkwy4lF0pCpYk-RWQJHH_GZ411Of1Up4zCI3rc3LAFg19swY08w/pub?gid=1599136282&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQBPcckfsQIkHnfPAYyPpd8jA1mqxzJ1W8hSZNcBW6iaUY9CmXDmh4c5bOt-wD5OQ/pub?gid=1658167544&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSw_stoaW3BHQHRxFQ7diKSYNlvMXVLdUTV7KCBb5csfV4GzQXI_KGud1-K5Hnejg/pub?gid=622298709&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTke5GvwzNkNMr7rZKBChTDFJPjrQVCQB7k1b_GEQNk8KP0rHaXKF3E9TG2PhbxFg/pub?gid=1801034194&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQo9NjMnHRhnN1vAfM0cRrvv6IP7UR30CGxndhpY9PYXsr3ggfobMyhrKL4Y95JLw/pub?gid=1895357848&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7CYrXwr7nRLPEI6ZOMoPT7xvXrlGqrFh6H9oC0UC8f-pvBzbb3MQO1ccaHEVMyw/pub?gid=552844866&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQpepRxJUI-Fynqhm2-n8dG2K9IrFLF0fkNqdPRhBGoNWp7w62ap7bjbECMduw8GQ/pub?gid=1752521968&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR52dP2TD6nhc5rQT-kRRFaEJuAd-TSfV6R-VNiG_R0ZeuCWON4yLxggBhgDazX9w/pub?gid=1150140572&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSBnH5HenBIIoJy1wSzZ-9WQD_qLRShVwjQxiAdLaTViIjQqp7VaaU9RZdTLz8HkQ/pub?gid=492047007&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmqZUnHTC1OfyTzwol5zGyJDCEyN62AtdCrt0UrM887HM_XiMlxR9qrihd78fDlg/pub?gid=731384708&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeuAbIc_CApwpArmzQN6MoQgX5F-Yav3sCeoHVMr_iNoFrZh3254clwToZX6bQ7w/pub?gid=291369928&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ30258x7S01ezbwOFQJ5dzYaZRiyO0qOA1k7ZyylPS-_GoVcBaG0C59gX4X9pk9Q/pub?gid=1798672369&single=true&output=csv",
];

function parseCSV(text) {
  const rows = text.split("\n").slice(1).filter(r => r.trim());
  const data = {};
  for (const row of rows) {
    const cols = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    const clean = cols.map(c => c.replace(/^"|"$/g, "").trim());
    if (clean.length >= 6 && clean[0]) {
      data[clean[0]] = {
        symbol: clean[0], name: clean[1] || clean[0], sector: clean[2] || "",
        ltp: parseFloat(clean[4]) || 0, change: parseFloat(clean[5]) || 0,
      };
    }
  }
  return data;
}

const DEFAULT_CAPITALS = [100000, 500000, 1000000, 2500000, 5000000, 10000000];

export function TradingProvider({ children }) {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null); // { cash, holdings: [{symbol,qty,avgPrice}], createdAt, startingCapital }
  const [transactions, setTransactions] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [stockPrices, setStockPrices] = useState({});
  const [pricesLoading, setPricesLoading] = useState(true);
  const [portfolioLoading, setPortfolioLoading] = useState(true);

  // Fetch stock prices from Google Sheets
  const fetchPrices = useCallback(async () => {
    try {
      const results = await Promise.allSettled(
        SHEET_URLS.map(url => fetch(url).then(r => r.text()))
      );
      const merged = {};
      for (const r of results) {
        if (r.status === "fulfilled") Object.assign(merged, parseCSV(r.value));
      }
      if (Object.keys(merged).length > 0) {
        setStockPrices(merged);
        setPricesLoading(false);
        return merged;
      }
    } catch (e) { console.error("Price fetch error:", e); }
    setPricesLoading(false);
    return stockPrices;
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 3 * 60 * 1000); // refresh every 3 min
    return () => clearInterval(interval);
  }, [fetchPrices]);

  // Load portfolio from Firestore
  useEffect(() => {
    if (!user) { setPortfolio(null); setTransactions([]); setWatchlist([]); setPortfolioLoading(false); return; }
    async function load() {
      try {
        // Portfolio
        const pRef = doc(db, "mock_portfolios", user.uid);
        const pSnap = await getDoc(pRef);
        if (pSnap.exists()) setPortfolio(pSnap.data());
        else setPortfolio(null); // needs setup

        // Transactions
        const tQuery = query(
          collection(db, "mock_transactions"),
          where("userId", "==", user.uid),
          orderBy("timestamp", "desc"),
          limit(100)
        );
        const tSnap = await getDocs(tQuery);
        setTransactions(tSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        // Watchlist
        const wRef = doc(db, "mock_watchlists", user.uid);
        const wSnap = await getDoc(wRef);
        if (wSnap.exists()) setWatchlist(wSnap.data().symbols || []);
      } catch (e) { console.error("Portfolio load error:", e); }
      setPortfolioLoading(false);
    }
    load();
  }, [user]);

  // Create new portfolio
  async function createPortfolio(startingCapital) {
    if (!user) return;
    const p = {
      userId: user.uid,
      cash: startingCapital,
      holdings: [],
      startingCapital,
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, "mock_portfolios", user.uid), p);
    setPortfolio(p);
    // Update leaderboard
    await setDoc(doc(db, "mock_leaderboard", user.uid), {
      userId: user.uid,
      displayName: user.displayName || user.email?.split("@")[0] || "Anonymous",
      photoURL: user.photoURL || "",
      startingCapital,
      currentValue: startingCapital,
      returnPct: 0,
      updatedAt: new Date().toISOString(),
    });
  }

  // Reset portfolio
  async function resetPortfolio(startingCapital) {
    if (!user) return;
    await createPortfolio(startingCapital);
    setTransactions([]);
  }

  // Buy stock
  async function buyStock(symbol, quantity, pricePerShare) {
    if (!user || !portfolio) return { success: false, error: "No portfolio" };
    const totalCost = quantity * pricePerShare;
    if (totalCost > portfolio.cash) return { success: false, error: `Insufficient funds. Need ₹${totalCost.toLocaleString("en-IN")} but only have ₹${portfolio.cash.toLocaleString("en-IN")}` };
    if (quantity <= 0) return { success: false, error: "Quantity must be positive" };

    // Update holdings
    const holdings = [...portfolio.holdings];
    const existing = holdings.find(h => h.symbol === symbol);
    if (existing) {
      const totalQty = existing.qty + quantity;
      existing.avgPrice = ((existing.avgPrice * existing.qty) + (pricePerShare * quantity)) / totalQty;
      existing.qty = totalQty;
    } else {
      const stockInfo = stockPrices[symbol];
      holdings.push({ symbol, qty: quantity, avgPrice: pricePerShare, name: stockInfo?.name || symbol, sector: stockInfo?.sector || "" });
    }

    const newCash = portfolio.cash - totalCost;
    const updated = { ...portfolio, cash: newCash, holdings };

    // Save to Firestore
    await updateDoc(doc(db, "mock_portfolios", user.uid), { cash: newCash, holdings });

    // Record transaction
    const tx = {
      userId: user.uid, type: "BUY", symbol, quantity, price: pricePerShare,
      total: totalCost, timestamp: new Date().toISOString(),
      name: stockPrices[symbol]?.name || symbol,
    };
    const txRef = await addDoc(collection(db, "mock_transactions"), tx);
    setTransactions(prev => [{ id: txRef.id, ...tx }, ...prev]);
    setPortfolio(updated);

    // Update leaderboard
    updateLeaderboard(updated);

    return { success: true };
  }

  // Sell stock
  async function sellStock(symbol, quantity, pricePerShare) {
    if (!user || !portfolio) return { success: false, error: "No portfolio" };
    const holding = portfolio.holdings.find(h => h.symbol === symbol);
    if (!holding) return { success: false, error: `You don't own any ${symbol}` };
    if (quantity > holding.qty) return { success: false, error: `You only have ${holding.qty} shares of ${symbol}` };
    if (quantity <= 0) return { success: false, error: "Quantity must be positive" };

    const totalReceived = quantity * pricePerShare;
    const holdings = portfolio.holdings.map(h => {
      if (h.symbol === symbol) return { ...h, qty: h.qty - quantity };
      return h;
    }).filter(h => h.qty > 0);

    const newCash = portfolio.cash + totalReceived;
    const updated = { ...portfolio, cash: newCash, holdings };

    await updateDoc(doc(db, "mock_portfolios", user.uid), { cash: newCash, holdings });

    const tx = {
      userId: user.uid, type: "SELL", symbol, quantity, price: pricePerShare,
      total: totalReceived, timestamp: new Date().toISOString(),
      name: stockPrices[symbol]?.name || symbol,
      pnl: (pricePerShare - (holding.avgPrice || 0)) * quantity,
    };
    const txRef = await addDoc(collection(db, "mock_transactions"), tx);
    setTransactions(prev => [{ id: txRef.id, ...tx }, ...prev]);
    setPortfolio(updated);

    updateLeaderboard(updated);
    return { success: true };
  }

  // Update leaderboard
  async function updateLeaderboard(p) {
    if (!user || !p) return;
    const holdingsValue = p.holdings.reduce((sum, h) => {
      const price = stockPrices[h.symbol]?.ltp || h.avgPrice;
      return sum + (h.qty * price);
    }, 0);
    const currentValue = p.cash + holdingsValue;
    const returnPct = ((currentValue - p.startingCapital) / p.startingCapital) * 100;

    await setDoc(doc(db, "mock_leaderboard", user.uid), {
      userId: user.uid,
      displayName: user.displayName || user.email?.split("@")[0] || "Anonymous",
      photoURL: user.photoURL || "",
      startingCapital: p.startingCapital,
      currentValue: Math.round(currentValue),
      returnPct: +returnPct.toFixed(2),
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  }

  // Watchlist
  async function addToWatchlist(symbol) {
    if (!user) return;
    const updated = [...new Set([...watchlist, symbol])];
    setWatchlist(updated);
    await setDoc(doc(db, "mock_watchlists", user.uid), { symbols: updated, userId: user.uid });
  }
  async function removeFromWatchlist(symbol) {
    if (!user) return;
    const updated = watchlist.filter(s => s !== symbol);
    setWatchlist(updated);
    await setDoc(doc(db, "mock_watchlists", user.uid), { symbols: updated, userId: user.uid });
  }

  // Calculate portfolio metrics
  function getPortfolioMetrics() {
    if (!portfolio) return null;
    const holdingsValue = portfolio.holdings.reduce((sum, h) => {
      const price = stockPrices[h.symbol]?.ltp || h.avgPrice;
      return sum + (h.qty * price);
    }, 0);
    const totalValue = portfolio.cash + holdingsValue;
    const totalInvested = portfolio.holdings.reduce((sum, h) => sum + (h.qty * h.avgPrice), 0);
    const unrealizedPnL = holdingsValue - totalInvested;
    const overallReturn = ((totalValue - portfolio.startingCapital) / portfolio.startingCapital) * 100;

    return {
      cash: portfolio.cash,
      holdingsValue,
      totalValue,
      totalInvested,
      unrealizedPnL,
      overallReturn,
      startingCapital: portfolio.startingCapital,
      holdingsCount: portfolio.holdings.length,
    };
  }

  const value = {
    portfolio, transactions, watchlist, stockPrices, pricesLoading, portfolioLoading,
    createPortfolio, resetPortfolio, buyStock, sellStock,
    addToWatchlist, removeFromWatchlist,
    getPortfolioMetrics, fetchPrices,
    DEFAULT_CAPITALS,
  };

  return <TradingContext.Provider value={value}>{children}</TradingContext.Provider>;
}
