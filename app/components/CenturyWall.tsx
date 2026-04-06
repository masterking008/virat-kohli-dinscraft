"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CENTURIES } from "./data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CenturyWall() {
  const ref        = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // Animated count-up
    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: 100,
      duration: 2.8,
      ease: "power2.out",
      onUpdate() {
        if (counterRef.current)
          counterRef.current.textContent = Math.round(proxy.val).toString();
      },
      scrollTrigger: {
        trigger: ref.current,
        start: "top 72%",
        once: true,
      },
    });

    // Header reveal
    gsap.from(".century-header", {
      autoAlpha: 0,
      y: 45,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 78%" },
    });

    // Batch card reveals
    ScrollTrigger.batch(".century-card", {
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.75, ease: "power3.out" }
        ),
      start: "top 88%",
    });

    // Footer note
    gsap.to(".century-footer-note", {
      autoAlpha: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: ".century-footer-note", start: "top 92%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="century-section">
      <div className="century-header">
        <span className="primary-bar" />
        <p className="section-eyebrow">Century Wall</p>
        <div className="century-big">
          <span ref={counterRef}>0</span>
          <br />
          <span className="count">Centuries</span>
        </div>
      </div>

      <div className="century-grid">
        {CENTURIES.map((c, i) => (
          <div key={i} className="century-card">
            <p className="century-card-format">{c.format}</p>
            <p className="century-card-num">{c.num}</p>
            <p className="century-card-vs">vs {c.vs}</p>
            <p className="century-card-year">{c.year}</p>
          </div>
        ))}
      </div>

      <p className="century-footer-note">
        Showing milestone centuries — full record available
      </p>
    </section>
  );
}
