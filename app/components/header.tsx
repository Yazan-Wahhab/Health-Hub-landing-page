"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

// =========================================================================
// بيانات أقسام الموقع والأيقونات
// =========================================================================
const NAV_ITEMS = [
  { 
    id: "features", 
    name: "Features", 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> 
  },
  { 
    id: "modules", 
    name: "Modules", 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /> 
  },
  { 
    id: "integration", 
    name: "Integration", 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /> 
  },
];

export default function Header() {
  const { scrollY } = useScroll();
  
  // نفس ديناميكية الحركة القديمة تماماً
  const [navState, setNavState] = useState<"horizontal" | "ball" | "vertical">("horizontal");
  const [activeSection, setActiveSection] = useState("home");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // =========================================================================
  // 1. منطق التحول السحري (Morphing Logic) - بدون أي تعديل
  // =========================================================================
  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrollingDown = latest > 150;

    if (isScrollingDown && navState === "horizontal") {
      setNavState("ball");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setNavState("vertical"), 400);
    } 
    else if (!isScrollingDown && (navState === "vertical" || navState === "ball")) {
      setNavState("ball");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setNavState("horizontal"), 400);
    }
  });

  // =========================================================================
  // 2. التتبع الدقيق للقسم الحالي - بدون أي تعديل
  // =========================================================================
  useEffect(() => {
    const handleScroll = () => {
      let current = "home";
      const sections = ["home", ...NAV_ITEMS.map(item => item.id)];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      
      if (window.scrollY < 200) current = "home";
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // =========================================================================
  // 3. إعدادات الحركة (Framer Motion Variants) - تم ضبط الأبعاد قليلاً للأناقة
  // =========================================================================
  const navVariants = {
    horizontal: {
      top: 24, left: "50%", x: "-50%", y: 0,
      width: "90%", maxWidth: 1000, height: 72,
      borderRadius: 9999,
      transition: { type: "spring", stiffness: 220, damping: 28 }
    },
    ball: {
      top: "50%", left: 24, x: 0, y: "-50%",
      width: 64, height: 64,
      borderRadius: 9999,
      transition: { type: "spring", stiffness: 200, damping: 25 }
    },
    vertical: {
      top: "50%", left: 24, x: 0, y: "-50%",
      width: 72, height: 480,
      borderRadius: 36,
      transition: { type: "spring", stiffness: 250, damping: 25 }
    }
  };

  const isVertical = navState === "vertical";
  const isBall = navState === "ball";

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      
      <motion.nav
        variants={navVariants}
        initial="horizontal"
        animate={navState}
        // UI/UX التعديل الجذري هنا: زجاج فاخر، حدود بيضاء خفيفة، ظلال دقيقة
        className="absolute pointer-events-auto flex items-center justify-between bg-white/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(17,79,209,0.06)] ring-1 ring-black/5 overflow-visible"
        style={{ flexDirection: isVertical ? "column" : "row", padding: isVertical ? "28px 0" : "0 24px" }}
      >
        
        {/* =========================================================================
            القسم الأول: اللوغو 
            ========================================================================= */}
        <Link href="/" className="flex items-center gap-3 group relative shrink-0 z-20">
          {/* تم إزالة الخلفية المزعجة للوغو وجعله أنظف */}
          <div className={`relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${isVertical || isBall ? "w-12 h-12" : "w-10 h-10"}`}>
            <img 
              src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75" 
              alt="Health Hub" 
              className="w-full h-full object-contain"
            />
          </div>

          <AnimatePresence>
            {navState === "horizontal" && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }}
                className="flex flex-col justify-center whitespace-nowrap overflow-hidden"
              >
                <h1 className="text-[20px] font-display font-extrabold tracking-tight text-[var(--color-text-main)] leading-none">
                  Health<span className="text-[var(--color-primary)]">-Hub</span>
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tooltip احترافي للديسكتوب في الوضع العمودي */}
          {isVertical && (
            <div className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 px-3 py-2 bg-[var(--color-text-main)] text-white text-[13px] font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
              Smart Care Home
              {/* السهم الصغير للتلميح */}
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[var(--color-text-main)] rotate-45"></div>
            </div>
          )}
        </Link>

        {/* =========================================================================
            القسم الثاني: الروابط الأساسية والمؤشر الانزلاقي الفاخر
            ========================================================================= */}
        <AnimatePresence>
          {!isBall && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className={`flex items-center relative z-10 ${isVertical ? "flex-col gap-3 mt-6 mb-6 w-full px-3" : "flex-row gap-1"}`}
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                
                return (
                  <Link 
                    key={item.id} 
                    href={`#${item.id}`} 
                    className={`relative flex items-center justify-center group transition-all duration-300 z-20 ${isVertical ? "w-full h-12 rounded-xl" : "px-4 py-2.5 rounded-full"} ${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"}`}
                  >
                    
                    {/* الكبسولة الزجاجية المنزلقة (ناعمة جداً) */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavBackground" 
                        className="absolute inset-0 bg-[var(--color-primary)]/5 rounded-full z-[-1]"
                        style={{ borderRadius: isVertical ? "12px" : "9999px" }}
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* الأيقونة */}
                    <div className={`relative flex items-center justify-center transition-transform duration-300 ${isActive ? "scale-100" : "scale-95 opacity-80 group-hover:opacity-100 group-hover:scale-100"}`}>
                      <svg className="w-[20px] h-[20px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {item.icon}
                      </svg>
                    </div>
                    
                    {/* النص */}
                    {!isVertical && (
                      <span className="whitespace-nowrap text-[14px] font-semibold ml-2">
                        {item.name}
                      </span>
                    )}

                    {/* Tooltip احترافي في الوضع العمودي */}
                    {isVertical && (
                      <div className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 px-3 py-2 bg-[var(--color-text-main)] text-white text-[13px] font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
                        {item.name}
                        {/* السهم الصغير */}
                        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[var(--color-text-main)] rotate-45"></div>
                      </div>
                    )}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            القسم الثالث: الأزرار (Login & Demo) بتصميم Corporate
            ========================================================================= */}
        <AnimatePresence>
          {!isBall && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className={`flex items-center shrink-0 z-20 ${isVertical ? "flex-col gap-4" : "flex-row gap-3"}`}
            >
              {/* زر الدخول (Ghost Button أنيق) */}
              <Link 
                href="#login"
                className={`relative group flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-all duration-300 rounded-full hover:bg-[var(--color-primary)]/5 ${isVertical ? "w-12 h-12" : "gap-2 px-4 py-2"}`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                
                {!isVertical && <span className="whitespace-nowrap text-[14px] font-semibold">Login</span>}

                {isVertical && (
                  <div className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 px-3 py-2 bg-[var(--color-text-main)] text-white text-[13px] font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
                    System Login
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[var(--color-text-main)] rotate-45"></div>
                  </div>
                )}
              </Link>

              {/* زر طلب الديمو (CTA رئيسي مع تأثير animate-shine الخاص بك) */}
              <a
                href="#demo"
                className={`relative group overflow-hidden flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-[0_4px_12px_rgba(17,79,209,0.25)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(17,79,209,0.35)] hover:-translate-y-0.5 ${isVertical ? "w-12 h-12" : "px-6 py-2.5"}`}
              >
                {/* تأثير اللمعة من الـ CSS تبعك */}
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:animate-shine">
                  <div className="relative h-full w-8 bg-white/20" />
                </div>

                <svg className={`${isVertical ? "w-5 h-5" : "hidden"} shrink-0 relative z-10`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>

                {!isVertical && <span className="whitespace-nowrap text-[14px] font-semibold relative z-10">Request Demo</span>}

                {isVertical && (
                  <div className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 px-3 py-2 bg-[var(--color-text-main)] text-white text-[13px] font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
                    Request Demo
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[var(--color-text-main)] rotate-45"></div>
                  </div>
                )}
              </a>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.nav>
    </div>
  );
}