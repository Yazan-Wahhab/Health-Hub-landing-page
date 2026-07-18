"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";

// استدعاء المكونات الخاصة بك
import Header from "./header"; 
import HeroSection from "./hero";
import Intro from "./intro";
import ZigZagSections from "./zigzag-sections";
import EngineeringMilestones from "./engineering-milestones";
import OurProcess from "./our-process"; // 🌟 تم إضافة استدعاء قسم طريقة العمل هنا
import SuccessPartners from "./success-partners";

// =========================================================================
// ✨ 1. الخلفية التفاعلية: (Rich Enterprise Pattern - Hover Blue)
// =========================================================================
function RichEnterpriseBackground() {
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

  const maskImage = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  const basePattern = `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M39 36h2v8h-2z M36 39h8v2h-8z' fill='%23114fd1' fill-opacity='0.15'/%3E%3Ccircle cx='40' cy='40' r='1' fill='%23114fd1' fill-opacity='0.15'/%3E%3C/svg%3E")`;
  const activePattern = `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M39 36h2v8h-2z M36 39h8v2h-8z' fill='%23114fd1' fill-opacity='0.8' filter='drop-shadow(0 0 3px %23114fd1)'/%3E%3Ccircle cx='40' cy='40' r='1.5' fill='%23114fd1' fill-opacity='0.6'/%3E%3C/svg%3E")`;

  return (
    <div className="fixed inset-0 z-[-2] bg-gradient-to-br from-[#bce8d4] via-[#dcf4e9] to-[#a8e0c6] overflow-hidden pointer-events-none">
      <motion.div 
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0] }} 
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[var(--color-primary)] rounded-full blur-[140px] opacity-[0.05]"
      />
      <motion.div 
        animate={{ x: [0, -50, 40, 0], y: [0, 50, -40, 0] }} 
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-[var(--color-secondary)] rounded-full blur-[120px] opacity-[0.05]"
      />
      <div className="absolute inset-0" style={{ backgroundImage: basePattern, backgroundPosition: "center" }} />
      <motion.div
        className="absolute inset-0"
        style={{ backgroundImage: activePattern, backgroundPosition: "center", WebkitMaskImage: maskImage, maskImage: maskImage }}
      />
    </div>
  );
}

// =========================================================================
// 🛸 2. اللوغو الساحب في الخلفية
// =========================================================================
function SynchronizedParallaxLogo() {
  const { scrollYProgress } = useScroll();
  const logoY = useTransform(scrollYProgress, [0, 1], ["5vh", "85vh"]);
  const logoX = useTransform(scrollYProgress, [0, 0.5, 1], ["-5vw", "20vw", "5vw"]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [-5, 25]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.20, 0.20, 0]); 

  return (
    <motion.div className="fixed z-[-1] pointer-events-none" style={{ top: 0, left: "50%", x: logoX, y: logoY, rotate: logoRotate, opacity: logoOpacity }}>
      <div className="relative flex items-center justify-center scale-[2.5]">
        <img src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75" alt="Background Hologram" className="relative z-10 w-64 h-64 object-contain drop-shadow-[0_15px_30px_rgba(17,79,209,0.2)]" />
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
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
      className="relative min-h-screen text-[var(--color-text-main)] selection:bg-[var(--color-primary)] selection:text-white cursor-auto"
    >
      <RichEnterpriseBackground />
      <SynchronizedParallaxLogo />

      {!introComplete && (
        <Intro onComplete={() => setIntroComplete(true)} />
      )}

      {introComplete && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Header />

          <main className="relative z-10 pt-32" id="home">
            
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <HeroSection />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <ZigZagSections />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <EngineeringMilestones /> 
            </motion.div>

            {/* 🌟 تم إضافة قسم طريقة العمل والفيديوهات هنا */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <OurProcess /> 
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <SuccessPartners /> 
            </motion.div>

            {/* قسم التواصل */}
            <section id="contact" className="relative bg-transparent py-32 border-t border-[var(--color-border)] mt-10">
              <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-16 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-12 relative z-10">
                <div className="max-w-2xl">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="inline-flex items-center gap-2 bg-white/80 border border-[var(--color-primary)]/15 px-5 py-2.5 rounded-full mb-6 backdrop-blur-xl shadow-sm"
                  >
                    <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_8px_var(--color-primary)]"></div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">Healthcare Enterprise</span>
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                    className="mt-4 font-display text-4xl font-extrabold tracking-tight text-[var(--color-text-main)] sm:text-6xl leading-[1.2]"
                  >
                    بنية تحتية مصممة للمستشفيات التي تطلب <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">الاستقرار والموثوقية.</span>
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                    className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)] font-medium"
                  >
                    بدءاً من مكاتب الاستقبال وحتى الإدارة المالية وغرف العمليات، توفر منصة Smart Care بيئة عمل موحدة، خالية من التعقيد، وفائقة الدقة للطواقم الطبية.
                  </motion.p>
                </div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                  className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white/60 p-10 md:p-12 backdrop-blur-3xl shadow-[0_20px_60px_rgba(17,79,209,0.05)] lg:w-[500px]"
                >
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-primary-dark)]"></div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    تواصل مع خبرائنا
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-[var(--color-text-muted)] font-medium">
                    احجز استشارة خاصة مع مهندسينا لاستعراض آلية عمل النظام، وخيارات الدمج المخصصة لتلائم شبكة عياداتك أو مستشفاك.
                  </p>
                  <button className="mt-10 w-full inline-flex items-center justify-center rounded-[1rem] bg-[var(--color-primary)] px-8 py-5 text-base font-bold text-white shadow-[0_10px_30px_rgba(17,79,209,0.15)] transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--color-primary-dark)] hover:shadow-[0_15px_40px_rgba(17,79,209,0.25)] border border-white/20">
                    طلب عرض توضيحي (Demo)
                  </button>
                </motion.div>
              </div>
            </section>
          </main>
        </motion.div>
      )}
    </motion.div>
  );
}