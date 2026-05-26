"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function ScrollShowcaseFull() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.7, 0.9] : [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const stats = [
    { num: "Alsace", label: "Zone d'intervention" },
    { num: "100%", label: "Résultat garanti" },
    { num: "48h", label: "Délai moyen" },
    { num: "Éco", label: "Produits biodégradables" },
  ];

  return (
    <section style={{ paddingBlock: "clamp(80px, 10vw, 140px)", background: "#0D3080", overflow: "hidden" }}>
      {/* Intro */}
      <div style={{ maxWidth: "1200px", marginInline: "auto", paddingInline: "clamp(20px, 5vw, 60px)", marginBottom: "20px" }}>
        <span style={{
          display: "inline-flex", padding: "6px 14px",
          background: "rgba(0,200,150,0.2)", color: "#4DCFB0",
          border: "1px solid rgba(0,200,150,0.3)", borderRadius: "9999px",
          fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.06em",
          textTransform: "uppercase" as const, marginBottom: "16px",
        }}>
          Résultats
        </span>
        <h2 style={{ fontFamily: "'Syne', sans-serif", color: "white", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "12px" }}>
          Avant / Après : la différence est visible
        </h2>
        <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "560px" }}>
          Nous intervenons avec un <strong style={{ color: "#4DCFB0" }}>Kärcher professionnel</strong> et une machine à injection-extraction haute pression — un équipement de niveau industriel qui élimine saletés, bactéries et odeurs en profondeur, là où les appareils domestiques n'atteignent pas.
        </p>
      </div>

      {/* ContainerScroll */}
      <div
        ref={containerRef}
        style={{ height: "clamp(600px, 80vw, 900px)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "20px" }}
      >
        <div style={{ padding: "40px 20px", width: "100%", maxWidth: "900px", position: "relative", perspective: "1000px" }}>
          <motion.div style={{ translateY: translate, maxWidth: "700px", marginInline: "auto", textAlign: "center", marginBottom: "40px" }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4DCFB0", marginBottom: "8px" }}>
              Équipement professionnel Kärcher
            </p>
            <strong style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, color: "white", lineHeight: 1.1, display: "block" }}>
              Le bon outil pour un vrai résultat
            </strong>
          </motion.div>

          <motion.div style={{
            rotateX: rotate,
            scale,
            boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026",
            maxWidth: "860px",
            margin: "-48px auto 0",
            height: "clamp(280px, 45vw, 460px)",
            width: "100%",
            border: "4px solid #2A4A8A",
            padding: "8px",
            background: "#0D2060",
            borderRadius: "24px",
            overflow: "hidden",
          }}>
            <div style={{ height: "100%", width: "100%", overflow: "hidden", borderRadius: "16px" }}>
              <img
                src="/images/galerie/photo-karsher.jpg"
                alt="Nettoyage professionnel avec Kärcher - Mobil Clean"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: "1200px", marginInline: "auto", paddingInline: "clamp(20px, 5vw, 60px)", marginTop: "20px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: "2px",
          borderRadius: "24px",
          overflow: "hidden",
        }}>
          {stats.map(({ num, label }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.07)", padding: isMobile ? "24px 16px" : "32px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", textAlign: "center" }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: isMobile ? "1.6rem" : "2.4rem", fontWeight: 800, color: "#00C896", lineHeight: 1 }}>{num}</span>
              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
