"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo3D from "./logo"; // تأكد من مطابقة مسار الاستيراد

type IntroProps = {
  onComplete?: () => void;
};

export default function Intro({ onComplete }: IntroProps) {
  const [phase, setPhase] = useState<"intro" | "exit" | "done">("intro");
  
  const [textVisible, setTextVisible] = useState(false);
  const [isDarkening, setIsDarkening] = useState(false);

  useEffect(() => {
    // 1. ظهور النص مع الانقسام الأول
    const textShowTimer = window.setTimeout(() => setTextVisible(true), 2900);
    
    // 2. اختفاء النص تزامناً مع انتهاء الدوران وانغلاق المكعب
    const textHideTimer = window.setTimeout(() => setTextVisible(false), 5500);
    
    // 3. تعتيم الشاشة تزامناً مع الانفجار الأخير للمكعب
    const darkenTimer = window.setTimeout(() => setIsDarkening(true), 7500);

    // 4. إنهاء شاشة البداية بالكامل والانتقال للصفحة التالية
    const exitTimer = window.setTimeout(() => setPhase("exit"), 9200);
    const doneTimer = window.setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, 10200);

    return () => {
      window.clearTimeout(textShowTimer);
      window.clearTimeout(textHideTimer);
      window.clearTimeout(darkenTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1b3f] via-[#0d2a73] to-[#0a1b3f]"
          initial={{ opacity: 0 }}
          animate={
            phase === "exit" ? { opacity: 0, scale: 1.1, filter: "blur(15px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          exit={{ opacity: 0, scale: 1.1, filter: "blur(15px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* الإضاءات المحيطية */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-[80vh] w-[80vh] rounded-full bg-[#114FD1] blur-[160px] opacity-30" 
            />
            <motion.div 
              animate={{ opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-0 right-0 h-[70vh] w-[70vh] rounded-full bg-[#10B981] blur-[150px] opacity-20" 
            />
          </div>

          {/* طبقة التعتيم السينمائي */}
          <motion.div
            className="absolute inset-0 z-5 bg-[#020617]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isDarkening ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* اللوغو 3D */}
          <Logo3D className="z-10" />

          {/* حاوية النصوص الأساسية */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center pointer-events-none mt-24 px-4 w-full">
            <AnimatePresence>
              {textVisible && (
                <motion.div
                  key="text-container"
                  className="flex flex-col items-center gap-4 sm:gap-6 w-full"
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.15 } },
                    exit: { transition: { staggerChildren: 0.1, staggerDirection: -1 } },
                  }}
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -20, scale: 0.9 },
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex items-center gap-3 rounded-full border border-blue-400/30 bg-blue-900/50 px-5 py-2 sm:px-6 sm:py-2.5 backdrop-blur-md shadow-[0_8px_32px_rgba(17,79,209,0.4)]"
                  >
                    <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500"></span>
                    </span>
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-blue-50">
                      Arachnotech
                    </p>
                  </motion.div>

                  <motion.h1
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.95 },
                      show: { opacity: 1, y: 0, scale: 1 },
                      exit: { opacity: 0, scale: 1.1, filter: "blur(10px)" },
                    }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[3.5rem] sm:text-7xl md:text-[9rem] lg:text-[11rem] font-bold tracking-tighter text-white drop-shadow-[0_0_50px_rgba(17,79,209,0.6)] leading-none whitespace-nowrap"
                  >
                    Health<span className="text-[#5894F5]">-Hub</span>
                  </motion.h1>

                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: -10, filter: "blur(5px)" },
                      show: { opacity: 1, y: 0, filter: "blur(0px)" },
                      exit: { opacity: 0, y: 10, filter: "blur(5px)" },
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mt-2 sm:mt-4 text-xs sm:text-sm md:text-xl font-bold tracking-[0.2em] sm:tracking-[0.4em] text-blue-200/90 uppercase whitespace-nowrap"
                  >
                    The Smart Care Core Platform
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}