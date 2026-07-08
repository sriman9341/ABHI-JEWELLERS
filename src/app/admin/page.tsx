import prisma from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [totalProducts, totalCustomers, totalQuotations, pendingQuotations] = await Promise.all([
    prisma.product.count({ where: { deletedAt: null } }),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.quotation.count(),
    prisma.quotation.count({ where: { status: "PENDING" } }),
  ]);

  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="card stat-card">
          <h3>Total Customers</h3>
          <div className="value">{totalCustomers}</div>
        </div>
        
        <div className="card stat-card">
          <h3>Total Products</h3>
          <div className="value">{totalProducts}</div>
        </div>
        
        <div className="card stat-card">
          <h3>Total Quotations</h3>
          <div className="value">{totalQuotations}</div>
        </div>
        
        <div className="card stat-card">
          <h3>Pending Quotations</h3>
          <div className="value">{pendingQuotations}</div>
        </div>
      </div>
      
      <div className="card">
        <h2>Recent Activity</h2>
        <p style={{ marginTop: "16px", color: "var(--color-text-muted)" }}>
          Dashboard charts and recent activity logs will be displayed here.
        </p>
      </div>
    </div>
  );
}
