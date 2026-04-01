// Module 13: Candlestick Pattern Mastery
// 10 Lessons · 5 hrs · Intermediate

export const MODULE_13 = [
  { id: "m1", title: "Single & Multi-Candle Patterns", lessons: [
    { id: "13-l1", title: "Doji — The Indecision Candle", type: "article", duration: "12 min",
      content: [
        { type: "heading", text: "When Nobody Wins" },
        { type: "paragraph", text: "A Doji forms when the opening and closing prices are virtually identical, creating a cross or plus-sign shape. The body is a thin line, with wicks extending above and below. Dojis signal indecision and often precede reversals." },
        { type: "video", text: "Doji Patterns — 4 Types and How to Trade Them", duration: "8 min" },
        { type: "table", headers: ["Doji Type", "Shape", "Meaning"], rows: [
          ["Standard Doji", "Cross shape — equal wicks", "Pure indecision"],
          ["Long-Legged Doji", "Very long wicks both sides", "Extreme indecision with high volatility"],
          ["Dragonfly Doji", "Long lower wick, no upper wick", "Bullish — sellers pushed down but buyers recovered completely"],
          ["Gravestone Doji", "Long upper wick, no lower wick", "Bearish — buyers pushed up but sellers recovered completely"],
        ]},
        { type: "callout", text: "A Doji alone is just indecision. A Doji AFTER a strong uptrend or downtrend is a potential reversal signal. Context is everything." },
      ],
      assessment: [
        { q: "A Dragonfly Doji has:", options: ["Long upper wick", "Long lower wick with no upper wick", "No wicks at all", "Very large body"], answer: 1, explanation: "Dragonfly = long lower wick. Price dropped significantly but buyers pushed it all the way back up — bullish." },
        { q: "A Doji is most significant when it appears:", options: ["Randomly in a range", "After a strong trend (potential reversal)", "Only on Monday", "At exactly ₹100"], answer: 1, explanation: "After an extended move, Doji signals the current trend is losing conviction — potential reversal ahead." },
      ],
    },
    { id: "13-l2", title: "Hammer & Hanging Man", type: "article", duration: "12 min",
      content: [
        { type: "heading", text: "Same Shape, Opposite Meanings" },
        { type: "paragraph", text: "The Hammer and Hanging Man look identical — small body at the top with a long lower wick (2x+ the body length). The difference is context: Hammer appears at the BOTTOM of a downtrend (bullish). Hanging Man appears at the TOP of an uptrend (bearish)." },
        { type: "video", text: "Hammer & Hanging Man — Context-Dependent Patterns", duration: "8 min" },
        { type: "table", headers: ["Pattern", "Location", "Signal", "Confirmation"], rows: [
          ["Hammer", "After a downtrend", "Bullish reversal", "Next candle closes green above hammer's body"],
          ["Hanging Man", "After an uptrend", "Bearish reversal", "Next candle closes red below hanging man's body"],
        ]},
        { type: "callout", text: "A hammer on high volume at a key support level is one of the most reliable buy signals in candlestick analysis. Always wait for the next candle to confirm." },
      ],
      assessment: [
        { q: "A Hammer forms at the:", options: ["Top of an uptrend", "Bottom of a downtrend", "Middle of a range", "Market open"], answer: 1, explanation: "Hammer = small body + long lower wick at the bottom of a decline. It shows buyers stepping in aggressively." },
      ],
    },
    { id: "13-l3", title: "Engulfing Patterns — Bullish & Bearish", type: "article", duration: "14 min",
      content: [
        { type: "heading", text: "The Power Shift" },
        { type: "paragraph", text: "An engulfing pattern is a two-candle reversal pattern where the second candle's body completely 'engulfs' (covers) the first candle's body. It signals a dramatic shift in control from buyers to sellers or vice versa." },
        { type: "video", text: "Engulfing Patterns — The Strongest 2-Candle Reversal", duration: "10 min" },
        { type: "table", headers: ["Pattern", "Structure", "Signal"], rows: [
          ["Bullish Engulfing", "Small red candle followed by large green candle that engulfs it", "Buyers overwhelmed sellers — reversal up"],
          ["Bearish Engulfing", "Small green candle followed by large red candle that engulfs it", "Sellers overwhelmed buyers — reversal down"],
        ]},
        { type: "list", items: [
          "The bigger the engulfing candle relative to the previous, the stronger the signal",
          "Volume should be higher on the engulfing candle",
          "Most reliable at key support (bullish) or resistance (bearish) levels",
          "The engulfing candle's close should be the extreme (close near high for bullish, near low for bearish)",
        ]},
        { type: "callout", text: "Bullish engulfing at a support level on high volume is arguably the single best candlestick buy signal. It shows violent shift from sellers to buyers." },
      ],
      assessment: [
        { q: "A Bullish Engulfing pattern is:", options: ["Large red candle engulfing a small green one", "Large green candle completely engulfing the previous small red candle", "Two identical candles", "A gap up"], answer: 1, explanation: "Bullish engulfing = big green candle swallows the previous red candle, showing buyers taking control." },
      ],
    },
    { id: "13-l4", title: "Morning Star & Evening Star", type: "article", duration: "14 min",
      content: [
        { type: "heading", text: "Three-Candle Reversal Patterns" },
        { type: "paragraph", text: "Morning Star is a bullish reversal pattern (3 candles) that forms at the bottom of a downtrend. Evening Star is the bearish mirror that forms at tops. These are among the most reliable multi-candle patterns." },
        { type: "video", text: "Morning Star & Evening Star — 3-Candle Reversals", duration: "10 min" },
        { type: "heading", text: "Morning Star (Bullish)" },
        { type: "list", items: [
          "Candle 1: Large red candle (continuation of downtrend)",
          "Candle 2: Small-bodied candle (Doji or Spinning Top) — indecision, trend pausing",
          "Candle 3: Large green candle that closes above the midpoint of Candle 1 — buyers take over",
        ]},
        { type: "heading", text: "Evening Star (Bearish)" },
        { type: "list", items: [
          "Candle 1: Large green candle (continuation of uptrend)",
          "Candle 2: Small-bodied candle — indecision at the top",
          "Candle 3: Large red candle that closes below the midpoint of Candle 1 — sellers take over",
        ]},
        { type: "callout", text: "The middle candle (Doji) is the key — it shows the trend has paused. If the next candle moves strongly in the opposite direction, reversal is confirmed." },
      ],
      assessment: [
        { q: "A Morning Star consists of:", options: ["1 candle", "2 candles", "3 candles: large red → small body → large green", "5 candles"], answer: 2, explanation: "Morning Star = 3 candles showing transition from bearish (red) to indecision (small) to bullish (green)." },
      ],
    },
    { id: "13-l5", title: "Harami — Inside Bar Reversal", type: "article", duration: "10 min",
      content: [
        { type: "heading", text: "The Pregnant Pattern" },
        { type: "paragraph", text: "Harami (Japanese for 'pregnant') is a two-candle pattern where the second candle's body is completely contained within the first candle's body. It's the opposite of an engulfing pattern and signals potential reversal." },
        { type: "video", text: "Harami Patterns — Bullish & Bearish", duration: "7 min" },
        { type: "table", headers: ["Pattern", "Structure", "Signal"], rows: [
          ["Bullish Harami", "Large red candle → small green candle inside it", "Selling pressure reducing — potential reversal up"],
          ["Bearish Harami", "Large green candle → small red candle inside it", "Buying pressure reducing — potential reversal down"],
        ]},
        { type: "paragraph", text: "Harami is a weaker signal than engulfing. Always wait for the third candle to confirm the reversal direction before entering." },
        { type: "callout", text: "Harami patterns are essentially 'inside bars' — useful for setting breakout entries above/below the mother candle's range." },
      ],
      assessment: [
        { q: "In a Harami pattern, the second candle is:", options: ["Larger than the first", "Completely inside the first candle's body", "Equal in size", "A gap"], answer: 1, explanation: "Harami = second candle's body fits entirely within the first candle's body — showing momentum loss." },
      ],
    },
    { id: "13-l6", title: "Marubozu — The Conviction Candle", type: "article", duration: "10 min",
      content: [
        { type: "heading", text: "Full Body, No Wicks" },
        { type: "paragraph", text: "A Marubozu is a candle with no wicks (or very tiny ones). The open is at one extreme and the close at the other. It shows absolute dominance by one side — buyers (green Marubozu) or sellers (red Marubozu)." },
        { type: "video", text: "Marubozu Candles — Maximum Conviction Signals", duration: "6 min" },
        { type: "list", items: [
          "Green Marubozu: Open at low, close at high — buyers controlled the entire session. Very bullish.",
          "Red Marubozu: Open at high, close at low — sellers controlled the entire session. Very bearish.",
          "After a long sideways range, a Marubozu breakout is extremely powerful",
          "Marubozu candles on high volume indicate institutional conviction",
        ]},
        { type: "callout", text: "If you see a Marubozu candle breaking above resistance on 3x volume, that's one of the strongest signals in technical analysis. Pay attention." },
      ],
      assessment: [
        { q: "A Marubozu candle has:", options: ["Very long wicks", "No wicks — open and close at the extremes", "Only one wick", "A cross shape"], answer: 1, explanation: "Marubozu = full body, no rejection. One side dominated from open to close without any pushback." },
      ],
    },
    { id: "13-l7", title: "Shooting Star & Inverted Hammer", type: "article", duration: "10 min",
      content: [
        { type: "heading", text: "Upper Wick Dominance" },
        { type: "paragraph", text: "These patterns have small bodies with long upper wicks — the mirror of Hammer/Hanging Man. Shooting Star appears at tops (bearish). Inverted Hammer appears at bottoms (bullish — counterintuitively)." },
        { type: "video", text: "Shooting Star & Inverted Hammer — Identification Guide", duration: "7 min" },
        { type: "table", headers: ["Pattern", "Location", "Upper Wick", "Signal"], rows: [
          ["Shooting Star", "Top of uptrend", "2x+ body length", "Bearish — buyers tried higher but sellers smashed it down"],
          ["Inverted Hammer", "Bottom of downtrend", "2x+ body length", "Bullish — early buying attempt, needs confirmation"],
        ]},
        { type: "callout", text: "Shooting Stars at resistance levels with high volume are very reliable sell signals. The long upper wick shows clear rejection of higher prices." },
      ],
      assessment: [
        { q: "A Shooting Star at a resistance level signals:", options: ["Bullish breakout", "Bearish reversal — rejection of higher prices", "Market indecision", "Nothing"], answer: 1, explanation: "Long upper wick at resistance = price tried to go higher but was forcefully rejected. Bearish." },
      ],
    },
    { id: "13-l8", title: "Three White Soldiers & Three Black Crows", type: "article", duration: "10 min",
      content: [
        { type: "heading", text: "Triple Conviction Patterns" },
        { type: "paragraph", text: "Three consecutive large green candles (each opening within the previous body and closing at new highs) = Three White Soldiers, a powerful bullish signal. Three consecutive large red candles = Three Black Crows, a powerful bearish signal." },
        { type: "video", text: "Three White Soldiers & Three Black Crows", duration: "7 min" },
        { type: "list", items: [
          "Each candle should have a substantial body (not small/doji)",
          "Each candle should open within the previous candle's body",
          "Each candle should close at or near its high (soldiers) or low (crows)",
          "Volume should ideally increase across the three candles",
          "Most significant after a period of decline (soldiers) or rally (crows)",
        ]},
        { type: "callout", text: "Three White Soldiers after a downtrend is a very strong reversal signal. But if it appears after an extended rally, it could be an exhaustion pattern." },
      ],
      assessment: [
        { q: "Three White Soldiers consist of:", options: ["Three Doji candles", "Three consecutive large green candles, each closing higher", "Three gap-up openings", "Three red candles"], answer: 1, explanation: "Three successive large green candles with each closing at new highs show strong, sustained buying conviction." },
      ],
    },
    { id: "13-l9", title: "Piercing Line & Dark Cloud Cover", type: "article", duration: "10 min",
      content: [
        { type: "heading", text: "Two-Candle Partial Reversals" },
        { type: "paragraph", text: "These are weaker cousins of the engulfing pattern. Piercing Line (bullish) opens below the previous red candle but closes above its midpoint. Dark Cloud Cover (bearish) opens above the previous green candle but closes below its midpoint." },
        { type: "video", text: "Piercing Line & Dark Cloud Cover", duration: "7 min" },
        { type: "table", headers: ["Pattern", "Candle 1", "Candle 2", "Key Rule"], rows: [
          ["Piercing Line (Bullish)", "Large red candle", "Green candle opens below C1's low, closes above C1's midpoint", "Must close above 50% of C1's body"],
          ["Dark Cloud Cover (Bearish)", "Large green candle", "Red candle opens above C1's high, closes below C1's midpoint", "Must close below 50% of C1's body"],
        ]},
        { type: "callout", text: "If the second candle closes above the FIRST candle's open (not just midpoint), it becomes an engulfing — the stronger version." },
      ],
      assessment: [
        { q: "Piercing Line is confirmed when the green candle closes:", options: ["Below the red candle's low", "Above the red candle's midpoint", "At the same level as the open", "At the high of the day only"], answer: 1, explanation: "The green candle must 'pierce' above 50% of the previous red candle's body to signal reversal." },
      ],
    },
    { id: "13-l10", title: "Candlestick Pattern Trading Playbook", type: "article", duration: "14 min",
      content: [
        { type: "heading", text: "Combining Patterns with Context" },
        { type: "paragraph", text: "Individual candlestick patterns are tools. Their power comes from context — where they form (S/R levels), volume, the broader trend, and indicator confirmation." },
        { type: "video", text: "Complete Candlestick Strategy — 5 Rules for Every Pattern", duration: "10 min" },
        { type: "heading", text: "The 5-Rule Candlestick Playbook" },
        { type: "list", items: [
          "Rule 1: Location matters most — patterns at S/R levels are 2x more reliable than random locations",
          "Rule 2: Volume confirms — high volume patterns are genuine, low volume patterns are noise",
          "Rule 3: Trend context — reversal patterns need a preceding trend to reverse. No trend = no reversal.",
          "Rule 4: Wait for confirmation — the candle AFTER the pattern confirms or denies the signal",
          "Rule 5: Multiple timeframe check — pattern on daily confirmed by weekly trend = highest probability",
        ]},
        { type: "callout", text: "You've completed the Technical Analysis section! Combining S/R + Chart Patterns + Indicators + Candlestick Patterns gives you a complete technical toolkit. Practice daily on Finscure's charts to build pattern recognition speed." },
      ],
      assessment: [
        { q: "The most important factor for candlestick pattern reliability is:", options: ["The pattern's name", "Where it forms (S/R level, trend context)", "The exact shape of the wick", "Time of day"], answer: 1, explanation: "Context > pattern. A Hammer at a major support with high volume is 10x more reliable than a random Hammer." },
        { q: "After spotting a pattern, you should:", options: ["Trade immediately", "Wait for the next candle to confirm before entering", "Tell everyone on social media", "Ignore it"], answer: 1, explanation: "Always wait for confirmation — the candle after the pattern decides whether the signal is real." },
      ],
    },
  ]},
];
