"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const ref        = useRef<HTMLElement>(null);
  const ghostRef   = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax ghost number
    gsap.to(ghostRef.current, {
      yPercent: -22,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

      // Shrink hero on scroll
    gsap.to(wrapperRef.current, {
      scale: 0.33,
      borderRadius: "1rem",
      ease: "ease-in-out",
      scrollTrigger: {
        trigger: ".hero-marquee-stack",
        start: "top top",
        end: "+=600",
        scrub: 1,
      },
    });

    // Entry timeline
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from(".hero-eyebrow", { autoAlpha: 0, y: 16, duration: 0.7, ease: "power3.out" }, 0.15)
      .from(".hero-char", {
        yPercent: 115,
        stagger: 0.04,
        duration: 1.2,
        ease: "power4.out",
      }, 0.2)
      .from(".hero-desc",  { autoAlpha: 0, y: 18, duration: 0.7, ease: "power3.out" }, "-=0.45")
      .from(".hero-stat",  { autoAlpha: 0, y: 16, stagger: 0.1,  duration: 0.6, ease: "power3.out" }, "-=0.4")
      .from(".hero-scroll-hint", { autoAlpha: 0, duration: 0.5 }, "-=0.3");
  }, { scope: ref });

  return (
    <div ref={wrapperRef} className="hero-wrapper">
    <section id="hero" ref={ref} className="hero-section">
      {/* Ghost number */}
      <div ref={ghostRef} className="hero-ghost" aria-hidden>18</div>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <p className="hero-eyebrow">The King of Cricket</p>

        {/* VIRAT */}
        <div className="char-row">
          {"VIRAT".split("").map((ch, i) => (
            <span key={i} className="char-wrap">
              <span className="hero-char">{ch}</span>
            </span>
          ))}
        </div>

        {/* KOHLI — primary blue */}
        <div className="char-row">
          {"KOHLI".split("").map((ch, i) => (
            <span key={i} className="char-wrap">
              <span className="hero-char primary">{ch}</span>
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div className="hero-bottom">
          <p className="hero-desc">
            Batsman. Captain. Icon. Eighteen years of excellence — rewriting
            every record cricket has ever known.
          </p>
          <div className="hero-stats">
            {[
              ["100+", "Centuries"],
              ["27k+", "Int'l Runs"],
              ["18",   "Years"],
            ].map(([val, label]) => (
              <div key={label} className="hero-stat">
                <p className="hero-stat-val">{val}</p>
                <p className="hero-stat-label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
