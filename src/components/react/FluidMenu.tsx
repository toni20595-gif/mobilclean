import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RADIUS = 165;

function getPos(index: number, total: number) {
  // Arc from 100° (down-left) to 195° (left) — keeps items clear of right viewport edge
  const startDeg = 100;
  const endDeg = 195;
  const deg = startDeg + ((endDeg - startDeg) * index) / (total - 1);
  const rad = (deg * Math.PI) / 180;
  return {
    x: Math.round(Math.cos(rad) * RADIUS),
    y: Math.round(Math.sin(rad) * RADIUS),
  };
}

const links = [
  { href: "/contact", label: "Contact" },
  { href: "/entreprises", label: "Entreprises" },
  { href: "/galerie", label: "Galerie" },
  { href: "/services", label: "Prestations" },
  { href: "/", label: "Accueil" },
];

export default function FluidMenu({ currentPath = "/" }: { currentPath?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && open) close();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  const close = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };

  const toggle = () => {
    const next = !open;
    setOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  const btnBg = scrolled
    ? open ? "rgba(13,48,128,0.12)" : "rgba(13,48,128,0.06)"
    : open ? "rgba(255,255,255,0.24)" : "rgba(255,255,255,0.12)";
  const btnBorder = scrolled
    ? open ? "rgba(13,48,128,0.28)" : "rgba(13,48,128,0.15)"
    : open ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.2)";
  const btnColor = scrolled ? "#0D3080" : "white";

  return (
    <div
      style={{
        position: "relative",
        width: 44,
        height: 44,
        zIndex: 101,
      }}
    >
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 89,
              background: "rgba(13,48,128,0.55)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Menu items — fan out in arc from button center */}
      <AnimatePresence>
        {open &&
          links.map((item, i) => {
            const { x, y } = getPos(i, links.length);
            const isActive = currentPath === item.href;
            return (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={close}
                // Items start collapsed at button center, then spring to arc position
                initial={{ opacity: 0, x: 22, y: 22, scale: 0.25 }}
                animate={{ opacity: 1, x: x + 22, y: y + 22, scale: 1 }}
                exit={{
                  opacity: 0,
                  x: 22,
                  y: 22,
                  scale: 0.25,
                  transition: {
                    delay: (links.length - 1 - i) * 0.04,
                    duration: 0.18,
                    ease: "easeIn",
                  },
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 24,
                  delay: i * 0.07,
                }}
                style={{
                  position: "absolute",
                  top: -22,
                  left: -22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 44,
                  padding: "0 20px",
                  borderRadius: 22,
                  background: isActive ? "#00C896" : "white",
                  color: "#0D3080",
                  fontFamily: "var(--font-corps, 'DM Sans', sans-serif)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  zIndex: 95,
                  boxShadow: isActive
                    ? "0 6px 24px rgba(0,200,150,0.45)"
                    : "0 4px 20px rgba(13,48,128,0.18)",
                  letterSpacing: "0.01em",
                  userSelect: "none",
                }}
              >
                {item.label}
              </motion.a>
            );
          })}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={toggle}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.92 }}
        style={{
          position: "relative",
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: `1px solid ${btnBorder}`,
          background: btnBg,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          color: btnColor,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 92,
          transition: "background 0.3s, border-color 0.3s, color 0.3s",
          outline: "none",
        }}
      >
        <svg
          width="22"
          height="16"
          viewBox="0 0 22 16"
          fill="none"
          style={{ overflow: "visible" }}
        >
          <motion.line
            x1="0"
            y1="2"
            x2="22"
            y2="2"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={false}
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ originX: "11px", originY: "2px" }}
          />
          <motion.line
            x1="0"
            y1="14"
            x2="22"
            y2="14"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={false}
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ originX: "11px", originY: "14px" }}
          />
        </svg>
      </motion.button>
    </div>
  );
}
