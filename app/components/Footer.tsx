"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.to(ref.current, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 92%" },
    });
  }, { scope: ref });

  return (
    <footer ref={ref} className="footer" style={{ transform: "translateY(28px)" }}>
      <div>
        <p className="footer-logo">
          Virat <span>Kohli</span>
        </p>
        <p className="footer-copy">© 2026 Virat Kohli. All rights reserved.</p>
      </div>

      <div className="footer-socials">
        {[
          { label: "Instagram", handle: "@virat.kohli" },
          { label: "Twitter / X", handle: "@imVkohli" },
          { label: "YouTube",    handle: "Virat Kohli" },
        ].map((s) => (
          <div key={s.label}>
            <p className="footer-social-label">{s.label}</p>
            <p className="footer-social-handle">{s.handle}</p>
          </div>
        ))}
      </div>

      <a href="mailto:contact@viratkohli.team" className="footer-cta">
        Business Enquiries →
      </a>
    </footer>
  );
}
