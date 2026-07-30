"use client";

import { useState, useEffect, useCallback, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface Stat {
  label: string;
  value: string;
}

interface Project {
  id: number;
  title: string;
  hospital: string;
  image: string;
  tags: string[];
  description: string;
  stats: Stat[];
  color: "primary" | "secondary";
}

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "نواة Smart Care المركزية",
    hospital: "مستشفى الأمل الجامعي",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
    tags: ["Data Architecture", "EERD"],
    description: "تطبيق النواة المركزية لإدارة السعة السريرية لأكثر من 500 سرير. تضمن العمل بناء مخططات متقدمة تقضي على تكرار البيانات وتسرع الاستعلامات الطبية.",
    stats: [
      { label: "زمن المعالجة", value: "0.02s" },
      { label: "استعلام يومي", value: "+2M" },
      { label: "التوافر", value: "99.9%" }
    ],
    color: "primary"
  },
  {
    id: 2,
    title: "أتمتة الاستقبال والطباعة",
    hospital: "مجمع النخبة الطبي",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=800&auto=format&fit=crop",
    tags: ["Hardware API", "Automation"],
    description: "دمج وحدة أتمتة لدعم الطباعة الحرارية المباشرة لإصدار التذاكر واللواصق المخبرية آلياً، مما أحدث ثورة في سرعة تدفق المرضى.",
    stats: [
      { label: "تذكرة يومياً", value: "5K+" },
      { label: "دقة الطباعة", value: "100%" }
    ],
    color: "secondary"
  },
  {
    id: 3,
    title: "الامتداد السريري للطاقم",
    hospital: "عيادات السلام التخصصية",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
    tags: ["React Front-end", "Real-time"],
    description: "واجهة وصول لحظي لبيانات المرضى من أي نقطة في المشفى، مصممة هندسياً لتقليل العبء المعرفي على الأطباء أثناء فترات الضغط.",
    stats: [
      { label: "مستخدم متزامن", value: "150+" },
      { label: "مزامنة", value: "Instant" }
    ],
    color: "primary"
  },
  {
    id: 4,
    title: "هندسة الدورة المالية",
    hospital: "المركز الوطني للقلب",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d786a2b?q=80&w=800&auto=format&fit=crop",
    tags: ["Finance Engine", "Analytics"],
    description: "خوارزميات متقدمة تربط السجلات الطبية بالمالية، لإنشاء المطالبات وحساب استهلاك غرف العمليات بدقة متناهية وسد فجوات الإيرادات.",
    stats: [
      { label: "دقة الفوترة", value: "99.9%" },
      { label: "إدارة أسرة", value: "300+" }
    ],
    color: "secondary"
  },
  {
    id: 5,
    title: "مركزة البيانات والترحيل",
    hospital: "مجموعة الشفاء الصحية",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    tags: ["Data Migration", "Security"],
    description: "مشروع دقيق لتوحيد قواعد البيانات المتناثرة عبر الفروع ضمن سيرفر مركزي آمن ومحمي بأحدث بروتوكولات التشفير.",
    stats: [
      { label: "فروع مرتبطة", value: "3" },
      { label: "أمان", value: "HIPAA" }
    ],
    color: "primary"
  }
];

function ColoredFallingShapes({ color }: { color: "primary" | "secondary" }) {
  const shapes = Array.from({ length: 14 });
  const isPrimary = color === "primary";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((_, i) => {
        const size = Math.random() * 45 + 25; 
        const leftPos = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 12 + 12; 
        
        const shapeType = i % 3;
        let shapeClass = "rounded-full"; 
        if (shapeType === 1) shapeClass = "rounded-[1.5rem]"; 
        if (shapeType === 2) shapeClass = "rounded-xl"; 

        const gemColors = isPrimary 
          ? "from-[#114fd1]/70 to-[#0c3ba6]/40 border-[#114fd1]/30 shadow-[0_10px_30px_rgba(17,79,209,0.25)]" 
          : "from-[#0d9468]/70 to-[#08704d]/40 border-[#0d9468]/30 shadow-[0_10px_30px_rgba(13,148,104,0.25)]";

        return (
          <motion.div
            key={i}
            className={`absolute backdrop-blur-md border bg-gradient-to-br ${gemColors} ${shapeClass}`}
            style={{ width: size, height: size, left: `${leftPos}%`, top: "-15%" }}
            animate={{
              y: ["0vh", "120vh"], 
              rotate: [shapeType === 2 ? 45 : 0, shapeType === 2 ? 405 : 360], 
              x: [0, Math.random() * 60 - 30] 
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        );
      })}
    </div>
  );
}

export default function SuccessPartners() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const headingId = useId();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setSelectedProject(null);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section 
      dir="rtl" 
      className="relative w-full py-16 md:py-24 lg:py-32 bg-transparent overflow-hidden"
      aria-labelledby={headingId}
    >
      <div className="w-full px-4 md:px-12 lg:px-16 relative z-10 max-w-[1600px] mx-auto">
        
        <div className="mb-10 md:mb-20 flex flex-col items-start text-right max-w-3xl relative z-20">
          <motion.h2 
            id={headingId}
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "0px 0px -50px 0px" }} 
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[var(--color-text-main)] mb-4 md:mb-6 tracking-tight leading-[1.2]"
          >
            مشاريع تم إنجازها{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[var(--color-primary)] to-[var(--color-secondary)]">
              بنجاح وتميز
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "0px 0px -50px 0px" }} 
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[var(--color-text-muted)] font-medium text-[15px] md:text-lg lg:text-xl leading-relaxed"
          >
            نستعرض هنا مجموعة من المشاريع البرمجية التي تمت هندستها وتطبيقها فعلياً لرفع الكفاءة التشغيلية للمنشآت الطبية الكبرى وتحويلها رقمياً.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 lg:gap-6 relative z-20">
          {PROJECTS_DATA.map((project, idx) => {
            let spanClass = "";
            if (idx === 0) spanClass = "md:col-span-8 md:row-span-2 min-h-[380px] md:min-h-[450px] lg:min-h-[600px]"; 
            else if (idx === 1) spanClass = "md:col-span-4 md:row-span-1 min-h-[260px] md:min-h-[300px]";
            else if (idx === 2) spanClass = "md:col-span-4 md:row-span-1 min-h-[260px] md:min-h-[300px]";
            else if (idx === 3) spanClass = "md:col-span-6 md:row-span-1 min-h-[280px] md:min-h-[350px]";
            else if (idx === 4) spanClass = "md:col-span-6 md:row-span-1 min-h-[280px] md:min-h-[350px]";

            return (
              <ProjectCard 
                key={project.id}
                project={project}
                spanClass={spanClass}
                isHero={idx === 0}
                onClick={() => setSelectedProject(project)}
              />
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  spanClass: string;
  isHero: boolean;
  onClick: () => void;
}

function ProjectCard({ project, spanClass, isHero, onClick }: ProjectCardProps) {
  const isReducedMotion = useReducedMotion();
  const isPrimary = project.color === "primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={spanClass}
    >
      <motion.div
        layoutId={isReducedMotion ? undefined : `card-${project.id}`}
        onClick={onClick}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
        role="button"
        tabIndex={0}
        className={`group relative w-full h-full flex flex-col justify-end overflow-hidden rounded-2xl md:rounded-[2rem] bg-[#0f172a] ring-1 ring-inset ring-white/10 cursor-pointer transition-all duration-700 outline-none ${
          isPrimary ? "hover:ring-[var(--color-primary)] hover:shadow-[0_20px_50px_-15px_rgba(17,79,209,0.4)]" : "hover:ring-[var(--color-secondary)] hover:shadow-[0_20px_50px_-15px_rgba(13,148,104,0.4)]"
        }`}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            loading={isHero ? "eager" : "lazy"}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
          />
          <div className={`absolute inset-0 mix-blend-multiply opacity-20 transition-opacity duration-700 group-hover:opacity-0 ${isPrimary ? "bg-[#0c3ba6]" : "bg-[#08704d]"}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/30 to-transparent pointer-events-none" />
        </div>

        <div className="relative p-5 md:p-8 lg:p-10 z-10 w-full h-full flex flex-col justify-end text-white">
          <div className={`absolute top-4 left-4 md:top-6 md:left-6 w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-lg border border-white/20 bg-white/10 flex items-center justify-center opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 ${
            isPrimary ? 'group-hover:bg-[#114fd1] group-hover:border-[#114fd1] shadow-[0_0_20px_rgba(17,79,209,0.5)]' : 'group-hover:bg-[#0d9468] group-hover:border-[#0d9468] shadow-[0_0_20px_rgba(13,148,104,0.5)]'
          }`}>
            <svg className="w-5 h-5 text-white rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
              {project.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-1 md:px-3 text-[10px] md:text-[11px] font-bold tracking-wider rounded-lg border border-white/20 bg-white/10 backdrop-blur-md text-white uppercase shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className={`font-extrabold tracking-tight mb-2 text-white drop-shadow-md ${isHero ? "text-[26px] sm:text-3xl md:text-5xl leading-tight" : "text-xl sm:text-2xl md:text-3xl"}`}>
              {project.title}
            </h3>

            <p className="font-medium text-[13px] md:text-sm lg:text-base flex items-center gap-2 drop-shadow-md text-gray-200">
              <svg className={`w-4 h-4 md:w-5 md:h-5 ${isPrimary ? 'text-[#60a5fa]' : 'text-[#34d399]'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {project.hospital}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const isReducedMotion = useReducedMotion();
  const isPrimary = project.color === "primary";

  const modalBgTheme = isPrimary 
    ? "bg-gradient-to-br from-[#E1EFFF] to-[#BFE0FF]" 
    : "bg-gradient-to-br from-[#D8F4E6] to-[#AEE8CB]";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-12 overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div 
        layoutId={isReducedMotion ? undefined : `card-${project.id}`}
        initial={{ opacity: 0, scale: 0.96, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.96, y: 20 }} 
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={`relative w-full max-w-6xl rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row max-h-[95vh] z-10 border border-white/60 ${modalBgTheme}`}
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 left-3 md:top-6 md:left-6 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/70 backdrop-blur-md border border-white shadow-sm flex items-center justify-center text-[#0f172a] hover:bg-white hover:text-red-500 hover:scale-105 transition-all"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full md:w-[55%] p-5 sm:p-8 md:p-12 lg:p-16 overflow-y-auto flex flex-col justify-center relative order-2 md:order-1">
          
          <ColoredFallingShapes color={project.color} />

          <div className="relative z-10">
            <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
              {project.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-bold tracking-wider rounded-lg border bg-white/50 backdrop-blur-md uppercase shadow-sm text-[#0f172a] border-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-3 md:mb-4 leading-[1.2] tracking-tight">
              {project.title}
            </h3>
            
            <p className={`text-[11px] md:text-sm font-bold uppercase tracking-wider mb-5 md:mb-8 flex items-center gap-2 ${isPrimary ? "text-[#0c3ba6]" : "text-[#08704d]"}`}>
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {project.hospital}
            </p>

            <p className="text-[#334155] font-semibold text-[14px] md:text-lg leading-relaxed mb-6 md:mb-10">
              {project.description}
            </p>

            <div className="mt-auto">
              <h4 className="text-[10px] md:text-xs font-bold text-[#475569] uppercase tracking-widest mb-3 md:mb-5">الأثر التشغيلي</h4>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {project.stats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 md:p-5 rounded-xl md:rounded-2xl border border-white/80 bg-white/50 backdrop-blur-xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:bg-white/80 transition-all"
                  >
                    <span className={`block text-xl md:text-3xl font-black mb-1 ${isPrimary ? "text-[#114fd1]" : "text-[#0d9468]"}`}>
                      {stat.value}
                    </span>
                    <span className="text-[10px] md:text-xs font-bold text-[#475569] uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[45%] h-52 sm:h-64 md:h-auto relative overflow-hidden order-1 md:order-2 bg-[#0f172a] border-r border-white/40 flex-shrink-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 mix-blend-multiply opacity-20 ${isPrimary ? "bg-[#0c3ba6]" : "bg-[#08704d]"}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/30 to-transparent pointer-events-none" />
        </div>

      </motion.div>
    </div>
  );
}