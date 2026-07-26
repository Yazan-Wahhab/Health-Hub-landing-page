"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";

const WEB_IMAGES = [
  "/assets/images/Screenshot 2026-07-09 141200.png",
  "/assets/images/Screenshot 2026-07-09 141311.png",
  "/assets/images/Screenshot 2026-07-09 150127.png",
];

const MOBILE_IMAGES = [
  "/assets/images/photo_2026-07-09_14-16-53.jpg",
  "/assets/images/photo_2026-07-09_15-03-16.jpg",
  "/assets/images/photo_2026-07-09_15-03-28.jpg",
];

const FallingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-60">
    <div className="absolute w-2.5 h-2.5 rounded-full bg-[var(--color-secondary)] shape-fall delay-1"></div>
    <div className="absolute w-2 h-2 bg-[#0EA5E9] rounded-sm shape-fall delay-2 rotate-45"></div>
    <svg className="absolute w-4 h-4 text-[var(--color-secondary)] shape-fall delay-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
    <div className="absolute w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shape-fall delay-4"></div>
    <svg className="absolute w-3 h-3 text-[#0EA5E9] shape-fall delay-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
    <div className="absolute w-3 h-3 rounded-full border border-[var(--color-secondary)] shape-fall delay-6"></div>
  </div>
);

export default function ZigZagSections() {
  const [activeGallery, setActiveGallery] = useState<'web' | 'mobile' | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // =========================================================================
  // 💻 الديسكتوب
  // =========================================================================
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const [isReady, setIsReady] = useState(false);

  const centerLogoScale = useTransform(scrollYProgress, [0, 0.8, 1], [0.5, 0.2, 0.2]); 
  const centerLogoOpacity = useTransform(scrollYProgress, [0, 0.02, 0.4, 0.8, 1], [0, 1, 1, 0, 0]); 

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.1 && !isReady) setIsReady(true);
  });

  // =========================================================================
  // 📱 الموبايل
  // =========================================================================
  const mobileContainerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: mobileScroll } = useScroll({ target: mobileContainerRef, offset: ["start start", "end end"] });
  const [isMobileReady, setIsMobileReady] = useState(false);

  const mLogoScale = useTransform(mobileScroll, [0, 0.8, 1], [0.5, 0.2, 0.2]);
  const mLogoOpacity = useTransform(mobileScroll, [0, 0.02, 0.4, 0.8, 1], [0, 1, 1, 0, 0]);

  useMotionValueEvent(mobileScroll, "change", (latest) => {
    if (latest >= 0.1 && !isMobileReady) setIsMobileReady(true);
  });

  const smoothSpring = { type: "spring", stiffness: 70, damping: 20, mass: 1 };
  const activeImages = activeGallery === 'web' ? WEB_IMAGES : MOBILE_IMAGES;
  
  const goNext = (e?: React.MouseEvent) => { 
    if(e) e.stopPropagation();
    setDirection(1); 
    setCurrentImgIndex((prev) => (prev + 1) % activeImages.length); 
  };
  const goPrev = (e?: React.MouseEvent) => { 
    if(e) e.stopPropagation();
    setDirection(-1); 
    setCurrentImgIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length); 
  };
  const closeGallery = () => { setActiveGallery(null); setCurrentImgIndex(0); setDirection(0); };

  useEffect(() => {
    if (!activeGallery) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") closeGallery();
    };
    window.addEventListener("keydown", handleKeyDown); return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGallery, activeImages.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 10 : -10,
      filter: "blur(8px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 150 : -150,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? -10 : 10,
      filter: "blur(8px)",
    })
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dataFlow { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
        .animate-data-flow { animation: dataFlow 4s linear infinite; }
        @keyframes fallDown { 0% { transform: translateY(-30px) rotate(0deg) scale(0.5); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(150px) rotate(180deg) scale(1.2); opacity: 0; } }
        .shape-fall { animation: fallDown 4s linear infinite; }
        .delay-1 { animation-delay: 0.1s; left: 10%; animation-duration: 4.5s; } .delay-2 { animation-delay: 1.2s; left: 25%; animation-duration: 3.8s; } .delay-3 { animation-delay: 0.5s; left: 50%; animation-duration: 5s; }
        .delay-4 { animation-delay: 2.1s; left: 70%; animation-duration: 4.2s; } .delay-5 { animation-delay: 0.8s; left: 85%; animation-duration: 4.8s; } .delay-6 { animation-delay: 1.5s; left: 40%; animation-duration: 5.5s; }
        
        .parallax-layer {
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          pointer-events: none;
        }
        .layer-1 {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.2'%3E%3Ccircle cx='40' cy='50' r='10' fill='%230EA5E9'/%3E%3Ccircle cx='60' cy='50' r='10' fill='%2310B981'/%3E%3Cpath d='M40 50 L60 50' stroke='%23ffffff' stroke-width='2' opacity='0.5'/%3E%3C/g%3E%3C/svg%3E");
          background-size: 100px 100px;
          animation: driftFast 15s linear infinite;
        }
        .layer-2 {
          background-image: url("data:image/svg+xml,%3Csvg width='220' height='220' viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.1'%3E%3Ccircle cx='90' cy='110' r='20' fill='%230EA5E9'/%3E%3Ccircle cx='130' cy='110' r='20' fill='%2310B981'/%3E%3Cpath d='M90 110 L130 110' stroke='%23ffffff' stroke-width='3' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E");
          background-size: 220px 220px;
          animation: driftSlow 30s linear infinite;
        }
        @keyframes driftFast { 0% { transform: translate(0, 0); } 100% { transform: translate(-100px, -100px); } }
        @keyframes driftSlow { 0% { transform: translate(0, 0); } 100% { transform: translate(-220px, -220px); } }
      `}} />

      {/* 📱 قسم الموبايل */}
      <div className="block lg:hidden">
        <section ref={mobileContainerRef} className="relative h-[120vh] w-full bg-transparent z-20">
          <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center pointer-events-none">
            <motion.div 
              className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none will-change-transform transform-gpu"
              style={{ opacity: mLogoOpacity, scale: mLogoScale }}
            >
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative flex items-center justify-center transform-gpu">
                <div className="absolute w-[250%] h-[250%] rounded-full opacity-15 transform-gpu" style={{ background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 60%)' }}></div>
                <div className="absolute w-[280%] h-[280%] rounded-full opacity-15 translate-x-5 transform-gpu" style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 60%)' }}></div>
                <img src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75" alt="Core Logo" className="relative z-10 w-72 h-72 object-contain drop-shadow-[0_15px_25px_rgba(17,79,209,0.1)] grayscale-[10%] transform-gpu" />
              </motion.div>
            </motion.div>

            <div className="relative w-full h-[88svh] max-h-[800px] max-w-[420px] mx-auto pointer-events-auto">
              <motion.svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" preserveAspectRatio="none" initial={{ opacity: 0 }} animate={{ opacity: isMobileReady ? 1 : 0 }} transition={{ duration: 0.8 }}>
                <motion.line x1="25%" y1="18%" x2="25%" y2="82%" stroke="var(--color-primary)" strokeOpacity="0.2" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: isMobileReady ? 1 : 0 }} transition={{ duration: 1.5 }} />
                <motion.line x1="25%" y1="18%" x2="25%" y2="82%" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="6 8" className="animate-data-flow opacity-60" initial={{ pathLength: 0 }} animate={{ pathLength: isMobileReady ? 1 : 0 }} transition={{ duration: 1.5 }} />
                <motion.line x1="75%" y1="18%" x2="75%" y2="82%" stroke="var(--color-secondary)" strokeOpacity="0.2" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: isMobileReady ? 1 : 0 }} transition={{ duration: 1.5 }} />
                <motion.line x1="75%" y1="18%" x2="75%" y2="82%" stroke="var(--color-secondary)" strokeWidth="2" strokeDasharray="6 8" className="animate-data-flow opacity-60" initial={{ pathLength: 0 }} animate={{ pathLength: isMobileReady ? 1 : 0 }} transition={{ duration: 1.5 }} />
                <motion.line x1="25%" y1="50%" x2="38%" y2="50%" stroke="var(--color-primary)" strokeOpacity="0.2" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: isMobileReady ? 1 : 0 }} transition={{ duration: 1, delay: 0.2 }} />
                <motion.line x1="25%" y1="50%" x2="38%" y2="50%" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="6 8" className="animate-data-flow opacity-60" initial={{ pathLength: 0 }} animate={{ pathLength: isMobileReady ? 1 : 0 }} transition={{ duration: 1, delay: 0.2 }} />
                <motion.line x1="62%" y1="50%" x2="75%" y2="50%" stroke="var(--color-secondary)" strokeOpacity="0.2" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: isMobileReady ? 1 : 0 }} transition={{ duration: 1, delay: 0.2 }} />
                <motion.line x1="62%" y1="50%" x2="75%" y2="50%" stroke="var(--color-secondary)" strokeWidth="2" strokeDasharray="6 8" className="animate-data-flow opacity-60" initial={{ pathLength: 0 }} animate={{ pathLength: isMobileReady ? 1 : 0 }} transition={{ duration: 1, delay: 0.2 }} />
              </motion.svg>

              <motion.div className="absolute top-[10%] left-[2%] w-[46%] flex justify-center z-10" initial={{ opacity: 0, x: 20, y: 20, scale: 0.9 }} animate={isMobileReady ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: 20, y: 20, scale: 0.9 }} transition={{ ...smoothSpring }}>
                <div className="relative w-full bg-[var(--color-secondary)]/15 backdrop-blur-xl border border-[var(--color-secondary)]/30 p-3.5 rounded-[1.2rem] shadow-[0_20px_50px_rgba(13,148,104,0.15)] text-center">
                  <div className="absolute inset-0 rounded-[1.2rem] overflow-hidden pointer-events-none z-0"><FallingShapes /></div>
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#f0f6ff] border-2 border-[var(--color-primary)] rounded-full z-20 shadow-sm flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div></div>
                  <h3 className="relative z-10 text-[16px] font-display font-extrabold text-[#022c22] mb-1.5 tracking-tight">نواة المؤسسة</h3>
                  <p className="relative z-10 text-[13px] font-bold text-[#064e3b] leading-relaxed">إدارة شاملة للبيانات والموارد.</p>
                </div>
              </motion.div>

              <motion.div className="absolute top-[6%] right-[2%] w-[46%] flex justify-center z-20" initial={{ opacity: 0, x: -20, y: 20, scale: 0.9 }} animate={isMobileReady ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: -20, y: 20, scale: 0.9 }} transition={{ ...smoothSpring, delay: 0.1 }}>
                <div onClick={() => setActiveGallery('mobile')} className="relative w-[60%] max-w-[120px] aspect-[9/19.5] bg-[#050505] rounded-[1rem] p-1.5 border-[2px] border-[#222] shadow-[0_15px_30px_rgba(13,148,104,0.15)] cursor-pointer active:scale-95 transition-transform z-20">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-black rounded-full z-40"></div>
                  <div className="relative w-full h-full bg-white rounded-[0.8rem] overflow-hidden"><img src={MOBILE_IMAGES[0]} alt="Mobile App" className="w-full h-full object-cover object-top" /></div>
                </div>
              </motion.div>

              <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48%] max-w-[180px] z-30" initial={{ opacity: 0, scale: 0.5 }} animate={isMobileReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }} transition={{ ...smoothSpring, delay: 0.2 }}>
                <div className="relative bg-gradient-to-b from-[var(--color-secondary)]/20 to-[var(--color-secondary)]/10 backdrop-blur-2xl border border-[var(--color-secondary)]/30 px-3.5 py-5 rounded-[1.2rem] shadow-[0_20px_50px_rgba(13,148,104,0.15)] text-center">
                  <div className="absolute inset-0 rounded-[1.2rem] overflow-hidden pointer-events-none z-0"><FallingShapes /></div>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl bg-[#064e3b] flex items-center justify-center shadow-md border-[3px] border-[var(--color-secondary)]/40 z-20"><svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></div>
                  <h3 className="relative z-10 text-[15px] font-display font-extrabold text-[#022c22] mb-1.5 mt-2 tracking-tight">تكامل بيئي شامل</h3>
                </div>
              </motion.div>

              <motion.div className="absolute bottom-[8%] left-[2%] w-[46%] flex justify-center z-20" initial={{ opacity: 0, x: 20, y: -20, scale: 0.9 }} animate={isMobileReady ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: 20, y: -20, scale: 0.9 }} transition={{ ...smoothSpring, delay: 0.3 }}>
                <div onClick={() => setActiveGallery('web')} className="relative w-full max-w-[200px] aspect-[16/10] bg-[#050505] rounded-t-[0.6rem] border-[2px] border-[#222] shadow-[0_15px_30px_rgba(17,79,209,0.15)] flex flex-col p-1.5 cursor-pointer active:scale-95 z-20">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#111] rounded-full z-40"></div>
                  <div className="relative w-full h-full bg-white rounded-sm overflow-hidden"><img src={WEB_IMAGES[0]} alt="Web Dashboard" className="w-full h-full object-cover object-top" /></div>
                  <div className="absolute -bottom-2 -left-[5%] w-[110%] h-2 bg-gradient-to-b from-[#a0aab0] to-[#60676b] rounded-b-md border-t border-[#d1d5db]"></div>
                </div>
              </motion.div>

              <motion.div className="absolute bottom-[10%] right-[2%] w-[46%] flex justify-center z-10" initial={{ opacity: 0, x: -20, y: -20, scale: 0.9 }} animate={isMobileReady ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: -20, y: -20, scale: 0.9 }} transition={{ ...smoothSpring, delay: 0.4 }}>
                <div className="relative w-full bg-[var(--color-secondary)]/15 backdrop-blur-xl border border-[var(--color-secondary)]/30 p-3.5 rounded-[1.2rem] shadow-[0_20px_50px_rgba(13,148,104,0.15)] text-center">
                  <div className="absolute inset-0 rounded-[1.2rem] overflow-hidden z-0"><FallingShapes /></div>
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#f0f6ff] border-2 border-[var(--color-secondary)] rounded-full z-20 shadow-sm flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]"></div></div>
                  <h3 className="relative z-10 text-[16px] font-display font-extrabold text-[#022c22] mb-1.5 tracking-tight">امتداد العمليات</h3>
                  <p className="relative z-10 text-[13px] font-bold text-[#064e3b] leading-relaxed">وصول مشفر وآني للمرضى.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* 💻 قسم اللابتوب */}
      <div className="hidden lg:block">
        <section ref={containerRef} className="relative h-[120vh] w-full bg-transparent z-10">
          <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center will-change-transform transform-gpu"
              style={{ opacity: centerLogoOpacity, scale: centerLogoScale }}
            >
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative flex items-center justify-center transform-gpu">
                <div className="absolute w-[180%] h-[180%] rounded-full opacity-20 transform-gpu" style={{ background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 60%)' }}></div>
                <div className="absolute w-[200%] h-[200%] rounded-full opacity-20 translate-x-5 transform-gpu" style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 60%)' }}></div>
                <img src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75" alt="Core Logo" className="relative z-10 w-[32rem] h-[32rem] object-contain drop-shadow-[0_20px_30px_rgba(17,79,209,0.1)] grayscale-[10%] transform-gpu" />
              </motion.div>
            </motion.div>

            <motion.div className="absolute top-[4vh] left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-xl border border-[var(--color-border)] shadow-[0_15px_30px_rgba(0,0,0,0.06)] px-8 py-3.5 rounded-full text-center flex items-center gap-4 pointer-events-auto" initial={{ opacity: 0, y: -30, scale: 0.9 }} animate={isReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -30, scale: 0.9 }} transition={{ ...smoothSpring }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_8px_var(--color-primary)]"></div>
              <h2 className="text-xl md:text-2xl font-display font-extrabold text-[#022c22] tracking-tight">المنصة المركزية الشاملة</h2>
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-secondary)] animate-pulse shadow-[0_0_8px_var(--color-secondary)]"></div>
            </motion.div>

            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-100">
              <motion.path d="M 50 10 C 50 16, 25 15, 25 22" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeOpacity="0.4" vectorEffect="non-scaling-stroke" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: isReady ? 1 : 0 }} transition={{ duration: 1.5 }} />
              <motion.path d="M 50 10 C 50 16, 25 15, 25 22" fill="none" stroke="var(--color-primary)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" className="animate-data-flow opacity-90" initial={{ pathLength: 0 }} animate={{ pathLength: isReady ? 1 : 0 }} transition={{ duration: 1.5 }} />
              <motion.path d="M 50 10 C 50 16, 75 15, 75 22" fill="none" stroke="var(--color-secondary)" strokeWidth="1.5" strokeOpacity="0.4" vectorEffect="non-scaling-stroke" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: isReady ? 1 : 0 }} transition={{ duration: 1.5 }} />
              <motion.path d="M 50 10 C 50 16, 75 15, 75 22" fill="none" stroke="var(--color-secondary)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" className="animate-data-flow opacity-90" initial={{ pathLength: 0 }} animate={{ pathLength: isReady ? 1 : 0 }} transition={{ duration: 1.5 }} />
              <motion.line x1="25" y1="22" x2="75" y2="22" stroke="var(--color-primary)" strokeWidth="1.5" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: isReady ? 1 : 0 }} transition={{ duration: 1, delay: 0.2 }} />
              <motion.line x1="25" y1="22" x2="75" y2="22" stroke="var(--color-primary)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" className="animate-data-flow opacity-90" initial={{ pathLength: 0 }} animate={{ pathLength: isReady ? 1 : 0 }} transition={{ duration: 1, delay: 0.2 }} />
              <motion.line x1="25" y1="40" x2="25" y2="56" stroke="var(--color-primary)" strokeWidth="1.5" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: isReady ? 1 : 0 }} transition={{ duration: 1.5, delay: 0.3 }} />
              <motion.line x1="25" y1="40" x2="25" y2="56" stroke="var(--color-primary)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" className="animate-data-flow opacity-90" initial={{ pathLength: 0 }} animate={{ pathLength: isReady ? 1 : 0 }} transition={{ duration: 1.5, delay: 0.3 }} />
              <motion.line x1="75" y1="48" x2="75" y2="56" stroke="var(--color-secondary)" strokeWidth="1.5" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: isReady ? 1 : 0 }} transition={{ duration: 1.5, delay: 0.3 }} />
              <motion.line x1="75" y1="48" x2="75" y2="56" stroke="var(--color-secondary)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" className="animate-data-flow opacity-90" initial={{ pathLength: 0 }} animate={{ pathLength: isReady ? 1 : 0 }} transition={{ duration: 1.5, delay: 0.3 }} />
              <motion.path d="M 25 72 C 25 78, 42 76, 50 76" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: isReady ? 1 : 0 }} transition={{ duration: 1, delay: 0.4 }} />
              <motion.path d="M 25 72 C 25 78, 42 76, 50 76" fill="none" stroke="var(--color-primary)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" className="animate-data-flow opacity-90" initial={{ pathLength: 0 }} animate={{ pathLength: isReady ? 1 : 0 }} transition={{ duration: 1, delay: 0.4 }} />
              <motion.path d="M 75 72 C 75 78, 58 76, 50 76" fill="none" stroke="var(--color-secondary)" strokeWidth="1.5" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: isReady ? 1 : 0 }} transition={{ duration: 1, delay: 0.4 }} />
              <motion.path d="M 75 72 C 75 78, 58 76, 50 76" fill="none" stroke="var(--color-secondary)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" className="animate-data-flow opacity-90" initial={{ pathLength: 0 }} animate={{ pathLength: isReady ? 1 : 0 }} transition={{ duration: 1, delay: 0.4 }} />
            </svg>

            <motion.div className="absolute top-[22vh] left-1/2 z-20 flex items-center justify-center pointer-events-none" initial={{ x: "-50%", y: "-50%", opacity: 0, scale: 0.5 }} animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }} transition={{ ...smoothSpring, delay: 0.2 }}>
              <div className="absolute w-20 h-20 bg-[var(--color-primary)] rounded-full blur-[30px] opacity-15 animate-pulse"></div>
              <div className="relative flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_15px_30px_rgba(17,79,209,0.15)]"><svg className="w-6 h-6 lg:w-7 lg:h-7 text-[var(--color-primary)] drop-shadow-[0_2px_4px_rgba(17,79,209,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" strokeWidth={2}></polyline><line x1="12" y1="22.08" x2="12" y2="12" strokeWidth={2}></line></svg></div>
            </motion.div>

            <motion.div className="absolute top-[10vh] left-1/2 z-30 flex flex-col items-center w-[40vw] max-w-[30rem] pointer-events-auto" initial={{ x: "calc(-50% - 20vw)", y: 20, opacity: 0, scale: 0.95 }} animate={isReady ? { x: "calc(-50% - 25vw)", y: 0, opacity: 1, scale: 1 } : { x: "calc(-50% - 20vw)", y: 20, opacity: 0, scale: 0.95 }} transition={{ ...smoothSpring, delay: 0.1 }}>
              <div onClick={() => setActiveGallery('web')} className="relative w-full flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
                <div className="relative w-full aspect-[16/10] bg-[#050505] rounded-t-[1rem] border-[3px] border-[#222] shadow-[0_25px_50px_rgba(17,79,209,0.15)] overflow-hidden z-20 flex flex-col p-1.5"><div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#111] border border-white/10 rounded-full z-40 flex items-center justify-center"></div><div className="relative w-full h-full bg-white rounded-sm overflow-hidden"><img src={WEB_IMAGES[0]} alt="Web" className="relative z-10 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" /></div></div>
                <div className="relative w-[114%] -ml-[7%] h-3 bg-gradient-to-b from-[#a0aab0] to-[#60676b] rounded-b-[10px] flex justify-center shadow-[0_10px_20px_rgba(0,0,0,0.1)] border-t border-[#d1d5db] z-10"><div className="w-16 h-1.5 bg-[#8b959c] rounded-b-md shadow-inner"></div></div>
                <div className="absolute -bottom-3 w-3.5 h-3.5 rounded-full bg-white border-2 border-[var(--color-primary)] shadow-[0_0_15px_rgba(17,79,209,0.4)] z-10 animate-pulse"></div>
              </div>
            </motion.div>

            <motion.div className="absolute top-[10vh] left-1/2 z-30 flex flex-col items-center w-[18vw] max-w-[12rem] pointer-events-auto" initial={{ x: "calc(-50% + 20vw)", y: 20, opacity: 0, scale: 0.95 }} animate={isReady ? { x: "calc(-50% + 25vw)", y: 0, opacity: 1, scale: 1 } : { x: "calc(-50% + 20vw)", y: 20, opacity: 0, scale: 0.95 }} transition={{ ...smoothSpring, delay: 0.2 }}>
              <div onClick={() => setActiveGallery('mobile')} className="relative w-full aspect-[9/19.5] bg-[#050505] rounded-[2rem] p-1.5 border-[4px] border-[#222] shadow-[0_25px_50px_rgba(13,148,104,0.15)] overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
                <div className="absolute top-16 -left-[4px] w-[2px] h-6 bg-slate-500 rounded-l-sm"></div><div className="absolute top-24 -left-[4px] w-[2px] h-10 bg-slate-500 rounded-l-sm"></div>
                <div className="relative w-full h-full bg-white rounded-[1.6rem] overflow-hidden"><div className="absolute top-2 left-1/2 -translate-x-1/2 w-[35%] h-4 bg-black rounded-full z-40 flex items-center justify-between px-1.5"><div className="w-1 h-1 rounded-full bg-indigo-900/40"></div></div><img src={MOBILE_IMAGES[0]} alt="Mobile" className="relative z-10 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" /></div>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-[var(--color-secondary)] shadow-[0_0_15px_rgba(13,148,104,0.4)] z-50 animate-pulse"></div>
              </div>
            </motion.div>

            <motion.div className="absolute top-[56vh] left-1/2 z-30 w-[38vw] max-w-[26rem] flex flex-col items-center group transition-colors duration-500" initial={{ x: "calc(-50% - 20vw)", y: -20, opacity: 0, scale: 0.95 }} animate={isReady ? { x: "calc(-50% - 25vw)", y: 0, opacity: 1, scale: 1 } : { x: "calc(-50% - 20vw)", y: -20, opacity: 0, scale: 0.95 }} transition={{ ...smoothSpring, delay: 0.3 }}>
              <div className="relative w-full bg-[var(--color-secondary)]/15 backdrop-blur-xl border border-[var(--color-secondary)]/30 p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(13,148,104,0.15)] text-center group-hover:bg-[var(--color-secondary)]/25 transition-colors">
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none z-0"><FallingShapes /></div>
                <h3 className="relative z-10 text-xl lg:text-2xl font-display font-extrabold text-[#022c22] mb-2 tracking-tight">نواة المؤسسة</h3><p className="relative z-10 text-sm lg:text-base font-bold text-[#064e3b] leading-relaxed">إدارة شاملة للبيانات والموارد عبر لوحات تحكم فائقة الأمان.</p>
              </div>
              <div className="absolute -top-3 w-4 h-4 rounded-full bg-[#f0f6ff] border-2 border-[var(--color-secondary)] z-20"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]"></div></div><div className="absolute -bottom-3 w-4 h-4 rounded-full bg-[#f0f6ff] border-2 border-[var(--color-secondary)] z-20"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]"></div></div>
            </motion.div>

            <motion.div className="absolute top-[56vh] left-1/2 z-30 w-[38vw] max-w-[26rem] flex flex-col items-center group transition-colors duration-500" initial={{ x: "calc(-50% + 20vw)", y: -20, opacity: 0, scale: 0.95 }} animate={isReady ? { x: "calc(-50% + 25vw)", y: 0, opacity: 1, scale: 1 } : { x: "calc(-50% + 20vw)", y: -20, opacity: 0, scale: 0.95 }} transition={{ ...smoothSpring, delay: 0.4 }}>
              <div className="relative w-full bg-[var(--color-secondary)]/15 backdrop-blur-xl border border-[var(--color-secondary)]/30 p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(13,148,104,0.15)] text-center group-hover:bg-[var(--color-secondary)]/25 transition-colors">
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none z-0"><FallingShapes /></div>
                <h3 className="relative z-10 text-xl lg:text-2xl font-display font-extrabold text-[#022c22] mb-2 tracking-tight">امتداد العمليات</h3><p className="relative z-10 text-sm lg:text-base font-bold text-[#064e3b] leading-relaxed">وصول مشفر وآني لبيانات المرضى، مع قدرات ربط عتادي مباشر.</p>
              </div>
              <div className="absolute -top-3 w-4 h-4 rounded-full bg-[#f0f6ff] border-2 border-[var(--color-secondary)] z-20"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]"></div></div><div className="absolute -bottom-3 w-4 h-4 rounded-full bg-[#f0f6ff] border-2 border-[var(--color-secondary)] z-20"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]"></div></div>
            </motion.div>

            <motion.div className="absolute bottom-[3vh] left-1/2 -translate-x-1/2 z-40 w-[85vw] max-w-[42rem] flex flex-col items-center" initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={isReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }} transition={{ ...smoothSpring, delay: 0.5 }}>
              <div className="relative w-full bg-gradient-to-b from-[var(--color-secondary)]/20 to-[var(--color-secondary)]/10 backdrop-blur-2xl border border-[var(--color-secondary)]/30 p-6 lg:p-8 rounded-[2.5rem] shadow-[0_30px_60px_rgba(13,148,104,0.12)] text-center flex flex-col items-center">
                <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none z-0"><FallingShapes /></div>
                <h2 className="relative z-10 mt-2 text-2xl lg:text-3xl font-display font-extrabold text-[#022c22] tracking-tight mb-3">تكامل بيئي شامل وموحد</h2>
                <p className="relative z-10 text-base lg:text-lg font-bold text-[#064e3b] leading-relaxed max-w-3xl">تعمل المنصة المركزية وتطبيق الأطباء ككيان واحد متزامن. أي تغيير ينعكس لحظياً عبر الشبكة، مما يضمن تدفقاً مثالياً ويلغي التكرار الإداري.</p>
              </div>
              <div className="absolute -top-6 flex items-center justify-center w-12 h-12 rounded-xl bg-[#064e3b] border-2 border-[var(--color-secondary)] shadow-[0_10px_20px_rgba(13,148,104,0.4)] z-50"><svg className="w-6 h-6 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* 🚀 الـ Lightbox التفاعلي بثلاثي الأبعاد ومجسمات اللوغو */}
      <AnimatePresence mode="wait">
        {activeGallery && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }} 
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
            exit={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }} 
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={closeGallery} 
            className="fixed inset-0 z-[999] bg-[#0A1326]/95 flex flex-col overflow-hidden"
          >
            {/* 🎨 خلفية مجسمات اللوغو المتكررة (Animated Parallax Background) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div className="parallax-layer layer-1"></div>
              <div className="parallax-layer layer-2"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1326] via-transparent to-[#0A1326] opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1326] via-transparent to-[#0A1326] opacity-80" />
            </div>

            {/* الهيدر الاحترافي */}
            <div className="relative z-50 flex-none h-20 px-6 md:px-10 flex items-center justify-between border-b border-white/5 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_15px_var(--color-primary)] animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-white/90 font-medium tracking-wide text-sm md:text-base drop-shadow-md">
                    {activeGallery === 'web' ? 'منصة إدارة العمليات المركزية' : 'تطبيق وصول الأطباء'}
                  </span>
                  <span className="text-white/40 text-xs tracking-widest uppercase font-mono">
                    Preview {currentImgIndex + 1} / {activeImages.length}
                  </span>
                </div>
              </div>
              
              <button onClick={closeGallery} className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300">
                <span className="hidden md:block text-xs font-semibold uppercase tracking-[0.2em] group-hover:text-white/80 transition-colors">Esc</span>
                <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/15 transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </button>
            </div>

            {/* مسرح العرض الرئيسي */}
            <div className="flex-1 relative flex items-center justify-center p-4 md:p-10 overflow-hidden group z-40" style={{ perspective: '1200px' }}>
              
              <button 
                onClick={goPrev} 
                className="absolute left-4 md:left-10 z-50 p-4 rounded-full bg-black/40 text-white/70 backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 hover:bg-[var(--color-primary)]/80 hover:border-[var(--color-primary)] hover:text-white hover:scale-110 transition-all duration-300 pointer-events-auto hidden md:block shadow-2xl"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>

              <div className="relative z-40 w-full h-full flex items-center justify-center pointer-events-none">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.img 
                    key={currentImgIndex} 
                    src={activeImages[currentImgIndex]} 
                    custom={direction} 
                    variants={slideVariants} 
                    initial="enter" 
                    animate="center" 
                    exit="exit" 
                    transition={{ type: "spring", stiffness: 220, damping: 25, mass: 1 }} 
                    /* 🔴 تم تحويل position إلى absolute للحفاظ على ترتيب الطبقات، وإزالة backdrop-blur-sm التي تسببت بالمشكلة وتخفيف الظل */
                    className={`absolute rounded-lg md:rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] object-contain pointer-events-auto max-h-full max-w-full ${
                      activeGallery === 'web' 
                        ? 'bg-transparent border-none' 
                        : 'bg-[#050505] border border-white/5'
                    }`} 
                    onClick={(e) => e.stopPropagation()}
                  />
                </AnimatePresence>
              </div>

              <button 
                onClick={goNext} 
                className="absolute right-4 md:right-10 z-50 p-4 rounded-full bg-black/40 text-white/70 backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 hover:bg-[var(--color-primary)]/80 hover:border-[var(--color-primary)] hover:text-white hover:scale-110 transition-all duration-300 pointer-events-auto hidden md:block shadow-2xl"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* شريط الصور المصغرة السفلي */}
            <div className="relative z-50 flex-none pb-8 pt-4 px-6 flex items-center justify-center gap-3 md:gap-5 overflow-x-auto pointer-events-auto" onClick={(e) => e.stopPropagation()}>
              {activeImages.map((src, idx) => (
                <button 
                  key={idx} 
                  onClick={() => { setDirection(idx > currentImgIndex ? 1 : -1); setCurrentImgIndex(idx); }} 
                  className={`relative overflow-hidden rounded-lg transition-all duration-300 ease-out flex-shrink-0 bg-[#0a0a0a] border ${
                    idx === currentImgIndex 
                      ? 'border-[var(--color-primary)] opacity-100 scale-110 shadow-[0_10px_30px_rgba(17,79,209,0.5)] z-10' 
                      : 'border-white/10 opacity-30 hover:opacity-80 hover:border-white/30 scale-95 hover:scale-100'
                  } ${activeGallery === 'web' ? 'w-24 h-16 md:w-36 md:h-24' : 'w-10 h-16 md:w-14 md:h-28'}`}
                >
                  <img src={src} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  {idx !== currentImgIndex && <div className="absolute inset-0 bg-black/40 hover:bg-black/10 transition-colors" />}
                </button>
              ))}
            </div>

            <div className="md:hidden relative z-50 flex-none pb-8 flex items-center justify-center gap-10 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
               <button onClick={goPrev} className="p-3.5 rounded-full bg-white/5 text-white/80 border border-white/10 active:scale-95 transition-transform"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
               <button onClick={goNext} className="p-3.5 rounded-full bg-white/5 text-white/80 border border-white/10 active:scale-95 transition-transform"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}