"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

function AdmissionsVisual() {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative h-[24rem] overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-[0_32px_80px_rgba(16,185,129,0.08)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(17,79,209,0.05),transparent_32%)]" />
      <div className="absolute inset-6 rounded-[1.6rem] border border-white/80 bg-white/70 backdrop-blur-xl shadow-inner" />

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute inset-x-8 top-10 flex items-center justify-between rounded-2xl border border-blue-50 bg-white px-6 py-5 shadow-[0_14px_30px_rgba(17,79,209,0.06)]"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#3b4c68]">
            Admission queue
          </p>
          <p className="mt-1 text-xl font-semibold text-[#0a1b3f]">
            18 patients waiting
          </p>
        </div>
        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-bold tracking-wide text-emerald-700">
          Capacity healthy
        </span>
      </motion.div>

      <div className="absolute inset-x-10 bottom-10 grid grid-cols-3 gap-5">
        {["Beds available", "Clinic desks", "Room turnover"].map(
          (label, index) => (
            <motion.div
              key={label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="rounded-2xl border border-blue-50 bg-white p-5 shadow-[0_12px_28px_rgba(17,79,209,0.05)] hover:border-emerald-100 transition-colors"
            >
              <div className="h-2 w-12 rounded-full bg-blue-100" />
              <p className="mt-5 text-sm font-medium text-[#3b4c68]">{label}</p>
              <p className="mt-1 text-3xl font-semibold text-[#0a1b3f]">
                0{index + 4}
              </p>
              <div className="mt-5 h-2 rounded-full bg-blue-50 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${72 - index * 10}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                />
              </div>
            </motion.div>
          ),
        )}
      </div>
    </motion.div>
  );
}

function FinanceVisual() {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative h-[24rem] overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-[0_32px_80px_rgba(17,79,209,0.08)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(17,79,209,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_32%)]" />
      <div className="absolute inset-6 rounded-[1.6rem] border border-white/80 bg-white/70 backdrop-blur-xl shadow-inner" />

      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute left-10 top-10 rounded-2xl border border-blue-50 bg-white px-6 py-5 shadow-[0_14px_30px_rgba(17,79,209,0.06)]"
      >
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#3b4c68]">
          Revenue integrity
        </p>
        <p className="mt-2 text-3xl font-semibold text-[#0a1b3f]">$4.8M</p>
        <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-emerald-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          +12.4% this quarter
        </div>
      </motion.div>

      <div className="absolute inset-x-10 bottom-10 rounded-[1.4rem] border border-blue-50 bg-white p-6 shadow-[0_16px_34px_rgba(17,79,209,0.06)]">
        <div className="flex h-40 items-end gap-5">
          {[50, 66, 44, 74, 58, 82, 68].map((height, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              whileInView={{ height: `${height}%` }}
              transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
              className="flex-1 rounded-t-xl bg-gradient-to-t from-[#114fd1] to-[#5894F5] shadow-[0_8px_16px_rgba(17,79,209,0.2)]"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SectionShell({
  eyebrow,
  title,
  description,
  buttonLabel,
  accent = "blue",
  reverse = false,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  accent?: "blue" | "emerald";
  reverse?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-blue-50 bg-white py-24 sm:py-32 relative overflow-hidden">
      <div
        className={`mx-auto grid w-full max-w-7xl items-center gap-16 px-6 lg:px-8 ${reverse ? "lg:grid-cols-[0.95fr_1.05fr]" : "lg:grid-cols-[1.05fr_0.95fr]"}`}
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.08 }}
          className={reverse ? "lg:order-2" : ""}
        >
          <motion.div
            variants={reveal}
            transition={{ duration: 0.65 }}
            className={`mb-6 inline-flex rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] shadow-sm ${accent === "emerald" ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "border-blue-100 bg-blue-50 text-[#114fd1]"}`}
          >
            {eyebrow}
          </motion.div>
          <motion.h2
            variants={reveal}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl font-semibold tracking-[-0.06em] text-[#0a1b3f] sm:text-5xl leading-tight"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={reveal}
            transition={{ duration: 0.75 }}
            className="mt-6 max-w-xl text-lg leading-8 text-[#3b4c68]"
          >
            {description}
          </motion.p>
          <motion.div
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative group overflow-hidden inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(17,79,209,0.2)] transition-all duration-300 ${accent === "emerald" ? "bg-emerald-500" : "bg-[#114fd1]"}`}
            >
              <div className={`absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${accent === "emerald" ? "bg-gradient-to-r from-emerald-400 to-emerald-600" : "bg-gradient-to-r from-blue-400 to-[#114fd1]"}`} />
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/30 opacity-20 group-hover:animate-shine" />
              <span className="relative z-10">{buttonLabel}</span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.9, type: "spring", stiffness: 100, damping: 20 }}
          className={reverse ? "lg:order-1" : ""}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export default function ZigZagSections() {
  return (
    <>
      <SectionShell
        eyebrow="Admissions and clinics"
        title="Coordinate patient flow without operational friction."
        description="Track bed availability, triage, clinic intake, and service queues in one intelligent command layer built for high-volume facilities."
        buttonLabel="Optimize admissions"
        accent="emerald"
        reverse
      >
        <AdmissionsVisual />
      </SectionShell>

      <SectionShell
        eyebrow="Records and finance"
        title="Keep clinical records and financial truth in sync."
        description="Health-Hub connects documentation, billing, and forecasting so finance teams and care teams work from the same trusted source of truth."
        buttonLabel="See finance controls"
      >
        <FinanceVisual />
      </SectionShell>
    </>
  );
}