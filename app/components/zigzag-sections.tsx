"use client";

import { useRef, useState } from "react";
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

export default function ZigZagSections() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeGallery, setActiveGallery] = useState<'web' | 'mobile' | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const centerLogoOpacity = useTransform(scrollYProgress, [0, 0.02, 0.15], [0, 1, 0]);
  const centerLogoScale = useTransform(scrollYProgress, [0, 0.15], [0.45, 0.1]); 

  const webCardX = useTransform(scrollYProgress, [0.1, 0.4], ["0vw", "-25vw"]);
  const mobileCardX = useTransform(scrollYProgress, [0.1, 0.4], ["0vw", "25vw"]);
  const cardsOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const cardsScale = useTransform(scrollYProgress, [0.1, 0.4], [0.5, 1]);

  const textOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.35, 0.55], [40, 0]);
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "40%"]);

  const capsuleY = useTransform(scrollYProgress, [0, 1], ["-10vh", "50vh"]);
  const ringY = useTransform(scrollYProgress, [0, 1], ["60vh", "-20vh"]);
  const dotsY = useTransform(scrollYProgress, [0, 1], ["0vh", "30vh"]);

  const activeImages = activeGallery === 'web' ? WEB_IMAGES : MOBILE_IMAGES;
  const nextImage = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentImgIndex((prev) => (prev + 1) % activeImages.length); };
  const prevImage = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentImgIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length); };
  const closeGallery = () => { setActiveGallery(null); setCurrentImgIndex(0); };

  return (
    <>
      <section ref={containerRef} className="relative h-[350vh] w-full bg-transparent z-10">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
          
          <motion.div 
            className="absolute right-[8%] w-48 h-96 rounded-full bg-gradient-to-tr from-white/10 to-[#114FD1]/10 backdrop-blur-3xl shadow-[inset_10px_10px_30px_rgba(255,255,255,0.4),0_20px_50px_rgba(17,79,209,0.2)] border border-white/20" 
            style={{ y: capsuleY, rotate: 15 }} 
          />
          <motion.div 
            className="absolute left-[10%] w-72 h-72 rounded-full border-[6px] border-[#10B981]/30 shadow-[0_0_60px_rgba(16,185,129,0.2)]" 
            style={{ y: ringY, rotateX: 60, rotateY: -20 }} 
          >
            <div className="absolute inset-2 rounded-full border border-[#114FD1]/50 animate-pulse"></div>
          </motion.div>
          <motion.div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(17,79,209,0.2)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" style={{ y: dotsY }} />

          <motion.div className="absolute h-1.5 bg-gradient-to-r from-[#114FD1] via-[#10B981] to-[#114FD1] rounded-full opacity-60 blur-[1px] z-10" style={{ width: lineWidth }} />

          <motion.div 
            className="absolute z-30 pointer-events-none flex items-center justify-center"
            style={{ opacity: centerLogoOpacity, scale: centerLogoScale }}
          >
            <motion.div
              animate={{ y: [0, -25, 0], rotateZ: [0, 3, -3, 0], rotateY: [0, 15, -15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative perspective-[1200px] flex items-center justify-center"
            >
              <div className="absolute h-full w-full rounded-full bg-[#10B981] opacity-[0.25] blur-[80px] scale-110"></div>
              <div className="absolute h-full w-full rounded-full bg-[#114FD1] opacity-[0.25] blur-[100px] scale-125 translate-x-5"></div>
              <img 
                src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75" 
                alt="Health Hub Logo" 
                className="relative z-10 w-72 h-72 lg:w-[34rem] lg:h-[34rem] object-contain drop-shadow-[0_30px_40px_rgba(17,79,209,0.6)]"
              />
            </motion.div>
          </motion.div>

          {/* =================== قسم الويب (شاشة حاسوب فخمة) =================== */}
          <motion.div 
            className="absolute z-20 flex flex-col items-center w-[40vw] max-w-[42rem] pointer-events-auto"
            style={{ x: webCardX, opacity: cardsOpacity, scale: cardsScale }}
          >
            <div 
              onClick={() => setActiveGallery('web')}
              className="relative w-full flex flex-col items-center group cursor-pointer"
            >
              <div className="relative w-full aspect-video bg-slate-900 rounded-t-2xl rounded-b-md p-2 lg:p-3 shadow-[0_30px_60px_rgba(10,27,63,0.5)] border border-slate-700/50">
                <div className="absolute top-1 lg:top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]"></div>
                
                <div className="relative w-full h-full bg-[#0a1b3f] rounded-sm overflow-hidden border border-slate-800">
                  <div className="absolute inset-0 bg-[#0a1b3f]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="bg-[#114FD1] text-white font-bold px-6 py-2.5 rounded-full shadow-[0_0_30px_rgba(17,79,209,0.6)] transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                      فتح المعرض
                    </span>
                  </div>
                  
                  {/* 🔥 المؤشر الدائم لمعرفة وجود صور إضافية 🔥 */}
                  <div className="absolute bottom-3 right-3 bg-[#114FD1]/90 backdrop-blur-md border border-blue-400/50 text-white text-[10px] lg:text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 z-10 animate-bounce shadow-[0_0_20px_rgba(17,79,209,0.8)]">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span>تصفح {WEB_IMAGES.length} صور</span>
                  </div>

                  <img src={WEB_IMAGES[0]} alt="Web Dashboard" className="relative z-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                
                <div className="h-4 lg:h-5 w-full bg-gradient-to-b from-slate-200 to-slate-400 rounded-b-sm mt-2 lg:mt-3 flex justify-center items-center">
                  <div className="w-6 h-1 bg-slate-500/30 rounded-full"></div>
                </div>
              </div>
              <div className="w-16 h-8 lg:h-12 bg-gradient-to-b from-slate-300 to-slate-400 shadow-inner"></div>
              <div className="w-32 lg:w-40 h-2 bg-slate-300 rounded-t-xl shadow-[0_10px_20px_rgba(0,0,0,0.2)]"></div>
            </div>

            {/* الشرح الاحترافي المظلم (Dark Enterprise Card) */}
            <motion.div 
              className="mt-6 relative w-[105%] bg-[#0a1b3f]/90 backdrop-blur-2xl p-6 lg:p-8 rounded-[2rem] border border-[#114FD1]/40 shadow-[0_30px_80px_rgba(17,79,209,0.25)] overflow-hidden" 
              style={{ opacity: textOpacity, y: textY }}
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#114FD1]/20 rounded-full blur-3xl"></div>
              
              <div className="flex items-start gap-5 relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#114FD1] to-[#0f3fb0] text-white shadow-[0_0_20px_rgba(17,79,209,0.5)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5894F5]"></span>
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5894F5]">Smart Care Core</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-display font-extrabold text-white tracking-tight">نواة التشغيل المركزية</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#114FD1] to-[#10B981] rounded-full mt-3 mb-3"></div>
                  <p className="text-sm font-medium text-blue-100/80 leading-relaxed">
                    منصة مؤسساتية مصممة للتحكم المطلق في تدفق البيانات الطبية. توفر إدارة شاملة للموارد، دورة الإيرادات، وتخطيط السعة السريرية عبر بنية تحتية آمنة وموثوقة تدعم اتخاذ القرارات اللحظية بالمستشفيات الكبرى.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* =================== قسم الموبايل (iPhone Mockup) =================== */}
          <motion.div 
            className="absolute z-20 flex flex-col items-center w-[20vw] max-w-[18rem] pointer-events-auto"
            style={{ x: mobileCardX, opacity: cardsOpacity, scale: cardsScale }}
          >
            <div 
              onClick={() => setActiveGallery('mobile')}
              className="relative w-full aspect-[9/19.5] bg-slate-900 rounded-[2.5rem] lg:rounded-[3rem] p-1.5 lg:p-2 shadow-[0_30px_60px_rgba(10,27,63,0.5)] border border-slate-700/50 group cursor-pointer"
            >
              {/* 🔥 أزرار الموبايل الجانبية (أنحف وأكثر واقعية) 🔥 */}
              <div className="absolute top-20 -left-[2px] w-[2px] h-8 bg-slate-600 rounded-l-md"></div>
              <div className="absolute top-32 -left-[2px] w-[2px] h-12 bg-slate-600 rounded-l-md"></div>
              <div className="absolute top-48 -left-[2px] w-[2px] h-12 bg-slate-600 rounded-l-md"></div>
              <div className="absolute top-36 -right-[2px] w-[2px] h-16 bg-slate-600 rounded-r-md"></div>

              <div className="relative w-full h-full bg-[#0a1b3f] rounded-[2.2rem] lg:rounded-[2.6rem] overflow-hidden border border-black">
                <div className="absolute inset-0 bg-[#0a1b3f]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="bg-[#10B981] text-white font-bold px-5 py-2 text-xs rounded-full shadow-[0_0_30px_rgba(16,185,129,0.6)] transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                    فتح المعرض
                  </span>
                </div>
                
                {/* 🔥 المؤشر الدائم للموبايل 🔥 */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#10B981]/90 backdrop-blur-md border border-emerald-400/50 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 z-10 animate-bounce shadow-[0_0_20px_rgba(16,185,129,0.8)] whitespace-nowrap">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span>تصفح {MOBILE_IMAGES.length} صور</span>
                </div>

                <img src={MOBILE_IMAGES[0]} alt="Mobile App" className="relative z-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                
                <div className="absolute top-3 lg:top-4 left-1/2 -translate-x-1/2 w-[35%] h-5 lg:h-6 bg-black rounded-full z-20 shadow-sm flex items-center justify-end px-2">
                  <div className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full shadow-[inset_0_0_1px_rgba(255,255,255,0.2)]"></div>
                </div>
              </div>
            </div>

            {/* الشرح الاحترافي المظلم للموبايل */}
            <motion.div 
              className="mt-6 relative w-[130%] bg-[#0a1b3f]/90 backdrop-blur-2xl p-6 lg:p-8 rounded-[2rem] border border-[#10B981]/40 shadow-[0_30px_80px_rgba(16,185,129,0.25)] overflow-hidden" 
              style={{ opacity: textOpacity, y: textY }}
            >
              <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#10B981]/20 rounded-full blur-3xl"></div>
              
              <div className="flex items-start gap-5 relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-emerald-700 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#34d399]"></span>
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#34d399]">Point-Of-Care App</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-display font-extrabold text-white tracking-tight">امتداد العمليات السريرية</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#10B981] to-emerald-400 rounded-full mt-3 mb-3"></div>
                  <p className="text-sm font-medium text-emerald-50/80 leading-relaxed">
                    وصول مشفر وآني لبيانات المرضى من أي مكان. مزود بقدرات تكامل عتادي مباشر لدعم أوامر الطباعة الحرارية الآلية، مما يقلل الاحتكاك التشغيلي ويرفع كفاءة الطاقم الطبي أثناء تقديم الرعاية.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          🔥 مكون معرض الصور المنبثق 🔥
          ========================================================================= */}
      <AnimatePresence>
        {activeGallery && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a1b3f]/95 backdrop-blur-2xl p-4 sm:p-10"
          >
            <button onClick={closeGallery} className="absolute top-6 right-6 text-white hover:text-red-400 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-50">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <motion.div 
              key={currentImgIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()} 
              className={`relative shadow-[0_20px_80px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden border border-white/10 ${activeGallery === 'web' ? 'w-full max-w-6xl aspect-video' : 'h-[90vh] aspect-[9/19.5]'}`}
            >
              <img src={activeImages[currentImgIndex]} alt={`Gallery image ${currentImgIndex + 1}`} className="w-full h-full object-cover" />
            </motion.div>

            {activeImages.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/20 text-white p-3 lg:p-4 rounded-full backdrop-blur-xl transition-all hover:scale-110 z-50 border border-white/10">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={nextImage} className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/20 text-white p-3 lg:p-4 rounded-full backdrop-blur-xl transition-all hover:scale-110 z-50 border border-white/10">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}

            <div className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-[#020617]/50 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10 shadow-xl">
              {activeImages.map((_, idx) => (
                <div key={idx} className={`rounded-full transition-all duration-300 ${idx === currentImgIndex ? (activeGallery === 'web' ? 'bg-[#114FD1] w-6 h-2' : 'bg-[#10B981] w-6 h-2') : 'bg-white/30 w-2 h-2 hover:bg-white/50'}`} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}