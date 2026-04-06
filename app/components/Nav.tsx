"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const LINKS = ["Home", "On the Field", "Off the Field", "Records", "Partnerships"];

export default function Nav() {
  const [open, setOpen]   = useState(false);
  const overlayRef        = useRef<HTMLDivElement>(null);
  const tlRef             = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const el = overlayRef.current;
    if (!el) return;

    tlRef.current = gsap.timeline({ paused: true })
      .set(el, { display: "flex" })
      .fromTo(el,
        { clipPath: "circle(0% at calc(100% - 3.5rem) 3.5rem)" },
        { clipPath: "circle(150% at calc(100% - 3.5rem) 3.5rem)", duration: 0.8, ease: "power4.inOut" }
      )
      .from(".menu-name-virat", { yPercent: 100, duration: 0.55, ease: "power3.out" }, "-=0.25")
      .from(".menu-name-kohli", { yPercent: 100, duration: 0.55, ease: "power3.out" }, "-=0.48")
      .from(".menu-overlay-logo", { autoAlpha: 0, scale: 0.88, duration: 0.45, ease: "power3.out" }, "-=0.4")
      .from(".menu-link", { autoAlpha: 0, y: 22, stagger: 0.07, duration: 0.45, ease: "power3.out" }, "-=0.35");
  }, { scope: overlayRef });

  const toggle = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!open) {
      tl.play();
    } else {
      tl.reverse().eventCallback("onReverseComplete", () =>
        gsap.set(overlayRef.current, { display: "none" })
      );
    }
    setOpen(o => !o);
  };

  return (
    <>
      <nav className="nav-bar">
        {/* Left — wordmark */}
        <a href="#" className="nav-wordmark">
          <span className="nav-wordmark-virat">VIRAT</span>
          <span className="nav-wordmark-kohli">Kohli</span>
        </a>

        {/* Centre — logo */}
        <div className="nav-logo-centre">
          <Image src="/vk-logo-dark.png" alt="VK" width={44} height={44} style={{ objectFit: "contain" }} />
        </div>

        {/* Right — store + menu */}
        <div className="nav-right">
          <a href="#" className="nav-store-btn">Store</a>
          <button className="nav-menu-btn" onClick={toggle} aria-label="Toggle menu">
            <span className={`hamburger ${open ? "open" : ""}`}>
              <span /><span />
            </span>
          </button>
        </div>
      </nav>

      {/* Fullscreen overlay */}
      <div ref={overlayRef} className="menu-overlay" style={{ display: "none" }}>

        {/* Left — stacked name */}
        <div className="menu-name">
          <div className="menu-name-clip"><span className="menu-name-virat">Virat</span></div>
          <div className="menu-name-clip"><span className="menu-name-kohli">Kohli</span></div>
        </div>

        {/* Centre — logo */}
        <div className="menu-overlay-logo">
          <Image src="/vk-logo-primary.png" alt="VK Logo" width={140} height={140} style={{ objectFit: "contain" }} />
        </div>

        {/* Right — nav links */}
        <nav className="menu-links">
          {LINKS.map((l) => (
            <a key={l} href="#" className="menu-link" onClick={toggle}>{l}</a>
          ))}
        </nav>

        {/* Close hit-area */}
        <button className="menu-close-bg" onClick={toggle} aria-label="Close menu" />
      </div>
    </>
  );
}
