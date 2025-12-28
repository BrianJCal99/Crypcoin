"use client";

import Link from "next/link";

export default function AboutPage() {
    const sections = [
        {
            id: "history",
            title: "THE PROJECT",
            content: "CRYPCOIN IS A PROFESSIONAL-GRADE CRYPTOCURRENCY MONITORING AND ANALYSIS PLATFORM. BUILT FOR BOTH NOVICE TRACKERS AND SEASONED TRADERS, WE PROVIDE LURID CLARITY INTO THE VOLATILE DIGITAL ASSET MARKETS."
        },
        {
            id: "data",
            title: "DATA INTEGRITY",
            content: "OUR MARKET FEED IS POWERED BY THE BINANCE REAL-TIME WEBSOCKET API. WE FETCH 1000+ HISTORICAL CANDLES FOR EVERY ASSET TO ENSURE YOUR TECHNICAL ANALYSIS IS BACKED BY DEEP MARKET HISTORY."
        },
        {
            id: "charting",
            title: "VISUALIZATION",
            content: "WE UTILIZE TRADINGVIEW'S LIGHTWEIGHT CHARTS™ LIBRARY TO RENDER HIGH-PERFORMANCE, INTERACTIVE FINANCIAL CHARTS. FROM CANDLESTICKS TO BAR HISTOGRAMS, OUR VISUALIZATIONS ARE OPTIMIZED FOR RESPONDIVENESS AND PRECISION."
        },
        {
            id: "mission",
            title: "MISSION",
            content: "TO DEMOCRATIZE ACCESS TO HIGH-FIDELITY FINANCIAL DATA THROUGH A MINIMALIST, TERMINAL-INSPIRED INTERFACE THAT PRIORITIZES SPEED, READABILITY, AND AESTHETIC RIGOR."
        }
    ];

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-mono">
            <div className="mb-16 text-center">
                <div className="text-xs text-gray-500 mb-2 tracking-widest uppercase">━━━ DOCUMENTATION ━━━</div>
                <h1 className="text-5xl font-black mb-6 text-black uppercase tracking-tighter">ABOUT CRYPCOIN</h1>
                <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-400">
                    <span>[ EST. 2025 ]</span>
                    <span>•</span>
                    <span>[ v1.0.0 ]</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {sections.map((section) => (
                    <div key={section.id} className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px]">
                        <h2 className="text-lg font-black mb-4 border-b-2 border-black pb-2 inline-block">
                            [ {section.title} ]
                        </h2>
                        <p className="text-sm text-gray-700 leading-relaxed uppercase tracking-tight">
                            &gt; {section.content}
                        </p>
                    </div>
                ))}
            </div>

            <div className="border-2 border-black p-10 bg-black text-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase underline decoration-4 underline-offset-8 decoration-gray-700">
                            TECH STACK & CORE
                        </h3>
                        <div className="space-y-4 text-sm font-bold opacity-80 uppercase tracking-widest">
                            <p className="flex items-center gap-3">
                                <span className="text-gray-500">01/</span> NEXT.JS 15 (APP ROUTER)
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="text-gray-500">02/</span> TAILWIND CSS
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="text-gray-500">03/</span> LIGHTWEIGHT CHARTS BY TRADINGVIEW
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="text-gray-500">04/</span> BINANCE WEBSOCKET API
                            </p>
                        </div>
                    </div>
                    <div className="border-l-0 lg:border-l-2 border-gray-700 lg:pl-10 space-y-6">
                        <p className="text-xs tracking-widest leading-relaxed text-gray-400 uppercase">
                            CRYPCOIN IS AN OPEN-ACCESS TOOLSET DESIGNED FOR MODERN TRADERS. WE FOCUS ON STRIPPING AWAY THE NOISE OF TRADITIONAL TRADING INTERFACES, LEAVING ONLY THE RAW DATA AND TECHNICAL PRECISION NECESSARY FOR INFORMED DECISION MAKING.
                        </p>
                        <Link
                            href="/markets"
                            className="inline-block px-8 py-3 bg-white text-black border-2 border-white font-black uppercase text-xs hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] active:shadow-none"
                        >
                            [ EXPLORE ALL MARKETS ]
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
