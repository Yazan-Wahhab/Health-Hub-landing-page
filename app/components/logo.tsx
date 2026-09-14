"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrthographicCamera,
  OrbitControls,
  Sparkles,
  Torus,
  Stars,
  Html,
} from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { motion as motionHtml } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslate } from "./translation-provider";

function HyperactiveNetwork({ isMobile }: { isMobile: boolean }) {
  const ringsRef = useRef<any>(null);
  const starsRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x += delta * 0.15;
      ringsRef.current.rotation.y += delta * 0.25;
      ringsRef.current.rotation.z -= delta * 0.1;
    }
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group position={[0, 0, -15]}>
      <group ref={ringsRef} scale={4}>
        <Torus
          args={[2, 0.01, 16, isMobile ? 32 : 64]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial
            color="#5894F5"
            transparent
            opacity={0.2}
            wireframe
          />
        </Torus>
        <Torus
          args={[2.5, 0.01, 16, isMobile ? 32 : 64]}
          rotation={[0, Math.PI / 3, 0]}
        >
          <meshBasicMaterial
            color="#10B981"
            transparent
            opacity={0.15}
            wireframe
          />
        </Torus>
        <Torus
          args={[3, 0.01, 16, isMobile ? 32 : 64]}
          rotation={[0, 0, Math.PI / 4]}
        >
          <meshBasicMaterial
            color="#114FD1"
            transparent
            opacity={0.25}
            wireframe
          />
        </Torus>
      </group>
      <group ref={starsRef}>
        <Stars
          radius={10}
          depth={50}
          count={isMobile ? 200 : 800}
          factor={4}
          saturation={1}
          fade
          speed={1}
        />
      </group>
    </group>
  );
}

interface LogoFaceProps {
  initialPosition: [number, number, number];
  animatePosition: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  lineColors: [string, string]; // [لون بداية الخط، لون نهاية الخط والصندوق]
  label: string;
  featureText: string;
  arrowDirection: "left" | "right";
  mobileAlign?: "left" | "right" | "center";
  isMobile: boolean;
  language: "ar" | "en";
}

const LogoFace = ({
  initialPosition,
  animatePosition,
  rotation,
  scale,
  color,
  lineColors,
  label,
  featureText,
  arrowDirection,
  mobileAlign = "center",
  isMobile,
  language,
}: LogoFaceProps) => {
  const i = initialPosition;
  const a1 = animatePosition;
  const a2 = [a1[0] * 1.5, a1[1] * 1.5, a1[2] * 1.5];

  // الألوان الخاصة بالنصوص والخطوط المنبثقة
  const startColor = lineColors[0];
  const endColor = lineColors[1];

  return (
    <motion.group
      animate={{
        x: [i[0], i[0], a1[0], a1[0], i[0], i[0], a2[0]],
        y: [i[1], i[1], a1[1], a1[1], i[1], i[1], a2[1]],
        z: [i[2], i[2], a1[2], a1[2], i[2], i[2], a2[2]],
      }}
      transition={{
        duration: 9,
        times: [0, 0.31, 0.44, 0.61, 0.72, 0.83, 1],
        ease: "easeInOut",
      }}
      rotation={rotation}
      scale={scale}
    >
      <motion.group
        animate={{
          rotateZ: [0, 0, Math.PI * 2, Math.PI * 2, Math.PI * 2],
        }}
        transition={{
          duration: 9,
          times: [0, 0.31, 0.6, 0.72, 1],
          ease: "easeInOut",
        }}
      >
        {/* 💡 ألوان القطع الـ 3D الأساسية بقيت كما هي دون تغيير (color) */}
        <mesh position={[0, -0.325, 0]}>
          <planeGeometry args={[0.9, 0.25]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh position={[-0.325, 0.1, 0]}>
          <planeGeometry args={[0.25, 0.7]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh position={[0.175, 0.175, 0]}>
          <planeGeometry args={[0.55, 0.55]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </motion.group>

      <Html center zIndexRange={[100, 0]}>
        <div dir="ltr" className="relative w-0 h-0 flex items-center justify-center pointer-events-none">
          
          {/* Label الجانبي (DATA CORE, SECURITY, etc.) */}
          <motionHtml.div
            animate={{
              scale: [0, 0, 1, 1, 0, 0],
              opacity: [0, 0, 1, 1, 0, 0],
              y: [20, 20, -55, -55, 20, 20],
            }}
            transition={{
              duration: 9,
              times: [0, 0.44, 0.47, 0.57, 0.6, 1],
              ease: "backOut",
            }}
            className="absolute flex items-center gap-2.5 px-5 py-2.5 rounded-full whitespace-nowrap"
            style={{
              background: `linear-gradient(135deg, rgba(2,6,23,0.8) 0%, rgba(2,6,23,0.5) 100%)`,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: `1px solid ${startColor}40`,
              boxShadow: `0 15px 35px rgba(0,0,0,0.6), inset 0 0 20px ${startColor}15`,
            }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: startColor }}
              ></span>
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5 shadow-[0_0_8px_currentColor]"
                style={{ backgroundColor: startColor, color: startColor }}
              ></span>
            </span>
            <span 
              className="text-transparent bg-clip-text text-xs md:text-[13px] font-black uppercase tracking-[0.25em]"
              style={{ 
                backgroundImage: `linear-gradient(to right, white, ${startColor})`,
                filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.6))" 
              }}
            >
              {label}
            </span>
          </motionHtml.div>

          {/* النقطة المركزية المشعة للخط */}
          <motionHtml.div
            animate={{ opacity: [0, 0, 1, 1, 0, 0], scale: [0, 0, 1, 1, 0, 0] }}
            transition={{
              duration: 9,
              times: [0, 0.44, 0.46, 0.59, 0.61, 1],
              ease: "backOut",
            }}
            className="absolute flex items-center justify-center"
          >
            <div
              className={`rounded-full z-20 ${isMobile ? "w-1.5 h-1.5" : "w-2.5 h-2.5"}`}
              style={{
                backgroundColor: startColor,
                boxShadow: `0 0 15px 3px ${startColor}`,
              }}
            />
            <div
              className={`absolute rounded-full opacity-40 animate-ping ${isMobile ? "w-5 h-5" : "w-8 h-8"}`}
              style={{ backgroundColor: startColor }}
            />
          </motionHtml.div>

          {/* الخط والصندوق الفخم (الأمان، السرعة، الخ) */}
          <motionHtml.div
            animate={{
              opacity: [0, 0, 1, 1, 0, 0],
              scale: [0.95, 0.95, 1, 1, 0.95, 0.95],
              filter: isMobile
                ? ["none", "none", "none", "none", "none", "none"]
                : [
                    "blur(8px)",
                    "blur(8px)",
                    "blur(0px)",
                    "blur(0px)",
                    "blur(8px)",
                    "blur(8px)",
                  ],
            }}
            transition={{
              duration: 9,
              times: [0, 0.44, 0.46, 0.59, 0.61, 1],
              ease: "easeInOut",
            }}
            className={`absolute flex pointer-events-none will-change-transform transform-gpu ${
              isMobile
                ? mobileAlign === "left"
                  ? "flex-col top-0 left-0 pt-2 items-start"
                  : mobileAlign === "right"
                    ? "flex-col top-0 right-0 pt-2 items-end"
                    : "flex-col top-0 left-1/2 -translate-x-1/2 pt-2 items-center"
                : arrowDirection === "left"
                  ? "flex-row-reverse right-0 top-1/2 -translate-y-1/2 pr-3 md:pr-4 items-center"
                  : "flex-row left-0 top-1/2 -translate-y-1/2 pl-3 md:pl-4 items-center"
            }`}
          >
            {/* الخط المتدرج بالألوان */}
            <div
              className={`${isMobile ? "w-[2px] h-8 md:h-10" : "h-[2px] w-16 md:w-28"}`}
              style={{
                background: isMobile
                  ? `linear-gradient(to bottom, ${startColor}, ${endColor})`
                  : arrowDirection === "left"
                    ? `linear-gradient(to left, ${startColor}, ${endColor})`
                    : `linear-gradient(to right, ${startColor}, ${endColor})`,
                boxShadow: `0 0 12px ${startColor}80`,
              }}
            />

            {/* الصندوق الزجاجي الفخم (Premium Glassmorphism) */}
            <div
              className={`relative rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 ${
                isMobile ? "px-5 py-2" : "px-8 py-3.5 mx-2"
              }`}
              style={{
                background: `linear-gradient(135deg, rgba(5, 10, 30, 0.65) 0%, rgba(2, 6, 23, 0.95) 100%)`,
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: `1px solid ${endColor}40`,
                borderTop: `1px solid rgba(255,255,255,0.15)`,
                borderLeft: `1px solid rgba(255,255,255,0.1)`,
                boxShadow: `0 20px 40px rgba(0, 0, 0, 0.6), inset 0 0 25px ${endColor}15, 0 0 20px ${endColor}20`,
              }}
            >
              {/* إضاءة داخلية متوهجة خلف النص */}
              <div 
                 className="absolute inset-0 opacity-40 pointer-events-none" 
                 style={{ background: `radial-gradient(circle at center, ${endColor}60 0%, transparent 70%)`}} 
              />

              <div
                className={`absolute ${
                  isMobile
                    ? "top-0 left-0 w-full h-[2px]"
                    : arrowDirection === "left"
                      ? "top-0 right-0 w-[3px] h-full"
                      : "top-0 left-0 w-[3px] h-full"
                }`}
                style={{ 
                  background: `linear-gradient(to bottom, ${endColor}, ${endColor}40)`,
                  boxShadow: `0 0 12px ${endColor}`
                }}
              />

              <span
                className={`relative z-10 text-transparent bg-clip-text font-black whitespace-nowrap ${
                  isMobile
                    ? "text-[14px] tracking-[0.05em]"
                    : "text-base md:text-xl tracking-[0.1em]"
                }`}
                style={{ 
                  backgroundImage: `linear-gradient(to bottom right, white, ${endColor})`,
                  filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.8))` 
                }}
              >
                {featureText}
              </span>
            </div>
          </motionHtml.div>
        </div>
      </Html>
    </motion.group>
  );
};

const LogoModel = ({ isMobile }: { isMobile: boolean }) => {
  const { language, t } = useTranslate();
  const responsiveScales = isMobile
    ? [0, 0.75, 0.75, 0.35, 1.2]
    : [0, 1.3, 1.3, 0.5, 1.8];

  // 💡 التعديل هنا: زيادة المسافة بشوي صغيرة للديسكتوب لتكون أبعد قليلاً عن المركز (بين المسافة القديمة المتباعدة جداً والمتقاربة)
  const pos1: [number, number, number] = isMobile
    ? [-1.4, -2.4, 1.5]
    : [-3.2, -2.8, 1.9]; 
  const pos2: [number, number, number] = isMobile
    ? [1.4, -2.4, -1.5]
    : [3.2, -2.8, -1.9]; 
  const pos3: [number, number, number] = isMobile 
    ? [0, 2.6, 0] 
    : [0, 3.6, 0];       

  return (
    <motion.group
      animate={{
        rotateY: [Math.PI * 8, 0, 0, -Math.PI * 4, -Math.PI * 4],
        rotateZ: [Math.PI * 2, 0, 0, -Math.PI * 2, -Math.PI * 2],
        scale: responsiveScales,
        y: [-8, 0, 0, 0, 0],
      }}
      transition={{
        duration: 9,
        times: [0, 0.29, 0.72, 0.83, 1],
        ease: "easeInOut",
      }}
    >
      <LogoFace
        initialPosition={[0, 0, 0.5]}
        animatePosition={pos1}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
        color="#114FD1" // 🔹 لون القطعة الأساسية الأزرق لم يتغير
        lineColors={["#3b82f6", "#60a5fa"]} // ألوان الكلمة (أزرق)
        label={t("DATA CORE")}
        featureText={t("السرعة")}
        arrowDirection="left"
        mobileAlign="left"
        isMobile={isMobile}
        language={language}
      />
      <LogoFace
        initialPosition={[0.5, 0, 0]}
        animatePosition={pos2}
        rotation={[0, Math.PI / 2, 0]}
        scale={[-1, 1, 1]}
        color="#5894F5" // 🔹 لون القطعة الأساسية الأزرق الفاتح لم يتغير
        lineColors={["#10B981", "#34d399"]} // ألوان الكلمة (أخضر)
        label={t("SECURITY")}
        featureText={t("المصداقية")}
        arrowDirection="right"
        mobileAlign="right"
        isMobile={isMobile}
        language={language}
      />
      <LogoFace
        initialPosition={[0, 0.5, 0]}
        animatePosition={pos3}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1, -1, 1]}
        color="#2B72E6" // 🔹 لون القطعة الأساسية الأزرق لم يتغير
        lineColors={["#10B981", "#3b82f6"]} // ألوان الكلمة (دمج أخضر مع أزرق)
        label={t("SYNC")}
        featureText={t("الأمان")}
        arrowDirection="right"
        mobileAlign="center"
        isMobile={isMobile}
        language={language}
      />
    </motion.group>
  );
};

export default function Logo3D({ className = "" }: { className?: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full z-0 pointer-events-none ${className}`}
    >
      <Canvas dpr={isMobile ? 1 : [1, 2]} performance={{ min: 0.5 }}>
        <OrthographicCamera makeDefault position={[5, 5, 5]} zoom={100} />
        <HyperactiveNetwork isMobile={isMobile} />
        <Sparkles
          count={isMobile ? 30 : 150}
          scale={20}
          size={2.5}
          speed={0.4}
          opacity={0.25}
          color="#10B981"
        />
        <Sparkles
          count={isMobile ? 20 : 100}
          scale={20}
          size={3}
          speed={0.3}
          opacity={0.2}
          color="#5894F5"
        />
        <LogoModel isMobile={isMobile} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}