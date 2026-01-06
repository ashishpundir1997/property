"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, Search } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg group-hover:shadow-lg transition-shadow">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent hidden sm:inline">
              PropertyCo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/" label="Properties" />
            <NavLink href="/portfolio" label="Portfolio" />
            <NavLink href="/admin" label="Admin" />
          </div>

          {/* Desktop Search & Button */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-slate-600" />
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105">
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200/50">
            <div className="flex flex-col gap-2 pt-4">
              <MobileNavLink href="/" label="Properties" />
              <MobileNavLink href="/portfolio" label="Portfolio" />
              <MobileNavLink href="/admin" label="Admin" />
              <button className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-medium mt-2">
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-slate-700 hover:text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-all duration-200"
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-slate-700 hover:text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-all duration-200"
    >
      {label}
    </Link>
  );
}
