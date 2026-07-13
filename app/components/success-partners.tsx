"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS_DATA = [
  {
    id: 1, title: "نواة Smart Care المركزية", hospital: "مستشفى الأمل الجامعي",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop", tags: ["Data Architecture", "EERD"],
    description: "تطبيق النواة المركزية لإدارة السعة السريرية لأكثر من 500 سرير. تضمن العمل بناء مخططات متقدمة تقضي على تكرار البيانات وتسرع الاستعلامات الطبية.",
    stats: [{ label: "زمن المعالجة", value: "0.02s" }, { label: "استعلام يومي", value: "+2M" }, { label: "التوافر", value: "99.9%" }], color: "primary"
  },
  {
    id: 2, title: "أتمتة الاستقبال والطباعة", hospital: "مجمع النخبة الطبي",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=800&auto=format&fit=crop", tags: ["Hardware API", "Automation"],
    description: "دمج وحدة أتمتة لدعم الطباعة الحرارية المباشرة لإصدار التذاكر واللواصق المخبرية آلياً، مما أحدث ثورة في سرعة تدفق المرضى.",
    stats: [{ label: "تذكرة يومياً", value: "5K+" }, { label: "دقة الطباعة", value: "100%" }], color: "secondary"
  },
  {
    id: 3, title: "الامتداد السريري للطاقم", hospital: "عيادات السلام التخصصية",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop", tags: ["React Front-end", "Real-time"],
    description: "واجهة وصول لحظي لبيانات المرضى من أي نقطة في المشفى، مصممة هندسياً لتقليل العبء المعرفي على الأطباء أثناء فترات الضغط.",
    stats: [{ label: "مستخدم متزامن", value: "150+" }, { label: "مزامنة", value: "Instant" }], color: "primary"
  },
  {
    id: 4, title: "هندسة الدورة المالية", hospital: "المركز الوطني للقلب",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d786a2b?q=80&w=800&auto=format&fit=crop", tags: ["Finance Engine", "Analytics"],
    description: "خوارزميات متقدمة تربط السجلات الطبية بالمالية، لإنشاء المطالبات وحساب استهلاك غرف العمليات بدقة متناهية وسد فجوات الإيرادات.",
    stats: [{ label: "دقة الفوترة", value: "99.9%" }, { label: "إدارة أسرة", value: "300+" }], color: "secondary"
  },
  {
    id: 5, title: "مركزة البيانات والترحيل", hospital: "مجموعة الشفاء الصحية",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", tags: ["Data Migration", "Security"],
    description: "مشروع دقيق لتوحيد قواعد البيانات المتناثرة عبر الفروع ضمن سيرفر مركزي آمن ومحمي بأحدث بروتوكولات التشفير.",
    stats: [{ label: "فروع مرتبطة", value: "3" }, { label: "أمان", value: "HIPAA" }], color: "primary"
  }
];

export default function SuccessPartners() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS_DATA[0] | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="relative w-full py-16 z-20 bg-transparent overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-16 relative z-10 max-w-[1700px] mx-auto">
        
        <div className="mb-12 flex flex-col items-start text-left max-w-2xl relative z-20">
          <h3 className="text-4xl md:text-5xl font-display font-extrabold text-[var(--color-text-main)] mb-4 tracking-tight">النظم المنجزة <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">بنجاح</span></h3>
          <p className="text-[var(--color-text-muted)] font-medium text-lg leading-relaxed">استعرض البنية التحتية والمشاريع التقنية التي تمت هندستها وتطبيقها فعلياً.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[300px] lg:auto-rows-[360px] gap-6 relative z-20">
          {PROJECTS_DATA.map((project, idx) => {
            let spanClass = "";
            if (idx === 0) spanClass = "md:col-span-8 md:row-span-2"; 
            else if (idx === 1) spanClass = "md:col-span-4 md:row-span-1";
            else if (idx === 2) spanClass = "md:col-span-4 md:row-span-1";
            else if (idx === 3) spanClass = "md:col-span-6 md:row-span-1";
            else if (idx === 4) spanClass = "md:col-span-6 md:row-span-1";

            const isPrimary = project.color === 'primary';
            const themeBorder = isPrimary ? 'hover:border-[var(--color-primary)]/50 hover:shadow-[0_20px_50px_rgba(56,189,248,0.2)]' : 'hover:border-[var(--color-secondary)]/50 hover:shadow-[0_20px_50px_rgba(52,211,153,0.2)]';
            const badgeBg = isPrimary ? 'bg-[var(--color-primary)] text-[#0a1526]' : 'bg-[var(--color-secondary)] text-[#0a1526]';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }} viewport={{ once: true, margin: "-50px" }}
                onClick={() => setSelectedProject(project)}
                className={`group relative overflow-hidden rounded-[2.5rem] bg-[var(--color-surface)]/10 backdrop-blur-sm cursor-pointer transition-all duration-500 ${spanClass} border border-[var(--color-border)]/30 shadow-[0_15px_40px_rgba(0,0,0,0.4)] ${themeBorder}`}
              >
                <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03] mix-blend-luminosity opacity-40 group-hover:opacity-60 group-hover:mix-blend-normal" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent opacity-90 transition-opacity duration-500"></div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <motion.div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex flex-wrap gap-2.5 mb-5">
                      {project.tags.map((tag, i) => (
                        <span key={i} className={`px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg ${badgeBg}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className={`font-display font-extrabold text-[var(--color-text-main)] mb-2 leading-tight ${idx === 0 ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                      {project.title}
                    </h4>
                    <p className="text-[var(--color-text-muted)] font-bold text-sm uppercase tracking-widest">{project.hospital}</p>
                  </motion.div>
                </div>

                <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)]/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100 shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                  <svg className="w-5 h-5 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 30 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-[var(--color-background)] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] border border-[var(--color-border)]/30 flex flex-col md:flex-row max-h-[90vh]"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 lg:top-8 lg:right-8 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-red-500 transition-all shadow-lg hover:scale-110">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div className="w-full md:w-5/12 h-64 md:h-auto relative overflow-hidden bg-black">
                <img src={selectedProject.image} alt={selectedProject.hospital} className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity" />
                <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[var(--color-background)] to-transparent`}></div>
                <div className={`absolute inset-0 bg-${selectedProject.color === 'primary' ? '[var(--color-primary)]' : '[var(--color-secondary)]'}/10 mix-blend-overlay`}></div>
              </div>

              <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-14 overflow-y-auto bg-[var(--color-background)] relative">
                <div className="flex flex-wrap gap-3 mb-8 relative z-10">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-full bg-[var(--color-surface)]/50 border shadow-md ${selectedProject.color === 'primary' ? 'text-[var(--color-primary)] border-[var(--color-primary)]/30' : 'text-[var(--color-secondary)] border-[var(--color-secondary)]/30'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-3xl lg:text-5xl font-display font-black text-[var(--color-text-main)] mb-3 leading-tight tracking-tight">{selectedProject.title}</h3>
                
                <p className={`text-xs font-black uppercase tracking-widest mb-10 flex items-center gap-2.5 ${selectedProject.color === 'primary' ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary)]'}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  {selectedProject.hospital}
                </p>

                <p className="text-[var(--color-text-muted)] font-medium text-lg leading-relaxed mb-12">{selectedProject.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 relative z-10">
                  {selectedProject.stats.map((stat, idx) => (
                    <div key={idx} className="bg-[var(--color-surface)]/20 p-5 lg:p-6 rounded-2xl border border-[var(--color-border)]/30 shadow-lg flex flex-col justify-center">
                      <p className="text-2xl lg:text-3xl font-display font-black text-[var(--color-text-main)] mb-1.5">{stat.value}</p>
                      <p className={`text-[9px] font-black uppercase tracking-widest ${selectedProject.color === 'primary' ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary)]'}`}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}