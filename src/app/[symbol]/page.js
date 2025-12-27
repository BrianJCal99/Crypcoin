"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { createChart } from "lightweight-charts";
import Link from "next/link";

export default function SymbolPage() {
    const params = useParams();
    const symbol = params.symbol || "btcusdt";

    const [tickers, setTickers] = useState({});

    // Logo mapping for all coins
    const logoMap = {
        "btcusdt": "/logos/bitcoin-btc-logo.svg",
        "ethusdt": "/logos/ethereum-eth-logo.svg",
        "bnbusdt": "/logos/bnb-bnb-logo.svg",
        "solusdt": "/logos/solana-sol-logo.svg",
        "xrpusdt": "/logos/xrp-xrp-logo.svg",
        "adausdt": "/logos/cardano-ada-logo.svg",
        "dogeusdt": "/logos/dogecoin-doge-logo.svg",
        "hbarusdt": "/logos/hedera-hbar-logo.svg",
        "avaxusdt": "/logos/avalanche-avax-logo.svg",
        "bchusdt": "/logos/bitcoin-cash-bch-logo.svg",
        "linkusdt": "/logos/chainlink-link-logo.svg",
        "ltcusdt": "/logos/litecoin-ltc-logo.svg",
        "nearusdt": "/logos/near-protocol-near-logo.svg",
        "dotusdt": "/logos/polkadot-new-dot-logo.svg",
        "shibusdt": "/logos/shiba-inu-shib-logo.svg",
        "xlmusdt": "/logos/stellar-xlm-logo.svg",
        "suiusdt": "/logos/sui-sui-logo.svg",
        "usdcusdt": "/logos/usd-coin-usdc-logo.svg",
        "tonusdt": "/logos/toncoin-ton-logo.svg",
        "trxusdt": "/logos/tron-trx-logo.svg"
    };

    const currentLogo = logoMap[symbol.toLowerCase()];

    // Coin descriptions mapping for all coins
    const coinDescriptions = {
        "btcusdt": {
            name: "Bitcoin",
            desc: "Bitcoin (BTC) is the first decentralized digital currency, created in 2009 by Satoshi Nakamoto. It uses blockchain technology to allow peer-to-peer transactions without intermediaries, serving as a 'digital gold' and a store of value."
        },
        "ethusdt": {
            name: "Ethereum",
            desc: "Ethereum (ETH) is a decentralized platform that pioneered smart contract functionality. It allows developers to build decentralized applications (dApps) and decentralized finance (DeFi) systems, with Ether serving as the lifeblood of the network."
        },
        "bnbusdt": {
            name: "Binance Coin",
            desc: "BNB is the native cryptocurrency of the Binance ecosystem and the BNB Chain. It provides trading fee discounts on the Binance exchange and fuels transactions within its expanding blockchain ecosystem."
        },
        "solusdt": {
            name: "Solana",
            desc: "Solana (SOL) is a high-speed blockchain platform designed for decentralized applications. Its unique Proof of History (PoH) mechanism allows for thousands of transactions per second at very low costs."
        },
        "xrpusdt": {
            name: "Ripple",
            desc: "XRP is the native token of the XRP Ledger, designed by Ripple for fast and low-cost cross-border payments. It aims to revolutionize how the world moves money by providing instant liquidity for financial institutions."
        },
        "adausdt": {
            name: "Cardano",
            desc: "Cardano (ADA) is a research-first blockchain platform built on a proof-of-stake consensus called Ouroboros. It emphasizes peer-reviewed development to create a secure and sustainable ecosystem for decentralized apps."
        },
        "dogeusdt": {
            name: "Dogecoin",
            desc: "Dogecoin (DOGE) began as a joke in 2013 but evolved into a major cryptocurrency with a global community. Based on the 'Doge' Shiba Inu meme, it is known for its fast transactions and high-profile social media support."
        },
        "hbarusdt": {
            name: "Hedera",
            desc: "Hedera (HBAR) is an enterprise-grade public network that uses Hashgraph consensus instead of a traditional blockchain. This allows for superior performance, security, and stability for decentralized applications and enterprise use cases."
        },
        "avaxusdt": {
            name: "Avalanche",
            desc: "Avalanche (AVAX) is an open-source platform for launching decentralized finance (DeFi) applications and enterprise blockchain deployments in one interoperable, highly scalable ecosystem."
        },
        "bchusdt": {
            name: "Bitcoin Cash",
            desc: "Bitcoin Cash (BCH) is a cryptocurrency that originated from a Bitcoin hard fork in 2017. It was created to allow for larger block sizes, enabling faster transactions and lower fees for everyday payments."
        },
        "linkusdt": {
            name: "Chainlink",
            desc: "Chainlink (LINK) is a decentralized oracle network that provides reliable, real-word data to smart contracts on many different blockchains, bridging the gap between off-chain data and on-chain intelligence."
        },
        "ltcusdt": {
            name: "Litecoin",
            desc: "Litecoin (LTC) was created in 2011 by Charlie Lee as a 'lite' version of Bitcoin. It offers faster block generation times and a different hashing algorithm, positioned as the 'silver' to Bitcoin's 'gold'."
        },
        "nearusdt": {
            name: "Near Protocol",
            desc: "NEAR Protocol is a developer-friendly layer-one blockchain that is built to be fast, secure, and infinitely scalable. It uses sharding technology to maintain performance even as the network grows."
        },
        "dotusdt": {
            name: "Polkadot",
            desc: "Polkadot (DOT) is a multichain protocol that connects different specialized blockchains into a single network. It enables cross-chain data transfer and interoperability between diverse blockchain systems."
        },
        "shibusdt": {
            name: "Shiba Inu",
            desc: "Shiba Inu (SHIB) is a decentralized meme token that evolved into a vibrant ecosystem. Often dubbed the 'Dogecoin killer', it has expanded to include its own decentralized exchange (ShibaSwap) and future projects."
        },
        "xlmusdt": {
            name: "Stellar",
            desc: "Stellar (XLM) is an open-source network for currencies and payments. It makes it possible to create, send, and trade digital representations of all forms of money: dollars, pesos, bitcoin, and pretty much anything else."
        },
        "suiusdt": {
            name: "Sui",
            desc: "Sui is a first-of-its-kind Layer 1 blockchain and smart contract platform designed from the bottom up to make digital asset ownership fast, private, secure, and accessible to everyone."
        },
        "usdcusdt": {
            name: "USD Coin",
            desc: "USD Coin (USDC) is a digital stablecoin that is pegged to the United States dollar. Managed by Circle and Coinbase through the Centre Consortium, it provides a stable digital dollar for the global crypto economy."
        },
        "tonusdt": {
            name: "Toncoin",
            desc: "Toncoin (TON) is the native cryptocurrency of the The Open Network. Originally developed by the Telegram team, it is a high-performance Layer 1 blockchain designed for mass adoption and decentralized services."
        },
        "trxusdt": {
            name: "Tron",
            desc: "Tron (TRX) is a blockchain-based decentralized operating system with the goal of creating a global and free-to-access digital content entertainment system with distributed storage technology."
        }
    };

    const currentCoinInfo = coinDescriptions[symbol.toLowerCase()];

    const candlestickChartRef = useRef(null);
    const areaChartRef = useRef(null);
    const barChartRef = useRef(null);
    const baselineChartRef = useRef(null);
    const histogramChartRef = useRef(null);
    const lineChartRef = useRef(null);

    const candlestickSeriesRef = useRef(null);
    const areaSeriesRef = useRef(null);
    const barSeriesRef = useRef(null);
    const baselineSeriesRef = useRef(null);
    const histogramSeriesRef = useRef(null);
    const lineSeriesRef = useRef(null);

    const [activeChartType, setActiveChartType] = useState('candlestick');
    const [interval, setInterval] = useState('1m');
    const [kline, setKline] = useState({});
    const [priceMovementState, setPriceMovementState] = useState(null);
    const [historicalDataLoaded, setHistoricalDataLoaded] = useState(false);

    // Instance refs for manipulating charts after initialization
    const candlestickInstanceRef = useRef(null);
    const areaInstanceRef = useRef(null);
    const barInstanceRef = useRef(null);
    const baselineInstanceRef = useRef(null);
    const histogramInstanceRef = useRef(null);
    const lineInstanceRef = useRef(null);

    // Calculate timezone offset (UTC to Local) in seconds
    const timezoneOffset = typeof window !== 'undefined' ? new Date().getTimezoneOffset() * 60 : 0;

    // Function to fetch historical kline data from Binance REST API
    const fetchHistoricalData = async (symbol, interval = '1m', limit = 1000) => {
        try {
            const response = await fetch(
                `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=${limit}`
            );
            const data = await response.json();

            const candlestickData = data.map(candle => ({
                time: Math.floor(candle[0] / 1000) - timezoneOffset,
                open: parseFloat(candle[1]),
                high: parseFloat(candle[2]),
                low: parseFloat(candle[3]),
                close: parseFloat(candle[4]),
            }));

            const areaData = data.map(candle => ({
                time: Math.floor(candle[0] / 1000) - timezoneOffset,
                value: parseFloat(candle[4]),
            }));

            return { candlestickData, areaData };
        } catch (error) {
            console.error('Error fetching historical data:', error);
            return { candlestickData: [], areaData: [] };
        }
    };

    // Load historical data before starting WebSocket streams
    useEffect(() => {
        setHistoricalDataLoaded(false);

        const loadHistoricalData = async () => {
            console.log('Fetching historical data for', symbol, 'interval', interval);
            const { candlestickData, areaData } = await fetchHistoricalData(symbol, interval);

            if (candlestickData.length > 0) {
                if (candlestickSeriesRef.current) {
                    candlestickSeriesRef.current.setData(candlestickData);
                }
                if (barSeriesRef.current) {
                    barSeriesRef.current.setData(candlestickData);
                }
                if (areaSeriesRef.current) {
                    areaSeriesRef.current.setData(areaData);
                }
                if (baselineSeriesRef.current) {
                    baselineSeriesRef.current.setData(areaData);
                }
                if (histogramSeriesRef.current) {
                    const histogramData = areaData.map((point, index) => {
                        if (index === 0) return { ...point, color: '#15803d' };
                        const prevValue = areaData[index - 1].value;
                        return {
                            ...point,
                            color: point.value >= prevValue ? '#15803d' : '#b91c1c'
                        };
                    });
                    histogramSeriesRef.current.setData(histogramData);
                }
                if (lineSeriesRef.current) {
                    lineSeriesRef.current.setData(areaData);
                }

                console.log(`Loaded ${candlestickData.length} historical candles`);
                setHistoricalDataLoaded(true);
            }
        };

        loadHistoricalData();
    }, [symbol, interval]);

    // Initialize charts
    useEffect(() => {
        const getChartOptions = (container) => ({
            width: container.clientWidth,
            height: 300,
            layout: {
                background: { type: "solid", color: "#ffffff" },
                textColor: "#000000",
            },
            grid: {
                vertLines: { color: "#e5e5e5" },
                horzLines: { color: "#e5e5e5" },
            },
            priceScale: { borderColor: "#000000" },
            timeScale: { borderColor: "#000000", timeVisible: true },
            localization: {
                locale: typeof window !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().locale : 'en-US',
            },
        });

        const candlestickChart = createChart(candlestickChartRef.current, getChartOptions(candlestickChartRef.current));
        candlestickInstanceRef.current = candlestickChart;
        const candlestickSeries = candlestickChart.addCandlestickSeries({
            upColor: "#15803d",
            downColor: "#b91c1c",
            borderVisible: true,
            wickUpColor: "#15803d",
            wickDownColor: "#b91c1c",
            borderUpColor: "#15803d",
            borderDownColor: "#b91c1c",
        });
        candlestickSeriesRef.current = candlestickSeries;

        const areaChart = createChart(areaChartRef.current, getChartOptions(areaChartRef.current));
        areaInstanceRef.current = areaChart;
        const areaSeries = areaChart.addAreaSeries({
            lineColor: "#000000",
            topColor: "#d1d5db",
            bottomColor: "#f3f4f6",
        });
        areaSeriesRef.current = areaSeries;

        const barChart = createChart(barChartRef.current, getChartOptions(barChartRef.current));
        barInstanceRef.current = barChart;
        const barSeries = barChart.addBarSeries({
            upColor: "#15803d",
            downColor: "#b91c1c",
            borderVisible: true,
            wickUpColor: "#15803d",
            wickDownColor: "#b91c1c",
        });
        barSeriesRef.current = barSeries;

        const baselineChart = createChart(baselineChartRef.current, getChartOptions(baselineChartRef.current));
        baselineInstanceRef.current = baselineChart;
        const baselineSeries = baselineChart.addBaselineSeries({
            baseValue: { type: "price", price: 25 },
            topLineColor: "#15803d",
            topFillColor1: "rgba(21, 128, 61, 0.28)",
            topFillColor2: "rgba(21, 128, 61, 0.05)",
            bottomLineColor: "#b91c1c",
            bottomFillColor1: "rgba(185, 28, 28, 0.05)",
            bottomFillColor2: "rgba(185, 28, 28, 0.28)",
        });
        baselineSeriesRef.current = baselineSeries;

        const histogramChart = createChart(histogramChartRef.current, getChartOptions(histogramChartRef.current));
        histogramInstanceRef.current = histogramChart;
        const histogramSeries = histogramChart.addHistogramSeries({
            color: "#15803d",
        });
        histogramSeriesRef.current = histogramSeries;

        const lineChart = createChart(lineChartRef.current, getChartOptions(lineChartRef.current));
        lineInstanceRef.current = lineChart;
        const lineSeries = lineChart.addLineSeries({
            lineColor: "#000000",
            lineWidth: 2,
        });
        lineSeriesRef.current = lineSeries;

        // Resize observer
        const observers = [];
        const charts = [
            { chart: candlestickChart, ref: candlestickChartRef.current },
            { chart: areaChart, ref: areaChartRef.current },
            { chart: barChart, ref: barChartRef.current },
            { chart: baselineChart, ref: baselineChartRef.current },
            { chart: histogramChart, ref: histogramChartRef.current },
            { chart: lineChart, ref: lineChartRef.current },
        ];

        charts.forEach(({ chart, ref }) => {
            const observer = new ResizeObserver((entries) => {
                if (entries[0].contentRect.width > 0) {
                    chart.applyOptions({ width: entries[0].contentRect.width });
                }
            });
            observer.observe(ref);
            observers.push(observer);
        });

        return () => {
            observers.forEach(obs => obs.disconnect());
            candlestickChart.remove();
            areaChart.remove();
            barChart.remove();
            baselineChart.remove();
            histogramChart.remove();
            lineChart.remove();

            candlestickInstanceRef.current = null;
            areaInstanceRef.current = null;
            barInstanceRef.current = null;
            baselineInstanceRef.current = null;
            histogramInstanceRef.current = null;
            lineInstanceRef.current = null;
        };
    }, []);

    // Scroll active chart to real-time when chart type changes
    useEffect(() => {
        const chartRefs = {
            'candlestick': candlestickInstanceRef,
            'area': areaInstanceRef,
            'bar': barInstanceRef,
            'baseline': baselineInstanceRef,
            'histogram': histogramInstanceRef,
            'line': lineInstanceRef,
        };

        const activeChart = chartRefs[activeChartType]?.current;
        if (activeChart) {
            // Small delay to ensure the DOM is updated and chart is visible
            setTimeout(() => {
                activeChart.timeScale().scrollToRealTime();
            }, 50);
        }
    }, [activeChartType]);

    // Ticker WebSocket for table data
    useEffect(() => {
        const streams = `${symbol}@ticker`;
        const binanceSocket = new WebSocket(
            `wss://stream.binance.com:9443/stream?streams=${streams}`
        );

        binanceSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (!message.data) return;
            const { s: symbol, ...data } = message.data;

            setTickers((prevTickers) => ({
                ...prevTickers,
                [symbol]: data,
            }));
        };

        return () => {
            binanceSocket.close();
        };
    }, [symbol]);

    // Unified Kline WebSocket for ALL chart types
    useEffect(() => {
        if (!historicalDataLoaded) return;

        const binanceSocket_Kline = new WebSocket(
            `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`
        );

        binanceSocket_Kline.onopen = () => {
            console.log(`WebSocket connection for kline_${interval} established.`);
        };

        binanceSocket_Kline.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const { e: eventType, E: eventTime, s: symbol } = message;
            const {
                c: closePrice,
                h: highPrice,
                l: lowPrice,
                o: openPrice,
                t: startTime,
                T: closeTime,
                x: klineClosed,
            } = message.k;

            setKline((prevTickers) => ({
                ...prevTickers,
                [symbol]: {
                    closePrice,
                    highPrice,
                    lowPrice,
                    openPrice,
                    eventTime,
                    startTime,
                    closeTime,
                    klineClosed,
                },
            }));

            const time = Math.floor(startTime / 1000) - timezoneOffset;
            const price = parseFloat(closePrice);

            // Update Candlestick and Bar charts
            const ohlcData = {
                time,
                open: parseFloat(openPrice),
                high: parseFloat(highPrice),
                low: parseFloat(lowPrice),
                close: price,
            };

            if (candlestickSeriesRef.current) candlestickSeriesRef.current.update(ohlcData);
            if (barSeriesRef.current) barSeriesRef.current.update(ohlcData);

            // Update Area, Line, Baseline, Histogram charts
            const singleValueData = { time, value: price };

            if (areaSeriesRef.current) areaSeriesRef.current.update(singleValueData);
            if (lineSeriesRef.current) lineSeriesRef.current.update(singleValueData);
            if (baselineSeriesRef.current) baselineSeriesRef.current.update(singleValueData);

            if (histogramSeriesRef.current) {
                // Determine color based on price vs previous kline close (simple logic)
                histogramSeriesRef.current.update({
                    ...singleValueData,
                    color: price >= parseFloat(openPrice) ? '#15803d' : '#b91c1c'
                });
            }
        };

        return () => {
            binanceSocket_Kline.close();
        };
    }, [symbol, interval, historicalDataLoaded]);

    // Ticker WebSocket only for Price Info and Table updates
    useEffect(() => {
        if (!historicalDataLoaded) return;

        const binanceSocket_Ticker = new WebSocket(
            `wss://stream.binance.com:9443/ws/${symbol}@ticker`
        );

        binanceSocket_Ticker.onopen = () => {
            console.log("WebSocket connection for ticker payload established.");
        };

        let previousLastPrice = null;
        let previousPriceChange = null;
        let previousPriceMovementState = null;

        binanceSocket_Ticker.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const {
                p: priceChange,
                c: lastPrice,
            } = message;

            let newPriceMovementState;
            if (previousPriceChange === null) {
                newPriceMovementState = null;
            } else {
                if (priceChange === previousPriceChange) {
                    newPriceMovementState = previousPriceMovementState;
                } else {
                    newPriceMovementState =
                        priceChange < previousPriceChange ? "DOWN" : "UP";
                }
            }

            previousPriceChange = priceChange;
            previousPriceMovementState = newPriceMovementState;
            setPriceMovementState(newPriceMovementState);
        };

        return () => {
            binanceSocket_Ticker.close();
        };
    }, [symbol, historicalDataLoaded]);

    return (
        <div className="min-h-screen bg-gray-50 font-mono">
            {/* Header */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Loading Indicator */}
                {!historicalDataLoaded && (
                    <div className="text-center py-12 border-2 border-black bg-white mb-8">
                        <div className="text-lg font-bold mb-2 uppercase">[ LOADING HISTORICAL DATA ]</div>
                        <div className="text-sm text-gray-600">Fetching 1000 candles from Binance...</div>
                    </div>
                )}

                {/* Price Info */}
                {Object.keys(tickers).length > 0 && (
                    <div className="bg-white border-2 border-black p-6 mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            {currentLogo && (
                                <div className="w-12 h-12 border-2 border-black flex items-center justify-center p-2 bg-white">
                                    <img src={currentLogo} alt={symbol} className="w-full h-full object-contain" />
                                </div>
                            )}
                            <div>
                                <div className="text-xs text-gray-500 mb-1 tracking-widest">TRADING PAIR</div>
                                <h2 className="text-3xl font-bold uppercase leading-none">
                                    {Object.keys(tickers).map((symbol) => symbol.toUpperCase())}
                                </h2>
                            </div>
                        </div>
                        {Object.values(tickers).map((data, index) => (
                            <div key={index} className="space-y-3">
                                <div className="text-4xl font-bold tabular-nums">
                                    ${parseFloat(data.c).toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: parseFloat(data.c) < 1 ? 6 : 2,
                                    })}
                                </div>
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`text-lg font-bold uppercase ${priceMovementState === "UP"
                                            ? "text-green-700"
                                            : priceMovementState === "DOWN"
                                                ? "text-red-700"
                                                : "text-gray-500"
                                            }`}
                                    >
                                        <span className="mr-2">
                                            {priceMovementState === "UP"
                                                ? "[▲]"
                                                : priceMovementState === "DOWN"
                                                    ? "[▼]"
                                                    : "[━]"}
                                        </span>
                                        <span>
                                            {parseFloat(data.p).toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                                minimumFractionDigits: 4,
                                                maximumFractionDigits: 4,
                                            })}
                                        </span>
                                        <span className="ml-2">
                                            ({parseFloat(data.P).toFixed(2)}%)
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase">24H CHANGE</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Interval and Charts Selection */}
                <div className="mb-8">
                    {/* Interval Selection */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest w-full text-center mb-1">
                            Select Interval
                        </div>
                        {['1m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '1d', '1w', '1M'].map((i) => (
                            <button
                                key={i}
                                onClick={() => setInterval(i)}
                                className={`px-3 py-1 text-[10px] font-bold uppercase transition-all border-2 border-black ${interval === i
                                    ? "bg-gray-800 text-white"
                                    : "bg-white text-black hover:bg-gray-100"
                                    }`}
                            >
                                {i}
                            </button>
                        ))}
                    </div>

                    {/* Chart Type Selection */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest w-full text-center mb-1">
                            Select Chart Type
                        </div>
                        {[
                            { id: 'candlestick', label: 'Candlestick' },
                            { id: 'area', label: 'Area' },
                            { id: 'bar', label: 'Bar' },
                            { id: 'baseline', label: 'Baseline' },
                            { id: 'histogram', label: 'Histogram' },
                            { id: 'line', label: 'Line' },
                        ].map((chart) => (
                            <button
                                key={chart.id}
                                onClick={() => setActiveChartType(chart.id)}
                                className={`px-4 py-2 text-xs font-bold uppercase transition-all border-2 border-black ${activeChartType === chart.id
                                    ? "bg-black text-white"
                                    : "bg-white text-black hover:bg-gray-100"
                                    }`}
                            >
                                [{chart.label}]
                            </button>
                        ))}
                    </div>

                    <div className="bg-white border-2 border-black p-4 relative min-h-[400px]">
                        <div className="text-xs text-gray-500 mb-4 tracking-widest text-center border-b-2 border-black pb-2">
                            ━━━ {activeChartType.toUpperCase()} ANALYSIS ━━━
                        </div>

                        <div className={activeChartType === 'candlestick' ? 'block' : 'hidden'}>
                            <div ref={candlestickChartRef}></div>
                        </div>
                        <div className={activeChartType === 'area' ? 'block' : 'hidden'}>
                            <div ref={areaChartRef}></div>
                        </div>
                        <div className={activeChartType === 'bar' ? 'block' : 'hidden'}>
                            <div ref={barChartRef}></div>
                        </div>
                        <div className={activeChartType === 'baseline' ? 'block' : 'hidden'}>
                            <div ref={baselineChartRef}></div>
                        </div>
                        <div className={activeChartType === 'histogram' ? 'block' : 'hidden'}>
                            <div ref={histogramChartRef}></div>
                        </div>
                        <div className={activeChartType === 'line' ? 'block' : 'hidden'}>
                            <div ref={lineChartRef}></div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border-2 border-black">
                    <div className="p-4 border-b-2 border-black">
                        <h3 className="text-sm font-bold uppercase tracking-wide">[ Market Data Table ]</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs font-mono">
                            <thead className="border-b-2 border-black">
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-3 text-left font-bold uppercase">Symbol</th>
                                    <th className="px-4 py-3 text-right font-bold uppercase">Last Price</th>
                                    <th className="px-4 py-3 text-right font-bold uppercase">Change</th>
                                    <th className="px-4 py-3 text-right font-bold uppercase">Change %</th>
                                    <th className="px-4 py-3 text-right font-bold uppercase">High</th>
                                    <th className="px-4 py-3 text-right font-bold uppercase">Low</th>
                                    <th className="px-4 py-3 text-right font-bold uppercase">Volume</th>
                                    <th className="px-4 py-3 text-right font-bold uppercase">Bid</th>
                                    <th className="px-4 py-3 text-right font-bold uppercase">Bid Qty</th>
                                    <th className="px-4 py-3 text-right font-bold uppercase">Ask</th>
                                    <th className="px-4 py-3 text-right font-bold uppercase">Ask Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(tickers).map(([symbol, data]) => (
                                    <tr key={symbol} className="border-b border-gray-300 hover:bg-gray-50">
                                        <th className="px-4 py-3 text-left font-bold uppercase">{symbol}</th>
                                        <td className="px-4 py-3 text-right tabular-nums">{parseFloat(data.c).toFixed(2)}</td>
                                        <td className={`px-4 py-3 text-right tabular-nums font-bold ${parseFloat(data.p) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                            {parseFloat(data.p).toFixed(4)}
                                        </td>
                                        <td className={`px-4 py-3 text-right tabular-nums font-bold ${parseFloat(data.P) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                            {parseFloat(data.P).toFixed(2)}%
                                        </td>
                                        <td className="px-4 py-3 text-right tabular-nums">{parseFloat(data.h).toFixed(2)}</td>
                                        <td className="px-4 py-3 text-right tabular-nums">{parseFloat(data.l).toFixed(2)}</td>
                                        <td className="px-4 py-3 text-right tabular-nums">{parseFloat(data.v).toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right tabular-nums">{parseFloat(data.b).toFixed(2)}</td>
                                        <td className="px-4 py-3 text-right tabular-nums">{parseFloat(data.B).toFixed(4)}</td>
                                        <td className="px-4 py-3 text-right tabular-nums">{parseFloat(data.a).toFixed(2)}</td>
                                        <td className="px-4 py-3 text-right tabular-nums">{parseFloat(data.A).toFixed(4)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* About Section */}
                {currentCoinInfo && (
                    <div className="bg-white border-2 border-black p-6 mt-8">
                        <h3 className="text-sm font-bold uppercase tracking-wide border-b-2 border-black pb-3 mb-4">
                            [ ABOUT {currentCoinInfo.name.toUpperCase()} ]
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed uppercase tracking-tight">
                            &gt; {currentCoinInfo.desc}
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
