// Module 02: How Stock Exchanges Work
// 6 Lessons · 2.5 hrs · Beginner

export const MODULE_02 = [
  { id: "m1", title: "Exchange Infrastructure & Settlement", lessons: [
    {
      id: "02-l1", title: "NSE vs BSE — Architecture & Differences", type: "article", duration: "14 min",
      content: [
        { type: "heading", text: "Two Exchanges, One Market" },
        { type: "paragraph", text: "India is unique in having two major, fully functional stock exchanges operating simultaneously. While most countries have one dominant exchange, India's BSE and NSE coexist and compete, which benefits investors through better technology and lower costs." },
        { type: "video", text: "NSE vs BSE — Complete Comparison", duration: "10 min" },
        { type: "heading", text: "BSE — The Heritage Exchange" },
        { type: "paragraph", text: "Founded in 1875 under a banyan tree on Dalal Street, Mumbai, the Bombay Stock Exchange is the oldest stock exchange in Asia. It was India's only exchange for over a century and created the SENSEX index in 1986. Today, BSE lists over 5,500 companies but handles less than 10% of total equity trading volume." },
        { type: "heading", text: "NSE — The Technology Leader" },
        { type: "paragraph", text: "The National Stock Exchange was launched in 1992 with a fully electronic trading system — a revolutionary move that eliminated the chaotic open-outcry trading floors. NSE now handles approximately 90% of all equity derivatives trading in India and introduced the NIFTY 50 index." },
        { type: "table", headers: ["Aspect", "BSE", "NSE"], rows: [
          ["Trading System", "BOLT (BSE Online Trading)", "NEAT (National Exchange Automated Trading)"],
          ["Order Speed", "~6 microseconds", "~4 microseconds"],
          ["Derivatives Market", "Small", "Dominates (~90% market share)"],
          ["SME Platform", "BSE SME (very active)", "NSE Emerge"],
          ["Listing Cost", "Lower for small companies", "Higher but more prestigious"],
        ]},
        { type: "callout", text: "Most stocks are listed on BOTH exchanges. The price is almost identical due to arbitrage. Your broker usually routes to the exchange with the best price automatically." },
      ],
      assessment: [
        { q: "NSE handles approximately what % of India's equity derivatives volume?", options: ["50%", "70%", "90%", "99%"], answer: 2, explanation: "NSE dominates derivatives trading with roughly 90% market share." },
        { q: "BSE was founded in:", options: ["1875", "1947", "1992", "2000"], answer: 0, explanation: "BSE was established in 1875, making it Asia's oldest stock exchange." },
      ],
    },
    {
      id: "02-l2", title: "Order Matching Engine — How Trades Execute", type: "article", duration: "12 min",
      content: [
        { type: "heading", text: "The Brain of the Exchange" },
        { type: "paragraph", text: "Every stock exchange has a central computer system called the order matching engine. This system receives millions of buy and sell orders every second and matches them using a price-time priority algorithm." },
        { type: "video", text: "Inside the Order Matching Engine", duration: "8 min" },
        { type: "heading", text: "Price-Time Priority" },
        { type: "paragraph", text: "The matching algorithm follows two simple rules:" },
        { type: "list", items: [
          "Price Priority — The best price gets matched first. Among buy orders, the highest bid goes first. Among sell orders, the lowest ask goes first.",
          "Time Priority — If two orders have the same price, the one placed earlier gets matched first. This is why speed matters in trading.",
        ]},
        { type: "example", label: "How Matching Works", text: "Suppose 3 buy orders exist: Buyer A at ₹100 (placed at 10:01), Buyer B at ₹101 (placed at 10:02), Buyer C at ₹100 (placed at 10:00). A sell order arrives at ₹100. Buyer B gets matched first (highest price ₹101). If another sell comes at ₹100, Buyer C gets it next (same price as A, but placed earlier)." },
        { type: "heading", text: "Bid-Ask Spread" },
        { type: "paragraph", text: "The difference between the highest buy order (bid) and lowest sell order (ask) is called the spread. Liquid stocks like Reliance have a spread of ₹0.05. Illiquid penny stocks might have a spread of ₹5 — meaning you lose money the moment you buy." },
        { type: "callout", text: "Always check the bid-ask spread before trading. A wide spread means low liquidity and potentially higher hidden costs." },
      ],
      assessment: [
        { q: "In price-time priority, which order gets matched first?", options: ["Largest order", "Oldest order", "Best price, then earliest time", "Random selection"], answer: 2, explanation: "The best price always has priority. Among equal prices, the earliest order wins." },
        { q: "A narrow bid-ask spread indicates:", options: ["Low liquidity", "High liquidity", "Market is closed", "Price will fall"], answer: 1, explanation: "Tight spreads mean many buyers and sellers, making it easy to trade without losing value." },
      ],
    },
    {
      id: "02-l3", title: "Clearing & Settlement — T+1 Explained", type: "article", duration: "12 min",
      content: [
        { type: "heading", text: "What Happens After You Buy?" },
        { type: "paragraph", text: "When you click 'Buy', the trade is executed instantly. But the actual transfer of money and shares takes time — this process is called settlement." },
        { type: "video", text: "T+1 Settlement — Complete Guide", duration: "7 min" },
        { type: "heading", text: "T+1 Settlement Cycle" },
        { type: "paragraph", text: "India migrated to T+1 settlement in January 2023. This means:" },
        { type: "list", items: [
          "T = Trade day (when you execute the buy/sell)",
          "+1 = One business day after the trade",
          "On T+1, shares are transferred to buyer's demat account and money to seller's bank",
          "This makes India one of the fastest settlement markets globally (US still uses T+2 for many instruments)",
        ]},
        { type: "heading", text: "The Role of Clearing Corporations" },
        { type: "paragraph", text: "NSE uses the National Securities Clearing Corporation (NSCCL) and BSE uses Indian Clearing Corporation (ICCL). These entities guarantee every trade — so even if the buyer or seller defaults, your trade is honored. This is called counterparty guarantee." },
        { type: "callout", text: "T+1 means if you buy on Monday, shares appear in your demat on Tuesday. If you sell on Monday, money reaches your bank by Tuesday." },
      ],
      assessment: [
        { q: "T+1 settlement means:", options: ["Trade settles in 1 minute", "Settlement happens next business day", "1% settlement fee", "Trading is done once per day"], answer: 1, explanation: "T is the trade day, +1 means settlement completes by the next business day." },
        { q: "Who guarantees trades in case of default?", options: ["SEBI", "The broker", "Clearing corporations (NSCCL/ICCL)", "The other party"], answer: 2, explanation: "Clearing corporations provide counterparty guarantee for all exchange-traded transactions." },
      ],
    },
    {
      id: "02-l4", title: "Depositories — CDSL & NSDL", type: "article", duration: "10 min",
      content: [
        { type: "heading", text: "Where Are Your Shares Actually Stored?" },
        { type: "paragraph", text: "Before 1996, shares existed as physical paper certificates. If you lost them, you lost your investment. Today, all shares are held electronically in depository accounts — similar to how banks hold your money." },
        { type: "video", text: "CDSL vs NSDL — Depositories Explained", duration: "6 min" },
        { type: "table", headers: ["Feature", "NSDL", "CDSL"], rows: [
          ["Full Name", "National Securities Depository Ltd", "Central Depository Services Ltd"],
          ["Established", "1996", "1999"],
          ["Promoted By", "NSE, IDBI Bank", "BSE"],
          ["Demat Account Prefix", "IN (12 digits)", "16-digit number"],
          ["Number of Accounts", "~3 Crore", "~8 Crore+"],
        ]},
        { type: "paragraph", text: "Your broker is a Depository Participant (DP) — they're the intermediary between you and the depository. When you open a demat account with Zerodha or Groww, they open it through either CDSL or NSDL." },
        { type: "callout", text: "Your shares are safe even if your broker shuts down. The depository holds your shares independently. You can simply transfer them to another broker." },
      ],
      assessment: [
        { q: "Before depositories, shares were:", options: ["Digital tokens", "Physical paper certificates", "Email attachments", "Audio recordings"], answer: 1, explanation: "Shares existed as physical paper certificates until electronic depositories were introduced in 1996." },
        { q: "If your broker goes bankrupt:", options: ["You lose all shares", "Shares are safe — held by depository", "SEBI reimburses you", "Government takes ownership"], answer: 1, explanation: "Depositories (CDSL/NSDL) hold shares independently of brokers. Your shares are always safe." },
      ],
    },
    {
      id: "02-l5", title: "The Role of SEBI in Market Regulation", type: "article", duration: "10 min",
      content: [
        { type: "heading", text: "The Guardian of Indian Markets" },
        { type: "paragraph", text: "The Securities and Exchange Board of India (SEBI) was established in 1988 and given statutory powers through the SEBI Act of 1992. It regulates every aspect of the Indian securities market." },
        { type: "video", text: "How SEBI Protects Investors", duration: "7 min" },
        { type: "heading", text: "SEBI's Three-Fold Mandate" },
        { type: "list", items: [
          "Protect the interests of investors in securities",
          "Promote the development of the securities market",
          "Regulate the securities market",
        ]},
        { type: "heading", text: "What SEBI Regulates" },
        { type: "list", items: [
          "Stock exchanges (NSE, BSE, MCX)",
          "Stock brokers and sub-brokers",
          "Mutual funds and AMCs",
          "Credit rating agencies (CRISIL, CARE, ICRA)",
          "Research analysts and investment advisers",
          "Foreign portfolio investors",
          "Insider trading and market manipulation",
        ]},
        { type: "example", label: "SEBI in Action", text: "In 2023, SEBI penalized a well-known research analyst for recommending stocks in which he had hidden positions — classic front-running. The analyst was banned for 3 years and fined ₹24 Cr. This is how SEBI protects retail investors." },
        { type: "callout", text: "Before investing with any advisor or platform, always check their SEBI registration on sebi.gov.in. Unregistered advisors are operating illegally." },
      ],
      assessment: [
        { q: "SEBI was given statutory powers in:", options: ["1875", "1988", "1992", "2000"], answer: 2, explanation: "SEBI was established in 1988 but gained statutory enforcement powers through the SEBI Act of 1992." },
        { q: "Which of these does SEBI NOT regulate?", options: ["Stock brokers", "Mutual funds", "Commercial banks", "Credit rating agencies"], answer: 2, explanation: "Commercial banks are regulated by RBI, not SEBI. SEBI regulates securities markets." },
      ],
    },
    {
      id: "02-l6", title: "Circuit Breakers & Market Halts", type: "article", duration: "8 min",
      content: [
        { type: "heading", text: "Safety Nets for Extreme Volatility" },
        { type: "paragraph", text: "What happens when markets crash 15% in a single day? Circuit breakers kick in. These are automatic mechanisms that halt trading when indices fall beyond certain thresholds, giving everyone time to process information and preventing panic-driven collapse." },
        { type: "video", text: "Circuit Breakers — When Markets Hit the Brakes", duration: "5 min" },
        { type: "heading", text: "Index-Level Circuit Breakers (Market-Wide)" },
        { type: "table", headers: ["Trigger", "Before 1 PM", "1 PM – 2:30 PM", "After 2:30 PM"], rows: [
          ["10% movement", "45-min halt", "15-min halt", "No halt"],
          ["15% movement", "1h 45-min halt", "45-min halt", "Remainder of day"],
          ["20% movement", "Trading halted for the day", "Trading halted for the day", "Trading halted for the day"],
        ]},
        { type: "heading", text: "Stock-Level Circuit Limits" },
        { type: "paragraph", text: "Individual stocks also have daily circuit limits — they can only move a maximum of 5%, 10%, or 20% from the previous day's close (depending on the stock). When hit, the stock is 'locked' at upper circuit (UC) or lower circuit (LC) and no further trading occurs." },
        { type: "warning", text: "Stocks locked at lower circuit are extremely risky — you may not be able to sell when you want to. Avoid stocks that frequently hit circuits." },
        { type: "callout", text: "Circuit breakers exist to protect you. If markets halt, don't panic — it means the system is working as designed." },
      ],
      assessment: [
        { q: "A 20% market fall triggers:", options: ["15-minute halt", "1-hour halt", "Trading halted for the full day", "No action"], answer: 2, explanation: "A 20% fall in Nifty/Sensex halts trading for the entire remaining day, regardless of time." },
        { q: "A stock at 'upper circuit' means:", options: ["It has crashed", "It has risen to the maximum daily limit", "It is delisted", "It has no circuit limit"], answer: 1, explanation: "Upper circuit means the stock hit its maximum allowed daily increase. No more buying can push it higher that day." },
      ],
    },
  ]},
];
