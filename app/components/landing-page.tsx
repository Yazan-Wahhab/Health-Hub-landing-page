"use client";

import { useState } from "react";
import HeroSection from "./hero";
import Intro from "./intro";
import ZigZagSections from "./zigzag-sections";

export default function LandingPage() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-950">
      {!introComplete ? (
        <Intro onComplete={() => setIntroComplete(true)} />
      ) : null}

      <main className="relative overflow-hidden">
        <HeroSection />
        <ZigZagSections />

        <section id="contact" className="bg-white py-24">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-400">
                Enterprise readiness
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">
                Built for hospitals that need clarity, control, and speed.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                From the front desk to the finance office, Health-Hub gives
                every team a premium operating surface that feels calm, secure,
                and precise.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
                Contact Arachnotech
              </p>
              <p className="mt-3 max-w-sm text-base leading-7 text-slate-600">
                Schedule a private walkthrough to see workflows, analytics, and
                implementation options tailored to your hospital network.
              </p>
              <button
                type="button"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(17,79,209,0.22)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-blue-800"
              >
                Book a private demo
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
