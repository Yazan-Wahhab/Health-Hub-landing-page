"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";

// استدعاء المكونات الخاصة بك
import Header from "./header"; 
import HeroSection from "./hero";
import Intro from "./intro";
import ZigZagSections from "./zigzag-sections";
import EngineeringMilestones from "./engineering-milestones";
import OurProcess from "./our-process"; 
import StatisticsSection from "./statistics";
import SuccessPartners from "./success-partners";
import Testimonials from "./testimonials"; 
import FAQ from "./faq"; 
import ContactSection from "./contact";

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
      <motion.div animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[var(--color-primary)] rounded-full blur-[140px] opacity-[0.05]" />
      <motion.div animate={{ x: [0, -50, 40, 0], y: [0, 50, -40, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-[var(--color-secondary)] rounded-full blur-[120px] opacity-[0.05]" />
      <div className="absolute inset-0" style={{ backgroundImage: basePattern, backgroundPosition: "center" }} />
      <motion.div className="absolute inset-0" style={{ backgroundImage: activePattern, backgroundPosition: "center", WebkitMaskImage: maskImage, maskImage: maskImage }} />
    </div>
  );
}

// =========================================================================
// 🛸 2. اللوغو الساحب في الخلفية (نسخة محسنة للأداء الأقصى مع useSpring)
// =========================================================================
function SynchronizedParallaxLogo() {
  const { scrollYProgress } = useScroll();

  // ✨ السحر هنا: تنعيم قيم التمرير الخام باستخدام useSpring
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100, // سرعة الاستجابة لبدء الحركة
    damping: 30,    // قوة إخماد الارتداد (لجعلها ناعمة وليست مطاطية)
    restDelta: 0.001 // دقة التوقف النهائي
  });

  // ✨ استخدام smoothScrollProgress بدلاً من scrollYProgress الخام
  const logoY = useTransform(smoothScrollProgress, [0, 1], ["5vh", "85vh"]);
  const logoX = useTransform(smoothScrollProgress, [0, 0.5, 1], ["-5vw", "20vw", "5vw"]);
  const logoRotate = useTransform(smoothScrollProgress, [0, 1], [-5, 25]);
  const logoOpacity = useTransform(smoothScrollProgress, [0, 0.1, 0.9, 1], [0, 0.20, 0.20, 0]); 

  return (
    <motion.div 
      className="fixed z-[-1] pointer-events-none" 
      style={{ 
        top: 0, 
        left: "50%", 
        x: logoX, 
        y: logoY, 
        rotate: logoRotate, 
        opacity: logoOpacity,
        // ✨ التحسين للأداء: سياسة will-change
        willChange: "transform, opacity" 
      }}
    >
      <div className="relative flex items-center justify-center scale-[2.5]">
        <img 
          src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75" 
          alt="Background Hologram" 
          className="relative z-10 w-64 h-64 object-contain drop-shadow-[0_15px_30px_rgba(17,79,209,0.2)]" 
          // ✨ التحسين للأداء: إجبار GPU Acceleration على الصورة التي تحتوي على ظل
          style={{ transform: "translateZ(0)", willChange: "filter, transform" }}
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
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
      className="relative min-h-screen text-[var(--color-text-main)] selection:bg-[var(--color-primary)] selection:text-white cursor-auto scroll-smooth"
    >
      <RichEnterpriseBackground />
      <SynchronizedParallaxLogo />

      {!introComplete && (
        <Intro onComplete={() => setIntroComplete(true)} />
      )}

      {introComplete && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Header />

          <main className="relative z-10">
            
            <motion.div id="home" className="scroll-mt-24" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <HeroSection />
            </motion.div>

            <motion.div id="features" className="scroll-mt-24" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <ZigZagSections />
            </motion.div>

            <motion.div id="modules" className="scroll-mt-24" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <EngineeringMilestones /> 
            </motion.div>

            <motion.div id="process" className="scroll-mt-24" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <OurProcess /> 
            </motion.div>

            <motion.div id="statistics" className="scroll-mt-24" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <StatisticsSection />
            </motion.div>

            <motion.div id="partners" className="scroll-mt-24" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <SuccessPartners /> 
            </motion.div>

            <motion.div id="testimonials" className="scroll-mt-24" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <Testimonials /> 
            </motion.div>

            <motion.div id="faq" className="scroll-mt-24" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <FAQ /> 
            </motion.div>

            <motion.div id="contact" className="scroll-mt-24" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <ContactSection />
            </motion.div>

          </main>
        </motion.div>
      )}
    </motion.div>
  );
}