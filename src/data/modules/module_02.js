// Module 02 — Trimmed for video-first learning
export const MODULE_02 = [
  { id: "m1", title: "Exchange Infrastructure & Settlement", lessons: [
    {
      id: "02-l1", title: "NSE vs BSE — Architecture & Differences", type: "article", duration: "14 min",
      content: [
        { type: "heading", text: "NSE vs BSE — Architecture & Differences" },
        { type: "video", text: "NSE vs BSE — Complete Comparison", duration: "10 min" },
        { type: "paragraph", text: "BSE (1875) is Asia's oldest exchange with 5,500+ listed companies. NSE (1992) handles ~90% of equity volume with faster technology. Most stocks are listed on both — your broker routes to the exchange with the best price automatically." },
        { type: "callout", text: "Most stocks are listed on BOTH exchanges. The price is nearly identical due to arbitrage." },
      ],
      assessment: [
        { q: "NSE handles approximately what % of equity derivatives volume?", options: ["50%", "70%", "90%", "99%"], answer: 2, explanation: "NSE dominates derivatives trading with roughly 90% market share." },
      ],
    },
    {
      id: "02-l2", title: "Order Matching Engine", type: "article", duration: "12 min",
      content: [
        { type: "heading", text: "Order Matching Engine" },
        { type: "video", text: "Inside the Order Matching Engine", duration: "8 min" },
        { type: "paragraph", text: "The exchange's matching engine uses price-time priority: best price matches first, then earliest order at the same price. The bid-ask spread (difference between highest buy and lowest sell) indicates liquidity — tight spread means easy trading." },
        { type: "callout", text: "Always check the bid-ask spread before trading. Wide spread = low liquidity = higher hidden costs." },
      ],
      assessment: [
        { q: "In price-time priority, which order gets matched first?", options: ["Largest order", "Oldest order", "Best price then earliest time", "Random"], answer: 2, explanation: "Best price always has priority. Among equal prices, the earliest order wins." },
      ],
    },
    {
      id: "02-l3", title: "Clearing & Settlement — T+1", type: "article", duration: "12 min",
      content: [
        { type: "heading", text: "Clearing & Settlement — T+1" },
        { type: "video", text: "T+1 Settlement — Complete Guide", duration: "7 min" },
        { type: "paragraph", text: "India's T+1 settlement means shares transfer to buyer and money to seller by the next business day. Clearing corporations (NSCCL for NSE, ICCL for BSE) guarantee every trade — even if the counterparty defaults, your trade is honored." },
        { type: "callout", text: "Buy on Monday → shares in your demat on Tuesday. Sell on Monday → money in your bank by Tuesday." },
      ],
      assessment: [
        { q: "Who guarantees trades in case of default?", options: ["SEBI", "The broker", "Clearing corporations (NSCCL/ICCL)", "The other party"], answer: 2, explanation: "Clearing corporations provide counterparty guarantee for all exchange-traded transactions." },
      ],
    },
    {
      id: "02-l4", title: "Depositories — CDSL & NSDL", type: "article", duration: "10 min",
      content: [
        { type: "heading", text: "Depositories — CDSL & NSDL" },
        { type: "video", text: "CDSL vs NSDL — Depositories Explained", duration: "6 min" },
        { type: "paragraph", text: "NSDL (1996, promoted by NSE) and CDSL (1999, promoted by BSE) hold your shares electronically. Your broker is a Depository Participant — they're the intermediary. Your shares are safe even if your broker shuts down." },
        { type: "callout", text: "Your shares are safe even if your broker goes bankrupt. The depository holds them independently." },
      ],
      assessment: [
        { q: "If your broker goes bankrupt:", options: ["You lose all shares", "Shares are safe — held by depository", "SEBI reimburses you", "Government takes ownership"], answer: 1, explanation: "Depositories hold shares independently of brokers. Your shares are always safe." },
      ],
    },
    {
      id: "02-l5", title: "The Role of SEBI in Regulation", type: "article", duration: "10 min",
      content: [
        { type: "heading", text: "The Role of SEBI in Regulation" },
        { type: "video", text: "How SEBI Protects Investors", duration: "7 min" },
        { type: "paragraph", text: "SEBI regulates stock exchanges, brokers, mutual funds, credit rating agencies, and research analysts. It investigates insider trading, mandates disclosure norms, and sets margin requirements. Always check SEBI registration before investing with any advisor." },
        { type: "callout", text: "Before investing with any advisor or platform, check their SEBI registration on sebi.gov.in." },
      ],
      assessment: [
        { q: "Which of these does SEBI NOT regulate?", options: ["Stock brokers", "Mutual funds", "Commercial banks", "Credit rating agencies"], answer: 2, explanation: "Commercial banks are regulated by RBI, not SEBI." },
      ],
    },
    {
      id: "02-l6", title: "Circuit Breakers & Market Halts", type: "article", duration: "8 min",
      content: [
        { type: "heading", text: "Circuit Breakers & Market Halts" },
        { type: "video", text: "Circuit Breakers — When Markets Hit the Brakes", duration: "5 min" },
        { type: "paragraph", text: "Circuit breakers halt trading when indices fall 10%, 15%, or 20%. A 20% fall halts trading for the entire day. Individual stocks also have daily limits (5%, 10%, or 20%). Stocks locked at lower circuit are extremely risky — you may not be able to sell." },
        { type: "callout", text: "Circuit breakers exist to protect you. If markets halt, don't panic — the system is working as designed." },
      ],
      assessment: [
        { q: "A 20% market fall triggers:", options: ["15-minute halt", "1-hour halt", "Trading halted for the full day", "No action"], answer: 2, explanation: "A 20% fall halts trading for the entire remaining day, regardless of time." },
      ],
    },
  ]},
];
