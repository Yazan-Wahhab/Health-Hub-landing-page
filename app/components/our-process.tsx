"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";

// =========================================================================
// 🗂️ بيانات خطوات العمل
// =========================================================================
const PROCESS_STEPS = [
  { id: "01", title: "تحليل احتياج العميل", description: "دراسة دقيقة للبنية التحتية وتحديد المتطلبات التقنية." },
  { id: "02", title: "تصميم الحل", description: "هندسة بنية النظام وتخصيص الواجهات لتطابق معايير الأمان." },
  { id: "03", title: "التنفيذ والتركيب", description: "نشر النظام على خوادم المؤسسة أو سحابياً، وربط الأجهزة." },
  { id: "04", title: "التدريب والدعم", description: "تدريب مكثف للطواقم الطبية والإدارية مع دعم فني مستمر." },
  { id: "05", title: "المتابعة والتطوير", description: "مراقبة الأداء دورياً، تقديم تحديثات، وتطوير ميزات جديدة." },
];

// =========================================================================
// ✨ مكون المجسمات المتطايرة 
// =========================================================================
const FloatingParticles = ({ isEven }: { isEven: boolean }) => (
  <div className="absolute inset-0 overflow-hidden rounded-xl md:rounded-3xl pointer-events-none z-0">
    <motion.div animate={{ y: [0, -10, 0], x: [0, 5, 0], rotate: [0, 45, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className={`absolute top-2 left-3 w-4 h-4 rounded-md opacity-20 ${isEven ? 'bg-[var(--color-secondary)]' : 'bg-[var(--color-primary)]'}`} />
    <motion.div animate={{ y: [0, 15, 0], x: [0, -10, 0], rotate: [0, -45, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className={`absolute bottom-2 right-3 w-6 h-6 rounded-full opacity-10 ${isEven ? 'bg-[var(--color-secondary)]' : 'bg-[var(--color-primary)]'}`} />
  </div>
);

// =========================================================================
// 🌟 إعدادات التوقيت وحركة انبثاق الشاشات
// =========================================================================
const LINE_DURATION = 2.5; 

const screenRevealVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 }
  }
};

export default function OurProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(containerRef, { once: true, margin: "-15% 0px" });
  const [animationPhase, setAnimationPhase] = useState(0); 
  const [showIframes, setShowIframes] = useState(false); 
  
  // حالة جديدة للتحكم في إخفاء النصوص عند التفاعل مع الفيديو
  const [hideVideoTitles, setHideVideoTitles] = useState(false);

  useEffect(() => {
    if (isInView) {
      setAnimationPhase(1); 
      
      const t1 = setTimeout(() => setAnimationPhase(2), LINE_DURATION * 1000); 
      const t2 = setTimeout(() => setAnimationPhase(3), (LINE_DURATION + 0.8) * 1000); 
      const t3 = setTimeout(() => setAnimationPhase(4), (LINE_DURATION + 1.3) * 1000); 
      const t4 = setTimeout(() => setShowIframes(true), (LINE_DURATION + 1.8) * 1000); 
      
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }
  }, [isInView]);

  // خدعة برمجية لاكتشاف النقر داخل الـ iframe وإخفاء النصوص
  useEffect(() => {
    const handleBlur = () => {
      // إذا كان العنصر الذي تم التركيز عليه هو iframe (يعني المستخدم ضغط على الفيديو للتشغيل)
      if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
        setHideVideoTitles(true);
      }
    };
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, []);

  const hubLogoUrl = "https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75";

  const renderHubLogo = () => (
    <div className="w-12 h-12 md:w-16 md:h-16 bg-white border-[3px] md:border-[4px] border-[var(--color-primary)] rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(17,79,209,0.3)] relative z-20">
      <img src={hubLogoUrl} alt="Hub Logo" className="w-6 h-6 md:w-8 md:h-8 object-contain relative z-10" />
      <div className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)] animate-ping opacity-40"></div>
    </div>
  );

  return (
    <section ref={containerRef} className="w-full relative bg-transparent py-10 md:py-16 overflow-hidden">
      
      {/* 🟢 العنوان */}
      <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto px-4 mb-8 md:mb-12 relative z-40">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 bg-white/90 border border-[var(--color-primary)]/20 px-4 py-2 rounded-full mb-3 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_8px_var(--color-primary)]"></div>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">Our Process</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0f172a]">
          منهجية عمل <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">مضمونة النتائج</span>
        </motion.h2>
      </div>

      <LayoutGroup>
        <div className="relative w-full">
          
          {/* 🚀 المسار والخطوات */}
          <div className="relative w-full max-w-5xl mx-auto px-4 md:px-8 z-30 flex flex-col pb-4 md:pb-8">
            <div className="absolute top-0 bottom-0 left-[35px] md:left-1/2 w-[3px] md:w-1.5 bg-[var(--color-border)]/40 rounded-full -translate-x-1/2 z-0" />
            <motion.div initial={{ height: "0%" }} animate={isInView ? { height: "100%" } : {}} transition={{ duration: LINE_DURATION, ease: "linear" }} className="absolute top-0 left-[35px] md:left-1/2 w-[3px] md:w-1.5 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full -translate-x-1/2 z-10 origin-top" />

            {animationPhase === 1 && (
              <motion.div layoutId="hubLogo" initial={{ top: "0%" }} animate={{ top: "100%" }} transition={{ duration: LINE_DURATION, ease: "linear" }} className="absolute left-[35px] md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                {renderHubLogo()}
              </motion.div>
            )}

            <div className="relative z-20 flex flex-col gap-6 md:gap-0">
              {PROCESS_STEPS.map((step, index) => {
                const isEven = index % 2 !== 0;
                return (
                  <div key={step.id} className={`flex w-full ${isEven ? 'md:justify-end' : 'md:justify-start'} pl-[60px] md:pl-0 relative ${index > 0 ? 'md:-mt-10' : ''}`}>
                    <motion.div initial={{ opacity: 0, y: 30, x: isEven ? -20 : 20 }} animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}} transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: (LINE_DURATION / PROCESS_STEPS.length) * index }} className={`w-full max-w-[400px] md:w-[45%] p-4 md:p-5 rounded-2xl md:rounded-3xl border-2 shadow-[0_10px_20px_rgba(0,0,0,0.04)] flex flex-row gap-4 items-center relative overflow-hidden bg-white/60 backdrop-blur-md ${isEven ? 'border-[var(--color-secondary)]/30' : 'border-[var(--color-primary)]/30'}`}>
                      <FloatingParticles isEven={isEven} />
                      <div className={`relative z-10 font-black text-3xl md:text-4xl shrink-0 ${isEven ? 'text-[var(--color-secondary)]' : 'text-[var(--color-primary)]'}`}>{step.id}</div>
                      <div className="relative z-10 flex flex-col">
                        <h3 className={`text-base md:text-lg font-black mb-1 ${isEven ? 'text-[#064e3b]' : 'text-[#1e3a8a]'}`}>{step.title}</h3>
                        <p className="font-semibold text-xs md:text-sm leading-relaxed text-[#334155]">{step.description}</p>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 🎯 منطقة الشاشات والخطوط الثابتة (تم تكبير الـ max-w إلى 7xl وتقليل الحواف في الجوال) */}
          <div className="relative w-full max-w-7xl mx-auto px-2 md:px-8 z-20 mt-10 md:mt-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-[4rem] relative w-full">
              
              {/* =============================================== */}
              {/* 💻 الشاشة الأولى (يسار الكمبيوتر / أعلى الموبايل) */}
              {/* =============================================== */}
              <div className="relative w-full md:w-1/2 aspect-video flex items-center justify-center z-10 origin-bottom md:origin-right">
                <motion.div variants={screenRevealVariants} initial="hidden" animate={animationPhase >= 4 ? "visible" : "hidden"} className="w-full h-full relative">
                  
                  <div className="w-full h-full bg-[#1e1e1e] p-1.5 md:p-3 rounded-2xl md:rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/10 flex flex-col relative overflow-hidden">
                    <div className="absolute top-1 md:top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full z-30" />
                    
                    <div className="w-full h-full bg-black rounded-xl md:rounded-2xl overflow-hidden relative">
                      
                      {/* العنوان الأول مع تأثير الإخفاء */}
                      <AnimatePresence>
                        {!hideVideoTitles && animationPhase >= 4 && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                            transition={{ duration: 0.4 }} 
                            className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-md px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-[var(--color-primary)]/30 shadow-xl z-30 pointer-events-none"
                          >
                            <span className="text-xs md:text-sm font-extrabold text-[var(--color-primary)]">نظرة عامة على المنصة</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {!showIframes && animationPhase >= 4 && (
                          <motion.div exit={{ opacity: 0 }} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/20 border-t-white animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" />
                        )}
                      </AnimatePresence>

                      {showIframes && (
                        <motion.iframe initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="absolute inset-0 w-full h-full z-10" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&playsinline=1&modestbranding=1" title="Overview" allowFullScreen allow="autoplay; encrypted-media" />
                      )}
                    </div>
                  </div>

                </motion.div>
              </div>

              {/* =============================================== */}
              {/* 🌟 منصة اللوغو والخطوط الثابتة */}
              {/* =============================================== */}
              <div className="relative z-50 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 shrink-0">
                {animationPhase >= 2 && (
                  <motion.div layoutId="hubLogo" className="absolute z-50" transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}>
                    
                    <motion.div 
                      className="absolute bg-[var(--color-primary)] z-0 hidden md:block md:top-1/2 md:-translate-y-1/2 md:right-full md:origin-right md:h-[4px]"
                      initial={{ width: 0 }} animate={animationPhase >= 3 ? { width: "4rem" } : { width: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                    <motion.div 
                      className="absolute bg-[var(--color-primary)] z-0 block md:hidden left-1/2 -translate-x-1/2 bottom-full origin-bottom w-[4px]"
                      initial={{ height: 0 }} animate={animationPhase >= 3 ? { height: "1.5rem" } : { height: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}
                    />

                    <motion.div 
                      className="absolute bg-[var(--color-secondary)] z-0 hidden md:block md:top-1/2 md:-translate-y-1/2 md:left-full md:origin-left md:h-[4px]"
                      initial={{ width: 0 }} animate={animationPhase >= 3 ? { width: "4rem" } : { width: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                    <motion.div 
                      className="absolute bg-[var(--color-secondary)] z-0 block md:hidden left-1/2 -translate-x-1/2 top-full origin-top w-[4px]"
                      initial={{ height: 0 }} animate={animationPhase >= 3 ? { height: "1.5rem" } : { height: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}
                    />

                    {renderHubLogo()}
                  </motion.div>
                )}
              </div>

              {/* =============================================== */}
              {/* 💻 الشاشة الثانية (يمين الكمبيوتر / أسفل الموبايل) */}
              {/* =============================================== */}
              <div className="relative w-full md:w-1/2 aspect-video flex items-center justify-center z-10 origin-top md:origin-left">
                <motion.div variants={screenRevealVariants} initial="hidden" animate={animationPhase >= 4 ? "visible" : "hidden"} className="w-full h-full relative">
                  
                  <div className="w-full h-full bg-[#1e1e1e] p-1.5 md:p-3 rounded-2xl md:rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/10 flex flex-col relative overflow-hidden">
                    <div className="absolute top-1 md:top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full z-30" />
                    
                    <div className="w-full h-full bg-black rounded-xl md:rounded-2xl overflow-hidden relative">
                      
                      {/* العنوان الثاني مع تأثير الإخفاء */}
                      <AnimatePresence>
                        {!hideVideoTitles && animationPhase >= 4 && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                            transition={{ duration: 0.4 }} 
                            className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-md px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-[var(--color-secondary)]/30 shadow-xl z-30 pointer-events-none"
                          >
                            <span className="text-xs md:text-sm font-extrabold text-[var(--color-secondary)]">تجربة تطبيق الأطباء</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {!showIframes && animationPhase >= 4 && (
                          <motion.div exit={{ opacity: 0 }} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/20 border-t-white animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" />
                        )}
                      </AnimatePresence>

                      {showIframes && (
                        <motion.iframe initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="absolute inset-0 w-full h-full z-10" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&playsinline=1&modestbranding=1" title="Doctors App" allowFullScreen allow="autoplay; encrypted-media" />
                      )}
                    </div>
                  </div>

                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </LayoutGroup>

    </section>
  );
}