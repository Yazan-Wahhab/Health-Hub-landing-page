"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // =========================================================================
  // هندسة مسار اللوغو الأصلي
  // =========================================================================
  const logoX = useTransform(scrollYProgress, [0, 1], ["0vw", "-22vw"]); 
  const logoY = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]); 
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.45]); 
  const logoOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);

  return (
    <section 
      ref={heroRef} 
      className="relative h-screen w-full flex items-center bg-transparent z-20"
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center relative z-10 lg:-translate-y-12">
        
        {/* =========================================================================
            النصف الأيسر: المحتوى + وحدة التحكم المصغرة 
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col z-20 pt-20 lg:pt-0"
        >
          {/* شارة حالة النظام */}
          <div className="mb-5 inline-flex self-start items-center gap-2.5 rounded-full bg-white/70 border border-[var(--color-primary)]/15 px-5 py-2 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-secondary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-secondary)]"></span>
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--color-secondary-dark)]">
              System Online
            </span>
          </div>

          {/* العنوان الرئيسي */}
          <h1 className="font-display text-5xl font-extrabold tracking-tight text-[var(--color-text-main)] sm:text-7xl lg:text-[5.5rem] leading-[1.05]">
            Enterprise Core For <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
              Smart Care.
            </span>
          </h1>

          {/* الوصف */}
          <p className="mt-6 max-w-2xl text-xl lg:text-2xl font-medium leading-relaxed text-[var(--color-text-muted)]">
            Arachnotech introduces <span className="font-extrabold text-[var(--color-primary)]">Health-Hub</span>, 
            the premier operating layer of our overarching Smart Care platform. 
            We engineer high-trust medical systems that unify complex hospital operations.
          </p>

          {/* الأزرار */}
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#explore"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-9 py-4 text-sm font-bold text-white shadow-[0_10px_25px_rgba(17,79,209,0.25)] transition-all duration-300 hover:bg-[var(--color-primary-dark)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(17,79,209,0.35)]"
            >
              Discover The Hub
            </a>
            
            <a
              href="#architecture"
              className="inline-flex items-center justify-center rounded-full bg-white/50 border border-[var(--color-primary)]/20 px-8 py-4 text-sm font-bold text-[var(--color-text-main)] shadow-sm backdrop-blur-sm hover:bg-white hover:border-[var(--color-primary)]/40 hover:shadow-md transition-all duration-300"
            >
              View Architecture
            </a>
          </div>

          {/* =========================================================================
              لوحة القياسات الحيوية المصغرة (Premium Frosted Widget)
              تم التعديل هنا لتبرز عن الخلفية باحترافية
              ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative mt-12 overflow-hidden rounded-[2rem] p-7 max-w-2xl bg-gradient-to-br from-white/95 via-white/70 to-[var(--color-primary)]/10 backdrop-blur-2xl border border-white/80 shadow-[0_25px_50px_rgba(17,79,209,0.08),inset_0_2px_5px_rgba(255,255,255,0.9)] group"
          >
            {/* خط إضاءة علوي ليعطي طابع واجهة النظام */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[var(--color-primary)] via-[#0EA5E9] to-[var(--color-secondary)] opacity-90"></div>

            {/* القسم العلوي: الإحصائيات */}
            <div className="relative z-10 grid grid-cols-3 gap-4 border-b border-[var(--color-border)] pb-5">
              <div>
                <div className="text-2xl font-display font-black text-[var(--color-text-main)] mb-0.5">
                  99.9<span className="text-lg text-[var(--color-primary)]">%</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-display font-black text-[var(--color-text-main)] mb-0.5">
                  <span className="text-lg text-[var(--color-primary)] opacity-80">~</span>12<span className="text-lg text-[var(--color-primary)]">ms</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Latency</div>
              </div>
              <div>
                <div className="text-2xl font-display font-black text-[var(--color-text-main)] mb-0.5">
                  HIPAA
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-secondary)]">Compliant</div>
              </div>
            </div>

            {/* القسم السفلي: المخطط البياني الحي (Live Chart) */}
            <div className="relative z-10 pt-5 flex items-end justify-between gap-6">
              <div>
                <div className="text-[10px] font-bold text-[var(--color-secondary-dark)] uppercase tracking-widest flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] animate-pulse shadow-[0_0_8px_var(--color-secondary)]"></span>
                  Data Throughput
                </div>
                <div className="text-xl font-display font-black text-[var(--color-text-main)]">
                  +4,250 <span className="text-xs font-medium text-[var(--color-text-muted)]">req/sec</span>
                </div>
              </div>
              
              <div className="flex-1 h-12 relative overflow-hidden">
                <svg viewBox="0 0 200 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  <motion.path
                    d="M 0 35 C 30 35, 50 15, 80 20 C 110 25, 130 5, 160 10 C 180 15, 190 25, 200 5 L 200 40 L 0 40 Z"
                    fill="url(#chartGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  
                  <motion.path
                    d="M 0 35 C 30 35, 50 15, 80 20 C 110 25, 130 5, 160 10 C 180 15, 190 25, 200 5"
                    fill="none"
                    stroke="var(--color-secondary)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0px 4px 6px rgba(13,148,104,0.15))" }}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* =========================================================================
            النصف الأيمن: اللوغو العائم الفراغي
            ========================================================================= */}
        <motion.div 
          className="relative flex items-center justify-center lg:justify-end z-50 pointer-events-none"
          style={{ x: logoX, y: logoY, scale: logoScale, opacity: logoOpacity }}
        >
          <motion.div
            animate={{ y: [0, -20, 0], rotateZ: [0, 2, -2, 0], rotateY: [0, 10, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative perspective-[1200px] flex items-center justify-center"
          >
            <div className="absolute h-full w-full rounded-full bg-[var(--color-secondary)] opacity-[0.08] blur-[60px] scale-110"></div>
            <div className="absolute h-full w-full rounded-full bg-[var(--color-primary)] opacity-[0.08] blur-[80px] scale-125 translate-x-5"></div>
            
            <img 
              src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75" 
              alt="Health Hub Logo" 
              className="relative z-10 w-72 h-72 lg:w-[32rem] lg:h-[32rem] object-contain drop-shadow-[0_20px_30px_rgba(17,79,209,0.1)] grayscale-[10%]"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}