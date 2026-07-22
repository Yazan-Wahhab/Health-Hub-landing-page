"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera, OrbitControls, Sparkles, Torus, Stars } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useRef } from 'react';

function HyperactiveNetwork() {
  const ringsRef = useRef<any>(null);
  const starsRef = useRef<any>(null);
  
  useFrame((state, delta) => {
    if (ringsRef.current) {
      // تم إبطاء السرعة بشكل كبير لتصبح مريحة وراقية
      ringsRef.current.rotation.x += delta * 0.15;
      ringsRef.current.rotation.y += delta * 0.25;
      ringsRef.current.rotation.z -= delta * 0.1;
    }
    if (starsRef.current) {
      // حركة نجوم بطيئة ومريحة
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

// 🌟 الواجهة الجديدة التي تحل مشكلة الـ Build
interface LogoFaceProps {
  initialPosition: [number, number, number];
  animatePosition: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
}

// 🌟 تطبيق الواجهة هنا
const LogoFace = ({ initialPosition, animatePosition, rotation, scale, color }: LogoFaceProps) => {
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
  );
};

const LogoModel = () => {
  return (
    <motion.group
      animate={{ 
        rotateY: [Math.PI * 8, 0, 0, -Math.PI * 4, -Math.PI * 4], 
        rotateZ: [Math.PI * 2, 0, 0, -Math.PI * 2, -Math.PI * 2],
        scale: [0, 1.3, 1.3, 0.5, 1.8], 
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
        animatePosition={[-5, -4, 3]} 
        rotation={[0, 0, 0]} 
        scale={[1, 1, 1]} 
        color="#114FD1" 
      />
      <LogoFace 
        initialPosition={[0.5, 0, 0]} 
        animatePosition={[5, -4, -3]} 
        rotation={[0, Math.PI / 2, 0]} 
        scale={[-1, 1, 1]} 
        color="#5894F5" 
      />
      <LogoFace 
        initialPosition={[0, 0.5, 0]} 
        animatePosition={[0, 5.5, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        scale={[1, -1, 1]} 
        color="#2B72E6" 
      />
    </motion.group>
  );
};

// 🌟 إضافة تعريف النوع لـ className لتجنب أي أخطاء مشابهة
export default function Logo3D({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute top-0 left-0 w-full h-full z-0 pointer-events-none ${className}`}>
      <Canvas>
        <OrthographicCamera makeDefault position={[5, 5, 5]} zoom={100} />
        <HyperactiveNetwork />
        
        {/* تخفيف كثافة وسرعة الجزيئات لتصبح أنعم */}
        <Sparkles count={150} scale={20} size={2.5} speed={0.4} opacity={0.25} color="#10B981" />
        <Sparkles count={100} scale={20} size={3} speed={0.3} opacity={0.2} color="#5894F5" />
        
        <LogoModel />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}