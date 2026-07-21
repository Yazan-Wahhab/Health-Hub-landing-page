"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// =========================================================================
// 🔥 قوائم الصور
// =========================================================================
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

// =========================================================================
// ✨ مكون المجسمات المتساقطة
// =========================================================================
const FallingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-60">
    <div className="absolute w-2.5 h-2.5 rounded-full bg-[var(--color-secondary)] shape-fall delay-1"></div>
    <div className="absolute w-2 h-2 bg-[#0EA5E9] rounded-sm shape-fall delay-2 rotate-45"></div>
    <svg className="absolute w-4 h-4 text-[var(--color-secondary)] shape-fall delay-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
    </svg>
    <div className="absolute w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shape-fall delay-4"></div>
    <svg className="absolute w-3 h-3 text-[#0EA5E9] shape-fall delay-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
    </svg>
    <div className="absolute w-3 h-3 rounded-full border border-[var(--color-secondary)] shape-fall delay-6"></div>
  </div>
);

export default function ZigZagSections() {
  const [activeGallery, setActiveGallery] = useState<'web' | 'mobile' | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // =========================================================================
  // 1. هندسة السكرول للشاشات الكبيرة (محمية 100% لم يتغير بها حرف)
  // =========================================================================
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const centerLogoOpacity = useTransform(scrollYProgress, [0, 0.02, 0.06, 0.1], [0, 1, 1, 0]);
  const centerLogoScale = useTransform(scrollYProgress, [0, 0.1], [0.5, 0.2]); 
  const devicesX = useTransform(scrollYProgress, [0.1, 0.25], ["0vw", "25vw"]);
  const devicesOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const topBranchDraw = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const bridgeDraw = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const verticalLineDraw = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const specificCardsOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const specificCardsY = useTransform(scrollYProgress, [0.4, 0.5], [20, 0]);
  const curveLineDraw = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const sharedCardOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const sharedCardY = useTransform(scrollYProgress, [0.65, 0.75], [20, 0]);

  // =========================================================================
  // 2. هندسة السكرول المخصصة للموبايل (تمت مزامنتها رياضياً لتطابق سلاسة اللابتوب)
  // =========================================================================
  const mobileContainerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: mobileScroll } = useScroll({ target: mobileContainerRef, offset: ["start start", "end end"] });

  // عملية حسابية: بما أن الديسكتوب 450vh والموبايل 200vh، تم ضرب قيم الديسكتوب بـ 2.25 لمطابقة نفس السرعة الفيزيائية
  const mLogoOpacity = useTransform(mobileScroll, [0, 0.045, 0.135, 0.225], [0, 1, 1, 0]);
  const mLogoScale = useTransform(mobileScroll, [0, 0.225], [0.5, 0.2]);
  const mContentOpacity = useTransform(mobileScroll, [0.225, 0.35], [0, 1]);
  const mContentY = useTransform(mobileScroll, [0.225, 0.35], [20, 0]);
  const mLinesDraw = useTransform(mobileScroll, [0.35, 0.95], [0, 1]);

  // =========================================================================
  // التحكم بالصور (Pop-up)
  // =========================================================================
  const activeImages = activeGallery === 'web' ? WEB_IMAGES : MOBILE_IMAGES;
  const goNext = () => setCurrentImgIndex((prev) => (prev + 1) % activeImages.length);
  const goPrev = () => setCurrentImgIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  const closeGallery = () => { setActiveGallery(null); setCurrentImgIndex(0); };

  useEffect(() => {
    if (!activeGallery) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") closeGallery();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGallery, activeImages.length]);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dataFlow { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
        .animate-data-flow { animation: dataFlow 1.5s linear infinite; }
        
        @keyframes fallDown {
          0% { transform: translateY(-30px) rotate(0deg) scale(0.5); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(150px) rotate(180deg) scale(1.2); opacity: 0; }
        }
        .shape-fall { animation: fallDown 4s linear infinite; }
        .delay-1 { animation-delay: 0.1s; left: 10%; animation-duration: 4.5s; }
        .delay-2 { animation-delay: 1.2s; left: 25%; animation-duration: 3.8s; }
        .delay-3 { animation-delay: 0.5s; left: 50%; animation-duration: 5s; }
        .delay-4 { animation-delay: 2.1s; left: 70%; animation-duration: 4.2s; }
        .delay-5 { animation-delay: 0.8s; left: 85%; animation-duration: 4.8s; }
        .delay-6 { animation-delay: 1.5s; left: 40%; animation-duration: 5.5s; }
      `}} />

      {/* =========================================================================
          📱 قسم الموبايل
          ========================================================================= */}
      <div className="block lg:hidden">
        <section ref={mobileContainerRef} className="relative h-[200vh] w-full bg-transparent z-10">
          <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center pointer-events-none">
            
            {/* اللوغو الافتتاحي للموبايل: تم تغيير w-48 إلى w-64 ليتطابق مع حجم اللابتوب ويمنع القفزة */}
            <motion.div 
              className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
              style={{ opacity: mLogoOpacity, scale: mLogoScale }}
            >
              <div className="relative perspective-[1200px] flex items-center justify-center">
                <div className="absolute h-full w-full rounded-full bg-[var(--color-primary)] opacity-[0.08] blur-[80px] scale-125"></div>
                <img src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75" alt="Core Logo" className="relative w-64 h-64 object-contain drop-shadow-[0_20px_40px_rgba(17,79,209,0.15)] grayscale-[10%]" />
              </div>
            </motion.div>

            {/* العناصر التي ستظهر وتكتمل مع السكرول (حسب تصميمك الأخير المعتمد) */}
            <motion.div 
              className="relative w-full h-[88svh] max-h-[800px] max-w-[420px] mx-auto pointer-events-auto"
              style={{ opacity: mContentOpacity, y: mContentY }}
            >
              
              <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" preserveAspectRatio="none">
                <motion.line x1="25%" y1="18%" x2="25%" y2="82%" stroke="var(--color-primary)" strokeOpacity="0.2" strokeWidth="1.5" />
                <motion.line x1="25%" y1="18%" x2="25%" y2="82%" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="6 8" className="animate-data-flow opacity-60" style={{ pathLength: mLinesDraw }} />

                <motion.line x1="75%" y1="18%" x2="75%" y2="82%" stroke="var(--color-secondary)" strokeOpacity="0.2" strokeWidth="1.5" />
                <motion.line x1="75%" y1="18%" x2="75%" y2="82%" stroke="var(--color-secondary)" strokeWidth="2" strokeDasharray="6 8" className="animate-data-flow opacity-60" style={{ pathLength: mLinesDraw }} />

                <motion.line x1="25%" y1="50%" x2="38%" y2="50%" stroke="var(--color-primary)" strokeOpacity="0.2" strokeWidth="1.5" />
                <motion.line x1="25%" y1="50%" x2="38%" y2="50%" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="6 8" className="animate-data-flow opacity-60" style={{ pathLength: mLinesDraw }} />

                <motion.line x1="62%" y1="50%" x2="75%" y2="50%" stroke="var(--color-secondary)" strokeOpacity="0.2" strokeWidth="1.5" />
                <motion.line x1="62%" y1="50%" x2="75%" y2="50%" stroke="var(--color-secondary)" strokeWidth="2" strokeDasharray="6 8" className="animate-data-flow opacity-60" style={{ pathLength: mLinesDraw }} />
              </svg>

              {/* 1. أعلى اليسار: كارت نواة المؤسسة */}
              <div className="absolute top-[10%] left-[2%] w-[46%] flex justify-center">
                <div className="relative w-full bg-[var(--color-secondary)]/15 backdrop-blur-xl border border-[var(--color-secondary)]/30 p-4 rounded-[1.2rem] shadow-[0_20px_50px_rgba(13,148,104,0.15)] text-center group">
                  <div className="absolute inset-0 rounded-[1.2rem] overflow-hidden pointer-events-none z-0">
                    <FallingShapes />
                  </div>
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#f0f6ff] border-2 border-[var(--color-primary)] rounded-full z-20 shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div>
                  </div>
                  <h3 className="relative z-10 text-[14px] font-display font-extrabold text-[#022c22] mb-1.5 tracking-tight drop-shadow-sm">نواة المؤسسة</h3>
                  <p className="relative z-10 text-[11px] font-bold text-[#064e3b] leading-relaxed drop-shadow-sm">إدارة شاملة للبيانات، الموارد، والسعة السريرية.</p>
                </div>
              </div>

              {/* 2. أعلى اليمين: جهاز الموبايل */}
              <div className="absolute top-[6%] right-[2%] w-[46%] flex justify-center">
                <div onClick={() => setActiveGallery('mobile')} className="relative w-[50%] max-w-[100px] aspect-[9/19.5] bg-[#050505] rounded-[1rem] p-1 border-[2px] border-[#222] shadow-[0_15px_30px_rgba(13,148,104,0.15)] group cursor-pointer active:scale-95 transition-transform z-20">
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-black rounded-full z-40"></div>
                  <div className="relative w-full h-full bg-white rounded-[0.8rem] overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="bg-white text-[var(--color-secondary)] font-bold px-2 py-1 rounded-full shadow-lg text-[8px]">فتح</span>
                    </div>
                    <img src={MOBILE_IMAGES[0]} alt="Mobile App" className="w-full h-full object-cover object-top" />
                  </div>
                </div>
              </div>

              {/* 3. المنتصف: الشرح المشترك */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] max-w-[150px] z-30">
                <div className="relative bg-gradient-to-b from-[var(--color-secondary)]/20 to-[var(--color-secondary)]/10 backdrop-blur-2xl border border-[var(--color-secondary)]/30 px-3 py-4 rounded-[1.2rem] shadow-[0_20px_50px_rgba(13,148,104,0.15)] text-center">
                  <div className="absolute inset-0 rounded-[1.2rem] overflow-hidden pointer-events-none z-0">
                    <FallingShapes />
                  </div>
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-[#064e3b] flex items-center justify-center shadow-md border-[3px] border-[var(--color-secondary)]/40 z-20">
                    <svg className="w-4 h-4 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  </div>
                  <h3 className="relative z-10 text-[12px] font-display font-extrabold text-[#022c22] mb-1 mt-2 tracking-tight drop-shadow-sm">تكامل بيئي شامل</h3>
                  <p className="relative z-10 text-[9px] font-bold text-[#064e3b] leading-relaxed drop-shadow-sm">تعمل المنصة والتطبيق ككيان واحد متزامن.</p>
                </div>
              </div>

              {/* 4. أسفل اليسار: جهاز اللابتوب */}
              <div className="absolute bottom-[8%] left-[2%] w-[46%] flex justify-center">
                <div onClick={() => setActiveGallery('web')} className="relative w-[90%] max-w-[170px] aspect-[16/10] bg-[#050505] rounded-t-[0.5rem] border-[2px] border-[#222] shadow-[0_15px_30px_rgba(17,79,209,0.15)] flex flex-col p-1 group cursor-pointer active:scale-95 transition-transform z-20">
                  <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#111] rounded-full z-40"></div>
                  <div className="relative w-full h-full bg-white rounded-sm overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="bg-white text-[var(--color-primary)] font-bold px-3 py-1 rounded-full shadow-lg text-[8px]">فتح</span>
                    </div>
                    <img src={WEB_IMAGES[0]} alt="Web Dashboard" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="absolute -bottom-1.5 -left-[5%] w-[110%] h-1.5 bg-gradient-to-b from-[#a0aab0] to-[#60676b] rounded-b-md flex justify-center border-t border-[#d1d5db]"></div>
                </div>
              </div>

              {/* 5. أسفل اليمين: كارت امتداد العمليات */}
              <div className="absolute bottom-[10%] right-[2%] w-[46%] flex justify-center">
                <div className="relative w-full bg-[var(--color-secondary)]/15 backdrop-blur-xl border border-[var(--color-secondary)]/30 p-4 rounded-[1.2rem] shadow-[0_20px_50px_rgba(13,148,104,0.15)] text-center">
                  <div className="absolute inset-0 rounded-[1.2rem] overflow-hidden pointer-events-none z-0">
                    <FallingShapes />
                  </div>
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#f0f6ff] border-2 border-[var(--color-secondary)] rounded-full z-20 shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]"></div>
                  </div>
                  <h3 className="relative z-10 text-[14px] font-display font-extrabold text-[#022c22] mb-1.5 tracking-tight drop-shadow-sm">امتداد العمليات</h3>
                  <p className="relative z-10 text-[11px] font-bold text-[#064e3b] leading-relaxed drop-shadow-sm">وصول مشفر وآني لبيانات المرضى عبر نقطة الرعاية.</p>
                </div>
              </div>

            </motion.div>
          </div>
        </section>
      </div>


      {/* =========================================================================
          💻 قسم اللابتوب والشاشات الكبيرة (كودك الأصلي تماماً، محمي ولم يتم لمس أي سطر فيه)
          ========================================================================= */}
      <div className="hidden lg:block">
        <section ref={containerRef} className="relative h-[450vh] w-full bg-transparent z-10">
          <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">
            
            {/* اللوغو الافتتاحي */}
            <motion.div 
              className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center"
              style={{ opacity: centerLogoOpacity, scale: centerLogoScale }}
            >
              <div className="relative perspective-[1200px] flex items-center justify-center">
                <div className="absolute h-full w-full rounded-full bg-[var(--color-primary)] opacity-[0.08] blur-[80px] scale-125"></div>
                <img src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75" alt="Core Logo" className="relative w-64 h-64 lg:w-[28rem] lg:h-[28rem] object-contain drop-shadow-[0_20px_40px_rgba(17,79,209,0.15)] grayscale-[10%]" />
              </div>
            </motion.div>

            {/* العنوان الرئيسي العلوي */}
            <motion.div
              className="absolute top-[4vh] left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-xl border border-[var(--color-border)] shadow-[0_15px_30px_rgba(0,0,0,0.06)] px-8 py-3.5 rounded-full text-center flex items-center gap-4"
              style={{ opacity: devicesOpacity, y: useTransform(devicesOpacity, [0, 1], [-20, 0]) }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_8px_var(--color-primary)]"></div>
              <h2 className="text-xl md:text-2xl font-display font-extrabold text-[#022c22] tracking-tight">
                المنصة المركزية الشاملة
              </h2>
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-secondary)] animate-pulse shadow-[0_0_8px_var(--color-secondary)]"></div>
            </motion.div>

            {/* شبكة البيانات النبضية */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-100">
              <motion.path d="M 50 10 C 50 16, 25 15, 25 22" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeOpacity="0.4" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ pathLength: topBranchDraw }} />
              <motion.path d="M 50 10 C 50 16, 25 15, 25 22" fill="none" stroke="var(--color-primary)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" className="animate-data-flow opacity-90" style={{ pathLength: topBranchDraw }} />
              
              <motion.path d="M 50 10 C 50 16, 75 15, 75 22" fill="none" stroke="var(--color-secondary)" strokeWidth="1.5" strokeOpacity="0.4" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ pathLength: topBranchDraw }} />
              <motion.path d="M 50 10 C 50 16, 75 15, 75 22" fill="none" stroke="var(--color-secondary)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" className="animate-data-flow opacity-90" style={{ pathLength: topBranchDraw }} />

              <motion.line x1="25" y1="22" x2="75" y2="22" stroke="var(--color-primary)" strokeWidth="1.5" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" style={{ pathLength: bridgeDraw }} />
              <motion.line x1="25" y1="22" x2="75" y2="22" stroke="var(--color-primary)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" className="animate-data-flow opacity-90" style={{ pathLength: bridgeDraw }} />

              <motion.line x1="25" y1="40" x2="25" y2="56" stroke="var(--color-primary)" strokeWidth="1.5" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ pathLength: verticalLineDraw }} />
              <motion.line x1="25" y1="40" x2="25" y2="56" stroke="var(--color-primary)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" className="animate-data-flow opacity-90" style={{ pathLength: verticalLineDraw }} />

              <motion.line x1="75" y1="48" x2="75" y2="56" stroke="var(--color-secondary)" strokeWidth="1.5" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ pathLength: verticalLineDraw }} />
              <motion.line x1="75" y1="48" x2="75" y2="56" stroke="var(--color-secondary)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" className="animate-data-flow opacity-90" style={{ pathLength: verticalLineDraw }} />

              <motion.path d="M 25 72 C 25 78, 42 76, 50 76" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ pathLength: curveLineDraw }} />
              <motion.path d="M 25 72 C 25 78, 42 76, 50 76" fill="none" stroke="var(--color-primary)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" className="animate-data-flow opacity-90" style={{ pathLength: curveLineDraw }} />

              <motion.path d="M 75 72 C 75 78, 58 76, 50 76" fill="none" stroke="var(--color-secondary)" strokeWidth="1.5" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ pathLength: curveLineDraw }} />
              <motion.path d="M 75 72 C 75 78, 58 76, 50 76" fill="none" stroke="var(--color-secondary)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" className="animate-data-flow opacity-90" style={{ pathLength: curveLineDraw }} />
            </svg>

            {/* المجسم المركزي الرابط */}
            <motion.div 
              className="absolute top-[22vh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none"
              style={{ opacity: bridgeDraw }}
            >
              <div className="absolute w-20 h-20 bg-[var(--color-primary)] rounded-full blur-[30px] opacity-15 animate-pulse"></div>
              <div className="relative flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_15px_30px_rgba(17,79,209,0.15)]">
                <svg className="w-6 h-6 lg:w-7 lg:h-7 text-[var(--color-primary)] drop-shadow-[0_2px_4px_rgba(17,79,209,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" strokeWidth={2}></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12" strokeWidth={2}></line>
                </svg>
              </div>
            </motion.div>

            {/* اللابتوب */}
            <motion.div 
              className="absolute top-[10vh] left-1/2 z-30 flex flex-col items-center w-[40vw] max-w-[30rem] pointer-events-auto"
              style={{ x: useTransform(devicesX, v => `calc(-50% - ${v})`), opacity: devicesOpacity }}
            >
              <div onClick={() => setActiveGallery('web')} className="relative w-full flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
                <div className="relative w-full aspect-[16/10] bg-[#050505] rounded-t-[1rem] border-[3px] border-[#222] shadow-[0_25px_50px_rgba(17,79,209,0.15)] overflow-hidden z-20 flex flex-col p-1.5">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#111] border border-white/10 rounded-full z-40 flex items-center justify-center"></div>
                  <div className="relative w-full h-full bg-white rounded-sm overflow-hidden">
                    <div className="absolute inset-0 bg-[#0EA5E9]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex items-center justify-center backdrop-blur-sm">
                      <span className="bg-[#0f172a] text-[#0EA5E9] font-bold px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-sm transition-transform group-hover:scale-105">
                        استعراض النظام
                      </span>
                    </div>
                    <img src={WEB_IMAGES[0]} alt="Web" className="relative z-10 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                </div>
                <div className="relative w-[114%] -ml-[7%] h-3 bg-gradient-to-b from-[#a0aab0] to-[#60676b] rounded-b-[10px] flex justify-center shadow-[0_10px_20px_rgba(0,0,0,0.1)] border-t border-[#d1d5db] z-10">
                  <div className="w-16 h-1.5 bg-[#8b959c] rounded-b-md shadow-inner"></div>
                </div>
                <div className="absolute -bottom-3 w-3.5 h-3.5 rounded-full bg-white border-2 border-[var(--color-primary)] shadow-[0_0_15px_rgba(17,79,209,0.4)] z-10 animate-pulse"></div>
              </div>
            </motion.div>

            {/* الموبايل */}
            <motion.div 
              className="absolute top-[10vh] left-1/2 z-30 flex flex-col items-center w-[18vw] max-w-[12rem] pointer-events-auto"
              style={{ x: useTransform(devicesX, v => `calc(-50% + ${v})`), opacity: devicesOpacity }}
            >
              <div onClick={() => setActiveGallery('mobile')} className="relative w-full aspect-[9/19.5] bg-[#050505] rounded-[2rem] p-1.5 border-[4px] border-[#222] shadow-[0_25px_50px_rgba(13,148,104,0.15)] overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
                <div className="absolute top-16 -left-[4px] w-[2px] h-6 bg-slate-500 rounded-l-sm"></div>
                <div className="absolute top-24 -left-[4px] w-[2px] h-10 bg-slate-500 rounded-l-sm"></div>
                
                <div className="relative w-full h-full bg-white rounded-[1.6rem] overflow-hidden">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[35%] h-4 bg-black rounded-full z-40 flex items-center justify-between px-1.5">
                    <div className="w-1 h-1 rounded-full bg-indigo-900/40"></div>
                  </div>
                  <div className="absolute inset-0 bg-[var(--color-secondary)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex items-center justify-center backdrop-blur-sm">
                    <span className="bg-[#0f172a] text-[var(--color-secondary)] font-bold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs text-center transition-transform group-hover:scale-105">
                      استعراض التطبيق
                    </span>
                  </div>
                  <img src={MOBILE_IMAGES[0]} alt="Mobile" className="relative z-10 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-[var(--color-secondary)] shadow-[0_0_15px_rgba(13,148,104,0.4)] z-50 animate-pulse"></div>
              </div>
            </motion.div>

            {/* الشروحات الفردية */}
            <motion.div 
              className="absolute top-[56vh] left-1/2 z-30 w-[38vw] max-w-[26rem] flex flex-col items-center group transition-colors duration-500"
              style={{ x: useTransform(devicesX, v => `calc(-50% - ${v})`), opacity: specificCardsOpacity, y: specificCardsY }}
            >
              <div className="relative w-full bg-[var(--color-secondary)]/15 backdrop-blur-xl border border-[var(--color-secondary)]/30 p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(13,148,104,0.15)] text-center group-hover:bg-[var(--color-secondary)]/25 transition-colors">
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none z-0">
                  <FallingShapes />
                </div>

                <h3 className="relative z-10 text-xl lg:text-2xl font-display font-extrabold text-[#022c22] mb-2 tracking-tight drop-shadow-sm">
                  نواة المؤسسة
                </h3>
                <p className="relative z-10 text-sm lg:text-base font-bold text-[#064e3b] leading-relaxed drop-shadow-sm">
                  إدارة شاملة للبيانات، الموارد، والسعة السريرية عبر لوحات تحكم فائقة الأمان والوضوح.
                </p>
              </div>
              
              <div className="absolute -top-3 w-4 h-4 rounded-full bg-[#f0f6ff] border-2 border-[var(--color-secondary)] shadow-sm flex items-center justify-center z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]"></div>
              </div>
              <div className="absolute -bottom-3 w-4 h-4 rounded-full bg-[#f0f6ff] border-2 border-[var(--color-secondary)] shadow-sm flex items-center justify-center z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]"></div>
              </div>
            </motion.div>

            <motion.div 
              className="absolute top-[56vh] left-1/2 z-30 w-[38vw] max-w-[26rem] flex flex-col items-center group transition-colors duration-500"
              style={{ x: useTransform(devicesX, v => `calc(-50% + ${v})`), opacity: specificCardsOpacity, y: specificCardsY }}
            >
              <div className="relative w-full bg-[var(--color-secondary)]/15 backdrop-blur-xl border border-[var(--color-secondary)]/30 p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(13,148,104,0.15)] text-center group-hover:bg-[var(--color-secondary)]/25 transition-colors">
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none z-0">
                  <FallingShapes />
                </div>

                <h3 className="relative z-10 text-xl lg:text-2xl font-display font-extrabold text-[#022c22] mb-2 tracking-tight drop-shadow-sm">
                  امتداد العمليات
                </h3>
                <p className="relative z-10 text-sm lg:text-base font-bold text-[#064e3b] leading-relaxed drop-shadow-sm">
                  وصول مشفر وآني لبيانات المرضى، مع قدرات ربط عتادي مباشر عبر نقطة الرعاية الطبية.
                </p>
              </div>

              <div className="absolute -top-3 w-4 h-4 rounded-full bg-[#f0f6ff] border-2 border-[var(--color-secondary)] shadow-sm flex items-center justify-center z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]"></div>
              </div>
              <div className="absolute -bottom-3 w-4 h-4 rounded-full bg-[#f0f6ff] border-2 border-[var(--color-secondary)] shadow-sm flex items-center justify-center z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]"></div>
              </div>
            </motion.div>

            {/* الشرح المشترك */}
            <motion.div 
              className="absolute bottom-[3vh] left-1/2 -translate-x-1/2 z-40 w-[85vw] max-w-[42rem] flex flex-col items-center"
              style={{ opacity: sharedCardOpacity, y: sharedCardY }}
            >
              <div className="relative w-full bg-gradient-to-b from-[var(--color-secondary)]/20 to-[var(--color-secondary)]/10 backdrop-blur-2xl border border-[var(--color-secondary)]/30 p-6 lg:p-8 rounded-[2.5rem] shadow-[0_30px_60px_rgba(13,148,104,0.12)] text-center flex flex-col items-center">
                
                <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none z-0">
                  <FallingShapes />
                </div>
                
                <h2 className="relative z-10 mt-2 text-2xl lg:text-3xl font-display font-extrabold text-[#022c22] tracking-tight mb-3 drop-shadow-sm">
                  تكامل بيئي شامل وموحد
                </h2>
                <p className="relative z-10 text-base lg:text-lg font-bold text-[#064e3b] leading-relaxed max-w-3xl drop-shadow-sm">
                  تعمل المنصة المركزية وتطبيق الأطباء ككيان واحد متزامن. أي تغيير في السجلات أو أوامر الرعاية ينعكس لحظياً عبر الشبكة، مما يضمن تدفقاً مثالياً ويلغي التكرار الإداري.
                </p>
              </div>

              <div className="absolute -top-6 flex items-center justify-center w-12 h-12 rounded-xl bg-[#064e3b] border-2 border-[var(--color-secondary)] shadow-[0_10px_20px_rgba(13,148,104,0.4)] z-50">
                <svg className="w-6 h-6 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              </div>
            </motion.div>

          </div>
        </section>
      </div>

      {/* =========================================================================
          🔥 البوب أب (Light Frosted Gallery Modal) - مشترك ومحمي
          ========================================================================= */}
      <AnimatePresence>
        {activeGallery && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-background)]/85 backdrop-blur-2xl p-4 sm:p-10"
          >
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.05]"
              style={{ 
                backgroundImage: "url('https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75')",
                backgroundRepeat: "repeat",
                backgroundSize: "140px 140px",
                backgroundPosition: "center"
              }}
            />

            <button onClick={closeGallery} className="absolute top-6 right-6 lg:top-8 lg:right-8 text-slate-500 bg-white/80 border border-slate-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 rounded-full p-3 lg:p-4 transition-all z-50 shadow-sm">
              <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <motion.div 
              key={currentImgIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()} 
              className={`relative shadow-[0_30px_60px_rgba(17,79,209,0.15)] rounded-xl lg:rounded-3xl overflow-hidden border border-[var(--color-primary)]/10 z-40 bg-white ${activeGallery === 'web' ? 'w-full max-w-7xl aspect-[16/10]' : 'h-[90vh] aspect-[9/19.5]'}`}
            >
              <img src={activeImages[currentImgIndex]} alt={`Gallery image ${currentImgIndex + 1}`} className="w-full h-full object-contain" />
            </motion.div>

            {activeImages.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white p-3 lg:p-5 rounded-full transition-all hover:scale-110 z-50 border border-white shadow-[0_10px_20px_rgba(17,79,209,0.1)] group">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white p-3 lg:p-5 rounded-full transition-all hover:scale-110 z-50 border border-white shadow-[0_10px_20px_rgba(17,79,209,0.1)] group">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}

            <div className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-50">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl px-5 py-2.5 rounded-full border border-[var(--color-primary)]/10 shadow-lg">
                {activeImages.map((_, idx) => (
                  <div key={idx} className={`rounded-full transition-all duration-300 ${idx === currentImgIndex ? (activeGallery === 'web' ? 'bg-[var(--color-primary)] w-8 h-2' : 'bg-[var(--color-secondary)] w-8 h-2') : 'bg-slate-300 w-2 h-2 hover:bg-slate-400'}`} />
                ))}
              </div>
              <div className="text-slate-500 text-[10px] font-bold tracking-widest uppercase bg-white/80 px-4 py-1.5 rounded-full backdrop-blur-md hidden sm:block shadow-sm border border-slate-100">
                استخدم الأسهم للتنقل • Esc للإغلاق
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}