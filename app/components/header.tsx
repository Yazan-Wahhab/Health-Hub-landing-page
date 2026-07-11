"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="relative w-full z-50 bg-white border-b-2 border-blue-50 shadow-[0_8px_30px_rgba(17,79,209,0.06)]">
      <div className="mx-auto flex h-28 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* القسم الأيسر: اللوغو واسم المنتج */}
        <Link href="/" className="flex items-center gap-5 group">
          {/* حاوية اللوغو الاحترافية */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#114FD1] to-[#10B981] p-[2px] shadow-[0_12px_24px_rgba(17,79,209,0.25)] transition-transform duration-300 group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white">
              <img 
                src="https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=750&q=75" 
                alt="Arachnotech" 
                className="h-10 w-10 object-contain"
              />
            </div>
          </div>
          
          {/* نصوص فخمة وواضحة */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0a1b3f] leading-none">
              Health<span className="text-[#114FD1]">-Hub</span>
            </h1>
            <p className="mt-1.5 text-xs font-extrabold text-[#10B981] uppercase tracking-[0.25em]">
              Smart Care Platform
            </p>
          </div>
        </Link>

        {/* القسم الأوسط: الروابط بألوان صلبة واضحة */}
        <nav className="hidden md:flex items-center gap-10">
          {["Features", "Modules", "Integration"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-base font-bold text-[#0a1b3f] transition-colors hover:text-[#114FD1]"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* القسم الأيمن: أزرار قوية ومشبعة */}
        <div className="flex items-center gap-6">
          <Link 
            href="#login"
            className="hidden sm:block text-sm font-bold text-[#3b4c68] hover:text-[#114FD1] transition-colors"
          >
            System Login
          </Link>
          <a
            href="#demo"
            className="rounded-full bg-[#114FD1] px-8 py-4 text-sm font-bold text-white shadow-[0_12px_24px_rgba(17,79,209,0.3)] transition-all duration-300 hover:bg-[#0a1b3f] hover:shadow-[0_12px_24px_rgba(10,27,63,0.3)] hover:-translate-y-1"
          >
            Request Demo
          </a>
        </div>

      </div>
    </header>
  );
}