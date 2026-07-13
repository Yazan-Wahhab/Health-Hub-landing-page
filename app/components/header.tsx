"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

// =========================================================================
// بيانات أقسام الموقع والأيقونات الطبية الاحترافية
// =========================================================================
const NAV_ITEMS = [
  { 
    id: "features", 
    name: "Features", 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> 
  },
  { 
    id: "modules", 
    name: "Modules", 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /> 
  },
  { 
    id: "integration", 
    name: "Integration", 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /> 
  },
];

export default function Header() {
  const { scrollY } = useScroll();
  
  // 3 حالات للهيدر: أفقي -> كرة منكمشة -> عمودي
  const [navState, setNavState] = useState<"horizontal" | "ball" | "vertical">("horizontal");
  const [activeSection, setActiveSection] = useState("home");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // =========================================================================
  // 1. منطق التحول السحري (Morphing Logic)
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
  // 2. التتبع الدقيق للقسم الحالي (Precision Scroll Spy)
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
  // 3. إعدادات الحركة (Framer Motion Variants)
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
        // التعديل هنا: خلفية زجاجية بيضاء مع إطار سماوي ناعم وظل أزرق احترافي
        className="absolute pointer-events-auto flex items-center justify-between bg-white/80 backdrop-blur-2xl border border-[var(--color-primary)]/10 shadow-[0_20px_50px_rgba(17,79,209,0.08)] overflow-hidden"
        style={{ flexDirection: isVertical ? "column" : "row", padding: isVertical ? "28px 0" : "0 24px" }}
      >
        
        {/* =========================================================================
            القسم الأول: اللوغو 
            ========================================================================= */}
        <Link href="/" className="flex items-center gap-3 group relative shrink-0 z-20">
          <div className={`relative flex items-center justify-center rounded-full bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/15 shadow-[inset_0_0_15px_rgba(17,79,209,0.05)] transition-transform duration-300 group-hover:scale-110 ${isVertical || isBall ? "w-12 h-12" : "w-11 h-11"}`}>
            <img 
              src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75" 
              alt="Smart Care" 
              className="h-6 w-6 object-contain drop-shadow-[0_2px_4px_rgba(17,79,209,0.2)]"
            />
          </div>

          <AnimatePresence>
            {navState === "horizontal" && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }}
                className="flex flex-col justify-center whitespace-nowrap overflow-hidden"
              >
                <h1 className="text-xl font-display font-extrabold tracking-tight text-[var(--color-text-main)] leading-none">
                  Health<span className="text-[var(--color-primary)]">-Hub</span>
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          {isVertical && (
            <div className="absolute left-[140%] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-[var(--color-primary-dark)] text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-[var(--color-primary)]/10 shadow-[0_10px_20px_rgba(17,79,209,0.1)]">
              Smart Care Home
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
              className={`flex items-center relative z-10 ${isVertical ? "flex-col gap-4 mt-6 mb-6 w-full px-2" : "flex-row gap-2"}`}
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                
                return (
                  <Link 
                    key={item.id} 
                    href={`#${item.id}`} 
                    className={`relative flex items-center justify-center group transition-colors duration-300 z-20 ${isVertical ? "w-full h-14 rounded-2xl" : "px-5 py-2.5 rounded-full"} ${isActive ? "text-[var(--color-primary-dark)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"}`}
                  >
                    
                    {/* الكبسولة الزجاجية المنزلقة */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavBackground" 
                        className="absolute inset-0 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 shadow-[inset_0_0_15px_rgba(17,79,209,0.05)] z-[-1]"
                        style={{ borderRadius: isVertical ? "16px" : "9999px" }}
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* خط الإضاءة المنزلق */}
                    {isActive && isVertical && (
                      <motion.div 
                        layoutId="activeNavHighlightVertical" 
                        className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-[var(--color-primary)] rounded-r-full shadow-[0_0_10px_var(--color-primary)]"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {isActive && !isVertical && (
                      <motion.div 
                        layoutId="activeNavHighlightHorizontal" 
                        className="absolute -bottom-[1px] left-1/4 right-1/4 h-[2px] bg-[var(--color-primary)] rounded-t-full shadow-[0_-2px_10px_rgba(17,79,209,0.5)]"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* الأيقونة */}
                    <div className={`relative flex items-center justify-center transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                      <svg className="w-[22px] h-[22px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {item.icon}
                      </svg>
                    </div>
                    
                    {/* النص */}
                    {!isVertical && (
                      <span className="whitespace-nowrap text-sm font-bold ml-2">
                        {item.name}
                      </span>
                    )}

                    {/* التلميح الذكي في الوضع العمودي */}
                    {isVertical && (
                      <div className="absolute left-[130%] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-[var(--color-primary-dark)] text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-[var(--color-primary)]/10 shadow-[0_10px_20px_rgba(17,79,209,0.1)]">
                        {item.name}
                      </div>
                    )}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            القسم الثالث: الأزرار (Login & Demo)
            ========================================================================= */}
        <AnimatePresence>
          {!isBall && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className={`flex items-center shrink-0 z-20 ${isVertical ? "flex-col gap-5" : "flex-row gap-5"}`}
            >
              {/* زر الدخول */}
              <Link 
                href="#login"
                className={`relative group flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors rounded-full hover:bg-[var(--color-primary)]/5 border border-transparent hover:border-[var(--color-primary)]/20 ${isVertical ? "w-12 h-12" : "gap-2 px-4 py-2.5"}`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                
                {!isVertical && <span className="whitespace-nowrap text-xs font-bold">System Login</span>}

                {isVertical && (
                  <div className="absolute left-[140%] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-[var(--color-secondary)] text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-[var(--color-primary)]/10 shadow-[0_10px_20px_rgba(17,79,209,0.1)]">
                    System Login
                  </div>
                )}
              </Link>

              {/* زر طلب الديمو (CTA) */}
              <a
                href="#demo"
                className={`relative group flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-[0_4px_15px_rgba(17,79,209,0.3)] transition-all duration-300 hover:shadow-[0_8px_25px_rgba(17,79,209,0.4)] hover:scale-105 ${isVertical ? "w-12 h-12" : "px-7 py-3"}`}
              >
                <svg className={`${isVertical ? "w-5 h-5" : "hidden sm:block w-4 h-4 mr-2"} shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>

                {!isVertical && <span className="whitespace-nowrap text-xs font-bold">Request Demo</span>}

                {isVertical && (
                  <div className="absolute left-[140%] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-[var(--color-secondary)] text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-[var(--color-primary)]/10 shadow-[0_10px_20px_rgba(17,79,209,0.1)]">
                    Request Demo
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