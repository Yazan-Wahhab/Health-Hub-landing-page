"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

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
    <motion.div
      animate={{ y: [0, -10, 0], x: [0, 5, 0], rotate: [0, 45, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute top-2 left-3 w-4 h-4 rounded-md opacity-20 ${isEven ? 'bg-[var(--color-secondary)]' : 'bg-[var(--color-primary)]'}`}
    />
    <motion.div
      animate={{ y: [0, 15, 0], x: [0, -10, 0], rotate: [0, -45, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className={`absolute bottom-2 right-3 w-6 h-6 rounded-full opacity-10 ${isEven ? 'bg-[var(--color-secondary)]' : 'bg-[var(--color-primary)]'}`}
    />
  </div>
);

// =========================================================================
// 🧩 مكون كرت الخطوة
// =========================================================================
const StepCard = ({ step, index, scrollYProgress }: { step: any; index: number; scrollYProgress: MotionValue<number> }) => {
  const isEven = index % 2 !== 0;
  
  const start = index * 0.075; 
  const end = start + 0.05; 

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const x = useTransform(scrollYProgress, [start, end], [isEven ? -40 : 40, 0]);
  const scale = useTransform(scrollYProgress, [start, end], [0.95, 1]);

  return (
    <div className={`flex w-full ${isEven ? 'md:justify-end' : 'md:justify-start'} pl-[70px] md:pl-0 pr-4 md:px-0 relative pointer-events-auto`}>
      <motion.div 
        style={{ opacity, x, scale }}
        // ألوان الكروت موحدة ومطابقة للصورة في جميع الشاشات
        className={`w-full max-w-[290px] md:w-[45%] md:max-w-none p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 shadow-lg md:shadow-[0_15px_30px_rgba(0,0,0,0.06)] flex flex-row gap-3 md:gap-5 items-center md:items-start relative will-change-transform overflow-hidden
          ${isEven 
            ? 'bg-[#ebf8f2] border-[var(--color-secondary)]/30' 
            : 'bg-[#eff4ff] border-[var(--color-primary)]/30'
          }`}
      >
        <FloatingParticles isEven={isEven} />

        <div className={`relative z-10 font-black text-3xl md:text-5xl shrink-0 ${isEven ? 'text-[var(--color-secondary)]' : 'text-[var(--color-primary)]'}`}>
          {step.id}
        </div>
        
        <div className="relative z-10 flex flex-col justify-center">
          {/* لون العنوان مختلف وبارز جداً */}
          <h3 className={`text-[16px] md:text-[22px] font-black mb-1 md:mb-1.5 ${isEven ? 'text-[#064e3b]' : 'text-[#1e3a8a]'}`}>
            {step.title}
          </h3>
          {/* لون النص الأساسي مختلف (رمادي داكن احترافي) ليميزه عن العنوان */}
          <p className="font-bold md:font-semibold text-[12px] md:text-[15px] leading-relaxed text-[#334155]">
            {step.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// =========================================================================
// 🔥 المكون الرئيسي: التايم لاين السينمائي
// =========================================================================
export default function OurProcess() {
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: mainContainerRef,
    offset: ["start start", "end end"], 
  });

  const trackHeight = useTransform(scrollYProgress, [0, 0.35], ["0%", "100%"]);
  const logoY = useTransform(scrollYProgress, [0, 0.35, 0.45, 0.55], ["25vh", "82vh", "82vh", "50vh"]);
  
  const stepsOpacity = useTransform(scrollYProgress, [0.4, 0.45], [1, 0]);
  const stepsY = useTransform(scrollYProgress, [0.4, 0.5], ["0vh", "-10vh"]);
  const trackOpacity = useTransform(scrollYProgress, [0.4, 0.45], [1, 0]);

  const xProgress = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);

  const dLineScaleX = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const dVideoScaleY = useTransform(scrollYProgress, [0.7, 0.8], [0.015, 1]);
  
  const mLineScaleY = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);   
  const mVideoScaleX = useTransform(scrollYProgress, [0.7, 0.8], [0.01, 1]); 

  const videoContentOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const videoContentY = useTransform(scrollYProgress, [0.8, 0.9], [20, 0]);

  const hubLogoUrl = "https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75";

  return (
    <div ref={mainContainerRef} className="w-full relative bg-transparent h-[400vh]">
      
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">
        
        {/* ============================================================
            🟢 القسم الأول: العنوان والخطوات
            ============================================================ */}
        <motion.div 
          style={{ opacity: stepsOpacity, y: stepsY }} 
          className="absolute inset-0 w-full max-w-[1400px] mx-auto px-4 md:px-12 flex flex-col z-20 pointer-events-none"
        >
          <div className="flex flex-col items-center text-center w-full mt-[5vh] mb-[2vh] relative z-30">
            <div className="inline-flex items-center gap-2 bg-white/90 border border-[var(--color-primary)]/20 px-4 py-2 rounded-full mb-3 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_8px_var(--color-primary)]"></div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">Our Process</span>
            </div>
            <h2 className="font-display text-2xl md:text-5xl font-extrabold text-[#0f172a]">
              منهجية عمل <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">مضمونة النتائج</span>
            </h2>
          </div>

          {/* تم إضافة pt-[8vh] في الموبايل لتنزيل الكروت ومحاذاتها مع بداية اللوغو */}
          <div className="relative w-full max-w-5xl mx-auto h-[75vh] md:h-[65vh] flex flex-col justify-evenly pt-[8vh] md:pt-[2vh] pb-[6vh] md:pb-0">
            {PROCESS_STEPS.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </motion.div>

        {/* ============================================================
            🚀 المسار العمودي
            ============================================================ */}
        <motion.div 
          style={{ opacity: trackOpacity }}
          className="absolute top-[25vh] h-[58vh] w-[4px] md:w-1.5 left-[35px] md:left-1/2 md:-translate-x-1/2 z-10 bg-[var(--color-border)]/50 rounded-full"
        >
          <motion.div 
            style={{ scaleY: trackHeight }} 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] origin-top rounded-full will-change-transform"
          />
        </motion.div>

        {/* ============================================================
            🎯 اللوغو الديناميكي والفيديوهات
            ============================================================ */}
        <motion.div 
          style={{ 
            top: logoY, 
            '--progress': xProgress 
          } as React.CSSProperties} 
          className="absolute left-[calc(35px+(50%-35px)*var(--progress))] md:left-[calc(50%+(50%-50%)*var(--progress))] -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center will-change-transform pointer-events-auto"
        >
          
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white border-[3px] md:border-[4px] border-[var(--color-primary)] rounded-full flex items-center justify-center shadow-[0_15px_30px_rgba(17,79,209,0.4)] relative z-50">
            <img src={hubLogoUrl} alt="Hub Logo" className="w-6 h-6 md:w-8 md:h-8 object-contain relative z-10" />
            <div className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)] animate-ping opacity-40"></div>
          </div>

          <motion.div 
            style={{ scaleY: mLineScaleY, scaleX: mVideoScaleX }}
            className="absolute bottom-[100%] mb-4 left-1/2 -translate-x-1/2 w-[96vw] h-[30vh] bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/10 rounded-xl origin-bottom flex md:hidden items-center justify-center shadow-[0_0_40px_var(--color-primary)] p-[2px] will-change-transform"
          >
            <motion.div style={{ opacity: videoContentOpacity }} className="w-full h-full relative rounded-lg overflow-hidden bg-[#0a0a0a]">
              <iframe className="w-full h-full relative z-10" loading="lazy" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&playsinline=1&modestbranding=1" title="Overview" allowFullScreen></iframe>
            </motion.div>
          </motion.div>
          
          <motion.div 
            style={{ scaleY: mLineScaleY, scaleX: mVideoScaleX }}
            className="absolute top-[100%] mt-4 left-1/2 -translate-x-1/2 w-[96vw] h-[30vh] bg-gradient-to-t from-[var(--color-secondary)] to-[var(--color-secondary)]/10 rounded-xl origin-top flex md:hidden items-center justify-center shadow-[0_0_40px_var(--color-secondary)] p-[2px] will-change-transform"
          >
            <motion.div style={{ opacity: videoContentOpacity }} className="w-full h-full relative rounded-lg overflow-hidden bg-[#0a0a0a]">
              <iframe className="w-full h-full relative z-10" loading="lazy" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&playsinline=1&modestbranding=1" title="Doctors App" allowFullScreen></iframe>
            </motion.div>
          </motion.div>

          <motion.div 
            style={{ scaleX: dLineScaleX, scaleY: dVideoScaleY }}
            className="absolute left-[100%] ml-5 w-[38vw] max-w-[650px] aspect-video bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/10 rounded-3xl origin-left hidden md:flex items-center justify-center shadow-[0_0_50px_var(--color-primary)] p-[2px] will-change-transform"
          >
            <motion.div style={{ opacity: videoContentOpacity }} className="w-full h-full relative rounded-[22px] overflow-hidden bg-[#0a0a0a]">
              <motion.div style={{ y: videoContentY }} className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-md px-5 py-2 rounded-full border border-[var(--color-primary)]/30 shadow-xl z-20">
                <span className="text-sm font-extrabold text-[var(--color-primary)]">نظرة عامة على المنصة</span>
              </motion.div>
              <iframe className="w-full h-full relative z-10" loading="lazy" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&playsinline=1&modestbranding=1" title="Overview" allowFullScreen></iframe>
            </motion.div>
          </motion.div>
          
          <motion.div 
            style={{ scaleX: dLineScaleX, scaleY: dVideoScaleY }}
            className="absolute right-[100%] mr-5 w-[38vw] max-w-[650px] aspect-video bg-gradient-to-l from-[var(--color-secondary)] to-[var(--color-secondary)]/10 rounded-3xl origin-right hidden md:flex items-center justify-center shadow-[0_0_50px_var(--color-secondary)] p-[2px] will-change-transform"
          >
            <motion.div style={{ opacity: videoContentOpacity }} className="w-full h-full relative rounded-[22px] overflow-hidden bg-[#0a0a0a]">
              <motion.div style={{ y: videoContentY }} className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-md px-5 py-2 rounded-full border border-[var(--color-secondary)]/30 shadow-xl z-20">
                <span className="text-sm font-extrabold text-[var(--color-secondary)]">تجربة تطبيق الأطباء</span>
              </motion.div>
              <iframe className="w-full h-full relative z-10" loading="lazy" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&playsinline=1&modestbranding=1" title="Doctors App" allowFullScreen></iframe>
            </motion.div>
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
}