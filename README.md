# CRYPCOIN

A real-time cryptocurrency market app built with **Next.js**. It streams live prices from the **Binance WebSocket API** and draws interactive charts with **TradingView Lightweight Charts**, with no page refreshes and no backend of its own.

**Live demo:** [crypcoin-au.vercel.app](https://crypcoin-au.vercel.app/) · **Case study:** [brianjcaldera.com/projects/crypcoin](https://brianjcaldera.com/projects/crypcoin/)

![CRYPCOIN markets page](https://brianjcalderaportfolio.wordpress.com/wp-content/uploads/2025/05/markets.png?w=1024)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Lightweight Charts](https://img.shields.io/badge/TradingView-Lightweight_Charts_4-131722)
![Binance API](https://img.shields.io/badge/Binance-WebSocket_%26_REST-F0B90B?logo=binance&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [How it works](#how-it-works)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Disclaimer](#disclaimer)
- [License](#license)

## Features

**Live markets**
- Tracks 20 popular coins against USDT, including BTC, ETH, SOL, XRP and DOGE
- Prices and 24-hour change update in real time over a single combined WebSocket stream

**Interactive charts**
- A dedicated page for every trading pair
- Six chart styles: candlestick, bar, line, area, baseline and histogram
- Eleven time intervals, from 1 minute to 1 month
- Up to 1,000 historical candles on load, then new candles drawn live as trades happen
- Times shown in the visitor's local time zone
- Responsive charts that resize to fit any screen

**Coin pages**
- 24-hour price stats for each pair
- A short explainer for every coin

## Tech stack

| Area | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Charts | TradingView Lightweight Charts 4 |
| Market data | Binance WebSocket streams and REST API (public endpoints, no API key needed) |
| Styling | Tailwind CSS 3 |
| Hosting | Vercel, with Vercel Analytics |

## How it works

1. **History first.** When a coin page opens, the app requests up to 1,000 past candles for the selected interval from the Binance REST API (`/api/v3/klines`), so there's data on screen straight away.
2. **Then live data.** Once the history has loaded, the page opens a Binance kline stream (`<symbol>@kline_<interval>`). Each message either updates the current candle or starts a new one, so history and live data join up without gaps or duplicates.
3. **24-hour stats.** A separate ticker stream (`<symbol>@ticker`) keeps the price and 24-hour stats current. The markets page subscribes to all 20 coins through one combined stream.
4. **Six charts from one feed.** Candlestick and bar charts get open, high, low and close prices. Line, area, baseline and histogram charts get a single value, and the histogram is coloured by whether the price went up or down.
5. **Clean-up.** Each WebSocket closes when you switch coin or interval, and charts and resize observers are removed when the page changes, so old streams never update the wrong chart.

## Project structure

```
src/
├── app/
│   ├── page.js            # Home page with live prices
│   ├── markets/page.js    # Markets table for all 20 coins
│   ├── [symbol]/page.js   # Coin page: charts, intervals, 24-hour stats and explainer
│   ├── about/page.js      # About the project
│   ├── layout.js          # Root layout and SEO metadata
│   └── globals.css
└── components/
    ├── Navbar.js
    └── Footer.js
public/
├── logos/                 # Coin logos
└── brand/                 # CRYPCOIN branding
```

## Getting started

### Prerequisites

- Node.js 20.9 or later

No API keys are needed, because the app only uses Binance's public market data endpoints.

### Installation

```bash
git clone https://github.com/BrianJCal99/Crypcoin.git
cd Crypcoin
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Optional environment variable

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification code |

> **Note:** Binance's API isn't available in every country. If prices don't load, check whether `stream.binance.com` and `api.binance.com` are reachable from your network.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |

## Disclaimer

CRYPCOIN is a portfolio project for learning and demonstration. It shows market data only and is not financial advice.

## License

Released under the [MIT License](LICENSE). © 2026 Brian Caldera.

Built by [Brian Caldera](https://brianjcaldera.com) · [GitHub](https://github.com/BrianJCal99) · [LinkedIn](https://www.linkedin.com/in/brianjcal/)
