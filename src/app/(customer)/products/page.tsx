import { getProducts } from "@/actions/products";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function CustomerProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const categoryFilter = searchParams.category;
  
  let products = await getProducts();
  const categories = await prisma.category.findMany();

  if (categoryFilter) {
    products = products.filter(p => p.category?.slug === categoryFilter);
  }

  return (
    <div className="container" style={{ padding: "64px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px" }}>
        <div>
          <h1 style={{ fontSize: "2.5rem", color: "var(--color-gold)", marginBottom: "16px" }}>Our Collection</h1>
          <p style={{ color: "var(--color-text-muted)", maxWidth: "600px" }}>
            Explore our meticulously crafted collection. Use the filters to find the perfect piece for your extraordinary moments.
          </p>
        </div>
        
        {/* Categories Filter */}
        <div style={{ display: "flex", gap: "12px", overflowX: "auto" }}>
          <Link 
            href="/products" 
            className={`badge ${!categoryFilter ? "active" : ""}`}
            style={{ 
              backgroundColor: !categoryFilter ? "var(--color-gold)" : "var(--color-black-lighter)",
              color: !categoryFilter ? "var(--color-black)" : "var(--color-white)",
              padding: "8px 16px",
              textDecoration: "none"
            }}
          >
            All
          </Link>
          {categories.map(c => (
            <Link 
              key={c.id} 
              href={`/products?category=${c.slug}`}
              className={`badge ${categoryFilter === c.slug ? "active" : ""}`}
              style={{ 
                backgroundColor: categoryFilter === c.slug ? "var(--color-gold)" : "var(--color-black-lighter)",
                color: categoryFilter === c.slug ? "var(--color-black)" : "var(--color-white)",
                padding: "8px 16px",
                textDecoration: "none"
              }}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
        {products.length === 0 ? (
          <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "var(--color-text-muted)", padding: "64px 0" }}>
            No products found in this category.
          </p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="card" style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "300px", backgroundColor: "var(--color-black-lighter)", position: "relative" }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "var(--color-text-muted)" }}>
                  Image
                </div>
              </div>
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: "1" }}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>{product.name}</h3>
                <p style={{ color: "var(--color-gold)", fontWeight: "600", marginBottom: "16px" }}>
                  {product.metalType} • {product.purity}K
                </p>
                <div style={{ marginTop: "auto" }}>
                  <Link href={`/products/${product.slug}`} className="btn-secondary" style={{ display: "block", textAlign: "center", width: "100%" }}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
