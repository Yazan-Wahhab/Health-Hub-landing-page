"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// =========================================================================
// 🗂️ بيانات المخطط البياني والتايم لاين
// =========================================================================
const WORK_HISTORY = [
  {
    year: "2023",
    works: [
      { title: "تأسيس بنية EERD", desc: "تصميم المخطط الهيكلي لقواعد البيانات المركزية لدعم العمليات السريرية المعقدة." },
      { title: "إطلاق خوادم ASP.NET", desc: "بناء الـ API المركزي وتأمين نقل البيانات الطبية الحساسة بين الواجهات." }
    ]
  },
  {
    year: "2024",
    works: [
      { title: "نظام الفوترة والموارد", desc: "ربط حركات المرضى بالدورة المالية آلياً لتوليد الفواتير المطابقة للواقع." },
      { title: "تكامل الطباعة", desc: "أتمتة أوامر الطباعة عبر الشبكة لإنهاء الطوابير التشغيلية المزعجة." },
      { title: "لوحات تحكم الإدارة", desc: "واجهات ذكية تعرض تحليلات الأداء المالي والسريري للإدارة العليا." }
    ]
  },
  {
    year: "2025",
    works: [
      { title: "تطبيق الامتداد السريري", desc: "نشر واجهة مخصصة تتيح الوصول اللحظي لبيانات المرضى للأطباء." },
      { title: "أتمتة الصيدلية والجرد", desc: "ربط نظام الصرف الدوائي مع السجلات الطبية آلياً لتقليل الهدر." },
      { title: "محرك الإشعارات", desc: "تنبيهات فورية للطاقم الطبي عند تحديث حالة أو نتائج أي مريض." },
      { title: "تكامل المختبرات", desc: "نظام لاستقبال نتائج التحاليل مباشرة في ملف المريض الرقمي." }
    ]
  },
  {
    year: "2026",
    works: [
      { title: "إطلاق Smart Care 2.0", desc: "تفعيل النسخة الشاملة للتحكم في الحجوزات، العيادات، والسعة السريرية." },
      { title: "تجاوز المليون سجل", desc: "الوصول لمعالجة أكثر من 1.2 مليون سجل طبي بنجاح وتزامن لحظي." },
      { title: "تشفير البيانات (HIPAA)", desc: "تطبيق أعلى معايير التشفير العسكري لضمان سرية وأمان السجلات الطبية." },
      { title: "ترحيل البيانات المركزية", desc: "دمج بيانات الفروع المتعددة في خادم سحابي مركزي فائق السرعة." }
    ]
  }
];

// =========================================================================
// 🧬 المجسم الخلفي الجديد (Premium Elegant Data Rings) - ناعم ومناسب للفاتح
// =========================================================================
function ElegantBackgroundRings() {
  return (
    <div className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none opacity-40 flex items-center justify-center -translate-y-1/4 translate-x-1/4 z-0">
      {/* بقع لونية هادئة تعطي خلفية للرينغز */}
      <div className="absolute w-[400px] h-[400px] bg-[#0EA5E9] rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute w-[300px] h-[300px] bg-[var(--color-secondary)] rounded-full blur-[100px] opacity-20 -translate-x-20"></div>

      {/* الحلقات الدوارة (Tech Rings) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] rounded-full border border-[var(--color-primary)]/10 border-dashed"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[450px] h-[450px] rounded-full border border-[var(--color-secondary)]/15 border-dotted"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute w-[300px] h-[300px] rounded-full border border-[var(--color-primary)]/20"
      >
        <div className="absolute top-0 left-1/2 w-3 h-3 bg-[var(--color-secondary)] rounded-full shadow-[0_0_15px_var(--color-secondary)] -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>
    </div>
  );
}

// =========================================================================
// 🚀 الصفحة الرئيسية للمكون (المعالم الهندسية)
// =========================================================================
export default function EngineeringMilestones() {
  // الحالة الافتراضية تعرض آخر سنة (2026)
  const [activeYear, setActiveYear] = useState<string>("2026");

  // =========================================================================
  // 📈 هندسة Gradient Area Chart (ديناميكية وأكثر نظافة)
  // =========================================================================
  const chartWidth = 1000;
  const chartHeight = 350;
  const maxWorks = Math.max(...WORK_HISTORY.map(y => y.works.length), 1);

  const { points, pathString, areaString } = useMemo(() => {
    const pts = WORK_HISTORY.map((data, i) => {
      const x = (i / Math.max(WORK_HISTORY.length - 1, 1)) * (chartWidth - 100) + 50;
      const workCount = data.works.length;
      // تصاعد المنحنى
      const y = chartHeight - 60 - ((workCount / maxWorks) * (chartHeight - 160)); 
      return { x, y, year: data.year, count: workCount };
    });

    let path = `M ${pts[0]?.x || 0},${pts[0]?.y || 0} `;
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i - 1];
      const p1 = pts[i];
      const cx = (p0.x + p1.x) / 2;
      path += `C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y} `;
    }

    const area = `M 0,${chartHeight} L 0,${pts[0]?.y || 0} ${path.replace(/^M[^ ]+ /, '')} L ${chartWidth},${chartHeight} Z`;

    return { points: pts, pathString: path, areaString: area };
  }, [maxWorks]);

  const activeYearData = WORK_HISTORY.find(p => p.year === activeYear) || WORK_HISTORY[WORK_HISTORY.length - 1];

  return (
    <section className="relative w-full py-24 lg:py-32 z-20 bg-transparent overflow-hidden">
      
      {/* 🛸 المجسم المرجعي الفاخر في الخلفية */}
      <ElegantBackgroundRings />

      <div className="w-full px-6 md:px-12 lg:px-16 relative z-10 max-w-[1600px] mx-auto">
        
        {/* =========================================================================
            1. العنوان الاحترافي (يظهر بسلاسة عند السكرول)
            ========================================================================= */}
        <div className="mb-16 flex flex-col items-start text-left max-w-3xl relative z-20">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.3 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-[var(--color-text-main)] tracking-tight leading-[1.15]"
          >
            تطور تقني يعكس <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">نمو الرعاية الصحية</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.3 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-lg font-medium text-[var(--color-text-muted)] max-w-2xl leading-relaxed"
          >
            استكشف السجل الهندسي الموثق لمنصة Smart Care. اضغط على المنحنى البياني لاستعراض التحديثات المحورية التي شكلت البنية التحتية للنظام عبر السنوات.
          </motion.p>
        </div>

        {/* =========================================================================
            📊 2. التخطيط الرئيسي (مخطط بياني + تايم لاين مدمج)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative z-20">
          
          {/* 📈 القسم الأيمن (المخطط البياني - زجاجي ناصع البياض) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-7 xl:col-span-8 bg-white/80 backdrop-blur-2xl rounded-[2rem] border border-white shadow-[0_20px_50px_rgba(17,79,209,0.08)] overflow-hidden flex flex-col p-6 lg:p-10"
          >
            <div className="flex flex-col justify-between items-start mb-8 relative z-10">
              <h3 className="text-2xl md:text-3xl font-display font-extrabold text-[#022c22]">المنحنى التراكمي للإنجازات</h3>
              <p className="text-sm text-[var(--color-text-muted)] font-bold mt-2">تطور البنية التحتية والميزات المركزية للمنصة</p>
            </div>

            <div className="relative w-full overflow-hidden bg-[var(--color-background)]/50 rounded-2xl border border-[var(--color-border)]/60" style={{ height: "auto", aspectRatio: "1000/350" }}>
              
              {/* شبكة الخطوط الأفقية للتصميم */}
              <div className="absolute inset-0 flex flex-col justify-between opacity-40 pb-12 pt-6 pointer-events-none px-4">
                {[1, 2, 3, 4].map((_, i) => <div key={i} className="w-full h-px bg-[var(--color-primary)]/20"></div>)}
              </div>

              <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
                <defs>
                  <linearGradient id="chartLineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="100%" stopColor="var(--color-secondary)" />
                  </linearGradient>
                  <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
                    <stop offset="50%" stopColor="var(--color-secondary)" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="var(--color-background)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* المنطقة المظللة الشفافة */}
                <motion.path 
                  d={areaString} 
                  fill="url(#chartAreaGradient)" 
                  initial={{ opacity: 0 }} 
                  whileInView={{ opacity: 1 }} 
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3 }} 
                />
                
                {/* الخط البياني الأساسي */}
                <motion.path 
                  d={pathString} 
                  fill="none" 
                  stroke="url(#chartLineGradient)" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  style={{ filter: "drop-shadow(0px 8px 12px rgba(17,79,209,0.3))" }} 
                  initial={{ pathLength: 0 }} 
                  whileInView={{ pathLength: 1 }} 
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.2 }} 
                />
                
                {/* نقاط التفاعل (Nodes) */}
                {points.map((point, index) => {
                  const isActive = activeYear === point.year;
                  return (
                    <motion.g 
                      key={index} 
                      onClick={() => setActiveYear(point.year)} 
                      className="cursor-pointer group" 
                      initial={{ scale: 0, opacity: 0 }} 
                      whileInView={{ scale: 1, opacity: 1 }} 
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.8 + (index * 0.15) }}
                    >
                      {/* منطقة الضغط المخفية */}
                      <circle cx={point.x} cy={point.y} r="40" fill="transparent" />
                      
                      {/* هالة النبض عند التفعيل */}
                      {isActive && <circle cx={point.x} cy={point.y} r="24" fill="var(--color-secondary)" opacity="0.2" className="animate-ping" />}
                      
                      {/* الدائرة المرئية الأنيقة */}
                      <circle 
                        cx={point.x} 
                        cy={point.y} 
                        r={isActive ? "12" : "8"} 
                        fill="white" 
                        stroke={isActive ? "var(--color-secondary)" : "var(--color-primary)"} 
                        strokeWidth={isActive ? "5" : "4"} 
                        className="transition-all duration-300 group-hover:stroke-[var(--color-secondary)] group-hover:r-[12px]" 
                        style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))" }} 
                      />
                      
                      {/* نص السنة بوضوح عالي */}
                      <text 
                        x={point.x} 
                        y={chartHeight - 20} 
                        fill={isActive ? "var(--color-text-main)" : "var(--color-text-muted)"} 
                        fontSize="16" 
                        fontWeight="900" 
                        textAnchor="middle" 
                        className="transition-colors group-hover:fill-[var(--color-primary)] font-display"
                      >
                        {point.year}
                      </text>
                    </motion.g>
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* 📜 القسم الأيسر (التايم لاين - زجاجي وأنيق) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="lg:col-span-5 xl:col-span-4 flex flex-col h-full bg-white/80 backdrop-blur-2xl rounded-[2rem] border border-white shadow-[0_20px_50px_rgba(13,148,104,0.08)] overflow-hidden"
          >
            {/* الهيدر الخاص بالتايم لاين */}
            <div className="bg-gradient-to-r from-[var(--color-background)] to-white border-b border-[var(--color-border)]/60 p-6 md:p-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-xl bg-white shadow-md border border-[var(--color-border)] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-xl lg:text-2xl font-display font-black text-[#022c22]">السجل التقني</h4>
                  <div className="inline-flex items-center gap-1.5 mt-1">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse"></span>
                    <p className="text-xs font-bold text-[var(--color-secondary-dark)] tracking-widest uppercase">Release {activeYearData.year}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* منطقة المهام قابلة للتمرير (Timeline) */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[400px] lg:max-h-[500px] custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeYear}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative border-r-[3px] border-[var(--color-border)] mr-3 pr-6 space-y-8"
                >
                  {activeYearData.works.map((work, idx) => (
                    <div key={idx} className="relative group">
                      {/* العقدة على خط التايم لاين */}
                      <div className="absolute w-4 h-4 rounded-full bg-white border-[3px] border-[var(--color-primary)] -right-[34.5px] top-1.5 transition-all duration-300 group-hover:border-[var(--color-secondary)] group-hover:bg-[var(--color-secondary)] group-hover:scale-125 shadow-sm"></div>
                      
                      {/* كارت المهمة */}
                      <div className="bg-white border border-[var(--color-border)]/50 p-5 rounded-2xl transition-all duration-300 hover:border-[var(--color-secondary)]/40 hover:shadow-[0_10px_30px_rgba(13,148,104,0.12)] hover:-translate-y-1">
                        <h4 className="text-lg font-extrabold text-[var(--color-text-main)] mb-2 group-hover:text-[var(--color-primary-dark)] transition-colors">{work.title}</h4>
                        <p className="text-sm font-bold text-[var(--color-text-muted)] leading-relaxed">{work.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}