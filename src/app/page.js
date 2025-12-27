"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [livePrices, setLivePrices] = useState({});
  const [visibleCount, setVisibleCount] = useState(8);

  // All cryptocurrencies mapped from public/logos
  const allCoins = [
    { symbol: "btcusdt", name: "Bitcoin", ticker: "BTC", logo: "/logos/bitcoin-btc-logo.svg" },
    { symbol: "ethusdt", name: "Ethereum", ticker: "ETH", logo: "/logos/ethereum-eth-logo.svg" },
    { symbol: "bnbusdt", name: "Binance Coin", ticker: "BNB", logo: "/logos/bnb-bnb-logo.svg" },
    { symbol: "solusdt", name: "Solana", ticker: "SOL", logo: "/logos/solana-sol-logo.svg" },
    { symbol: "xrpusdt", name: "Ripple", ticker: "XRP", logo: "/logos/xrp-xrp-logo.svg" },
    { symbol: "adausdt", name: "Cardano", ticker: "ADA", logo: "/logos/cardano-ada-logo.svg" },
    { symbol: "dogeusdt", name: "Dogecoin", ticker: "DOGE", logo: "/logos/dogecoin-doge-logo.svg" },
    { symbol: "hbarusdt", name: "Hedera", ticker: "HBAR", logo: "/logos/hedera-hbar-logo.svg" },
    { symbol: "avaxusdt", name: "Avalanche", ticker: "AVAX", logo: "/logos/avalanche-avax-logo.svg" },
    { symbol: "bchusdt", name: "Bitcoin Cash", ticker: "BCH", logo: "/logos/bitcoin-cash-bch-logo.svg" },
    { symbol: "linkusdt", name: "Chainlink", ticker: "LINK", logo: "/logos/chainlink-link-logo.svg" },
    { symbol: "ltcusdt", name: "Litecoin", ticker: "LTC", logo: "/logos/litecoin-ltc-logo.svg" },
    { symbol: "nearusdt", name: "Near Protocol", ticker: "NEAR", logo: "/logos/near-protocol-near-logo.svg" },
    { symbol: "dotusdt", name: "Polkadot", ticker: "DOT", logo: "/logos/polkadot-new-dot-logo.svg" },
    { symbol: "shibusdt", name: "Shiba Inu", ticker: "SHIB", logo: "/logos/shiba-inu-shib-logo.svg" },
    { symbol: "xlmusdt", name: "Stellar", ticker: "XLM", logo: "/logos/stellar-xlm-logo.svg" },
    { symbol: "suiusdt", name: "Sui", ticker: "SUI", logo: "/logos/sui-sui-logo.svg" },
    { symbol: "usdcusdt", name: "USD Coin", ticker: "USDC", logo: "/logos/usd-coin-usdc-logo.svg" },
    { symbol: "tonusdt", name: "Toncoin", ticker: "TON", logo: "/logos/toncoin-ton-logo.svg" },
    { symbol: "trxusdt", name: "Tron", ticker: "TRX", logo: "/logos/tron-trx-logo.svg" }
  ];

  // Fetch live prices for all coins
  useEffect(() => {
    const symbols = allCoins.map(coin => coin.symbol);
    const streams = symbols.map(symbol => `${symbol}@ticker`).join("/");

    const binanceSocket = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`
    );

    binanceSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (!message.data) return;
      const { s: symbol, c: price, P: priceChangePercent } = message.data;

      setLivePrices((prev) => ({
        ...prev,
        [symbol.toLowerCase()]: {
          price: parseFloat(price),
          change: parseFloat(priceChangePercent)
        }
      }));
    };

    return () => {
      binanceSocket.close();
    };
  }, []);

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 8, allCoins.length));
  };

  const handleShowLess = () => {
    setVisibleCount(prev => Math.max(prev - 8, 8));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-mono">
      {/* Hero Section */}
      <div className="border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <div className="mb-8">
              <div className="text-sm text-gray-600 mb-2">[ WELCOME TO ]</div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 text-black tracking-tight">
                CRYPCOIN
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <span>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
              </div>
            </div>

            <p className="text-lg sm:text-xl text-gray-700 mb-3 uppercase tracking-wider">
              Real-Time Cryptocurrency Market Data
            </p>

            <p className="text-sm text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              &gt; Track live prices, analyze charts, and stay ahead of the market<br />
              &gt; Professional-grade trading tools with historical data analysis
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/markets"
                className="px-8 py-3 bg-black text-white border-2 border-black font-bold uppercase text-sm hover:bg-white hover:text-black transition-all duration-200"
              >
                [ Full Market Data Table ]
              </Link>
              <Link
                href="/btcusdt"
                className="px-8 py-3 bg-white text-black border-2 border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-all duration-200"
              >
                [ View Bitcoin Live ]
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Markets Section */}
      <div id="markets" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="text-xs text-gray-500 mb-2 tracking-widest">━━━ FEATURED MARKETS ━━━</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-black uppercase tracking-tight">
            Live Trading Pairs
          </h2>
          <p className="text-gray-600 text-sm uppercase tracking-wide">
            &gt; Click to view detailed charts and market data
          </p>
        </div>

        {/* Coins Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allCoins.slice(0, visibleCount).map((coin) => {
            const priceData = livePrices[coin.symbol];
            const isPositive = priceData?.change >= 0;

            return (
              <Link
                key={coin.symbol}
                href={`/${coin.symbol}`}
                className="group"
              >
                <div className="bg-white border-2 border-black p-5 hover:bg-black hover:text-white transition-all duration-200">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-300 group-hover:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border-2 border-black group-hover:border-white flex items-center justify-center p-1 bg-white transition-all">
                        <img src={coin.logo} alt={coin.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold uppercase">{coin.name}</h3>
                        <p className="text-xs text-gray-500 group-hover:text-gray-300">{coin.ticker}/USDT</p>
                      </div>
                    </div>
                  </div>

                  {priceData ? (
                    <div className="space-y-2">
                      <div className="text-xl font-bold tabular-nums">
                        ${priceData.price.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: priceData.price < 1 ? 6 : 2
                        })}
                      </div>
                      <div className={`flex items-center gap-2 text-xs font-bold uppercase ${isPositive ? 'text-green-700 group-hover:text-green-400' : 'text-red-700 group-hover:text-red-400'
                        }`}>
                        <span>{isPositive ? '[▲]' : '[▼]'}</span>
                        <span>{isPositive ? '+' : ''}{priceData.change.toFixed(2)}%</span>
                        <span className="text-gray-500 group-hover:text-gray-400">24H</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="h-7 bg-gray-200 group-hover:bg-gray-700 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 group-hover:bg-gray-700 w-24 animate-pulse"></div>
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-gray-300 group-hover:border-gray-700">
                    <div className="flex items-center justify-between text-xs uppercase font-bold">
                      <span className="text-gray-600 group-hover:text-gray-300">View Charts</span>
                      <span className="text-gray-600 group-hover:text-white">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          {visibleCount < allCoins.length && (
            <button
              onClick={handleShowMore}
              className="px-12 py-4 bg-white text-black border-2 border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              [ Show More Coins ]
            </button>
          )}
          {visibleCount > 8 && (
            <button
              onClick={handleShowLess}
              className="px-12 py-4 bg-white text-black border-2 border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              [ Show Less ]
            </button>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-8 border-2 border-black">
              <div className="text-3xl mb-4 font-bold text-black border-2 border-black inline-block p-2 bg-gray-50">📊</div>
              <h3 className="text-lg font-bold mb-2 uppercase tracking-tight">Real-Time Data</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Live price updates and market data streamed directly from Binance exchange</p>
            </div>

            <div className="text-center p-8 border-2 border-black">
              <div className="text-3xl mb-4 font-bold text-black border-2 border-black inline-block p-2 bg-gray-50">📈</div>
              <h3 className="text-lg font-bold mb-2 uppercase tracking-tight">Advanced Charts</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Multiple chart types with 1000+ historical candles for deep technical analysis</p>
            </div>

            <div className="text-center p-8 border-2 border-black">
              <div className="text-3xl mb-4 font-bold text-black border-2 border-black inline-block p-2 bg-gray-50">⚡</div>
              <h3 className="text-lg font-bold mb-2 uppercase tracking-tight">Lightning Fast</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Optimized performance with WebSocket connections for instant market updates</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
