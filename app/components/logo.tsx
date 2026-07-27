"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera, OrbitControls, Sparkles, Torus, Stars, Html } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { motion as motionHtml } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function HyperactiveNetwork() {
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
        <Torus args={[2, 0.01, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#5894F5" transparent opacity={0.2} wireframe />
        </Torus>
        <Torus args={[2.5, 0.01, 16, 64]} rotation={[0, Math.PI / 3, 0]}>
          <meshBasicMaterial color="#10B981" transparent opacity={0.15} wireframe />
        </Torus>
        <Torus args={[3, 0.01, 16, 64]} rotation={[0, 0, Math.PI / 4]}>
          <meshBasicMaterial color="#114FD1" transparent opacity={0.25} wireframe />
        </Torus>
      </group>
      <group ref={starsRef}>
        <Stars radius={10} depth={50} count={800} factor={4} saturation={1} fade speed={1} />
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
  label: string;
  featureText: string;
  arrowDirection: "left" | "right";
  isMobile: boolean;
}

const LogoFace = ({ initialPosition, animatePosition, rotation, scale, color, label, featureText, arrowDirection, isMobile }: LogoFaceProps) => {
  const i = initialPosition;
  const a1 = animatePosition;
  const a2 = [a1[0] * 1.5, a1[1] * 1.5, a1[2] * 1.5]; 

  return (
    <motion.group 
      animate={{ 
        x: [i[0], i[0], a1[0], a1[0], i[0], i[0], a2[0]], 
        y: [i[1], i[1], a1[1], a1[1], i[1], i[1], a2[1]], 
        z: [i[2], i[2], a1[2], a1[2], i[2], i[2], a2[2]] 
      }}
      transition={{ 
        duration: 9, 
        times: [0, 0.31, 0.44, 0.61, 0.72, 0.83, 1], 
        ease: "easeInOut" 
      }} 
      rotation={rotation} 
      scale={scale}
    >
      <motion.group
        animate={{
          rotateZ: [0, 0, Math.PI * 2, Math.PI * 2, Math.PI * 2]
        }}
        transition={{
          duration: 9,
          times: [0, 0.31, 0.6, 0.72, 1], 
          ease: "easeInOut"
        }}
      >
        <mesh position={[0, -0.325, 0]}>
          <planeGeometry args={[0.9, 0.25]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh position={[-0.325, 0.1, 0]}>
          <planeGeometry args={[0.25, 0.70]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh position={[0.175, 0.175, 0]}>
          <planeGeometry args={[0.55, 0.55]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </motion.group>

      {/* Html center ensures the root starts at the exact 3D center */}
      <Html center zIndexRange={[100, 0]}>
        
        {/* حاوية صفرية الأبعاد (w-0 h-0) لإجبار العناصر على الانطلاق من نقطة الارتكاز المليمتري */}
        <div className="relative w-0 h-0 flex items-center justify-center pointer-events-none">
          
          {/* الليبل الأساسي للقطعة (يتحرك للأعلى والأسفل بحرية دون التأثير على الخطوط) */}
          <motionHtml.div
            animate={{ 
              scale: [0, 0, 1, 1, 0, 0],
              opacity: [0, 0, 1, 1, 0, 0],
              y: [20, 20, -45, -45, 20, 20] 
            }}
            transition={{ 
              duration: 9, 
              times: [0, 0.44, 0.47, 0.57, 0.60, 1], 
              ease: "backOut" 
            }}
            className="absolute flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-md whitespace-nowrap"
            style={{ 
              backgroundColor: `${color}15`, 
              border: `1px solid ${color}50`,
              boxShadow: `0 10px 30px ${color}30, inset 0 0 15px ${color}20`
            }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: color }}></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 shadow-sm" style={{ backgroundColor: color }}></span>
            </span>
            <span className="text-white text-xs md:text-sm font-black uppercase tracking-[0.2em] drop-shadow-md">
              {label}
            </span>
          </motionHtml.div>

          {/* 1. النقطة المضيئة (مثبتة بدقة في المركز 0,0) */}
          <motionHtml.div
            animate={{ opacity: [0, 0, 1, 1, 0, 0], scale: [0, 0, 1, 1, 0, 0] }}
            transition={{ duration: 9, times: [0, 0.44, 0.46, 0.59, 0.61, 1], ease: "backOut" }}
            className="absolute flex items-center justify-center"
          >
            <div className={`rounded-full z-20 ${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} style={{ backgroundColor: color, boxShadow: `0 0 12px 2px ${color}` }} />
            <div className={`absolute rounded-full opacity-40 animate-ping ${isMobile ? 'w-4 h-4' : 'w-6 h-6'}`} style={{ backgroundColor: color }} />
          </motionHtml.div>

          {/* 2. الخط والصندوق (ينطلقان بشكل هندسي دقيق من المركز) */}
          <motionHtml.div
            animate={{ 
              opacity: [0, 0, 1, 1, 0, 0], 
              scale: [0.95, 0.95, 1, 1, 0.95, 0.95],
              filter: ["blur(8px)", "blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)", "blur(8px)"]
            }}
            transition={{ duration: 9, times: [0, 0.44, 0.46, 0.59, 0.61, 1], ease: "easeInOut" }}
            className={`absolute flex items-center ${
              isMobile 
                ? 'flex-col top-0 pt-2' // موبايل: الحافة العلوية بالمركز، ويتمدد للأسفل
                : arrowDirection === "left" 
                  ? 'flex-row-reverse right-0 pr-2 md:pr-3' // ديسكتوب: الحافة اليمنى بالمركز، ويتمدد لليسار
                  : 'flex-row left-0 pl-2 md:pl-3' // ديسكتوب: الحافة اليسرى بالمركز، ويتمدد لليمين
            }`}
          >
            {/* الخط الزجاجي */}
            <div
              className={`${isMobile ? 'w-[1.5px] h-8 md:h-12' : 'h-[1.5px] w-12 md:w-24'}`}
              style={{
                background: isMobile
                  ? `linear-gradient(to bottom, ${color}ff, ${color}10)`
                  : arrowDirection === "left"
                    ? `linear-gradient(to left, ${color}ff, ${color}10)`
                    : `linear-gradient(to right, ${color}ff, ${color}10)`
              }}
            />

            {/* صندوق النص الاحترافي */}
            <div
              className={`relative backdrop-blur-xl rounded-md overflow-hidden border ${
                isMobile ? 'px-4 py-1.5 mt-1' : 'px-6 py-2.5 mx-1'
              }`}
              style={{
                backgroundColor: 'rgba(2, 6, 23, 0.8)',
                borderColor: `${color}40`,
                boxShadow: `0 12px 30px rgba(0, 0, 0, 0.7), inset 0 0 15px ${color}15`
              }}
            >
              {/* إضاءة الحواف العلوية/الجانبية */}
              <div 
                className={`absolute ${
                  isMobile
                    ? 'top-0 left-0 w-full h-[2px]' 
                    : arrowDirection === 'left' 
                      ? 'top-0 right-0 w-[2px] h-full' 
                      : 'top-0 left-0 w-[2px] h-full' 
                }`} 
                style={{ backgroundColor: color }} 
              />
              
              <span
                className={`text-white font-black whitespace-nowrap drop-shadow-md ${
                  isMobile ? 'text-[13px] tracking-[0.05em]' : 'text-sm md:text-lg tracking-[0.1em]'
                }`}
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

const LogoModel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const responsiveScales = isMobile 
    ? [0, 0.75, 0.75, 0.35, 1.2]  
    : [0, 1.3, 1.3, 0.5, 1.8];    

  const pos1: [number, number, number] = isMobile ? [-1.8, -2.4, 1.5] : [-3.8, -3.2, 2.2];
  const pos2: [number, number, number] = isMobile ? [1.8, -2.4, -1.5] : [3.8, -3.2, -2.2];
  const pos3: [number, number, number] = isMobile ? [0, 2.6, 0] : [0, 4.2, 0];

  return (
    <motion.group
      animate={{ 
        rotateY: [Math.PI * 8, 0, 0, -Math.PI * 4, -Math.PI * 4], 
        rotateZ: [Math.PI * 2, 0, 0, -Math.PI * 2, -Math.PI * 2],
        scale: responsiveScales, 
        y: [-8, 0, 0, 0, 0]
      }} 
      transition={{ 
        duration: 9, 
        times: [0, 0.29, 0.72, 0.83, 1], 
        ease: "easeInOut" 
      }}
    >
      <LogoFace 
        initialPosition={[0, 0, 0.5]} 
        animatePosition={pos1} 
        rotation={[0, 0, 0]} 
        scale={[1, 1, 1]} 
        color="#114FD1" 
        label="DATA CORE"
        featureText="السرعة"
        arrowDirection="left"
        isMobile={isMobile}
      />
      <LogoFace 
        initialPosition={[0.5, 0, 0]} 
        animatePosition={pos2} 
        rotation={[0, Math.PI / 2, 0]} 
        scale={[-1, 1, 1]} 
        color="#5894F5" 
        label="SECURITY"
        featureText="المصداقية"
        arrowDirection="right"
        isMobile={isMobile}
      />
      <LogoFace 
        initialPosition={[0, 0.5, 0]} 
        animatePosition={pos3} 
        rotation={[-Math.PI / 2, 0, 0]} 
        scale={[1, -1, 1]} 
        color="#2B72E6" 
        label="SYNC"
        featureText="الأمان"
        arrowDirection="right"
        isMobile={isMobile}
      />
    </motion.group>
  );
};

export default function Logo3D({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute top-0 left-0 w-full h-full z-0 pointer-events-none ${className}`}>
      <Canvas>
        <OrthographicCamera makeDefault position={[5, 5, 5]} zoom={100} />
        <HyperactiveNetwork />
        <Sparkles count={150} scale={20} size={2.5} speed={0.4} opacity={0.25} color="#10B981" />
        <Sparkles count={100} scale={20} size={3} speed={0.3} opacity={0.2} color="#5894F5" />
        <LogoModel />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}