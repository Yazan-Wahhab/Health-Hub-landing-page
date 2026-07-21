"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: 1,
    question: "هل يدعم النظام التكامل مع أجهزة الأشعة (PACS) والمختبرات؟",
    answer: "نعم. تم بناء البنية التحتية لتدعم بروتوكولات الرعاية الصحية العالمية (HL7, FHIR)، مما يضمن تدفق البيانات لحظياً إلى السجل الطبي دون أي تدخل يدوي.",
  },
  {
    id: 2,
    question: "كيف يتم إدارة مواعيد المرضى وتدفق المراجعين؟",
    answer: "تعتمد المنصة حصرياً على وحدة الحجوزات (Bookings Module) المتطورة والخاصة بنا لضمان مركزية البيانات المطلقة. وتطبيقا لأعلى معايير الأمان، قمنا باستبعاد أي أدوات جدولة (Scheduling) خارجية.",
  },
  {
    id: 3,
    question: "ما هي معايير الأمان والتشفير المتبعة لحماية البيانات؟",
    answer: "نطبق معايير صارمة متوافقة مع قواعد HIPAA و GDPR. يتم تشفير جميع البيانات (End-to-End Encryption) مع تطبيق نظام صلاحيات وصول دقيق يضمن سرية السجلات.",
  },
  {
    id: 4,
    question: "هل النظام مستقر للعمل في غرف العناية المركزة والطوارئ؟",
    answer: "المنصة مبنية بهندسة معمارية عالية التوافر (High Availability) لضمان استقرار بنسبة 99.99%. الخوادم الاحتياطية تعمل تلقائياً في أجزاء من الثانية لضمان استمرار العمل بلا توقف.",
  },
  {
    id: 5,
    question: "كم يستغرق الوقت للتدريب والانتقال الكامل للمنصة؟",
    answer: "يتم الانتقال الكامل لمستشفى متوسط الحجم خلال 4 إلى 6 أسابيع فقط، مع توفير فريق دعم هندسي ميداني متخصص متواجد خلال مرحلة الإطلاق.",
  }
];

// ==========================================
// 🌌 المجسمات الزرقاء الفاتحة (الهادئة جداً) داخل الكرت
// ==========================================
function ElegantInnerShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl z-0">
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#3b82f6] opacity-[0.06] blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-4 left-1/4 w-20 h-20 md:w-24 md:h-24 bg-[#60a5fa] opacity-[0.05] rounded-3xl rotate-12 blur-xl"
      />
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 180] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 left-4 md:left-8 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-tr from-[#3b82f6]/10 to-transparent border border-[#3b82f6]/20 shadow-sm"
      />
    </div>
  );
}

// ==========================================
// 💎 مجسم الاستفهام الاحترافي (مع اللوغو العائم)
// ==========================================
function PremiumQuestionMark() {
  return (
    <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-[350px] lg:h-[350px] flex items-center justify-center mx-auto lg:mx-0 mb-8 lg:mb-10 select-none">
      {/* التوهج الخلفي للمجسم */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-4 sm:inset-10 bg-gradient-to-tr from-[#114fd1] to-[#0d9468] rounded-full blur-[40px] sm:blur-[60px]"
      />
      
      {/* دائرة الاستفهام الرئيسية */}
      <div className="relative z-10 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[240px] lg:h-[240px] rounded-full border border-white/80 shadow-[0_20px_40px_rgba(17,79,209,0.1),inset_0_0_30px_rgba(255,255,255,1)] backdrop-blur-3xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-white/90 to-white/30">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-b from-white/90 to-transparent rounded-full blur-md opacity-80 transform -translate-y-4 pointer-events-none" />
        <motion.span 
          animate={{ y: [-5, 5, -5], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="text-[100px] sm:text-[140px] lg:text-[200px] font-black drop-shadow-[0_10px_20px_rgba(17,79,209,0.2)] relative z-10 mt-2 sm:mt-4 lg:mt-6"
          style={{ 
            fontFamily: "system-ui, -apple-system, sans-serif",
            background: "linear-gradient(135deg, #114fd1 0%, #0d9468 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1
          }}
        >
          ؟
        </motion.span>
      </div>

      {/* ======================================= */}
      {/* 🚀 اللوغو العائم الأول (طوفان شفاف بالكامل) */}
      {/* ======================================= */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-[1px] sm:border-[1.5px] border-dashed border-[#114fd1]/20 rounded-full pointer-events-none">
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-5 sm:-top-7 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
          <motion.img 
            animate={{ y: [-6, 6, -6] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            src="https://my.health-hubs.net/assets/images/facicon.png" 
            alt="Logo" 
            className="w-full h-full object-contain drop-shadow-[0_10px_15px_rgba(17,79,209,0.5)]" 
          />
        </motion.div>
      </motion.div>

      {/* ======================================= */}
      {/* 🚀 اللوغو العائم الثاني (طوفان شفاف بالكامل) */}
      {/* ======================================= */}
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute inset-5 sm:inset-8 border border-[#0d9468]/15 rounded-full pointer-events-none">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center">
          <motion.img 
            animate={{ y: [5, -5, 5] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            src="https://my.health-hubs.net/assets/images/facicon.png" 
            alt="Logo" 
            className="w-full h-full object-contain drop-shadow-[0_10px_15px_rgba(13,148,104,0.5)]" 
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-transparent z-10 overflow-x-clip" id="faq">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12 relative z-10" dir="rtl">
        <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-24 items-stretch">
          
          {/* الجانب الأيمن */}
          <div className="lg:w-[40%] xl:w-[35%] flex flex-col justify-center items-center lg:items-start text-center lg:text-right relative z-10 lg:sticky lg:top-32 h-fit pb-4 lg:pb-10">
            <div className="w-full flex justify-center lg:justify-start relative z-10">
              <PremiumQuestionMark />
            </div>
            <div className="relative z-10 w-full mt-2 lg:mt-4">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-[#0f172a] leading-[1.3] lg:leading-[1.2] mb-4 sm:mb-6">
                الأسئلة <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#114fd1] to-[#0d9468]">الشائعة</span>
              </h2>
              <p className="text-base sm:text-lg text-[#475569] font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                كل ما تحتاج لمعرفته حول بنية المنظومة، الأمان، وسرعة التكامل تجده هنا بوضوح هندسي تام.
              </p>
            </div>
          </div>

          {/* الجانب الأيسر (الأسئلة والأجوبة) */}
          <div className="lg:w-[60%] xl:w-[65%] relative z-20 flex flex-col gap-4 sm:gap-5">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div 
                  layout
                  key={faq.id}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 border select-none ${
                    isOpen 
                      ? "bg-[#eaf5f0] border-[#0d9468]/30 shadow-[0_15px_40px_rgba(13,148,104,0.12)] z-10 lg:scale-[1.01]" 
                      : "bg-[#f2f9f5] border-[#cce9ec] shadow-sm hover:border-[#114fd1]/30 hover:shadow-md" 
                  }`}
                >
                  {/* الأشكال الزرقاء الفاتحة تتحرك بالخلفية عند الفتح */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
                        <ElegantInnerShapes />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* الخط الجانبي */}
                  <div 
                    className={`absolute top-0 right-0 h-full w-[4px] sm:w-[6px] bg-gradient-to-b from-[#114fd1] to-[#0d9468] transition-transform duration-500 ease-out origin-top z-10 ${
                      isOpen ? "scale-y-100" : "scale-y-0"
                    }`} 
                  />

                  <div className="relative z-20 p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center justify-between gap-3 sm:gap-6">
                      <h3 className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-relaxed transition-colors duration-300 pr-2 sm:pr-3 flex-1 ${
                        isOpen ? "text-[#0d9468]" : "text-[#0f172a] group-hover:text-[#114fd1]"
                      }`}>
                        {faq.question}
                      </h3>
                      
                      {/* أزرار + و x */}
                      <div className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-500 ${
                        isOpen 
                          ? "bg-gradient-to-tr from-[#114fd1] to-[#0d9468] text-white rotate-180 shadow-[0_8px_20px_rgba(13,148,104,0.35)]" 
                          : "bg-white text-[#114fd1] border border-[#cce9ec] shadow-sm group-hover:bg-[#eef8f9] group-hover:border-[#114fd1]/30"
                      }`}>
                        <svg 
                          className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 ease-in-out ${isOpen ? "rotate-45" : "rotate-0"}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 sm:pt-4 lg:pt-5 mt-3 sm:mt-4 lg:mt-5 border-t border-[#0d9468]/15 pr-2 sm:pr-3">
                            <p className="text-[#334155] font-medium text-xs sm:text-sm lg:text-lg leading-relaxed bg-white/50 p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl border border-white/60 backdrop-blur-sm shadow-sm">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}