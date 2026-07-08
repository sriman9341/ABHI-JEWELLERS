import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ProductDetailsPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true, images: true }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="container" style={{ padding: "64px 20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px" }}>
        
        {/* Images Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ width: "100%", height: "600px", backgroundColor: "var(--color-black-lighter)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)" }}>
            Main Image placeholder
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ height: "100px", backgroundColor: "var(--color-black-lighter)", borderRadius: "4px" }}></div>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "24px" }}>
            <span style={{ color: "var(--color-gold)", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.875rem" }}>
              {product.category?.name}
            </span>
            <h1 style={{ fontSize: "3rem", margin: "8px 0" }}>{product.name}</h1>
            <p style={{ color: "var(--color-text-muted)" }}>SKU: {product.sku}</p>
          </div>

          <div style={{ borderTop: "1px solid var(--color-black-lighter)", borderBottom: "1px solid var(--color-black-lighter)", padding: "24px 0", margin: "24px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>Metal</p>
              <p style={{ fontWeight: "600" }}>{product.metalType}</p>
            </div>
            <div>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>Purity</p>
              <p style={{ fontWeight: "600" }}>{product.purity} Karat</p>
            </div>
            <div>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>Weight</p>
              <p style={{ fontWeight: "600" }}>{product.weight} grams</p>
            </div>
            <div>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>Availability</p>
              <p style={{ fontWeight: "600", color: product.isActive ? "var(--color-success)" : "var(--color-error)" }}>
                {product.isActive ? "In Stock" : "Out of Stock"}
              </p>
            </div>
          </div>

          <p style={{ lineHeight: "1.8", color: "var(--color-text-main)", marginBottom: "40px" }}>
            {product.description}
          </p>

          <div style={{ display: "flex", gap: "16px", marginTop: "auto" }}>
            <button className="btn-primary" style={{ flex: 1, padding: "16px" }}>
              Add to Quotation Cart
            </button>
            <button className="btn-secondary" style={{ padding: "16px" }}>
              ♡ Wishlist
            </button>
          </div>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginTop: "16px", textAlign: "center" }}>
            * This item will be added to your quotation cart. An admin will review and send you the final price.
          </p>
        </div>
      </div>
    </div>
  );
}
