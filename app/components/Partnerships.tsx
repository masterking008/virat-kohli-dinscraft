"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PARTNERS } from "./data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Partnerships() {
  const ref     = useRef<HTMLElement>(null);
  const doubled = [...PARTNERS, ...PARTNERS];

  useGSAP(() => {
    gsap.to(".partners-header", {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 78%" },
    });

    ScrollTrigger.batch(".partner-card", {
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out" }
        ),
      start: "top 88%",
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="partners-section">
      {/* Header */}
      <div className="partners-header" style={{ transform: "translateY(18px)" }}>
        <span className="primary-bar" />
        <p className="partners-header-label">Partnerships</p>
        <h2 className="partners-header-title">Off the Field</h2>
      </div>

      {/* Scrolling marquee of partner names */}
      <div className="partners-marquee-outer">
        <div className="partners-track">
          {doubled.map((p, i) => (
            <span
              key={i}
              className="partners-track-item"
              style={{
                color:
                  i % 3 === 0
                    ? "var(--black)"
                    : i % 3 === 1
                    ? "var(--grey)"
                    : "var(--primary)",
              }}
            >
              {p.name}
            </span>
          ))}
        </div>
      </div>

      {/* Partner detail cards */}
      <div className="partners-grid">
        {PARTNERS.slice(0, 4).map((p, i) => (
          <div key={i} className="partner-card">
            <p className="partner-card-name">{p.name}</p>
            <p className="partner-card-sub">Official Partner · Since {p.since}</p>
            <div className="partner-card-bar" />
          </div>
        ))}
      </div>
    </section>
  );
}
