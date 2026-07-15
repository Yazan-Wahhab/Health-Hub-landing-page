"use client";

import { useState, useEffect, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// =========================================================================
// 🗂️ بيانات النظام 
// =========================================================================
const WORK_HISTORY = [
  {
    year: "2023",
    totalWorks: 2,
    categories: [
      {
        title: "البنية التحتية والأساسات",
        items: [
          { name: "تأسيس بنية EERD", desc: "تصميم المخطط الهيكلي لقواعد البيانات المركزية." },
          { name: "خوادم ASP.NET", desc: "بناء الـ API المركزي وتأمين البيانات الحساسة." }
        ]
      }
    ]
  },
  {
    year: "2024",
    totalWorks: 4,
    categories: [
      {
        title: "الأنظمة المالية والموارد",
        items: [
          { name: "نظام الفوترة السحابي", desc: "ربط حركات المرضى بالدورة المالية آلياً." },
          { name: "لوحات تحكم الإدارة", desc: "واجهات ذكية تعرض تحليلات الأداء." }
        ]
      },
      {
        title: "أتمتة التشغيل",
        items: [
          { name: "تكامل الطباعة المركزية", desc: "أتمتة أوامر الطباعة لإنهاء الطوابير." }
        ]
      }
    ]
  },
  {
    year: "2025",
    totalWorks: 5,
    categories: [
      {
        title: "التوسع السريري والمختبرات",
        items: [
          { name: "تطبيق الامتداد السريري", desc: "نشر واجهة تتيح الوصول اللحظي لبيانات المرضى." },
          { name: "التكامل المخبري اللحظي", desc: "نظام لاستقبال نتائج التحاليل مباشرة." }
        ]
      },
      {
        title: "الرقابة والمتابعة الطبية",
        items: [
          { name: "أتمتة الصيدلية والجرد", desc: "ربط نظام الصرف الدوائي مع السجلات آلياً." },
          { name: "محرك الإشعارات الفورية", desc: "تنبيهات فورية للطاقم الطبي عند التحديث." }
        ]
      }
    ]
  },
  {
    year: "2026",
    totalWorks: 8,
    categories: [
      {
        title: "إطلاق المنصة الشاملة (2.0)",
        items: [
          { name: "نظام الحجوزات الموحد", desc: "التحكم الشامل في الحجوزات والعيادات والسعة." },
          { name: "السحابة المركزية", desc: "دمج الفروع في خادم سحابي مركزي فائق السرعة." },
          { name: "تطبيق المرضى الذكي", desc: "واجهة وصول للمرضى لحجز المواعيد." }
        ]
      },
      {
        title: "أمن المعلومات",
        items: [
          { name: "تشفير عسكري (HIPAA)", desc: "تطبيق أعلى معايير التشفير لضمان السرية التامة." },
          { name: "البيانات الضخمة (Big Data)", desc: "معالجة أكثر من 1.2 مليون سجل طبي بنجاح وتزامن." }
        ]
      },
      {
        title: "الذكاء الاصطناعي",
        items: [
          { name: "التشخيص الآلي السريع", desc: "تحليل صور الأشعة وصور الرنين باستخدام AI." },
          { name: "روبوت المحادثة الطبي", desc: "مساعد آلي للرد على استفسارات المرضى الفورية." },
          { name: "التنبؤ بالحالات الحرجة", desc: "خوارزميات استباقية لدراسة الحالات قبل تدهورها." }
        ]
      }
    ]
  }
];

const rechartsData = WORK_HISTORY.map((item, index) => ({
  year: item.year,
  works: item.totalWorks,
  index: index
}));

// =========================================================================
// ✨ 1. الكرات المتساقطة داخل المستطيلات 
// =========================================================================
function CardFallingDots({ type }: { type: "blue" | "green" }) {
  const isBlue = type === "blue";
  const dots = Array.from({ length: 8 }); 
  const colorClass = isBlue ? "bg-[#114fd1]" : "bg-[#0d9468]";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit] z-0">
      {dots.map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full opacity-[0.15] ${colorClass}`}
          initial={{ y: -30, x: `${Math.random() * 100}%` }}
          animate={{ y: 300 }} 
          transition={{ duration: Math.random() * 3 + 3, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
        />
      ))}
    </div>
  );
}

// =========================================================================
// ✨ 2. الجسيمات الطبية العامة 
// =========================================================================
function GlobalBackgroundParticles() {
  const particles = Array.from({ length: 30 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => {
        const size = Math.random() * 8 + 4;
        return (
          <motion.div
            key={i}
            className="absolute bottom-[-10%]"
            initial={{ y: "100vh", x: 0, opacity: 0 }}
            animate={{ y: "-10vh", x: Math.random() * 100 - 50, opacity: [0, 0.5, 0] }}
            transition={{ duration: Math.random() * 15 + 10, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
            style={{ left: `${Math.random() * 100}%` }}
          >
            {i % 4 === 0 ? (
              <div className="text-[var(--color-primary)]/30 text-xl font-bold drop-shadow-sm">+</div>
            ) : (
              <div className="bg-[var(--color-secondary)]/20 rounded-full blur-[1px]" style={{ width: size, height: size }} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

// =========================================================================
// ✨ 3. خلفية المخطط العميقة
// =========================================================================
function ChartDeepBackground() {
  const shapes = Array.from({ length: 35 }); 
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#eafcf4] to-[#d6efdf]">
      <div className="absolute inset-0 opacity-40" style={{ 
        backgroundImage: 'linear-gradient(to right, rgba(13, 148, 104, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(13, 148, 104, 0.1) 1px, transparent 1px)', 
        backgroundSize: '40px 40px',
        maskImage: 'linear-gradient(to bottom, white 40%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, white 40%, transparent 100%)'
      }} />

      {shapes.map((_, i) => {
        const isCube = i % 2 === 0;
        return (
          <motion.div 
            key={i} 
            className="absolute opacity-[0.12]"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360, y: [0, -40, 0], x: [0, 30, 0] }} 
            transition={{ duration: 25 + Math.random() * 20, repeat: Infinity, ease: "linear" }}
          >
            {isCube ? (
              <svg width={Math.random() * 60 + 40} height={Math.random() * 60 + 40} viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            ) : (
              <svg width={Math.random() * 50 + 30} height={Math.random() * 50 + 30} viewBox="0 0 24 24" fill="var(--color-secondary)">
                <path d="M19 10.5h-5.5V5a1.5 1.5 0 00-3 0v5.5H5a1.5 1.5 0 000 3h5.5V19a1.5 1.5 0 003 0v-5.5H19a1.5 1.5 0 000-3z" />
              </svg>
            )}
          </motion.div>
        );
      })}

      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[var(--color-primary)]/10 blur-[120px] rounded-full mix-blend-multiply"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[var(--color-secondary)]/15 blur-[100px] rounded-full mix-blend-multiply"></div>
    </div>
  );
}

// =========================================================================
// 🚀 4. المكون الرئيسي
// =========================================================================
export default function EngineeringMilestones() {
  const [view, setView] = useState<"chart" | "tree">("chart");
  const [activeIndex, setActiveIndex] = useState<number>(WORK_HISTORY.length - 1);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setScreenSize("mobile");
      else if (window.innerWidth < 1024) setScreenSize("tablet");
      else setScreenSize("desktop");
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && view === "tree") setView("chart");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [view]);

  const CustomRechartsTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-xl px-4 py-2.5 rounded-full shadow-[0_15px_30px_rgba(17,79,209,0.2)] border border-[var(--color-primary)]/10 transition-all z-50">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-secondary)] animate-pulse shadow-[0_0_8px_var(--color-secondary)]"></div>
          <span className="text-xs font-black text-[var(--color-primary-dark)] whitespace-nowrap">
            {payload[0].value} إنجازات <span className="mx-2 text-gray-300">|</span> <span className="text-[var(--color-secondary-dark)]">انقر لاستعراض المهام</span>
          </span>
        </div>
      );
    }
    return null;
  };

  // =========================================================================
  // 📏 خوارزمية "التمدد الذكي" (Smart Expansion Layout) للفخامة البصرية
  // =========================================================================
  const activeData = WORK_HISTORY[activeIndex];
  const totalItems = activeData.categories.reduce((acc, cat) => acc + cat.items.length, 0);
  
  // تفعيل التفرع المزدوج (التكثيف) فقط عندما يزيد العدد عن 4
  const needsStagger = totalItems > 4;
  
  // لا تصغير للخطوط أو البطاقات أبداً، بل نعطيها مقاس 1 بالكامل
  const scaleFactor = screenSize === "mobile" ? Math.min(1, 4.5 / totalItems) : 1; 

  const ROOT_X = screenSize === "mobile" ? 92 : screenSize === "tablet" ? 93 : 95;
  const CAT_X = screenSize === "mobile" ? 72 : screenSize === "tablet" ? 75 : 82;
  
  // السر هنا: عندما تقل المعلومات، نقوم بمد الخطوط لأقصى اليسار لتعبر الشاشة بكامل العرض
  const TASK_X_1 = needsStagger 
    ? (screenSize === "mobile" ? 45 : screenSize === "tablet" ? 48 : 60) 
    : (screenSize === "mobile" ? 68 : screenSize === "tablet" ? 50 : 45); // تمدد ضخم ومدروس
    
  const TASK_X_2 = screenSize === "mobile" ? 5 : screenSize === "tablet" ? 15 : 28; 

  // الفئات الديناميكية للتحجيم لكي تملأ الفراغ بالكامل عندما تكون البيانات قليلة
  const catDynamicClass = needsStagger 
    ? "w-[26vw] md:w-[190px] lg:w-[240px] px-3 py-3 lg:px-4 lg:py-4" 
    : "w-[30vw] md:w-[240px] lg:w-[320px] px-4 py-4 lg:px-6 lg:py-6";
    
  const catTitleClass = needsStagger 
    ? "text-xs md:text-sm lg:text-xl" 
    : "text-sm md:text-lg lg:text-2xl";

  const taskDynamicClass = needsStagger 
    ? "w-[45vw] md:w-[250px] lg:w-[340px] p-3 md:p-3 lg:p-4" 
    : "w-[65vw] md:w-[360px] lg:w-[460px] p-4 md:p-5 lg:p-6"; // بطاقة ضخمة وواسعة
    
  const taskTitleClass = needsStagger 
    ? "text-sm md:text-sm lg:text-lg mb-1 lg:mb-1.5" 
    : "text-base md:text-lg lg:text-2xl mb-2 lg:mb-3";
    
  const taskDescClass = needsStagger 
    ? "text-[10px] md:text-[11px] lg:text-[13px]" 
    : "text-xs md:text-sm lg:text-base";


  let currentItemIdx = 0;
  const layoutData = activeData.categories.map(cat => {
    const itemsLayout = cat.items.map((item) => {
      const colIndex = (needsStagger && currentItemIdx % 2 === 1) ? 1 : 0; 
      const segmentSize = 85 / totalItems;
      const centerY = 7.5 + (currentItemIdx + 0.5) * segmentSize; 
      currentItemIdx++;
      return { ...item, centerY, colIndex };
    });
    const catCenterY = (itemsLayout[0].centerY + itemsLayout[itemsLayout.length - 1].centerY) / 2;
    return { ...cat, centerY: catCenterY, itemsLayout };
  });

  return (
    <section className="relative w-full py-16 lg:py-24 z-20 overflow-hidden text-[var(--color-text-main)] min-h-screen flex flex-col justify-center bg-transparent">
      
      <GlobalBackgroundParticles />

      <div className="w-full px-4 md:px-8 lg:px-12 relative z-10 max-w-[1900px] mx-auto">
        
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-10 flex flex-col items-center text-center max-w-4xl mx-auto drop-shadow-sm">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.2]">
            تطور تقني يعكس <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">نمو الرعاية الصحية</span>
          </h2>
          <p className="mt-4 text-base md:text-lg font-bold text-[var(--color-text-muted)] max-w-2xl">
            استكشف السجل الهندسي الدقيق للبنية التحتية والميزات المركزية للمنصة.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          
          {view === "chart" && (
            <motion.div 
              key="chart-view"
              initial={{ opacity: 0, scale: 0.98, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }} transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-[1600px] mx-auto overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_rgba(13,148,104,0.2)] border border-[var(--color-secondary)]/20 relative"
            >
              <ChartDeepBackground />

              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute top-6 right-8 lg:top-8 lg:right-12 z-30 flex items-center gap-3 bg-white/80 backdrop-blur-2xl px-5 py-2.5 rounded-2xl shadow-[0_10px_30px_rgba(17,79,209,0.08)] border border-[var(--color-primary)]/10 pointer-events-none"
              >
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 border border-[var(--color-primary)]/20">
                  <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                  <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-ping"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">النظام التفاعلي</span>
                  <span className="text-sm font-black text-[var(--color-primary-dark)]">اضغط على العُقد لاستكشاف التفاصيل</span>
                </div>
              </motion.div>

              <div className="relative z-10 w-full h-[55vh] min-h-[450px] lg:h-[650px] p-4 lg:p-10 pt-24 pb-16">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={rechartsData} margin={{ top: 30, right: 40, left: 0, bottom: 20 }}>
                    <defs>
                      <linearGradient id="colorWorks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="var(--color-primary)" strokeOpacity={0.15} />
                    <XAxis 
                      dataKey="year" 
                      tick={{ fill: 'var(--color-primary-dark)', fontSize: 16, fontWeight: 900, fontFamily: 'var(--font-display)' }} 
                      axisLine={{ stroke: 'var(--color-primary)', strokeWidth: 2, opacity: 0.3 }}
                      tickLine={false}
                      dy={15}
                    />
                    <YAxis 
                      tick={{ fill: 'var(--color-primary-dark)', fontSize: 14, fontWeight: 'bold' }}
                      axisLine={false}
                      tickLine={false}
                      dx={-10}
                    />
                    <Tooltip 
                      content={<CustomRechartsTooltip />} 
                      cursor={{ stroke: 'var(--color-secondary)', strokeWidth: 2, strokeDasharray: '6 6', opacity: 0.7 }} 
                      animationDuration={300}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="works" 
                      stroke="var(--color-primary)" 
                      strokeWidth={5}
                      fillOpacity={1} 
                      fill="url(#colorWorks)"
                      activeDot={(props: any) => {
                        const { cx, cy, payload } = props;
                        return (
                          <g onClick={() => { setActiveIndex(payload.index); setView("tree"); }} className="cursor-pointer">
                            <circle cx={cx} cy={cy} r="40" fill="transparent" />
                            <g style={{ transformOrigin: `${cx}px ${cy}px` }} className="animate-[spin_4s_linear_infinite]">
                              <circle cx={cx} cy={cy} r={18} fill="none" stroke="var(--color-secondary)" strokeWidth={2.5} strokeDasharray="6 4" />
                            </g>
                            <g style={{ transformOrigin: `${cx}px ${cy}px` }} className="animate-[spin_6s_linear_infinite_reverse]">
                              <circle cx={cx} cy={cy} r={26} fill="none" stroke="var(--color-primary)" strokeWidth={1.5} strokeDasharray="4 6" opacity={0.7} />
                            </g>
                            <circle cx={cx} cy={cy} r={10} fill="#eafcf4" stroke="var(--color-secondary)" strokeWidth={4} style={{ filter: "drop-shadow(0 0 15px rgba(13,148,104,0.8))" }} />
                          </g>
                        );
                      }}
                      dot={{ r: 7, stroke: 'var(--color-primary)', strokeWidth: 3, fill: '#eafcf4' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              VIEW 2: الشجرة التفرعية المتجاوبة - بمسافات مريحة ותمدد ذكي (Smart Expansion)
              ========================================================================= */}
          {view === "tree" && (
            <motion.div 
              key="tree-view"
              initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full relative overflow-hidden flex items-center justify-center h-[80vh] min-h-[600px] lg:min-h-[750px]"
            >
              <div className="relative w-full h-full max-w-[1500px] mx-auto bg-transparent">
                
                {/* دائرة السنة المركزية (Root Node) */}
                <div className="absolute z-40 flex flex-col items-center gap-4 md:gap-6" style={{ top: `50%`, right: `${100 - ROOT_X}%`, transform: 'translate(50%, -50%)' }}>
                  <button onClick={() => setActiveIndex(p => Math.min(WORK_HISTORY.length - 1, p + 1))} disabled={activeIndex === WORK_HISTORY.length - 1} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#b2dcda]/90 backdrop-blur-md border border-white/50 text-[#0a3f2d] hover:bg-[#0d9468] hover:text-white disabled:opacity-30 transition-all shadow-md"><svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg></button>
                  <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-[#114fd1] to-[#0d9468] border-[4px] md:border-[6px] border-[#b2dcda] flex items-center justify-center shadow-[0_20px_50px_rgba(17,79,209,0.4)] relative">
                    <div className="absolute inset-0 rounded-full border-2 border-white/40 border-dashed animate-[spin_15s_linear_infinite]"></div>
                    <span className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-white">{activeData.year}</span>
                  </div>
                  <button onClick={() => setActiveIndex(p => Math.max(0, p - 1))} disabled={activeIndex === 0} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#b2dcda]/90 backdrop-blur-md border border-white/50 text-[#0a3f2d] hover:bg-[#0d9468] hover:text-white disabled:opacity-30 transition-all shadow-md"><svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg></button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={`tree-${activeIndex}`} className="absolute inset-0 w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
                    
                    {/* SVG للخطوط المتكيفة 100% */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {layoutData.map((cat, i) => {
                        const cpX1 = (ROOT_X + CAT_X) / 2;
                        const path1 = `M ${ROOT_X} 50 C ${cpX1} 50, ${cpX1} ${cat.centerY}, ${CAT_X} ${cat.centerY}`;

                        return (
                          <g key={`paths-${i}`}>
                            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.1 + (i * 0.1) }} d={path1} fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeOpacity="0.4" vectorEffect="non-scaling-stroke" />
                            
                            {cat.itemsLayout.map((item, j) => {
                              const targetX = item.colIndex === 0 ? TASK_X_1 : TASK_X_2;
                              const cpX2 = (CAT_X + targetX) / 2;
                              const path2 = `M ${CAT_X} ${cat.centerY} C ${cpX2} ${cat.centerY}, ${cpX2} ${item.centerY}, ${targetX} ${item.centerY}`;
                              
                              return (
                                <motion.path key={`path2-${i}-${j}`} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) + (j * 0.1) }} d={path2} fill="none" stroke="var(--color-secondary)" strokeWidth="2.5" strokeOpacity="0.5" strokeDasharray="6,6" vectorEffect="non-scaling-stroke" />
                              );
                            })}
                          </g>
                        );
                      })}
                    </svg>

                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                      {layoutData.map((cat, i) => {
                        const logoMidX = (ROOT_X + CAT_X) / 2;
                        const logoMidY = (50 + cat.centerY) / 2;

                        return (
                          <div key={`cat-${i}`}>
                            
                            <motion.div 
                              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: scaleFactor }} transition={{ type: "spring", delay: 0.3 + (i * 0.1) }} 
                              style={{ left: `${logoMidX}%`, top: `${logoMidY}%`, transformOrigin: "center" }} 
                              className="absolute w-8 h-8 md:w-12 md:h-12 -translate-x-1/2 -translate-y-1/2 bg-[#eafcf4]/95 backdrop-blur-md rounded-xl md:rounded-2xl border border-[var(--color-secondary)]/20 flex items-center justify-center shadow-[0_0_20px_rgba(13,148,104,0.3)] z-20"
                            >
                              <svg viewBox="0 0 24 24" fill="var(--color-secondary)" fillOpacity="0.1" stroke="var(--color-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-6 md:h-6">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                <line x1="12" y1="22.08" x2="12" y2="12" />
                              </svg>
                            </motion.div>

                            <motion.div 
                              initial={{ opacity: 0, x: -20, scale: scaleFactor * 0.9 }} 
                              animate={{ opacity: 1, x: 0, scale: scaleFactor }} 
                              transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                              style={{ top: `${cat.centerY}%`, right: `${100 - CAT_X}%`, transformOrigin: "right center" }}
                              className="absolute -translate-y-1/2 pointer-events-auto z-30"
                            >
                              {/* بطاقة الفئة مع التحجيم الديناميكي */}
                              <div className={`relative overflow-hidden bg-gradient-to-b from-[#f0fdf4] to-[#b2dcda] border border-[#83c5a6] rounded-xl lg:rounded-[1.2rem] shadow-[0_15px_30px_rgba(13,148,104,0.2)] hover:shadow-[0_20px_40px_rgba(13,148,104,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center ${catDynamicClass}`}>
                                <CardFallingDots type="green" />
                                <div className="absolute top-1/2 -right-[6px] lg:-right-[8px] w-3 h-3 lg:w-4 lg:h-4 bg-[#f0fdf4] border-[3px] lg:border-[4px] border-[var(--color-secondary)] rounded-full -translate-y-1/2 shadow-sm z-10"></div>
                                <h3 className={`font-black text-[#0a3f2d] text-center relative z-10 ${catTitleClass}`}>{cat.title}</h3>
                              </div>
                            </motion.div>

                            {cat.itemsLayout.map((item, j) => {
                              const targetX = item.colIndex === 0 ? TASK_X_1 : TASK_X_2;

                              return (
                                <motion.div 
                                  key={`item-${i}-${j}`}
                                  initial={{ opacity: 0, x: -20, scale: scaleFactor * 0.9 }} 
                                  animate={{ opacity: 1, x: 0, scale: scaleFactor }} 
                                  transition={{ duration: 0.4, delay: 0.5 + (i * 0.1) + (j * 0.1) }}
                                  style={{ top: `${item.centerY}%`, right: `${100 - targetX}%`, transformOrigin: "right center" }}
                                  className="absolute -translate-y-1/2 pointer-events-auto z-20"
                                >
                                  {/* بطاقة المهمة تتوسع الشاشة بأكملها عندما تقل العناصر */}
                                  <div className={`relative overflow-hidden bg-gradient-to-b from-[#f8faff] to-[#b2c8ea] border border-[#8caabf] rounded-xl lg:rounded-[1.2rem] shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:border-[var(--color-primary)]/80 transition-all duration-300 group ${taskDynamicClass}`}>
                                    <CardFallingDots type="blue" />
                                    <div className="absolute top-1/2 -right-[5px] lg:-right-[6px] w-2.5 h-2.5 lg:w-3 lg:h-3 bg-[#f8faff] border-[2px] lg:border-[3px] border-[var(--color-primary)] rounded-full -translate-y-1/2 group-hover:scale-150 transition-all shadow-sm z-10"></div>
                                    
                                    <h4 className={`font-extrabold text-[var(--color-primary-dark)] relative z-10 ${taskTitleClass}`}>{item.name}</h4>
                                    <p className={`font-bold text-gray-800 leading-snug relative z-10 line-clamp-2 md:line-clamp-none ${taskDescClass}`}>{item.desc}</p>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* زر الرجوع للخلف */}
              <div className="fixed top-6 right-6 lg:top-8 lg:right-8 z-[100] pointer-events-auto">
                <button 
                  onClick={() => setView("chart")} 
                  className="flex items-center gap-3 lg:gap-4 px-3 py-2 lg:px-5 lg:py-2.5 bg-[#eafcf4]/90 hover:bg-white backdrop-blur-2xl border border-[var(--color-secondary)]/30 rounded-xl lg:rounded-2xl shadow-[0_15px_30px_rgba(13,148,104,0.15)] transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-[var(--color-secondary)]/10 group-hover:bg-[var(--color-secondary)] transition-colors">
                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-[var(--color-secondary-dark)] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                  </div>
                  <div className="flex flex-col items-start pr-1 lg:pr-2">
                    <span className="text-xs lg:text-sm font-extrabold text-[#0a3f2d] leading-none">المخطط</span>
                    <span className="hidden md:block text-[10px] font-bold text-[var(--color-secondary-dark)] mt-1">الرجوع للخلف</span>
                  </div>
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}