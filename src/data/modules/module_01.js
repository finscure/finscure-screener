// Module 01 — Trimmed for video-first learning
export const MODULE_01 = [
  { id: "m1", title: "Introduction to the Stock Market", lessons: [
    {
      id: "01-l1", title: "What is a Stock?", type: "article", duration: "12 min",
      content: [
        { type: "heading", text: "What is a Stock?" },
        { type: "video", text: "What is a Stock? — Explained Simply", duration: "8 min" },
        { type: "paragraph", text: "A stock represents ownership in a company. When you buy a share of Reliance Industries, you become a part-owner. You profit through price appreciation (stock goes up) or dividends (company shares profits)." },
        { type: "callout", text: "Buying a stock makes you a business owner. Always think like one — evaluate the business, not just the ticker." },
      ],
      assessment: [
        { q: "What does a stock represent?", options: ["A loan to a company", "A unit of ownership in a company", "A government bond", "A fixed deposit"], answer: 1, explanation: "Stocks represent ownership. Bonds represent loans." },
      ],
    },
    {
      id: "01-l2", title: "How the Indian Stock Market Works", type: "article", duration: "14 min",
      content: [
        { type: "heading", text: "How the Indian Stock Market Works" },
        { type: "video", text: "How the Indian Stock Market Works — NSE & BSE", duration: "10 min" },
        { type: "paragraph", text: "India has two major exchanges: BSE (1875, Asia's oldest) and NSE (1992, handles 90% of volume). When you place a buy order, the exchange matches it with a seller in microseconds. Settlement happens on T+1 — shares arrive in your demat account the next business day." },
        { type: "callout", text: "India's T+1 settlement makes it one of the fastest markets globally. Your shares arrive next business day." },
      ],
      assessment: [
        { q: "T+1 settlement means:", options: ["Trade settles in 1 hour", "Shares delivered next business day", "1% settlement fee", "Trading at 1 PM only"], answer: 1, explanation: "T+1 means the trade settles by the next business day after the transaction." },
      ],
    },
    {
      id: "01-l3", title: "Market Participants — Retail, FII, DII & HNI", type: "article", duration: "12 min",
      content: [
        { type: "heading", text: "Market Participants — Retail, FII, DII & HNI" },
        { type: "video", text: "Market Participants — Who Moves the Market?", duration: "7 min" },
        { type: "paragraph", text: "The market has four key players: Retail investors (you), FIIs (foreign institutions — biggest market movers), DIIs (mutual funds, LIC — stabilizers), and HNIs (wealthy individuals). When FIIs sell heavily, markets often fall regardless of fundamentals." },
        { type: "callout", text: "Understanding who's buying and selling (FII/DII data) gives you an edge. Always check institutional flows." },
      ],
      assessment: [
        { q: "Which participant has the LARGEST market impact?", options: ["Retail investors", "HNIs", "FIIs", "Day traders"], answer: 2, explanation: "FIIs can move thousands of crores daily, significantly impacting market direction." },
      ],
    },
    {
      id: "01-l4", title: "Trading Sessions & Market Timings", type: "article", duration: "10 min",
      content: [
        { type: "heading", text: "Trading Sessions & Market Timings" },
        { type: "video", text: "Market Timings & Trading Sessions Explained", duration: "6 min" },
        { type: "paragraph", text: "NSE normal trading runs 9:15 AM to 3:30 PM IST. Pre-open session (9:00-9:15) discovers the opening price. The first and last 15 minutes see the highest volatility — beginners should avoid trading during these windows." },
        { type: "callout", text: "The first 15 minutes (9:15–9:30) and last 15 minutes (3:15–3:30) see the highest volatility. Beginners: avoid these." },
      ],
      assessment: [
        { q: "Normal trading on NSE starts at:", options: ["9:00 AM", "9:15 AM", "10:00 AM", "9:30 AM"], answer: 1, explanation: "Pre-open is 9:00–9:15 AM. Continuous trading starts at 9:15 AM." },
      ],
    },
    {
      id: "01-l5", title: "Essential Stock Market Terminology", type: "article", duration: "14 min",
      content: [
        { type: "heading", text: "Essential Stock Market Terminology" },
        { type: "video", text: "30 Stock Market Terms Every Beginner Must Know", duration: "12 min" },
        { type: "paragraph", text: "Key terms: Bull Market (rising), Bear Market (falling), LTP (Last Traded Price), Blue Chip (large established companies like Reliance, TCS), Demat Account (electronic account holding your shares), Portfolio (collection of all your investments)." },
        { type: "callout", text: "Don't memorize everything at once. These terms become natural as you progress through the course and practice." },
      ],
      assessment: [
        { q: "A 'bull market' means:", options: ["Market is falling", "Market is rising", "Market is closed", "Market is sideways"], answer: 1, explanation: "Bull = rising. Think of a bull thrusting its horns upward." },
      ],
    },
    {
      id: "01-l6", title: "SEBI — The Market Regulator", type: "article", duration: "10 min",
      content: [
        { type: "heading", text: "SEBI — The Market Regulator" },
        { type: "video", text: "What is SEBI and Why Does it Matter?", duration: "6 min" },
        { type: "paragraph", text: "SEBI (Securities and Exchange Board of India) regulates stock exchanges, brokers, mutual funds, and research analysts. It protects investor interests and investigates insider trading and market manipulation." },
        { type: "callout", text: "Always verify that your broker is SEBI-registered. This is your first line of protection against fraud." },
      ],
      assessment: [
        { q: "SEBI's primary mandate is to:", options: ["Maximize government revenue", "Protect investor interests", "Set stock prices", "Print currency"], answer: 1, explanation: "SEBI exists to protect investors and maintain fair, orderly markets." },
      ],
    },
    {
      id: "01-l7", title: "Understanding NIFTY 50 & SENSEX", type: "article", duration: "12 min",
      content: [
        { type: "heading", text: "Understanding NIFTY 50 & SENSEX" },
        { type: "video", text: "NIFTY 50 & SENSEX — What Are They Really?", duration: "8 min" },
        { type: "paragraph", text: "SENSEX tracks the top 30 BSE companies. NIFTY 50 tracks the top 50 NSE companies. When news says 'markets crashed 500 points', they mean these indices. Other important indices: Nifty Bank (banking), Nifty IT (tech), Nifty Midcap 150." },
        { type: "callout", text: "If Nifty 50 goes up 2% but your stock is down 3%, don't panic. Indices show the average — individual stocks move differently." },
      ],
      assessment: [
        { q: "SENSEX tracks how many companies?", options: ["10", "30", "50", "100"], answer: 1, explanation: "SENSEX (Sensitive Index) tracks the top 30 companies listed on BSE." },
      ],
    },
    {
      id: "01-l8", title: "Demat, Trading & Bank Accounts", type: "article", duration: "10 min",
      content: [
        { type: "heading", text: "Demat, Trading & Bank Accounts" },
        { type: "video", text: "How to Open a Demat Account — Step by Step", duration: "8 min" },
        { type: "paragraph", text: "You need three linked accounts: Bank Account (holds money), Trading Account (places orders via broker like Zerodha/Groww), and Demat Account (holds shares electronically via CDSL/NSDL). Most brokers set up all three simultaneously." },
        { type: "callout", text: "For this course, you don't need a real broker account. Finscure's mock trading lets you practice with virtual money at real prices." },
      ],
      assessment: [
        { q: "How many accounts do you need to start trading?", options: ["1", "2", "3", "4"], answer: 2, explanation: "Bank account + Trading account + Demat account = three accounts linked together." },
      ],
    },
  ]},
];
