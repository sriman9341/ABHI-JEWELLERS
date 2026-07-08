import Link from "next/link";
import { getProducts } from "@/actions/products";

export default async function CustomerHomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: "relative",
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(to bottom, rgba(10,10,10,0.3), rgba(10,10,10,1)), url('https://images.unsplash.com/photo-1599643478524-fb66f70d00f7?q=80&w=2000&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div style={{ maxWidth: "800px", padding: "0 20px" }}>
          <h1 style={{ fontSize: "4rem", marginBottom: "24px", color: "var(--color-gold)", textShadow: "0 4px 12px rgba(0,0,0,0.5)" }}>
            Timeless Elegance
          </h1>
          <p style={{ fontSize: "1.25rem", marginBottom: "40px", color: "var(--color-white-off)" }}>
            Discover our exclusive collection of premium gold, diamond, and platinum jewellery crafted to perfection.
          </p>
          <Link href="/products" className="btn-primary" style={{ fontSize: "1.2rem", padding: "16px 40px" }}>
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={{ padding: "80px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 style={{ fontSize: "2.5rem", color: "var(--color-gold)", marginBottom: "16px" }}>Featured Masterpieces</h2>
          <div style={{ width: "80px", height: "2px", backgroundColor: "var(--color-gold)", margin: "0 auto" }}></div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
          {featuredProducts.length === 0 ? (
            <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "var(--color-text-muted)" }}>No products available yet.</p>
          ) : (
            featuredProducts.map((product) => (
              <div key={product.id} className="card" style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ height: "300px", backgroundColor: "var(--color-black-lighter)", position: "relative" }}>
                  {/* Mock Image Placeholder */}
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
      </section>
    </div>
  );
}
