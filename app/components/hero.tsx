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
    // هندسة مسار اللوغو: ينزل 100vh ليبقى بمنتصف الشاشة، ويصغر لـ 0.45
    // =========================================================================
    const logoX = useTransform(scrollYProgress, [0, 1], ["0vw", "-22vw"]); // إزاحة للمنتصف
    const logoY = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]); // نزول متزامن مع السكرول
    const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.45]); // تصغير متدرج
    
    // يختفي في آخر جزء من الثانية ليسلم الحركة للقسم التالي بدون أي تداخل
    const logoOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);

    return (
      // استخدام h-screen بدلاً من min-h لضمان دقة حسابات الـ 100vh
      <section 
        ref={heroRef} 
        className="relative h-screen w-full flex items-center bg-transparent z-20"
      >
        <div className="w-full max-w-[1800px] mx-auto px-6 lg:px-16 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col z-20"
          >
            <div className="mb-8 inline-flex self-start rounded-full bg-gradient-to-r from-[#114FD1] to-[#10B981] p-[2px] shadow-lg">
              <div className="rounded-full bg-white px-6 py-2.5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#114FD1]">
                Arachnotech Enterprise
              </div>
            </div>

            <h1 className="font-display text-5xl font-extrabold tracking-tighter text-[#0a1b3f] sm:text-7xl lg:text-[5.5rem] leading-[1.05]">
              Enterprise Core For <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#114FD1] via-[#2B72E6] to-[#10B981]">
                Smart Care.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-xl font-bold leading-relaxed text-[#3b4c68]">
              Arachnotech introduces <span className="text-[#114FD1]">Health-Hub</span>, 
              the premier operating layer of our overarching Smart Care platform. 
              We engineer high-trust medical systems that unify complex hospital operations.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <a
                href="#explore"
                className="inline-flex items-center justify-center rounded-full bg-[#114FD1] px-10 py-5 text-lg font-extrabold text-white shadow-[0_20px_40px_rgba(17,79,209,0.4)] transition-all duration-300 hover:bg-[#10B981] hover:-translate-y-1"
              >
                Discover The Hub
              </a>
            </div>
          </motion.div>

          {/* =================== اللوغو العائم الفراغي =================== */}
          <motion.div 
            className="relative flex items-center justify-center lg:justify-end z-50 pointer-events-none"
            style={{ x: logoX, y: logoY, scale: logoScale, opacity: logoOpacity }}
          >
            <motion.div
              animate={{ y: [0, -25, 0], rotateZ: [0, 3, -3, 0], rotateY: [0, 15, -15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative perspective-[1200px] flex items-center justify-center"
            >
              {/* هالات الإضاءة */}
              <div className="absolute h-full w-full rounded-full bg-[#10B981] opacity-[0.2] blur-[80px] scale-110"></div>
              <div className="absolute h-full w-full rounded-full bg-[#114FD1] opacity-[0.2] blur-[100px] scale-125 translate-x-5"></div>
              <img 
                src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75" 
                alt="Health Hub Logo" 
                className="relative z-10 w-72 h-72 lg:w-[34rem] lg:h-[34rem] object-contain drop-shadow-[0_30px_40px_rgba(17,79,209,0.5)]"
              />
            </motion.div>
          </motion.div>

        </div>
      </section>
    );
  }