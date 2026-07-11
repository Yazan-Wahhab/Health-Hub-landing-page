"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import HeroSection from "./hero";
import Intro from "./intro";
import ZigZagSections from "./zigzag-sections";

// =========================================================================
// 1. مكون نسيج الزمكان الاحترافي 
// =========================================================================
function SpacetimeBackground() {
  const mouseX = useMotionValue(-1000); 
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 40, stiffness: 120, mass: 1 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const maskImage = useMotionTemplate`radial-gradient(500px circle at ${springX}px ${springY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)`;
  const coreGlow = useMotionTemplate`radial-gradient(250px circle at ${springX}px ${springY}px, rgba(17,79,209,0.2), transparent 70%)`;

  return (
    <div className="fixed inset-0 z-[-1] bg-[#f8fafc] overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <motion.div 
        className="absolute inset-0 z-10"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#114FD1_1.5px,transparent_1.5px),linear-gradient(to_bottom,#10B981_1.5px,transparent_1.5px)] bg-[size:40px_40px] opacity-70"></div>
      </motion.div>

      <motion.div className="absolute inset-0 z-20 mix-blend-color-burn" style={{ background: coreGlow }} />
      
      <motion.div
        className="absolute top-0 left-0 w-5 h-5 -ml-2.5 -mt-2.5 rounded-full z-30"
        style={{ 
          x: springX, 
          y: springY,
          background: "linear-gradient(135deg, #10B981 0%, #114FD1 100%)",
          boxShadow: "0 0 20px 8px rgba(17,79,209,0.3), inset 0 0 8px rgba(255,255,255,0.8)"
        }}
      />

      <div className="absolute -top-[10%] -right-[10%] h-[700px] w-[700px] rounded-full bg-[#10B981] opacity-[0.05] blur-[150px]" />
      <div className="absolute -bottom-[10%] -left-[10%] h-[700px] w-[700px] rounded-full bg-[#114FD1] opacity-[0.05] blur-[150px]" />
    </div>
  );
}

// =========================================================================
// 2. الصفحة الرئيسية للمنصة
// =========================================================================
export default function LandingPage() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="relative min-h-screen text-slate-950 selection:bg-[#114FD1] selection:text-white">
      <SpacetimeBackground />

      {!introComplete ? (
        <Intro onComplete={() => setIntroComplete(true)} />
      ) : null}

      {/* ⚠️ هنا كان الخطأ: تم إزالة الكلاس الذي يدمر التثبيت ⚠️ */}
      <main className="relative z-10">
        <HeroSection />
        <ZigZagSections />

        <section id="contact" className="relative bg-transparent py-24">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-[#114FD1]">
                Enterprise readiness
              </p>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.06em] text-[#0a1b3f] sm:text-5xl">
                Built for hospitals that need clarity, control, and speed.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#3b4c68] font-medium">
                From the front desk to the finance office, Health-Hub gives
                every team a premium operating surface that feels calm, secure,
                and precise.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/40 p-8 backdrop-blur-xl shadow-[0_24px_60px_rgba(17,79,209,0.12)] hover:bg-white/60 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#114FD1] to-[#10B981]"></div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#3b4c68]">
                Contact Arachnotech
              </p>
              <p className="mt-3 max-w-sm text-base leading-7 text-[#3b4c68] font-medium">
                Schedule a private walkthrough to see workflows, analytics, and
                implementation options tailored to your hospital network.
              </p>
              <button
                type="button"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#114FD1] px-8 py-4 text-sm font-bold text-white shadow-[0_16px_32px_rgba(17,79,209,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0a1b3f] hover:shadow-[0_16px_32px_rgba(10,27,63,0.25)]"
              >
                Book a private demo
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}