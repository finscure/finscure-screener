// ═══════════════════════════════════════════════════════════
// COURSE 2: TECHNICAL ANALYSIS — Comprehensive Edition
// 7 Modules · 35 Lessons · 70+ Quiz Questions
// ═══════════════════════════════════════════════════════════

export const TECHNICAL_ANALYSIS = {
  id: "technical-analysis",
  title: "Technical Analysis",
  description: "Learn to read price charts, identify patterns, and use technical indicators to time your entries and exits — the visual language of the stock market.",
  icon: "📈",
  color: "#16a34a",
  duration: "10 hours",
  lessons: 35,
  level: "Intermediate",
  modules: [
    // ══════════════════════════════════════
    // MODULE 1: Foundations of Technical Analysis
    // ══════════════════════════════════════
    {
      id: "m1",
      title: "Foundations of Technical Analysis",
      lessons: [
        {
          id: "m1-l1", title: "What is Technical Analysis & Why It Works", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "The Visual Language of Markets" },
            { type: "paragraph", text: "Technical analysis is the study of past price and volume data to forecast future price movements. Unlike fundamental analysis (which evaluates a company's business), technical analysis focuses entirely on the chart — the price action itself tells the story." },
            { type: "paragraph", text: "The core belief behind technical analysis is that all known information — earnings, news, sentiment, insider activity — is already reflected in the stock's price. By studying how prices move, you can identify patterns that tend to repeat because human psychology doesn't change." },
            { type: "heading", text: "Three Core Principles" },
            { type: "paragraph", text: "Principle 1: The market discounts everything. Every piece of information available is already priced into the stock. You don't need to know why a stock is rising — the chart tells you it is rising, and that's what matters for trading decisions." },
            { type: "paragraph", text: "Principle 2: Prices move in trends. Stocks don't move randomly — they trend upward, downward, or sideways for extended periods. The job of a technical analyst is to identify the trend early and ride it." },
            { type: "paragraph", text: "Principle 3: History tends to repeat itself. Chart patterns that worked 50 years ago still work today because they reflect human emotions — fear, greed, hope, and panic — which never change." },
            { type: "callout", text: "Important Distinction: Technical analysis doesn't predict the future with certainty. It identifies high-probability setups. If a pattern works 65% of the time and your risk-reward ratio is 1:2, you'll be profitable even though you're wrong 35% of the time." },
            { type: "heading", text: "Technical vs Fundamental Analysis" },
            { type: "table", headers: ["Aspect", "Technical Analysis", "Fundamental Analysis"], rows: [
              ["Focus", "Price & volume charts", "Company financials & valuation"],
              ["Time Horizon", "Short to medium term", "Medium to long term"],
              ["Answers", "When to buy/sell", "What to buy/sell"],
              ["Tools", "Charts, indicators, patterns", "P/E, ROE, balance sheets"],
              ["Best For", "Timing entries and exits", "Selecting quality companies"],
            ]},
            { type: "paragraph", text: "The most successful investors combine both approaches — use fundamental analysis to identify quality companies, then use technical analysis to find the best entry and exit points." },
            { type: "callout", text: "Key Takeaway: Technical analysis is a tool for timing, not a crystal ball. It works because markets are driven by human psychology, which creates repeatable patterns. Learn to read charts and you'll see opportunities others miss." },
          ],
        },
        {
          id: "m1-l2", title: "Types of Charts — Line, Bar & Candlestick", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "Three Ways to View Price Data" },
            { type: "paragraph", text: "The same price data can be displayed in different chart formats. Each has its strengths, but one has emerged as the clear favorite among traders worldwide." },
            { type: "heading", text: "Line Chart" },
            { type: "paragraph", text: "The simplest chart type — it connects closing prices with a continuous line. Line charts are clean and easy to read, making them good for identifying the overall trend direction. However, they hide important information like the day's high, low, and opening price. They're best for a quick overview or for very long-term trend analysis." },
            { type: "heading", text: "Bar Chart (OHLC)" },
            { type: "paragraph", text: "Bar charts show four data points per time period: Open, High, Low, and Close (OHLC). Each bar is a vertical line from the day's low to high, with a small horizontal tick on the left showing the opening price and one on the right showing the closing price. They provide more information than line charts but can be harder to read at a glance." },
            { type: "heading", text: "Candlestick Chart — The Gold Standard" },
            { type: "paragraph", text: "Candlestick charts originated in 18th-century Japan, where rice traders used them to track prices. Each candlestick shows the same OHLC data as a bar chart but in a visually intuitive format. The 'body' (thick part) represents the range between open and close. The 'wicks' or 'shadows' (thin lines) show the high and low." },
            { type: "paragraph", text: "A green (or white) candle means the close was higher than the open — buyers won that period. A red (or black) candle means the close was lower than the open — sellers won. The size of the body tells you the strength of conviction." },
            { type: "callout", text: "Why Candlesticks Win: A single candlestick tells you four things — where the period started (open), where it ended (close), the maximum optimism (high), and maximum pessimism (low). The shape of the candle instantly communicates market sentiment." },
            { type: "heading", text: "Timeframes" },
            { type: "paragraph", text: "Charts can display data across different timeframes. A 5-minute chart shows one candle per 5 minutes (used by day traders). A daily chart shows one candle per day (most common). A weekly chart shows one candle per week (for swing traders). A monthly chart is for long-term trend analysis." },
            { type: "paragraph", text: "Always analyze multiple timeframes. A stock might look bullish on a daily chart but bearish on a weekly chart. The higher timeframe generally takes priority — trade in the direction of the larger trend." },
            { type: "callout", text: "Key Takeaway: Use candlestick charts for all your analysis — they convey the most information in the most intuitive format. Start with daily timeframe charts and learn to read what each candle shape means before moving to shorter timeframes." },
          ],
        },
        {
          id: "m1-l3", title: "Timeframes — Which One Should You Use?", type: "article", videoUrl: "", duration: "10 min",
          content: [
            { type: "heading", text: "Matching Timeframe to Your Trading Style" },
            { type: "paragraph", text: "The timeframe you choose depends entirely on your trading style. Using the wrong timeframe is like using a microscope when you need a telescope — you'll see details that don't matter and miss the big picture." },
            { type: "table", headers: ["Trading Style", "Primary Timeframe", "Confirmation Timeframe", "Holding Period"], rows: [
              ["Scalping", "1-min, 5-min", "15-min", "Seconds to minutes"],
              ["Intraday", "5-min, 15-min", "1-hour", "Minutes to hours"],
              ["Swing Trading", "Daily", "Weekly", "Days to weeks"],
              ["Positional", "Weekly", "Monthly", "Weeks to months"],
              ["Investing", "Monthly", "Quarterly", "Months to years"],
            ]},
            { type: "heading", text: "The Multiple Timeframe Approach" },
            { type: "paragraph", text: "Professional traders use at least two timeframes. The higher timeframe identifies the trend direction (the 'forest'), and the lower timeframe finds entry points (the 'trees'). For example, a swing trader might use the weekly chart to confirm an uptrend, then switch to the daily chart to find a pullback entry." },
            { type: "paragraph", text: "The rule of thumb: your confirmation timeframe should be 4-6x your trading timeframe. If you trade on the daily chart, confirm on the weekly. If you trade on the 15-minute chart, confirm on the 1-hour." },
            { type: "callout", text: "Beginner Recommendation: Start with the daily timeframe. It filters out intraday noise, gives you time to think (no rush to make decisions), and is used by the majority of successful traders. Once comfortable, add the weekly chart as your confirmation timeframe." },
            { type: "callout", text: "Key Takeaway: Your timeframe determines your trading style, not the other way around. If you have a full-time job, don't try to scalp on 1-minute charts. Daily charts + weekly confirmation is the sweet spot for most people." },
          ],
        },
        {
          id: "m1-l4", title: "Volume — The Confirmation Signal Most Traders Ignore", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "What Volume Tells You" },
            { type: "paragraph", text: "Volume is the number of shares traded in a given period. It's the most underrated indicator in technical analysis. Price tells you what happened, but volume tells you how significant it was. A stock rising on high volume is far more meaningful than one rising on low volume." },
            { type: "heading", text: "Volume-Price Relationships" },
            { type: "table", headers: ["Price", "Volume", "Interpretation"], rows: [
              ["Rising ↑", "High ↑", "Strong bullish — institutional buying (MOST RELIABLE)"],
              ["Rising ↑", "Low ↓", "Weak rally — likely to reverse (CAUTION)"],
              ["Falling ↓", "High ↑", "Strong bearish — panic selling or institutional exit"],
              ["Falling ↓", "Low ↓", "Weak decline — sellers exhausted, potential reversal"],
            ]},
            { type: "heading", text: "Volume Spikes" },
            { type: "paragraph", text: "A sudden volume spike (3-5x the average daily volume) signals that something significant is happening — an institutional investor is entering/exiting, earnings surprise, or news-driven event. Volume spikes at the bottom of a downtrend often mark capitulation (final surrender selling) and a potential reversal point." },
            { type: "heading", text: "Volume Moving Average" },
            { type: "paragraph", text: "Plot a 20-day moving average on volume to identify what 'normal' volume looks like for a stock. Days when volume exceeds this average by 2x or more deserve extra attention. Most charting platforms allow you to overlay a volume moving average." },
            { type: "callout", text: "Pro Tip: Never buy a breakout without volume confirmation. If a stock breaks above a resistance level but volume is below average, the breakout is likely to fail. High-volume breakouts have significantly higher success rates." },
            { type: "callout", text: "Key Takeaway: Volume is the fuel that drives price movements. High-volume moves are trustworthy; low-volume moves are suspicious. Always check volume before making a trading decision — it's free confirmation that most beginners ignore." },
          ],
        },
        {
          id: "m1-l5", title: "Trends — The Most Important Concept in Trading", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "The Trend is Your Friend" },
            { type: "paragraph", text: "This is the single most important rule in technical analysis: trade in the direction of the trend. It sounds simple, but most beginners constantly try to predict reversals instead of following what the market is already telling them." },
            { type: "heading", text: "Three Types of Trends" },
            { type: "paragraph", text: "An uptrend is defined by higher highs and higher lows — each peak is higher than the previous peak, and each trough is higher than the previous trough. Draw a line connecting the troughs (swing lows) — this is your uptrend line." },
            { type: "paragraph", text: "A downtrend is defined by lower highs and lower lows — each peak and trough is lower than the previous one. Draw a line connecting the peaks (swing highs) — this is your downtrend line." },
            { type: "paragraph", text: "A sideways trend (range-bound) is when the stock oscillates between a support level and a resistance level without making new highs or lows. This is also called consolidation. About 60-70% of the time, markets are in sideways trends." },
            { type: "heading", text: "Trend Identification Rules" },
            { type: "paragraph", text: "Rule 1: A trend is assumed to be in force until a definitive signal of reversal. Don't try to predict when a trend will end — react when it actually does. Rule 2: Higher timeframe trends override lower timeframe trends. If the weekly chart shows an uptrend, don't aggressively short on the daily chart. Rule 3: The longer a trend has been in place, the more significant a reversal signal becomes." },
            { type: "heading", text: "How to Draw Trend Lines" },
            { type: "paragraph", text: "For an uptrend line: connect at least two significant swing lows with a straight line. The more times the price touches and bounces off this line, the more valid the trendline is. A trendline touched 4-5 times is very reliable." },
            { type: "paragraph", text: "For a downtrend line: connect at least two significant swing highs. Again, more touches = more reliable." },
            { type: "callout", text: "Critical Rule: A trendline break is one of the most powerful signals in technical analysis. When an uptrend line that has been tested 4-5 times finally breaks, it often leads to a significant move in the opposite direction." },
            { type: "callout", text: "Key Takeaway: Identifying the trend is job #1. Before looking at any indicator or pattern, determine the trend on the daily and weekly charts. Buy in uptrends, sell in downtrends, and either stay out or range-trade during sideways markets." },
          ],
        },
      ],
      quiz: {
        id: "m1-quiz",
        questions: [
          { q: "Which principle states that all information is already reflected in stock prices?", options: ["Efficient market hypothesis", "Market discounts everything", "Random walk theory", "Supply-demand principle"], answer: 1 },
          { q: "Which chart type originated in 18th-century Japan?", options: ["Line chart", "Bar chart", "Candlestick chart", "Point & figure chart"], answer: 2 },
          { q: "A green candlestick means:", options: ["Stock went down", "Close was higher than open", "Volume was high", "Stock hit 52-week high"], answer: 1 },
          { q: "For swing trading, which primary timeframe is recommended?", options: ["1-minute", "15-minute", "Daily", "Monthly"], answer: 2 },
          { q: "A stock rising on LOW volume indicates:", options: ["Strong buying interest", "Weak rally, likely to reverse", "Institutional accumulation", "Breakout confirmation"], answer: 1 },
          { q: "An uptrend is defined by:", options: ["Lower highs and lower lows", "Higher highs and higher lows", "Equal highs and equal lows", "Random price movement"], answer: 1 },
          { q: "How many times should a trendline be touched to be considered reliable?", options: ["1 time", "2 times minimum, 4-5 is very reliable", "Exactly 3 times", "10+ times"], answer: 1 },
          { q: "The multiple timeframe approach uses:", options: ["Only one chart", "A higher timeframe for trend + lower for entry", "Random timeframes", "Only the 1-minute chart"], answer: 1 },
          { q: "What percentage of time are markets typically in sideways trends?", options: ["10-20%", "30-40%", "60-70%", "90-100%"], answer: 2 },
          { q: "Technical analysis is best used for:", options: ["Determining a company's intrinsic value", "Timing entries and exits", "Calculating dividends", "Predicting interest rates"], answer: 1 },
        ],
      },
    },

    // ══════════════════════════════════════
    // MODULE 2: Support, Resistance & Price Action
    // ══════════════════════════════════════
    {
      id: "m2",
      title: "Support, Resistance & Price Action",
      lessons: [
        {
          id: "m2-l1", title: "Support & Resistance — The Foundation of All Trading", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "The Two Most Important Lines on Any Chart" },
            { type: "paragraph", text: "Support and resistance are price levels where buying or selling pressure is strong enough to halt or reverse a price move. They're like invisible walls on the chart. Understanding these levels is arguably the single most valuable skill in technical analysis." },
            { type: "heading", text: "Support — The Floor" },
            { type: "paragraph", text: "Support is a price level where demand is strong enough to prevent the price from falling further. Think of it as a floor — the price drops to this level and bounces back up. Support forms because buyers remember that the stock was a good deal at this price before, so they step in to buy again." },
            { type: "paragraph", text: "Example: If HDFC Bank has bounced off ₹1,600 three times in the past 6 months, ₹1,600 is a strong support level. Each time the price approaches ₹1,600, buyers emerge and push it back up." },
            { type: "heading", text: "Resistance — The Ceiling" },
            { type: "paragraph", text: "Resistance is a price level where supply is strong enough to prevent the price from rising further. Think of it as a ceiling — the price rises to this level and gets pushed back down. Resistance forms because sellers remember that the stock reversed at this price before, so they sell again." },
            { type: "heading", text: "Role Reversal — The Key Insight" },
            { type: "paragraph", text: "This is one of the most powerful concepts: when support breaks, it becomes resistance. When resistance breaks, it becomes support. If HDFC Bank breaks below ₹1,600 support, that level now becomes resistance — the stock will likely struggle to get back above ₹1,600." },
            { type: "callout", text: "Why Role Reversal Works: At ₹1,600 support, many traders bought. When it breaks below ₹1,600, those buyers are now underwater and anxious. If the stock rallies back to ₹1,600, they'll sell to break even — creating resistance at the exact level that was once support." },
            { type: "heading", text: "How to Identify Strong Support/Resistance" },
            { type: "paragraph", text: "Levels tested multiple times are stronger than those tested once. Levels accompanied by high volume are more significant. Round numbers (₹100, ₹500, ₹1,000) act as psychological support/resistance. Levels visible on higher timeframes are stronger than those on lower timeframes." },
            { type: "callout", text: "Key Takeaway: Support and resistance are where trading decisions happen. Buy near support (with a stop-loss below it). Sell near resistance (with a stop-loss above it). When these levels break, expect significant moves in the direction of the break." },
          ],
        },
        {
          id: "m2-l2", title: "Candlestick Patterns — Single Candle Patterns", type: "article", videoUrl: "", duration: "16 min",
          content: [
            { type: "heading", text: "Reading the Story in a Single Candle" },
            { type: "paragraph", text: "Individual candlestick shapes convey powerful information about market sentiment. Learning to read these patterns gives you an edge in understanding what buyers and sellers are doing." },
            { type: "heading", text: "Bullish Reversal Candles" },
            { type: "paragraph", text: "Hammer: A small body at the top with a long lower wick (at least 2x the body length). It appears at the bottom of a downtrend. The long lower wick shows sellers pushed the price down significantly, but buyers fought back and closed near the top. Signal: The downtrend may be ending." },
            { type: "paragraph", text: "Bullish Engulfing: A large green candle that completely 'engulfs' (covers the entire range of) the previous red candle. It shows buyers have overwhelmed sellers with strong conviction. Most reliable when it appears at support levels." },
            { type: "heading", text: "Bearish Reversal Candles" },
            { type: "paragraph", text: "Shooting Star: A small body at the bottom with a long upper wick. The mirror image of a hammer, it appears at the top of an uptrend. Buyers pushed the price up but sellers took control and pushed it back down. Signal: The uptrend may be ending." },
            { type: "paragraph", text: "Bearish Engulfing: A large red candle that completely engulfs the previous green candle. Shows sellers have overwhelmed buyers. Most reliable at resistance levels." },
            { type: "heading", text: "Indecision Candles" },
            { type: "paragraph", text: "Doji: Open and close are virtually the same (tiny or no body), with wicks on both sides. It represents perfect equilibrium between buyers and sellers — neither side won. A doji after a strong trend often signals a potential reversal. The direction of the move after a doji is the signal to follow." },
            { type: "table", headers: ["Pattern", "Appearance", "Signal", "Where to Look"], rows: [
              ["Hammer", "Small body, long lower wick", "Bullish reversal", "Bottom of downtrend"],
              ["Shooting Star", "Small body, long upper wick", "Bearish reversal", "Top of uptrend"],
              ["Bullish Engulfing", "Green candle engulfs previous red", "Bullish reversal", "At support levels"],
              ["Bearish Engulfing", "Red candle engulfs previous green", "Bearish reversal", "At resistance levels"],
              ["Doji", "Tiny body, wicks both sides", "Indecision / potential reversal", "After strong trends"],
              ["Marubozu", "Full body, no wicks", "Strong momentum continuation", "During breakouts"],
            ]},
            { type: "callout", text: "Key Takeaway: Candlestick patterns are most powerful when they appear at key support/resistance levels. A hammer at a strong support level is a high-probability buy signal. A shooting star at resistance is a high-probability sell signal. Context matters more than the pattern itself." },
          ],
        },
        {
          id: "m2-l3", title: "Multi-Candle Patterns — Double & Triple Formations", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "When Candles Tell a Bigger Story" },
            { type: "paragraph", text: "While single candle patterns are useful, patterns formed by 2-3 candles together often provide stronger and more reliable signals." },
            { type: "heading", text: "Morning Star (3-candle bullish reversal)" },
            { type: "paragraph", text: "Candle 1: A large red candle (strong selling). Candle 2: A small-bodied candle (doji or spinning top) that gaps below the first — shows selling pressure is fading. Candle 3: A large green candle that closes above the midpoint of candle 1 — buyers have taken control. This is one of the most reliable reversal patterns when it occurs at support." },
            { type: "heading", text: "Evening Star (3-candle bearish reversal)" },
            { type: "paragraph", text: "The mirror image of morning star. Candle 1: Large green. Candle 2: Small body gapping above. Candle 3: Large red closing below midpoint of candle 1. Signals a top when appearing at resistance." },
            { type: "heading", text: "Three White Soldiers / Three Black Crows" },
            { type: "paragraph", text: "Three White Soldiers: Three consecutive green candles, each opening within the body of the previous candle and closing at a new high. Shows strong, sustained buying pressure. Very bullish when appearing after a downtrend or consolidation." },
            { type: "paragraph", text: "Three Black Crows: Three consecutive red candles with lower closes. The bearish equivalent — shows sustained, aggressive selling." },
            { type: "heading", text: "Tweezer Tops and Bottoms" },
            { type: "paragraph", text: "Tweezer Bottom: Two candles with matching lows (within a small margin). The first is red, the second is green. Suggests that sellers tried to push lower twice but failed at the exact same level — a potential reversal point. Tweezer Top is the opposite: two candles with matching highs." },
            { type: "callout", text: "Key Takeaway: Multi-candle patterns are stronger signals than single candles because they show a shift in sentiment over multiple periods. The Morning Star and Evening Star are among the most reliable reversal patterns in all of technical analysis. Always wait for the pattern to complete before trading." },
          ],
        },
        {
          id: "m2-l4", title: "Price Action Trading — Reading the Market Without Indicators", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "The Purest Form of Analysis" },
            { type: "paragraph", text: "Price action trading is making decisions based solely on the movement of price — no indicators, no oscillators, just the raw chart. Many of the world's best traders are price action traders. The logic is simple: indicators are derived from price, so why not go directly to the source?" },
            { type: "heading", text: "Key Price Action Concepts" },
            { type: "paragraph", text: "Pin Bars: Candles with a small body and a long wick in one direction. A pin bar at support with a long lower wick (hammer) shows rejection of lower prices — a buy signal. The wick represents a 'probe' that was rejected." },
            { type: "paragraph", text: "Inside Bars: A candle whose entire range (high to low) fits within the range of the previous candle. It represents consolidation and a potential breakout. Trade the breakout direction — buy if it breaks above the mother bar's high, sell if it breaks below the mother bar's low." },
            { type: "paragraph", text: "Engulfing Bars: As covered earlier, but in price action context, the key is the close relative to the previous candle. A bullish engulfing that closes above the high of the previous 2-3 candles is especially powerful." },
            { type: "heading", text: "Price Action at Key Levels" },
            { type: "paragraph", text: "Price action signals are most powerful at key support/resistance levels, trendlines, and round numbers. A pin bar in the middle of a range means little. A pin bar right at a major support level that has held 5 times before is a high-probability trade." },
            { type: "callout", text: "Key Takeaway: Price action is about understanding market psychology through the chart. Learn to read pin bars, inside bars, and engulfing patterns at key levels. It's the simplest yet most effective form of technical analysis — no fancy indicators needed." },
          ],
        },
      ],
      quiz: {
        id: "m2-quiz",
        questions: [
          { q: "When a support level breaks, it typically becomes:", options: ["Stronger support", "Resistance", "Irrelevant", "A gap"], answer: 1 },
          { q: "A hammer candlestick appears at the:", options: ["Top of an uptrend", "Bottom of a downtrend", "Middle of a range", "Only during gaps"], answer: 1 },
          { q: "What does a Doji candlestick indicate?", options: ["Strong buying", "Strong selling", "Indecision between buyers and sellers", "High volume"], answer: 2 },
          { q: "A Morning Star pattern consists of:", options: ["1 candle", "2 candles", "3 candles", "5 candles"], answer: 2 },
          { q: "Three White Soldiers indicates:", options: ["Bearish reversal", "Strong sustained buying pressure", "Market indecision", "Low volume"], answer: 1 },
          { q: "An Inside Bar represents:", options: ["Breakout", "Consolidation and potential breakout", "Strong trend", "Volume spike"], answer: 1 },
          { q: "Support and resistance levels are strongest when:", options: ["Tested only once", "Visible only on 1-minute chart", "Tested multiple times with high volume", "The stock is illiquid"], answer: 2 },
          { q: "A Shooting Star at a resistance level signals:", options: ["Buy immediately", "Potential bearish reversal", "Start of an uptrend", "Gap up coming"], answer: 1 },
          { q: "Round numbers like ₹500 or ₹1,000 often act as:", options: ["Random noise", "Psychological support/resistance", "Guaranteed reversal points", "Volume indicators"], answer: 1 },
          { q: "In price action trading, the most important thing is:", options: ["Using 10+ indicators", "Reading price at key support/resistance levels", "Trading on 1-minute charts only", "Following social media tips"], answer: 1 },
        ],
      },
    },

    // ══════════════════════════════════════
    // MODULE 3: Moving Averages
    // ══════════════════════════════════════
    {
      id: "m3",
      title: "Moving Averages — Trend Following Made Simple",
      lessons: [
        {
          id: "m3-l1", title: "SMA vs EMA — Which Moving Average to Use", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "The Most Widely Used Indicator in Trading" },
            { type: "paragraph", text: "Moving averages smooth out price data to show the underlying trend direction. They're the most popular technical indicator because they're simple, visual, and surprisingly effective. If you only learn one indicator, learn moving averages." },
            { type: "heading", text: "Simple Moving Average (SMA)" },
            { type: "paragraph", text: "An SMA calculates the average closing price over a set number of periods. A 50-day SMA adds up the last 50 closing prices and divides by 50. Each day, the oldest price drops off and the newest price is added. The result is a smooth line on the chart that shows the average trend direction." },
            { type: "heading", text: "Exponential Moving Average (EMA)" },
            { type: "paragraph", text: "An EMA also calculates an average, but gives more weight to recent prices. This makes the EMA react faster to price changes than the SMA. A 50-day EMA will turn before a 50-day SMA because it's more sensitive to recent movements." },
            { type: "table", headers: ["Feature", "SMA", "EMA"], rows: [
              ["Calculation", "Equal weight to all prices", "More weight to recent prices"],
              ["Responsiveness", "Slower, smoother", "Faster, more sensitive"],
              ["False Signals", "Fewer", "More"],
              ["Lag", "More lag", "Less lag"],
              ["Best For", "Identifying major trends", "Faster entries/exits"],
            ]},
            { type: "heading", text: "Key Moving Average Periods" },
            { type: "paragraph", text: "20-day MA: Short-term trend (about 1 month of trading). 50-day MA: Medium-term trend (about 2.5 months). 100-day MA: Intermediate trend. 200-day MA: Long-term trend (about 1 year). The 200-day MA is the most watched by institutional investors — stocks above it are considered to be in a long-term uptrend." },
            { type: "callout", text: "Key Takeaway: Use EMAs for shorter-term trading (20, 50-period) and SMAs for longer-term analysis (100, 200-period). The 200-day SMA is the single most important moving average — institutional money often uses it as a buy/sell trigger." },
          ],
        },
        {
          id: "m3-l2", title: "Moving Average Crossovers — Golden Cross & Death Cross", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "When Moving Averages Cross" },
            { type: "paragraph", text: "Moving average crossovers are one of the most popular trading signals. When a shorter-period MA crosses above a longer-period MA, it signals a potential uptrend. When it crosses below, a potential downtrend." },
            { type: "heading", text: "The Golden Cross" },
            { type: "paragraph", text: "A Golden Cross occurs when the 50-day MA crosses above the 200-day MA. This is considered a major bullish signal — it suggests the stock's medium-term momentum is now positive relative to its long-term trend. Historically, stocks that form a Golden Cross tend to continue rising for the next 6-12 months." },
            { type: "heading", text: "The Death Cross" },
            { type: "paragraph", text: "The opposite — the 50-day MA crosses below the 200-day MA. This is a bearish signal suggesting the medium-term momentum has turned negative. Stocks forming a Death Cross often continue declining." },
            { type: "callout", text: "Real Example: NIFTY 50 formed a Golden Cross in April 2020 (after the COVID crash bottom). Investors who bought on this signal captured a rally from ~9,000 to ~18,000 over the next 18 months — a 100% gain." },
            { type: "heading", text: "Shorter-Period Crossovers" },
            { type: "paragraph", text: "For shorter-term trading, use the 9 EMA crossing the 21 EMA (popular for swing trading) or the 5 EMA crossing the 13 EMA (for aggressive trading). These generate more signals but with lower reliability. Always confirm with volume and price action." },
            { type: "heading", text: "Limitations" },
            { type: "paragraph", text: "Moving average crossovers are lagging signals — by the time the crossover happens, a significant portion of the move may already be over. They work best in trending markets and generate many false signals during sideways markets. Don't rely on crossovers alone." },
            { type: "callout", text: "Key Takeaway: The Golden Cross (50 above 200) and Death Cross (50 below 200) are powerful long-term signals. For shorter-term trading, use 9/21 EMA crossovers. Always confirm crossover signals with volume and support/resistance levels." },
          ],
        },
        {
          id: "m3-l3", title: "Using Moving Averages as Dynamic Support & Resistance", type: "article", videoUrl: "", duration: "10 min",
          content: [
            { type: "heading", text: "Moving Averages as Trend Guides" },
            { type: "paragraph", text: "Beyond crossovers, moving averages serve as dynamic (moving) support and resistance levels. In an uptrend, the price often pulls back to a key MA and bounces — the MA acts as a 'moving floor' for the stock." },
            { type: "heading", text: "How It Works in Practice" },
            { type: "paragraph", text: "In strong uptrends, the stock stays above the 20 EMA. Minor pullbacks find support at the 20 EMA. In moderate uptrends, pullbacks go deeper to the 50 SMA before bouncing. In weaker uptrends or early reversals, the price tests the 200 SMA." },
            { type: "paragraph", text: "The strategy is simple: in an uptrend, wait for the price to pull back to a key MA, then buy when a bullish candlestick pattern forms at that MA. Set your stop-loss just below the MA." },
            { type: "heading", text: "The MA Ribbon" },
            { type: "paragraph", text: "Plotting multiple MAs (10, 20, 50, 100, 200) creates a 'ribbon' effect. When the MAs are fanning out (spreading apart) with shorter MAs above longer ones, the trend is strong. When the MAs start converging and crossing each other, the trend is weakening or reversing." },
            { type: "callout", text: "Key Takeaway: Use MAs as pullback buy zones in uptrends. The 20 EMA is for aggressive entries, 50 SMA for standard entries, and 200 SMA as the last line of defense. If a stock closes below the 200 SMA, the long-term trend has turned bearish." },
          ],
        },
      ],
      quiz: {
        id: "m3-quiz",
        questions: [
          { q: "A 200-day SMA represents approximately:", options: ["1 month of trading", "6 months of trading", "1 year of trading", "2 years of trading"], answer: 2 },
          { q: "Which MA gives more weight to recent prices?", options: ["SMA", "EMA", "Both weight equally", "Neither"], answer: 1 },
          { q: "A Golden Cross occurs when:", options: ["50-day MA crosses below 200-day MA", "50-day MA crosses above 200-day MA", "Price crosses above 52-week high", "RSI crosses 70"], answer: 1 },
          { q: "A Death Cross is generally considered:", options: ["Bullish", "Bearish", "Neutral", "Irrelevant"], answer: 1 },
          { q: "In a strong uptrend, price pullbacks typically find support at:", options: ["200 SMA", "20 EMA", "No MA provides support", "50 SMA only"], answer: 1 },
          { q: "Moving average crossovers work best in:", options: ["Sideways markets", "Trending markets", "Low-volume markets", "Only during earnings season"], answer: 1 },
          { q: "The most watched moving average by institutional investors is:", options: ["9 EMA", "20 SMA", "50 EMA", "200 SMA"], answer: 3 },
          { q: "When MA ribbons converge and cross each other, it suggests:", options: ["Strong uptrend", "Strong downtrend", "Trend weakening or reversing", "Buy signal"], answer: 2 },
          { q: "A stock trading ABOVE its 200-day MA is generally in a:", options: ["Downtrend", "Long-term uptrend", "Sideways market only", "Crash phase"], answer: 1 },
          { q: "The main limitation of MA crossovers is:", options: ["They never work", "They are leading indicators", "They are lagging — signal comes after the move starts", "They only work on weekly charts"], answer: 2 },
        ],
      },
    },

    // ══════════════════════════════════════
    // MODULE 4: Key Technical Indicators
    // ══════════════════════════════════════
    {
      id: "m4",
      title: "Essential Technical Indicators",
      lessons: [
        {
          id: "m4-l1", title: "RSI — Relative Strength Index", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "Measuring Momentum" },
            { type: "paragraph", text: "The Relative Strength Index (RSI) is a momentum oscillator developed by J. Welles Wilder in 1978. It measures the speed and magnitude of price changes on a scale of 0 to 100. RSI is one of the most versatile and widely used indicators in trading." },
            { type: "heading", text: "How RSI Works" },
            { type: "paragraph", text: "RSI calculates the ratio of average gains to average losses over a specified period (typically 14 days). When a stock has been rising consistently, RSI will be high. When it's been falling, RSI will be low." },
            { type: "table", headers: ["RSI Level", "Interpretation", "Action"], rows: [
              ["Above 70", "Overbought — stock may be overextended", "Consider selling or tightening stop-loss"],
              ["50-70", "Bullish momentum", "Hold or add positions"],
              ["30-50", "Bearish momentum or neutral", "Watch for reversal signals"],
              ["Below 30", "Oversold — stock may be undervalued", "Look for buying opportunities"],
            ]},
            { type: "heading", text: "RSI Divergence — The Most Powerful Signal" },
            { type: "paragraph", text: "Bullish Divergence: Price makes a lower low, but RSI makes a higher low. This means selling pressure is weakening even though price is still falling. It's one of the strongest reversal signals in all of technical analysis." },
            { type: "paragraph", text: "Bearish Divergence: Price makes a higher high, but RSI makes a lower high. Buying momentum is fading even as price reaches new highs. Often precedes significant corrections." },
            { type: "callout", text: "Pro Tip: RSI works best as a divergence indicator, not just for overbought/oversold readings. A stock can stay overbought (above 70) for weeks during a strong uptrend. But if price makes a new high while RSI doesn't, that divergence is a reliable warning sign." },
            { type: "callout", text: "Key Takeaway: RSI tells you the strength behind price movements. Overbought/oversold readings give context, but divergences give actionable signals. Combine RSI with support/resistance levels for highest-probability trades." },
          ],
        },
        {
          id: "m4-l2", title: "MACD — Moving Average Convergence Divergence", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "The Trend-Momentum Hybrid" },
            { type: "paragraph", text: "MACD is a versatile indicator that shows both trend direction and momentum. It was developed by Gerald Appel in the late 1970s and remains one of the most popular indicators among professional traders." },
            { type: "heading", text: "MACD Components" },
            { type: "paragraph", text: "MACD Line: The difference between the 12-period EMA and 26-period EMA. When the MACD line is above zero, the short-term trend is bullish. Below zero, it's bearish." },
            { type: "paragraph", text: "Signal Line: A 9-period EMA of the MACD line. It acts as a trigger for buy/sell signals." },
            { type: "paragraph", text: "Histogram: The difference between the MACD line and signal line, displayed as bars. Growing bars = increasing momentum. Shrinking bars = momentum is fading." },
            { type: "heading", text: "MACD Trading Signals" },
            { type: "paragraph", text: "Signal Line Crossover: When MACD crosses above the signal line, it's a buy signal. When it crosses below, it's a sell signal. This is the most common MACD signal." },
            { type: "paragraph", text: "Zero Line Crossover: When MACD crosses above zero, the medium-term trend has turned bullish. Below zero = bearish. This is a slower but more reliable signal." },
            { type: "paragraph", text: "Divergence: Just like RSI, when price makes a new high but MACD makes a lower high (bearish divergence), or price makes a new low but MACD makes a higher low (bullish divergence), it signals a potential reversal." },
            { type: "callout", text: "Key Takeaway: MACD is most useful for confirming trend direction and spotting momentum shifts. Use signal line crossovers for entry/exit timing, zero line crossovers for trend confirmation, and divergences for reversal warnings. MACD works best on daily and weekly charts." },
          ],
        },
        {
          id: "m4-l3", title: "Bollinger Bands — Measuring Volatility", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "The Volatility Envelope" },
            { type: "paragraph", text: "Bollinger Bands, developed by John Bollinger, consist of three lines: a middle band (20-period SMA), an upper band (2 standard deviations above the SMA), and a lower band (2 standard deviations below). They expand when volatility increases and contract when it decreases." },
            { type: "heading", text: "How to Interpret Bollinger Bands" },
            { type: "paragraph", text: "Approximately 95% of price action occurs within the bands. When price touches or exceeds the upper band, the stock is relatively expensive (overbought). When it touches or falls below the lower band, it's relatively cheap (oversold)." },
            { type: "heading", text: "The Bollinger Squeeze" },
            { type: "paragraph", text: "When the bands contract tightly (squeeze), it signals low volatility — and low volatility always precedes high volatility. A squeeze followed by a breakout above the upper band signals a potential bullish move. A break below the lower band signals a bearish move. The squeeze is one of the best breakout setups in trading." },
            { type: "heading", text: "Bollinger Band Walk" },
            { type: "paragraph", text: "In strong trends, the price 'walks' along the upper (uptrend) or lower (downtrend) band. During a Bollinger Band walk, the stock consistently touches or exceeds the band — this is NOT a sell signal, it's a sign of trend strength. Only trade against the band when you see divergence or reversal candles." },
            { type: "callout", text: "Key Takeaway: Bollinger Bands are best for identifying volatility squeezes (breakout setups) and mean-reversion trades (buying at the lower band in an uptrend). The squeeze is a powerful setup — when bands contract tightly, prepare for a big move." },
          ],
        },
        {
          id: "m4-l4", title: "VWAP, Supertrend & ADX — Other Useful Indicators", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "VWAP — Volume Weighted Average Price" },
            { type: "paragraph", text: "VWAP calculates the average price weighted by volume throughout the day. Institutional traders use VWAP as a benchmark — if they buy below VWAP, they got a good price. For retail traders, VWAP acts as intraday dynamic support/resistance. Price above VWAP = bullish intraday bias; below = bearish." },
            { type: "heading", text: "Supertrend Indicator" },
            { type: "paragraph", text: "Supertrend is a trend-following indicator popular in India. It plots a line above or below the price based on Average True Range (ATR). When the line is below the price (green), the trend is up — hold or buy. When it's above (red), the trend is down — sell or short. It's simple, visual, and effective for trailing stop-losses." },
            { type: "heading", text: "ADX — Average Directional Index" },
            { type: "paragraph", text: "ADX measures trend strength, not direction. An ADX above 25 means the stock is trending (either up or down). Below 20 means the stock is range-bound. ADX above 40 indicates a very strong trend. Use ADX to decide whether to use trend-following strategies (high ADX) or mean-reversion strategies (low ADX)." },
            { type: "table", headers: ["Indicator", "Best For", "Timeframe"], rows: [
              ["VWAP", "Intraday fair value & bias", "Intraday only (resets daily)"],
              ["Supertrend", "Trend direction & trailing stops", "Daily, weekly"],
              ["ADX", "Measuring trend strength", "Daily, weekly"],
              ["RSI", "Momentum & divergences", "All timeframes"],
              ["MACD", "Trend direction & momentum shifts", "Daily, weekly"],
              ["Bollinger Bands", "Volatility & squeeze breakouts", "Daily, weekly"],
            ]},
            { type: "callout", text: "Key Takeaway: Don't use all indicators at once — that causes 'analysis paralysis.' Pick 2-3 that complement each other: one for trend (MA or Supertrend), one for momentum (RSI or MACD), and one for volatility (Bollinger Bands). Master these before adding more." },
          ],
        },
      ],
      quiz: {
        id: "m4-quiz",
        questions: [
          { q: "RSI above 70 generally indicates:", options: ["Oversold", "Overbought", "Neutral", "Trend reversal confirmed"], answer: 1 },
          { q: "Bullish RSI divergence occurs when:", options: ["Price and RSI both make higher highs", "Price makes lower low but RSI makes higher low", "RSI stays above 50", "Price crosses above RSI"], answer: 1 },
          { q: "MACD stands for:", options: ["Market Average Convergence Direction", "Moving Average Convergence Divergence", "Multiple Asset Cross Direction", "Market Analysis Chart Data"], answer: 1 },
          { q: "The MACD histogram shows:", options: ["Stock price", "Volume", "Difference between MACD and signal line", "52-week range"], answer: 2 },
          { q: "A Bollinger Band squeeze signals:", options: ["Low volatility preceding a big move", "High volatility ending", "Stock is going bankrupt", "Volume is declining"], answer: 0 },
          { q: "During a Bollinger Band walk in an uptrend, price touches the:", options: ["Lower band repeatedly", "Upper band repeatedly", "Middle band only", "No bands at all"], answer: 1 },
          { q: "VWAP is most useful for:", options: ["Weekly analysis", "Monthly investing", "Intraday trading", "Fundamental analysis"], answer: 2 },
          { q: "ADX above 25 indicates:", options: ["Stock is oversold", "Stock is overbought", "Stock is trending", "Stock is range-bound"], answer: 2 },
          { q: "The Supertrend indicator is best used for:", options: ["Volume analysis", "Fundamental valuation", "Trend following and trailing stops", "Dividend analysis"], answer: 2 },
          { q: "How many indicators should you ideally use together?", options: ["1 only", "2-3 complementary ones", "All available indicators", "None — only use price action"], answer: 1 },
        ],
      },
    },

    // ══════════════════════════════════════
    // MODULE 5: Chart Patterns
    // ══════════════════════════════════════
    {
      id: "m5",
      title: "Chart Patterns — Reversal & Continuation",
      lessons: [
        {
          id: "m5-l1", title: "Head & Shoulders — The Most Reliable Reversal Pattern", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "Anatomy of a Head & Shoulders" },
            { type: "paragraph", text: "The Head and Shoulders pattern is considered the most reliable reversal pattern in technical analysis. It has three peaks: the left shoulder (moderate high), the head (highest high), and the right shoulder (moderate high, similar to left shoulder). The line connecting the two troughs between the peaks is called the neckline." },
            { type: "paragraph", text: "The pattern signals that buyers tried to push higher three times but each attempt was weaker — the right shoulder failed to reach the head's height. When the price breaks below the neckline, it confirms the reversal and often leads to a decline equal to the distance from the head to the neckline." },
            { type: "heading", text: "How to Trade It" },
            { type: "paragraph", text: "Wait for the neckline break — don't sell prematurely. Volume should decline from left shoulder to head to right shoulder, then spike on the neckline break. The target is the distance from head to neckline, projected downward from the break point." },
            { type: "heading", text: "Inverse Head & Shoulders" },
            { type: "paragraph", text: "The bullish version appears at the bottom of downtrends. Three troughs with the middle being the deepest. A break above the neckline signals a bullish reversal. Trade logic is identical but inverted." },
            { type: "callout", text: "Key Takeaway: Head & Shoulders has a success rate of about 70-75% when the neckline breaks with above-average volume. Always wait for the neckline break — the pattern isn't confirmed until then. The target projection gives you a clear profit objective." },
          ],
        },
        {
          id: "m5-l2", title: "Double Tops & Double Bottoms", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "The 'M' and 'W' Patterns" },
            { type: "paragraph", text: "Double Top: Price reaches a resistance level twice, fails to break above both times, forming an 'M' shape. It signals buyers exhausted their strength. Confirmation comes when the price breaks below the trough between the two peaks (the neckline). Target: distance from peaks to neckline, projected downward." },
            { type: "paragraph", text: "Double Bottom: Price reaches a support level twice, fails to break below both times, forming a 'W' shape. It signals sellers exhausted their strength. Confirmation comes on a break above the peak between the two troughs. Target: distance projected upward." },
            { type: "heading", text: "What Makes a Valid Double Top/Bottom" },
            { type: "paragraph", text: "The two peaks/troughs should be within 3-5% of each other (they don't need to be exact). There should be at least 1-2 weeks between the two tests. Volume should be lower on the second test — this confirms weakening momentum. The break of the neckline should be on higher-than-average volume." },
            { type: "callout", text: "Key Takeaway: Double tops and bottoms are among the most frequently seen and traded patterns. They're simple to identify and have clear entry points (neckline break), stop-loss levels (beyond the second peak/trough), and targets (neckline distance projected). Practice spotting these on historical charts." },
          ],
        },
        {
          id: "m5-l3", title: "Triangles — Ascending, Descending & Symmetrical", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "Triangles — Where Price Coils Before Exploding" },
            { type: "paragraph", text: "Triangle patterns form when the trading range narrows over time, creating converging trendlines. They represent a tug-of-war between buyers and sellers that's building pressure — and like a coiled spring, the eventual breakout can be powerful." },
            { type: "heading", text: "Ascending Triangle (Bullish)" },
            { type: "paragraph", text: "Flat resistance line on top with rising support line below. Each pullback finds support at a higher level while the stock keeps testing the same resistance. This shows buyers are increasingly aggressive. The eventual breakout above the flat resistance is usually explosive. This is a bullish pattern with roughly 70% breakout to the upside." },
            { type: "heading", text: "Descending Triangle (Bearish)" },
            { type: "paragraph", text: "Flat support line on the bottom with declining resistance above. Each rally fails at a lower level while the stock keeps testing the same support. Sellers are increasingly aggressive. The eventual breakdown below flat support is bearish. About 70% break to the downside." },
            { type: "heading", text: "Symmetrical Triangle (Neutral)" },
            { type: "paragraph", text: "Both support and resistance converge equally — lower highs AND higher lows. This pattern can break in either direction. It typically resolves in the direction of the prior trend (continuation). Wait for the breakout before trading — don't guess the direction." },
            { type: "heading", text: "Trading Triangle Breakouts" },
            { type: "paragraph", text: "Enter on the breakout candle with strong volume. Set stop-loss just inside the triangle. Target: the widest point of the triangle, projected from the breakout point. Best breakouts occur in the first 2/3 of the triangle — breakouts near the apex (point) tend to be weaker." },
            { type: "callout", text: "Key Takeaway: Triangles are powerful patterns because they show energy building up. Ascending = bullish bias, Descending = bearish bias, Symmetrical = follow the trend. Always wait for the breakout with volume confirmation — don't anticipate." },
          ],
        },
        {
          id: "m5-l4", title: "Flags, Pennants & Wedges — Continuation Patterns", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "Brief Pauses in Strong Trends" },
            { type: "paragraph", text: "While reversal patterns signal trend changes, continuation patterns signal that the current trend will likely resume after a brief pause. These are the patterns you look for when you want to add to a winning position." },
            { type: "heading", text: "Bull Flag" },
            { type: "paragraph", text: "After a sharp upward move (the 'flagpole'), the price pulls back in a tight, parallel downward channel (the 'flag'). This pullback is on declining volume. When the price breaks above the flag's upper boundary on high volume, the uptrend resumes. Target: the height of the flagpole projected from the breakout. Bull flags have a very high success rate — about 70-80%." },
            { type: "heading", text: "Pennant" },
            { type: "paragraph", text: "Similar to a flag, but instead of a parallel channel, the consolidation forms a small symmetrical triangle. The flagpole + pennant is very common in momentum stocks. Trading rules are the same as flags." },
            { type: "heading", text: "Wedges" },
            { type: "paragraph", text: "Rising Wedge: Both trendlines slope upward but converge. Despite higher highs, the momentum is weakening. Usually bearish — a rising wedge in an uptrend signals a potential top. Falling Wedge: Both trendlines slope downward but converge. Usually bullish — a falling wedge in a downtrend signals a potential bottom." },
            { type: "callout", text: "Key Takeaway: Continuation patterns offer some of the best risk-reward trades because you're trading with the trend after a healthy pullback. Bull flags are especially powerful — look for them after a stock makes a strong move on high volume, then pulls back on low volume." },
          ],
        },
      ],
      quiz: {
        id: "m5-quiz",
        questions: [
          { q: "The most reliable reversal pattern is generally considered to be:", options: ["Triangle", "Head and Shoulders", "Flag", "Pennant"], answer: 1 },
          { q: "In a Head & Shoulders, the pattern is confirmed when:", options: ["The right shoulder forms", "The head is the highest", "Price breaks below the neckline", "Volume is high on left shoulder"], answer: 2 },
          { q: "A Double Bottom forms which shape?", options: ["M shape", "W shape", "V shape", "U shape"], answer: 1 },
          { q: "An Ascending Triangle has:", options: ["Rising resistance, flat support", "Flat resistance, rising support", "Both lines flat", "Both lines rising"], answer: 1 },
          { q: "Which triangle type is typically bearish?", options: ["Ascending", "Symmetrical", "Descending", "All are bearish"], answer: 2 },
          { q: "A Bull Flag forms after:", options: ["A slow decline", "A sharp upward move followed by a tight pullback", "A sideways market", "An earnings miss"], answer: 1 },
          { q: "A Rising Wedge is generally:", options: ["Bullish", "Bearish", "Neutral", "Only valid intraday"], answer: 1 },
          { q: "The target for a H&S pattern is:", options: ["Random", "Distance from head to neckline, projected down", "Always exactly 10%", "Previous support level"], answer: 1 },
          { q: "Best triangle breakouts occur:", options: ["Near the apex (point)", "In the first 2/3 of the triangle", "After the apex", "Only on Mondays"], answer: 1 },
          { q: "Continuation patterns signal that:", options: ["The trend will reverse", "The stock is going bankrupt", "The current trend will likely resume", "Volume will decrease permanently"], answer: 2 },
        ],
      },
    },

    // ══════════════════════════════════════
    // MODULE 6: Fibonacci & Advanced Concepts
    // ══════════════════════════════════════
    {
      id: "m6",
      title: "Fibonacci Retracements & Advanced Tools",
      lessons: [
        {
          id: "m6-l1", title: "Fibonacci Retracements — Finding Pullback Levels", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "The Mathematics of Markets" },
            { type: "paragraph", text: "Fibonacci retracements are horizontal lines drawn at key percentage levels derived from the Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13, 21...). These levels — 23.6%, 38.2%, 50%, 61.8%, and 78.6% — represent potential support or resistance levels where a pullback might reverse and the trend resumes." },
            { type: "heading", text: "Why Fibonacci Works" },
            { type: "paragraph", text: "Fibonacci ratios appear throughout nature (flower petals, seashell spirals, galaxy formations) and, remarkably, in financial markets. They work primarily because so many traders use them — creating a self-fulfilling prophecy. When thousands of traders place buy orders at the 61.8% retracement level, the collective buying creates actual support." },
            { type: "heading", text: "Key Fibonacci Levels" },
            { type: "table", headers: ["Level", "Significance", "What It Tells You"], rows: [
              ["23.6%", "Shallow retracement", "Very strong trend — barely pulling back"],
              ["38.2%", "Moderate retracement", "Healthy pullback in a strong trend"],
              ["50%", "Halfway point", "Not a true Fibonacci number but widely watched"],
              ["61.8%", "The Golden Ratio", "Most important level — strong trend's deepest pullback"],
              ["78.6%", "Deep retracement", "Trend is weakening but may still hold"],
            ]},
            { type: "heading", text: "How to Draw Fibonacci Retracements" },
            { type: "paragraph", text: "For an uptrend pullback: draw from the swing low (bottom) to the swing high (top). The retracement levels will appear between these two points. Look for the price to find support at 38.2%, 50%, or 61.8% levels. The 61.8% level is called the 'Golden Ratio' and is the most important level." },
            { type: "callout", text: "Pro Tip: Fibonacci levels are most powerful when they align with other support/resistance levels, moving averages, or previous price structure. When a 50% Fibonacci retracement coincides with the 200-day MA and a previous support level, that's a 'confluence zone' — a very high-probability buy level." },
            { type: "callout", text: "Key Takeaway: Use Fibonacci retracements to identify where to buy during pullbacks in an uptrend. The 38.2-61.8% zone is the 'sweet spot' for entries. Fibonacci works best when combined with other analysis tools (MAs, S/R, volume). Don't use it in isolation." },
          ],
        },
        {
          id: "m6-l2", title: "Pivot Points, Gap Analysis & Chart Confluences", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "Pivot Points" },
            { type: "paragraph", text: "Pivot points are calculated from the previous day's high, low, and close. They create automatic support (S1, S2, S3) and resistance (R1, R2, R3) levels for the current day. Intraday traders use pivots extensively. The Central Pivot (P) acts as the day's equilibrium — price above P = bullish bias, below = bearish." },
            { type: "heading", text: "Gap Analysis" },
            { type: "paragraph", text: "A gap occurs when a stock opens significantly higher (gap up) or lower (gap down) than the previous close, leaving an empty space on the chart. Breakaway Gaps occur at the start of trends (don't fade these). Continuation Gaps occur mid-trend (trend is accelerating). Exhaustion Gaps occur at the end of trends (likely to fill). About 70% of common gaps fill within a few days." },
            { type: "heading", text: "Confluence — Where Multiple Signals Align" },
            { type: "paragraph", text: "The most powerful trades happen at 'confluence zones' — areas where multiple technical factors align. For example: A stock pulls back to the 50% Fibonacci retracement, which coincides with the 50-day EMA, which is also a previous resistance-turned-support level, and a hammer candle forms there with above-average volume. This is a high-probability setup because four independent signals all point to the same conclusion." },
            { type: "callout", text: "Key Takeaway: Confluence is the secret weapon of experienced technical analysts. The more independent signals that agree at a single price level, the higher the probability of success. Always look for at least 2-3 confirming factors before entering a trade." },
          ],
        },
      ],
      quiz: {
        id: "m6-quiz",
        questions: [
          { q: "The most important Fibonacci retracement level is:", options: ["23.6%", "38.2%", "61.8% (Golden Ratio)", "100%"], answer: 2 },
          { q: "Fibonacci retracements are drawn from:", options: ["Open to close", "Swing low to swing high (or vice versa)", "52-week high to 52-week low", "Yesterday's close to today's open"], answer: 1 },
          { q: "A confluence zone is:", options: ["Where only one indicator gives a signal", "Where multiple independent signals align at the same price", "A Japanese candlestick pattern", "A type of moving average"], answer: 1 },
          { q: "What percentage of common gaps typically fill?", options: ["10%", "30%", "About 70%", "100%"], answer: 2 },
          { q: "In pivot points, price above the Central Pivot (P) suggests:", options: ["Bearish bias", "Bullish intraday bias", "No direction", "Market is closed"], answer: 1 },
          { q: "A breakaway gap occurs at:", options: ["The end of a trend", "The start of a new trend", "During sideways markets", "Only on weekly charts"], answer: 1 },
          { q: "The Fibonacci 38.2-61.8% zone is considered the:", options: ["Danger zone", "Sweet spot for pullback entries", "Automatic sell zone", "Only for long-term charts"], answer: 1 },
          { q: "Fibonacci works in markets partly because:", options: ["It's based on magic", "Many traders use the same levels, creating self-fulfilling prophecy", "SEBI requires it", "It predicts exact prices"], answer: 1 },
        ],
      },
    },

    // ══════════════════════════════════════
    // MODULE 7: Building Your Trading System
    // ══════════════════════════════════════
    {
      id: "m7",
      title: "Building Your Technical Trading System",
      lessons: [
        {
          id: "m7-l1", title: "Creating a Trading Checklist & Plan", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "From Theory to System" },
            { type: "paragraph", text: "Knowing technical analysis concepts is not enough — you need a structured system. A trading system removes emotion from the equation and gives you a repeatable process. Every successful trader follows a plan; every struggling trader 'wings it.'" },
            { type: "heading", text: "Your Pre-Trade Checklist" },
            { type: "paragraph", text: "Before entering any trade, answer these questions: 1) What is the trend on the weekly and daily chart? 2) Is there a clear support/resistance level nearby? 3) Is there a candlestick or chart pattern setup? 4) Does volume confirm the move? 5) What does RSI/MACD show? 6) Where is my exact entry price? 7) Where is my stop-loss? 8) Where is my profit target? 9) What is my risk-reward ratio (minimum 1:2)? 10) Am I risking more than 2% of my capital?" },
            { type: "paragraph", text: "If you can't answer all 10 questions clearly, don't take the trade. Write this checklist on paper and go through it every time. Over time, it becomes second nature." },
            { type: "heading", text: "Risk-Reward: The Math That Makes You Profitable" },
            { type: "paragraph", text: "You don't need to be right most of the time to be profitable. With a 1:2 risk-reward ratio (risk ₹1 to potentially make ₹2), you only need to be right 40% of the time to break even. At 50% accuracy with 1:2 risk-reward, you're solidly profitable. Focus on risk-reward, not on win rate." },
            { type: "callout", text: "Key Takeaway: A trading system turns subjective analysis into objective decisions. Create your checklist, follow it religiously, and review your trades monthly. The system doesn't need to be complex — it needs to be consistent. Consistency beats complexity every time." },
          ],
        },
        {
          id: "m7-l2", title: "Backtesting Your Strategy & Keeping a Trading Journal", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "Proving Your Strategy Works" },
            { type: "paragraph", text: "Before risking real money, backtest your strategy on historical charts. Go back 1-2 years on a stock and manually find every setup that matches your criteria. Record the entry, stop-loss, target, and outcome. After 50-100 trades, calculate your win rate and average risk-reward. If the numbers work on historical data, they'll likely work going forward." },
            { type: "heading", text: "The Trading Journal — Your Most Valuable Tool" },
            { type: "paragraph", text: "Record every trade with: Date, stock name, entry price, exit price, stop-loss, P&L, the reason for entry (which pattern/indicator), a screenshot of the chart, and your emotional state at entry. After 3 months, review your journal. You'll discover patterns — maybe you lose money on Mondays, or your best trades are all based on double bottoms, or you consistently exit too early." },
            { type: "heading", text: "Common Pitfalls to Avoid" },
            { type: "paragraph", text: "Don't curve-fit your strategy to past data — keep it simple with clear rules. Don't optimize endlessly (looking for the 'perfect' settings). Don't trade a strategy you haven't backtested for at least 50 trades. Don't ignore your journal — it contains the insights that will make you profitable." },
            { type: "callout", text: "Key Takeaway: Backtesting gives you confidence. A trading journal gives you improvement. Together, they transform you from a gambler into a systematic trader. The best traders spend more time analyzing their past trades than finding new ones." },
          ],
        },
        {
          id: "m7-l3", title: "Common Technical Analysis Mistakes & Next Steps", type: "article", videoUrl: "", duration: "10 min",
          content: [
            { type: "heading", text: "Mistakes That Cost Traders Money" },
            { type: "paragraph", text: "Using too many indicators (cluttered chart = confused decisions). Trading against the higher timeframe trend. Ignoring volume on breakouts. Moving stop-losses further away from the price (hoping instead of managing risk). Forcing trades when there's no setup. Over-trading during choppy, sideways markets." },
            { type: "heading", text: "Your Next Steps" },
            { type: "paragraph", text: "Step 1: Practice identifying trends, support/resistance on at least 20 different stock charts. Step 2: Learn to spot 3-4 key candlestick patterns (hammer, engulfing, doji, morning star). Step 3: Add one indicator (start with RSI or MACD) and practice reading it for 2-4 weeks. Step 4: Create your trading checklist with clear entry/exit rules. Step 5: Backtest your strategy on 50+ historical trades. Step 6: Paper trade for 1-2 months before using real money. Step 7: Start with small positions and gradually increase as you build confidence." },
            { type: "heading", text: "Recommended Next Course" },
            { type: "paragraph", text: "Take the Fundamental Analysis course next. The most successful traders combine technical analysis (for timing) with fundamental analysis (for stock selection). This combination gives you an edge that pure technical or pure fundamental traders don't have." },
            { type: "callout", text: "Final Takeaway: Technical analysis is a skill, not a formula. Like any skill, it improves with deliberate practice. Spend 30 minutes daily studying charts, reviewing your trades, and reading about new concepts. Within 6-12 months of consistent practice, you'll start seeing the market differently — patterns will jump out at you that others miss." },
          ],
        },
      ],
      quiz: {
        id: "m7-quiz",
        questions: [
          { q: "How many pre-trade checklist items should you answer before entering a trade?", options: ["2-3 is enough", "All items — if you can't, don't trade", "None — go with gut feeling", "Only check the price"], answer: 1 },
          { q: "With a 1:2 risk-reward ratio, you need what win rate to be profitable?", options: ["90%+", "70%+", "Above 33% (breakeven at ~33%)", "100%"], answer: 2 },
          { q: "How many historical trades should you backtest minimum?", options: ["5", "10", "50-100", "1000+"], answer: 2 },
          { q: "A trading journal should include:", options: ["Only winning trades", "Entry, exit, stop-loss, reason, emotional state, chart screenshot", "Only the stock name", "Nothing — memory is enough"], answer: 1 },
          { q: "Before using real money, you should:", options: ["Immediately trade with maximum capital", "Paper trade for 1-2 months after backtesting", "Ask a friend for stock picks", "Only trade penny stocks"], answer: 1 },
          { q: "Using too many indicators leads to:", options: ["Better decisions", "Analysis paralysis and confusion", "Guaranteed profits", "Faster trading"], answer: 1 },
          { q: "Moving your stop-loss further from price is:", options: ["A smart risk management technique", "A dangerous habit driven by hope, not logic", "Recommended by experts", "Required by SEBI"], answer: 1 },
          { q: "The best traders spend more time:", options: ["Finding new trades", "Analyzing past trades and journaling", "Watching news channels", "On social media"], answer: 1 },
        ],
      },
    },
  ],
};
