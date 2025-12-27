"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Markets", href: "/markets" },
        { name: "About", href: "/about" },
    ];

    return (
        <nav className="border-b-2 border-black bg-white sticky top-0 z-[100] font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center group">
                            <span className="text-2xl font-black tracking-tighter border-2 border-black px-2 group-hover:bg-black group-hover:text-white transition-all duration-200">
                                CRYPCOIN
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-xs font-black uppercase tracking-widest transition-all duration-200 hover:bg-black hover:text-white px-3 py-1 border-2 ${isActive ? "bg-black text-white border-black" : "text-black border-transparent hover:border-black"
                                        }`}
                                >
                                    [ {link.name} ]
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 border-2 border-black text-black hover:bg-black hover:text-white transition-all"
                        >
                            <span className="sr-only">Open main menu</span>
                            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1">
                                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`sm:hidden bg-white border-b-2 border-black transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="px-4 pt-2 pb-6 space-y-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block text-center text-xs font-black uppercase tracking-widest py-3 border-2 transition-all ${isActive
                                    ? "bg-black text-white border-black"
                                    : "text-black border-black hover:bg-black hover:text-white"
                                    }`}
                            >
                                [ {link.name} ]
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
