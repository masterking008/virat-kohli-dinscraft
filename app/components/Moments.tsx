"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MOMENTS } from "./data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Moments() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track   = trackRef.current!;
    const section = sectionRef.current!;

    const getX = () => -(track.scrollWidth - window.innerWidth);

    // The tween that drives horizontal movement
    const tween = gsap.to(track, { x: getX, ease: "none", paused: true });

    // Pin + scrub — pass the tween as animation
    ScrollTrigger.create({
      trigger: section,
      pin: true,
      scrub: 1.6,
      end: () => "+=" + Math.abs(getX()),
      invalidateOnRefresh: true,
      animation: tween,
    });

    // Parallax on each image — containerAnimation takes the tween
    track.querySelectorAll<HTMLElement>(".moments-img-inner").forEach((img) => {
      gsap.fromTo(img,
        { x: "0%" },
        {
          x: "-18%",
          ease: "none",
          scrollTrigger: {
            trigger: img.closest(".moments-card") as Element,
            containerAnimation: tween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        }
      );
    });

    // Fade-in cards as they enter horizontally
    track.querySelectorAll<HTMLElement>(".moments-card").forEach((card) => {
      gsap.from(card, {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          containerAnimation: tween,
          start: "left 90%",
          toggleActions: "play none none none",
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="moments-section">
      {/* Header */}
      <div className="moments-header">
        <span className="section-eyebrow">Moments</span>
        <h2 className="moments-title">Frames of<br /><em>Greatness</em></h2>
        <p className="moments-hint">Scroll →</p>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="moments-track">
        {/* Leading spacer so first card isn't flush left */}
        <div className="moments-spacer" />

        {MOMENTS.map((m, i) => (
          <div
            key={i}
            className="moments-card"
            style={{
              width:  `${m.w}vw`,
              height: `${m.h}vh`,
              marginTop: `${m.top}vh`,
            }}
          >
            <div className="moments-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.img} alt={m.caption} className="moments-img-inner" />
            </div>
            <div className="moments-caption">
              <span className="moments-caption-title">{m.caption}</span>
              <span className="moments-caption-sub">{m.sub}</span>
            </div>
          </div>
        ))}

        <div className="moments-spacer" />
      </div>
    </section>
  );
}
