import { getQuotations } from "@/actions/quotations";
import Link from "next/link";

export default async function AdminQuotationsPage() {
  const quotations = await getQuotations();

  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Quotations Management</h1>

      <div className="card">
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-black-lighter)" }}>
              <th style={{ padding: "12px 16px", color: "var(--color-text-muted)" }}>ID</th>
              <th style={{ padding: "12px 16px", color: "var(--color-text-muted)" }}>Customer</th>
              <th style={{ padding: "12px 16px", color: "var(--color-text-muted)" }}>Items</th>
              <th style={{ padding: "12px 16px", color: "var(--color-text-muted)" }}>Status</th>
              <th style={{ padding: "12px 16px", color: "var(--color-text-muted)" }}>Date</th>
              <th style={{ padding: "12px 16px", color: "var(--color-text-muted)", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotations.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "24px", textAlign: "center", color: "var(--color-text-muted)" }}>
                  No quotations found.
                </td>
              </tr>
            ) : (
              quotations.map((q) => (
                <tr key={q.id} style={{ borderBottom: "1px solid var(--color-black-lighter)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: "500", color: "var(--color-white)" }}>
                    {q.id.split("-")[0].toUpperCase()}
                  </td>
                  <td style={{ padding: "12px 16px" }}>{q.user.name}</td>
                  <td style={{ padding: "12px 16px" }}>{q.items.length} items</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span className="badge">{q.status}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>{new Date(q.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <Link href={`/admin/quotations/${q.id}`} className="btn-secondary" style={{ padding: "6px 12px", fontSize: "0.8rem" }}>
                      Review
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
