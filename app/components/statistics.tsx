"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

// ==========================================
// 📊 بيانات منصة Smart Care
// ==========================================
const statsData = [
  {
    id: 1,
    title: "منشأة طبية",
    value: 120,
    suffix: "+",
    description: "تعتمد على نظامنا لإدارة عملياتها اليومية",
    icon: (
      // تم تصغير الأيقونة للموبايل (w-5 h-5) لتناسب الكروت المتجاورة
      <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    id: 2,
    title: "سجل طبي رقمي",
    value: 2.5,
    suffix: "M+",
    isDecimal: true,
    description: "مؤرشف ومحمي بأعلى معايير التشفير",
    icon: (
      <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "استقرار النظام",
    value: 99.9,
    suffix: "%",
    isDecimal: true,
    description: "بدون أي توقف (Zero Downtime) للبيئات الحرجة",
    icon: (
      <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    )
  },
  {
    id: 4,
    title: "مستخدم نشط",
    value: 15,
    suffix: "K+",
    description: "طبيب وممرض وإداري عبر المنصة",
    icon: (
      <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  }
];

// ==========================================
// ✨ مكون العداد الذكي
// ==========================================
function AnimatedNumber({ value, suffix, isDecimal = false }: { value: number, suffix: string, isDecimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      animate(0, value, {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
          if (ref.current) {
            const formatted = isDecimal ? latest.toFixed(1) : Math.round(latest);
            ref.current.textContent = `${formatted}${suffix}`;
          }
        }
      });
    }
  }, [isInView, value, suffix, isDecimal]);

  return <span ref={ref} className="tabular-nums font-black text-[var(--color-primary)]">0{suffix}</span>;
}

// ==========================================
// 🎨 مجسمات متحركة بخلفية الكرت 
// ==========================================
function CardBackgroundShapes() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.12]">
      {/* تصغير المجسمات بشكل كبير للموبايل لكي لا تشوه المنظر في الكروت الصغيرة */}
      <motion.svg 
        animate={{ rotate: 360 }} 
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -top-4 -right-4 w-20 h-20 md:-top-10 md:-right-10 md:w-40 md:h-40 text-[var(--color-secondary-dark)]" 
        viewBox="0 0 100 100" fill="none"
      >
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" />
      </motion.svg>
      
      <motion.svg 
        animate={{ y: [0, 15, 0], rotate: [0, -20, 0] }} 
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-3 -left-3 w-16 h-16 md:-bottom-6 md:-left-6 md:w-32 md:h-32 text-[var(--color-primary)]" 
        viewBox="0 0 100 100" fill="none"
      >
        <polygon points="50,5 90,27 90,72 50,95 10,72 10,27" stroke="currentColor" strokeWidth="1" />
      </motion.svg>
    </div>
  );
}

// ==========================================
// ✨ مكون بطاقة الإحصائية النظيفة
// ==========================================
function StatCard({ stat, index }: { stat: typeof statsData[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      // تم تصغير الـ Padding (p-4) للموبايل ليستوعب كرتين متجاورين بأناقة
      className="group relative flex flex-col items-start rounded-2xl md:rounded-[1.5rem] p-4 md:p-10 bg-[#e0f5eb]/95 backdrop-blur-xl border border-[#bce8d4] hover:border-[var(--color-secondary)]/40 shadow-sm hover:shadow-[0_15px_40px_rgba(13,148,104,0.08)] transition-all duration-500 overflow-hidden h-full"
    >
      <CardBackgroundShapes />

      {/* تصغير الأيقونة ومسافتها السفلية في الموبايل */}
      <div className="relative z-10 mb-3 md:mb-8 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white border border-[#bce8d4] text-[var(--color-secondary)] shadow-sm group-hover:scale-110 transition-transform duration-500 ease-out">
        {stat.icon}
      </div>
      
      <div className="relative z-10 w-full text-right mt-auto">
        {/* تقليل حجم الأرقام في الموبايل لتناسب العرض الجديد (text-2xl) */}
        <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-1 md:mb-3 font-display tracking-tight">
          <AnimatedNumber value={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} />
        </h3>
        
        {/* تقليل حجم العنوان (text-[13px]) ليناسب الكروت المتجاورة */}
        <p className="text-[13px] md:text-xl font-bold text-[var(--color-text-main)] mb-1 md:mb-3">
          {stat.title}
        </p>
        
        <div className="w-6 md:w-8 h-[2px] bg-[var(--color-secondary)]/40 rounded-full mb-2 md:mb-4 group-hover:w-12 md:group-hover:w-16 transition-all duration-500" />
        
        {/* تصغير حجم خط الشرح وإضافة line-clamp-2 للموبايل لمنع الكروت من التمدد بشكل غير متناسق */}
        <p className="text-[10px] md:text-base font-medium text-[var(--color-text-muted)] leading-relaxed md:leading-relaxed line-clamp-2 md:line-clamp-none">
          {stat.description}
        </p>
      </div>
    </motion.div>
  );
}

// ==========================================
// 🚀 المكون الرئيسي للإحصائيات
// ==========================================
export default function StatisticsSection() {
  return (
    <section className="relative py-16 md:py-24 bg-transparent overflow-hidden" id="statistics">
      
      <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-12 relative z-10" dir="rtl">
        
        {/* الترويسة النظيفة */}
        <div className="mb-10 md:mb-20 text-center max-w-3xl mx-auto flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[26px] md:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-text-main)] leading-tight"
          >
            نظام متكامل، <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
              أرقام تتحدث عن نفسها.
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 md:mt-6 text-[14px] md:text-lg text-[var(--color-text-muted)] font-medium max-w-2xl leading-relaxed mx-auto"
          >
            بنية تحتية صلبة صُممت لتتحمل ضغط المستشفيات الكبرى، وتعالج ملايين السجلات الطبية بلحظات، وتضمن استمرارية الرعاية الطبية بلا انقطاع.
          </motion.p>
        </div>

        {/* 
          🔥 التعديل السحري هنا: 
          استخدام grid-cols-2 في الموبايل لإنشاء شبكة 2x2 رائعة (Bento) بدلاً من رصها فوق بعضها، 
          بينما الشاشات الكبيرة تبقى على حالها md:grid-cols-2 lg:grid-cols-4 
        */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
          {statsData.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}