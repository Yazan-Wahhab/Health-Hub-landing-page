"use client";

import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function NetworkVisual() {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative h-[26rem] overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-[0_32px_80px_rgba(17,79,209,0.08)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(17,79,209,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_32%)]" />
      <div className="absolute inset-6 rounded-[1.6rem] border border-white/80 bg-white/60 backdrop-blur-xl" />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative h-72 w-72">
          <motion.div
            className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-[1.6rem] bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_24px_60px_rgba(17,79,209,0.35)]"
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {[
            { className: "left-8 top-10", delay: 0 },
            { className: "right-10 top-14", delay: 0.2 },
            { className: "left-16 bottom-16", delay: 0.4 },
            { className: "right-14 bottom-12", delay: 0.1 },
          ].map((node) => (
            <motion.div
              key={node.className}
              className={`absolute ${node.className} h-9 w-9 rounded-full border border-white/90 bg-white/80 backdrop-blur-md shadow-[0_12px_28px_rgba(17,79,209,0.15)]`}
              animate={{ y: [0, -6, 0], scale: [1, 1.05, 1] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.delay,
              }}
            />
          ))}

          <svg className="absolute inset-0 h-full w-full text-blue-300/80" viewBox="0 0 288 288" fill="none">
            <motion.path d="M144 144L56 66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.4 }} />
            <motion.path d="M144 144L228 74" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.5 }} />
            <motion.path d="M144 144L74 222" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.6 }} />
            <motion.path d="M144 144L218 220" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.45 }} />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative border-b border-blue-50 bg-white py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(17,79,209,0.06),transparent_70%)] pointer-events-none" />
      
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.08 }}
          className="max-w-2xl"
        >
          <motion.div
            variants={reveal}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-emerald-700 shadow-sm"
          >
            Secure operations platform
          </motion.div>
          <motion.h2
            variants={reveal}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            // تم استبدال الرمادي الغامق بأزرق كحلي فخم
            className="font-display text-4xl font-semibold tracking-[-0.06em] text-[#0a1b3f] sm:text-6xl"
          >
            One operating layer for modern hospitals.
          </motion.h2>
          <motion.p
            variants={reveal}
            transition={{ duration: 0.75, ease: "easeOut" }}
            // نصوص مقروءة بأزرق بحري معتدل
            className="mt-6 max-w-xl text-lg leading-8 text-[#3b4c68]"
          >
            Health-Hub unifies admissions, records, finance, and clinical
            coordination into a premium enterprise workflow designed for
            high-trust healthcare environments.
          </motion.p>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            {/* Premium Button */}
            <motion.a
              href="#contact"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group overflow-hidden rounded-full bg-[#114FD1] px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(17,79,209,0.25)] transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#10B981] to-[#114FD1] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/30 opacity-20 group-hover:animate-shine" />
              <span className="relative z-10">Request enterprise demo</span>
            </motion.a>
            
            <div className="flex items-center gap-3 rounded-full border border-blue-100 bg-white/80 backdrop-blur-sm px-5 py-4 text-sm font-medium text-[#3b4c68] shadow-[0_8px_20px_rgba(17,79,209,0.04)] hover:border-blue-200 transition-colors">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              SOC-ready access controls
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <NetworkVisual />
        </motion.div>
      </div>
    </section>
  );
}