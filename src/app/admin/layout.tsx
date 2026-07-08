"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "./admin.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Quotations", path: "/admin/quotations" },
    { name: "Products", path: "/admin/products" },
    { name: "Categories", path: "/admin/categories" },
    { name: "Customers", path: "/admin/customers" },
    { name: "Settings (Rates)", path: "/admin/settings" },
  ];

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Titla Abhi Jewellers</h2>
          <span className="badge">Admin Portal</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`nav-link ${pathname === item.path ? "active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            ☰
          </button>
          <div className="header-actions">
            <span>Admin User</span>
            <button className="btn-secondary">Logout</button>
          </div>
        </header>
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
