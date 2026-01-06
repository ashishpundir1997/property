"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, Building2, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="p-2 bg-orange-500 rounded-lg">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-900 hidden sm:inline">
              PropertyHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <NavLink href="/" icon={<Building2 className="w-4 h-4" />} label="Properties" />
            <NavLink href="/portfolio" label="Portfolio" />
            <NavLink href="/admin" icon={<LayoutDashboard className="w-4 h-4" />} label="Admin" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-slate-900" />
            ) : (
              <Menu className="w-6 h-6 text-slate-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 px-2">
            <div className="flex flex-col gap-1.5">
              <MobileNavLink href="/" label="Properties" />
              <MobileNavLink href="/portfolio" label="Portfolio" />
              <MobileNavLink href="/admin" label="Admin" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-slate-700 hover:text-orange-600 font-medium transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2.5 text-slate-700 hover:text-orange-600 hover:bg-slate-50 font-medium rounded transition-colors"
    >
      {label}
    </Link>
  );
}
