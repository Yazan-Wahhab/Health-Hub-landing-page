import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "Health-Hub | By Arachnotech",
  description: "Enterprise hospital management platform.",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      url: "https://my.health-hubs.net/_next/image?url=%2Fassets%2Fimages%2Ffacicon.png&w=1080&q=75",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased text-slate-900 bg-white`}>
        
        {/* 🌟 الخلفية العالمية الثابتة (Global Background) 🌟 */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          {/* شبكة الخلفية (Grid Pattern) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_80%,transparent_100%)]"></div>
          
          {/* البقع اللونية (Blobs) */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[600px] w-[600px] rounded-full bg-[#10B981] opacity-[0.08] blur-[120px]" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[600px] w-[600px] rounded-full bg-[#114FD1] opacity-[0.08] blur-[120px]" />
          
          {/* بقعة إضافية خفيفة في المنتصف لربط الأقسام */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[#2B72E6] opacity-[0.03] blur-[150px]" />
        </div>

        
        {/* المحتوى الرئيسي */}
        <main className="pt-20 relative z-0">
          {children}
        </main>
      </body>
    </html>
  );
}