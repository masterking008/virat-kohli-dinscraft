"use client";

import { MARQUEE_ITEMS } from "./data";

export default function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-bg">
      <div className="marquee-fullpage">
        <div className="marquee-row marquee-row--left">
          {doubled.map((item, i) => (
            <span key={i} className="marquee-big-item">
              {item} <span className="marquee-big-dot">✦</span>
            </span>
          ))}
        </div>
        <div className="marquee-row marquee-row--right">
          {doubled.map((item, i) => (
            <span key={i} className="marquee-big-item">
              {item} <span className="marquee-big-dot">✦</span>
            </span>
          ))}
        </div>
        <div className="marquee-row marquee-row--left">
          {doubled.map((item, i) => (
            <span key={i} className="marquee-big-item">
              {item} <span className="marquee-big-dot">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
