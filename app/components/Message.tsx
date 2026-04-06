"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LINES = [
  { text: "Self-belief",   font: "bebas", accent: true  },
  { text: "and hard work", font: "serif", accent: false },
  { text: "will always",   font: "serif", accent: false },
  { text: "earn you",      font: "bebas", accent: false },
  { text: "success.",      font: "bebas", accent: true  },
];

export default function Message() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const lines = ref.current!.querySelectorAll<HTMLElement>(".msg-line-inner");

    lines.forEach((el, i) => {
      gsap.from(el, {
        yPercent: 110,
        duration: 1,
        ease: "power4.out",
        delay: i * 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });
    });

    const attr = ref.current!.querySelector<HTMLElement>(".msg-attr");
    gsap.fromTo(attr,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: LINES.length * 0.12 + 0.3,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="msg-section">
      <div className="msg-lines">
        {LINES.map((line, i) => (
          <div key={i} className="msg-line-wrap">
            <div className="msg-line-inner">
              <span className={`msg-word ${line.font === "bebas" ? "msg-bebas" : "msg-serif"}${line.accent ? " msg-accent" : ""}`}>
                {line.text}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="msg-attr" style={{ opacity: 0 }}>
        <span className="msg-attr-line" />
        <span className="msg-attr-text">Virat Kohli · Captain, India</span>
      </div>
    </section>
  );
}
