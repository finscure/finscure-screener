import { useState, useEffect, useRef, useMemo, useCallback } from "react";

/* ═══════════════════════════════════════════════════
   NSE INDICES — Complete official list
   ═══════════════════════════════════════════════════ */
const NSE_INDICES = [
  { key: "ALL", label: "NSE Indices" },
  { key: "NIFTY50", label: "NIFTY 50" },
  { key: "NIFTYNEXT50", label: "NIFTY Next 50" },
  { key: "NIFTY100", label: "NIFTY 100" },
  { key: "NIFTY200", label: "NIFTY 200" },
  { key: "NIFTY500", label: "NIFTY 500" },
  { key: "NIFTYMIDCAP50", label: "NIFTY Midcap 50" },
  { key: "NIFTYMIDCAP100", label: "NIFTY Midcap 100" },
  { key: "NIFTYSMALLCAP50", label: "NIFTY Smallcap 50" },
  { key: "NIFTYSMALLCAP100", label: "NIFTY Smallcap 100" },
  { key: "NIFTYMICROCAP250", label: "NIFTY Microcap 250" },
  { key: "NIFTYBANK", label: "NIFTY Bank" },
  { key: "NIFTYFINSERVICE", label: "NIFTY Financial Services" },
  { key: "NIFTYIT", label: "NIFTY IT" },
  { key: "NIFTYPHARMA", label: "NIFTY Pharma" },
  { key: "NIFTYFMCG", label: "NIFTY FMCG" },
  { key: "NIFTYMETAL", label: "NIFTY Metal" },
  { key: "NIFTYREALTY", label: "NIFTY Realty" },
  { key: "NIFTYENERGY", label: "NIFTY Energy" },
  { key: "NIFTYINFRA", label: "NIFTY Infrastructure" },
  { key: "NIFTYPSE", label: "NIFTY PSE" },
  { key: "NIFTYPVTBANK", label: "NIFTY Private Bank" },
  { key: "NIFTYPSUBANK", label: "NIFTY PSU Bank" },
  { key: "NIFTYAUTO", label: "NIFTY Auto" },
  { key: "NIFTYMEDIA", label: "NIFTY Media" },
  { key: "NIFTYMNC", label: "NIFTY MNC" },
  { key: "NIFTYCOMMODITIES", label: "NIFTY Commodities" },
  { key: "NIFTYCONSUMPTION", label: "NIFTY Consumption" },
  { key: "NIFTYCPSE", label: "NIFTY CPSE" },
  { key: "NIFTYDIGITAL", label: "NIFTY India Digital" },
  { key: "NIFTYHEALTHCARE", label: "NIFTY Healthcare" },
  { key: "NIFTYOILANDGAS", label: "NIFTY Oil & Gas" },
  { key: "NIFTYTOTALMARKET", label: "NIFTY Total Market" },
  { key: "NIFTYCONSDURABLES", label: "NIFTY Consumer Durables" },
  { key: "NIFTYTRANSPORTATION", label: "NIFTY Transportation" },
  { key: "NIFTYDEFENCE", label: "NIFTY India Defence" },
];

const SECTORS = [
  "All","Energy","IT","Banking","FMCG","Telecom","Infrastructure",
  "Automobile","Pharma","Finance","Consumer","Metal","Realty","Media",
  "Cement","Chemicals","Power","Insurance","Healthcare","Textiles",
  "Aviation","Defence","Logistics","Fertilizer","Capital Goods",
  "Sugar","Paper","Hospitality",
];

const STOCK_REGISTRY = [
  {s:"RELIANCE",n:"Reliance Industries Ltd",sec:"Energy",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYENERGY","NIFTYOILANDGAS"]},
  {s:"TCS",n:"Tata Consultancy Services",sec:"IT",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYIT"]},
  {s:"HDFCBANK",n:"HDFC Bank Ltd",sec:"Banking",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYBANK","NIFTYPVTBANK","NIFTYFINSERVICE"]},
  {s:"INFY",n:"Infosys Ltd",sec:"IT",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYIT"]},
  {s:"ICICIBANK",n:"ICICI Bank Ltd",sec:"Banking",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYBANK","NIFTYPVTBANK","NIFTYFINSERVICE"]},
  {s:"HINDUNILVR",n:"Hindustan Unilever Ltd",sec:"FMCG",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYFMCG","NIFTYCONSUMPTION"]},
  {s:"SBIN",n:"State Bank of India",sec:"Banking",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYBANK","NIFTYPSUBANK","NIFTYPSE"]},
  {s:"BHARTIARTL",n:"Bharti Airtel Ltd",sec:"Telecom",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYINFRA"]},
  {s:"ITC",n:"ITC Ltd",sec:"FMCG",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYFMCG","NIFTYCONSUMPTION"]},
  {s:"KOTAKBANK",n:"Kotak Mahindra Bank",sec:"Banking",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYBANK","NIFTYPVTBANK","NIFTYFINSERVICE"]},
  {s:"LT",n:"Larsen & Toubro Ltd",sec:"Infrastructure",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYINFRA"]},
  {s:"AXISBANK",n:"Axis Bank Ltd",sec:"Banking",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYBANK","NIFTYPVTBANK","NIFTYFINSERVICE"]},
  {s:"WIPRO",n:"Wipro Ltd",sec:"IT",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYIT"]},
  {s:"TATAMOTORS",n:"Tata Motors Ltd",sec:"Automobile",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYAUTO"]},
  {s:"SUNPHARMA",n:"Sun Pharmaceutical Ind",sec:"Pharma",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYPHARMA","NIFTYHEALTHCARE"]},
  {s:"MARUTI",n:"Maruti Suzuki India",sec:"Automobile",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYAUTO"]},
  {s:"HCLTECH",n:"HCL Technologies Ltd",sec:"IT",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYIT"]},
  {s:"BAJFINANCE",n:"Bajaj Finance Ltd",sec:"Finance",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"ASIANPAINT",n:"Asian Paints Ltd",sec:"Consumer",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYCONSUMPTION"]},
  {s:"TECHM",n:"Tech Mahindra Ltd",sec:"IT",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYIT"]},
  {s:"TITAN",n:"Titan Company Ltd",sec:"Consumer",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYCONSUMPTION"]},
  {s:"BAJAJFINSV",n:"Bajaj Finserv Ltd",sec:"Finance",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"NTPC",n:"NTPC Ltd",sec:"Power",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYENERGY","NIFTYPSE","NIFTYCPSE"]},
  {s:"POWERGRID",n:"Power Grid Corp",sec:"Power",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYENERGY","NIFTYPSE","NIFTYCPSE","NIFTYINFRA"]},
  {s:"ULTRACEMCO",n:"UltraTech Cement Ltd",sec:"Cement",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYINFRA"]},
  {s:"ADANIENT",n:"Adani Enterprises Ltd",sec:"Infrastructure",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500"]},
  {s:"ADANIPORTS",n:"Adani Ports & SEZ",sec:"Infrastructure",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYINFRA"]},
  {s:"NESTLEIND",n:"Nestle India Ltd",sec:"FMCG",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYFMCG","NIFTYMNC"]},
  {s:"ONGC",n:"Oil & Natural Gas Corp",sec:"Energy",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYENERGY","NIFTYOILANDGAS","NIFTYPSE","NIFTYCPSE"]},
  {s:"JSWSTEEL",n:"JSW Steel Ltd",sec:"Metal",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYMETAL","NIFTYCOMMODITIES"]},
  {s:"TATASTEEL",n:"Tata Steel Ltd",sec:"Metal",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYMETAL","NIFTYCOMMODITIES"]},
  {s:"M&M",n:"Mahindra & Mahindra",sec:"Automobile",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYAUTO"]},
  {s:"COALINDIA",n:"Coal India Ltd",sec:"Energy",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYENERGY","NIFTYPSE","NIFTYCPSE","NIFTYCOMMODITIES"]},
  {s:"HDFCLIFE",n:"HDFC Life Insurance",sec:"Insurance",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"SBILIFE",n:"SBI Life Insurance",sec:"Insurance",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"GRASIM",n:"Grasim Industries Ltd",sec:"Cement",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYINFRA"]},
  {s:"BAJAJ-AUTO",n:"Bajaj Auto Ltd",sec:"Automobile",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYAUTO"]},
  {s:"INDUSINDBK",n:"IndusInd Bank Ltd",sec:"Banking",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYBANK","NIFTYPVTBANK","NIFTYFINSERVICE"]},
  {s:"BRITANNIA",n:"Britannia Industries",sec:"FMCG",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYFMCG","NIFTYCONSUMPTION"]},
  {s:"CIPLA",n:"Cipla Ltd",sec:"Pharma",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYPHARMA","NIFTYHEALTHCARE"]},
  {s:"EICHERMOT",n:"Eicher Motors Ltd",sec:"Automobile",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYAUTO"]},
  {s:"DRREDDY",n:"Dr Reddys Laboratories",sec:"Pharma",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYPHARMA","NIFTYHEALTHCARE"]},
  {s:"APOLLOHOSP",n:"Apollo Hospitals",sec:"Healthcare",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYHEALTHCARE"]},
  {s:"DIVISLAB",n:"Divis Laboratories",sec:"Pharma",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYPHARMA","NIFTYHEALTHCARE"]},
  {s:"TATACONSUM",n:"Tata Consumer Products",sec:"FMCG",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYFMCG","NIFTYCONSUMPTION"]},
  {s:"HEROMOTOCO",n:"Hero MotoCorp Ltd",sec:"Automobile",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYAUTO"]},
  {s:"BPCL",n:"Bharat Petroleum Corp",sec:"Energy",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYENERGY","NIFTYOILANDGAS","NIFTYPSE","NIFTYCPSE"]},
  {s:"HINDALCO",n:"Hindalco Industries",sec:"Metal",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYMETAL","NIFTYCOMMODITIES"]},
  {s:"SHRIRAMFIN",n:"Shriram Finance Ltd",sec:"Finance",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"TRENT",n:"Trent Ltd",sec:"Consumer",idx:["NIFTY50","NIFTY100","NIFTY200","NIFTY500","NIFTYCONSUMPTION"]},
  {s:"ADANIGREEN",n:"Adani Green Energy",sec:"Energy",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYENERGY"]},
  {s:"ADANIPOWER",n:"Adani Power Ltd",sec:"Power",idx:["NIFTYNEXT50","NIFTY200","NIFTY500","NIFTYENERGY"]},
  {s:"AMBUJACEM",n:"Ambuja Cements Ltd",sec:"Cement",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYINFRA"]},
  {s:"BANKBARODA",n:"Bank of Baroda",sec:"Banking",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYPSUBANK","NIFTYBANK","NIFTYPSE"]},
  {s:"BERGEPAINT",n:"Berger Paints India",sec:"Consumer",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYCONSUMPTION"]},
  {s:"BOSCHLTD",n:"Bosch Ltd",sec:"Automobile",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYAUTO","NIFTYMNC"]},
  {s:"CANBK",n:"Canara Bank",sec:"Banking",idx:["NIFTYNEXT50","NIFTY200","NIFTY500","NIFTYPSUBANK","NIFTYBANK","NIFTYPSE"]},
  {s:"CHOLAFIN",n:"Cholamandalam Investment",sec:"Finance",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"COLPAL",n:"Colgate-Palmolive India",sec:"FMCG",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYFMCG","NIFTYMNC"]},
  {s:"DLF",n:"DLF Ltd",sec:"Realty",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYREALTY"]},
  {s:"DABUR",n:"Dabur India Ltd",sec:"FMCG",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYFMCG","NIFTYCONSUMPTION"]},
  {s:"GODREJCP",n:"Godrej Consumer Products",sec:"FMCG",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYFMCG"]},
  {s:"HAVELLS",n:"Havells India Ltd",sec:"Consumer",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYCONSDURABLES"]},
  {s:"HAL",n:"Hindustan Aeronautics",sec:"Defence",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYPSE","NIFTYCPSE","NIFTYDEFENCE"]},
  {s:"ICICIGI",n:"ICICI Lombard General",sec:"Insurance",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"ICICIPRULI",n:"ICICI Prudential Life",sec:"Insurance",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"IOC",n:"Indian Oil Corporation",sec:"Energy",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYENERGY","NIFTYOILANDGAS","NIFTYPSE","NIFTYCPSE"]},
  {s:"INDIGO",n:"InterGlobe Aviation",sec:"Aviation",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYTRANSPORTATION"]},
  {s:"IRCTC",n:"Indian Railway Catering",sec:"Infrastructure",idx:["NIFTYNEXT50","NIFTY200","NIFTY500","NIFTYPSE","NIFTYCPSE","NIFTYTRANSPORTATION"]},
  {s:"JINDALSTEL",n:"Jindal Steel & Power",sec:"Metal",idx:["NIFTYNEXT50","NIFTY200","NIFTY500","NIFTYMETAL","NIFTYCOMMODITIES"]},
  {s:"LICI",n:"Life Insurance Corp",sec:"Insurance",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYFINSERVICE","NIFTYPSE"]},
  {s:"LUPIN",n:"Lupin Ltd",sec:"Pharma",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYPHARMA","NIFTYHEALTHCARE"]},
  {s:"MARICO",n:"Marico Ltd",sec:"FMCG",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYFMCG","NIFTYCONSUMPTION"]},
  {s:"PIDILITIND",n:"Pidilite Industries",sec:"Chemicals",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYCONSUMPTION"]},
  {s:"PNB",n:"Punjab National Bank",sec:"Banking",idx:["NIFTYNEXT50","NIFTY200","NIFTY500","NIFTYPSUBANK","NIFTYBANK","NIFTYPSE"]},
  {s:"SBICARD",n:"SBI Cards & Payment",sec:"Finance",idx:["NIFTYNEXT50","NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"SIEMENS",n:"Siemens Ltd",sec:"Capital Goods",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYMNC"]},
  {s:"TATAPOWER",n:"Tata Power Company",sec:"Power",idx:["NIFTYNEXT50","NIFTY200","NIFTY500","NIFTYENERGY","NIFTYINFRA"]},
  {s:"TORNTPHARM",n:"Torrent Pharma",sec:"Pharma",idx:["NIFTYNEXT50","NIFTY200","NIFTY500","NIFTYPHARMA","NIFTYHEALTHCARE"]},
  {s:"VEDL",n:"Vedanta Ltd",sec:"Metal",idx:["NIFTYNEXT50","NIFTY200","NIFTY500","NIFTYMETAL","NIFTYCOMMODITIES"]},
  {s:"ZOMATO",n:"Zomato Ltd",sec:"IT",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYDIGITAL"]},
  {s:"DMART",n:"Avenue Supermarts",sec:"Consumer",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYCONSUMPTION"]},
  {s:"LTIM",n:"LTIMindtree Ltd",sec:"IT",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYIT"]},
  {s:"NAUKRI",n:"Info Edge India",sec:"IT",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYDIGITAL"]},
  {s:"VBL",n:"Varun Beverages Ltd",sec:"FMCG",idx:["NIFTYNEXT50","NIFTY200","NIFTY500","NIFTYFMCG","NIFTYCONSUMPTION"]},
  {s:"JSWENERGY",n:"JSW Energy Ltd",sec:"Power",idx:["NIFTYNEXT50","NIFTY200","NIFTY500","NIFTYENERGY"]},
  {s:"ABB",n:"ABB India Ltd",sec:"Capital Goods",idx:["NIFTYNEXT50","NIFTY100","NIFTY200","NIFTY500","NIFTYMNC"]},
  {s:"ZYDUSLIFE",n:"Zydus Lifesciences",sec:"Pharma",idx:["NIFTYNEXT50","NIFTY200","NIFTY500","NIFTYPHARMA","NIFTYHEALTHCARE"]},
  {s:"JIOFIN",n:"Jio Financial Services",sec:"Finance",idx:["NIFTYNEXT50","NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"AUROPHARMA",n:"Aurobindo Pharma",sec:"Pharma",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYPHARMA"]},
  {s:"BALKRISIND",n:"Balkrishna Industries",sec:"Automobile",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYAUTO"]},
  {s:"BANDHANBNK",n:"Bandhan Bank Ltd",sec:"Banking",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYPVTBANK"]},
  {s:"BEL",n:"Bharat Electronics",sec:"Defence",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYPSE","NIFTYCPSE","NIFTYDEFENCE"]},
  {s:"BHEL",n:"Bharat Heavy Electricals",sec:"Capital Goods",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYPSE","NIFTYCPSE"]},
  {s:"BIOCON",n:"Biocon Ltd",sec:"Pharma",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYPHARMA","NIFTYHEALTHCARE"]},
  {s:"COFORGE",n:"Coforge Ltd",sec:"IT",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYIT"]},
  {s:"CONCOR",n:"Container Corp India",sec:"Logistics",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYPSE","NIFTYTRANSPORTATION"]},
  {s:"CROMPTON",n:"Crompton Greaves Cons",sec:"Consumer",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYCONSDURABLES"]},
  {s:"CUMMINSIND",n:"Cummins India Ltd",sec:"Capital Goods",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYMNC"]},
  {s:"DALBHARAT",n:"Dalmia Bharat Ltd",sec:"Cement",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYINFRA"]},
  {s:"DEEPAKNITRI",n:"Deepak Nitrite Ltd",sec:"Chemicals",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500"]},
  {s:"ESCORTS",n:"Escorts Kubota Ltd",sec:"Automobile",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYAUTO"]},
  {s:"EXIDEIND",n:"Exide Industries",sec:"Automobile",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYAUTO"]},
  {s:"FEDERALBNK",n:"Federal Bank Ltd",sec:"Banking",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYPVTBANK"]},
  {s:"GAIL",n:"GAIL India Ltd",sec:"Energy",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYENERGY","NIFTYOILANDGAS","NIFTYPSE","NIFTYCPSE"]},
  {s:"GLENMARK",n:"Glenmark Pharmaceuticals",sec:"Pharma",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYPHARMA"]},
  {s:"GMRINFRA",n:"GMR Airports Infra",sec:"Infrastructure",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYINFRA","NIFTYTRANSPORTATION"]},
  {s:"GODREJPROP",n:"Godrej Properties",sec:"Realty",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYREALTY"]},
  {s:"HINDPETRO",n:"Hindustan Petroleum",sec:"Energy",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYENERGY","NIFTYOILANDGAS","NIFTYPSE","NIFTYCPSE"]},
  {s:"IDFCFIRSTB",n:"IDFC First Bank",sec:"Banking",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYPVTBANK"]},
  {s:"IRFC",n:"Indian Railway Finance",sec:"Finance",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYPSE","NIFTYCPSE","NIFTYFINSERVICE"]},
  {s:"JUBLFOOD",n:"Jubilant FoodWorks",sec:"FMCG",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYCONSUMPTION"]},
  {s:"LICHSGFIN",n:"LIC Housing Finance",sec:"Finance",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"LTTS",n:"L&T Technology Svcs",sec:"IT",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYIT"]},
  {s:"MANAPPURAM",n:"Manappuram Finance",sec:"Finance",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"MAXHEALTH",n:"Max Healthcare Inst",sec:"Healthcare",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYHEALTHCARE"]},
  {s:"MOTHERSON",n:"Samvardhana Motherson",sec:"Automobile",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYAUTO"]},
  {s:"MPHASIS",n:"MPhasis Ltd",sec:"IT",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYIT"]},
  {s:"MUTHOOTFIN",n:"Muthoot Finance Ltd",sec:"Finance",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"NMDC",n:"NMDC Ltd",sec:"Metal",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYMETAL","NIFTYCOMMODITIES","NIFTYPSE","NIFTYCPSE"]},
  {s:"OBEROIRLTY",n:"Oberoi Realty Ltd",sec:"Realty",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYREALTY"]},
  {s:"PERSISTENT",n:"Persistent Systems",sec:"IT",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYIT"]},
  {s:"PETRONET",n:"Petronet LNG Ltd",sec:"Energy",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYENERGY","NIFTYOILANDGAS"]},
  {s:"POLYCAB",n:"Polycab India Ltd",sec:"Capital Goods",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYCONSDURABLES"]},
  {s:"PRESTIGE",n:"Prestige Estates",sec:"Realty",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYREALTY"]},
  {s:"RECLTD",n:"REC Ltd",sec:"Finance",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYFINSERVICE","NIFTYPSE","NIFTYCPSE"]},
  {s:"SAIL",n:"Steel Authority India",sec:"Metal",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYMETAL","NIFTYCOMMODITIES","NIFTYPSE","NIFTYCPSE"]},
  {s:"SRF",n:"SRF Ltd",sec:"Chemicals",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYCOMMODITIES"]},
  {s:"SUNTV",n:"Sun TV Network Ltd",sec:"Media",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYMEDIA"]},
  {s:"TATACHEM",n:"Tata Chemicals Ltd",sec:"Chemicals",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYCOMMODITIES"]},
  {s:"TATACOMM",n:"Tata Communications",sec:"Telecom",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500"]},
  {s:"TATAELXSI",n:"Tata Elxsi Ltd",sec:"IT",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYIT"]},
  {s:"TVSMOTOR",n:"TVS Motor Company",sec:"Automobile",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYAUTO"]},
  {s:"UNIONBANK",n:"Union Bank of India",sec:"Banking",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYPSUBANK","NIFTYPSE"]},
  {s:"VOLTAS",n:"Voltas Ltd",sec:"Consumer",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYCONSDURABLES"]},
  {s:"TORNTPOWER",n:"Torrent Power Ltd",sec:"Power",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYENERGY"]},
  {s:"SOLARINDS",n:"Solar Industries",sec:"Chemicals",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYDEFENCE"]},
  {s:"PAGEIND",n:"Page Industries Ltd",sec:"Textiles",idx:["NIFTYMIDCAP50","NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYMNC"]},
  {s:"PAYTM",n:"One97 Communications",sec:"IT",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYDIGITAL"]},
  {s:"PVRINOX",n:"PVR INOX Ltd",sec:"Media",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYMEDIA"]},
  {s:"OFSS",n:"Oracle Fin Services",sec:"IT",idx:["NIFTYMIDCAP50","NIFTY200","NIFTY500","NIFTYIT","NIFTYMNC"]},
  {s:"CANFINHOME",n:"Can Fin Homes Ltd",sec:"Finance",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"CUB",n:"City Union Bank",sec:"Banking",idx:["NIFTYMIDCAP100","NIFTY500"]},
  {s:"THERMAX",n:"Thermax Ltd",sec:"Capital Goods",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500"]},
  {s:"IEX",n:"Indian Energy Exchange",sec:"Energy",idx:["NIFTYMIDCAP100","NIFTY500","NIFTYENERGY"]},
  {s:"IPCALAB",n:"IPCA Laboratories",sec:"Pharma",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYPHARMA"]},
  {s:"RAMCOCEM",n:"The Ramco Cements",sec:"Cement",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYINFRA"]},
  {s:"UBL",n:"United Breweries",sec:"FMCG",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYFMCG","NIFTYMNC"]},
  {s:"UPL",n:"UPL Ltd",sec:"Chemicals",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYCOMMODITIES"]},
  {s:"L&TFH",n:"L&T Finance Ltd",sec:"Finance",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"MFSL",n:"Max Financial Svcs",sec:"Insurance",idx:["NIFTYMIDCAP100","NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"AARTIIND",n:"Aarti Industries",sec:"Chemicals",idx:["NIFTYSMALLCAP100","NIFTY500"]},
  {s:"ABCAPITAL",n:"Aditya Birla Capital",sec:"Finance",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYFINSERVICE"]},
  {s:"ABFRL",n:"Aditya Birla Fashion",sec:"Textiles",idx:["NIFTYSMALLCAP100","NIFTY500"]},
  {s:"ACC",n:"ACC Ltd",sec:"Cement",idx:["NIFTY200","NIFTY500","NIFTYINFRA"]},
  {s:"ADANIWILMAR",n:"Adani Wilmar Ltd",sec:"FMCG",idx:["NIFTY500","NIFTYFMCG"]},
  {s:"ALKEM",n:"Alkem Laboratories",sec:"Pharma",idx:["NIFTY200","NIFTY500","NIFTYPHARMA"]},
  {s:"AMARAJABAT",n:"Amara Raja Energy",sec:"Automobile",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYAUTO"]},
  {s:"ASHOKLEY",n:"Ashok Leyland Ltd",sec:"Automobile",idx:["NIFTY200","NIFTY500","NIFTYAUTO"]},
  {s:"ASTRAL",n:"Astral Ltd",sec:"Infrastructure",idx:["NIFTY200","NIFTY500","NIFTYINFRA"]},
  {s:"ATUL",n:"Atul Ltd",sec:"Chemicals",idx:["NIFTYSMALLCAP100","NIFTY500"]},
  {s:"AUBANK",n:"AU Small Finance Bank",sec:"Banking",idx:["NIFTY200","NIFTY500","NIFTYPVTBANK"]},
  {s:"BATAINDIA",n:"Bata India Ltd",sec:"Consumer",idx:["NIFTY200","NIFTY500","NIFTYCONSUMPTION"]},
  {s:"BHARATFORG",n:"Bharat Forge Ltd",sec:"Capital Goods",idx:["NIFTY200","NIFTY500","NIFTYAUTO","NIFTYDEFENCE"]},
  {s:"CENTRALBK",n:"Central Bank India",sec:"Banking",idx:["NIFTY500","NIFTYPSUBANK","NIFTYPSE"]},
  {s:"CGPOWER",n:"CG Power & Industrial",sec:"Capital Goods",idx:["NIFTY200","NIFTY500"]},
  {s:"CLEAN",n:"Clean Science & Tech",sec:"Chemicals",idx:["NIFTYSMALLCAP100","NIFTY500"]},
  {s:"COROMANDEL",n:"Coromandel Intl",sec:"Fertilizer",idx:["NIFTY200","NIFTY500","NIFTYCOMMODITIES"]},
  {s:"CRISIL",n:"CRISIL Ltd",sec:"Finance",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYMNC"]},
  {s:"DELHIVERY",n:"Delhivery Ltd",sec:"Logistics",idx:["NIFTY200","NIFTY500","NIFTYTRANSPORTATION"]},
  {s:"DIXON",n:"Dixon Technologies",sec:"Consumer",idx:["NIFTY200","NIFTY500","NIFTYCONSDURABLES"]},
  {s:"EMAMILTD",n:"Emami Ltd",sec:"FMCG",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYFMCG"]},
  {s:"FORTIS",n:"Fortis Healthcare",sec:"Healthcare",idx:["NIFTY200","NIFTY500","NIFTYHEALTHCARE"]},
  {s:"HDFCAMC",n:"HDFC Asset Management",sec:"Finance",idx:["NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"IDBI",n:"IDBI Bank Ltd",sec:"Banking",idx:["NIFTY500","NIFTYPSUBANK","NIFTYPSE"]},
  {s:"INDIANB",n:"Indian Bank",sec:"Banking",idx:["NIFTY200","NIFTY500","NIFTYPSUBANK","NIFTYPSE"]},
  {s:"INDHOTEL",n:"Indian Hotels Co",sec:"Consumer",idx:["NIFTY200","NIFTY500","NIFTYCONSUMPTION"]},
  {s:"INDUSTOWER",n:"Indus Towers Ltd",sec:"Telecom",idx:["NIFTY200","NIFTY500","NIFTYINFRA"]},
  {s:"JSL",n:"Jindal Stainless",sec:"Metal",idx:["NIFTY200","NIFTY500","NIFTYMETAL"]},
  {s:"KEI",n:"KEI Industries Ltd",sec:"Capital Goods",idx:["NIFTYSMALLCAP100","NIFTY500"]},
  {s:"LAURUSLABS",n:"Laurus Labs Ltd",sec:"Pharma",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYPHARMA"]},
  {s:"M&MFIN",n:"Mahindra & Mahindra Fin",sec:"Finance",idx:["NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"MAZDOCK",n:"Mazagon Dock",sec:"Defence",idx:["NIFTY200","NIFTY500","NIFTYPSE","NIFTYCPSE","NIFTYDEFENCE"]},
  {s:"MCX",n:"Multi Commodity Exchange",sec:"Finance",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYFINSERVICE"]},
  {s:"METROPOLIS",n:"Metropolis Healthcare",sec:"Healthcare",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYHEALTHCARE"]},
  {s:"NATIONALUM",n:"National Aluminium",sec:"Metal",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYMETAL","NIFTYCOMMODITIES","NIFTYPSE","NIFTYCPSE"]},
  {s:"NHPC",n:"NHPC Ltd",sec:"Power",idx:["NIFTY200","NIFTY500","NIFTYENERGY","NIFTYPSE","NIFTYCPSE"]},
  {s:"PFC",n:"Power Finance Corp",sec:"Finance",idx:["NIFTY200","NIFTY500","NIFTYFINSERVICE","NIFTYPSE","NIFTYCPSE"]},
  {s:"PIIND",n:"PI Industries Ltd",sec:"Chemicals",idx:["NIFTY200","NIFTY500","NIFTYCOMMODITIES"]},
  {s:"RVNL",n:"Rail Vikas Nigam",sec:"Infrastructure",idx:["NIFTY500","NIFTYPSE","NIFTYCPSE","NIFTYINFRA","NIFTYTRANSPORTATION","NIFTYDEFENCE"]},
  {s:"SUZLON",n:"Suzlon Energy Ltd",sec:"Energy",idx:["NIFTY500","NIFTYENERGY"]},
  {s:"TIINDIA",n:"Tube Investments India",sec:"Automobile",idx:["NIFTY200","NIFTY500","NIFTYAUTO"]},
  {s:"IRBINFRA",n:"IRB Infrastructure",sec:"Infrastructure",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYINFRA"]},
  {s:"IGL",n:"Indraprastha Gas",sec:"Energy",idx:["NIFTY200","NIFTY500","NIFTYENERGY","NIFTYOILANDGAS"]},
  {s:"KPITTECH",n:"KPIT Technologies",sec:"IT",idx:["NIFTY200","NIFTY500","NIFTYIT"]},
  {s:"SONACOMS",n:"Sona BLW Precision",sec:"Automobile",idx:["NIFTY200","NIFTY500","NIFTYAUTO"]},
  {s:"JKCEMENT",n:"JK Cement Ltd",sec:"Cement",idx:["NIFTY200","NIFTY500","NIFTYINFRA"]},
  {s:"NAVINFLUOR",n:"Navin Fluorine Intl",sec:"Chemicals",idx:["NIFTYSMALLCAP100","NIFTY500"]},
  {s:"PHOENIXLTD",n:"Phoenix Mills Ltd",sec:"Realty",idx:["NIFTY200","NIFTY500","NIFTYREALTY"]},
  {s:"LALPATHLAB",n:"Dr Lal PathLabs",sec:"Healthcare",idx:["NIFTY200","NIFTY500","NIFTYHEALTHCARE"]},
  {s:"IDEA",n:"Vodafone Idea Ltd",sec:"Telecom",idx:["NIFTY500"]},
  {s:"NBCC",n:"NBCC India Ltd",sec:"Infrastructure",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYPSE","NIFTYCPSE","NIFTYINFRA"]},
  {s:"YESBANK",n:"Yes Bank Ltd",sec:"Banking",idx:["NIFTY500"]},
  {s:"ZEEL",n:"Zee Entertainment",sec:"Media",idx:["NIFTY500","NIFTYMEDIA"]},
  {s:"COCHINSHIP",n:"Cochin Shipyard",sec:"Defence",idx:["NIFTY500","NIFTYPSE","NIFTYCPSE","NIFTYDEFENCE"]},
  {s:"HAPPSTMIND",n:"Happiest Minds Tech",sec:"IT",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYIT"]},
  {s:"RAILTEL",n:"RailTel Corporation",sec:"IT",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYPSE","NIFTYCPSE"]},
  {s:"AFFLE",n:"Affle India Ltd",sec:"IT",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYDIGITAL"]},
  {s:"KAJARIACER",n:"Kajaria Ceramics",sec:"Consumer",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYCONSDURABLES"]},
  {s:"GSPL",n:"Gujarat State Petronet",sec:"Energy",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYENERGY","NIFTYOILANDGAS"]},
  {s:"NLCINDIA",n:"NLC India Ltd",sec:"Power",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYENERGY","NIFTYPSE","NIFTYCPSE"]},
  {s:"NAM-INDIA",n:"Nippon Life AMC",sec:"Finance",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYFINSERVICE"]},
  {s:"SJVN",n:"SJVN Ltd",sec:"Power",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYENERGY","NIFTYPSE","NIFTYCPSE"]},
  {s:"SYNGENE",n:"Syngene International",sec:"Pharma",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYPHARMA"]},
  {s:"GRINDWELL",n:"Grindwell Norton",sec:"Capital Goods",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYMNC"]},
  {s:"SUVENPHAR",n:"Suven Pharmaceuticals",sec:"Pharma",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYPHARMA"]},
  {s:"TRIDENT",n:"Trident Ltd",sec:"Textiles",idx:["NIFTYSMALLCAP100","NIFTY500"]},
  {s:"TATAINVEST",n:"Tata Investment Corp",sec:"Finance",idx:["NIFTYSMALLCAP50","NIFTY500"]},
  {s:"PGHH",n:"Procter & Gamble Hygiene",sec:"FMCG",idx:["NIFTYSMALLCAP50","NIFTY500","NIFTYFMCG","NIFTYMNC"]},
  {s:"HONAUT",n:"Honeywell Automation",sec:"Capital Goods",idx:["NIFTYSMALLCAP50","NIFTY500","NIFTYMNC"]},
  {s:"ABOTT",n:"Abbott India Ltd",sec:"Pharma",idx:["NIFTYSMALLCAP50","NIFTY500","NIFTYPHARMA","NIFTYMNC"]},
  {s:"MRF",n:"MRF Ltd",sec:"Automobile",idx:["NIFTYSMALLCAP50","NIFTY500","NIFTYAUTO"]},
  {s:"3MINDIA",n:"3M India Ltd",sec:"Consumer",idx:["NIFTYSMALLCAP50","NIFTY500","NIFTYMNC"]},
  {s:"MCDOWELL-N",n:"United Spirits Ltd",sec:"FMCG",idx:["NIFTY200","NIFTY500","NIFTYFMCG","NIFTYMNC","NIFTYCONSUMPTION"]},
  {s:"SUPREMEIND",n:"Supreme Industries",sec:"Infrastructure",idx:["NIFTYSMALLCAP100","NIFTY500"]},
  {s:"POWERMECH",n:"Power Mech Projects",sec:"Infrastructure",idx:["NIFTYMICROCAP250"]},
  {s:"RATNAMANI",n:"Ratnamani Metals",sec:"Metal",idx:["NIFTY500"]},
  {s:"NIACL",n:"New India Assurance",sec:"Insurance",idx:["NIFTY500","NIFTYPSE"]},
  {s:"HINDCOPPER",n:"Hindustan Copper",sec:"Metal",idx:["NIFTY500","NIFTYMETAL","NIFTYPSE","NIFTYCPSE","NIFTYCOMMODITIES"]},
  {s:"HUDCO",n:"HUDCO Ltd",sec:"Finance",idx:["NIFTY500","NIFTYPSE","NIFTYCPSE"]},
  {s:"IREDA",n:"Indian Renewable Energy",sec:"Finance",idx:["NIFTY500","NIFTYPSE"]},
  {s:"FACT",n:"Fertilisers And Chemicals",sec:"Fertilizer",idx:["NIFTY500","NIFTYPSE","NIFTYCPSE"]},
  {s:"BDL",n:"Bharat Dynamics Ltd",sec:"Defence",idx:["NIFTY500","NIFTYPSE","NIFTYCPSE","NIFTYDEFENCE"]},
  {s:"GESHIP",n:"Great Eastern Shipping",sec:"Logistics",idx:["NIFTY500","NIFTYTRANSPORTATION"]},
  {s:"ENGINERSIN",n:"Engineers India Ltd",sec:"Infrastructure",idx:["NIFTY500","NIFTYPSE","NIFTYCPSE"]},
  {s:"MANINFRA",n:"Man Infraconstruction",sec:"Infrastructure",idx:["NIFTYSMALLCAP100","NIFTY500"]},
  {s:"BAYERCROP",n:"Bayer CropScience",sec:"Chemicals",idx:["NIFTYSMALLCAP50","NIFTY500","NIFTYMNC"]},
  {s:"PFIZER",n:"Pfizer Ltd",sec:"Pharma",idx:["NIFTYSMALLCAP50","NIFTY500","NIFTYPHARMA","NIFTYMNC"]},
  {s:"GLAXO",n:"GSK Pharmaceuticals",sec:"Pharma",idx:["NIFTY500","NIFTYPHARMA","NIFTYMNC"]},
  {s:"SCHNEIDER",n:"Schneider Electric",sec:"Capital Goods",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYMNC"]},
  {s:"SCHAEFFLER",n:"Schaeffler India",sec:"Automobile",idx:["NIFTYSMALLCAP50","NIFTY500","NIFTYMNC","NIFTYAUTO"]},
  {s:"GILLETTE",n:"Gillette India",sec:"FMCG",idx:["NIFTYSMALLCAP50","NIFTY500","NIFTYMNC","NIFTYFMCG"]},
  {s:"WHIRLPOOL",n:"Whirlpool of India",sec:"Consumer",idx:["NIFTYSMALLCAP100","NIFTY500","NIFTYMNC","NIFTYCONSDURABLES"]},
  {s:"CASTROLIND",n:"Castrol India Ltd",sec:"Energy",idx:["NIFTY500","NIFTYMNC"]},
  {s:"SAPPHIRE",n:"Sapphire Foods India",sec:"Consumer",idx:["NIFTY500","NIFTYCONSUMPTION"]},
  {s:"DEVYANI",n:"Devyani International",sec:"Consumer",idx:["NIFTY500","NIFTYCONSUMPTION"]},
  {s:"STARHEALTH",n:"Star Health Insurance",sec:"Insurance",idx:["NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"POLICYBZR",n:"PB Fintech Ltd",sec:"Finance",idx:["NIFTY200","NIFTY500","NIFTYFINSERVICE","NIFTYDIGITAL"]},
  {s:"CARTRADE",n:"CarTrade Tech",sec:"IT",idx:["NIFTY500","NIFTYDIGITAL"]},
  {s:"EASEMYTRIP",n:"Easy Trip Planners",sec:"Consumer",idx:["NIFTY500"]},
  {s:"NYKAA",n:"FSN E-Commerce",sec:"Consumer",idx:["NIFTY200","NIFTY500","NIFTYDIGITAL"]},
  {s:"CAMPUS",n:"Campus Activewear",sec:"Consumer",idx:["NIFTY500","NIFTYCONSUMPTION"]},
  {s:"GOCOLORS",n:"Go Fashion India",sec:"Textiles",idx:["NIFTY500","NIFTYCONSUMPTION"]},
  {s:"MEDANTA",n:"Global Health Ltd",sec:"Healthcare",idx:["NIFTY500","NIFTYHEALTHCARE"]},
  {s:"RAINBOW",n:"Rainbow Childrens Medicare",sec:"Healthcare",idx:["NIFTY500","NIFTYHEALTHCARE"]},
  {s:"YATHARTH",n:"Yatharth Hospital",sec:"Healthcare",idx:["NIFTYMICROCAP250"]},
  {s:"ERIS",n:"Eris Lifesciences",sec:"Pharma",idx:["NIFTY500","NIFTYPHARMA"]},
  {s:"GRANULES",n:"Granules India",sec:"Pharma",idx:["NIFTY500","NIFTYPHARMA"]},
  {s:"NATCOPHARM",n:"Natco Pharma Ltd",sec:"Pharma",idx:["NIFTY500","NIFTYPHARMA"]},
  {s:"AJANTPHARM",n:"Ajanta Pharma",sec:"Pharma",idx:["NIFTY500","NIFTYPHARMA"]},
  {s:"JBCHEPHARM",n:"JB Chemicals",sec:"Pharma",idx:["NIFTY500","NIFTYPHARMA"]},
  {s:"MANKIND",n:"Mankind Pharma",sec:"Pharma",idx:["NIFTY200","NIFTY500","NIFTYPHARMA"]},
  {s:"MAXFINVEST",n:"Max Financial Svcs",sec:"Insurance",idx:["NIFTY500","NIFTYFINSERVICE"]},
  {s:"ANGELONE",n:"Angel One Ltd",sec:"Finance",idx:["NIFTY500","NIFTYFINSERVICE"]},
  {s:"UTIAMC",n:"UTI AMC Ltd",sec:"Finance",idx:["NIFTY500","NIFTYFINSERVICE"]},
  {s:"MASFIN",n:"MAS Financial Services",sec:"Finance",idx:["NIFTY500"]},
  {s:"RBLBANK",n:"RBL Bank Ltd",sec:"Banking",idx:["NIFTY500","NIFTYPVTBANK"]},
  {s:"EQUITASBNK",n:"Equitas SFB",sec:"Banking",idx:["NIFTY500"]},
  {s:"UJJIVANSFB",n:"Ujjivan Small Finance",sec:"Banking",idx:["NIFTY500"]},
  {s:"SOUTHBANK",n:"South Indian Bank",sec:"Banking",idx:["NIFTY500"]},
  {s:"TMB",n:"Tamilnad Mercantile Bank",sec:"Banking",idx:["NIFTY500"]},
  {s:"KTKBANK",n:"Karnataka Bank",sec:"Banking",idx:["NIFTY500"]},
  {s:"DCBBANK",n:"DCB Bank Ltd",sec:"Banking",idx:["NIFTY500"]},
  {s:"IOB",n:"Indian Overseas Bank",sec:"Banking",idx:["NIFTY500","NIFTYPSUBANK","NIFTYPSE"]},
  {s:"BANKINDIA",n:"Bank of India",sec:"Banking",idx:["NIFTY500","NIFTYPSUBANK","NIFTYPSE"]},
  {s:"UCOBANK",n:"UCO Bank",sec:"Banking",idx:["NIFTY500","NIFTYPSUBANK","NIFTYPSE"]},
  {s:"MAHABANK",n:"Bank of Maharashtra",sec:"Banking",idx:["NIFTY500","NIFTYPSUBANK","NIFTYPSE"]},
  {s:"PSB",n:"Punjab & Sind Bank",sec:"Banking",idx:["NIFTY500","NIFTYPSUBANK","NIFTYPSE"]},
  {s:"TATVA",n:"Tatva Chintan Pharma",sec:"Chemicals",idx:["NIFTY500"]},
  {s:"FINEORG",n:"Fine Organic Ind",sec:"Chemicals",idx:["NIFTYSMALLCAP100","NIFTY500"]},
  {s:"NOCIL",n:"NOCIL Ltd",sec:"Chemicals",idx:["NIFTY500"]},
  {s:"FLUOROCHEM",n:"Gujarat Fluorochem",sec:"Chemicals",idx:["NIFTY500"]},
  {s:"ALKYLAMINE",n:"Alkyl Amines Chem",sec:"Chemicals",idx:["NIFTY500"]},
  {s:"GALAXYSURF",n:"Galaxy Surfactants",sec:"Chemicals",idx:["NIFTY500"]},
  {s:"BASF",n:"BASF India Ltd",sec:"Chemicals",idx:["NIFTY500","NIFTYMNC"]},
  {s:"SUMICHEM",n:"Sumitomo Chemical",sec:"Chemicals",idx:["NIFTY200","NIFTY500","NIFTYCOMMODITIES"]},
  {s:"VINATIORGA",n:"Vinati Organics",sec:"Chemicals",idx:["NIFTY500"]},
  {s:"APLAPOLLO",n:"APL Apollo Tubes",sec:"Infrastructure",idx:["NIFTY200","NIFTY500","NIFTYINFRA"]},
  {s:"JKLAKSHMI",n:"JK Lakshmi Cement",sec:"Cement",idx:["NIFTY500","NIFTYINFRA"]},
  {s:"STARCEM",n:"Star Cement Ltd",sec:"Cement",idx:["NIFTY500"]},
  {s:"NUVOCO",n:"Nuvoco Vistas Corp",sec:"Cement",idx:["NIFTY500"]},
  {s:"PRISMJOINS",n:"Prism Johnson Ltd",sec:"Cement",idx:["NIFTY500"]},
  {s:"INDIACEM",n:"India Cements Ltd",sec:"Cement",idx:["NIFTY500"]},
  {s:"SWANENERGY",n:"Swan Energy Ltd",sec:"Energy",idx:["NIFTY500"]},
  {s:"OLECTRA",n:"Olectra Greentech",sec:"Automobile",idx:["NIFTY500","NIFTYAUTO"]},
  {s:"MSUMI",n:"Motherson Sumi Wiring",sec:"Automobile",idx:["NIFTY500","NIFTYAUTO"]},
  {s:"ENDURANCE",n:"Endurance Technologies",sec:"Automobile",idx:["NIFTY500","NIFTYAUTO"]},
  {s:"SUNDRMFAST",n:"Sundram Fasteners",sec:"Automobile",idx:["NIFTY500","NIFTYAUTO"]},
  {s:"GABRIEL",n:"Gabriel India Ltd",sec:"Automobile",idx:["NIFTY500","NIFTYAUTO"]},
  {s:"CEATLTD",n:"CEAT Ltd",sec:"Automobile",idx:["NIFTY500","NIFTYAUTO"]},
  {s:"APOLLOTYRE",n:"Apollo Tyres Ltd",sec:"Automobile",idx:["NIFTY200","NIFTY500","NIFTYAUTO"]},
  {s:"GNFC",n:"Gujarat Narmada Fert",sec:"Fertilizer",idx:["NIFTY500","NIFTYCOMMODITIES","NIFTYPSE"]},
  {s:"CHAMBALFER",n:"Chambal Fertilisers",sec:"Fertilizer",idx:["NIFTY500","NIFTYCOMMODITIES"]},
  {s:"DEEPAKFERT",n:"Deepak Fertilisers",sec:"Fertilizer",idx:["NIFTY500"]},
  {s:"RCF",n:"Rashtriya Chemicals",sec:"Fertilizer",idx:["NIFTY500","NIFTYPSE","NIFTYCPSE"]},
  {s:"GSFC",n:"Gujarat State Fert",sec:"Fertilizer",idx:["NIFTY500","NIFTYPSE"]},
  {s:"NFL",n:"National Fertilizers",sec:"Fertilizer",idx:["NIFTY500","NIFTYPSE","NIFTYCPSE"]},
  {s:"ZENSARTECH",n:"Zensar Technologies",sec:"IT",idx:["NIFTY500","NIFTYIT"]},
  {s:"BIRLASOFT",n:"Birlasoft Ltd",sec:"IT",idx:["NIFTY500","NIFTYIT"]},
  {s:"MASTEK",n:"Mastek Ltd",sec:"IT",idx:["NIFTY500","NIFTYIT"]},
  {s:"TANLA",n:"Tanla Platforms Ltd",sec:"IT",idx:["NIFTY500","NIFTYIT","NIFTYDIGITAL"]},
  {s:"ROUTE",n:"Route Mobile Ltd",sec:"IT",idx:["NIFTY500","NIFTYIT","NIFTYDIGITAL"]},
  {s:"CYIENT",n:"Cyient Ltd",sec:"IT",idx:["NIFTY500","NIFTYIT"]},
  {s:"NEWGEN",n:"Newgen Software Tech",sec:"IT",idx:["NIFTY500","NIFTYIT"]},
  {s:"INTELLECT",n:"Intellect Design Arena",sec:"IT",idx:["NIFTY500","NIFTYIT"]},
  {s:"DATAPATTNS",n:"Data Patterns India",sec:"Defence",idx:["NIFTY500","NIFTYDEFENCE"]},
  {s:"GRSE",n:"Garden Reach Shipbuilders",sec:"Defence",idx:["NIFTY500","NIFTYPSE","NIFTYCPSE","NIFTYDEFENCE"]},
  {s:"BEML",n:"BEML Ltd",sec:"Defence",idx:["NIFTY500","NIFTYPSE","NIFTYCPSE","NIFTYDEFENCE"]},
  {s:"MIDHANI",n:"Mishra Dhatu Nigam",sec:"Defence",idx:["NIFTY500","NIFTYPSE","NIFTYCPSE","NIFTYDEFENCE"]},
  {s:"GUJGASLTD",n:"Gujarat Gas Ltd",sec:"Energy",idx:["NIFTY200","NIFTY500","NIFTYENERGY","NIFTYOILANDGAS"]},
  {s:"MGL",n:"Mahanagar Gas Ltd",sec:"Energy",idx:["NIFTY200","NIFTY500","NIFTYENERGY","NIFTYOILANDGAS"]},
  {s:"AEGISCHEM",n:"Aegis Logistics",sec:"Energy",idx:["NIFTY500","NIFTYENERGY","NIFTYOILANDGAS"]},
  {s:"MRPL",n:"MRPL",sec:"Energy",idx:["NIFTY500","NIFTYENERGY","NIFTYOILANDGAS","NIFTYPSE"]},
  {s:"OIL",n:"Oil India Ltd",sec:"Energy",idx:["NIFTY500","NIFTYENERGY","NIFTYOILANDGAS","NIFTYPSE","NIFTYCPSE"]},
  {s:"BRIGADE",n:"Brigade Enterprises",sec:"Realty",idx:["NIFTY200","NIFTY500","NIFTYREALTY"]},
  {s:"SOBHA",n:"Sobha Ltd",sec:"Realty",idx:["NIFTY500","NIFTYREALTY"]},
  {s:"LODHA",n:"Macrotech Developers",sec:"Realty",idx:["NIFTY200","NIFTY500","NIFTYREALTY"]},
  {s:"RAYMOND",n:"Raymond Ltd",sec:"Textiles",idx:["NIFTY500"]},
  {s:"ARVIND",n:"Arvind Ltd",sec:"Textiles",idx:["NIFTY500"]},
  {s:"WELSPUNLIV",n:"Welspun Living Ltd",sec:"Textiles",idx:["NIFTY500"]},
  {s:"TTML",n:"Tata Teleservices Maha",sec:"Telecom",idx:["NIFTY500"]},
  {s:"HATHWAY",n:"Hathway Cable",sec:"Telecom",idx:["NIFTY500"]},
  {s:"TV18BRDCST",n:"TV18 Broadcast",sec:"Media",idx:["NIFTY500","NIFTYMEDIA"]},
  {s:"NETWORK18",n:"Network18 Media",sec:"Media",idx:["NIFTY500","NIFTYMEDIA"]},
  {s:"DISHTV",n:"Dish TV India",sec:"Media",idx:["NIFTY500","NIFTYMEDIA"]},
  {s:"NAZARA",n:"Nazara Technologies",sec:"Media",idx:["NIFTY500","NIFTYMEDIA","NIFTYDIGITAL"]},
  {s:"SJFL",n:"SJS Enterprises",sec:"Consumer",idx:["NIFTY500"]},
  {s:"RELAXO",n:"Relaxo Footwears",sec:"Consumer",idx:["NIFTY500","NIFTYCONSUMPTION"]},
  {s:"VGUARD",n:"V-Guard Industries",sec:"Consumer",idx:["NIFTY500","NIFTYCONSDURABLES"]},
  {s:"BLUESTARLT",n:"Blue Star Ltd",sec:"Consumer",idx:["NIFTY500","NIFTYCONSDURABLES"]},
  {s:"CENTURYTEX",n:"Century Textiles",sec:"Textiles",idx:["NIFTY500"]},
  {s:"JYOTHYLAB",n:"Jyothy Labs Ltd",sec:"FMCG",idx:["NIFTY500","NIFTYFMCG","NIFTYCONSUMPTION"]},
  {s:"RADICO",n:"Radico Khaitan",sec:"FMCG",idx:["NIFTY500","NIFTYFMCG"]},
  {s:"CGCL",n:"Capri Global Capital",sec:"Finance",idx:["NIFTY500","NIFTYFINSERVICE"]},
  {s:"SUNDARMFIN",n:"Sundaram Finance",sec:"Finance",idx:["NIFTY500","NIFTYFINSERVICE"]},
  {s:"PNBHOUSING",n:"PNB Housing Finance",sec:"Finance",idx:["NIFTY500","NIFTYFINSERVICE"]},
  {s:"IIFL",n:"IIFL Finance Ltd",sec:"Finance",idx:["NIFTY500","NIFTYFINSERVICE"]},
  {s:"MOTILALOFS",n:"Motilal Oswal Fin",sec:"Finance",idx:["NIFTY500","NIFTYFINSERVICE"]},
  {s:"FIVESTAR",n:"Five-Star Business Fin",sec:"Finance",idx:["NIFTY500","NIFTYFINSERVICE"]},
  {s:"KALYANKJIL",n:"Kalyan Jewellers",sec:"Consumer",idx:["NIFTY500","NIFTYCONSUMPTION"]},
  {s:"SENCO",n:"Senco Gold Ltd",sec:"Consumer",idx:["NIFTY500"]},
  {s:"CERA",n:"Cera Sanitaryware",sec:"Consumer",idx:["NIFTY500","NIFTYCONSDURABLES"]},
  {s:"ORIENTELEC",n:"Orient Electric",sec:"Consumer",idx:["NIFTY500","NIFTYCONSDURABLES"]},
  {s:"PRINCEPIPE",n:"Prince Pipes",sec:"Infrastructure",idx:["NIFTY500"]},
  {s:"JKPAPER",n:"JK Paper Ltd",sec:"Consumer",idx:["NIFTY500"]},
  {s:"IIFLSEC",n:"IIFL Securities",sec:"Finance",idx:["NIFTY500"]},
  {s:"AMBER",n:"Amber Enterprises",sec:"Consumer",idx:["NIFTY500","NIFTYCONSDURABLES"]},
  {s:"GPPL",n:"Gujarat Pipavav Port",sec:"Infrastructure",idx:["NIFTY500","NIFTYINFRA","NIFTYTRANSPORTATION"]},
  {s:"ALLCARGO",n:"Allcargo Logistics",sec:"Logistics",idx:["NIFTY500","NIFTYTRANSPORTATION"]},
  {s:"TCI",n:"Transport Corp India",sec:"Logistics",idx:["NIFTY500","NIFTYTRANSPORTATION"]},
  {s:"BLUEJET",n:"Blue Jet Healthcare",sec:"Pharma",idx:["NIFTY500","NIFTYPHARMA"]},
  {s:"GLAND",n:"Gland Pharma Ltd",sec:"Pharma",idx:["NIFTY200","NIFTY500","NIFTYPHARMA"]},
  {s:"POLYMED",n:"Poly Medicure Ltd",sec:"Healthcare",idx:["NIFTY500","NIFTYHEALTHCARE"]},
  {s:"RITES",n:"RITES Ltd",sec:"Infrastructure",idx:["NIFTY500","NIFTYPSE","NIFTYCPSE","NIFTYINFRA","NIFTYTRANSPORTATION"]},
  {s:"IRCON",n:"Ircon International",sec:"Infrastructure",idx:["NIFTY500","NIFTYPSE","NIFTYCPSE","NIFTYINFRA"]},
  {s:"NCC",n:"NCC Ltd",sec:"Infrastructure",idx:["NIFTY500","NIFTYINFRA"]},
  {s:"KNR",n:"KNR Constructions",sec:"Infrastructure",idx:["NIFTY500","NIFTYINFRA"]},
  {s:"PNCINFRA",n:"PNC Infratech Ltd",sec:"Infrastructure",idx:["NIFTY500","NIFTYINFRA"]},
  {s:"HEG",n:"HEG Ltd",sec:"Metal",idx:["NIFTY500","NIFTYMETAL"]},
  {s:"WELCORP",n:"Welspun Corp Ltd",sec:"Metal",idx:["NIFTY500","NIFTYMETAL"]},
  {s:"JSWINFRA",n:"JSW Infrastructure",sec:"Infrastructure",idx:["NIFTY200","NIFTY500","NIFTYINFRA","NIFTYTRANSPORTATION"]},
  {s:"LLOYDSME",n:"Lloyds Metals Energy",sec:"Metal",idx:["NIFTY500","NIFTYMETAL"]},
  {s:"AETHER",n:"Aether Industries",sec:"Chemicals",idx:["NIFTY500"]},
  {s:"ANURAS",n:"Anupam Rasayan India",sec:"Chemicals",idx:["NIFTY500"]},
  {s:"LXCHEM",n:"Laxmi Organic Ind",sec:"Chemicals",idx:["NIFTY500"]},
  {s:"ROSSARI",n:"Rossari Biotech",sec:"Chemicals",idx:["NIFTY500"]},
  {s:"PRAJIND",n:"Praj Industries",sec:"Capital Goods",idx:["NIFTY500"]},
  {s:"ELECON",n:"Elecon Engineering",sec:"Capital Goods",idx:["NIFTY500"]},
  {s:"COLTFD",n:"Colt Technology",sec:"IT",idx:["NIFTY500"]},
  {s:"TRITURBINE",n:"Triveni Turbine",sec:"Capital Goods",idx:["NIFTY500"]},
  {s:"AIAENG",n:"AIA Engineering",sec:"Capital Goods",idx:["NIFTY500"]},
  {s:"KALPATPOWR",n:"Kalpataru Projects",sec:"Capital Goods",idx:["NIFTY500","NIFTYINFRA"]},
  {s:"KEC",n:"KEC International",sec:"Capital Goods",idx:["NIFTY500","NIFTYINFRA"]},
  {s:"CARBORUNIV",n:"Carborundum Universal",sec:"Capital Goods",idx:["NIFTY500"]},
  {s:"EIHOTEL",n:"EIH Ltd",sec:"Consumer",idx:["NIFTY500"]},
  {s:"LEMON",n:"Lemon Tree Hotels",sec:"Consumer",idx:["NIFTY500"]},
  {s:"CHALET",n:"Chalet Hotels",sec:"Consumer",idx:["NIFTY500"]},
  {s:"JIFINANCE",n:"Jio Financial Services",sec:"Finance",idx:["NIFTY200","NIFTY500","NIFTYFINSERVICE"]},
  {s:"GICRE",n:"General Insurance Corp",sec:"Insurance",idx:["NIFTY500","NIFTYPSE"]},
  {s:"RPOWER",n:"Reliance Power",sec:"Power",idx:["NIFTY500"]},
  {s:"ADANIENSOL",n:"Adani Energy Solutions",sec:"Power",idx:["NIFTY200","NIFTY500","NIFTYENERGY","NIFTYINFRA"]},
  {s:"CESC",n:"CESC Ltd",sec:"Power",idx:["NIFTY500","NIFTYENERGY"]},
  {s:"JPPOWER",n:"Jaiprakash Power",sec:"Power",idx:["NIFTY500"]},
  {s:"TVSSCS",n:"TVS Supply Chain",sec:"Logistics",idx:["NIFTY500","NIFTYTRANSPORTATION"]},
  {s:"MAHLOG",n:"Mahindra Logistics",sec:"Logistics",idx:["NIFTY500","NIFTYTRANSPORTATION"]},
  {s:"TEJASNET",n:"Tejas Networks",sec:"IT",idx:["NIFTY500"]},
  {s:"CDSL",n:"CDSL",sec:"Finance",idx:["NIFTY500","NIFTYFINSERVICE"]},
  {s:"BSE",n:"BSE Ltd",sec:"Finance",idx:["NIFTY500","NIFTYFINSERVICE"]},
  {s:"CAMS",n:"Computer Age Mgmt",sec:"Finance",idx:["NIFTY500","NIFTYFINSERVICE"]},
  {s:"KFINTECH",n:"KFin Technologies",sec:"Finance",idx:["NIFTY500","NIFTYFINSERVICE"]},
  {s:"ECLERX",n:"eClerx Services Ltd",sec:"IT",idx:[]},
  {s:"FSL",n:"Firstsource Solutions",sec:"IT",idx:[]},
  {s:"DATAMATICS",n:"Datamatics Global Svcs",sec:"IT",idx:[]},
  {s:"CIGNITITEC",n:"Cigniti Technologies",sec:"IT",idx:[]},
  {s:"E2E",n:"E2E Networks Ltd",sec:"IT",idx:[]},
  {s:"AURIONPRO",n:"Aurionpro Solutions",sec:"IT",idx:[]},
  {s:"EXPLEO",n:"Expleo Solutions Ltd",sec:"IT",idx:[]},
  {s:"EMUDHRA",n:"eMudhra Ltd",sec:"IT",idx:[]},
  {s:"GENESYS",n:"Genesys International",sec:"IT",idx:[]},
  {s:"CLEDUCATE",n:"CL Educate Ltd",sec:"IT",idx:[]},
  {s:"ALLDIGI",n:"Alldigi Tech Ltd",sec:"IT",idx:[]},
  {s:"AARTIDRUGS",n:"Aarti Drugs Ltd",sec:"Pharma",idx:[]},
  {s:"BLISSMEDP",n:"Bliss GVS Pharma",sec:"Pharma",idx:[]},
  {s:"FDC",n:"FDC Ltd",sec:"Pharma",idx:[]},
  {s:"CAPLIPOINT",n:"Caplin Point Labs",sec:"Pharma",idx:[]},
  {s:"SOLARA",n:"Solara Active Pharma",sec:"Pharma",idx:[]},
  {s:"ASTEC",n:"Astec LifeSciences",sec:"Pharma",idx:[]},
  {s:"BALPHARMA",n:"Bal Pharma Ltd",sec:"Pharma",idx:[]},
  {s:"ALEMBICLTD",n:"Alembic Ltd",sec:"Pharma",idx:[]},
  {s:"CONCORDBIO",n:"Concord Biotech Ltd",sec:"Pharma",idx:[]},
  {s:"EMCURE",n:"Emcure Pharma Ltd",sec:"Pharma",idx:[]},
  {s:"ARTEMISMED",n:"Artemis Medicare Svcs",sec:"Healthcare",idx:[]},
  {s:"HCG",n:"Healthcare Global Enterp",sec:"Healthcare",idx:[]},
  {s:"ASTERDM",n:"Aster DM Healthcare",sec:"Healthcare",idx:[]},
  {s:"AGARWALEYE",n:"Dr Agarwals Healthcare",sec:"Healthcare",idx:[]},
  {s:"CSBBANK",n:"CSB Bank Ltd",sec:"Banking",idx:[]},
  {s:"DHANBANK",n:"Dhanlaxmi Bank",sec:"Banking",idx:[]},
  {s:"CAPITALSFB",n:"Capital Small Finance Bank",sec:"Banking",idx:[]},
  {s:"ESAFSFB",n:"ESAF Small Finance Bank",sec:"Banking",idx:[]},
  {s:"FINOPB",n:"Fino Payments Bank",sec:"Banking",idx:[]},
  {s:"BAJAJHFL",n:"Bajaj Housing Finance",sec:"Finance",idx:[]},
  {s:"HDBFS",n:"HDB Financial Svcs",sec:"Finance",idx:[]},
  {s:"AAVAS",n:"Aavas Financiers",sec:"Finance",idx:[]},
  {s:"APTUS",n:"Aptus Value Housing",sec:"Finance",idx:[]},
  {s:"CREDITACC",n:"CreditAccess Grameen",sec:"Finance",idx:[]},
  {s:"FUSION",n:"Fusion Finance Ltd",sec:"Finance",idx:[]},
  {s:"ARMANFIN",n:"Arman Financial Svcs",sec:"Finance",idx:[]},
  {s:"ANANDRATHI",n:"Anand Rathi Wealth",sec:"Finance",idx:[]},
  {s:"EDELWEISS",n:"Edelweiss Financial",sec:"Finance",idx:[]},
  {s:"GEOJITFSL",n:"Geojit Financial Svcs",sec:"Finance",idx:[]},
  {s:"ABSLAMC",n:"Aditya Birla Sun Life AMC",sec:"Finance",idx:[]},
  {s:"FEDFINA",n:"Fedbank Financial Svcs",sec:"Finance",idx:[]},
  {s:"CHOICEIN",n:"Choice International",sec:"Finance",idx:[]},
  {s:"EMKAY",n:"Emkay Global Financial",sec:"Finance",idx:[]},
  {s:"CARERATING",n:"CARE Ratings Ltd",sec:"Finance",idx:[]},
  {s:"GODIGIT",n:"Go Digit Insurance",sec:"Insurance",idx:[]},
  {s:"CANHLIFE",n:"Canara HSBC Life Ins",sec:"Insurance",idx:[]},
  {s:"CELLO",n:"Cello World Ltd",sec:"Consumer",idx:[]},
  {s:"BIKAJI",n:"Bikaji Foods Intl",sec:"Consumer",idx:[]},
  {s:"DODLA",n:"Dodla Dairy Ltd",sec:"Consumer",idx:[]},
  {s:"HATSUN",n:"Hatsun Agro Product",sec:"Consumer",idx:[]},
  {s:"DOMS",n:"DOMS Industries Ltd",sec:"Consumer",idx:[]},
  {s:"FLAIR",n:"Flair Writing Industries",sec:"Consumer",idx:[]},
  {s:"ETHOSLTD",n:"Ethos Ltd",sec:"Consumer",idx:[]},
  {s:"GOPAL",n:"Gopal Snacks Ltd",sec:"Consumer",idx:[]},
  {s:"BECTORFOOD",n:"Mrs Bectors Food Sp",sec:"Consumer",idx:[]},
  {s:"BLUESTONE",n:"BlueStone Jewellery",sec:"Consumer",idx:[]},
  {s:"CCL",n:"CCL Products India",sec:"Consumer",idx:[]},
  {s:"CANTABIL",n:"Cantabil Retail India",sec:"Consumer",idx:[]},
  {s:"DOLLAR",n:"Dollar Industries",sec:"Consumer",idx:[]},
  {s:"BLUESTARCO",n:"Blue Star Ltd",sec:"Consumer",idx:[]},
  {s:"BUTTERFLY",n:"Butterfly Gandhimathi",sec:"Consumer",idx:[]},
  {s:"EUREKAFORB",n:"Eureka Forbes Ltd",sec:"Consumer",idx:[]},
  {s:"BAJAJCON",n:"Bajaj Consumer Care",sec:"FMCG",idx:[]},
  {s:"GODFRYPHLP",n:"Godfrey Phillips India",sec:"FMCG",idx:[]},
  {s:"GLOBUSSPR",n:"Globus Spirits Ltd",sec:"FMCG",idx:[]},
  {s:"AVANTIFEED",n:"Avanti Feeds Ltd",sec:"FMCG",idx:[]},
  {s:"HERITGFOOD",n:"Heritage Foods Ltd",sec:"FMCG",idx:[]},
  {s:"CRAFTSMAN",n:"Craftsman Automation",sec:"Automobile",idx:[]},
  {s:"FIEMIND",n:"Fiem Industries Ltd",sec:"Automobile",idx:[]},
  {s:"ASAHIINDIA",n:"Asahi India Glass",sec:"Automobile",idx:[]},
  {s:"AUTOAXLES",n:"Automotive Axles",sec:"Automobile",idx:[]},
  {s:"FORCEMOT",n:"Force Motors Ltd",sec:"Automobile",idx:[]},
  {s:"ASKAUTOLTD",n:"ASK Automotive",sec:"Automobile",idx:[]},
  {s:"CIEINDIA",n:"CIE Automotive India",sec:"Automobile",idx:[]},
  {s:"GNA",n:"GNA Axles Ltd",sec:"Automobile",idx:[]},
  {s:"HAPPYFORGE",n:"Happy Forgings Ltd",sec:"Automobile",idx:[]},
  {s:"ATULAUTO",n:"Atul Auto Ltd",sec:"Automobile",idx:[]},
  {s:"GREAVESCOT",n:"Greaves Cotton Ltd",sec:"Automobile",idx:[]},
  {s:"ALICON",n:"Alicon Castalloy",sec:"Automobile",idx:[]},
  {s:"EXICOM",n:"Exicom Tele-Systems",sec:"Automobile",idx:[]},
  {s:"AEGISLOG",n:"Aegis Logistics Ltd",sec:"Energy",idx:[]},
  {s:"CHENNPETRO",n:"Chennai Petroleum",sec:"Energy",idx:[]},
  {s:"DEEPINDS",n:"Deep Industries Ltd",sec:"Energy",idx:[]},
  {s:"GULFOILLUB",n:"Gulf Oil Lubricants",sec:"Energy",idx:[]},
  {s:"ATGL",n:"Adani Total Gas",sec:"Energy",idx:[]},
  {s:"GIPCL",n:"Gujarat Industries Power",sec:"Power",idx:[]},
  {s:"ELECTCAST",n:"Electrosteel Castings",sec:"Metal",idx:[]},
  {s:"GPIL",n:"Godawari Power Ispat",sec:"Metal",idx:[]},
  {s:"GRAPHITE",n:"Graphite India Ltd",sec:"Metal",idx:[]},
  {s:"GRAVITA",n:"Gravita India Ltd",sec:"Metal",idx:[]},
  {s:"GALLANTT",n:"Gallantt Ispat Ltd",sec:"Metal",idx:[]},
  {s:"GOODLUCK",n:"Goodluck India Ltd",sec:"Metal",idx:[]},
  {s:"HEIDELBERG",n:"HeidelbergCement India",sec:"Cement",idx:[]},
  {s:"BIRLACORPN",n:"Birla Corporation",sec:"Cement",idx:[]},
  {s:"DECCANCEM",n:"Deccan Cements",sec:"Cement",idx:[]},
  {s:"GHCL",n:"GHCL Ltd",sec:"Chemicals",idx:[]},
  {s:"BODALCHEM",n:"Bodal Chemicals",sec:"Chemicals",idx:[]},
  {s:"FAIRCHEM",n:"Fairchem Organics",sec:"Chemicals",idx:[]},
  {s:"CHEMCON",n:"Chemcon Speciality",sec:"Chemicals",idx:[]},
  {s:"EPIGRAL",n:"Epigral Ltd",sec:"Chemicals",idx:[]},
  {s:"APCOTEXIND",n:"Apcotex Industries",sec:"Chemicals",idx:[]},
  {s:"BALAMINES",n:"Balaji Amines",sec:"Chemicals",idx:[]},
  {s:"BHAGCHEM",n:"Bhagiradha Chemicals",sec:"Chemicals",idx:[]},
  {s:"AKSHARCHEM",n:"AksharChem India",sec:"Chemicals",idx:[]},
  {s:"DMCC",n:"DMCC Speciality Chem",sec:"Chemicals",idx:[]},
  {s:"COSMO",n:"Cosmo First Ltd",sec:"Chemicals",idx:[]},
  {s:"ASHOKA",n:"Ashoka Buildcon",sec:"Infrastructure",idx:[]},
  {s:"DBL",n:"Dilip Buildcon Ltd",sec:"Infrastructure",idx:[]},
  {s:"CAPACITE",n:"Capacite Infraprojects",sec:"Infrastructure",idx:[]},
  {s:"GRINFRA",n:"G R Infraprojects",sec:"Infrastructure",idx:[]},
  {s:"AFCONS",n:"Afcons Infrastructure",sec:"Infrastructure",idx:[]},
  {s:"CEIGALL",n:"Ceigall India Ltd",sec:"Infrastructure",idx:[]},
  {s:"AHLUCONT",n:"Ahluwalia Contracts",sec:"Infrastructure",idx:[]},
  {s:"ANANTRAJ",n:"Anant Raj Ltd",sec:"Realty",idx:[]},
  {s:"ASHIANA",n:"Ashiana Housing",sec:"Realty",idx:[]},
  {s:"AJMERA",n:"Ajmera Realty",sec:"Realty",idx:[]},
  {s:"ARKADE",n:"Arkade Developers",sec:"Realty",idx:[]},
  {s:"ACE",n:"Action Construction Equip",sec:"Capital Goods",idx:[]},
  {s:"APARINDS",n:"Apar Industries",sec:"Capital Goods",idx:[]},
  {s:"ELGIEQUIP",n:"Elgi Equipments",sec:"Capital Goods",idx:[]},
  {s:"ESABINDIA",n:"Esab India Ltd",sec:"Capital Goods",idx:[]},
  {s:"GMMPFAUDLR",n:"GMM Pfaudler",sec:"Capital Goods",idx:[]},
  {s:"ANUP",n:"The Anup Engineering",sec:"Capital Goods",idx:[]},
  {s:"CENTUM",n:"Centum Electronics",sec:"Capital Goods",idx:[]},
  {s:"DYNAMATECH",n:"Dynamatic Technologies",sec:"Capital Goods",idx:[]},
  {s:"DCXINDIA",n:"DCX Systems Ltd",sec:"Capital Goods",idx:[]},
  {s:"DIVGIITTS",n:"Divgi TorqTransfer",sec:"Capital Goods",idx:[]},
  {s:"ASTRAZENECA",n:"AstraZeneca Pharma",sec:"Capital Goods",idx:[]},
  {s:"ASTRAMICRO",n:"Astra Microwave",sec:"Defence",idx:[]},
  {s:"APOLLO",n:"Apollo Micro Systems",sec:"Defence",idx:[]},
  {s:"GTPL",n:"GTPL Hathway",sec:"Telecom",idx:[]},
  {s:"DEN",n:"Den Networks",sec:"Telecom",idx:[]},
  {s:"BHARTIHEXA",n:"Bharti Hexacom",sec:"Telecom",idx:[]},
  {s:"DBCORP",n:"D.B.Corp Ltd",sec:"Media",idx:[]},
  {s:"DGCONTENT",n:"Digicontent Ltd",sec:"Media",idx:[]},
  {s:"ENIL",n:"Entertainment Network",sec:"Media",idx:[]},
  {s:"BLUEDART",n:"Blue Dart Express",sec:"Logistics",idx:[]},
  {s:"GATEWAY",n:"Gateway Distriparks",sec:"Logistics",idx:[]},
  {s:"ATL",n:"Allcargo Terminals",sec:"Logistics",idx:[]},
  {s:"AVG",n:"AVG Logistics Ltd",sec:"Logistics",idx:[]},
  {s:"GOKEX",n:"Gokaldas Exports",sec:"Textiles",idx:[]},
  {s:"ARVINDFASN",n:"Arvind Fashions",sec:"Textiles",idx:[]},
  {s:"AMBIKCO",n:"Ambika Cotton Mills",sec:"Textiles",idx:[]},
  {s:"FILATEX",n:"Filatex India",sec:"Textiles",idx:[]},
  {s:"DONEAR",n:"Donear Industries",sec:"Textiles",idx:[]},
  {s:"BANSWRAS",n:"Banswara Syntex",sec:"Textiles",idx:[]},
  {s:"BALRAMCHIN",n:"Balrampur Chini Mills",sec:"Sugar",idx:[]},
  {s:"DHAMPSUG",n:"Dhampur Sugar Mills",sec:"Sugar",idx:[]},
  {s:"DALMIASUG",n:"Dalmia Bharat Sugar",sec:"Sugar",idx:[]},
  {s:"DWARKESH",n:"Dwarikesh Sugar",sec:"Sugar",idx:[]},
  {s:"BANARISUG",n:"Bannari Amman Sugars",sec:"Sugar",idx:[]},
  {s:"AVADHSUGAR",n:"Avadh Sugar Energy",sec:"Sugar",idx:[]},
  {s:"BAJAJHIND",n:"Bajaj Hindusthan Sugar",sec:"Sugar",idx:[]},
  {s:"ANDHRAPER",n:"Andhra Paper Ltd",sec:"Paper",idx:[]},
  {s:"EPL",n:"EPL Ltd",sec:"Paper",idx:[]},
  {s:"CENTURYPLY",n:"Century Plyboards",sec:"Paper",idx:[]},
  {s:"GREENPLY",n:"Greenply Industries",sec:"Paper",idx:[]},
  {s:"GREENLAM",n:"Greenlam Industries",sec:"Paper",idx:[]},
  {s:"GREENPANEL",n:"Greenpanel Industries",sec:"Paper",idx:[]},
  {s:"ARCHIDPLY",n:"Archidply Industries",sec:"Paper",idx:[]},
  {s:"LEMONTRE",n:"Lemon Tree Hotels",sec:"Hospitality",idx:[]},
  {s:"GREENPOWER",n:"Orient Green Power",sec:"Power",idx:[]},
  {s:"AWHCL",n:"Antony Waste Handling",sec:"Infrastructure",idx:[]},
  {s:"DREAMFOLKS",n:"Dreamfolks Services",sec:"Consumer",idx:[]},
  {s:"CMSINFO",n:"CMS Info Systems",sec:"IT",idx:[]},
  {s:"AVALON",n:"Avalon Technologies",sec:"IT",idx:[]},
  {s:"BLS",n:"BLS International",sec:"Consumer",idx:[]},
  {s:"EPACK",n:"EPACK Durable",sec:"Consumer",idx:[]},
  {s:"EMIL",n:"Electronics Mart India",sec:"Consumer",idx:[]},
  {s:"GOLDIAM",n:"Goldiam International",sec:"Consumer",idx:[]},
  {s:"HARSHA",n:"Harsha Engineers Intl",sec:"Capital Goods",idx:[]},
  {s:"CONTROLPR",n:"Control Print",sec:"Capital Goods",idx:[]},
  {s:"GARFIBRES",n:"Garware Technical Fibres",sec:"Textiles",idx:[]},
  {s:"GRWRHITECH",n:"Garware Hi-Tech Films",sec:"Chemicals",idx:[]},
  {s:"ADFFOODS",n:"ADF Foods Ltd",sec:"FMCG",idx:[]},
  {s:"APEX",n:"Apex Frozen Foods",sec:"FMCG",idx:[]},
  {s:"BANCOINDIA",n:"Banco Products",sec:"Automobile",idx:[]},
  {s:"BEPL",n:"Bhansali Engg Polymers",sec:"Chemicals",idx:[]},
  {s:"BOROSCI",n:"Borosil Scientific",sec:"Consumer",idx:[]},
  {s:"BOROLTD",n:"Borosil Ltd",sec:"Consumer",idx:[]},
  {s:"CAMLINFINE",n:"Camlin Fine Sciences",sec:"Chemicals",idx:[]},
  {s:"CORDSCABLE",n:"Cords Cable Industries",sec:"Capital Goods",idx:[]},
  {s:"EIMCOELECO",n:"Eimco Elecon India",sec:"Capital Goods",idx:[]},
  {s:"EVERESTIND",n:"Everest Industries",sec:"Infrastructure",idx:[]},
  {s:"EXCELINDUS",n:"Excel Industries",sec:"Chemicals",idx:[]},
  {s:"FOSECOIND",n:"Foseco India",sec:"Capital Goods",idx:[]},
  {s:"GANESHHOU",n:"Ganesh Housing",sec:"Realty",idx:[]},
  {s:"GICHSGFIN",n:"GIC Housing Finance",sec:"Finance",idx:[]},
  {s:"GMDCLTD",n:"Gujarat Mineral Dev",sec:"Metal",idx:[]},
  {s:"GUJALKALI",n:"Gujarat Alkalies",sec:"Chemicals",idx:[]},
  {s:"EIDPARRY",n:"EID Parry India",sec:"FMCG",idx:[]},
  {s:"DCMSHRIRAM",n:"DCM Shriram Ltd",sec:"Chemicals",idx:[]},
  {s:"DCMSRIND",n:"DCM Shriram Industries",sec:"Chemicals",idx:[]},
  {s:"ACEMINTEG",n:"Ace Integrated Sol",sec:"IT",idx:[]},
  {s:"ABREL",n:"Aditya Birla Real Estate",sec:"Realty",idx:[]},
  {s:"ABLBL",n:"Aditya Birla Lifestyle",sec:"Textiles",idx:[]},
  {s:"ACMESOLAR",n:"Acme Solar Holdings",sec:"Energy",idx:[]},
  {s:"ACI",n:"Archean Chemical Ind",sec:"Chemicals",idx:[]},
  {s:"360ONE",n:"360 ONE WAM Ltd",sec:"Finance",idx:[]},
  {s:"5PAISA",n:"5Paisa Capital",sec:"Finance",idx:[]},
  {s:"AWL",n:"AWL Agri Business",sec:"FMCG",idx:[]},
  {s:"AWFIS",n:"Awfis Space Solutions",sec:"Consumer",idx:[]},
  {s:"BLACKBUCK",n:"Blackbuck Ltd",sec:"Logistics",idx:[]},
  {s:"GROWW",n:"Billionbrains Garage",sec:"Finance",idx:[]},
  {s:"FIRSTCRY",n:"Brainbees Solutions",sec:"Consumer",idx:[]},
  {s:"ETERNAL",n:"Eternal Ltd",sec:"Consumer",idx:[]},
  {s:"AXISCADES",n:"Axiscades Technologies",sec:"IT",idx:[]},
  {s:"APTECHT",n:"Aptech Ltd",sec:"IT",idx:[]},
  {s:"CALSOFT",n:"California Software",sec:"IT",idx:[]},
  {s:"COMPUSOFT",n:"Compucom Software",sec:"IT",idx:[]},
  {s:"DEVIT",n:"Dev Information Tech",sec:"IT",idx:[]},
  {s:"FCSSOFT",n:"FCS Software Solutions",sec:"IT",idx:[]},
  {s:"SONATA",n:"Sonata Software",sec:"IT",idx:[]},
  {s:"SIFY",n:"Sify Technologies",sec:"IT",idx:[]},
  {s:"ONMOBILE",n:"OnMobile Global",sec:"IT",idx:[]},
  {s:"ORIENTTECH",n:"Orient Technologies",sec:"IT",idx:[]},
  {s:"DELTACORP",n:"Delta Corp",sec:"IT",idx:[]},
  {s:"NUCLEUS",n:"Nucleus Software",sec:"IT",idx:[]},
  {s:"SAREGAMA",n:"Saregama India",sec:"Media",idx:[]},
  {s:"BALAJITELE",n:"Balaji Telefilms",sec:"Media",idx:[]},
  {s:"SUDARSCHEM",n:"Sudarshan Chemical",sec:"Chemicals",idx:[]},
  {s:"ANUHPHR",n:"Anuh Pharma",sec:"Pharma",idx:[]},
  {s:"MARKSANS",n:"Marksans Pharma",sec:"Pharma",idx:[]},
  {s:"INDOCO",n:"Indoco Remedies",sec:"Pharma",idx:[]},
  {s:"GLORYCHEM",n:"Glory Chemicals",sec:"Chemicals",idx:[]},
  {s:"LASA",n:"Lasa Supergenerics",sec:"Pharma",idx:[]},
  {s:"SHILPAMED",n:"Shilpa Medicare",sec:"Pharma",idx:[]},
  {s:"PANACEA",n:"Panacea Biotec",sec:"Pharma",idx:[]},
  {s:"SEQUENT",n:"Sequent Scientific",sec:"Pharma",idx:[]},
  {s:"WOCKPHARMA",n:"Wockhardt Ltd",sec:"Pharma",idx:[]},
  {s:"RPTECH",n:"Rapid Pharmacy Tech",sec:"Pharma",idx:[]},
  {s:"WINDLAS",n:"Windlas Biotech",sec:"Pharma",idx:[]},
  {s:"VIJAYA",n:"Vijaya Diagnostic",sec:"Healthcare",idx:[]},
  {s:"KARURVYSYA",n:"Karur Vysya Bank",sec:"Banking",idx:[]},
  {s:"JKBANK",n:"Jammu & Kashmir Bank",sec:"Banking",idx:[]},
  {s:"NATHBIOGEN",n:"Nath Bio-Genes",sec:"FMCG",idx:[]},
  {s:"SWARAJENG",n:"Swaraj Engines",sec:"Automobile",idx:[]},
  {s:"JMFINANCIL",n:"JM Financial",sec:"Finance",idx:[]},
  {s:"IFBIND",n:"IFB Industries",sec:"Consumer",idx:[]},
  {s:"WONDERLA",n:"Wonderla Holidays",sec:"Consumer",idx:[]},
  {s:"SHOPERSTOP",n:"Shoppers Stop",sec:"Consumer",idx:[]},
  {s:"BARBEQUE",n:"Barbeque Nation",sec:"Consumer",idx:[]},
  {s:"TINPLATE",n:"Tinplate Company India",sec:"Metal",idx:[]},
  {s:"THOMASCOOK",n:"Thomas Cook India",sec:"Consumer",idx:[]},
  {s:"MAHLIFE",n:"Mahindra Lifespace",sec:"Realty",idx:[]},
  {s:"SUNTECK",n:"Sunteck Realty",sec:"Realty",idx:[]},
  {s:"PURVA",n:"Puravankara Ltd",sec:"Realty",idx:[]},
  {s:"KOLTEPATIL",n:"Kolte-Patil Developers",sec:"Realty",idx:[]},
  {s:"KEYSTONE",n:"Keystone Realtors",sec:"Realty",idx:[]},
  {s:"BOMDYEING",n:"Bombay Dyeing",sec:"Textiles",idx:[]},
  {s:"GTLINFRA",n:"GTL Infrastructure",sec:"Telecom",idx:[]},
  {s:"BBTC",n:"Bombay Burmah Trading",sec:"Consumer",idx:[]},
  {s:"BAJAJHLDNG",n:"Bajaj Holdings",sec:"Finance",idx:[]},
  {s:"VOLTAMP",n:"Voltamp Transformers",sec:"Capital Goods",idx:[]},
  {s:"TRIVENI",n:"Triveni Engineering",sec:"Sugar",idx:[]},
  {s:"TITAGARH",n:"Titagarh Rail",sec:"Capital Goods",idx:[]},
  {s:"SUPRAJIT",n:"Suprajit Engineering",sec:"Automobile",idx:[]},
  {s:"SHYAMMETL",n:"Shyam Metalics",sec:"Metal",idx:[]},
  {s:"SARDAEN",n:"Sarda Energy",sec:"Metal",idx:[]},
  {s:"ORIENTCEM",n:"Orient Cement",sec:"Cement",idx:[]},
  {s:"ORIENTREF",n:"Orient Refractories",sec:"Capital Goods",idx:[]},
  {s:"NRBBEARING",n:"NRB Bearings",sec:"Automobile",idx:[]},
  {s:"MAITHANALL",n:"Maithan Alloys",sec:"Metal",idx:[]},
  {s:"KENNAMET",n:"Kennametal India",sec:"Capital Goods",idx:[]},
  {s:"JAMNAAUTO",n:"Jamna Auto",sec:"Automobile",idx:[]},
  {s:"HINDWAREAP",n:"Hindware Home",sec:"Consumer",idx:[]},
  {s:"HITECHCORP",n:"Hi-Tech Pipes",sec:"Infrastructure",idx:[]},
  {s:"GLS",n:"GLS Pharma",sec:"Pharma",idx:[]},
  {s:"FMGOETZE",n:"Federal-Mogul Goetze",sec:"Automobile",idx:[]},
  {s:"DYCL",n:"Dynamic Cables",sec:"Capital Goods",idx:[]},
  {s:"DCAL",n:"Dishman Carbogen",sec:"Chemicals",idx:[]},
  {s:"AGROPHOS",n:"Agro Phos India",sec:"Fertilizer",idx:[]},
  {s:"AMRUTANJAN",n:"Amrutanjan Health",sec:"FMCG",idx:[]},
  {s:"BAJAJHCARE",n:"Bajaj Healthcare",sec:"Pharma",idx:[]},
  {s:"BAJAJELEC",n:"Bajaj Electricals",sec:"Consumer",idx:[]},
  {s:"BCLIND",n:"Bcl Industries",sec:"FMCG",idx:[]},
  {s:"BINDALAGRO",n:"Bindal Agro Chem",sec:"Chemicals",idx:[]},
  {s:"BHARAT",n:"Bharat Rasayan",sec:"Chemicals",idx:[]},
  {s:"CENTEXT",n:"Century Extrusions",sec:"Metal",idx:[]},
  {s:"CHEVIOT",n:"Cheviot Company",sec:"Textiles",idx:[]},
  {s:"CUPID",n:"Cupid Ltd",sec:"Consumer",idx:[]},
  {s:"DIAMONDYD",n:"Prataap Snacks",sec:"FMCG",idx:[]},
  {s:"GANESHBE",n:"Ganesh Benzoplast",sec:"Chemicals",idx:[]},
  {s:"GAEL",n:"Gujarat Ambuja Exports",sec:"FMCG",idx:[]},
  {s:"HBLENGINE",n:"HBL Engineering",sec:"Capital Goods",idx:[]},
  {s:"DILIPBLDCON",n:"Dilip Buildcon",sec:"Infrastructure",idx:[]},
  {s:"GPTINFRA",n:"GPT Infraprojects",sec:"Infrastructure",idx:[]},
  {s:"HERITFOOD",n:"Heritage Foods",sec:"FMCG",idx:[]},
  {s:"INDIGOPNTS",n:"Indigo Paints",sec:"Consumer",idx:[]},
  {s:"JPASSOCIAT",n:"Jaiprakash Associates",sec:"Infrastructure",idx:[]},
  {s:"KRBL",n:"KRBL Ltd",sec:"FMCG",idx:[]},
  {s:"LAXMIMACH",n:"Lakshmi Machine Works",sec:"Capital Goods",idx:[]},
  {s:"MAPMYINDIA",n:"CE Info Systems",sec:"IT",idx:[]},
  {s:"MAXVIL",n:"Max Ventures",sec:"Realty",idx:[]},
  {s:"MIRZAINT",n:"Mirza International",sec:"Consumer",idx:[]},
  {s:"MOLDTECH",n:"Mold-Tek Technologies",sec:"IT",idx:[]},
  {s:"MOREPENLAB",n:"Morepen Laboratories",sec:"Pharma",idx:[]},
  {s:"MSTCLTD",n:"MSTC Ltd",sec:"Infrastructure",idx:[]},
  {s:"NACLIND",n:"NACL Industries",sec:"Chemicals",idx:[]},
  {s:"ORIENTPPR",n:"Orient Paper",sec:"Paper",idx:[]},
  {s:"OSWALGREEN",n:"Oswal Greentech",sec:"Textiles",idx:[]},
  {s:"PANACEABIO",n:"Panacea Biotec",sec:"Pharma",idx:[]},
  {s:"PARAGMILK",n:"Parag Milk Foods",sec:"FMCG",idx:[]},
  {s:"PCBL",n:"PCBL Ltd",sec:"Chemicals",idx:[]},
  {s:"PENIND",n:"Pennar Industries",sec:"Metal",idx:[]},
  {s:"PRECAM",n:"Precision Camshafts",sec:"Automobile",idx:[]},
  {s:"PRIMESECU",n:"Prime Securities",sec:"Finance",idx:[]},
  {s:"PRSMJOHNSN",n:"Prism Johnson",sec:"Cement",idx:[]},
  {s:"QUESS",n:"Quess Corp",sec:"IT",idx:[]},
  {s:"RELIGARE",n:"Religare Enterprises",sec:"Finance",idx:[]},
  {s:"REPCOHOME",n:"Repco Home Finance",sec:"Finance",idx:[]},
  {s:"RPGLIFE",n:"RPG Life Sciences",sec:"Pharma",idx:[]},
  {s:"RSWM",n:"RSWM Ltd",sec:"Textiles",idx:[]},
  {s:"SAGCEM",n:"Sagar Cements",sec:"Cement",idx:[]},
  {s:"SAKAR",n:"Sakar Healthcare",sec:"Pharma",idx:[]},
  {s:"SALASAR",n:"Salasar Techno",sec:"Infrastructure",idx:[]},
  {s:"SANDUMA",n:"Sandur Manganese",sec:"Metal",idx:[]},
  {s:"SANGHVIMOV",n:"Sanghvi Movers",sec:"Capital Goods",idx:[]},
  {s:"SATIN",n:"Satin Creditcare",sec:"Finance",idx:[]},
  {s:"SHANKARA",n:"Shankara Building",sec:"Infrastructure",idx:[]},
  {s:"SHARDACROP",n:"Sharda Cropchem",sec:"Chemicals",idx:[]},
  {s:"SHAREINDIA",n:"Share India Sec",sec:"Finance",idx:[]},
  {s:"SHILCHAR",n:"Shilchar Technologies",sec:"Capital Goods",idx:[]},
  {s:"SIGACHI",n:"Sigachi Industries",sec:"Pharma",idx:[]},
  {s:"SKIPPER",n:"Skipper Ltd",sec:"Capital Goods",idx:[]},
  {s:"SNOWMAN",n:"Snowman Logistics",sec:"Logistics",idx:[]},
  {s:"SOTL",n:"Savita Oil Technologies",sec:"Energy",idx:[]},
  {s:"SPARC",n:"Sun Pharma Advanced",sec:"Pharma",idx:[]},
  {s:"SPANDANA",n:"Spandana Sphoorty",sec:"Finance",idx:[]},
  {s:"STLTECH",n:"Sterlite Technologies",sec:"Telecom",idx:[]},
  {s:"STYRENIX",n:"Styrenix Performance",sec:"Chemicals",idx:[]},
  {s:"SUBROS",n:"Subros Ltd",sec:"Automobile",idx:[]},
  {s:"SUPRIYA",n:"Supriya Lifescience",sec:"Pharma",idx:[]},
  {s:"SWSOLAR",n:"Sterling & Wilson Solar",sec:"Energy",idx:[]},
  {s:"SYMPHONY",n:"Symphony Ltd",sec:"Consumer",idx:[]},
  {s:"TARSONS",n:"Tarsons Products",sec:"Healthcare",idx:[]},
  {s:"TASTYBITE",n:"Tasty Bite Eatables",sec:"FMCG",idx:[]},
  {s:"TCNSBRANDS",n:"TCNS Clothing",sec:"Textiles",idx:[]},
  {s:"TDPOWERSYS",n:"TD Power Systems",sec:"Capital Goods",idx:[]},
  {s:"TEAMLEASE",n:"TeamLease Services",sec:"IT",idx:[]},
  {s:"THANGAMAYL",n:"Thangamayil Jewellery",sec:"Consumer",idx:[]},
  {s:"THYROCARE",n:"Thyrocare Technologies",sec:"Healthcare",idx:[]},
  {s:"TIMETECH",n:"Time Technoplast",sec:"Infrastructure",idx:[]},
  {s:"TIMETECHNO",n:"Time Technoplast",sec:"Infrastructure",idx:[]},
  {s:"TRACXN",n:"Tracxn Technologies",sec:"IT",idx:[]},
  {s:"TRIL",n:"Transformers & Rectifiers",sec:"Capital Goods",idx:[]},
  {s:"UNICHEMLAB",n:"Unichem Laboratories",sec:"Pharma",idx:[]},
  {s:"VAIBHAVGBL",n:"Vaibhav Global",sec:"Consumer",idx:[]},
  {s:"VALIANTORG",n:"Valiant Organics",sec:"Chemicals",idx:[]},
  {s:"VARROC",n:"Varroc Engineering",sec:"Automobile",idx:[]},
  {s:"VENKEYS",n:"Venky's India",sec:"FMCG",idx:[]},
  {s:"VESUVIUS",n:"Vesuvius India",sec:"Capital Goods",idx:[]},
  {s:"VIPIND",n:"VIP Industries",sec:"Consumer",idx:[]},
  {s:"VISAKAIND",n:"Visaka Industries",sec:"Infrastructure",idx:[]},
  {s:"VISHNU",n:"Vishnu Chemicals",sec:"Chemicals",idx:[]},
  {s:"VSTIND",n:"VST Industries",sec:"FMCG",idx:[]},
  {s:"VSTILLERS",n:"VST Tillers",sec:"Automobile",idx:[]},
  {s:"WABAG",n:"VA Tech Wabag",sec:"Infrastructure",idx:[]},
  {s:"WABCOINDIA",n:"ZF Commercial",sec:"Automobile",idx:[]},
  {s:"WAAREEENER",n:"Waaree Energies",sec:"Energy",idx:[]},
  {s:"WSTCSTPAPR",n:"West Coast Paper",sec:"Paper",idx:[]},
  {s:"ZFCVINDIA",n:"ZF Commercial Veh",sec:"Automobile",idx:[]},
  {s:"ZENTECH",n:"Zen Technologies",sec:"Defence",idx:[]},
  {s:"ZODIACCLTH",n:"Zodiac Clothing",sec:"Textiles",idx:[]},
  {s:"ZUARI",n:"Zuari Agro Chemicals",sec:"Fertilizer",idx:[]},
  {s:"ZUARIIND",n:"Zuari Industries",sec:"Fertilizer",idx:[]},
  {s:"20MICRONS",n:"20 Microns Ltd",sec:"Chemicals",idx:[]},
  {s:"3IINFOLTD",n:"3i Infotech",sec:"IT",idx:[]},
  {s:"63MOONS",n:"63 Moons Technologies",sec:"IT",idx:[]},
  {s:"A2ZINFRA",n:"A2Z Infra Engineering",sec:"Infrastructure",idx:[]},
  {s:"AADHARHFC",n:"Aadhar Housing Finance",sec:"Finance",idx:[]},
  {s:"AAKASH",n:"Aakash Exploration",sec:"Energy",idx:[]},
  {s:"AAREYDRUGS",n:"Aarey Drugs & Pharma",sec:"Pharma",idx:[]},
  {s:"AARTECH",n:"Aartech Solonics",sec:"Capital Goods",idx:[]},
  {s:"AARTIPHARM",n:"Aarti Pharmalabs",sec:"Pharma",idx:[]},
  {s:"AARTISURF",n:"Aarti Surfactants",sec:"Chemicals",idx:[]},
  {s:"AARVI",n:"Aarvi Encon",sec:"Energy",idx:[]},
  {s:"ABAN",n:"Aban Offshore",sec:"Energy",idx:[]},
  {s:"ABBOTINDIA",n:"Abbott India",sec:"Pharma",idx:[]},
  {s:"ABCOTS",n:"A B Cotspin India",sec:"Textiles",idx:[]},
  {s:"ABDL",n:"Allied Blenders Dist",sec:"FMCG",idx:[]},
  {s:"ABINFRA",n:"A B Infrabuild",sec:"Infrastructure",idx:[]},
  {s:"ABMINTLLTD",n:"ABM International",sec:"Textiles",idx:[]},
  {s:"ACCELYA",n:"Accelya Solutions India",sec:"IT",idx:[]},
  {s:"ACCURACY",n:"Accuracy Shipping",sec:"Logistics",idx:[]},
  {s:"ACL",n:"Andhra Cements",sec:"Cement",idx:[]},
  {s:"ADSL",n:"Allied Digital Services",sec:"IT",idx:[]},
  {s:"ADVANIHOTR",n:"Advani Hotels & Resorts",sec:"Hospitality",idx:[]},
  {s:"ADVENZYMES",n:"Advanced Enzyme Tech",sec:"Pharma",idx:[]},
  {s:"AEGISVOPAK",n:"Aegis Vopak Terminals",sec:"Energy",idx:[]},
  {s:"AEQUS",n:"Aequs Ltd",sec:"Capital Goods",idx:[]},
  {s:"AEROENTER",n:"Aeroflex Enterprises",sec:"Capital Goods",idx:[]},
  {s:"AEROFLEX",n:"Aeroflex Industries",sec:"Capital Goods",idx:[]},
  {s:"AGSTRA",n:"AGS Transact Tech",sec:"IT",idx:[]},
  {s:"AHCL",n:"Anlon Healthcare",sec:"Pharma",idx:[]},
  {s:"AHLADA",n:"Ahlada Engineers",sec:"Capital Goods",idx:[]},
  {s:"AHLEAST",n:"Asian Hotels East",sec:"Hospitality",idx:[]},
  {s:"AIRAN",n:"Airan Ltd",sec:"IT",idx:[]},
  {s:"AIROLAM",n:"Airo Lam",sec:"Paper",idx:[]},
  {s:"AJAXENGG",n:"Ajax Engineering",sec:"Capital Goods",idx:[]},
  {s:"AKSHOPTFBR",n:"Aksh Optifibre",sec:"Telecom",idx:[]},
  {s:"AKUMS",n:"Akums Drugs Pharma",sec:"Pharma",idx:[]},
  {s:"AKZOINDIA",n:"Akzo Nobel India",sec:"Chemicals",idx:[]},
  {s:"ALANKIT",n:"Alankit Ltd",sec:"Finance",idx:[]},
  {s:"ALBERTDAVD",n:"Albert David",sec:"Pharma",idx:[]},
  {s:"ASMS",n:"Bartronics India",sec:"IT",idx:[]},
  {s:"ASPINWALL",n:"Aspinwall & Company",sec:"Consumer",idx:[]},
  {s:"AUTOIND",n:"Autoline Industries",sec:"Automobile",idx:[]},
  {s:"AVL",n:"Aditya Vision",sec:"Consumer",idx:[]},
  {s:"AVTNPL",n:"AVT Natural Products",sec:"Consumer",idx:[]},
  {s:"BALMLAWRIE",n:"Balmer Lawrie & Co",sec:"Consumer",idx:[]},
  {s:"BASML",n:"Bannari Amman Spinning",sec:"Textiles",idx:[]},
  {s:"BBL",n:"Bharat Bijlee",sec:"Capital Goods",idx:[]},
  {s:"BBOX",n:"Black Box Ltd",sec:"IT",idx:[]},
  {s:"BCG",n:"Brightcom Group",sec:"IT",idx:[]},
  {s:"BEARDSELL",n:"Beardsell Ltd",sec:"Infrastructure",idx:[]},
  {s:"BEDMUTHA",n:"Bedmutha Industries",sec:"Metal",idx:[]},
  {s:"BELLACASA",n:"Bella Casa Fashion",sec:"Textiles",idx:[]},
  {s:"BELRISE",n:"Belrise Industries",sec:"Automobile",idx:[]},
  {s:"BHARATWIRE",n:"Bharat Wire Ropes",sec:"Metal",idx:[]},
  {s:"BIGBLOC",n:"Bigbloc Construction",sec:"Infrastructure",idx:[]},
  {s:"BIL",n:"Bhartiya International",sec:"Textiles",idx:[]},
  {s:"BIRLACABLE",n:"Birla Cable",sec:"Capital Goods",idx:[]},
  {s:"BIRLAMONEY",n:"Aditya Birla Money",sec:"Finance",idx:[]},
  {s:"BLAL",n:"BEML Land Assets",sec:"Realty",idx:[]},
  {s:"BLBLIMITED",n:"BLB Ltd",sec:"Finance",idx:[]},
  {s:"BLSE",n:"BLS E-Services",sec:"Consumer",idx:[]},
  {s:"BORORENEW",n:"Borosil Renewables",sec:"Energy",idx:[]},
  {s:"BRNL",n:"Bharat Road Network",sec:"Infrastructure",idx:[]},
  {s:"BROOKS",n:"Brooks Laboratories",sec:"Pharma",idx:[]},
  {s:"BSHSL",n:"Bombay Super Hybrid",sec:"FMCG",idx:[]},
  {s:"BSL",n:"BSL Ltd",sec:"Textiles",idx:[]},
  {s:"BVCL",n:"Barak Valley Cements",sec:"Cement",idx:[]},
  {s:"BYKE",n:"The Byke Hospitality",sec:"Hospitality",idx:[]},
  {s:"CALCOM",n:"Calcom Vision",sec:"Capital Goods",idx:[]},
  {s:"COFFEEDAY",n:"Coffee Day Enterprises",sec:"Consumer",idx:[]},
  {s:"COHANCE",n:"Cohance Lifesciences",sec:"Pharma",idx:[]},
  {s:"CONFIPET",n:"Confidence Petroleum",sec:"Energy",idx:[]},
  {s:"CONSOFINVT",n:"Consolidated Finvest",sec:"Finance",idx:[]},
  {s:"CORALFINAC",n:"Coral India Finance",sec:"Finance",idx:[]},
  {s:"COSMOFIRST",n:"Cosmo First",sec:"Chemicals",idx:[]},
  {s:"COUNCODOS",n:"Country Condos",sec:"Realty",idx:[]},
  {s:"CSLFINANCE",n:"CSL Finance",sec:"Finance",idx:[]},
  {s:"CTE",n:"Cambridge Tech Enterp",sec:"IT",idx:[]},
  {s:"CUBEXTUB",n:"Cubex Tubings",sec:"Metal",idx:[]},
  {s:"DAMODARIND",n:"Damodar Industries",sec:"Textiles",idx:[]},
  {s:"DIACABS",n:"Diamond Power Infra",sec:"Capital Goods",idx:[]},
  {s:"DICIND",n:"DIC India",sec:"Chemicals",idx:[]},
  {s:"DLINKIND",n:"D-Link India",sec:"IT",idx:[]},
  {s:"DNMEDIA",n:"Diligent Media Corp",sec:"Media",idx:[]},
  {s:"DPSCLTD",n:"DPSC Ltd",sec:"Power",idx:[]},
  {s:"DPWIRES",n:"D P Wires",sec:"Capital Goods",idx:[]},
  {s:"DREDGECORP",n:"Dredging Corp India",sec:"Infrastructure",idx:[]},
  {s:"DSSL",n:"Dynacons Systems",sec:"IT",idx:[]},
  {s:"DTIL",n:"Dhunseri Tea",sec:"FMCG",idx:[]},
  {s:"DUCON",n:"Ducon Infratechnologies",sec:"Infrastructure",idx:[]},
  {s:"DVL",n:"Dhunseri Ventures",sec:"Finance",idx:[]},
  {s:"DYNPRO",n:"Dynemic Products",sec:"Chemicals",idx:[]},
  {s:"EASTSILK",n:"Eastern Silk Ind",sec:"Textiles",idx:[]},
  {s:"ELECTHERM",n:"Electrotherm India",sec:"Metal",idx:[]},
  {s:"ESTER",n:"Ester Industries",sec:"Chemicals",idx:[]},
  {s:"FINCABLES",n:"Finolex Cables",sec:"Capital Goods",idx:[]},
  {s:"FINPIPE",n:"Finolex Industries",sec:"Infrastructure",idx:[]},
  {s:"FLEXITUFF",n:"Flexituff Ventures",sec:"Textiles",idx:[]},
  {s:"FOCUS",n:"Focus Lighting",sec:"Consumer",idx:[]},
  {s:"FOODSIN",n:"Foods & Inns",sec:"FMCG",idx:[]},
  {s:"GANECOS",n:"Ganesha Ecosphere",sec:"Textiles",idx:[]},
  {s:"GENNEX",n:"Genus Power Infra",sec:"Capital Goods",idx:[]},
  {s:"GHCLTEXTIL",n:"GHCL Textiles",sec:"Textiles",idx:[]},
  {s:"GILLANDERS",n:"Gillanders Arbuthnot",sec:"Consumer",idx:[]},
  {s:"GINNIFILA",n:"Ginni Filaments",sec:"Textiles",idx:[]},
  {s:"GKWLIMITED",n:"GKW Ltd",sec:"Consumer",idx:[]},
  {s:"GLOSTERLTD",n:"Gloster Ltd",sec:"Textiles",idx:[]},
  {s:"GMBREW",n:"GM Breweries",sec:"FMCG",idx:[]},
  {s:"GOACARBON",n:"Goa Carbon",sec:"Energy",idx:[]},
  {s:"GOCLCORP",n:"GOCL Corporation",sec:"Chemicals",idx:[]},
  {s:"GODAVARIB",n:"Godavari Biorefineries",sec:"Energy",idx:[]},
  {s:"GODREJAGRO",n:"Godrej Agrovet",sec:"FMCG",idx:[]},
  {s:"GODREJIND",n:"Godrej Industries",sec:"Consumer",idx:[]},
  {s:"GOKUL",n:"Gokul Refoils",sec:"FMCG",idx:[]},
  {s:"GOKULAGRO",n:"Gokul Agro Resources",sec:"FMCG",idx:[]},
  {s:"GPTHEALTH",n:"GPT Healthcare",sec:"Healthcare",idx:[]},
  {s:"GREENLAMIND",n:"Greenlam Industries",sec:"Consumer",idx:[]},
  {s:"GRPLTD",n:"GRP Ltd",sec:"Automobile",idx:[]},
  {s:"GSLSU",n:"Global Surfaces",sec:"Infrastructure",idx:[]},
  {s:"GSS",n:"GSS Infotech",sec:"IT",idx:[]},
  {s:"GTL",n:"GTL Ltd",sec:"IT",idx:[]},
  {s:"GULPOLY",n:"Gulshan Polyols",sec:"Chemicals",idx:[]},
  {s:"HARIOMPIPE",n:"Hariom Pipe Ind",sec:"Metal",idx:[]},
  {s:"HARRMALAYA",n:"Harrisons Malayalam",sec:"Consumer",idx:[]},
  {s:"HDIL",n:"Housing Dev Infra",sec:"Realty",idx:[]},
  {s:"HEMIPROP",n:"Hemisphere Properties",sec:"Realty",idx:[]},
  {s:"HERANBA",n:"Heranba Industries",sec:"Chemicals",idx:[]},
  {s:"IGARASHI",n:"Igarashi Motors India",sec:"Automobile",idx:[]},
  {s:"IMAGICAA",n:"Imagicaaworld Enterp",sec:"Consumer",idx:[]},
  {s:"IMFA",n:"Indian Metals Ferro",sec:"Metal",idx:[]},
  {s:"INDOAMINES",n:"Indo Amines",sec:"Chemicals",idx:[]},
  {s:"INDOCOUNT",n:"Indo Count Industries",sec:"Textiles",idx:[]},
  {s:"INDORAMA",n:"Indo Rama Synthetics",sec:"Textiles",idx:[]},
  {s:"INDOSTAR",n:"IndoStar Capital",sec:"Finance",idx:[]},
  {s:"INDOTECH",n:"Indo Tech Transformers",sec:"Capital Goods",idx:[]},
  {s:"INDOWIND",n:"Ind-Swift Laboratories",sec:"Pharma",idx:[]},
  {s:"INFIBEAM",n:"Infibeam Avenues",sec:"IT",idx:[]},
  {s:"INFIGREEN",n:"Infibeam Green Energy",sec:"Energy",idx:[]},
  {s:"INEOSSTYRO",n:"INEOS Styrolution India",sec:"Chemicals",idx:[]},
  {s:"INSPIRISYS",n:"Inspirisys Solutions",sec:"IT",idx:[]},
  {s:"INVENTURE",n:"Inventure Growth",sec:"Finance",idx:[]},
  {s:"IRB",n:"IRB Infrastructure Dev",sec:"Infrastructure",idx:[]},
  {s:"ISEC",n:"ICICI Securities",sec:"Finance",idx:[]},
  {s:"ITDC",n:"India Tourism Dev Corp",sec:"Hospitality",idx:[]},
  {s:"ITI",n:"ITI Ltd",sec:"Telecom",idx:[]},
  {s:"J&KBANK",n:"J&K Bank",sec:"Banking",idx:[]},
  {s:"JAGRAN",n:"Jagran Prakashan",sec:"Media",idx:[]},
  {s:"JAIBALAJI",n:"Jai Balaji Industries",sec:"Metal",idx:[]},
  {s:"JAICORPLTD",n:"Jai Corp",sec:"Metal",idx:[]},
  {s:"JASH",n:"Jash Engineering",sec:"Capital Goods",idx:[]},
  {s:"JAYNECOIND",n:"Jayaswal Neco Ind",sec:"Metal",idx:[]},
  {s:"JBMA",n:"JBM Auto",sec:"Automobile",idx:[]},
  {s:"JCHAC",n:"Johnson Controls-Hitachi",sec:"Consumer",idx:[]},
  {s:"JETAIRWAYS",n:"Jet Airways India",sec:"Aviation",idx:[]},
  {s:"JINDALPHOT",n:"Jindal Photo",sec:"Metal",idx:[]},
  {s:"JINDWORLD",n:"Jindal Worldwide",sec:"Textiles",idx:[]},
  {s:"JISLJALEQS",n:"Jain Irrigation",sec:"Infrastructure",idx:[]},
  {s:"JKIL",n:"JK Industries",sec:"Automobile",idx:[]},
  {s:"JKTYRE",n:"JK Tyre & Industries",sec:"Automobile",idx:[]},
  {s:"JMCPROJECT",n:"JMC Projects",sec:"Infrastructure",idx:[]},
  {s:"JOCIL",n:"Jocil Ltd",sec:"Chemicals",idx:[]},
  {s:"JSLHISAR",n:"Jindal Stainless Hisar",sec:"Metal",idx:[]},
  {s:"JTLIND",n:"JTL Industries",sec:"Metal",idx:[]},
  {s:"JUBILANT",n:"Jubilant Ingrevia",sec:"Chemicals",idx:[]},
  {s:"KABRAEXTRU",n:"Kabra Extrusiontechnik",sec:"Capital Goods",idx:[]},
  {s:"KAMDHENU",n:"Kamdhenu Ltd",sec:"Metal",idx:[]},
  {s:"KAMOPAINTS",n:"Kamdhenu Ventures",sec:"Consumer",idx:[]},
  {s:"KANANIIND",n:"Kanani Industries",sec:"Consumer",idx:[]},
  {s:"KANSAINER",n:"Kansai Nerolac Paints",sec:"Consumer",idx:[]},
  {s:"KAYNES",n:"Kaynes Technology",sec:"Capital Goods",idx:[]},
  {s:"KDDL",n:"KDDL Ltd",sec:"Consumer",idx:[]},
  {s:"KELLTONTEC",n:"Kellton Tech",sec:"IT",idx:[]},
  {s:"KERNEX",n:"Kernex Microsystems",sec:"IT",idx:[]},
  {s:"KINGFA",n:"Kingfa Science & Tech",sec:"Chemicals",idx:[]},
  {s:"KIRIINDUS",n:"Kiri Industries",sec:"Chemicals",idx:[]},
  {s:"KIRLOSBROS",n:"Kirloskar Brothers",sec:"Capital Goods",idx:[]},
  {s:"KIRLOSENG",n:"Kirloskar Oil Engines",sec:"Capital Goods",idx:[]},
  {s:"KIRLOSIND",n:"Kirloskar Industries",sec:"Capital Goods",idx:[]},
  {s:"KIRLPNU",n:"Kirloskar Pneumatic",sec:"Capital Goods",idx:[]},
  {s:"KITEX",n:"Kitex Garments",sec:"Textiles",idx:[]},
  {s:"KNRCON",n:"KNR Constructions",sec:"Infrastructure",idx:[]},
  {s:"KOKUYOCMLN",n:"Kokuyo Camlin",sec:"Consumer",idx:[]},
  {s:"KOTARISUG",n:"Kothari Sugars",sec:"Sugar",idx:[]},
  {s:"KSCL",n:"Kaveri Seed Company",sec:"FMCG",idx:[]},
  {s:"KUANTUM",n:"Kuantum Papers",sec:"Paper",idx:[]},
  {s:"LAOPALA",n:"La Opala RG",sec:"Consumer",idx:[]},
  {s:"LEMONTREE",n:"Lemon Tree Hotels",sec:"Hospitality",idx:[]},
  {s:"LGBFORGE",n:"LGB Forge",sec:"Capital Goods",idx:[]},
  {s:"LIBAS",n:"Libas Designs",sec:"Textiles",idx:[]},
  {s:"LINCOLN",n:"Lincoln Pharmaceuticals",sec:"Pharma",idx:[]},
  {s:"LORENZOPHR",n:"Lorenzini Pharma",sec:"Pharma",idx:[]},
  {s:"LOVABLE",n:"Lovable Lingerie",sec:"Textiles",idx:[]},
  {s:"LSIL",n:"Lloyds Steels Ind",sec:"Metal",idx:[]},
  {s:"LTFOODS",n:"LT Foods",sec:"FMCG",idx:[]},
  {s:"LUMAXTECH",n:"Lumax Auto Tech",sec:"Automobile",idx:[]},
  {s:"LUMAXIND",n:"Lumax Industries",sec:"Automobile",idx:[]},
  {s:"LUXIND",n:"Lux Industries",sec:"Textiles",idx:[]},
  {s:"LYKALABS",n:"Lyka Labs",sec:"Pharma",idx:[]},
  {s:"MARALOVER",n:"Maral Overseas",sec:"Textiles",idx:[]},
  {s:"MAZDA",n:"Mazda Ltd",sec:"Capital Goods",idx:[]},
  {s:"MEP",n:"MEP Infrastructure",sec:"Infrastructure",idx:[]},
  {s:"METALFORGE",n:"Metal Forge India",sec:"Metal",idx:[]},
  {s:"MOLDTKPAK",n:"Mold-Tek Packaging",sec:"Consumer",idx:[]},
  {s:"MONTECARLO",n:"Monte Carlo Fashions",sec:"Textiles",idx:[]},
  {s:"MUKANDLTD",n:"Mukand Ltd",sec:"Metal",idx:[]},
  {s:"MUNJALSHOW",n:"Munjal Showa",sec:"Automobile",idx:[]},
  {s:"NAGARCONST",n:"Nagarjuna Constr",sec:"Infrastructure",idx:[]},
  {s:"NAHARCAP",n:"Nahar Capital Fin",sec:"Textiles",idx:[]},
  {s:"NAHARPOLY",n:"Nahar Industrial",sec:"Textiles",idx:[]},
  {s:"NAHARSPING",n:"Nahar Spinning Mills",sec:"Textiles",idx:[]},
  {s:"NANDAN",n:"Nandan Denim",sec:"Textiles",idx:[]},
  {s:"NAVNETEDUL",n:"Navneet Education",sec:"Consumer",idx:[]},
  {s:"NBVENTURES",n:"Nava Ltd",sec:"Metal",idx:[]},
  {s:"NCLIND",n:"NCL Industries",sec:"Cement",idx:[]},
  {s:"NDGL",n:"Nuvama Wealth",sec:"Finance",idx:[]},
  {s:"NDTV",n:"NDTV Ltd",sec:"Media",idx:[]},
  {s:"NECLIFE",n:"Nectar Lifesciences",sec:"Pharma",idx:[]},
  {s:"NELCAST",n:"Nelcast Ltd",sec:"Automobile",idx:[]},
  {s:"NELCO",n:"NELCO Ltd",sec:"Telecom",idx:[]},
  {s:"NEOGEN",n:"Neogen Chemicals",sec:"Chemicals",idx:[]},
  {s:"NESCO",n:"Nesco Ltd",sec:"Realty",idx:[]},
  {s:"NETWEB",n:"Netweb Technologies",sec:"IT",idx:[]},
  {s:"NGLFINE",n:"NGL Fine-Chem",sec:"Chemicals",idx:[]},
  {s:"NH",n:"Narayana Hrudayalaya",sec:"Healthcare",idx:[]},
  {s:"NIITMTS",n:"NIIT Technologies",sec:"IT",idx:[]},
  {s:"NILKAMAL",n:"Nilkamal Ltd",sec:"Consumer",idx:[]},
  {s:"NIITLTD",n:"NIIT Ltd",sec:"IT",idx:[]},
  {s:"NITCO",n:"Nitco Ltd",sec:"Infrastructure",idx:[]},
  {s:"NURECA",n:"Nureca Ltd",sec:"Healthcare",idx:[]},
  {s:"OCCL",n:"Oriental Carbon",sec:"Chemicals",idx:[]},
  {s:"OMAXE",n:"Omaxe Ltd",sec:"Realty",idx:[]},
  {s:"OMINFRAL",n:"Om Infra",sec:"Infrastructure",idx:[]},
  {s:"OPTIEMUS",n:"Optiemus Infracom",sec:"IT",idx:[]},
  {s:"ORIENTLTD",n:"Orient Ltd",sec:"Consumer",idx:[]},
  {s:"ORISSAMINE",n:"Orissa Minerals Dev",sec:"Metal",idx:[]},
  {s:"ORTINLABS",n:"Ortin Laboratories",sec:"Pharma",idx:[]},
  {s:"PAISALO",n:"Paisalo Digital",sec:"Finance",idx:[]},
  {s:"PALREDTEC",n:"Palred Technologies",sec:"IT",idx:[]},
  {s:"PCJEWELLER",n:"PC Jeweller",sec:"Consumer",idx:[]},
  {s:"PDMJEPAPER",n:"Pudumjee Paper",sec:"Paper",idx:[]},
  {s:"PEARL",n:"Pearl Global Industries",sec:"Textiles",idx:[]},
  {s:"PGEL",n:"PG Electroplast",sec:"Consumer",idx:[]},
  {s:"PILANIINVS",n:"Pilani Investment",sec:"Finance",idx:[]},
  {s:"PLASTIBLEN",n:"Plastiblends India",sec:"Chemicals",idx:[]},
  {s:"PNBGILTS",n:"PNB Gilts",sec:"Finance",idx:[]},
  {s:"POKARNA",n:"Pokarna Ltd",sec:"Consumer",idx:[]},
  {s:"PPAP",n:"PPAP Automotive",sec:"Automobile",idx:[]},
  {s:"PRAXIS",n:"Praxis Home Retail",sec:"Consumer",idx:[]},
  {s:"PRECOT",n:"Precot Ltd",sec:"Textiles",idx:[]},
  {s:"PREMEXPLN",n:"Premier Explosives",sec:"Chemicals",idx:[]},
  {s:"PRICOLLTD",n:"Pricol Ltd",sec:"Automobile",idx:[]},
  {s:"PRISMJOHN",n:"Prism Johnson",sec:"Cement",idx:[]},
  {s:"PRIVISCL",n:"Privi Speciality Chem",sec:"Chemicals",idx:[]},
  {s:"PSPPROJECT",n:"PSP Projects",sec:"Infrastructure",idx:[]},
  {s:"PTC",n:"PTC India",sec:"Power",idx:[]},
  {s:"RAJTV",n:"Raj Television Network",sec:"Media",idx:[]},
  {s:"RALLIS",n:"Rallis India",sec:"Chemicals",idx:[]},
  {s:"RAMANEWS",n:"Rama Newsprint",sec:"Paper",idx:[]},
  {s:"RAMAPHO",n:"Rama Phosphates",sec:"Fertilizer",idx:[]},
  {s:"RAMCOIND",n:"Ramco Industries",sec:"Infrastructure",idx:[]},
  {s:"RAMKY",n:"Ramky Infrastructure",sec:"Infrastructure",idx:[]},
  {s:"RANEHOLDIN",n:"Rane Holdings",sec:"Automobile",idx:[]},
  {s:"RKFORGE",n:"Rashi Peripherals",sec:"IT",idx:[]},
  {s:"REPCOHOMEL",n:"Repco Home Finance",sec:"Finance",idx:[]},
  {s:"ROLEXRINGS",n:"Rolex Rings",sec:"Automobile",idx:[]},
  {s:"ROSSELLIND",n:"Rossell India",sec:"FMCG",idx:[]},
  {s:"RPSGVENT",n:"RPSG Ventures",sec:"Consumer",idx:[]},
  {s:"RTNPOWER",n:"RattanIndia Power",sec:"Power",idx:[]},
  {s:"RTNINDIA",n:"RattanIndia Enterprises",sec:"IT",idx:[]},
  {s:"RUCHINFRA",n:"Ruchi Infrastructure",sec:"Realty",idx:[]},
  {s:"RUCHISOYA",n:"Ruchi Soya Industries",sec:"FMCG",idx:[]},
  {s:"SAFARI",n:"Safari Industries",sec:"Consumer",idx:[]},
  {s:"SASKEN",n:"Sasken Technologies",sec:"IT",idx:[]},
  {s:"SBCL",n:"Shivalik Bimetal",sec:"Capital Goods",idx:[]},
  {s:"SHAKTIPUMP",n:"Shakti Pumps India",sec:"Capital Goods",idx:[]},
  {s:"SHRIRAMCIT",n:"Shriram City Union",sec:"Finance",idx:[]},
  {s:"SIYSIL",n:"SIY Industries",sec:"Textiles",idx:[]},
  {s:"SML",n:"SML Isuzu",sec:"Automobile",idx:[]},
  {s:"SONATSOFTW",n:"Sonata Software",sec:"IT",idx:[]},
  {s:"SRHHYPOLTD",n:"Sree Rayalaseema",sec:"Chemicals",idx:[]},
  {s:"STARPAPER",n:"Star Paper Mills",sec:"Paper",idx:[]},
  {s:"STARCEMENT",n:"Star Cement",sec:"Cement",idx:[]},
  {s:"STEELAUTH",n:"Steel Authority",sec:"Metal",idx:[]},
  {s:"STEELCITY",n:"Steel City Securities",sec:"Finance",idx:[]},
  {s:"STEL",n:"Stel Holdings",sec:"Capital Goods",idx:[]},
  {s:"STOVEKRAFT",n:"Stove Kraft",sec:"Consumer",idx:[]},
  {s:"SUNFLAG",n:"Sunflag Iron & Steel",sec:"Metal",idx:[]},
  {s:"SYRMA",n:"Syrma SGS Technology",sec:"Capital Goods",idx:[]},
  {s:"TATACOFFEE",n:"Tata Coffee",sec:"FMCG",idx:[]},
  {s:"TATAMETALI",n:"Tata Metaliks",sec:"Metal",idx:[]},
  {s:"TATASTLLP",n:"Tata Steel Long",sec:"Metal",idx:[]},
  {s:"TCPLPACK",n:"TCPL Packaging",sec:"Paper",idx:[]},
  {s:"TECHNOE",n:"Techno Electric",sec:"Capital Goods",idx:[]},
  {s:"TENCOM",n:"Ten Com Financial",sec:"Finance",idx:[]},
  {s:"TEXINFRA",n:"Texmaco Infra",sec:"Infrastructure",idx:[]},
  {s:"TEXMACO",n:"Texmaco Rail Eng",sec:"Capital Goods",idx:[]},
  {s:"TEXRAIL",n:"Texmaco Rail & Eng",sec:"Capital Goods",idx:[]},
  {s:"TIIL",n:"Tube Investments",sec:"Automobile",idx:[]},
  {s:"TTKHLTCARE",n:"TTK Healthcare",sec:"Consumer",idx:[]},
  {s:"TTKPRESTIG",n:"TTK Prestige",sec:"Consumer",idx:[]},
  {s:"TVTODAY",n:"TV Today Network",sec:"Media",idx:[]},
  {s:"UFLEX",n:"UFLEX Ltd",sec:"Consumer",idx:[]},
  {s:"UJJIVAN",n:"Ujjivan Financial",sec:"Finance",idx:[]},
  {s:"UNITEDTEA",n:"United Nilgiri Tea",sec:"FMCG",idx:[]},
  {s:"UNIVCABLES",n:"Universal Cables",sec:"Capital Goods",idx:[]},
  {s:"V2RETAIL",n:"V2 Retail",sec:"Consumer",idx:[]},
  {s:"VADILALIND",n:"Vadilal Industries",sec:"FMCG",idx:[]},
  {s:"VARDHACRLC",n:"Vardhman Acrylics",sec:"Textiles",idx:[]},
  {s:"WELENT",n:"Welspun Enterprises",sec:"Infrastructure",idx:[]},
  {s:"WENDT",n:"Wendt India",sec:"Capital Goods",idx:[]},
  {s:"WESTLIFE",n:"Westlife Foodworld",sec:"Consumer",idx:[]}
];

/* ═══════════════════════════════════════════════════
   GOOGLE SHEETS DATA LAYER (Multi-Sheet Support)
   ═══════════════════════════════════════════════════ */

// INSTRUCTIONS:
// 1. Import each of the 12 XLSX files into separate Google Sheets
// 2. In each sheet: File > Share > Publish to Web > CSV format
// 3. Paste all 12 published URLs below (order doesn't matter)
// 4. The screener will fetch all sheets in parallel and merge the data
const GOOGLE_SHEET_URLS = [
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWUEPUEjhHmatIkwy4lF0pCpYk-RWQJHH_GZ411Of1Up4zCI3rc3LAFg19swY08w/pub?gid=1599136282&single=true&output=csv", // Sheet 01
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQBPcckfsQIkHnfPAYyPpd8jA1mqxzJ1W8hSZNcBW6iaUY9CmXDmh4c5bOt-wD5OQ/pub?gid=1658167544&single=true&output=csv", // Sheet 02
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSw_stoaW3BHQHRxFQ7diKSYNlvMXVLdUTV7KCBb5csfV4GzQXI_KGud1-K5Hnejg/pub?gid=622298709&single=true&output=csv", // Sheet 03
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTke5GvwzNkNMr7rZKBChTDFJPjrQVCQB7k1b_GEQNk8KP0rHaXKF3E9TG2PhbxFg/pub?gid=1801034194&single=true&output=csv", // Sheet 04
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQo9NjMnHRhnN1vAfM0cRrvv6IP7UR30CGxndhpY9PYXsr3ggfobMyhrKL4Y95JLw/pub?gid=1895357848&single=true&output=csv", // Sheet 05
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7CYrXwr7nRLPEI6ZOMoPT7xvXrlGqrFh6H9oC0UC8f-pvBzbb3MQO1ccaHEVMyw/pub?gid=552844866&single=true&output=csv", // Sheet 06
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQpepRxJUI-Fynqhm2-n8dG2K9IrFLF0fkNqdPRhBGoNWp7w62ap7bjbECMduw8GQ/pub?gid=1752521968&single=true&output=csv", // Sheet 07
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR52dP2TD6nhc5rQT-kRRFaEJuAd-TSfV6R-VNiG_R0ZeuCWON4yLxggBhgDazX9w/pub?gid=1150140572&single=true&output=csv", // Sheet 08
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSBnH5HenBIIoJy1wSzZ-9WQD_qLRShVwjQxiAdLaTViIjQqp7VaaU9RZdTLz8HkQ/pub?gid=492047007&single=true&output=csv", // Sheet 09
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmqZUnHTC1OfyTzwol5zGyJDCEyN62AtdCrt0UrM887HM_XiMlxR9qrihd78fDlg/pub?gid=731384708&single=true&output=csv", // Sheet 10
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeuAbIc_CApwpArmzQN6MoQgX5F-Yav3sCeoHVMr_iNoFrZh3254clwToZX6bQ7w/pub?gid=291369928&single=true&output=csv", // Sheet 11
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ30258x7S01ezbwOFQJ5dzYaZRiyO0qOA1k7ZyylPS-_GoVcBaG0C59gX4X9pk9Q/pub?gid=1798672369&single=true&output=csv", // Sheet 12
].filter(url => url.length > 0);

function parseSheetCSV(text) {
  const rows = text.split("\n").slice(1).filter(r => r.trim());
  const data = {};
  for (const row of rows) {
    const cols = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    const clean = cols.map(c => c.replace(/^"|"$/g, '').trim());
    if (clean.length >= 15 && clean[0]) {
      data[clean[0]] = {
        ltp: parseFloat(clean[4]) || 0,
        change: parseFloat(clean[5]) || 0,
        open: parseFloat(clean[6]) || 0,
        high: parseFloat(clean[7]) || 0,
        low: parseFloat(clean[8]) || 0,
        volume: parseInt(clean[9]) || 0,
        prevClose: parseFloat(clean[10]) || 0,
        weekHigh52: parseFloat(clean[11]) || 0,
        weekLow52: parseFloat(clean[12]) || 0,
        marketCap: parseFloat(clean[13]) || 0,
        pe: parseFloat(clean[14]) || 0,
      };
    }
  }
  return data;
}

async function fetchGoogleSheetData() {
  if (!GOOGLE_SHEET_URLS.length) return null;
  try {
    const results = await Promise.allSettled(
      GOOGLE_SHEET_URLS.map(url => fetch(url).then(r => r.text()))
    );
    const merged = {};
    let successCount = 0;
    for (const result of results) {
      if (result.status === "fulfilled") {
        const sheetData = parseSheetCSV(result.value);
        Object.assign(merged, sheetData);
        successCount++;
      }
    }
    console.log(`Fetched ${successCount}/${GOOGLE_SHEET_URLS.length} sheets, ${Object.keys(merged).length} stocks`);
    return Object.keys(merged).length > 0 ? merged : null;
  } catch (e) {
    console.error("Sheet fetch error:", e);
    return null;
  }
}

// Generate realistic mock data for demo mode
function generateMockData(registry) {
  const basePrices = { Banking: 800, IT: 2000, Energy: 500, FMCG: 1200, Pharma: 1500, Finance: 1000, Metal: 400, Automobile: 3000, Infrastructure: 600, Consumer: 2000, Cement: 2500, Chemicals: 1500, Power: 300, Insurance: 800, Healthcare: 1800, Telecom: 700, Realty: 900, Media: 300, Defence: 2000, Logistics: 500, Fertilizer: 300, Aviation: 3500, Textiles: 400, "Capital Goods": 2500 };
  return registry.map(r => {
    const base = (basePrices[r.sec] || 1000) * (0.3 + Math.random() * 2.5);
    const ltp = +base.toFixed(2);
    const change = +(Math.random() * 8 - 3).toFixed(2);
    const prevClose = +(ltp / (1 + change / 100)).toFixed(2);
    return {
      symbol: r.s, name: r.n, sector: r.sec, indices: r.idx,
      ltp, change,
      open: +(prevClose * (1 + (Math.random() * 0.01 - 0.005))).toFixed(2),
      high: +(ltp * (1 + Math.random() * 0.02)).toFixed(2),
      low: +(ltp * (1 - Math.random() * 0.02)).toFixed(2),
      volume: Math.floor(Math.random() * 20000000) + 100000,
      prevClose,
      weekHigh52: +(ltp * (1.1 + Math.random() * 0.3)).toFixed(2),
      weekLow52: +(ltp * (0.5 + Math.random() * 0.3)).toFixed(2),
      marketCap: Math.floor(Math.random() * 1500000) + 5000,
      pe: +(Math.random() * 80 + 5).toFixed(1),
    };
  });
}

/* ═══════════════════════════════════════════════════
   TABLE CONFIG
   ═══════════════════════════════════════════════════ */
const ALL_COLUMNS = [
  { key: "symbol", label: "Symbol", fixed: true },
  { key: "name", label: "Company", fixed: false },
  { key: "sector", label: "Sector", fixed: false },
  { key: "ltp", label: "LTP (₹)", fixed: true },
  { key: "change", label: "Chg %", fixed: true },
  { key: "open", label: "Open (₹)", fixed: false },
  { key: "high", label: "High (₹)", fixed: false },
  { key: "low", label: "Low (₹)", fixed: false },
  { key: "volume", label: "Volume", fixed: false },
  { key: "prevClose", label: "Prev Close", fixed: false },
  { key: "weekHigh52", label: "52W High", fixed: false },
  { key: "weekLow52", label: "52W Low", fixed: false },
  { key: "marketCap", label: "MCap (Cr)", fixed: false },
  { key: "pe", label: "P/E", fixed: false },
];

const formatNum = (n, dec = 2) => {
  if (!n || isNaN(n)) return "—";
  if (n >= 10000000) return (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000) return (n / 100000).toFixed(2) + " L";
  if (n >= 1000) return n.toLocaleString("en-IN", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  return n.toFixed(dec);
};

/* ── Ticker Bar ── */
function TickerBar({ stocks }) {
  const top = stocks.filter(s => s.indices?.includes("NIFTY50")).slice(0, 30);
  if (!top.length) return null;
  const doubled = [...top, ...top];
  return (
    <div style={{ background: "linear-gradient(90deg, #1a0a3e 0%, #2D1B69 50%, #1a0a3e 100%)", overflow: "hidden", whiteSpace: "nowrap", height: 36, display: "flex", alignItems: "center" }}>
      <style>{`@keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      <div style={{ display: "inline-flex", animation: "tickerScroll 50s linear infinite" }}>
        {doubled.map((s, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 24px", fontSize: 11.5, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}>
            <span style={{ color: "#c4b5fd", fontWeight: 700 }}>{s.symbol}</span>
            <span style={{ color: "#e2e0ff" }}>{formatNum(s.ltp)}</span>
            <span style={{ color: s.change >= 0 ? "#34d399" : "#f87171", fontWeight: 700 }}>{s.change >= 0 ? "▲" : "▼"} {Math.abs(s.change).toFixed(2)}%</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Sparkline ── */
function Sparkline({ positive }) {
  const pts = useRef(Array.from({ length: 18 }, (_, i) => {
    const b = positive ? 28 - i * 0.4 : 12 + i * 0.4;
    return b + Math.sin(i * 0.7) * 5 + (Math.random() * 3 - 1.5);
  }));
  const p = pts.current, mn = Math.min(...p), mx = Math.max(...p);
  const h = 22, w = 56;
  const d = p.map((v, i) => `${i === 0 ? "M" : "L"}${((i / (p.length - 1)) * w).toFixed(1)},${(h - ((v - mn) / (mx - mn + .01)) * h).toFixed(1)}`).join(" ");
  const c = positive ? "#16a34a" : "#dc2626";
  const gid = positive ? "sg" : "sr";
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c} stopOpacity=".12"/><stop offset="100%" stopColor={c} stopOpacity="0"/></linearGradient></defs>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={`url(#${gid})`}/>
      <path d={d} fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN SCREENER
   ═══════════════════════════════════════════════════ */
export default function FinscureScreener() {
  const [stocks, setStocks] = useState([]);
  const [dataSource, setDataSource] = useState("loading"); // loading | live | demo
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("All");
  const [indexFilter, setIndexFilter] = useState("ALL");
  const [sortKey, setSortKey] = useState("marketCap");
  const [sortDir, setSortDir] = useState("desc");
  const [visibleCols, setVisibleCols] = useState(["symbol","name","sector","ltp","change","volume","marketCap","pe"]);
  const [showColPicker, setShowColPicker] = useState(false);
  const [changeFilter, setChangeFilter] = useState("all");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredRow, setHoveredRow] = useState(null);
  const [page, setPage] = useState(0);
  const [lastRefresh, setLastRefresh] = useState(null);
  const PAGE_SIZE = 50;
  const colPickerRef = useRef(null);

  // Initialize data
  useEffect(() => {
    async function init() {
      if (GOOGLE_SHEET_URLS.length > 0) {
        const sheetData = await fetchGoogleSheetData();
        if (sheetData) {
          const merged = STOCK_REGISTRY.map(r => ({
            symbol: r.s, name: r.n, sector: r.sec, indices: r.idx,
            ...(sheetData[r.s] || { ltp: 0, change: 0, open: 0, high: 0, low: 0, volume: 0, prevClose: 0, weekHigh52: 0, weekLow52: 0, marketCap: 0, pe: 0 }),
          })).filter(s => s.ltp > 0);
          setStocks(merged);
          setDataSource("live");
          setLastRefresh(new Date());
          return;
        }
      }
      // Fallback to demo
      setStocks(generateMockData(STOCK_REGISTRY));
      setDataSource("demo");
      setLastRefresh(new Date());
    }
    init();
  }, []);

  // Auto-refresh from Google Sheets every 3 minutes
  useEffect(() => {
    if (dataSource !== "live") return;
    const interval = setInterval(async () => {
      const sheetData = await fetchGoogleSheetData();
      if (sheetData) {
        setStocks(prev => prev.map(s => sheetData[s.symbol] ? { ...s, ...sheetData[s.symbol] } : s));
        setLastRefresh(new Date());
      }
    }, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, [dataSource]);

  // Simulated ticks for demo mode
  useEffect(() => {
    if (dataSource !== "demo") return;
    const interval = setInterval(() => {
      setStocks(prev => prev.map(s => {
        const d = (Math.random() - 0.48) * 0.2;
        const nc = +(s.change + d).toFixed(2);
        const nl = +(s.prevClose * (1 + nc / 100)).toFixed(2);
        return { ...s, ltp: nl, change: nc, high: Math.max(s.high, nl), low: Math.min(s.low, nl), volume: s.volume + Math.floor(Math.random() * 20000) };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, [dataSource]);

  useEffect(() => { const t = setInterval(() => setCurrentTime(new Date()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => {
    const h = (e) => { if (colPickerRef.current && !colPickerRef.current.contains(e.target)) setShowColPicker(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => { setPage(0); }, [search, sectorFilter, indexFilter, changeFilter]);

  const filtered = useMemo(() => stocks
    .filter(s => {
      const ms = s.symbol.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase());
      const mse = sectorFilter === "All" || s.sector === sectorFilter;
      const mi = indexFilter === "ALL" || (s.indices && s.indices.includes(indexFilter));
      const mc = changeFilter === "all" || (changeFilter === "gainers" && s.change > 0) || (changeFilter === "losers" && s.change < 0);
      return ms && mse && mi && mc;
    })
    .sort((a, b) => {
      const m = sortDir === "asc" ? 1 : -1;
      if (typeof a[sortKey] === "string") return m * a[sortKey].localeCompare(b[sortKey]);
      return m * ((a[sortKey] || 0) - (b[sortKey] || 0));
    }), [stocks, search, sectorFilter, indexFilter, changeFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const handleSort = (key) => { if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc"); else { setSortKey(key); setSortDir("desc"); } };
  const toggleCol = (key) => { const c = ALL_COLUMNS.find(col => col.key === key); if (c?.fixed) return; setVisibleCols(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]); };

  const nifty50 = stocks.filter(s => s.indices?.includes("NIFTY50"));
  const gainers = stocks.filter(s => s.change > 0).length;
  const losers = stocks.filter(s => s.change < 0).length;
  const niftyChange = nifty50.length ? +(nifty50.reduce((a, s) => a + s.change, 0) / nifty50.length).toFixed(2) : 0;

  const renderCell = (stock, key) => {
    const val = stock[key];
    if (key === "symbol") return <span style={{ fontWeight: 700, color: "#2D1B69", letterSpacing: ".02em" }}>{val}</span>;
    if (key === "change") {
      const pos = val > 0, neg = val < 0;
      return <span style={{ fontWeight: 700, fontSize: 11, color: pos ? "#16a34a" : neg ? "#dc2626" : "#94a3b8", background: pos ? "#f0fdf4" : neg ? "#fef2f2" : "#f8fafc", padding: "3px 8px", borderRadius: 5, display: "inline-block" }}>{pos ? "+" : ""}{val.toFixed(2)}%</span>;
    }
    if (key === "volume") return formatNum(val, 0);
    if (key === "marketCap") return formatNum(val * 10000000, 0);
    if (typeof val === "number") return val === 0 ? "—" : formatNum(val);
    return val;
  };

  const sel = { padding: "7px 11px", background: "#faf9fe", border: "1.5px solid #e9e5f5", borderRadius: 8, color: "#1e1b3a", fontSize: 11.5, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", outline: "none" };

  if (dataSource === "loading") return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f8f7fc", color: "#7c3aed", fontSize: 16, gap: 10 }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ width: 20, height: 20, border: "3px solid #e9e5f5", borderTop: "3px solid #7c3aed", borderRadius: "50%", animation: "spin 1s linear infinite" }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      Loading Finscure Screener...
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8f7fc", color: "#1e1b3a", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=IBM+Plex+Mono:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet" />

      <TickerBar stocks={stocks} />

      {/* NAV */}
      <header style={{ background: "#fff", borderBottom: "1px solid #ede9fe", padding: "9px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 3px rgba(45,27,105,.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none"><path d="M16 2L30 28H2L16 2Z" fill="#2D1B69"/><path d="M16 9L24 25H8L16 9Z" fill="#7c3aed" opacity=".5"/></svg>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#2D1B69", letterSpacing: ".05em", textTransform: "uppercase" }}>Finscure</span>
          <span style={{ fontSize: 9, color: "#7c3aed", background: "#f5f3ff", padding: "3px 9px", borderRadius: 20, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}>Screener</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Data source badge */}
          <span style={{
            fontSize: 9, padding: "3px 8px", borderRadius: 4, fontWeight: 700, letterSpacing: ".04em",
            background: dataSource === "live" ? "#dcfce7" : "#fef3c7",
            color: dataSource === "live" ? "#16a34a" : "#d97706",
          }}>{dataSource === "live" ? "● LIVE" : "● DEMO"}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: niftyChange >= 0 ? "#f0fdf4" : "#fef2f2", padding: "4px 11px", borderRadius: 7 }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: "#94a3b8", letterSpacing: ".1em" }}>NIFTY</span>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, fontWeight: 700, color: niftyChange >= 0 ? "#16a34a" : "#dc2626" }}>{niftyChange >= 0 ? "+" : ""}{niftyChange}%</span>
          </div>
          <div style={{ display: "flex", gap: 6, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, fontWeight: 600 }}>
            <span style={{ color: "#16a34a" }}>{gainers}↑</span>
            <span style={{ color: "#dc2626" }}>{losers}↓</span>
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: "#64748b", background: "#f8fafc", padding: "4px 9px", borderRadius: 5, border: "1px solid #e2e8f0" }}>
            {currentTime.toLocaleTimeString("en-IN", { hour12: false })} IST
          </div>
        </div>
      </header>

      {/* TITLE + FILTERS */}
      <div style={{ padding: "14px 24px 0", background: "#fff", borderBottom: "1px solid #ede9fe" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 600, color: "#1e1b3a", margin: 0, letterSpacing: "-.02em" }}>Stock Market Screener</h1>
        </div>
        <p style={{ margin: "0 0 12px", fontSize: 11.5, color: "#94a3b8" }}>
          {dataSource === "live" ? `Live data via ${GOOGLE_SHEET_URLS.length} Google Sheets` : "Simulated demo data"} · {stocks.length} stocks · {NSE_INDICES.length} indices · {lastRefresh ? `Refreshed: ${lastRefresh.toLocaleTimeString("en-IN", { hour12: false })}` : ""}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 11, flexWrap: "wrap" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 160px", maxWidth: 220 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search symbol or company..."
              style={{ ...sel, width: "100%", boxSizing: "border-box", padding: "7px 10px 7px 28px" }}
              onFocus={e => { e.target.style.borderColor = "#7c3aed"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,.08)"; }}
              onBlur={e => { e.target.style.borderColor = "#e9e5f5"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          {/* Index dropdown */}
          <select value={indexFilter} onChange={e => setIndexFilter(e.target.value)} style={{ ...sel, maxWidth: 200 }}>
            {NSE_INDICES.map(idx => <option key={idx.key} value={idx.key}>{idx.label}</option>)}
          </select>

          {/* Sector dropdown */}
          <select value={sectorFilter} onChange={e => setSectorFilter(e.target.value)} style={sel}>
            {SECTORS.map(s => <option key={s} value={s}>{s === "All" ? "All Sectors" : s}</option>)}
          </select>

          {/* Change Toggle */}
          <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: "1.5px solid #e9e5f5" }}>
            {[{ key: "all", label: "All", bg: "#f5f3ff", c: "#7c3aed" }, { key: "gainers", label: "Gainers", bg: "#f0fdf4", c: "#16a34a" }, { key: "losers", label: "Losers", bg: "#fef2f2", c: "#dc2626" }].map(f => (
              <button key={f.key} onClick={() => setChangeFilter(f.key)} style={{ padding: "6px 13px", border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .2s", background: changeFilter === f.key ? f.bg : "#fff", color: changeFilter === f.key ? f.c : "#94a3b8" }}>{f.label}</button>
            ))}
          </div>

          {/* Column Picker */}
          <div ref={colPickerRef} style={{ position: "relative", marginLeft: "auto" }}>
            <button onClick={() => setShowColPicker(!showColPicker)} style={{ padding: "6px 11px", background: showColPicker ? "#f5f3ff" : "#fff", border: "1.5px solid #e9e5f5", borderRadius: 8, color: "#7c3aed", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}>
              ⚙ Columns
            </button>
            {showColPicker && (
              <div style={{ position: "absolute", top: "115%", right: 0, background: "#fff", border: "1.5px solid #e9e5f5", borderRadius: 10, padding: 10, width: 200, zIndex: 50, boxShadow: "0 12px 40px rgba(45,27,105,.12)" }}>
                <div style={{ fontSize: 9, color: "#7c3aed", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 6, fontWeight: 700 }}>Toggle Columns</div>
                {ALL_COLUMNS.map(col => (
                  <label key={col.key} style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 4px", cursor: col.fixed ? "default" : "pointer", opacity: col.fixed ? .4 : 1, borderRadius: 4, fontSize: 12, color: "#374151" }}
                    onMouseEnter={e => { if (!col.fixed) e.currentTarget.style.background = "#f5f3ff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                    <input type="checkbox" checked={visibleCols.includes(col.key)} disabled={col.fixed} onChange={() => toggleCol(col.key)} style={{ accentColor: "#7c3aed" }}/>
                    {col.label}
                  </label>
                ))}
              </div>
            )}
          </div>
          <span style={{ fontSize: 11, color: "#7c3aed", fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, background: "#f5f3ff", padding: "5px 9px", borderRadius: 6 }}>{filtered.length} stocks</span>
        </div>
      </div>

      {/* TABLE */}
      <div style={{ padding: "10px 24px 10px" }}>
        <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #ede9fe", overflow: "hidden", boxShadow: "0 2px 8px rgba(45,27,105,.04)" }}>
          <div style={{ overflowX: "auto", maxHeight: "calc(100vh - 310px)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  <th style={{ padding: "9px 6px", textAlign: "center", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "#7c3aed", borderBottom: "2px solid #ede9fe", background: "#faf9fe", position: "sticky", top: 0, zIndex: 10, width: 60 }}>Trend</th>
                  {ALL_COLUMNS.filter(c => visibleCols.includes(c.key)).map(col => (
                    <th key={col.key} onClick={() => handleSort(col.key)} style={{
                      padding: "9px 10px", textAlign: col.key === "symbol" || col.key === "name" || col.key === "sector" ? "left" : "right",
                      fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em",
                      color: sortKey === col.key ? "#2D1B69" : "#94a3b8",
                      borderBottom: "2px solid #ede9fe", background: "#faf9fe",
                      position: "sticky", top: 0, zIndex: 10, cursor: "pointer", whiteSpace: "nowrap", userSelect: "none",
                    }}>
                      {col.label}{sortKey === col.key && <span style={{ marginLeft: 3, fontSize: 8, color: "#7c3aed" }}>{sortDir === "asc" ? "▲" : "▼"}</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((stock, idx) => (
                  <tr key={stock.symbol} onMouseEnter={() => setHoveredRow(idx)} onMouseLeave={() => setHoveredRow(null)}
                    style={{ background: hoveredRow === idx ? "#faf8ff" : "#fff", transition: "background .12s" }}>
                    <td style={{ padding: "5px 6px", borderBottom: "1px solid #f3f1fa", textAlign: "center" }}><Sparkline positive={stock.change >= 0}/></td>
                    {ALL_COLUMNS.filter(c => visibleCols.includes(c.key)).map(col => (
                      <td key={col.key} style={{
                        padding: "8px 10px", textAlign: col.key === "symbol" || col.key === "name" || col.key === "sector" ? "left" : "right",
                        borderBottom: "1px solid #f3f1fa",
                        fontFamily: typeof stock[col.key] === "number" ? "'IBM Plex Mono',monospace" : "inherit",
                        fontSize: typeof stock[col.key] === "number" ? 11 : 12, whiteSpace: "nowrap",
                        color: col.key === "name" ? "#64748b" : col.key === "sector" ? "#7c3aed" : "#1e1b3a",
                        fontWeight: col.key === "sector" ? 500 : 400,
                        maxWidth: col.key === "name" ? 160 : undefined, overflow: "hidden", textOverflow: "ellipsis",
                      }}>{renderCell(stock, col.key)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "8px 14px", borderTop: "1px solid #ede9fe", background: "#faf9fe" }}>
              <button disabled={page === 0} onClick={() => setPage(p => p - 1)} style={{ padding: "4px 10px", borderRadius: 5, border: "1px solid #e9e5f5", background: page === 0 ? "#f1f0f9" : "#fff", color: page === 0 ? "#c4b5fd" : "#7c3aed", fontWeight: 600, fontSize: 10, cursor: page === 0 ? "default" : "pointer", fontFamily: "inherit" }}>← Prev</button>
              <div style={{ display: "flex", gap: 2 }}>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let p; if (totalPages <= 7) p = i; else if (page < 3) p = i; else if (page > totalPages - 4) p = totalPages - 7 + i; else p = page - 3 + i;
                  return <button key={p} onClick={() => setPage(p)} style={{ width: 28, height: 28, borderRadius: 5, border: p === page ? "1.5px solid #7c3aed" : "1px solid #e9e5f5", background: p === page ? "#f5f3ff" : "#fff", color: p === page ? "#7c3aed" : "#64748b", fontWeight: 600, fontSize: 10, cursor: "pointer", fontFamily: "'IBM Plex Mono',monospace" }}>{p + 1}</button>;
                })}
              </div>
              <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} style={{ padding: "4px 10px", borderRadius: 5, border: "1px solid #e9e5f5", background: page >= totalPages - 1 ? "#f1f0f9" : "#fff", color: page >= totalPages - 1 ? "#c4b5fd" : "#7c3aed", fontWeight: 600, fontSize: 10, cursor: page >= totalPages - 1 ? "default" : "pointer", fontFamily: "inherit" }}>Next →</button>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ padding: "12px 24px", borderTop: "1px solid #ede9fe", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 6, maxWidth: 640 }}>
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, borderRadius: 4, background: "#fef3c7", color: "#d97706", fontSize: 9, fontWeight: 900, flexShrink: 0, marginTop: 1 }}>!</span>
          <p style={{ margin: 0, fontSize: 10.5, color: "#64748b", lineHeight: 1.5 }}>
            <strong style={{ color: "#d97706" }}>Disclaimer:</strong> This website is purely for educational purposes as we are not SEBI Registered Advisor. Data sourced from NSE via Google Finance. Not investment advice.
          </p>
        </div>
        <span style={{ fontSize: 10, color: "#a78bfa", fontFamily: "'IBM Plex Mono',monospace", fontWeight: 500 }}>© 2026 Finscure · {stocks.length} stocks</span>
      </footer>
    </div>
  );
}
