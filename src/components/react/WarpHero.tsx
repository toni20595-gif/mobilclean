"use client";
import { Warp } from "@paper-design/shaders-react";

export default function WarpHero() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Warp
        style={{ height: "100%", width: "100%" }}
        proportion={0.4}
        softness={0.9}
        distortion={0.2}
        swirl={0.9}
        swirlIterations={12}
        shape="checks"
        shapeScale={0.08}
        scale={1}
        rotation={0}
        speed={0.7}
        colors={["#0D3080", "#00C896", "#1A56CC", "#4DCFB0"]}
      />
    </div>
  );
}
