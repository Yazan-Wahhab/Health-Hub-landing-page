"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// =========================================================================
// 🗂️ بيانات خطوات العمل
// =========================================================================
const PROCESS_STEPS = [
  { id: "01", title: "تحليل احتياج العميل", description: "دراسة دقيقة للبنية التحتية الحالية وتحديد المتطلبات التقنية." },
  { id: "02", title: "تصميم الحل", description: "هندسة بنية النظام وتخصيص الواجهات لتطابق معايير الأمان العالمية." },
  { id: "03", title: "التنفيذ والتركيب", description: "نشر النظام على خوادم المؤسسة أو سحابياً، وربط الأجهزة الطبية." },
  { id: "04", title: "التدريب والدعم", description: "تدريب مكثف للطواقم الطبية والإدارية مع توفير دعم فني مستمر." },
  { id: "05", title: "المتابعة والتطوير", description: "مراقبة الأداء دورياً، تقديم تحديثات، وتطوير ميزات جديدة." },
];

// =========================================================================
// 🧩 مكون كرت الخطوة (معايرة التزامن بدقة عالية)
// =========================================================================
const StepCard = ({ step, index, scrollYProgress }: { step: any; index: number; scrollYProgress: MotionValue<number> }) => {
  const isEven = index % 2 !== 0;
  
  // توزيع متساوٍ لظهور الكروت متزامن تماماً مع حركة اللوغو
  const start = 0.05 + index * 0.1; 
  const end = start + 0.1;

  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end], [0, 1, 1]);
  const x = useTransform(scrollYProgress, [start, start + 0.05], [isEven ? -60 : 60, 0]);

  return (
    <div className={`flex w-full ${isEven ? 'md:justify-end' : 'md:justify-start'} pl-[70px] md:pl-0 relative`}>
      <motion.div 
        style={{ opacity, x }}
        className={`w-full md:w-[45%] bg-white/90 backdrop-blur-xl p-5 md:p-6 rounded-3xl border shadow-[0_10px_30px_rgba(17,79,209,0.05)] flex gap-4 items-start relative
          ${isEven ? 'border-[var(--color-secondary)]/20' : 'border-[var(--color-primary)]/20'}`}
      >
        <div className={`font-black text-3xl md:text-4xl shrink-0 mt-1 ${isEven ? 'text-[var(--color-secondary)]' : 'text-[var(--color-primary)]'}`}>
          {step.id}
        </div>
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-1">{step.title}</h3>
          <p className="text-[var(--color-text-muted)] font-medium text-xs leading-relaxed">{step.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

// =========================================================================
// 🔥 المكون الرئيسي: منهجية العمل
// =========================================================================
export default function OurProcess() {
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: mainContainerRef,
    offset: ["start start", "end end"], 
  });

  // =========================================================================
  // ⚙️ هندسة الحركات (Timelines)
  // =========================================================================
  
  // 1. الخط العمودي: يتوقف تماماً عند 68% (وهو مستوى الكرت الخامس) ولا ينزل أكثر.
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.55], ["0%", "68%"]);
  
  // 2. اللوغو: ينفصل عن الخط ويكمل لـ 100% (منتصف الفيديوهات)
  const logoY = useTransform(scrollYProgress, [0.05, 0.55, 0.75], ["0%", "68%", "100%"]);
  
  // 3. الخطوط الأفقية: تنبثق وتومض بمجرد استقرار اللوغو
  const hLinesScale = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  
  // 4. الشاشات: تظهر وتكبر بحجمها الضخم وتغطي أطراف الخطوط
  const videosOpacity = useTransform(scrollYProgress, [0.80, 0.90], [0, 1]);
  const videosScale = useTransform(scrollYProgress, [0.80, 0.90], [0.9, 1]);
  const videosY = useTransform(scrollYProgress, [0.80, 0.90], [60, 0]);

  const hubLogoUrl = "https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75";

  return (
    <div ref={mainContainerRef} className="w-full bg-transparent overflow-hidden relative min-h-[220vh]">
      
      {/* =========================================================================
          🚀 المسار الكلي - يبدأ من التعداد الأول (top-[280px]) لكي لا يظهر فوق العنوان
          ========================================================================= */}
      <div className="absolute top-[280px] bottom-[50vh] left-[32px] md:left-1/2 md:-translate-x-1/2 w-1.5 z-10 pointer-events-none">
        
        {/* الخط الملون العمودي الذي يقف عند التعداد الخامس */}
        <motion.div 
          style={{ height: lineHeight }} 
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full z-10"
        />

        {/* 🎯 اللوغو المتحرك الذي يكمل للأسفل */}
        <motion.div 
          style={{ top: logoY }} 
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center"
        >
          {/* تصميم اللوغو */}
          <div className="w-14 h-14 bg-white border-[3px] border-[var(--color-primary)] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(17,79,209,0.4)] relative z-20">
            <img src={hubLogoUrl} alt="Hub Logo" className="w-8 h-8 object-contain" />
            <div className="absolute inset-0 rounded-full border border-[var(--color-primary)] animate-ping opacity-50"></div>
          </div>

          {/* ⚡ الخط الأيمن (أزرق + يومض) - ينزلق خلف الشاشة */}
          <motion.div 
            style={{ scaleX: hLinesScale }}
            className="absolute left-[100%] top-1/2 -translate-y-1/2 h-1.5 w-[30vw] max-w-[400px] bg-[var(--color-primary)] animate-pulse origin-left hidden lg:block rounded-r-full -z-10 shadow-[0_0_15px_var(--color-primary)]"
          />
          
          {/* ⚡ الخط الأيسر (أخضر + يومض) - ينزلق خلف الشاشة */}
          <motion.div 
            style={{ scaleX: hLinesScale }}
            className="absolute right-[100%] top-1/2 -translate-y-1/2 h-1.5 w-[30vw] max-w-[400px] bg-[var(--color-secondary)] animate-pulse origin-right hidden lg:block rounded-l-full -z-10 shadow-[0_0_15px_var(--color-secondary)]"
          />
        </motion.div>
      </div>


      {/* 🟢 القسم الأول: التعدادات */}
      <section className="relative pt-24 pb-12 w-full z-20 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col items-center text-center w-full mb-16 relative z-30">
            <motion.div className="inline-flex items-center gap-2 bg-white/80 border border-[var(--color-primary)]/15 px-5 py-2.5 rounded-full mb-3 backdrop-blur-xl shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_8px_var(--color-primary)]"></div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">Our Process</span>
            </motion.div>
            <motion.h2 className="font-display text-4xl font-extrabold tracking-tight text-[var(--color-text-main)] sm:text-5xl">
              منهجية عمل <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">مضمونة النتائج</span>
            </motion.h2>
          </div>

          <div className="relative w-full max-w-5xl mx-auto pb-10">
            <div className="flex flex-col gap-10 md:gap-16 relative z-10 pt-4">
              {PROCESS_STEPS.map((step, index) => (
                <StepCard key={step.id} step={step} index={index} scrollYProgress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🔵 القسم الثاني: الفيديوهات (الشاشات العملاقة) */}
      <section className="relative py-16 w-full z-40 min-h-screen flex items-center justify-center pointer-events-none">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full relative z-40 pointer-events-auto">
          
          <motion.div style={{ opacity: videosOpacity, y: videosY }} className="text-center mb-16">
            <h3 className="font-display text-3xl font-extrabold text-[var(--color-text-main)] drop-shadow-md">
              شاهد النظام <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">أثناء العمل</span>
            </h3>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 px-4 w-full relative">
            
            {/* 📺 الشاشة اليمنى (ضخمة جداً) */}
            <motion.div 
              style={{ opacity: videosOpacity, scale: videosScale, y: videosY }}
              className="w-full lg:w-[45vw] max-w-[750px] flex flex-col items-center relative bg-white/5 rounded-3xl"
            >
              <h4 className="text-lg font-extrabold text-[var(--color-primary-dark)] mb-4 text-center bg-white backdrop-blur-md px-8 py-2.5 rounded-full border border-[var(--color-primary)]/20 shadow-md">
                نظرة عامة على المنصة
              </h4>
              <VideoFrame videoId="dQw4w9WgXcQ" borderColor="var(--color-primary)" />
            </motion.div>

            {/* 📺 الشاشة اليسرى (ضخمة جداً) */}
            <motion.div 
              style={{ opacity: videosOpacity, scale: videosScale, y: videosY }}
              className="w-full lg:w-[45vw] max-w-[750px] flex flex-col items-center relative bg-white/5 rounded-3xl"
            >
              <h4 className="text-lg font-extrabold text-[var(--color-secondary-dark)] mb-4 text-center bg-white backdrop-blur-md px-8 py-2.5 rounded-full border border-[var(--color-secondary)]/20 shadow-md">
                تجربة تطبيق الأطباء
              </h4>
              <VideoFrame videoId="dQw4w9WgXcQ" borderColor="var(--color-secondary)" />
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}

// =========================================================================
// 🧩 مكون إطار الفيديو العملاق (تم وضع خلفية صلبة لكي يخفي الخطوط خلفه)
// =========================================================================
const VideoFrame = ({ videoId, borderColor }: { videoId: string; borderColor: string }) => (
  <div className={`w-full relative rounded-2xl group transition-transform duration-500 hover:-translate-y-2 bg-[#050505]`}
       style={{ boxShadow: `0 30px 60px rgba(0,0,0,0.2), 0 0 30px ${borderColor}20` }}>
    
    <div className="relative aspect-video bg-[#000] rounded-t-2xl border-[6px] border-[#1a1a1a] overflow-hidden z-10">
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20"></div>
      <iframe className="absolute inset-0 w-full h-full z-10" 
              src={`https://www.youtube.com/embed/${videoId}?controls=1&rel=0&playsinline=1&modestbranding=1`} 
              title="Hub Overview" allowFullScreen></iframe>
    </div>
    
    <div className="w-full h-8 bg-[#111] rounded-b-2xl border-t border-[#333] border-b-[5px] border-l-[5px] border-r-[5px] border-[#1a1a1a] flex items-center justify-center relative z-20">
      <div className="w-2 h-2 rounded-full animate-pulse"
           style={{ backgroundColor: borderColor, boxShadow: `0 0 12px ${borderColor}, 0 0 4px white` }}></div>
    </div>
  </div>
);