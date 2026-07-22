"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

// =========================================================================
// 🛸 مكون المجسمات ثلاثية الأبعاد (يعمل فقط على الديسكتوب للحفاظ على نظافة الموبايل)
// =========================================================================
const Falling3DShapes = () => {
  const Sphere = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="url(#sphereGrad)" />
      <defs>
        <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
          <stop stopColor="var(--color-primary)" stopOpacity="0.5" />
          <stop offset="1" stopColor="var(--color-primary-dark)" stopOpacity="0.1" />
        </radialGradient>
      </defs>
    </svg>
  );

  const Cube = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L3.5 7.5L12 12L20.5 7.5L12 3Z" fill="var(--color-secondary)" fillOpacity="0.5" />
      <path d="M3.5 7.5V16.5L12 21V12L3.5 7.5Z" fill="var(--color-secondary-dark)" fillOpacity="0.7" />
      <path d="M20.5 7.5V16.5L12 21V12L20.5 7.5Z" fill="var(--color-secondary)" fillOpacity="0.2" />
    </svg>
  );

  const Pyramid = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 16H21L12 2Z" fill="var(--color-primary)" fillOpacity="0.15" />
      <path d="M12 2L3 16L12 21V2Z" fill="var(--color-primary-dark)" fillOpacity="0.4" />
      <path d="M12 2L21 16L12 21V2Z" fill="var(--color-primary)" fillOpacity="0.3" />
    </svg>
  );

  const shapesData = [
    { id: 1, Component: Cube, size: "w-8 h-8", left: "10%", delay: 0, duration: 15, xMove: 20 },
    { id: 2, Component: Sphere, size: "w-10 h-10", left: "35%", delay: 4, duration: 22, xMove: -30 },
    { id: 3, Component: Pyramid, size: "w-7 h-7", left: "60%", delay: 2, duration: 18, xMove: 15 },
    { id: 4, Component: Cube, size: "w-9 h-9", left: "85%", delay: 8, duration: 25, xMove: -20 },
    { id: 5, Component: Sphere, size: "w-6 h-6", left: "50%", delay: 12, duration: 20, xMove: 25 },
  ];

  return (
    <div className="absolute inset-0 z-[-1] rounded-[inherit] overflow-hidden pointer-events-none hidden lg:block">
      {shapesData.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute top-[-60px] ${shape.size}`}
          style={{ left: shape.left }}
          animate={{ y: [-60, 1000], rotate: [0, 180, 360], x: [0, shape.xMove, 0] }}
          transition={{ duration: shape.duration, repeat: Infinity, ease: "linear", delay: shape.delay }}
        >
          <shape.Component />
        </motion.div>
      ))}
    </div>
  );
};

// =========================================================================
// بيانات أقسام الموقع
// =========================================================================
const NAV_ITEMS = [
  { id: "features", name: "Features", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> },
  { id: "modules", name: "Modules", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /> },
  { id: "process", name: "Process", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /> },
  { id: "statistics", name: "Statistics", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> },
  { id: "partners", name: "Partners", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> },
  { id: "testimonials", name: "Reviews", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /> },
  { id: "faq", name: "FAQ", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
];

export default function Header() {
  const { scrollY } = useScroll();
  const pathname = usePathname(); 
  const router = useRouter();     

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navState, setNavState] = useState<"horizontal" | "ball" | "vertical">("horizontal");
  const [activeSection, setActiveSection] = useState("home");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // اكتشاف الموبايل
  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) setIsMenuOpen(false);
  }, [isMobile]);

  // دالة النقر والتمرير
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false); 

    if (pathname !== "/") {
      router.push(`/#${targetId}`);
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(targetId);
    } else if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("home");
    }
  };

  // تغيير حالة الـ Header مع السكرول
  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrollingDown = latest > 150;
    
    // إغلاق القائمة المنسدلة عند عمل سكرول للحفاظ على سلاسة التجربة
    if (isMenuOpen) setIsMenuOpen(false);

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

  // تتبع القسم النشط
  useEffect(() => {
    if (pathname !== "/") return;
    const handleScroll = () => {
      let current = "home";
      const sections = ["home", ...NAV_ITEMS.map(item => item.id), "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= 100) {
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
  }, [pathname]);

  const navVariants = {
    horizontal: {
      top: isMobile ? 16 : 24, 
      left: "50%", x: "-50%", y: 0,
      width: "95%", maxWidth: 1200, 
      height: isMobile ? 64 : 72,
      borderRadius: 9999,
      transition: { type: "spring", stiffness: 220, damping: 28 }
    },
    ball: {
      top: isMobile ? "auto" : "50%", bottom: isMobile ? 24 : "auto",
      left: isMobile ? "auto" : 24, right: isMobile ? 24 : "auto",
      x: 0, y: isMobile ? 0 : "-50%",
      width: 64, height: 64,
      borderRadius: 9999,
      transition: { type: "spring", stiffness: 200, damping: 25 }
    },
    vertical: {
      top: isMobile ? "auto" : "50%", bottom: isMobile ? 24 : "auto",
      left: isMobile ? "auto" : 24, right: isMobile ? 24 : "auto",
      x: 0, y: isMobile ? 0 : "-50%",
      width: isMobile ? 64 : 72, height: isMobile ? 64 : 600,
      borderRadius: isMobile ? 9999 : 36,
      transition: { type: "spring", stiffness: 250, damping: 25 }
    }
  };

  if (!mounted) return <div className="fixed inset-0 z-[100] pointer-events-none" />;

  const isVertical = navState === "vertical";
  const isBall = navState === "ball";
  const isTopPosition = navState === "horizontal"; // لمعرفة موقع الموبايل (فوق أو زر عائم تحت)

  return (
    <>
      {/* 🌟 1. طبقة التعتيم الخلفية (Backdrop) عند فتح القائمة */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMenuOpen(false)}
            // تعتيم خفيف وأنيق لتبقى الشاشة الأصلية مرئية بوضوح
            className="fixed inset-0 z-[90] bg-slate-900/10 backdrop-blur-[4px] pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* 🌟 2. الحاوية الرئيسية للـ Header والقائمة المنسدلة */}
      <div className="fixed inset-0 z-[100] pointer-events-none">
        
        {/* ============================================== */}
        {/* الـ Header الرئيسي (شريط أو زر عائم) */}
        {/* ============================================== */}
        <motion.nav
          variants={navVariants}
          initial="horizontal"
          animate={navState}
          className="absolute pointer-events-auto flex items-center justify-between bg-[#cbf0df]/85 backdrop-blur-2xl ring-1 ring-[#0d9468]/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_12px_40px_rgba(13,148,104,0.15)] overflow-visible"
          style={{ 
            flexDirection: !isMobile && isVertical ? "column" : "row", 
            padding: isMobile ? (navState === "horizontal" ? "0 16px" : "0") : (isVertical ? "28px 0" : "0 24px"),
            justifyContent: isMobile && navState !== "horizontal" ? "center" : "space-between"
          }}
        >
          <Falling3DShapes />

          {/* 📱 محتوى الموبايل */}
          {isMobile && (
            <>
              {isTopPosition && (
                <a href="/#home" onClick={(e) => scrollToSection(e, "home")} className="flex items-center z-20">
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <img src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75" alt="Health Hub" className="w-full h-full object-contain" />
                  </div>
                  <h1 className="ml-2 text-[18px] font-display font-extrabold tracking-tight text-[var(--color-text-main)]">
                    Health<span className="text-[var(--color-primary)]">-Hub</span>
                  </h1>
                </a>
              )}
              
              {/* زر الهمبرغر (يتحول إلى X عند الفتح) */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className={`relative z-20 flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${isMenuOpen ? "bg-white/80 text-[var(--color-primary)] shadow-sm" : "bg-white/40 text-[var(--color-text-main)]"} hover:bg-white/90 ${!isTopPosition ? "w-14 h-14 bg-transparent hover:bg-white/20" : ""}`}
              >
                <motion.div animate={{ rotate: isMenuOpen ? 90 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                  {isMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </motion.div>
              </button>
            </>
          )}

          {/* 💻 محتوى الديسكتوب (لم يتغير، احترافي كما كان) */}
          {!isMobile && (
            <>
              {/* اللوغو */}
              <a href="/#home" onClick={(e) => scrollToSection(e, "home")} className="flex items-center gap-3 group relative shrink-0 z-20 cursor-pointer">
                <div className={`relative flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${isVertical || isBall ? "w-12 h-12" : "w-10 h-10"}`}>
                  <img src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75" alt="Health Hub" className="w-full h-full object-contain drop-shadow-md" />
                </div>
                <AnimatePresence>
                  {navState === "horizontal" && (
                    <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="flex flex-col justify-center whitespace-nowrap overflow-hidden">
                      <h1 className="text-[20px] font-display font-extrabold tracking-tight text-[var(--color-text-main)] leading-none transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                        Health<span className="text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors duration-300">-Hub</span>
                      </h1>
                    </motion.div>
                  )}
                </AnimatePresence>
              </a>

              {/* روابط الديسكتوب */}
              <AnimatePresence>
                {!isBall && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className={`flex items-center relative z-10 ${isVertical ? "flex-col gap-2 mt-4 mb-4 w-full px-3" : "flex-row gap-1 lg:gap-1.5"}`}>
                    {NAV_ITEMS.map((item) => {
                      const isActive = activeSection === item.id && pathname === "/";
                      return (
                        <a key={item.id} href={`/#${item.id}`} onClick={(e) => scrollToSection(e, item.id)} className={`relative flex items-center justify-center group transition-all duration-300 z-20 cursor-pointer ${isVertical ? "w-full h-12 rounded-xl" : "px-3 lg:px-4 py-2.5 rounded-full"} ${isActive ? "text-[var(--color-primary)] font-bold shadow-sm" : "text-[var(--color-text-muted)] font-medium hover:text-[var(--color-primary)]"}`}>
                          {isActive ? (
                            <motion.div layoutId="activeNavBackground" className="absolute inset-0 bg-white/70 border border-white/90 z-[-1]" style={{ borderRadius: isVertical ? "12px" : "9999px" }} initial={false} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                          ) : (
                            <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[-1]" style={{ borderRadius: isVertical ? "12px" : "9999px" }} />
                          )}
                          <div className={`relative flex items-center justify-center transition-all duration-300 ${isActive ? "scale-100 text-[var(--color-primary)]" : "scale-95 opacity-70 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-0.5"}`}>
                            <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">{item.icon}</svg>
                          </div>
                          {!isVertical && <span className="whitespace-nowrap text-[13px] lg:text-[14px] ml-1.5 transition-all duration-300 group-hover:translate-x-0.5">{item.name}</span>}
                        </a>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* زر Contact Desktop */}
              <AnimatePresence>
                {!isBall && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className={`flex items-center shrink-0 z-20 ${isVertical ? "w-full px-3 mt-auto" : "pl-2"}`}>
                    <a href="/#contact" onClick={(e) => scrollToSection(e, "contact")} className={`relative group overflow-hidden flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-[0_4px_12px_rgba(17,79,209,0.3)] transition-all duration-500 hover:shadow-[0_8px_25px_rgba(13,148,104,0.4)] hover:-translate-y-1 cursor-pointer ${isVertical ? "w-full h-12" : "px-5 lg:px-7 py-2.5"}`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:animate-shine">
                        <div className="relative h-full w-8 bg-white/20" />
                      </div>
                      <div className="relative z-10 flex items-center gap-2">
                        <span className={`whitespace-nowrap text-[13px] lg:text-[14px] font-bold tracking-wide ${isVertical ? "hidden" : "block"}`}>Contact Us</span>
                        <svg className="w-[18px] h-[18px] shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.nav>

        {/* =========================================================================
            🌟 القائمة المنسدلة الذكية للموبايل (Smart Floating Dropdown)
            ========================================================================= */}
        <AnimatePresence>
          {isMenuOpen && isMobile && (
            <motion.div
              // 💡 ذكاء الأنميشن: تنزل من فوق إذا كان الهيدر شريط، وتطلع من تحت إذا كان زر عائم!
              initial={isTopPosition ? { opacity: 0, y: -20, scale: 0.98 } : { opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={isTopPosition ? { opacity: 0, y: -20, scale: 0.98 } : { opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`absolute pointer-events-auto left-4 right-4 bg-white/95 backdrop-blur-3xl rounded-3xl p-3 shadow-[0_20px_50px_-12px_rgba(17,79,209,0.25)] border border-white/60 flex flex-col gap-1 z-[110] overflow-hidden ${
                isTopPosition ? "top-[90px] origin-top" : "bottom-[100px] origin-bottom-right lg:origin-bottom-left"
              }`}
            >
              {/* قائمة الروابط بتصميم بطاقات صغيرة فخمة */}
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeSection === item.id && pathname === "/";
                return (
                  <a
                    key={item.id}
                    href={`/#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-200 active:scale-95 ${
                      isActive ? "bg-[var(--color-primary)]/5 text-[var(--color-primary)]" : "text-[var(--color-text-muted)] hover:bg-slate-50"
                    }`}
                  >
                    <div className={`w-9 h-9 flex items-center justify-center rounded-full shadow-sm ${isActive ? "bg-white text-[var(--color-primary)]" : "bg-slate-100 text-slate-500"}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">{item.icon}</svg>
                    </div>
                    <span className={`text-[15px] ${isActive ? "font-bold" : "font-semibold"}`}>{item.name}</span>
                  </a>
                );
              })}

              {/* خط فاصل أنيق */}
              <div className="h-[1px] bg-slate-200/60 my-1 mx-2 rounded-full" />

              {/* زر Contact Us الأساسي داخل القائمة */}
              <a
                href="/#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="mt-1 relative overflow-hidden w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-[15px] font-bold shadow-[0_8px_20px_rgba(13,148,104,0.35)] active:scale-95 transition-transform"
              >
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] animate-shine">
                  <div className="relative h-full w-8 bg-white/20" />
                </div>
                Contact Us
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}