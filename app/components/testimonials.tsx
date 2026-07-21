"use client";

import { useState, useRef, useEffect } from "react";
import { 
  motion, 
  useMotionValue, 
  useMotionTemplate, 
  useScroll, 
  useTransform, 
  useSpring
} from "framer-motion";

// ==========================================
// 📊 بيانات آراء العملاء
// ==========================================
const testimonialsData = [
  {
    id: 1,
    quote: "منصة Smart Care لم تكن مجرد تحديث تقني، بل كانت إعادة هندسة كاملة لعملياتنا. تمكنا من ربط غرف العمليات بالعناية المركزة لحظياً، مما رفع من سرعة اتخاذ القرار الطبي في اللحظات الحرجة.",
    author: "د. طارق عبدالرحمن",
    role: "المدير الطبي التنفيذي",
    hospital: "مستشفى الملك فهد التخصصي",
    metrics: [
      { label: "كفاءة العمليات", value: "+45%" },
      { label: "وقت الانتظار", value: "-30%" }
    ],
    avatar: "https://i.pravatar.cc/150?img=11",
    logoColor: "from-blue-500 to-cyan-400",
    date: "قبل يومين"
  },
  {
    id: 2,
    quote: "أكثر ما يميز النظام هو الاستقرار المطلق (Zero Downtime). في إدارة الطوارئ، لا يمكننا تحمل توقف النظام لثانية واحدة. البنية التحتية للمنصة أثبتت أنها مصممة فعلاً للبيئات الحرجة.",
    author: "م. سارة الميموني",
    role: "مدير قطاع تقنية المعلومات (CIO)",
    hospital: "مجموعة العيادات المتقدمة",
    metrics: [
      { label: "استقرار النظام", value: "99.99%" },
      { label: "أمان البيانات", value: "A+" }
    ],
    avatar: "https://i.pravatar.cc/150?img=5",
    logoColor: "from-[#0d9468] to-emerald-400",
    date: "أسبوع واحد"
  },
  {
    id: 3,
    quote: "التحول إلى نظام لا ورقي بالكامل كان تحدياً، لكن واجهة المستخدم البديهية جعلت تدريب أكثر من 500 طبيب وممرض يتم في وقت قياسي. دورة الفوترة أصبحت أسرع وأكثر دقة بشكل ملحوظ.",
    author: "د. خالد السعيد",
    role: "المدير المالي لقطاع الصحة",
    hospital: "مجمع الرعاية الحديثة",
    metrics: [
      { label: "سرعة الفوترة", value: "3x" },
      { label: "الأخطاء الورقية", value: "0%" }
    ],
    avatar: "https://i.pravatar.cc/150?img=8",
    logoColor: "from-indigo-500 to-blue-600",
    date: "شهر واحد"
  },
  {
    id: 4,
    quote: "قدرة النظام على التكامل مع أجهزة الأشعة (PACS) والمختبرات المركزية في شاشة واحدة وفرت على الأطباء الكثير من الجهد. الآن كل التاريخ الطبي للمريض متاح بنقرة واحدة.",
    author: "د. نورة العبدالله",
    role: "رئيسة قسم الباطنية",
    hospital: "مستشفى النور التخصصي",
    metrics: [
      { label: "رضا الأطباء", value: "95%" },
      { label: "سرعة التشخيص", value: "+40%" }
    ],
    avatar: "https://i.pravatar.cc/150?img=9",
    logoColor: "from-teal-400 to-emerald-500",
    date: "شهران"
  },
  {
    id: 5,
    quote: "تجربتنا مع النظام كانت استثنائية. ربط كافة الأقسام الطبية بمنصة واحدة خفض من الوقت المستغرق في نقل المريض بين الأقسام وزاد من الكفاءة التشغيلية.",
    author: "د. يوسف الحمد",
    role: "مدير العمليات الطبية",
    hospital: "مركز الحياة الطبي",
    metrics: [
      { label: "الكفاءة التشغيلية", value: "+50%" },
      { label: "الأعمال الورقية", value: "-80%" }
    ],
    avatar: "https://i.pravatar.cc/150?img=33",
    logoColor: "from-purple-500 to-pink-500",
    date: "3 أشهر"
  },
  {
    id: 6,
    quote: "كطبيب جراح، أحتاج للمعلومات بشكل لحظي. النظام يوفر لي لوحة تحكم شاملة لحالة المريض قبل وأثناء العملية، وهذا رفع من معدلات النجاح وقلل من المفاجآت.",
    author: "د. رامي الخطيب",
    role: "استشاري الجراحة العامة",
    hospital: "المستشفى السعودي الألماني",
    metrics: [
      { label: "معدل الأمان", value: "98%" },
      { label: "الوصول للبيانات", value: "لحظي" }
    ],
    avatar: "https://i.pravatar.cc/150?img=12",
    logoColor: "from-orange-400 to-red-500",
    date: "6 أشهر"
  }
];

// ==========================================
// ✨ مكون المجسمات المتساقطة
// ==========================================
function FallingShapes() {
  const shapes = Array.from({ length: 6 }); 
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-100">
      {shapes.map((_, i) => {
        const isCross = i % 2 === 0;
        return (
          <motion.div
            key={i}
            className="absolute text-blue-500/60 drop-shadow-sm"
            style={{ left: `${Math.random() * 80 + 10}%`, top: -50 }}
            animate={{ y: [0, 600], rotate: [0, 360], x: [0, Math.random() * 60 - 30] }}
            transition={{ duration: Math.random() * 6 + 6, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
          >
            {isCross ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

// ==========================================
// ✨ مكون البطاقة الممتلئ والغني
// ==========================================
function TestimonialCard({ item }: { item: typeof testimonialsData[0] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const backgroundSpotlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, var(--color-primary) 0%, transparent 80%)`;
  const borderSpotlight = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, var(--color-secondary) 0%, transparent 80%)`;

  return (
    <motion.div
      dir="rtl"
      onMouseMove={handleMouseMove}
      className="group relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 text-right shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(13,148,104,0.08)] select-none
                 w-[90vw] max-w-[340px] h-auto min-h-[420px] md:max-w-[420px] md:h-[520px] md:min-h-[520px]
                 bg-[#e6f7ec]/90 backdrop-blur-2xl border border-[#bce8d0]"
    >
      {/* إضاءات وحواف متحركة */}
      <motion.div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.03]" style={{ background: backgroundSpotlight }} />
      <motion.div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: borderSpotlight, maskImage: "linear-gradient(white, white)", maskComposite: "exclude", WebkitMaskComposite: "xor", padding: "1px" }} />
      <div className="pointer-events-none absolute inset-[1px] rounded-[1.5rem] md:rounded-[2rem] bg-[#e6f7ec]/80 backdrop-blur-3xl z-0" />

      {/* علامة اقتباس كبيرة في الخلفية لملء المساحة */}
      <svg className="absolute top-4 left-4 w-24 h-24 md:w-32 md:h-32 text-[var(--color-primary)] opacity-[0.04] z-0 pointer-events-none -scale-x-100" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
      </svg>

      <FallingShapes />

      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        
        {/* الترويسة: الشعار والإحصائيات */}
        <div className="mb-6 flex items-start justify-between">
          <div className={`h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${item.logoColor} p-0.5 shadow-lg shrink-0`}>
            <div className="flex h-full w-full items-center justify-center rounded-[10px] md:rounded-[14px] bg-white">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-[var(--color-primary)] opacity-80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
              </svg>
            </div>
          </div>
          <div className="flex gap-1.5 md:gap-2">
            {item.metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col items-end justify-center rounded-lg md:rounded-xl bg-white/70 px-2 py-1.5 md:px-3 md:py-2 border border-[#bce8d0]">
                <span className="text-sm md:text-base font-bold text-[var(--color-secondary-dark)]">{metric.value}</span>
                <span className="text-[10px] md:text-[11px] text-[var(--color-text-muted)] font-medium uppercase tracking-wider">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* النجوم وعلامة التوثيق */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-4 h-4 md:w-5 md:h-5 text-amber-400 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="flex items-center gap-1 text-[10px] md:text-xs font-semibold text-[var(--color-primary)] bg-white/60 px-2 py-0.5 rounded-full border border-[var(--color-primary)]/20">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            تقييم موثق
          </span>
        </div>

        {/* النص */}
        <p className="mb-8 text-[15px] sm:text-base md:text-lg lg:text-xl font-medium leading-[1.8] md:leading-[1.9] text-[var(--color-text-main)]">
          "{item.quote}"
        </p>

        {/* ذيل الكرت */}
        <div className="mt-auto flex items-center gap-3 md:gap-4 pt-4 md:pt-6 border-t border-[#bce8d0]">
          <img src={item.avatar} alt={item.author} className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border-2 border-white shadow-md pointer-events-auto shrink-0" />
          <div className="overflow-hidden flex-1">
            <h4 className="font-display text-base md:text-lg font-bold text-[var(--color-text-main)] truncate">{item.author}</h4>
            <p className="text-xs md:text-sm font-medium text-[var(--color-secondary-dark)] truncate">{item.role}</p>
            <p className="text-[10px] md:text-xs text-[var(--color-text-muted)] truncate">{item.hospital}</p>
          </div>
          <span className="text-[10px] md:text-xs font-medium text-gray-400 shrink-0">{item.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// 🚀 المكون الرئيسي
// ==========================================
export default function InteractiveTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    if (!carouselRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const viewportWidth = document.documentElement.clientWidth;
        const range = entry.target.scrollWidth - viewportWidth;
        setScrollRange(range > 0 ? range : 0);
      }
    });

    resizeObserver.observe(carouselRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 150, damping: 25, mass: 0.1 });
  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  
  // 🔥 الميزة الجديدة: الشفافية تتغير للصفر عندما يصل التمرير بين 90% و 98%
  const indicatorOpacity = useTransform(scrollYProgress, [0.9, 0.98], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-transparent" id="testimonials">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* العنوان */}
        <div className="absolute top-10 sm:top-16 md:top-24 left-0 w-full z-10" dir="rtl">
          <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-display text-3xl md:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-text-main)] max-w-2xl"
            >
              نظام يثق به <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] leading-tight">
                روّاد الرعاية الصحية.
              </span>
            </motion.h2>
          </div>
        </div>

        {/* الكروت */}
        <motion.div className="w-full mt-10 md:mt-16">
          <motion.div 
            ref={carouselRef}
            style={{ x }} 
            className="flex w-max items-center pb-6 md:pb-10"
            dir="ltr" 
          >
            {testimonialsData.map((item, index) => (
              <motion.div
                key={item.id}
                className={`${index === 0 ? "ml-[5vw] md:ml-[10vw] lg:ml-[15vw]" : "ml-4 md:ml-10"}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TestimonialCard item={item} />
              </motion.div>
            ))}
            
            <div className="w-[100vw] md:w-[40vw] lg:w-[50vw] shrink-0" />
            
          </motion.div>
        </motion.div>

        {/* 
          🔥 مؤشر التمرير السفلي: 
          استخدمنا motion.div وقمنا بربط style.opacity مع indicatorOpacity 
          وأضافنا pointer-events-none لكي لا يتداخل مع أي تفاعل للمستخدم أثناء اختفائه.
        */}
        <motion.div 
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 md:gap-2 z-50 w-[80%] max-w-[250px] md:max-w-[300px] pointer-events-none"
        >
          <div className="w-full h-1 md:h-1.5 bg-gray-200/50 backdrop-blur-sm rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full" style={{ width: progressWidth }} />
          </div>
          <span className="text-[10px] lg:text-xs font-bold text-[var(--color-text-muted)] tracking-widest uppercase opacity-60">
            مرر لأسفل للتصفح
          </span>
        </motion.div>

      </div>
    </section>
  );
}