"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";

// =========================================================================
// 🔥 1. بيانات المخطط البياني (ترفع المنحنى للأعلى)
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
      { title: "تكامل الطباعة", desc: "أتمتة أوامر الطباعة عبر الشبكة (طابعات Xprinter و Epson) لإنهاء الطوابير." },
      { title: "لوحات تحكم الإدارة", desc: "واجهات ذكية تعرض تحليلات الأداء المالي والسريري للإدارة العليا." }
    ]
  },
  {
    year: "2025",
    works: [
      { title: "تطبيق الامتداد السريري", desc: "نشر واجهة مخصصة تتيح الوصول اللحظي لبيانات المرضى للأطباء." },
      { title: "أتمتة الصيدلية والجرد", desc: "ربط نظام الصرف الدوائي مع السجلات الطبية آلياً." },
      { title: "محرك الإشعارات", desc: "تنبيهات فورية للطاقم الطبي عند تحديث حالة أو نتائج أي مريض." },
      { title: "تكامل المختبرات", desc: "نظام لاستقبال نتائج التحاليل مباشرة في ملف المريض الرقمي." }
    ]
  },
  {
    year: "2026",
    works: [
      { title: "إطلاق Smart Care 2.0", desc: "تفعيل النسخة الشاملة للتحكم في الحجوزات، العيادات، والسعة السريرية." },
      { title: "تجاوز المليون سجل", desc: "الوصول لمعالجة أكثر من 1.2 مليون سجل طبي بنجاح وتزامن لحظي." },
      { title: "نظام الجدولة الذكية", desc: "إدارة غرف العمليات وربطها بجداول الطاقم الطبي المتاحة." },
      { title: "تشفير البيانات (HIPAA)", desc: "تطبيق أعلى معايير التشفير لضمان سرية وأمان السجلات الطبية." },
      { title: "ترحيل البيانات المركزية", desc: "دمج بيانات الفروع المتعددة في خادم سحابي مركزي فائق السرعة." }
    ]
  }
];

// =========================================================================
// 🔥 2. شبكة المشاريع (الصور حية بدون فلاتر)
// =========================================================================
const PROJECTS_DATA = [
  {
    id: 1, title: "نواة Smart Care المركزية", hospital: "مستشفى الأمل الجامعي",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop", tags: ["Data Architecture", "EERD"],
    description: "تطبيق النواة المركزية لإدارة السعة السريرية لأكثر من 500 سرير. تضمن العمل بناء مخططات EERD متقدمة تقضي على تكرار البيانات وتسرع الاستعلامات الطبية.",
    stats: [{ label: "زمن المعالجة", value: "0.02s" }, { label: "استعلام يومي", value: "+2M" }, { label: "التوافر", value: "99.9%" }], color: "blue"
  },
  {
    id: 2, title: "أتمتة الاستقبال والطباعة", hospital: "مجمع النخبة الطبي",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=800&auto=format&fit=crop", tags: ["Hardware API", "Automation"],
    description: "دمج وحدة أتمتة لدعم الطباعة الحرارية المباشرة لإصدار التذاكر واللواصق المخبرية آلياً، مما أحدث ثورة في سرعة تدفق المرضى.",
    stats: [{ label: "تذكرة يومياً", value: "5K+" }, { label: "دقة الطباعة", value: "100%" }], color: "green"
  },
  {
    id: 3, title: "الامتداد السريري للطاقم", hospital: "عيادات السلام التخصصية",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop", tags: ["React Front-end", "Real-time"],
    description: "واجهة وصول لحظي لبيانات المرضى من أي نقطة في المشفى، مصممة هندسياً لتقليل العبء المعرفي على الأطباء أثناء فترات الضغط.",
    stats: [{ label: "مستخدم متزامن", value: "150+" }, { label: "مزامنة", value: "Instant" }], color: "blue"
  },
  {
    id: 4, title: "هندسة الدورة المالية", hospital: "المركز الوطني للقلب",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d786a2b?q=80&w=800&auto=format&fit=crop", tags: ["Finance Engine", "Analytics"],
    description: "خوارزميات متقدمة تربط السجلات الطبية بالمالية، لإنشاء المطالبات وحساب استهلاك غرف العمليات بدقة متناهية وسد فجوات الإيرادات.",
    stats: [{ label: "دقة الفوترة", value: "99.9%" }, { label: "إدارة أسرة", value: "300+" }], color: "green"
  },
  {
    id: 5, title: "مركزة البيانات والترحيل", hospital: "مجموعة الشفاء الصحية",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", tags: ["Data Migration", "Security"],
    description: "مشروع دقيق لتوحيد قواعد البيانات المتناثرة عبر الفروع ضمن سيرفر مركزي آمن ومحمي بأحدث بروتوكولات التشفير.",
    stats: [{ label: "فروع مرتبطة", value: "3" }, { label: "أمان", value: "HIPAA" }], color: "blue"
  }
];

export default function ImpactPartners() {
  const containerRef = useRef<HTMLElement>(null);
  const chartSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS_DATA[0] | null>(null);

  // =========================================================================
  // 📈 هندسة المخطط البياني (دقيق، منحني بسلاسة، ويرتفع للأعلى)
  // =========================================================================
  const chartWidth = 900;
  const chartHeight = 320;
  const maxWorks = Math.max(...WORK_HISTORY.map(y => y.works.length), 1);

  const { points, pathString, areaString } = useMemo(() => {
    const pts = WORK_HISTORY.map((data, i) => {
      const x = (i / Math.max(WORK_HISTORY.length - 1, 1)) * (chartWidth - 100) + 50;
      const workCount = data.works.length;
      // ترتفع النقطة للأعلى بناءً على عدد الإنجازات
      const y = chartHeight - 40 - ((workCount / maxWorks) * (chartHeight - 120)); 
      return { x, y, year: data.year, count: workCount, details: data.works };
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

  const activeYearData = points.find(p => p.year === activeYear);

  // =========================================================================
  // 🌀 حركة اللوغو الممتدة (يتحرك من اليسار لليمين وينزل للصفحة التالية)
  // =========================================================================
  const { scrollYProgress: logoScroll } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const logoX = useTransform(logoScroll, [0, 1], ["-10vw", "40vw"]); 
  const logoY = useTransform(logoScroll, [0, 1], ["0vh", "220vh"]); 
  const logoRotate = useTransform(logoScroll, [0, 1], [-20, 180]);
  const logoOpacity = useTransform(logoScroll, [0, 0.2, 0.8, 1], [0, 0.35, 0.35, 0]);

  // =========================================================================
  // 🧊 حركة مجسم الإحصائيات (Holographic Analytics 3D Object)
  // =========================================================================
  const { scrollYProgress: chartScroll } = useScroll({ target: chartSectionRef, offset: ["start end", "end start"] });
  const objectScale = useTransform(chartScroll, [0, 0.4, 0.6, 1], [0.7, 1, 1, 0.7]);
  const objectOpacity = useTransform(chartScroll, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative w-full py-24 z-20 bg-transparent overflow-visible">
      
      {/* 🚀 اللوغو الساحب بحرية في الخلفية 🚀 */}
      <motion.div 
        className="absolute z-0 pointer-events-none mix-blend-multiply"
        style={{ x: logoX, y: logoY, rotate: logoRotate, opacity: logoOpacity }}
      >
        <div className="relative flex items-center justify-center scale-[2]">
          <div className="absolute h-[250px] w-[250px] rounded-full bg-[#114FD1] opacity-10 blur-[60px]"></div>
          <div className="absolute h-[250px] w-[250px] rounded-full bg-[#10B981] opacity-10 blur-[60px] translate-x-10"></div>
          <img src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75" alt="Health Hub" className="relative z-10 w-64 h-64 object-contain opacity-50" />
        </div>
      </motion.div>

      <div className="w-full px-6 md:px-12 lg:px-16 relative z-10 max-w-[1800px] mx-auto">
        
        {/* =========================================================================
            1. العنوان الاحترافي العائم 
            ========================================================================= */}
        <div className="mb-20 flex flex-col items-start text-left max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 bg-white/60 backdrop-blur-md border border-blue-100 px-5 py-2 rounded-full shadow-sm mb-6"
          >
            <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#114FD1] opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#114FD1]"></span></span>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#114FD1]">Engineering Milestones</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-[#0a1b3f] tracking-tighter leading-[1.1] drop-shadow-sm"
          >
            تطور يعكس <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#114FD1] to-[#10B981]">حجم الإنجازات</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg font-medium text-slate-500 max-w-2xl leading-relaxed"
          >
            المنحنى يرتفع ديناميكياً ليمثل حجم المشاريع والتحديثات المضافة للنظام. <strong className="text-[#114FD1]">اضغط على أي سنة</strong> لاستكشاف السجل التقني والأعمال المنجزة.
          </motion.p>
        </div>

        {/* =========================================================================
            📊 2. تخطيط (الثلاثة أرباع للمخطط، الربع لمجسم الإحصائيات)
            ========================================================================= */}
        <div ref={chartSectionRef} className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-32 items-stretch">
          
          {/* 📈 الثلاثة أرباع: المخطط البياني الاحترافي (75%) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3 bg-white/60 backdrop-blur-3xl rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(17,79,209,0.05)] overflow-hidden flex flex-col relative p-8"
          >
            {/* الهيدر النظيف للوحة التحكم */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-[#0a1b3f]">مسار النمو المتراكم</h3>
                <p className="text-sm text-slate-500 font-medium mt-1">اضغط على النقاط الزرقاء لاستعراض التفاصيل السنوية</p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <span className="px-4 py-1.5 bg-blue-50 border border-blue-100 text-[#114FD1] rounded-full text-[10px] font-bold uppercase shadow-sm">قاعدة البيانات</span>
                <span className="px-4 py-1.5 bg-emerald-50 border border-emerald-100 text-[#10B981] rounded-full text-[10px] font-bold uppercase shadow-sm">عتاد سريري</span>
              </div>
            </div>

            {/* مساحة الـ SVG للمخطط */}
            <div className="relative w-full overflow-hidden" style={{ height: chartHeight }}>
              {/* خطوط الشبكة الأفقية الدقيقة والاحترافية */}
              <div className="absolute inset-0 flex flex-col justify-between opacity-40 pb-10 pt-4 pointer-events-none">
                {[1, 2, 3, 4].map((_, i) => <div key={i} className="w-full h-px bg-slate-300"></div>)}
              </div>

              <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
                <defs>
                  {/* تدرج لوني فخم من الأزرق النيلي إلى السيان إلى الأخضر */}
                  <linearGradient id="chartLineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3730A3" /> {/* Indigo */}
                    <stop offset="50%" stopColor="#0EA5E9" /> {/* Cyan */}
                    <stop offset="100%" stopColor="#10B981" /> {/* Emerald */}
                  </linearGradient>
                  {/* تدرج المنطقة السفلية الصاعد */}
                  <linearGradient id="chartAreaGradientUpward" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
                    <stop offset="100%" stopColor="#114FD1" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                
                <motion.path d={areaString} fill="url(#chartAreaGradientUpward)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} />
                
                {/* الخط البياني الناعم */}
                <motion.path d={pathString} fill="none" stroke="url(#chartLineGradient)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0px 8px 12px rgba(14,165,233,0.3))" }} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} />
                
                {points.map((point, index) => {
                  const isActive = activeYear === point.year;
                  return (
                    <motion.g key={index} onClick={() => setActiveYear(point.year)} className="cursor-pointer group" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}>
                      <circle cx={point.x} cy={point.y} r="40" fill="transparent" />
                      {isActive && <circle cx={point.x} cy={point.y} r="18" fill="#10B981" opacity="0.25" className="animate-ping" />}
                      {/* النقطة الجمالية */}
                      <circle cx={point.x} cy={point.y} r="9" fill="#ffffff" stroke={isActive ? "#10B981" : "#114FD1"} strokeWidth="4" className="transition-all duration-300 group-hover:r-[12px] group-hover:stroke-[#10B981]" style={{ filter: "drop-shadow(0px 4px 6px rgba(17,79,209,0.2))" }} />
                      <text x={point.x} y={chartHeight - 15} fill={isActive ? "#10B981" : "#64748b"} fontSize="14" fontWeight="bold" textAnchor="middle" className="transition-colors group-hover:fill-[#0a1b3f]">{point.year}</text>
                      
                      {/* Tooltip */}
                      <g className="transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        <rect x={point.x - 45} y={point.y - 45} width="90" height="28" rx="8" fill="#0f172a" shadow="md" />
                        <text x={point.x} y={point.y - 26} fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">{point.count} مهام مركزية</text>
                        <polygon points={`${point.x - 5},${point.y - 17} ${point.x + 5},${point.y - 17} ${point.x},${point.y - 12}`} fill="#0f172a" />
                      </g>
                    </motion.g>
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* 🌟 الربع المتبقي: مجسم الإحصائيات (3D Holographic Analytics) 🌟 */}
          <div className="lg:col-span-1 flex items-center justify-center h-full min-h-[350px] perspective-[1200px]">
            <motion.div 
              style={{ scale: objectScale, opacity: objectOpacity }}
              animate={{ y: [-10, 10, -10], rotateY: [-5, 5, -5], rotateX: [5, 10, 5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[280px] aspect-square bg-white/40 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-[0_30px_60px_rgba(17,79,209,0.1)] p-6 flex flex-col transform-style-preserve-3d"
            >
              {/* توهج خلفي للمجسم */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#114FD1]/10 to-[#10B981]/10 rounded-[2.5rem] pointer-events-none"></div>
              
              {/* رأس لوحة الإحصائيات المجسمة */}
              <div className="flex justify-between items-center mb-4 translate-z-[20px]">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 text-[#114FD1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Growth</div>
                  <div className="text-xl font-black text-[#0a1b3f]">+340%</div>
                </div>
              </div>

              {/* أعمدة الإحصائيات المتحركة داخل المجسم */}
              <div className="flex-1 flex items-end justify-between gap-2.5 translate-z-[40px] mt-2 border-b border-slate-200/50 pb-2">
                {[30, 45, 60, 85, 100].map((h, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ height: [`${h - 10}%`, `${h}%`, `${h - 10}%`] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    className={`w-full rounded-t-[6px] shadow-sm relative overflow-hidden ${i === 4 ? 'bg-gradient-to-t from-[#10B981]/60 to-[#10B981]' : 'bg-gradient-to-t from-[#114FD1]/40 to-[#114FD1]/70'}`}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/40"></div>
                  </motion.div>
                ))}
              </div>

              {/* سهم صاعد عائم خارج المجسم لإعطاء تأثير الـ 3D الكامل */}
              <motion.div 
                animate={{ y: [-5, 5, -5], rotateZ: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 -top-4 bg-white border border-slate-100 shadow-[0_10px_20px_rgba(0,0,0,0.08)] rounded-xl p-3 translate-z-[60px]"
              >
                <span className="text-[#10B981] font-bold text-sm flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  100%
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* =========================================================================
            💼 3. شبكة المشاريع (Bento Grid) - صور حية 100%
            ========================================================================= */}
        <div className="mb-10 flex flex-col items-start text-left max-w-2xl mt-12">
          <h3 className="text-4xl font-display font-extrabold text-[#0a1b3f] mb-4">شركاء الثقة وقصص النجاح</h3>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">شراكات استراتيجية مع مؤسسات رائدة اختارت بنية Smart Care لإدارة عملياتها الطبية.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[280px] lg:auto-rows-[340px] gap-4 lg:gap-6">
          {PROJECTS_DATA.map((project, idx) => {
            let spanClass = "";
            if (idx === 0) spanClass = "md:col-span-8 md:row-span-2"; 
            else if (idx === 1) spanClass = "md:col-span-4 md:row-span-1";
            else if (idx === 2) spanClass = "md:col-span-4 md:row-span-1";
            else if (idx === 3) spanClass = "md:col-span-6 md:row-span-1";
            else if (idx === 4) spanClass = "md:col-span-6 md:row-span-1";

            const themeBorder = project.color === 'blue' ? 'hover:border-[#114FD1]/40' : 'hover:border-[#10B981]/40';
            const badgeBg = project.color === 'blue' ? 'bg-[#114FD1]/90 text-white border-[#114FD1]' : 'bg-[#10B981]/90 text-white border-[#10B981]';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }} viewport={{ once: true }}
                onClick={() => setSelectedProject(project)}
                className={`group relative overflow-hidden rounded-[2.5rem] bg-white cursor-pointer transition-all duration-500 ${spanClass} border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(17,79,209,0.15)] hover:-translate-y-1 ${themeBorder}`}
              >
                {/* صور حية وملونة بالكامل بدون أي فلتر */}
                <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                
                {/* تدرج سفلي فقط لضمان قراءة النص */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1b3f]/95 via-[#0a1b3f]/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute inset-0 p-6 lg:p-10 flex flex-col justify-end z-10">
                  <motion.div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className={`px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-sm ${badgeBg}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className={`font-display font-extrabold text-white mb-2 leading-tight drop-shadow-md ${idx === 0 ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                      {project.title}
                    </h4>
                    <p className="text-slate-200 font-bold text-sm uppercase tracking-wider drop-shadow-sm">{project.hospital}</p>
                  </motion.div>
                </div>

                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/30 backdrop-blur-xl border border-white/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100 shadow-md">
                  <svg className="w-5 h-5 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* =========================================================================
          💎 4. النافذة المنبثقة الخارقة لبيانات السنوات (Timeline Pop-up - فخمة)
          ========================================================================= */}
      <AnimatePresence>
        {activeYearData && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(12px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-[#0a1b3f]/60"
            onClick={() => setActiveYear(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 30 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* القسم الأيمن: عنوان السنة والإحصائيات */}
              <div className="w-full md:w-1/3 bg-gradient-to-b from-[#114FD1] to-[#0a1b3f] p-8 md:p-12 relative flex flex-col justify-between overflow-hidden">
                {/* علامة مائية ضخمة لرقم السنة */}
                <div className="absolute -left-10 -top-10 text-[10rem] font-black text-white/5 pointer-events-none select-none tracking-tighter">
                  {activeYearData.year}
                </div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Engineering Log</span>
                  </div>
                  <h3 className="text-5xl font-display font-extrabold text-white mb-2">{activeYearData.year}</h3>
                  <p className="text-blue-200 font-medium text-sm leading-relaxed">السجل الهندسي الشامل والمهام المركزية المضافة لنظام Smart Care.</p>
                </div>

                <div className="relative z-10 mt-12 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-[1.5rem]">
                  <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">إجمالي التحديثات</p>
                  <p className="text-3xl font-black text-white">{activeYearData.count} <span className="text-sm font-medium text-blue-200">مهمة رئيسية</span></p>
                </div>
              </div>

              {/* القسم الأيسر: مسار زمني (Timeline) فخم للأعمال */}
              <div className="w-full md:w-2/3 p-8 md:p-12 overflow-y-auto bg-slate-50 relative">
                <button onClick={() => setActiveYear(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-red-500 transition-all shadow-sm z-10">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="relative border-r-2 border-[#114FD1]/20 mr-4 pr-6 space-y-8 mt-8">
                  {activeYearData.details.map((work, idx) => (
                    <motion.div 
                      key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + (idx * 0.1) }}
                      className="relative"
                    >
                      {/* النقطة المضيئة على المسار الزمني */}
                      <div className="absolute w-4 h-4 rounded-full bg-white border-4 border-[#114FD1] shadow-[0_0_10px_rgba(17,79,209,0.4)] -right-[33px] top-1"></div>
                      
                      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-[#10B981]/50 transition-all">
                        <h4 className="text-lg font-extrabold text-[#0a1b3f] mb-2">{work.title}</h4>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed">{work.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          💎 5. النافذة المنبثقة لبيانات المشاريع (Projects Modal)
          ========================================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(12px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-slate-900/60"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 30 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white flex flex-col md:flex-row max-h-[90vh]"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/60 backdrop-blur-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-red-500 transition-all shadow-sm hover:scale-105">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div className="w-full md:w-5/12 h-64 md:h-auto relative overflow-hidden bg-slate-100">
                <img src={selectedProject.image} alt={selectedProject.hospital} className="absolute inset-0 w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${selectedProject.color === 'blue' ? 'from-[#114FD1]/20' : 'from-[#10B981]/20'} mix-blend-multiply`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              </div>

              <div className="w-full md:w-7/12 p-8 md:p-12 overflow-y-auto bg-white relative">
                <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className={`px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest rounded-full bg-slate-50 border shadow-sm ${selectedProject.color === 'blue' ? 'text-[#114FD1] border-blue-100' : 'text-[#10B981] border-emerald-100'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-display font-extrabold text-[#0a1b3f] mb-2 leading-tight drop-shadow-sm relative z-10">{selectedProject.title}</h3>
                <p className={`text-sm font-extrabold uppercase tracking-widest mb-8 flex items-center gap-2 relative z-10 ${selectedProject.color === 'blue' ? 'text-[#114FD1]' : 'text-[#10B981]'}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  {selectedProject.hospital}
                </p>

                <p className="text-slate-600 font-medium text-lg leading-relaxed mb-10 relative z-10">{selectedProject.description}</p>

                <div className="grid grid-cols-2 gap-5 relative z-10">
                  {selectedProject.stats.map((stat, idx) => (
                    <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm">
                      <p className="text-3xl font-display font-extrabold text-[#0a1b3f] mb-1.5">{stat.value}</p>
                      <p className={`text-[10px] font-extrabold uppercase tracking-widest ${selectedProject.color === 'blue' ? 'text-[#114FD1]' : 'text-[#10B981]'}`}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}