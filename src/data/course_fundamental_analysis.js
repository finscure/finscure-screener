// ═══════════════════════════════════════════════════════════
// COURSE 3: FUNDAMENTAL ANALYSIS — Comprehensive Edition
// 7 Modules · 30 Lessons · 68 Quiz Questions
// ═══════════════════════════════════════════════════════════

export const FUNDAMENTAL_ANALYSIS = {
  id: "fundamental-analysis",
  title: "Fundamental Analysis",
  description: "Master the art of evaluating company financials — read income statements, balance sheets, and cash flow statements to find undervalued, quality businesses worth investing in.",
  icon: "🏦",
  color: "#dc2626",
  duration: "10 hours",
  lessons: 30,
  level: "Intermediate",
  modules: [
    // ══════════════════════════════════════
    // MODULE 1: Introduction to Fundamental Analysis
    // ══════════════════════════════════════
    {
      id: "m1",
      title: "What is Fundamental Analysis?",
      lessons: [
        {
          id: "m1-l1", title: "Fundamental Analysis — Thinking Like a Business Owner", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "Beyond the Stock Price" },
            { type: "paragraph", text: "Fundamental analysis is the process of evaluating a company's intrinsic value by examining its financial statements, industry position, management quality, and growth prospects. While technical analysis asks 'When should I buy?', fundamental analysis asks 'What should I buy?' and 'Is it worth the price?'" },
            { type: "paragraph", text: "When you buy a stock, you're not just buying a ticker symbol on a screen — you're buying a piece of a real business. Fundamental analysis helps you determine if that business is healthy, growing, and priced fairly." },
            { type: "heading", text: "The Two Approaches" },
            { type: "paragraph", text: "Top-Down Approach: Start with the big picture — global economy → Indian economy → sector analysis → individual company. For example: Global demand for technology → India's IT sector growth → which IT company has the best positioning? This approach works well for identifying sectors to invest in." },
            { type: "paragraph", text: "Bottom-Up Approach: Start with the company itself — find a great business first, then verify the economy and sector support it. Warren Buffett uses this approach. He looks for exceptional companies regardless of macroeconomic conditions." },
            { type: "callout", text: "Warren Buffett's Rule: 'Price is what you pay, value is what you get.' Fundamental analysis helps you determine the value, so you only pay a fair price — or better yet, a bargain price." },
            { type: "heading", text: "What Fundamental Analysts Look At" },
            { type: "table", headers: ["Category", "What to Examine", "Where to Find It"], rows: [
              ["Financial Health", "Revenue, profit, debt, cash flow", "Annual reports, quarterly results"],
              ["Valuation", "P/E, P/B, EV/EBITDA ratios", "Screener.in, Moneycontrol"],
              ["Growth", "Revenue & profit growth rates", "Quarterly & annual results"],
              ["Management", "Track record, integrity, vision", "Annual reports, interviews, AGM notes"],
              ["Competitive Advantage", "Moat — what protects the business", "Industry analysis, company filings"],
              ["Industry Position", "Market share, industry growth", "Industry reports, IBEF.org"],
            ]},
            { type: "callout", text: "Key Takeaway: Fundamental analysis is about understanding the business behind the stock. It takes more effort than technical analysis, but it builds conviction — when you truly understand a company, you won't panic-sell during market downturns because you know the business is sound." },
          ],
        },
        {
          id: "m1-l2", title: "Where to Find Financial Data — Annual Reports, Screeners & Filings", type: "article", videoUrl: "", duration: "10 min",
          content: [
            { type: "heading", text: "Your Research Toolkit" },
            { type: "paragraph", text: "Before you can analyze a company, you need access to reliable financial data. India has excellent free resources that give retail investors the same data that institutional investors use." },
            { type: "heading", text: "Primary Sources (Most Reliable)" },
            { type: "paragraph", text: "Annual Reports: Every listed company publishes an annual report on its website. This is the single most important document — it contains financial statements, management commentary (MD&A), risk factors, and business outlook. Read at least the first 30-40 pages of any company you're seriously considering." },
            { type: "paragraph", text: "BSE/NSE Filings: All corporate filings (quarterly results, board meeting outcomes, shareholding patterns) are available on BSE and NSE websites. These are the original, unedited filings." },
            { type: "heading", text: "Research Tools (Free)" },
            { type: "table", headers: ["Tool", "Best For", "Key Feature"], rows: [
              ["Screener.in", "Financial screening & ratios", "10-year financial data, custom screens"],
              ["Trendlyne.com", "Peer comparison & analysis", "Durability scores, DVM analysis"],
              ["Tijori Finance", "Visual financial data", "Beautiful charts of financial trends"],
              ["MoneyControl", "News + financials combined", "Comprehensive coverage"],
              ["SEBI EDIFAR/EDGAR", "Official regulatory filings", "IPO documents, offer documents"],
              ["Company websites", "Annual reports, investor presentations", "Management commentary"],
            ]},
            { type: "heading", text: "How to Read an Annual Report Efficiently" },
            { type: "paragraph", text: "Don't read cover to cover — focus on these sections: Chairman's Letter (big picture vision), Management Discussion & Analysis (detailed business review), Financial Statements (3 key statements), Notes to Accounts (hidden details and accounting policies), and Auditor's Report (any qualifications or red flags)." },
            { type: "callout", text: "Key Takeaway: Screener.in gives you 10 years of financial data for free — it's the best starting point for any Indian stock analysis. But always cross-reference with the actual annual report. Numbers without context can be misleading." },
          ],
        },
        {
          id: "m1-l3", title: "Qualitative vs Quantitative Analysis", type: "article", videoUrl: "", duration: "10 min",
          content: [
            { type: "heading", text: "Numbers Don't Tell the Full Story" },
            { type: "paragraph", text: "Fundamental analysis has two dimensions. Quantitative analysis deals with measurable financial data — revenue, profit, ratios, growth rates. Qualitative analysis deals with non-numerical factors — management quality, brand strength, competitive advantages, industry dynamics." },
            { type: "heading", text: "Quantitative Factors" },
            { type: "paragraph", text: "These are the hard numbers: Is revenue growing consistently? Are profit margins expanding or contracting? Is the company generating free cash flow? Is debt at manageable levels? Are return ratios (ROE, ROCE) above the cost of capital? These questions have precise, measurable answers." },
            { type: "heading", text: "Qualitative Factors" },
            { type: "paragraph", text: "Management Quality: Who runs the company? Do they have a track record of creating shareholder value? Do they have skin in the game (significant shareholding)? Have there been any governance issues? A great business with poor management will eventually disappoint." },
            { type: "paragraph", text: "Economic Moat: Does the company have a sustainable competitive advantage? This could be a brand (Titan, Asian Paints), network effects (NSE), switching costs (TCS clients), cost advantages (NTPC), or regulatory barriers (banks need RBI license). A moat protects profits from competition." },
            { type: "paragraph", text: "Industry Tailwinds: Is the industry growing? A mediocre company in a booming industry can outperform an excellent company in a declining industry. India's financialization, digitalization, and consumption upgrade are powerful tailwinds for multiple sectors." },
            { type: "callout", text: "Key Takeaway: The best investments score high on both quantitative AND qualitative factors. Strong financials with a wide moat and capable management is the trifecta. Don't invest based on numbers alone — understand the business, its competitive position, and the people running it." },
          ],
        },
        {
          id: "m1-l4", title: "The Concept of Intrinsic Value & Margin of Safety", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "What is a Stock Really Worth?" },
            { type: "paragraph", text: "Intrinsic value is the 'true' or 'fair' value of a company based on its fundamentals — independent of its current market price. If you estimate a stock's intrinsic value at ₹500 and it's trading at ₹350, you have a potential bargain. If it's trading at ₹700, it's overvalued." },
            { type: "paragraph", text: "The challenge is that intrinsic value isn't a single precise number — it's an estimate based on assumptions about future growth, profitability, and risk. Two analysts looking at the same company may arrive at different intrinsic values. That's okay — the goal is to get a reasonable range." },
            { type: "heading", text: "Margin of Safety — Your Insurance Policy" },
            { type: "paragraph", text: "Benjamin Graham, the father of value investing, introduced the concept of 'margin of safety.' The idea is simple: only buy a stock at a significant discount to your estimated intrinsic value. If you estimate intrinsic value at ₹500, buy at ₹350 or lower — the 30% discount is your margin of safety." },
            { type: "paragraph", text: "Why is this important? Because your estimate could be wrong. Maybe the true value is ₹450, not ₹500. With a margin of safety, you still bought at a discount (₹350 vs ₹450). Without it, you'd have overpaid. The margin of safety protects you from analytical errors." },
            { type: "heading", text: "How Much Margin of Safety Do You Need?" },
            { type: "table", headers: ["Company Type", "Recommended Margin", "Reasoning"], rows: [
              ["Blue-chip / large-cap", "15-25%", "Stable, predictable businesses"],
              ["Mid-cap growth", "25-35%", "Higher uncertainty in growth projections"],
              ["Small-cap / turnaround", "40-50%+", "Much higher risk, need larger cushion"],
              ["Cyclical industries", "35-50%", "Earnings are unpredictable cycle to cycle"],
            ]},
            { type: "callout", text: "Key Takeaway: Never buy a stock without a margin of safety. Calculate your best estimate of intrinsic value, then demand a 20-40% discount before buying. This single discipline will save you from most bad investments. Patience in waiting for the right price is a superpower." },
          ],
        },
      ],
      quiz: {
        id: "m1-quiz",
        questions: [
          { q: "Fundamental analysis primarily answers which question?", options: ["When should I buy?", "What should I buy and is it fairly priced?", "What is tomorrow's price?", "How much volume will trade?"], answer: 1 },
          { q: "The Top-Down approach starts with:", options: ["Individual company analysis", "Global/macro economy → sector → company", "Technical chart patterns", "Insider trading data"], answer: 1 },
          { q: "Which is the most important document for fundamental analysis?", options: ["Daily stock price", "Company's annual report", "Broker's recommendation", "Twitter posts by CEO"], answer: 1 },
          { q: "Screener.in provides how many years of financial data for free?", options: ["1 year", "3 years", "5 years", "10 years"], answer: 3 },
          { q: "An 'economic moat' refers to:", options: ["A river around a factory", "Sustainable competitive advantage", "High stock price", "Government subsidy"], answer: 1 },
          { q: "Intrinsic value is:", options: ["Always equal to market price", "The true/fair value based on fundamentals", "Set by SEBI", "The 52-week high"], answer: 1 },
          { q: "Margin of safety means:", options: ["Buying at a premium to fair value", "Buying at a discount to estimated intrinsic value", "Using stop-loss orders", "Only investing in government bonds"], answer: 1 },
          { q: "For a mid-cap growth stock, recommended margin of safety is:", options: ["5-10%", "15-20%", "25-35%", "0% — buy at any price"], answer: 2 },
          { q: "Which section of annual report gives management's business review?", options: ["Auditor's Report", "Balance Sheet", "Management Discussion & Analysis (MD&A)", "Share capital details"], answer: 2 },
          { q: "Qualitative analysis includes evaluating:", options: ["Only P/E ratios", "Management quality, moat, industry dynamics", "Only debt levels", "Only dividend yield"], answer: 1 },
        ],
      },
    },

    // ══════════════════════════════════════
    // MODULE 2: Income Statement Deep Dive
    // ══════════════════════════════════════
    {
      id: "m2",
      title: "The Income Statement (Profit & Loss)",
      lessons: [
        {
          id: "m2-l1", title: "Revenue, COGS & Gross Profit", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "The Top Line — Where It All Begins" },
            { type: "paragraph", text: "The income statement (also called Profit & Loss or P&L statement) shows how much money a company earned, spent, and kept as profit over a period (usually a quarter or year). It starts with revenue at the top and ends with net profit at the bottom — hence 'top line' and 'bottom line.'" },
            { type: "heading", text: "Revenue (Sales / Top Line)" },
            { type: "paragraph", text: "Revenue is the total money a company earns from selling its products or services. For TCS, revenue is the fees clients pay for IT services. For ITC, it's the sales of cigarettes, FMCG products, hotels, etc. Revenue is the starting point — if a company can't grow revenue, everything else becomes harder." },
            { type: "paragraph", text: "Look at revenue growth over 3, 5, and 10 years. Consistent double-digit revenue growth is a sign of a healthy, expanding business. Erratic or declining revenue is a red flag." },
            { type: "heading", text: "Cost of Goods Sold (COGS)" },
            { type: "paragraph", text: "COGS represents the direct costs of producing goods or delivering services. For a manufacturer like Maruti, COGS includes raw materials (steel, rubber), factory labor, and production costs. For an IT company like Infosys, COGS is primarily employee salaries and subcontractor costs." },
            { type: "heading", text: "Gross Profit & Gross Margin" },
            { type: "paragraph", text: "Gross Profit = Revenue - COGS. Gross Margin = (Gross Profit / Revenue) × 100. Gross margin tells you how efficiently a company converts revenue into profit before overhead expenses. A 60% gross margin means the company keeps ₹60 out of every ₹100 in revenue after direct costs." },
            { type: "table", headers: ["Company", "Sector", "Typical Gross Margin", "What It Means"], rows: [
              ["TCS / Infosys", "IT Services", "50-55%", "High margins — asset-light, people business"],
              ["HUL / Nestlé", "FMCG", "50-60%", "Strong brand pricing power"],
              ["Asian Paints", "Paints", "40-45%", "Good margins, raw material dependent"],
              ["Maruti Suzuki", "Automobile", "25-30%", "Capital-intensive, competitive pricing"],
              ["Tata Steel", "Metal", "20-30%", "Commodity business, cyclical margins"],
            ]},
            { type: "callout", text: "Key Takeaway: Gross margin reveals a company's pricing power and cost efficiency. Companies with consistently high gross margins (above 40%) often have competitive advantages — a strong brand, proprietary technology, or switching costs. Watch for margin trends — expanding margins are bullish, contracting margins are concerning." },
          ],
        },
        {
          id: "m2-l2", title: "Operating Profit, EBITDA & Operating Margins", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "The Core Profitability Metric" },
            { type: "paragraph", text: "After gross profit, we subtract operating expenses (rent, marketing, R&D, admin costs, depreciation) to get operating profit. This is the profit from the company's core business operations — the most important profitability metric." },
            { type: "heading", text: "EBITDA — Earnings Before Interest, Tax, Depreciation & Amortization" },
            { type: "paragraph", text: "EBITDA strips out non-cash charges (depreciation, amortization) and financing decisions (interest, tax) to show the raw earning power of the business. It's widely used for comparing companies because it removes the effects of different capital structures and tax strategies." },
            { type: "paragraph", text: "However, EBITDA has critics — Warren Buffett famously said depreciation is a real expense because assets do wear out and need replacement. EBITDA can make capital-intensive businesses look more profitable than they really are." },
            { type: "heading", text: "Operating Margin (OPM)" },
            { type: "paragraph", text: "Operating Margin = (Operating Profit / Revenue) × 100. This tells you how much of each revenue rupee the company keeps after all operating costs. A 25% operating margin means the company earns ₹25 in operating profit for every ₹100 in revenue." },
            { type: "paragraph", text: "Operating margins should ideally be stable or expanding over time. A company growing revenue at 20% but with declining margins may not be creating shareholder value — the growth is coming at the cost of profitability." },
            { type: "heading", text: "What to Look For" },
            { type: "paragraph", text: "Compare OPM with industry peers — a company with higher OPM than peers has better operational efficiency or pricing power. Track OPM over 5-10 years — is it stable, improving, or deteriorating? Investigate any sudden drops in OPM — they could signal competitive pressure, cost inflation, or management issues." },
            { type: "callout", text: "Key Takeaway: Operating profit is the true measure of business performance. Revenue growth without operating profit growth is hollow growth. Look for companies where operating margins are stable or expanding while revenue grows — that's the hallmark of a well-managed business." },
          ],
        },
        {
          id: "m2-l3", title: "Net Profit, EPS & Profit Quality", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "The Bottom Line" },
            { type: "paragraph", text: "Net Profit = Operating Profit - Interest - Tax + Other Income. This is what the company actually earned for its shareholders after all expenses. EPS (Earnings Per Share) = Net Profit / Total Shares Outstanding. EPS is what ultimately drives stock prices over the long term." },
            { type: "heading", text: "But Not All Profits Are Equal" },
            { type: "paragraph", text: "A company can show net profit of ₹500 crore, but the quality of that profit matters enormously. Profit from core operations (selling products/services) is sustainable. Profit from one-time events (selling a building, tax write-backs, exceptional items) is not." },
            { type: "paragraph", text: "Always check 'Other Income' in the income statement. If a significant portion of net profit comes from interest on investments, sale of assets, or exceptional items, the underlying business may be weaker than headline numbers suggest." },
            { type: "heading", text: "Adjusted vs Reported EPS" },
            { type: "paragraph", text: "Many analysts calculate 'adjusted EPS' by removing one-time items. If a company reports EPS of ₹50 but ₹15 came from selling a property, the adjusted (recurring) EPS is ₹35. Always use adjusted EPS for valuation — it reflects the sustainable earning power." },
            { type: "heading", text: "EPS Growth — The Growth Engine" },
            { type: "paragraph", text: "A stock's price follows EPS growth over the long term. If a company grows EPS at 15% per year consistently, the stock price will roughly grow at 15% per year too (assuming the P/E ratio stays stable). This is why EPS growth is the single most important factor in long-term stock returns." },
            { type: "callout", text: "Key Takeaway: Look beyond headline profit numbers. Check the quality of earnings — is the profit coming from core operations or one-time events? Track EPS growth over 5-10 years. Consistent 15%+ EPS growth with stable margins is the signature of a wealth-creating company." },
          ],
        },
        {
          id: "m2-l4", title: "Reading a Real Income Statement — Case Study", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "Putting It All Together — TCS Income Statement" },
            { type: "paragraph", text: "Let's analyze a simplified income statement of Tata Consultancy Services (TCS) to see how all the concepts connect in practice." },
            { type: "table", headers: ["Line Item", "FY2023 (₹ Cr)", "FY2024 (₹ Cr)", "Growth"], rows: [
              ["Revenue from Operations", "2,25,458", "2,40,893", "+6.8%"],
              ["Cost of Services (COGS)", "1,44,571", "1,55,123", "+7.3%"],
              ["Gross Profit", "80,887", "85,770", "+6.0%"],
              ["Employee Costs", "1,28,874", "1,36,793", "+6.1%"],
              ["Other Expenses", "27,658", "29,834", "+7.9%"],
              ["EBITDA", "60,765", "64,156", "+5.6%"],
              ["Depreciation", "5,724", "6,197", "+8.3%"],
              ["Operating Profit (EBIT)", "55,041", "57,959", "+5.3%"],
              ["Other Income", "4,930", "5,876", "+19.2%"],
              ["Profit Before Tax", "59,971", "63,835", "+6.4%"],
              ["Tax", "15,326", "16,447", "+7.3%"],
              ["Net Profit", "44,645", "47,388", "+6.1%"],
              ["EPS (₹)", "121.96", "129.45", "+6.1%"],
            ]},
            { type: "heading", text: "What This Tells Us" },
            { type: "paragraph", text: "Revenue grew 6.8% — moderate but steady growth for a company of TCS's size. Gross margin was relatively stable (~35.6%). EBITDA margin was ~26.6%. Net profit margin was healthy at ~19.7%. EPS grew 6.1%, broadly in line with revenue growth — meaning the company maintained profitability discipline." },
            { type: "paragraph", text: "The interesting observation: Other Income grew 19.2% — indicating TCS earns significant interest on its large cash pile. However, the core operating profit growth (5.3%) was lower than revenue growth, suggesting slight margin pressure — worth monitoring." },
            { type: "callout", text: "Key Takeaway: Reading real financial statements makes concepts concrete. Practice this exercise with 5-10 companies across different sectors. Compare margins, growth rates, and quality of earnings. Over time, you'll develop an intuitive sense for what 'good' financials look like." },
          ],
        },
      ],
      quiz: {
        id: "m2-quiz",
        questions: [
          { q: "Revenue is also known as:", options: ["Bottom line", "Top line", "Operating profit", "EBITDA"], answer: 1 },
          { q: "Gross Profit equals:", options: ["Revenue minus all expenses", "Revenue minus COGS", "Net profit plus tax", "EBITDA minus depreciation"], answer: 1 },
          { q: "A company with 55% gross margin keeps how much per ₹100 revenue?", options: ["₹45", "₹55 after direct costs", "₹55 after all costs", "₹100"], answer: 1 },
          { q: "EBITDA excludes which of the following?", options: ["Revenue", "Cost of goods sold", "Interest, tax, depreciation & amortization", "Employee salaries"], answer: 2 },
          { q: "Operating margin is calculated as:", options: ["Net Profit / Revenue", "Operating Profit / Revenue × 100", "EBITDA / Total Assets", "Gross Profit / COGS"], answer: 1 },
          { q: "If a company's profit comes largely from selling a building, the profit quality is:", options: ["Excellent", "Sustainable", "Poor — it's a one-time event", "Irrelevant"], answer: 2 },
          { q: "EPS stands for:", options: ["Equity Price Signal", "Earnings Per Share", "Expected Profit Surplus", "Exchange Price Standard"], answer: 1 },
          { q: "A stock's price follows this metric over the long term:", options: ["Daily volume", "EPS growth", "Number of employees", "Office location"], answer: 1 },
          { q: "Which IT company typically has gross margins of 50-55%?", options: ["Tata Steel", "Maruti Suzuki", "TCS / Infosys", "Coal India"], answer: 2 },
          { q: "Declining operating margins with rising revenue suggests:", options: ["Excellent management", "Growth at the cost of profitability", "Stock price will double", "Company should increase dividends"], answer: 1 },
        ],
      },
    },

    // ══════════════════════════════════════
    // MODULE 3: Balance Sheet
    // ══════════════════════════════════════
    {
      id: "m3",
      title: "The Balance Sheet — Assets, Liabilities & Equity",
      lessons: [
        {
          id: "m3-l1", title: "Understanding the Balance Sheet Structure", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "A Snapshot of Financial Health" },
            { type: "paragraph", text: "While the income statement shows performance over a period, the balance sheet shows a company's financial position at a specific point in time. It answers: What does the company own? What does it owe? And what's left for shareholders?" },
            { type: "heading", text: "The Fundamental Equation" },
            { type: "paragraph", text: "Assets = Liabilities + Shareholders' Equity. This equation always balances — hence 'balance sheet.' Everything a company owns (assets) was financed either by borrowing (liabilities) or by shareholders (equity)." },
            { type: "heading", text: "Assets — What the Company Owns" },
            { type: "paragraph", text: "Current Assets (convertible to cash within 1 year): Cash & equivalents, accounts receivable (money owed by customers), inventory (unsold goods), short-term investments. Non-Current Assets (long-term): Property, plant & equipment (PP&E), goodwill & intangible assets, long-term investments, right-of-use assets." },
            { type: "heading", text: "Liabilities — What the Company Owes" },
            { type: "paragraph", text: "Current Liabilities (due within 1 year): Accounts payable (money owed to suppliers), short-term borrowings, current portion of long-term debt, employee dues. Non-Current Liabilities (long-term): Long-term borrowings, deferred tax liabilities, lease obligations." },
            { type: "heading", text: "Shareholders' Equity — What's Left for You" },
            { type: "paragraph", text: "Equity = Assets - Liabilities. This is the 'net worth' of the company belonging to shareholders. It includes share capital (face value of all shares), reserves & surplus (retained earnings accumulated over years), and other equity items. Growing equity over time is a sign of a healthy, profitable business." },
            { type: "callout", text: "Key Takeaway: The balance sheet tells you if a company is financially solid or dangerously over-leveraged. Always check: Is the company's debt manageable relative to its equity? Does it have enough current assets to cover current liabilities? Is equity growing year over year?" },
          ],
        },
        {
          id: "m3-l2", title: "Debt Analysis — When Borrowing Becomes Dangerous", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "The Double-Edged Sword of Debt" },
            { type: "paragraph", text: "Debt can accelerate growth — borrowing to build a new factory that generates profits is smart leverage. But too much debt can bankrupt a company — if profits decline and the company can't make interest payments, creditors can force liquidation. The key is finding the right balance." },
            { type: "heading", text: "Key Debt Ratios" },
            { type: "table", headers: ["Ratio", "Formula", "Good Benchmark", "What It Tells You"], rows: [
              ["Debt-to-Equity (D/E)", "Total Debt / Shareholders' Equity", "Below 1.0x", "How leveraged the company is"],
              ["Interest Coverage", "EBIT / Interest Expense", "Above 3.0x", "Can the company afford its interest payments?"],
              ["Debt-to-EBITDA", "Total Debt / EBITDA", "Below 3.0x", "How many years to repay debt from earnings"],
              ["Current Ratio", "Current Assets / Current Liabilities", "Above 1.5x", "Can the company pay short-term obligations?"],
              ["Net Debt", "Total Debt - Cash", "Lower is better", "True debt position after cash offset"],
            ]},
            { type: "heading", text: "Sector-Specific Debt Norms" },
            { type: "paragraph", text: "Not all debt is equal across sectors. Banks naturally have high leverage (that's their business model). Infrastructure and real estate companies have higher debt due to capital-intensive projects. IT and FMCG companies should ideally have minimal debt. Always compare a company's debt ratios within its sector, not across sectors." },
            { type: "heading", text: "Red Flags in Debt" },
            { type: "paragraph", text: "Rapidly increasing debt without corresponding revenue/profit growth. Interest coverage ratio below 2x — the company is struggling to pay interest. Short-term debt exceeding cash & equivalents — liquidity risk. Debt-funded dividends — the company is borrowing to pay shareholders (unsustainable)." },
            { type: "callout", text: "Key Takeaway: Moderate debt used for productive investment is healthy. Excessive debt is the #1 reason companies go bankrupt. Check D/E ratio, interest coverage, and the purpose of borrowing. A company with zero debt and growing profits is the safest investment — the only risk is business risk, not financial risk." },
          ],
        },
        {
          id: "m3-l3", title: "Working Capital & Liquidity Analysis", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "Can the Company Pay Its Bills?" },
            { type: "paragraph", text: "Working Capital = Current Assets - Current Liabilities. Positive working capital means the company can cover its short-term obligations. Negative working capital means it might struggle to pay bills — a serious warning sign (with some exceptions like FMCG companies that collect cash before paying suppliers)." },
            { type: "heading", text: "The Cash Conversion Cycle" },
            { type: "paragraph", text: "The cash conversion cycle (CCC) measures how quickly a company converts its investments in inventory and other resources into cash from sales. CCC = Days Inventory Outstanding + Days Sales Outstanding - Days Payables Outstanding." },
            { type: "paragraph", text: "A shorter CCC is better — it means the company converts inventory to cash quickly. A negative CCC (like Asian Paints or HUL) means the company collects from customers before paying suppliers — they're effectively using supplier money to fund operations. This is a sign of immense bargaining power." },
            { type: "heading", text: "What Good Working Capital Management Looks Like" },
            { type: "paragraph", text: "Inventory days decreasing over time (selling faster). Receivable days decreasing (collecting from customers faster). Payable days stable or increasing (negotiating better terms with suppliers). Cash on balance sheet growing steadily." },
            { type: "callout", text: "Key Takeaway: Working capital management separates good companies from great ones. A company that grows revenue while keeping working capital efficient is generating cash — the lifeblood of any business. Check the cash conversion cycle and current ratio before investing." },
          ],
        },
        {
          id: "m3-l4", title: "Goodwill, Intangibles & Hidden Liabilities", type: "article", videoUrl: "", duration: "10 min",
          content: [
            { type: "heading", text: "What the Balance Sheet Hides" },
            { type: "paragraph", text: "The balance sheet isn't always as transparent as it seems. Some items require careful scrutiny because they can mask underlying problems or overstate the company's true value." },
            { type: "heading", text: "Goodwill — The Acquisition Premium" },
            { type: "paragraph", text: "When a company acquires another company at a price higher than the target's net assets, the excess is recorded as 'goodwill.' For example, if Company A buys Company B for ₹1,000 crore but B's net assets are only worth ₹600 crore, ₹400 crore is recorded as goodwill. Goodwill should be tested for impairment annually. A large goodwill write-down means the company overpaid for an acquisition." },
            { type: "heading", text: "Intangible Assets" },
            { type: "paragraph", text: "Patents, trademarks, software, customer relationships — these are real assets but their values can be subjective. If intangible assets form a very large portion of total assets, be cautious. Unlike physical assets, intangibles can lose value quickly if technology changes or patents expire." },
            { type: "heading", text: "Off-Balance Sheet Items" },
            { type: "paragraph", text: "Some obligations don't appear on the balance sheet but are real. Operating leases (now largely captured under Ind-AS 116), contingent liabilities (potential lawsuits, guarantees), and related-party transactions can hide significant risks. Always read the 'Notes to Accounts' section of the annual report — it contains crucial details about off-balance sheet items." },
            { type: "callout", text: "Key Takeaway: Look beyond the headline numbers on the balance sheet. Large goodwill balances, excessive intangibles, and contingent liabilities in the notes can signal hidden risks. The notes to accounts section is where companies hide uncomfortable truths — always read it." },
          ],
        },
      ],
      quiz: {
        id: "m3-quiz",
        questions: [
          { q: "The balance sheet equation is:", options: ["Revenue = Expenses + Profit", "Assets = Liabilities + Equity", "Debt = Equity + Cash", "Profit = Revenue - Tax"], answer: 1 },
          { q: "Current assets are those convertible to cash within:", options: ["1 month", "6 months", "1 year", "5 years"], answer: 2 },
          { q: "A healthy Debt-to-Equity ratio is generally:", options: ["Above 5x", "Above 3x", "Below 1x", "Exactly 2x"], answer: 2 },
          { q: "Interest Coverage ratio above 3x means:", options: ["Company can't pay interest", "Company can comfortably afford interest payments", "Company has no debt", "Company is bankrupt"], answer: 1 },
          { q: "Negative working capital is always bad — True or False?", options: ["True — always dangerous", "False — some companies like HUL use it as a strength", "True — the company must raise debt", "False — it means the company has too much cash"], answer: 1 },
          { q: "A shorter Cash Conversion Cycle indicates:", options: ["Slower business", "Faster conversion of inventory to cash (better)", "Higher debt", "Lower margins"], answer: 1 },
          { q: "Goodwill on the balance sheet arises from:", options: ["Excellent management", "Paying more than net asset value in an acquisition", "High stock price", "Government grants"], answer: 1 },
          { q: "Where can you find details about contingent liabilities?", options: ["Income statement", "Revenue line item", "Notes to Accounts", "Stock exchange website"], answer: 2 },
          { q: "Net Debt equals:", options: ["Total Debt + Cash", "Total Debt - Cash", "Equity - Debt", "Revenue - Debt"], answer: 1 },
          { q: "A company with zero debt and growing profits has:", options: ["Only business risk, no financial risk", "High financial risk", "No risk at all", "Mandatory debt requirement from SEBI"], answer: 0 },
        ],
      },
    },

    // ══════════════════════════════════════
    // MODULE 4: Cash Flow Statement
    // ══════════════════════════════════════
    {
      id: "m4",
      title: "Cash Flow Statement — Follow the Money",
      lessons: [
        {
          id: "m4-l1", title: "Why Cash Flow Matters More Than Profit", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "Profit is an Opinion, Cash is a Fact" },
            { type: "paragraph", text: "A company can report a profit and still go bankrupt. How? Because profit is an accounting concept that includes non-cash items (depreciation, accruals, provisions), while cash flow tracks actual money moving in and out. A company needs cash to pay employees, suppliers, interest, and taxes — not accounting profits." },
            { type: "paragraph", text: "The cash flow statement answers the most fundamental question: Is this business generating real cash? If a company consistently reports profits but doesn't generate cash, something is wrong — the profits may be artificially inflated through aggressive accounting." },
            { type: "heading", text: "Three Sections of Cash Flow Statement" },
            { type: "paragraph", text: "Cash Flow from Operating Activities (CFO): Cash generated from core business operations. This should be positive and growing — it's the cash engine. Cash Flow from Investing Activities (CFI): Cash spent on or received from investments — buying equipment, acquiring companies, or selling assets. Usually negative for growing companies (they're investing). Cash Flow from Financing Activities (CFF): Cash from borrowing, repaying debt, issuing shares, paying dividends, or buying back shares." },
            { type: "heading", text: "Free Cash Flow — The Most Important Number" },
            { type: "paragraph", text: "Free Cash Flow (FCF) = Operating Cash Flow - Capital Expenditure (Capex). FCF is what's left after the company has funded its operations and invested in maintaining/growing its asset base. This is the money available for dividends, debt repayment, buybacks, or acquisitions. Companies with consistently high FCF are the best long-term investments." },
            { type: "callout", text: "Key Takeaway: Cash flow from operations should be positive and ideally exceed net profit (CFO > Net Profit means high earnings quality). Free cash flow is the most reliable measure of a company's financial strength. A company that generates strong FCF year after year can fund growth, pay dividends, and weather downturns." },
          ],
        },
        {
          id: "m4-l2", title: "Analyzing Cash Flow Patterns & Red Flags", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "What Healthy Cash Flow Looks Like" },
            { type: "paragraph", text: "The ideal pattern for a growing company: Strong positive CFO (business generates cash), Negative CFI (investing in growth), and CFF varies (borrowing for expansion or returning cash to shareholders). For a mature company: Strong CFO, Low CFI (maintenance capex only), and Negative CFF (paying dividends and reducing debt)." },
            { type: "heading", text: "Cash Flow Red Flags" },
            { type: "table", headers: ["Red Flag", "What It Means", "Action"], rows: [
              ["CFO consistently < Net Profit", "Profits may be artificially inflated", "Investigate receivables and inventory build-up"],
              ["Negative CFO for 2+ years", "Business isn't generating cash", "Major warning — avoid or exit"],
              ["High capex with no revenue growth", "Inefficient capital allocation", "Management may be empire-building"],
              ["Consistently raising debt while paying dividends", "Borrowing to fund shareholder returns", "Unsustainable — dividend may be cut"],
              ["Rising receivables faster than revenue", "Customers aren't paying or revenue is inflated", "Potential accounting manipulation"],
            ]},
            { type: "heading", text: "Operating Cash Flow vs Net Profit — The Quality Check" },
            { type: "paragraph", text: "A simple but powerful quality check: divide CFO by Net Profit. If this ratio is consistently above 1.0, earnings quality is high (cash flow supports the reported profit). If it's consistently below 0.7, the company may be using aggressive accounting to show higher profits than it actually generates in cash." },
            { type: "callout", text: "Key Takeaway: The cash flow statement is the hardest financial statement to manipulate. When in doubt about a company's reported profits, check the cash flow. If operating cash flow doesn't support net profit, the profit numbers may not be trustworthy." },
          ],
        },
      ],
      quiz: {
        id: "m4-quiz",
        questions: [
          { q: "'Profit is an opinion, cash is a fact' means:", options: ["Profit is always wrong", "Cash flow is harder to manipulate than accounting profit", "Companies should not report profit", "Cash is more important than revenue"], answer: 1 },
          { q: "Free Cash Flow equals:", options: ["Revenue minus expenses", "Operating Cash Flow minus Capital Expenditure", "Net Profit minus Tax", "EBITDA minus Interest"], answer: 1 },
          { q: "A growing company typically has:", options: ["Positive CFO, positive CFI, positive CFF", "Positive CFO, negative CFI, variable CFF", "Negative CFO, positive CFI, negative CFF", "All three sections negative"], answer: 1 },
          { q: "If CFO is consistently less than Net Profit, it suggests:", options: ["Excellent cash management", "Potential profit manipulation or poor cash collection", "Stock price will rise", "Company is very profitable"], answer: 1 },
          { q: "A company borrowing debt to pay dividends is:", options: ["Good for shareholders", "Sustainable long-term", "A red flag — unsustainable practice", "Required by SEBI"], answer: 2 },
          { q: "The most important cash flow metric for long-term investors is:", options: ["Cash from financing", "Free Cash Flow", "Dividend payments", "Short-term borrowings"], answer: 1 },
          { q: "Rising receivables faster than revenue may indicate:", options: ["Strong demand", "Customers aren't paying or revenue is inflated", "Company is profitable", "Low inventory"], answer: 1 },
          { q: "CFO/Net Profit ratio above 1.0 indicates:", options: ["Low earnings quality", "High earnings quality", "Company is making losses", "Excessive debt"], answer: 1 },
        ],
      },
    },

    // ══════════════════════════════════════
    // MODULE 5: Valuation Methods
    // ══════════════════════════════════════
    {
      id: "m5",
      title: "Valuation — Is the Stock Cheap or Expensive?",
      lessons: [
        {
          id: "m5-l1", title: "P/E Ratio Deep Dive — Beyond the Basics", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "The World's Most Used Valuation Metric" },
            { type: "paragraph", text: "P/E ratio (Price to Earnings) tells you how much the market is willing to pay for each rupee of earnings. P/E = Market Price / EPS. A P/E of 25x means investors are paying ₹25 for every ₹1 of annual earnings." },
            { type: "heading", text: "Trailing P/E vs Forward P/E" },
            { type: "paragraph", text: "Trailing P/E uses the last 12 months' actual earnings — it's backward-looking but based on real data. Forward P/E uses estimated earnings for the next 12 months — it's forward-looking but based on analyst estimates that may be wrong. Forward P/E is more relevant for growing companies because you're buying future earnings, not past earnings." },
            { type: "heading", text: "PEG Ratio — P/E Adjusted for Growth" },
            { type: "paragraph", text: "PEG = P/E Ratio / EPS Growth Rate. A PEG below 1 suggests the stock is undervalued relative to its growth. A PEG above 2 suggests overvaluation. Example: A company with P/E of 30 and EPS growth of 25% has PEG of 1.2 — reasonably valued. The same P/E of 30 with only 10% growth gives PEG of 3 — expensive." },
            { type: "heading", text: "Sector-Wise P/E Benchmarks (India)" },
            { type: "table", headers: ["Sector", "Typical P/E Range", "Why This Range"], rows: [
              ["IT Services", "25-35x", "Consistent growth, high margins, asset-light"],
              ["Private Banks", "15-25x", "Steady growth, regulated, well-capitalized"],
              ["PSU Banks", "6-12x", "Government ownership, lower growth expectations"],
              ["FMCG", "45-70x", "Defensive, predictable, premium for stability"],
              ["Pharma", "20-40x", "Innovation-driven, regulatory approvals add value"],
              ["Metals / Mining", "5-15x", "Cyclical, commodity-dependent"],
              ["Auto", "20-35x", "Growth potential, EV transition tailwind"],
              ["Real Estate", "15-30x", "Cyclical, project-based revenue recognition"],
            ]},
            { type: "callout", text: "Key Takeaway: P/E is relative, not absolute. A P/E of 40 can be cheap for a company growing at 35% (PEG = 1.1) and expensive for one growing at 10% (PEG = 4). Always use P/E in conjunction with growth rate (PEG), compare within the same sector, and check the trend over 5-10 years." },
          ],
        },
        {
          id: "m5-l2", title: "P/B Ratio, EV/EBITDA & Dividend Yield", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "Price-to-Book (P/B) Ratio" },
            { type: "paragraph", text: "P/B = Market Price / Book Value Per Share. Book value is the net asset value of the company (total assets minus total liabilities). A P/B of 1 means the stock is trading at exactly its book value. Below 1 means you're buying the company for less than its net assets — potentially a bargain (but check why it's cheap)." },
            { type: "paragraph", text: "P/B is most useful for asset-heavy sectors like banking, insurance, and real estate where book value closely represents the actual value of the business. For asset-light companies like IT and FMCG, P/B is less meaningful because their biggest asset (brand, talent, technology) isn't on the balance sheet." },
            { type: "heading", text: "EV/EBITDA — The Professional's Choice" },
            { type: "paragraph", text: "Enterprise Value (EV) = Market Cap + Net Debt. EV/EBITDA compares the total value of a company (including its debt) to its operating earnings. Unlike P/E, it isn't affected by capital structure or tax rates, making it ideal for comparing companies with different debt levels." },
            { type: "paragraph", text: "An EV/EBITDA below the sector average suggests the company is undervalued. Below 8-10x is generally considered attractive for most sectors (except banking where this metric isn't used)." },
            { type: "heading", text: "Dividend Yield" },
            { type: "paragraph", text: "Dividend Yield = (Annual Dividend Per Share / Current Price) × 100. A yield of 3% means you earn ₹3 for every ₹100 invested, just from dividends. High dividend yields (above 3-4%) can indicate value — but check if the dividend is sustainable from free cash flow. A very high yield (8-10%) often signals the market expects a dividend cut." },
            { type: "callout", text: "Key Takeaway: Use P/B for banks and asset-heavy companies. Use EV/EBITDA for comparing companies across different capital structures. Use dividend yield for income-oriented investing. No single metric is sufficient — use 2-3 valuation tools together for a complete picture." },
          ],
        },
        {
          id: "m5-l3", title: "Discounted Cash Flow (DCF) — The Gold Standard", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "What is DCF Valuation?" },
            { type: "paragraph", text: "DCF valuation calculates the intrinsic value of a company by estimating all future free cash flows and discounting them back to today's value. The logic: a rupee received tomorrow is worth less than a rupee today (because of inflation, risk, and opportunity cost). DCF answers: 'Based on what this company will earn in the future, what should I pay today?'" },
            { type: "heading", text: "The DCF Process (Simplified)" },
            { type: "paragraph", text: "Step 1: Estimate Free Cash Flow (FCF) for the next 5-10 years based on revenue growth, margin assumptions, and capex needs. Step 2: Estimate a terminal value (the value of all cash flows beyond year 10, assuming a stable growth rate). Step 3: Choose a discount rate (usually 10-12% for Indian stocks, reflecting the required return). Step 4: Discount all future cash flows and terminal value back to present value. Step 5: Sum everything up — that's the intrinsic value." },
            { type: "heading", text: "DCF Strengths & Weaknesses" },
            { type: "table", headers: ["Strengths", "Weaknesses"], rows: [
              ["Theoretically the most correct valuation method", "Highly sensitive to assumptions (small changes = big impact)"],
              ["Forces you to think about the business's future", "Difficult to estimate growth rates accurately"],
              ["Independent of market sentiment", "Terminal value often dominates (70%+ of total value)"],
              ["Applicable to any cash-generating business", "Not useful for loss-making companies"],
            ]},
            { type: "paragraph", text: "For retail investors, a full DCF model can be complex. A practical shortcut: estimate a reasonable EPS 5 years from now, apply a fair P/E ratio, and compare that future value (discounted) to today's price. If today's price is 30-40% below your estimate, you have a margin of safety." },
            { type: "callout", text: "Key Takeaway: DCF is the most intellectually rigorous valuation method but requires many assumptions. Use it to develop conviction about a company's value, not to find a precise price. The exercise of building a DCF forces you to deeply understand the business — that's valuable even if the final number is approximate." },
          ],
        },
      ],
      quiz: {
        id: "m5-quiz",
        questions: [
          { q: "Forward P/E uses:", options: ["Past 12 months earnings", "Estimated future 12 months earnings", "Past 5 years average", "Book value"], answer: 1 },
          { q: "PEG ratio below 1 suggests:", options: ["Stock is overvalued", "Stock is undervalued relative to growth", "Stock has no growth", "P/E is too low"], answer: 1 },
          { q: "P/B ratio is most useful for:", options: ["IT companies", "Banks and asset-heavy companies", "Startups", "Companies with no assets"], answer: 1 },
          { q: "Enterprise Value (EV) equals:", options: ["Market Cap only", "Market Cap + Net Debt", "Revenue + Profit", "Total Assets"], answer: 1 },
          { q: "A very high dividend yield (8-10%) often signals:", options: ["Excellent investment", "Market expects a dividend cut", "Zero risk", "Stock price will double"], answer: 1 },
          { q: "In DCF, future cash flows are 'discounted' because:", options: ["Companies always lose money", "A rupee today is worth more than a rupee tomorrow", "SEBI requires discounting", "To make numbers look smaller"], answer: 1 },
          { q: "The typical discount rate for Indian stocks in DCF is:", options: ["2-3%", "5-6%", "10-12%", "25-30%"], answer: 2 },
          { q: "DCF is NOT useful for:", options: ["Profitable companies", "Cash-generating businesses", "Loss-making companies with no cash flow", "Large-cap stocks"], answer: 2 },
          { q: "EV/EBITDA is preferred over P/E when:", options: ["Comparing companies with different debt levels", "All companies are identical", "Looking at only dividend-paying stocks", "Analyzing penny stocks"], answer: 0 },
          { q: "FMCG stocks typically have high P/E because:", options: ["They are overvalued", "Investors pay a premium for predictable, defensive earnings", "They have high debt", "They don't pay dividends"], answer: 1 },
        ],
      },
    },

    // ══════════════════════════════════════
    // MODULE 6: Quality & Moat Analysis
    // ══════════════════════════════════════
    {
      id: "m6",
      title: "Identifying Quality Businesses & Competitive Moats",
      lessons: [
        {
          id: "m6-l1", title: "Return Ratios — ROE, ROCE & ROA", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "Measuring Management Efficiency" },
            { type: "paragraph", text: "Return ratios tell you how efficiently a company uses its capital to generate profits. They're the best single indicator of business quality — consistently high return ratios are the hallmark of exceptional companies." },
            { type: "heading", text: "Return on Equity (ROE)" },
            { type: "paragraph", text: "ROE = Net Profit / Shareholders' Equity × 100. It measures how much profit the company generates from shareholder money. An ROE of 20% means the company generates ₹20 of profit for every ₹100 of equity. Consistently high ROE (above 15%) indicates a quality business." },
            { type: "paragraph", text: "However, ROE can be artificially inflated by high debt (leverage). A company with very low equity and high debt will show high ROE even with modest profits. Always check ROE alongside debt levels." },
            { type: "heading", text: "Return on Capital Employed (ROCE)" },
            { type: "paragraph", text: "ROCE = EBIT / Capital Employed × 100, where Capital Employed = Total Assets - Current Liabilities. ROCE is superior to ROE because it considers both equity AND debt in the denominator, giving a truer picture of how well management uses ALL capital. ROCE above 15% is good; above 20% is excellent." },
            { type: "heading", text: "Return on Assets (ROA)" },
            { type: "paragraph", text: "ROA = Net Profit / Total Assets × 100. It measures how efficiently the company uses its total asset base. ROA is particularly useful for comparing banks and financial companies. For non-financial companies, ROA above 8-10% is generally good." },
            { type: "heading", text: "Quality Companies — Return Ratio Benchmarks" },
            { type: "table", headers: ["Company", "ROE", "ROCE", "What It Shows"], rows: [
              ["TCS", "~45%", "~55%", "Exceptional capital efficiency, asset-light model"],
              ["Asian Paints", "~25%", "~30%", "Strong brand, pricing power"],
              ["HDFC Bank", "~16%", "N/A (banks)", "Solid returns for a large bank"],
              ["Tata Steel", "~12%", "~14%", "Cyclical, capital-intensive business"],
              ["ITC", "~28%", "~35%", "Cash cow, low capital needs"],
            ]},
            { type: "callout", text: "Key Takeaway: Look for companies with ROE above 15% and ROCE above 15%, sustained over at least 5 years. Consistency matters more than the absolute number. A company with stable 18% ROE for 10 years is better than one fluctuating between 5% and 30%. High, stable returns indicate a durable competitive advantage." },
          ],
        },
        {
          id: "m6-l2", title: "Competitive Moats — What Makes a Business Unbeatable", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "The Castle and the Moat" },
            { type: "paragraph", text: "Warren Buffett uses the metaphor of a castle (the business) protected by a moat (competitive advantage). A wide moat keeps competitors out and allows the company to earn above-average profits for decades. Identifying moats is perhaps the most important skill in fundamental analysis." },
            { type: "heading", text: "Types of Economic Moats" },
            { type: "paragraph", text: "Brand Power: Consumers willingly pay more for the brand. Asian Paints charges 20-30% more than local paint brands because homeowners trust the quality. Titan's Tanishq charges a premium because the brand represents trust in gold purity." },
            { type: "paragraph", text: "Network Effects: The product becomes more valuable as more people use it. NSE's trading platform — the more traders use NSE, the better the liquidity, which attracts even more traders. This creates a virtuous cycle that's extremely hard to compete against." },
            { type: "paragraph", text: "Switching Costs: It's expensive or inconvenient for customers to switch. TCS and Infosys manage critical IT systems for global banks — switching IT providers is risky, expensive, and takes years. This creates sticky, recurring revenue." },
            { type: "paragraph", text: "Cost Advantage: The company can produce goods cheaper than competitors. Coal India mines coal at lower costs due to scale and mine ownership. Cost advantages from scale are common in commodities, manufacturing, and logistics." },
            { type: "paragraph", text: "Regulatory Moat: Government licenses or regulations limit competition. Banks need an RBI license. Insurance companies need IRDAI approval. These regulatory barriers prevent new entrants from easily competing." },
            { type: "heading", text: "How to Identify a Moat" },
            { type: "paragraph", text: "Check if the company has maintained or increased market share over 10 years. Check if it has maintained high return ratios (ROE/ROCE above 15%) for 10+ years without deterioration. Check if it has pricing power — can it raise prices without losing customers? If yes, there's likely a moat." },
            { type: "callout", text: "Key Takeaway: Invest in businesses with wide, durable moats. A moat allows a company to earn excess returns year after year, decade after decade. The combination of a wide moat + capable management + reasonable valuation is the formula for long-term wealth creation." },
          ],
        },
        {
          id: "m6-l3", title: "Management Analysis — Reading Between the Lines", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "The People Behind the Numbers" },
            { type: "paragraph", text: "Even the best business can be destroyed by poor management, and a mediocre business can be transformed by exceptional leadership. Evaluating management quality is difficult but essential." },
            { type: "heading", text: "What to Look For in Management" },
            { type: "paragraph", text: "Skin in the Game: Do promoters/management hold significant shares? High promoter holding (above 50%) aligns their interests with yours. Check if promoters are buying or selling shares — promoter buying is a strong positive signal." },
            { type: "paragraph", text: "Capital Allocation Track Record: How does management use profits? Do they invest in high-return projects, make sensible acquisitions, pay reasonable dividends, or buy back shares at good prices? Or do they waste money on vanity projects, overpriced acquisitions, and unnecessary diversification?" },
            { type: "paragraph", text: "Transparency & Governance: Does the management communicate honestly in annual reports (including about challenges, not just achievements)? Are related-party transactions excessive or suspicious? Has there been any SEBI action against the company or its promoters?" },
            { type: "heading", text: "Red Flags in Management" },
            { type: "paragraph", text: "Frequent equity dilution (issuing new shares) without proportional value creation. Excessive promoter pledging (borrowing against shares). Frequent changes in auditors. Aggressive revenue recognition policies. Related-party transactions at non-market rates. Promoters making lavish personal expenditures while the company struggles." },
            { type: "callout", text: "Key Takeaway: Think of management as your partners — because they are. When you buy a stock, you're entrusting your money to these people. Check their track record, integrity, and incentive alignment. When in doubt about management quality, move on — there are plenty of well-managed companies to invest in." },
          ],
        },
      ],
      quiz: {
        id: "m6-quiz",
        questions: [
          { q: "ROE measures:", options: ["Revenue growth", "Profit relative to shareholder equity", "Debt levels", "Stock price momentum"], answer: 1 },
          { q: "ROCE is considered superior to ROE because:", options: ["It uses a simpler formula", "It considers both debt and equity capital", "It ignores profits", "SEBI requires it"], answer: 1 },
          { q: "A company with consistent ROE above 15% for 10 years likely has:", options: ["Excessive debt", "A durable competitive advantage", "Low revenue", "No moat"], answer: 1 },
          { q: "Which is an example of a network effect moat?", options: ["Coal India's mining rights", "NSE's trading platform", "Asian Paints' brand", "TCS's client switching costs"], answer: 1 },
          { q: "Switching costs as a moat means:", options: ["The company frequently changes its business", "Customers find it expensive/inconvenient to leave", "The stock price switches between high and low", "Management switches often"], answer: 1 },
          { q: "High promoter shareholding (above 50%) is generally:", options: ["A negative sign", "A positive sign — aligned interests", "Illegal in India", "Only relevant for PSU stocks"], answer: 1 },
          { q: "Which is a red flag in management behavior?", options: ["Increasing dividend payouts", "Buying back shares at reasonable prices", "Frequent equity dilution without value creation", "High promoter shareholding"], answer: 2 },
          { q: "Promoter pledging means:", options: ["Promoters buying more shares", "Promoters borrowing money against their shares", "Promoters donating shares", "Promoters increasing dividends"], answer: 1 },
        ],
      },
    },

    // ══════════════════════════════════════
    // MODULE 7: Putting It All Together
    // ══════════════════════════════════════
    {
      id: "m7",
      title: "Building Your Stock Analysis Framework",
      lessons: [
        {
          id: "m7-l1", title: "The Complete Stock Analysis Checklist", type: "article", videoUrl: "", duration: "12 min",
          content: [
            { type: "heading", text: "A Systematic Approach to Stock Picking" },
            { type: "paragraph", text: "Now that you understand all the individual components, let's combine them into a practical framework. Professional fund managers use structured checklists to evaluate stocks systematically. Here's yours." },
            { type: "heading", text: "The Finscure Stock Analysis Checklist" },
            { type: "paragraph", text: "Business Understanding (5 minutes): What does the company do? Who are its customers? What's its competitive advantage? Can you explain the business to a 12-year-old? If not, skip it." },
            { type: "paragraph", text: "Financial Health (30 minutes on Screener.in): Revenue growth — consistent double-digit growth over 5 years? Operating margin — stable or expanding? ROE/ROCE — above 15% consistently? Debt-to-Equity — below 1x (ideally below 0.5x)? Free Cash Flow — positive and growing? Dividend history — consistent and growing?" },
            { type: "paragraph", text: "Valuation (15 minutes): P/E vs sector average and own history. PEG ratio — below 1.5? P/B vs sector norms. EV/EBITDA vs peers." },
            { type: "paragraph", text: "Qualitative Check (30 minutes): Promoter holding and trend. Any SEBI actions or governance issues? Management commentary in latest annual report. Industry growth outlook. Competitive threats — any disruptors?" },
            { type: "paragraph", text: "Final Decision: Does the stock meet at least 8 out of 10 criteria? Is there adequate margin of safety (20-30% below your estimated fair value)? Would you be comfortable holding this stock for 5+ years even if the market crashes 30%?" },
            { type: "callout", text: "Key Takeaway: A systematic checklist removes emotion from stock picking. Go through this checklist for every stock before buying. Over time, you'll develop pattern recognition — you'll quickly identify quality businesses and avoid value traps." },
          ],
        },
        {
          id: "m7-l2", title: "Sector-Specific Analysis — What to Focus On", type: "article", videoUrl: "", duration: "14 min",
          content: [
            { type: "heading", text: "Every Sector Has Different Key Metrics" },
            { type: "paragraph", text: "The same financial metric can mean very different things across sectors. Here's a guide to what matters most in each major sector." },
            { type: "table", headers: ["Sector", "Key Metrics to Focus On", "What to Watch Out For"], rows: [
              ["Banking", "NIM (Net Interest Margin), NPA ratio, CASA ratio, ROA, Book Value", "Rising NPAs, low provision coverage, aggressive lending"],
              ["IT Services", "Revenue growth in USD, deal wins (TCV), attrition rate, margins", "Client concentration, visa regulation changes, margin compression"],
              ["FMCG", "Volume growth (not just value), distribution reach, market share", "Price hikes masking volume decline, rising input costs"],
              ["Pharma", "R&D pipeline, ANDA approvals, API vs formulation mix", "FDA observations, pricing pressure in US generics"],
              ["Auto", "Monthly sales volumes, market share by segment, EV transition plans", "Inventory at dealers, BS-VI compliance costs"],
              ["Real Estate", "Pre-sales growth, collections, net debt, project launches", "Unsold inventory levels, delayed projects, land bank quality"],
              ["Insurance", "Embedded Value (EV), VNB margin, persistency ratio, combined ratio", "High lapse rates, aggressive product pricing"],
              ["Metal/Mining", "EBITDA/ton, capacity utilization, global commodity prices", "Cyclicality, China demand, environmental regulations"],
            ]},
            { type: "callout", text: "Key Takeaway: Don't apply one-size-fits-all analysis across sectors. Learn the 2-3 key metrics for each sector you invest in. Banking requires completely different analysis from IT or Pharma. Sector specialization is how professional analysts develop edge." },
          ],
        },
        {
          id: "m7-l3", title: "Common Fundamental Analysis Mistakes & Next Steps", type: "article", videoUrl: "", duration: "10 min",
          content: [
            { type: "heading", text: "Mistakes That Even Experienced Investors Make" },
            { type: "paragraph", text: "Falling in love with a stock: Once you've done deep research, it's easy to ignore warning signs. Always maintain objectivity — no stock is perfect. Have pre-defined exit criteria." },
            { type: "paragraph", text: "Ignoring the price you pay: A great company at an overvalued price is a bad investment. Discipline to wait for the right price is what separates good investors from great ones." },
            { type: "paragraph", text: "Over-reliance on historical data: Past performance doesn't guarantee future results. Industries change, moats erode, and management makes mistakes. Always evaluate the future outlook, not just historical financials." },
            { type: "paragraph", text: "Neglecting macro factors: Even the best company can suffer if the economy enters a recession or if government policies change unfavorably. Keep one eye on the macro environment." },
            { type: "heading", text: "Your Next Steps" },
            { type: "paragraph", text: "Step 1: Pick 3 companies from different sectors and complete the full analysis checklist for each. Step 2: Compare your valuation with the current market price — would you buy? Step 3: Track your analysis for 6-12 months to see how accurate your assessment was. Step 4: Take the Technical Analysis course to learn when to enter your fundamentally chosen stocks. Step 5: Start building a portfolio of 10-15 fundamentally strong stocks across sectors." },
            { type: "callout", text: "Final Takeaway: Fundamental analysis is a craft that improves with practice. The more annual reports you read, the more companies you analyze, the sharper your judgment becomes. Start with companies you understand as a consumer — analyze brands you use daily. That familiarity gives you a natural advantage." },
          ],
        },
      ],
      quiz: {
        id: "m7-quiz",
        questions: [
          { q: "The first step in stock analysis should be:", options: ["Check the P/E ratio", "Understand what the business does", "Look at the stock chart", "Check today's price"], answer: 1 },
          { q: "For banking stocks, the most important metric is:", options: ["P/E ratio", "Gross margin", "NPA ratio and NIM", "Revenue growth"], answer: 2 },
          { q: "NPA in banking stands for:", options: ["Net Profit Adjustment", "Non-Performing Assets", "National Payment Authority", "New Profit Analysis"], answer: 1 },
          { q: "For IT companies, which metric is uniquely important?", options: ["Inventory turnover", "Revenue growth in USD terms and deal wins", "Land bank size", "NPA ratio"], answer: 1 },
          { q: "'Falling in love with a stock' is dangerous because:", options: ["It's not romantic enough", "You ignore warning signs and lose objectivity", "SEBI prohibits emotional investing", "It always leads to profits"], answer: 1 },
          { q: "A great company at an overvalued price is:", options: ["A great investment", "A bad investment — price matters", "Guaranteed to go higher", "Risk-free"], answer: 1 },
          { q: "How many stocks should a well-diversified fundamental portfolio have?", options: ["1-2 stocks", "10-15 stocks across sectors", "100+ stocks", "Only 1 sector"], answer: 1 },
          { q: "The best way to improve your fundamental analysis skills is:", options: ["Reading stock tips on social media", "Practice — analyze more companies and read more annual reports", "Only investing in index funds", "Attending paid seminars"], answer: 1 },
        ],
      },
    },
  ],
};
