"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

// ==========================================
// 🎨 بيانات قنوات التواصل
// ==========================================
const socialChannels = [
  {
    name: "واتساب",
    desc: "محادثة فورية",
    link: "https://wa.me/971501234567",
    glowColor: "rgba(37, 211, 102, 0.4)",
    iconColor: "text-[#25D366]",
    icon: (
      <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: "تليجرام",
    desc: "دعم واستفسارات",
    link: "https://t.me/your_username",
    glowColor: "rgba(34, 158, 217, 0.4)",
    iconColor: "text-[#229ED9]",
    icon: (
      <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: "إنستجرام",
    desc: "أحدث أعمالنا",
    link: "https://instagram.com/your_account",
    glowColor: "rgba(225, 48, 108, 0.35)",
    iconColor: "text-[#E1306C]",
    icon: (
      <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "فيسبوك",
    desc: "تواصل عبر الماسنجر",
    link: "https://m.me/your_page",
    glowColor: "rgba(24, 119, 242, 0.4)",
    iconColor: "text-[#1877F2]",
    icon: (
      <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "الإيميل",
    desc: "للمراسلات الرسمية",
    link: "mailto:info@yourdomain.com",
    glowColor: "rgba(234, 67, 53, 0.4)",
    iconColor: "text-[#EA4335]",
    icon: (
      <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
  },
  {
    name: "لينكد إن",
    desc: "تواصل مع الإدارة",
    link: "https://linkedin.com/company/your_company",
    glowColor: "rgba(10, 102, 194, 0.4)",
    iconColor: "text-[#0A66C2]",
    icon: (
      <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

// ==========================================
// ✨ مجسمات التواصل الخارجية
// ==========================================
function ColorfulGlobalObjects() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 15, 0], rotate: [-10, 5, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="hidden sm:flex absolute top-[15%] left-[8%] md:left-[12%] items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_15px_35px_rgba(59,130,246,0.15)]"
      >
        <svg className="w-8 h-8 md:w-10 md:h-10 text-blue-500 drop-shadow-sm -rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, 25, 0], x: [0, -10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden md:flex absolute bottom-[25%] right-[10%] items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_15px_35px_rgba(16,185,129,0.15)]"
      >
        <svg className="w-6 h-6 md:w-8 md:h-8 text-emerald-500 drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0], scale: [1, 1.1, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="hidden lg:flex absolute top-[40%] right-[5%] items-center justify-center w-12 h-12 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_rgba(236,72,153,0.15)]"
      >
        <svg className="w-6 h-6 text-pink-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </motion.div>
    </div>
  );
}

// ==========================================
// ✨ مكون كرت التواصل (أنيق ومناسب للشاشات الصغيرة)
// ==========================================
function ContactCard({ channel, index }: { channel: any, index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const backgroundSpotlight = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, ${channel.glowColor}, transparent 80%)`;

  const floatDuration1 = 10 + (index % 3);
  const floatDuration2 = 8 + (index % 2);
  const floatDuration3 = 12 + (index % 4);

  return (
    <motion.a
      href={channel.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col items-center justify-center p-5 md:p-8 rounded-2xl md:rounded-[2rem] bg-[#eefaf2]/90 backdrop-blur-xl border border-[#bbf7d0] shadow-[0_4px_20px_rgba(34,197,94,0.04)] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(34,197,94,0.15)] hover:border-[#86efac] text-center h-[160px] md:h-[220px]"
    >
      
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-multiply md:mix-blend-normal"
        style={{ background: backgroundSpotlight }}
      />

      {/* ================================================== */}
      {/* 🟢 المجسمات الداخلية (مخفية في الموبايل، ظاهرة في الديسكتوب) */}
      {/* ================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-2xl md:rounded-[2rem]">
        
        {/* 1. مثلث (يظهر فقط في الشاشات المتوسطة والكبيرة hidden md:block) */}
        <motion.svg 
          animate={{ rotate: 360 }} 
          transition={{ duration: floatDuration1, repeat: Infinity, ease: "linear" }}
          className="hidden md:block absolute -top-6 -right-4 w-20 h-20 text-[#86efac] opacity-50" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M12 2L22 20H2L12 2Z" />
        </motion.svg>

        {/* 2. حلقة دائرية (تظهر فقط في الشاشات المتوسطة والكبيرة hidden md:block) */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: floatDuration2, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute -bottom-8 -left-6 w-24 h-24 rounded-full border-[5px] border-[#4ade80] opacity-30"
        />

        {/* 3. علامة زائد (موجودة في الجوال ولكن بحجم صغير جداً وأنيق) */}
        <motion.svg 
          animate={{ y: [0, -15, 0], rotate: [0, 90, 0] }} 
          transition={{ duration: floatDuration3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] md:top-[25%] left-[15%] md:left-[20%] w-3 h-3 md:w-6 md:h-6 text-[#22c55e] opacity-40" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" />
        </motion.svg>
        
        {/* 4. نقطة صغيرة (تظهر فقط في الشاشات المتوسطة والكبيرة) */}
        <motion.div
          animate={{ x: [-5, 15, -5], y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute bottom-[20%] right-[25%] w-2 h-2 bg-[#16a34a] rounded-full opacity-60"
        />
      </div>

      {/* ================================================== */}
      {/* 📌 محتوى الكرت الأساسي */}
      {/* ================================================== */}
      <div className="relative z-20 flex flex-col items-center w-full">
        <div className={`mb-3 md:mb-5 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 border border-green-200 ${channel.iconColor}`}>
          {channel.icon}
        </div>
        <h3 className="text-base md:text-xl font-bold text-slate-800 mb-1 md:mb-2 transition-colors duration-300 group-hover:text-slate-900">
          {channel.name}
        </h3>
        <p className="text-[11px] md:text-sm font-medium text-slate-500 transition-colors duration-300 px-1 group-hover:text-slate-700">
          {channel.desc}
        </p>
      </div>
    </motion.a>
  );
}

// ==========================================
// 🚀 الفوتر 
// ==========================================
function HealthHubFooter() {
  return (
    <footer className="relative bg-[#131b2b] border-t border-slate-800/80 pt-16 md:pt-24 pb-6 md:pb-10 overflow-hidden" dir="rtl">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3b82f6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0d9468]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 mb-16">
          <div className="w-full lg:w-[35%]">
            <div className="mb-6 flex items-center gap-3">
              <img 
                src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=1080&q=75" 
                alt="Health-Hub Logo" 
                className="w-10 h-10 object-contain drop-shadow-lg"
              />
              <h3 className="text-3xl md:text-4xl font-black tracking-tight" dir="ltr">
                <span className="text-white">Health-</span>
                <span className="text-[#3b82f6]">Hub</span>
              </h3>
            </div>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-medium max-w-sm">
              نظام الإدارة الطبية المتكامل الأول من نوعه. صُمم خصيصاً لرفع كفاءة المستشفيات وتحويل الرعاية إلى تجربة رقمية استثنائية.
            </p>
            <div className="flex flex-row items-center bg-[#1e293b]/80 backdrop-blur-sm rounded-xl p-1.5 border border-slate-700/50 focus-within:border-[#3b82f6]/50 transition-colors shadow-inner max-w-sm">
              <input 
                type="email" 
                placeholder="أدخل بريدك الإلكتروني..." 
                className="w-full bg-transparent text-slate-200 text-sm px-4 focus:outline-none placeholder:text-slate-500"
              />
              <button className="bg-gradient-to-r from-[#3b82f6] to-blue-600 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-bold py-2.5 px-6 rounded-lg transition-all shadow-lg shadow-blue-500/25 whitespace-nowrap">
                اشتراك
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[60%] flex flex-row flex-wrap sm:flex-nowrap justify-between gap-8 md:gap-12">
            <div className="w-full sm:w-1/2 grid grid-cols-2 gap-6 md:gap-12">
              <div>
                <h4 className="text-white font-bold mb-5 tracking-wide text-base">النظام</h4>
                <ul className="space-y-3.5">
                  {['المميزات السريرية', 'إدارة المواعيد', 'الفوترة الإلكترونية', 'بوابة المريض'].map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-slate-400 hover:text-[#3b82f6] transition-colors duration-300 text-sm font-medium">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-5 tracking-wide text-base">الشركة</h4>
                <ul className="space-y-3.5">
                  {['من نحن', 'آراء العملاء', 'شروط الاستخدام', 'سياسة الخصوصية'].map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-slate-400 hover:text-[#3b82f6] transition-colors duration-300 text-sm font-medium">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
              <h4 className="text-white font-bold mb-5 tracking-wide text-base">تواصل معنا</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-400 text-sm font-medium leading-relaxed bg-[#1e293b]/30 p-3 rounded-xl border border-slate-800/50">
                  <svg className="w-5 h-5 text-[#3b82f6] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>الرياض، السعودية<br/>طريق الملك فهد، برج الأعمال</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400 text-sm font-medium px-3">
                  <svg className="w-5 h-5 text-[#3b82f6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span dir="ltr">+966 50 123 4567</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400 text-sm font-medium px-3">
                  <svg className="w-5 h-5 text-[#3b82f6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@health-hub.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-row flex-wrap items-center justify-between gap-4">
          <p className="text-slate-500 text-xs md:text-sm font-medium">
            © {new Date().getFullYear()}{" "}
            <span dir="ltr" className="inline-flex font-bold">
              <span className="text-slate-300">Health-</span>
              <span className="text-[#3b82f6]">Hub</span>
            </span>
            . جميع الحقوق محفوظة.
          </p>
          
          <div className="flex items-center gap-2 md:gap-3">
            {[
              { name: 'Twitter', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
              { name: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              { name: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' }
            ].map((social, i) => (
              <a key={i} href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1e293b] border border-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6] hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// 🚀 تجميع الصفحة 
// ==========================================
export default function ContactAndFooterSection() {
  return (
    <>
      <section className="relative py-16 md:py-32 bg-transparent z-10" id="contact" dir="rtl">
        
        <ColorfulGlobalObjects />

        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <motion.div 
              initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-green-200/60 px-4 py-1.5 md:py-2 rounded-full mb-6 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[11px] md:text-xs font-bold text-green-800 uppercase tracking-wider">متواجدون على مدار الساعة</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight drop-shadow-sm"
            >
              {/* 🔴 تم تعديل التدرج اللوني هنا ليكون من الأزرق #3b82f6 إلى الأخضر #0d9468 */}
              نحن هنا لنستمع <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#0d9468]">إليك</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-8 max-w-5xl mx-auto">
            {socialChannels.map((channel, index) => (
              <ContactCard key={index} channel={channel} index={index} />
            ))}
          </div>
        </div>
      </section>

      <HealthHubFooter />
    </>
  );
}