"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslate } from "./translation-provider";

const faqs = [
  {
    id: 1,
    question: "هل يدعم النظام التكامل مع أجهزة الأشعة (PACS) والمختبرات؟",
    answer:
      "نعم. تم بناء البنية التحتية لتدعم بروتوكولات الرعاية الصحية العالمية (HL7, FHIR)، مما يضمن تدفق البيانات لحظياً إلى السجل الطبي دون أي تدخل يدوي.",
  },
  {
    id: 2,
    question: "كيف يتم إدارة مواعيد المرضى وتدفق المراجعين؟",
    answer:
      "تعتمد المنصة حصرياً على وحدة الحجوزات (Bookings Module) المتطورة والخاصة بنا لضمان مركزية البيانات المطلقة. وتطبيقا لأعلى معايير الأمان، قمنا باستبعاد أي أدوات جدولة (Scheduling) خارجية.",
  },
  {
    id: 3,
    question: "ما هي معايير الأمان والتشفير المتبعة لحماية البيانات؟",
    answer:
      "نطبق معايير صارمة متوافقة مع قواعد HIPAA و GDPR. يتم تشفير جميع البيانات (End-to-End Encryption) مع تطبيق نظام صلاحيات وصول دقيق يضمن سرية السجلات.",
  },
  {
    id: 4,
    question: "هل النظام مستقر للعمل في غرف العناية المركزة والطوارئ؟",
    answer:
      "المنصة مبنية بهندسة معمارية عالية التوافر (High Availability) لضمان استقرار بنسبة 92.5%. الخوادم الاحتياطية تعمل تلقائياً في أجزاء من الثانية لضمان استمرار العمل بلا توقف.",
  },
  {
    id: 5,
    question: "كم يستغرق الوقت للتدريب والانتقال الكامل للمنصة؟",
    answer:
      "يتم الانتقال الكامل لمستشفى متوسط الحجم خلال 4 إلى 6 أسابيع فقط، مع توفير فريق دعم هندسي ميداني متخصص متواجد خلال مرحلة الإطلاق.",
  },
  {
    id: 6,
    question: "سياسة الخصوصية، وكيف تحمون بيانات المرضى؟",
    answer:
      "نلتزم بالحفاظ على سرية بيانات المرضى بالكامل. لا نقوم بمشاركة أي معلومات طبية مع أطراف ثالثة دون موافقة صريحة، وجميع البيانات مخزنة في خوادم سحابية محمية ومشفّرة حسب المعايير الطبية الدولية وبنسخ احتياطية لحظية.",
  },
];

function ElegantInnerShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px] z-0">
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#114fd1] opacity-[0.04] blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#0d9468] opacity-[0.03] rounded-full blur-3xl"
      />
    </div>
  );
}

function PremiumQuestionMark() {
  return (
    <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-[350px] lg:h-[350px] flex items-center justify-center mx-auto lg:mx-0 mb-8 lg:mb-10 select-none">
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-4 sm:inset-10 bg-gradient-to-tr from-[#114fd1] to-[#0d9468] rounded-full blur-[40px] sm:blur-[60px]"
      />

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
            lineHeight: 1,
          }}
        >
          ؟
        </motion.span>
      </div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border-[1px] sm:border-[1.5px] border-dashed border-[#114fd1]/20 rounded-full pointer-events-none"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-5 sm:-top-7 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center"
        >
          <motion.img
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            src="https://newworkspace.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=1080&q=75"
            alt="Logo"
            className="w-full h-full object-contain drop-shadow-[0_10px_15px_rgba(17,79,209,0.5)]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-5 sm:inset-8 border border-[#0d9468]/15 rounded-full pointer-events-none"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center"
        >
          <motion.img
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            src="https://newworkspace.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=1080&q=75"
            alt="Logo"
            className="w-full h-full object-contain drop-shadow-[0_10px_15px_rgba(13,148,104,0.5)]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function FAQSection() {
  const { t } = useTranslate();
  const [openId, setOpenId] = useState<number | null>(1);

  useEffect(() => {
    const handleOpenFaq = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.id) {
        const targetId = customEvent.detail.id;
        setOpenId(targetId);
        
        // استخدام مهلة قصيرة لإعطاء وقت لعنصر الـ FAQ ليفتح ثم الانتقال مباشرة وبدقة إلى مكانه على الشاشة
        setTimeout(() => {
          const element = document.getElementById(`faq-item-${targetId}`);
          if (element) {
            // الرقم 80 هنا يجعل الانتقال ينزل أكثر (بحيث العنصر يرتفع للأعلى)
            const y = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 150);
      }
    };

    window.addEventListener("open-faq", handleOpenFaq);
    return () => window.removeEventListener("open-faq", handleOpenFaq);
  }, []);

  return (
    <section
      className="relative py-16 sm:py-24 lg:py-32 bg-transparent z-10 overflow-x-clip"
      id="faq"
    >
      <div
        className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12 relative z-10"
        dir="rtl"
      >
        <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-24 items-stretch">
          <div className="lg:w-[40%] xl:w-[35%] flex flex-col justify-center items-center lg:items-start text-center lg:text-right relative z-10 lg:sticky lg:top-32 h-fit pb-4 lg:pb-10">
            <div className="w-full flex justify-center lg:justify-start relative z-10">
              <PremiumQuestionMark />
            </div>
            <div className="relative z-10 w-full mt-2 lg:mt-4">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-slate-900 leading-[1.3] lg:leading-[1.2] mb-4 sm:mb-6">
                {t("faq.title")}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                {t("faq.description")}
              </p>
            </div>
          </div>

          <div className="lg:w-[60%] xl:w-[65%] relative z-20 flex flex-col gap-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  id={`faq-item-${faq.id}`}
                  key={faq.id}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className={`group relative overflow-hidden rounded-[20px] cursor-pointer transition-all duration-300 ease-out select-none ${
                    isOpen
                      ? "bg-white border-transparent shadow-[0_15px_40px_-12px_rgba(17,79,209,0.12)] z-10 ring-1 ring-[#114fd1]/10"
                      : "bg-white/50 backdrop-blur-sm border border-slate-200/60 shadow-[0_4px_15px_-10px_rgba(0,0,0,0.05)] hover:bg-white hover:shadow-[0_10px_25px_-10px_rgba(17,79,209,0.1)] hover:border-[#114fd1]/20 hover:-translate-y-0.5"
                  }`}
                >
                  {isOpen && <ElegantInnerShapes />}

                  <div
                    className={`absolute top-0 right-0 h-full w-[4px] bg-gradient-to-b from-[#114fd1] to-[#0d9468] transition-all duration-300 ease-out origin-top z-10 ${
                      isOpen
                        ? "opacity-100 scale-y-100 shadow-[0_0_12px_rgba(17,79,209,0.4)]"
                        : "opacity-0 scale-y-0 group-hover:opacity-50 group-hover:scale-y-100"
                    }`}
                  />

                  <div className="relative z-20 p-5 sm:p-6 lg:p-7">
                    <div className="flex items-center justify-between gap-4 sm:gap-6">
                      <h3
                        className={`text-base sm:text-lg lg:text-xl font-bold leading-relaxed transition-colors duration-300 pr-2 flex-1 ${
                          isOpen
                            ? "text-[#114fd1]"
                            : "text-slate-700 group-hover:text-[#114fd1]"
                        }`}
                      >
                        {t(faq.question)}
                      </h3>

                      <div
                        className={`shrink-0 w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isOpen
                            ? "bg-gradient-to-tr from-[#114fd1] to-[#0d9468] text-white rotate-180 shadow-[0_8px_16px_rgba(13,148,104,0.3)]"
                            : "bg-slate-100 text-slate-500 group-hover:bg-[#114fd1]/10 group-hover:text-[#114fd1]"
                        }`}
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d={
                              isOpen ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"
                            }
                            className="transition-all duration-300"
                          />
                        </svg>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.04, 0.62, 0.23, 0.98],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 sm:pt-5 pb-1">
                            <div className="relative overflow-hidden rounded-xl bg-slate-50/70 border border-slate-200/50 p-4 sm:p-5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.01)] backdrop-blur-sm">
                              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#114fd1]/20 to-[#0d9468]/20" />
                              <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed relative z-10 pr-2">
                                {t(faq.answer)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}