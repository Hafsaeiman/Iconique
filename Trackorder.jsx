import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const statusConfig = {
  placed:            { label: "Order Placed",       color: "#8e44ad", bg: "#f5eafb" },
  payment_confirmed: { label: "Payment Confirmed",  color: "#16a085", bg: "#e8f8f5" },
  processing:        { label: "Processing",         color: "#8e44ad", bg: "#f5eafb" },
  dispatched:        { label: "Dispatched",         color: "#2980b9", bg: "#ebf5fb" },
  out_for_delivery:  { label: "Out for Delivery",   color: "#e67e22", bg: "#fff5eb" },
  delivered:         { label: "Delivered",          color: "#27ae60", bg: "#eafaf1" },
  cancelled:         { label: "Cancelled",          color: "#c0392b", bg: "#fdecea" },
  returned:          { label: "Returned",           color: "#7f8c8d", bg: "#f4f6f7" },
};

export default function TrackOrder() {
  const location = useLocation();
  const prefillId = location.state?.prefillId ?? "";

  const [query, setQuery] = useState(prefillId);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prefillId) {
      handleTrack(prefillId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTrack = async (id) => {
    const q = (id ?? query).trim().toUpperCase();

    if (!q) {
      setError("Please enter an order ID.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await fetch(
        `http://localhost:5000/api/orders/track/${q}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order not found");
      }

      setResult(data.order);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sc = result
    ? (statusConfig[result.status] ?? { label: result.status, color: "#555", bg: "#f0f0f0" })
    : null;

  return (
    <div style={styles.page}>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <p style={styles.eyebrow}>ICONIQUE</p>
          <h1 style={styles.heroTitle}>Track Your Order</h1>
          <p style={styles.heroSub}>Know exactly where your package is, at every step.</p>
        </div>
      </div>

      <div style={styles.container}>
        {/* Search */}
        <div style={styles.searchCard}>
          <h2 style={styles.searchTitle}>Enter Order ID</h2>
          <p style={styles.searchHint}>
            Find your order ID in the confirmation email, or use the one from your order summary.
          </p>
          <div style={styles.searchRow}>
            <input
              type="text"
              placeholder="e.g. IC-2026-1234"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              style={styles.input}
            />
            <button
              onClick={() => handleTrack()}
              style={styles.searchBtn}
              disabled={loading}
            >
              {loading ? "Tracking…" : "Track →"}
            </button>
          </div>
          {error && <p style={styles.error}>{error}</p>}
        </div>

        {/* Result */}
        {result && (
          <div style={styles.resultCard}>
            <div style={{ ...styles.statusBadge, background: sc.bg, color: sc.color }}>
              ● {sc.label}
            </div>

            <div style={styles.metaGrid}>
              {[
                ["Product",          result.items?.map(i => i.name).join(", ") ?? "—"],
                ["Order Date",       new Date(result.createdAt).toLocaleDateString()],
                ["Est. Delivery",    result.estimatedDelivery ?? "—"],
                ["Courier",          result.courier ?? "—"],
                ["Tracking ID",      result.trackingNumber || "Not assigned yet"],
                ["Delivery Address", result.deliveryAddress
                  ? `${result.deliveryAddress.address}, ${result.deliveryAddress.city}`
                  : "—"],
              ].map(([label, val]) => (
                <div key={label} style={styles.metaItem}>
                  <span style={styles.metaLabel}>{label}</span>
                  <span style={styles.metaValue}>{val}</span>
                </div>
              ))}
            </div>

            <h3 style={styles.timelineTitle}>Delivery Progress</h3>
            <div style={styles.timeline}>
              {/* FIX: optional chaining to avoid crash if timeline is missing */}
              {(result.timeline ?? []).map((step, i) => (
                <div key={i} style={styles.timelineStep}>
                  <div style={styles.timelineLeft}>
                    <div style={{
                      ...styles.dot,
                      background: step.done ? (step.active ? "#c9a96e" : "#1a1a1a") : "#ddd",
                      boxShadow: step.active ? "0 0 0 5px rgba(201,169,110,0.25)" : "none",
                    }} />
                    {i < (result.timeline ?? []).length - 1 && (
                      <div style={{ ...styles.line, background: step.done && !step.active ? "#1a1a1a" : "#e0d4c8" }} />
                    )}
                  </div>
                  <div style={styles.timelineRight}>
                    <span style={{
                      ...styles.stepLabel,
                      color: step.done ? "#1a1a1a" : "#bbb",
                      fontWeight: step.active ? 700 : 500,
                    }}>
                      {step.label}{step.active ? " 📦" : ""}
                    </span>
                    <span style={styles.stepDate}>{step.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.helpBar}>
              <span style={styles.helpText}>Need help with this order?</span>
              <a href="mailto:care@iconique.com" style={styles.helpLink}>Contact Support →</a>
            </div>
          </div>
        )}

        {/* Info cards (shown only when no result) */}
        {!result && (
          <div style={styles.infoRow}>
            {[
              { icon: "📬", title: "Check Your Email",  desc: "Your order ID was sent in the confirmation email right after purchase." },
              { icon: "💬", title: "Check Your SMS",    desc: "We also send real-time SMS updates to your registered mobile number." },
              { icon: "📞", title: "Call Us",           desc: "Can't find it? Call +92 321 456-7890 and we'll look it up for you." },
            ].map((item) => (
              <div key={item.title} style={styles.infoCard}>
                <span style={{ fontSize: 30 }}>{item.icon}</span>
                <strong style={styles.infoTitle}>{item.title}</strong>
                <p style={styles.infoDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page:         { fontFamily:"'Georgia', serif", color:"#1a1a1a", minHeight:"100vh", background:"#fff" },
  hero:         { position:"relative", height:300, background:"linear-gradient(135deg,#1a0a00,#3d1f00,#6b3a00)", display:"flex", alignItems:"center", justifyContent:"center" },
  heroOverlay:  { position:"absolute", inset:0, background:"repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 0,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 12px)" },
  heroContent:  { position:"relative", textAlign:"center", padding:"0 20px" },
  eyebrow:      { color:"#c9a96e", letterSpacing:6, fontSize:12, marginBottom:12, textTransform:"uppercase" },
  heroTitle:    { color:"#fff", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:400, margin:"0 0 12px" },
  heroSub:      { color:"rgba(255,255,255,0.65)", fontSize:15 },
  container:    { maxWidth:760, margin:"0 auto", padding:"60px 24px" },
  searchCard:   { background:"#faf8f5", border:"1px solid #e8ddd0", borderRadius:16, padding:"40px 32px", marginBottom:36 },
  searchTitle:  { fontSize:20, fontWeight:400, margin:"0 0 8px" },
  searchHint:   { fontSize:13, color:"#888", margin:"0 0 24px", lineHeight:1.6 },
  searchRow:    { display:"flex", gap:12, flexWrap:"wrap" },
  input:        { flex:1, minWidth:200, padding:"14px 18px", border:"1px solid #d0c4b0", borderRadius:8, fontSize:15, outline:"none", fontFamily:"inherit" },
  searchBtn:    { padding:"14px 28px", background:"#1a1a1a", color:"#c9a96e", border:"none", borderRadius:8, fontSize:15, cursor:"pointer", fontFamily:"inherit", fontWeight:600, whiteSpace:"nowrap" },
  error:        { marginTop:14, fontSize:13, color:"#c0392b", whiteSpace:"pre-line" },
  resultCard:   { background:"#fff", border:"1px solid #e8ddd0", borderRadius:16, padding:"36px 32px" },
  statusBadge:  { display:"inline-block", padding:"8px 20px", borderRadius:50, fontWeight:600, fontSize:14, marginBottom:28, letterSpacing:0.5 },
  metaGrid:     { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16, marginBottom:36 },
  metaItem:     { display:"flex", flexDirection:"column", gap:4, background:"#faf8f5", borderRadius:10, padding:"14px 16px" },
  metaLabel:    { fontSize:11, color:"#999", textTransform:"uppercase", letterSpacing:1 },
  metaValue:    { fontSize:14, color:"#1a1a1a", fontWeight:500 },
  timelineTitle:{ fontSize:17, fontWeight:600, marginBottom:24, color:"#1a1a1a" },
  timeline:     { display:"flex", flexDirection:"column" },
  timelineStep: { display:"flex", gap:18, minHeight:60 },
  timelineLeft: { display:"flex", flexDirection:"column", alignItems:"center", width:20, flexShrink:0 },
  dot:          { width:16, height:16, borderRadius:"50%", flexShrink:0, marginTop:2, transition:"all 0.3s ease" },
  line:         { flex:1, width:2, margin:"4px 0" },
  timelineRight:{ display:"flex", flexDirection:"column", gap:2, paddingBottom:20 },
  stepLabel:    { fontSize:14 },
  stepDate:     { fontSize:12, color:"#999" },
  helpBar:      { marginTop:32, background:"#faf8f5", border:"1px solid #e8ddd0", borderRadius:10, padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 },
  helpText:     { fontSize:14, color:"#555" },
  helpLink:     { color:"#c9a96e", textDecoration:"none", fontWeight:600, fontSize:14 },
  infoRow:      { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:20 },
  infoCard:     { background:"#faf8f5", border:"1px solid #e8ddd0", borderRadius:12, padding:"28px 20px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:10 },
  infoTitle:    { fontSize:15, color:"#1a1a1a" },
  infoDesc:     { fontSize:13, color:"#777", lineHeight:1.6, margin:0 },
};