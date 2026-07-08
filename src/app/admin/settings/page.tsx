import { getMetalRates } from "@/actions/rates";

export default async function AdminSettingsPage() {
  const rates = await getMetalRates();

  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Settings (Metal Rates)</h1>

      <div className="dashboard-stats">
        {["GOLD", "SILVER", "PLATINUM"].map((metal) => {
          const rate = rates.find(r => r.metalType === metal);
          return (
            <div key={metal} className="card stat-card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h3>{metal} Rate (per gram)</h3>
              <div className="value">₹{rate?.pricePerGram || "0.00"}</div>
              <form action={async (formData) => {
                "use server";
                const { updateMetalRate } = await import("@/actions/rates");
                const price = Number(formData.get("price"));
                await updateMetalRate(metal, price);
              }} style={{ display: "flex", gap: "8px" }}>
                <input 
                  type="number" 
                  name="price" 
                  className="input-field" 
                  placeholder="New Rate" 
                  defaultValue={rate?.pricePerGram} 
                  required 
                />
                <button type="submit" className="btn-primary" style={{ padding: "8px 16px" }}>Update</button>
              </form>
            </div>
          )
        })}
      </div>
    </div>
  );
}
