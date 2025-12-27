"use client";

export default function Footer() {
    return (
        <footer className="border-t-2 border-black bg-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="text-center">
                    <div className="text-gray-600 text-xs uppercase tracking-widest leading-relaxed">
                        <p className="mb-2">© 2025 CRYPCOIN</p>
                        <p className="mb-1">
                            DATA STREAM: <span className="text-black font-bold">BINANCE API</span>
                        </p>
                        <p className="mb-3">
                            MARKET CHARTS: <span className="text-black font-bold">TRADINGVIEW LIGHTWEIGHT</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
