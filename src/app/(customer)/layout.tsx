"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./customer.css";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="customer-layout">
      <header className="customer-header">
        <div className="container header-container">
          <Link href="/" className="logo">
            Titla <span>Abhi Jewellers</span>
          </Link>
          <nav className="main-nav">
            <Link href="/" className={pathname === "/" ? "active" : ""}>Home</Link>
            <Link href="/products" className={pathname.startsWith("/products") ? "active" : ""}>Collections</Link>
            <Link href="/about" className={pathname === "/about" ? "active" : ""}>About Us</Link>
            <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>Contact</Link>
          </nav>
          <div className="header-actions">
            <Link href="/quotation-cart" className="icon-btn">
              🛍️ <span className="cart-count">0</span>
            </Link>
            <Link href="/login" className="btn-secondary">Sign In</Link>
          </div>
        </div>
      </header>

      <main className="customer-main">
        {children}
      </main>

      <footer className="customer-footer">
        <div className="container footer-container">
          <div className="footer-brand">
            <h2>Titla Abhi Jewellers</h2>
            <p>Elegance crafted for eternity. Premium luxury jewellery for every occasion.</p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <Link href="/products">Gold</Link>
            <Link href="/products">Diamond</Link>
            <Link href="/products">Platinum</Link>
            <Link href="/products">Silver</Link>
          </div>
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>123 Luxury Avenue, Jewellery District</p>
            <p>Email: info@abhijewellers.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Titla Abhi Jewellers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
