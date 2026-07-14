"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import HeroSection from "./hero";
import Intro from "./intro";
import ZigZagSections from "./zigzag-sections";
import EngineeringMilestones from "./engineering-milestones";
import SuccessPartners from "./success-partners";

// =========================================================================
// ✨ 1. الشبكة التفاعلية المضمونة (Neon Hover Flashlight)
// =========================================================================
function InteractiveGridBackground() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // إنشاء تأثير "الماسك" (Mask) ليتبع الماوس بدقة عالية وبدون تأخير
  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  return (
    <div className="fixed inset-0 z-[-2] bg-[var(--color-background)] overflow-hidden pointer-events-none">
      
      {/* 1. الشبكة الأساسية الثابتة 
          - زرقاء عمودياً، خضراء أفقياً (وضوح 25% لتكون ظاهرة بشكل ممتاز)
      */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,79,209,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.25)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* 2. طبقة النيون (تأثير الهوفر)
          - خطوط أعرض (2px)
          - ألوان مشعة جداً (شفافية 90%)
          - تظهر "فقط" تحت الماوس بفضل الـ maskImage المربوط بحركة الماوس
      */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,79,209,0.9)_2px,transparent_2px),linear-gradient(to_bottom,rgba(16,185,129,0.9)_2px,transparent_2px)] bg-[size:4rem_4rem]"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
      />

      {/* 3. بقع ألوان هادئة تضيف حيوية للخلفية */}
      <motion.div 
        animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }} 
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[5%] w-[800px] h-[800px] bg-[#0EA5E9] rounded-full blur-[200px] opacity-[0.1]"
      />
      <motion.div 
        animate={{ x: [0, -50, 50, 0], y: [0, 50, -50, 0] }} 
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[5%] w-[800px] h-[800px] bg-[#10B981] rounded-full blur-[200px] opacity-[0.1]"
      />
    </div>
  );
}

// =========================================================================
// 🛸 2. اللوغو الساحب ببطء 
// =========================================================================
function SynchronizedParallaxLogo() {
  const { scrollYProgress } = useScroll();

  const logoY = useTransform(scrollYProgress, [0, 1], ["5vh", "85vh"]);
  const logoX = useTransform(scrollYProgress, [0, 0.5, 1], ["-5vw", "20vw", "5vw"]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [-10, 90]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.15, 0.15, 0]);

  return (
    <motion.div 
      className="fixed z-[-1] pointer-events-none"
      style={{ top: 0, left: "50%", x: logoX, y: logoY, rotate: logoRotate, opacity: logoOpacity }}
    >
      <div className="relative flex items-center justify-center scale-[2.2]">
        <img 
          src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75" 
          alt="Background Hologram" 
          className="relative z-10 w-64 h-64 object-contain opacity-25 drop-shadow-[0_10px_30px_rgba(17,79,209,0.15)] grayscale-[10%]" 
        />
      </div>
    </motion.div>
  );
}

// =========================================================================
// 🚀 3. الصفحة الرئيسية المجمعة
// =========================================================================
export default function LandingPage() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen text-[var(--color-text-main)] selection:bg-[#114FD1] selection:text-white cursor-auto"
    >
      
      {/* 1. الشبكة الهندسية التفاعلية مع تأثير النيون المضمون */}
      <InteractiveGridBackground />
      
      {/* 2. اللوغو المتحرك */}
      <SynchronizedParallaxLogo />

      {!introComplete ? (
        <Intro onComplete={() => setIntroComplete(true)} />
      ) : null}

      <main className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeroSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <ZigZagSections />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <EngineeringMilestones /> 
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SuccessPartners /> 
        </motion.div>

        {/* =========================================================================
            قسم التواصل 
            ========================================================================= */}
        <section id="contact" className="relative bg-transparent py-32 border-t border-[var(--color-border)] mt-10">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-16 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-12 relative z-10">
            
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/80 border border-[#114FD1]/15 px-5 py-2.5 rounded-full mb-6 backdrop-blur-xl shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-[#114FD1] animate-pulse shadow-[0_0_8px_#114FD1]"></div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#114FD1]">
                  Healthcare Enterprise
                </span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="mt-4 font-display text-4xl font-extrabold tracking-tight text-[var(--color-text-main)] sm:text-6xl leading-[1.2]"
              >
                بنية تحتية مصممة للمستشفيات التي تطلب <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#114FD1] to-[#10B981]">الاستقرار والموثوقية.</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)] font-medium"
              >
                بدءاً من مكاتب الاستقبال وحتى الإدارة المالية وغرف العمليات، توفر منصة Smart Care بيئة عمل موحدة، خالية من التعقيد، وفائقة الدقة للطواقم الطبية.
              </motion.p>
            </div>

            {/* بطاقة التواصل */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white/60 p-10 md:p-12 backdrop-blur-3xl shadow-[0_40px_80px_rgba(17,79,209,0.08)] lg:w-[500px]"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#114FD1] via-[#0EA5E9] to-[#10B981]"></div>
              
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0d9468] mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                تواصل مع خبرائنا
              </p>
              
              <p className="mt-2 text-base leading-relaxed text-[var(--color-text-muted)] font-medium">
                احجز استشارة خاصة مع مهندسينا لاستعراض آلية عمل النظام، وخيارات الدمج المخصصة لتلائم شبكة عياداتك أو مستشفاك.
              </p>
              
              <button
                type="button"
                className="mt-10 w-full inline-flex items-center justify-center rounded-[1rem] bg-[var(--color-primary)] px-8 py-5 text-base font-bold text-white shadow-[0_10px_30px_rgba(17,79,209,0.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--color-primary-dark)] hover:shadow-[0_15px_40px_rgba(17,79,209,0.4)] border border-white/20"
              >
                طلب عرض توضيحي (Demo)
              </button>
            </motion.div>

          </div>
        </section>
      </main>
    </motion.div>
  );
}