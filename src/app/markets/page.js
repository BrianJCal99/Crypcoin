"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MarketsPage() {
    const [livePrices, setLivePrices] = useState({});

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

    return (
        <div className="min-h-screen bg-gray-50 font-mono">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <div className="text-xs text-gray-500 mb-2 tracking-widest uppercase">━━━ Market Overview ━━━</div>
                    <h1 className="text-4xl font-bold mb-4 text-black uppercase tracking-tight">Full Market Data</h1>
                    <p className="text-gray-600 text-sm uppercase tracking-wide max-w-2xl">
                        &gt; Comprehensive real-time monitoring of 20+ cryptocurrency pairs<br />
                        &gt; Live price updates and 24-hour performance analytics
                    </p>
                </div>

                {/* Market Table */}
                <div className="border-2 border-black bg-white overflow-hidden overflow-x-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-black bg-gray-50">
                                <th className="px-6 py-4 text-xs font-black uppercase text-gray-600 tracking-wider w-1/4">Asset</th>
                                <th className="px-6 py-4 text-xs font-black uppercase text-gray-600 tracking-wider">Price (USD)</th>
                                <th className="px-6 py-4 text-xs font-black uppercase text-gray-600 tracking-wider">24h Change</th>
                                <th className="px-6 py-4 text-xs font-black uppercase text-gray-600 tracking-wider text-right">View Data</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y border-black">
                            {allCoins.map((coin) => {
                                const priceData = livePrices[coin.symbol];
                                const isPositive = priceData?.change >= 0;

                                return (
                                    <tr
                                        key={coin.symbol}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 border-2 border-black flex items-center justify-center p-1 bg-white">
                                                    <img src={coin.logo} alt={coin.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div>
                                                    <div className="font-bold uppercase text-black">{coin.name}</div>
                                                    <div className="text-[10px] text-gray-500 font-bold">{coin.ticker}/USDT</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold tabular-nums">
                                            {priceData ? (
                                                `$${priceData.price.toLocaleString('en-US', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: priceData.price < 1 ? 6 : 2
                                                })}`
                                            ) : (
                                                <div className="h-4 w-24 bg-gray-200 animate-pulse"></div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {priceData ? (
                                                <div className={`inline-flex items-center gap-1 font-black ${isPositive ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                    <span className="text-[10px]">{isPositive ? '[▲]' : '[▼]'}</span>
                                                    <span className="text-sm">{isPositive ? '+' : ''}{priceData.change.toFixed(2)}%</span>
                                                </div>
                                            ) : (
                                                <div className="h-4 w-16 bg-gray-200 animate-pulse"></div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/${coin.symbol}`}
                                                className="inline-block px-4 py-1.5 border-2 border-black bg-white text-black text-[10px] font-black uppercase hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-[-2px] hover:translate-y-0 active:bg-gray-200"
                                            >
                                                [ Details ]
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
