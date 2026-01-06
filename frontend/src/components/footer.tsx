"use client";

import React from "react";
import Link from "next/link";
import { Home, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">PropertyHub</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your trusted platform for property listings and management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm hover:text-orange-400 transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm hover:text-orange-400 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm hover:text-orange-400 transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-5">Contact</h4>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-orange-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href="mailto:info@propertyhub.com" className="hover:text-orange-400 transition-colors">
                  info@propertyhub.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>123 Property Street, City, State 12345</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-semibold mb-5">Hours</h4>
            <ul className="space-y-2.5 text-sm">
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 sm:pt-10">
          {/* Bottom Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <p className="text-sm text-slate-400">
              &copy; {currentYear} PropertyHub. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link href="#" className="text-sm text-slate-400 hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-slate-400 hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
