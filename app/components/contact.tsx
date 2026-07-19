"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// ==========================================
// 🎨 بيانات قنوات التواصل مع الألوان والروابط
// ==========================================
const socialChannels = [
  {
    name: "واتساب",
    desc: "محادثة فورية مع المبيعات",
    link: "https://wa.me/971501234567", // 👈 ضع رقمك هنا
    hoverClass: "hover:bg-[#25D366] hover:border-[#25D366] hover:text-white",
    iconColor: "text-[#25D366]",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: "تليجرام",
    desc: "دعم فني واستفسارات",
    link: "https://t.me/your_username", // 👈 ضع رابط تليجرام
    hoverClass: "hover:bg-[#229ED9] hover:border-[#229ED9] hover:text-white",
    iconColor: "text-[#229ED9]",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: "إنستجرام",
    desc: "تابع أحدث أعمالنا",
    link: "https://instagram.com/your_account", // 👈 ضع رابط انستجرام
    hoverClass: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent hover:text-white",
    iconColor: "text-[#E1306C]",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "فيسبوك",
    desc: "تواصل عبر الماسنجر",
    link: "https://m.me/your_page", // 👈 ضع رابط ماسنجر أو صفحة الفيسبوك
    hoverClass: "hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white",
    iconColor: "text-[#1877F2]",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "البريد الإلكتروني",
    desc: "للمراسلات الرسمية",
    link: "mailto:info@yourdomain.com", // 👈 ضع ايميلك
    hoverClass: "hover:bg-[#EA4335] hover:border-[#EA4335] hover:text-white",
    iconColor: "text-[#EA4335]",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
  },
  {
    name: "لينكد إن",
    desc: "تواصل مع الإدارة",
    link: "https://linkedin.com/company/your_company", // 👈 ضع رابط لينكد ان
    hoverClass: "hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white",
    iconColor: "text-[#0A66C2]",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative py-24 bg-[#f8fafc] z-10 overflow-hidden" id="contact" dir="rtl">
      
      {/* 🌟 خلفية جمالية خفيفة */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#114fd1]/5 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#0d9468]/5 to-transparent rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3"></div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">
        
        {/* عنوان القسم */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-bold text-slate-700">نحن متاحون دائماً لخدمتك</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 tracking-tight">
            تواصل معنا <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#114fd1] to-[#0d9468]">مباشرة</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            اختر وسيلة التواصل التي تفضلها للوصول إلى فريقنا المتخصص، سواء عبر منصات التواصل الاجتماعي أو المحادثات الفورية.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* ========================================== */}
          {/* الجانب الأيمن: شبكة منصات التواصل (Grid) */}
          {/* ========================================== */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialChannels.map((channel, index) => (
                <motion.a
                  key={index}
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`group relative flex items-center gap-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-xl ${channel.hoverClass}`}
                >
                  {/* تأثير لمعة خفيفة عند الهوفر */}
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                  
                  {/* أيقونة المنصة */}
                  <div className={`relative z-10 flex items-center justify-center w-14 h-14 rounded-xl bg-slate-50 transition-colors duration-300 group-hover:bg-white/20 ${channel.iconColor} group-hover:text-white`}>
                    {channel.icon}
                  </div>
                  
                  {/* النصوص */}
                  <div className="relative z-10 flex-1">
                    <h3 className="text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-white mb-1">
                      {channel.name}
                    </h3>
                    <p className="text-sm text-slate-500 transition-colors duration-300 group-hover:text-white/90 font-medium">
                      {channel.desc}
                    </p>
                  </div>
                  
                  {/* سهم صغير يظهر عند الهوفر */}
                  <div className="relative z-10 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* ========================================== */}
          {/* الجانب الأيسر: نموذج اتصال سريع وأنيق */}
          {/* ========================================== */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.03)] relative overflow-hidden">
              {/* شريط علوي ملون */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#114fd1] to-[#0d9468]"></div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-2">أو اترك رسالة سريعة</h3>
              <p className="text-sm text-slate-500 mb-8 font-medium">سيقوم فريق المبيعات بالتواصل معك خلال ساعة عمل.</p>
              
              <form className="space-y-5">
                <div>
                  <input type="text" placeholder="الاسم الكامل" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#114fd1]/20 focus:border-[#114fd1] transition-all font-medium placeholder:text-slate-400" />
                </div>
                <div>
                  <input type="tel" placeholder="رقم الهاتف الأساسي" dir="rtl" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#114fd1]/20 focus:border-[#114fd1] transition-all font-medium placeholder:text-slate-400 text-right" />
                </div>
                <div>
                  <textarea rows={4} placeholder="كيف يمكننا مساعدتك؟" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#114fd1]/20 focus:border-[#114fd1] transition-all font-medium placeholder:text-slate-400 resize-none"></textarea>
                </div>
                
                <motion.button 
                  type="button"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative overflow-hidden rounded-xl bg-[#114fd1] px-6 py-4 text-lg font-bold text-white shadow-lg shadow-[#114fd1]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#114fd1]/40 group flex items-center justify-center gap-2 mt-4"
                >
                  <span className="relative z-10">إرسال الرسالة</span>
                  <svg className={`w-5 h-5 relative z-10 transition-transform duration-300 ${isHovered ? "-translate-x-2" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  {/* لمعة الزر */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}