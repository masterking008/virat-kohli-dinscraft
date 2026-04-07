import Cursor       from "./components/Cursor";
import Nav          from "./components/Nav";
import Hero         from "./components/Hero";
import Marquee      from "./components/Marquee";
import Message      from "./components/Message";
import Moments      from "./components/Moments";
import Gallery      from "./components/Gallery";
import CenturyWall  from "./components/CenturyWall";
import Partnerships from "./components/Partnerships";
import Footer       from "./components/Footer";

export default function Home() {
  return (
    <>
      <div className="grain-overlay" aria-hidden />
      <Cursor />
      <Nav />
      <main>
        <div className="hero-marquee-stack">
          <Marquee />
          <Hero />
        </div>
        <Message />
        <Moments />
        <Gallery />
        <CenturyWall />
        <Partnerships />
        <Footer />
      </main>
    </>
  );
}
