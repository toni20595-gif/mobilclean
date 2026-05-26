"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="scroll-card"
    >
      <div className="scroll-card-inner">{children}</div>
    </motion.div>
  );
}

function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) {
  return (
    <motion.div style={{ translateY: translate }} className="scroll-header">
      {titleComponent}
    </motion.div>
  );
}

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1]);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="scroll-container" ref={containerRef}>
      <div className="scroll-inner">
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>

      <style>{`
        .scroll-container {
          height: clamp(600px, 80vw, 900px);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 20px;
        }
        .scroll-inner {
          padding: 40px 20px;
          width: 100%;
          max-width: 900px;
          position: relative;
          perspective: 1000px;
        }
        .scroll-header {
          max-width: 700px;
          margin-inline: auto;
          text-align: center;
          margin-bottom: 40px;
        }
        .scroll-card {
          max-width: 860px;
          margin: -48px auto 0;
          height: clamp(280px, 45vw, 480px);
          width: 100%;
          border: 4px solid #2A4A8A;
          padding: 8px;
          background: #0D2060;
          border-radius: 24px;
          overflow: hidden;
        }
        .scroll-card-inner {
          height: 100%;
          width: 100%;
          overflow: hidden;
          border-radius: 16px;
          background: #1A3580;
        }
        .scroll-card-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      `}</style>
    </div>
  );
}
