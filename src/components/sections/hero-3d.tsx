"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
  Sparkles,
  RoundedBox,
  Lightformer,
  MeshDistortMaterial,
} from "@react-three/drei";
import { Suspense } from "react";

function Bag() {
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.1}>
      <group rotation={[0.1, -0.3, 0]}>
        {/* Bag body */}
        <RoundedBox args={[2.2, 2.6, 1.3]} radius={0.22} smoothness={6} castShadow>
          <meshStandardMaterial
            color="#e11d48"
            metalness={0.65}
            roughness={0.22}
            envMapIntensity={1.1}
          />
        </RoundedBox>

        {/* Bag handle */}
        <mesh position={[0, 1.55, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.95, 0.1, 24, 80, Math.PI]} />
          <meshStandardMaterial
            color="#e7c989"
            metalness={0.95}
            roughness={0.15}
            envMapIntensity={1.4}
          />
        </mesh>

        {/* Gold trim ring */}
        <mesh position={[0, -0.55, 0.66]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.85, 0.05, 16, 80]} />
          <meshStandardMaterial color="#e7c989" metalness={1} roughness={0.1} />
        </mesh>

        {/* Glowing orbit ring */}
        <mesh rotation={[Math.PI / 2.3, 0.3, 0]}>
          <torusGeometry args={[2.1, 0.025, 16, 120]} />
          <meshStandardMaterial
            color="#e11d48"
            emissive="#e11d48"
            emissiveIntensity={2.4}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

function GlowRing() {
  return (
    <Float speed={1.1} rotationIntensity={1.4} floatIntensity={0.6}>
      <mesh rotation={[Math.PI / 2.6, 0.6, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 120]} />
        <meshStandardMaterial
          color="#e7c989"
          emissive="#e7c989"
          emissiveIntensity={1.6}
          metalness={1}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function AbstractOrb() {
  return (
    <Float speed={0.8} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh position={[3.1, 1.4, -1.5]} scale={0.8}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#9f1239"
          roughness={0.25}
          metalness={0.4}
          distort={0.35}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D({
  reduced = false,
  interactive = true,
}: {
  reduced?: boolean;
  interactive?: boolean;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, reduced ? 1.2 : 2]}
      camera={{ position: [0, 0, 7.5], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: interactive ? "auto" : "none" }}
    >
      <color attach="background" args={["#08080b"]} />
      <fog attach="fog" args={["#08080b", 9, 18]} />

      <ambientLight intensity={0.35} />
      <directionalLight
        position={[5, 6, 4]}
        intensity={2.2}
        color="#fff1f3"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-4, 2, 3]} intensity={40} color="#e11d48" distance={14} />
      <pointLight position={[3, -2, 2]} intensity={18} color="#e7c989" distance={12} />

      <Suspense fallback={null}>
        <Bag />
        {!reduced && <AbstractOrb />}
        {!reduced && <GlowRing />}
        <Sparkles
          count={reduced ? 24 : 60}
          scale={[12, 8, 6]}
          size={reduced ? 2 : 3}
          speed={0.4}
          color="#fda4af"
          opacity={0.7}
        />
        {!reduced && (
          <Sparkles
            count={28}
            scale={[9, 6, 5]}
            size={5}
            speed={0.25}
            color="#e7c989"
            opacity={0.5}
          />
        )}
        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={0.5}
          scale={16}
          blur={2.6}
          far={6}
          color="#000000"
        />
        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={3}
            position={[0, 4, -3]}
            scale={[8, 4, 1]}
            color="#ffd9e1"
          />
          <Lightformer
            form="circle"
            intensity={2}
            position={[-4, 1, 2]}
            scale={3}
            color="#e11d48"
          />
          <Lightformer
            form="rect"
            intensity={2}
            position={[4, -2, 2]}
            scale={[6, 3, 1]}
            color="#e7c989"
          />
        </Environment>
      </Suspense>

      <OrbitControls
        enabled={interactive}
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.9}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}
