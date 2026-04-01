// Module 04: Understanding Volume & Price Action
// 7 Lessons · 3 hrs · Beginner

export const MODULE_04 = [
  { id: "m1", title: "Volume Analysis & Smart Money Footprints", lessons: [
    {
      id: "04-l1", title: "Why Volume is the Most Honest Indicator", type: "article", duration: "12 min",
      content: [
        { type: "heading", text: "Price Can Lie — Volume Cannot" },
        { type: "paragraph", text: "A stock's price can be manipulated by a few operators in the short term. But volume — the total number of shares traded — is much harder to fake. When 50 million shares of Reliance trade in a day versus the usual 10 million, something significant is happening. Volume is the footprint of money." },
        { type: "video", text: "Why Volume Matters More Than Price", duration: "8 min" },
        { type: "heading", text: "What Volume Actually Represents" },
        { type: "paragraph", text: "Every unit of volume represents a completed transaction — one buyer and one seller agreeing on a price. High volume means many participants are actively trading, creating a liquid market with tight bid-ask spreads." },
        { type: "table", headers: ["Volume Level", "What It Tells You", "Typical Scenario"], rows: [
          ["Very High (3x+ average)", "Extreme interest — institutional activity", "Earnings surprise, sector news, breakout/breakdown"],
          ["Above Average", "Healthy participation, confirms trend", "Normal trending day with conviction"],
          ["Average", "Business as usual", "Routine market session"],
          ["Below Average", "Low conviction, thin market", "Pre-holiday, uncertainty, consolidation"],
          ["Very Low", "Nobody's interested — danger zone", "Illiquid stocks, avoid trading"],
        ]},
        { type: "callout", text: "Always compare today's volume to the stock's average volume (20-day or 50-day). A '10 million share' day on Reliance is normal — but 10 million on a small-cap that usually trades 50,000 is explosive." },
      ],
      assessment: [
        { q: "Why is volume considered more reliable than price?", options: ["Volume is always higher", "Volume is harder to manipulate than price", "Volume is set by SEBI", "Volume doesn't change"], answer: 1, explanation: "While price can be temporarily manipulated, volume reflects actual participation — real money changing hands." },
        { q: "Volume that is 3x above average typically indicates:", options: ["Normal trading", "Technical error", "Institutional activity or major event", "Low liquidity"], answer: 2, explanation: "Extreme volume spikes signal institutional buying/selling or a major catalyst event." },
      ],
    },
    {
      id: "04-l2", title: "Accumulation — How Smart Money Buys", type: "article", duration: "14 min",
      content: [
        { type: "heading", text: "The Art of Quiet Buying" },
        { type: "paragraph", text: "Institutional investors (mutual funds, FIIs, hedge funds) can't buy 10 million shares of a stock in one day without moving the price against themselves. So they accumulate gradually — buying small amounts over days or weeks while keeping the price stable." },
        { type: "video", text: "Accumulation Patterns — Spotting Institutional Buying", duration: "10 min" },
        { type: "heading", text: "Signs of Accumulation" },
        { type: "list", items: [
          "Price moves sideways in a tight range (not falling despite no buyers visible)",
          "Volume gradually increases on up days, decreases on down days",
          "Stock holds support levels multiple times despite negative market",
          "Small green candles with increasing volume — steady buying",
          "Stock refuses to fall when sector or market drops — 'relative strength'",
        ]},
        { type: "example", label: "Accumulation in Action", text: "ITC traded between ₹200-220 for months in 2022 while the market fell. Volume on green days was 2x the volume on red days. Institutions were quietly accumulating. ITC then broke out above ₹220 and rallied to ₹450 — a 100%+ move. The accumulation phase was the clue." },
        { type: "heading", text: "On-Balance Volume (OBV)" },
        { type: "paragraph", text: "OBV is a simple indicator that adds volume on up days and subtracts volume on down days. If OBV is rising while price is flat, institutions are accumulating. If OBV is falling while price is flat, they're distributing." },
        { type: "callout", text: "Accumulation takes weeks. If you spot it early, you can position yourself before the breakout. Patience is the key advantage retail investors have over algorithms." },
      ],
      assessment: [
        { q: "Accumulation means:", options: ["Panic selling", "Institutional buying spread over time", "Stock split", "Dividend announcement"], answer: 1, explanation: "Accumulation is when institutions gradually buy large positions without alerting the market." },
        { q: "A key sign of accumulation is:", options: ["Price crashing daily", "Higher volume on up days than down days", "Zero trading volume", "Stock hitting lower circuit"], answer: 1, explanation: "During accumulation, buying days show more volume than selling days — institutions are net buyers." },
      ],
    },
    {
      id: "04-l3", title: "Distribution — How Smart Money Sells", type: "article", duration: "14 min",
      content: [
        { type: "heading", text: "The Quiet Exit" },
        { type: "paragraph", text: "Distribution is the opposite of accumulation. Institutions that bought a stock at lower levels now want to sell at higher prices — but they can't dump everything at once without crashing the price. So they distribute (sell) gradually." },
        { type: "video", text: "Distribution Patterns — Before the Crash", duration: "10 min" },
        { type: "heading", text: "Signs of Distribution" },
        { type: "list", items: [
          "Price stops making meaningful new highs despite positive news",
          "Volume increases on red days and decreases on green days",
          "Long upper wicks on candles — every rally is being sold into",
          "Stock fails to hold above resistance — keeps getting rejected",
          "Positive news fails to move the price — 'buy the rumor, sell the news'",
        ]},
        { type: "warning", text: "Distribution often happens while retail investors are euphoric. The 'best news' stage of a stock is often when institutions are selling to you." },
        { type: "example", label: "Distribution Example", text: "A stock rallied from ₹500 to ₹900 over 6 months. At ₹850-900 range, volume on down days is 2x volume on up days. Headlines are positive. Brokerages upgrade targets to ₹1,200. But institutions are quietly selling to retail. Eventually, the stock breaks below ₹850 and falls to ₹600." },
        { type: "callout", text: "When everyone is talking about a stock on social media and TV, ask yourself: who's on the other side of the trade? If institutions are selling while retail is buying — you don't want to be the retail." },
      ],
      assessment: [
        { q: "Distribution means institutions are:", options: ["Buying aggressively", "Selling gradually at higher prices", "Holding forever", "Filing for bankruptcy"], answer: 1, explanation: "Distribution is the process of institutions offloading their positions to retail buyers." },
        { q: "Higher volume on DOWN days during a rally suggests:", options: ["Strong buying", "Distribution — selling into the rally", "Normal market activity", "Breakout imminent"], answer: 1, explanation: "Increased selling volume during an uptrend is a classic distribution signature." },
      ],
    },
    {
      id: "04-l4", title: "Volume Spikes & Climax Volume", type: "article", duration: "12 min",
      content: [
        { type: "heading", text: "When Volume Explodes" },
        { type: "paragraph", text: "A volume spike is a day where volume is dramatically higher than normal — typically 3x to 10x the average. These spikes mark major turning points in a stock's trajectory." },
        { type: "video", text: "Volume Spikes — Turning Points Revealed", duration: "8 min" },
        { type: "heading", text: "Types of Volume Spikes" },
        { type: "table", headers: ["Spike Type", "Context", "What It Usually Means"], rows: [
          ["Breakout Spike", "Price breaks above resistance on huge volume", "New trend beginning — bullish continuation"],
          ["Breakdown Spike", "Price breaks below support on huge volume", "Downtrend starting — bearish continuation"],
          ["Buying Climax", "Massive volume on a big green candle after extended rally", "Exhaustion — smart money dumping to euphoric retail"],
          ["Selling Climax", "Massive volume on big red candle after extended decline", "Panic selling exhausting — potential bottom"],
          ["Earnings Spike", "Volume surge on results day", "Market repricing based on new information"],
        ]},
        { type: "heading", text: "Selling Climax — The Fear Bottom" },
        { type: "paragraph", text: "The most profitable volume pattern for retail investors is the selling climax. After weeks of declining prices, one day shows massive volume (5x+ average) with a huge red candle. This is the capitulation — everyone who wanted to sell has sold. The selling pressure is exhausted. Prices often reverse sharply from here." },
        { type: "example", label: "Selling Climax", text: "March 2020 COVID crash: Nifty fell from 12,000 to 7,500. On March 23, 2020, volume was 5x normal with a massive red candle. That was the exact bottom. Nifty doubled from there within 18 months. Those who recognized the selling climax and bought were rewarded enormously." },
        { type: "callout", text: "Selling climaxes are rare and terrifying — but they're often the best buying opportunities of a decade. The key: massive volume + huge red candle + extreme fear in headlines." },
      ],
      assessment: [
        { q: "A selling climax usually occurs:", options: ["At market highs", "After extended decline with massive panic volume", "During normal trading", "On weekends"], answer: 1, explanation: "Selling climax = extreme panic selling at the end of a decline, exhausting all sellers." },
        { q: "A breakout on high volume suggests:", options: ["False breakout", "Real breakout — new trend likely", "Stock will crash", "Volume error"], answer: 1, explanation: "Volume confirms breakouts. High volume = institutional participation = likely genuine move." },
      ],
    },
    {
      id: "04-l5", title: "Volume Moving Average & Relative Volume", type: "article", duration: "10 min",
      content: [
        { type: "heading", text: "Quantifying Volume" },
        { type: "paragraph", text: "Looking at raw volume numbers doesn't tell you much. '10 million shares' is meaningless unless you know the stock's average. That's why traders use volume moving averages and relative volume." },
        { type: "video", text: "Volume Indicators — Moving Average & Relative Volume", duration: "7 min" },
        { type: "heading", text: "Volume Moving Average (VMA)" },
        { type: "paragraph", text: "A 20-day volume moving average smooths out daily volume fluctuations and gives you a baseline. Plot it as a line on the volume bars. When today's volume exceeds the VMA, it means above-average participation." },
        { type: "heading", text: "Relative Volume (RVOL)" },
        { type: "paragraph", text: "RVOL = Today's Volume ÷ Average Volume. An RVOL of 2.0 means today's volume is double the average. Above 1.5 is notable. Above 3.0 is significant. Above 5.0 is extreme." },
        { type: "table", headers: ["RVOL", "Meaning", "Action"], rows: [
          ["0.5 or below", "Dead quiet — no interest", "Avoid trading this stock today"],
          ["0.5 – 1.0", "Below average activity", "Normal, no special signal"],
          ["1.0 – 1.5", "Average to slightly above", "Normal"],
          ["1.5 – 3.0", "Above average — something happening", "Pay attention, analyze candle"],
          ["3.0 – 5.0", "Very high — institutional level", "Major signal — breakout or breakdown likely"],
          ["5.0+", "Extreme — event-driven", "Earnings, news, block deal — high conviction move"],
        ]},
        { type: "callout", text: "On Finscure's screener, you can filter stocks by volume. Sort by highest volume to find the most active stocks — where institutional money is flowing." },
      ],
      assessment: [
        { q: "RVOL of 3.0 means:", options: ["Volume is 3% of average", "Volume is 3x the average", "Stock fell 3%", "3 trades occurred"], answer: 1, explanation: "Relative Volume 3.0 = today's volume is 3 times the normal average volume." },
        { q: "Very low RVOL (below 0.5) suggests:", options: ["Strong buying", "Strong selling", "No significant activity — avoid", "Breakout imminent"], answer: 2, explanation: "Low relative volume means few participants, creating low liquidity and wider spreads." },
      ],
    },
    {
      id: "04-l6", title: "Delivery Volume vs Intraday Volume", type: "article", duration: "12 min",
      content: [
        { type: "heading", text: "Not All Volume Is Equal" },
        { type: "paragraph", text: "In India, total volume includes both delivery (where shares actually change hands) and intraday trading (where positions are squared off the same day). The delivery percentage tells you whether real investors or day traders are driving the action." },
        { type: "video", text: "Delivery % — The Real Volume That Matters", duration: "8 min" },
        { type: "heading", text: "Delivery % — What It Means" },
        { type: "table", headers: ["Delivery %", "Who's Driving", "Interpretation"], rows: [
          ["Above 60%", "Long-term investors and institutions", "Genuine buying/selling — real demand or supply"],
          ["40% – 60%", "Mixed — investors + traders", "Normal market activity"],
          ["Below 40%", "Intraday traders dominate", "Speculative — no real conviction"],
          ["Below 20%", "Almost entirely speculative", "High risk, often in F&O-heavy stocks"],
        ]},
        { type: "paragraph", text: "If a stock rallies 5% on a day where delivery volume is 70% — that's a genuine move by investors who want to hold. If the same 5% rally has only 20% delivery — it's likely intraday speculation that will reverse." },
        { type: "info", text: "Delivery data is published by NSE every evening at bhavopy.nse.com. You can also find it on screener.in and market pulse tools." },
        { type: "example", label: "Delivery Analysis", text: "SBIN rallies 3% on 40 million shares. Delivery volume is 75% (30 million shares actually delivered). Average delivery % is 45%. This above-average delivery on an up day confirms institutional buying conviction." },
        { type: "callout", text: "Combine delivery % with price direction: High delivery on up day = real buying. High delivery on down day = real selling. Low delivery on either = noise." },
      ],
      assessment: [
        { q: "Delivery volume means:", options: ["Volume cancelled by end of day", "Shares that actually changed ownership", "Volume from derivatives", "Rejected orders"], answer: 1, explanation: "Delivery volume represents shares that were actually bought and added to demat accounts — real ownership transfer." },
        { q: "A rally with below 20% delivery percentage is likely:", options: ["Genuine institutional buying", "Speculative intraday activity", "Long-term investor interest", "SEBI-mandated delivery"], answer: 1, explanation: "Very low delivery = mostly intraday traders who will square off — the rally may not sustain." },
      ],
    },
    {
      id: "04-l7", title: "Building a Volume Analysis Framework", type: "article", duration: "14 min",
      content: [
        { type: "heading", text: "Your Volume Checklist for Every Trade" },
        { type: "paragraph", text: "Now that you understand volume deeply, let's build a practical framework you can apply to any stock before entering a trade." },
        { type: "video", text: "Volume Analysis Framework — Step-by-Step", duration: "10 min" },
        { type: "heading", text: "The 5-Step Volume Framework" },
        { type: "list", items: [
          "Step 1: Check RVOL — Is today's volume above 1.5x average? If below, the move has low conviction.",
          "Step 2: Compare volume on up days vs down days — Who has more participation? Buyers or sellers?",
          "Step 3: Look for volume spikes — Any 3x+ days recently? What happened at those prices?",
          "Step 4: Check delivery % — Is it above 50%? Real investors or just intraday speculation?",
          "Step 5: Correlate with price structure — Is this volume confirming or contradicting the price pattern?",
        ]},
        { type: "heading", text: "Volume Confirmation Rules" },
        { type: "table", headers: ["Signal", "Volume Confirms If", "Volume Contradicts If"], rows: [
          ["Breakout above resistance", "Volume is 2x+ average", "Volume is below average (false breakout likely)"],
          ["Bounce from support", "Green candle on above-average volume", "Low volume bounce (may re-test support)"],
          ["Uptrend", "Volume rises with price", "Volume falls as price rises (trend weakening)"],
          ["Downtrend", "Volume rises as price falls", "Volume falls as price falls (selling exhausting)"],
        ]},
        { type: "warning", text: "Never buy a breakout on low volume. It's the single most common trap for beginner traders. Wait for volume to confirm." },
        { type: "callout", text: "You've completed the Volume & Price Action module! You now have tools that 90% of retail traders ignore. Volume analysis is your unfair advantage — use it in every trade decision from now on." },
      ],
      assessment: [
        { q: "A breakout above resistance on LOW volume is likely:", options: ["A strong breakout", "A false breakout — may reverse", "Guaranteed profit", "Irrelevant"], answer: 1, explanation: "Low volume breakouts lack conviction and frequently fail — always wait for volume confirmation." },
        { q: "The first step in volume analysis is:", options: ["Check the news", "Calculate RVOL — is volume above average?", "Buy immediately", "Ignore volume"], answer: 1, explanation: "Relative volume tells you if today's activity is noteworthy compared to the stock's normal trading." },
        { q: "Rising price + falling volume over several days suggests:", options: ["Strong uptrend", "Trend is weakening — momentum fading", "Buying climax", "Stock split"], answer: 1, explanation: "Declining volume during a rally means fewer buyers are participating — the trend may reverse soon." },
      ],
    },
  ]},
];
