import { getProducts } from "@/actions/products";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1>Products Management</h1>
        <Link href="/admin/products/new" className="btn-primary">Add New Product</Link>
      </div>

      <div className="card">
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-black-lighter)" }}>
              <th style={{ padding: "12px 16px", color: "var(--color-text-muted)" }}>Image</th>
              <th style={{ padding: "12px 16px", color: "var(--color-text-muted)" }}>Name</th>
              <th style={{ padding: "12px 16px", color: "var(--color-text-muted)" }}>Category</th>
              <th style={{ padding: "12px 16px", color: "var(--color-text-muted)" }}>Metal</th>
              <th style={{ padding: "12px 16px", color: "var(--color-text-muted)" }}>Status</th>
              <th style={{ padding: "12px 16px", color: "var(--color-text-muted)", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "24px", textAlign: "center", color: "var(--color-text-muted)" }}>
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} style={{ borderBottom: "1px solid var(--color-black-lighter)" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ width: "40px", height: "40px", backgroundColor: "var(--color-black-lighter)", borderRadius: "4px" }}></div>
                  </td>
                  <td style={{ padding: "12px 16px", fontWeight: "500", color: "var(--color-white)" }}>{product.name}</td>
                  <td style={{ padding: "12px 16px" }}>{product.category?.name}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span className="badge">{product.metalType}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ color: product.isActive ? "var(--color-success)" : "var(--color-error)" }}>
                      {product.isActive ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <button className="btn-secondary" style={{ padding: "6px 12px", fontSize: "0.8rem", marginRight: "8px" }}>Edit</button>
                    <button className="btn-secondary" style={{ padding: "6px 12px", fontSize: "0.8rem", borderColor: "var(--color-error)", color: "var(--color-error)" }}>Delete</button>
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
