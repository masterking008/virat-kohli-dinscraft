"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GALLERY_ITEMS } from "./data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track   = trackRef.current!;
    const section = sectionRef.current!;

    // Initial card entrance
    gsap.from(".gallery-card", {
      autoAlpha: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 80%" },
    });

    // Pinned horizontal scroll
    const getX = () => -(track.scrollWidth - window.innerWidth + 80);

    gsap.to(track, {
      x: getX,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1.2,
        end: () => "+=" + Math.abs(getX()),
        invalidateOnRefresh: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="gallery-section">
      {/* Sticky header overlay */}
      <div className="gallery-header">
        <h2 className="gallery-section-title">On the Field</h2>
        <p className="gallery-hint">Scroll to explore →</p>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="gallery-track">
        {GALLERY_ITEMS.map((item, i) => (
          <div key={i} className="gallery-card">
            {/* Image */}
            <div className="gallery-card-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt={item.label} />
              <div className="gallery-card-index">
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>

            {/* Info below image */}
            <div className="gallery-card-info">
              <div>
                <p className="gallery-card-title">{item.label}</p>
                <p className="gallery-card-sub">{item.sub}</p>
              </div>
              <span className="gallery-card-arrow">View →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
