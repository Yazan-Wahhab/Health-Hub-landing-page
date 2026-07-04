'use client';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera, OrbitControls } from '@react-three/drei';

const LogoFace = ({ position, rotation, scale, color }) => {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* الإطار الخارجي - الجزء الأفقي (السفلي) */}
      <mesh position={[0, -0.325, 0]}>
        <planeGeometry args={[0.9, 0.25]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* الإطار الخارجي - الجزء العمودي (الجانبي) 
          تم زيادة الطول من 0.65 إلى 0.70 ليتداخل مع الجزء الأفقي تماماً 
          ويمنع ظهور أي فراغ أبيض في الزاوية (الحواف من تحت) */}
      <mesh position={[-0.325, 0.1, 0]}>
        <planeGeometry args={[0.25, 0.70]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* المربع الداخلي */}
      <mesh position={[0.175, 0.175, 0]}>
        <planeGeometry args={[0.55, 0.55]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
};

const LogoModel = () => {
  return (
    <group>
      {/* الوجه الأيسر - أزرق داكن */}
      <LogoFace 
        position={[0, 0, 0.5]} 
        rotation={[0, 0, 0]} 
        scale={[1, 1, 1]} 
        color="#114FD1" 
      />
      
      {/* الوجه الأيمن - أزرق فاتح */}
      <LogoFace 
        position={[0.5, 0, 0]} 
        rotation={[0, Math.PI / 2, 0]} 
        // تم عكس المحور X لضمان بقاء الإطار الخارجي على الحواف الصحيحة
        scale={[-1, 1, 1]} 
        color="#5894F5" 
      />
      
      {/* الوجه العلوي - أزرق متوسط */}
      <LogoFace 
        position={[0, 0.5, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        // تم عكس المحور Y لضمان توضع الإطار في مكانه الدقيق
        scale={[1, -1, 1]} 
        color="#2B72E6" 
      />
    </group>
  );
};

export default function Logo3D() {
  return (
    // تم إضافة خلفية بيضاء (bg-white) لضمان ظهور الفراغات (Gaps) بلون أبيض ناصع
    <div className="w-full h-[400px] flex items-center justify-center bg-white">
      <Canvas>
        <OrthographicCamera makeDefault position={[5, 5, 5]} zoom={150} />
        <LogoModel />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}