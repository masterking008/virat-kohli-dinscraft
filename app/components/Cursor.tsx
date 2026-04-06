"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const onMove = (e: MouseEvent) => {
      gsap.to(dotRef.current,  { x: e.clientX, y: e.clientY, duration: 0.06, ease: "none" });
      gsap.to(ringRef.current, { x: e.clientX, y: e.clientY, duration: 0.28, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, {});

  return (
    <div className="cursor">
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}
