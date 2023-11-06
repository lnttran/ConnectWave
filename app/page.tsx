"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Iframe from "react-iframe";
import { Scene } from "./components/Landing/Scene";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
export default function Home() {
  const [perfSucks, degrade] = useState(false)
  return (
    <div style={{ width: "100vw", height: "250vh" }} className="bg-background" >
      <Canvas shadows
      // //device pixel ratio and control revolution of canvas
      // Tran set variable, xong roi xai no nhu la tailwind luon
      // nhung ma Tran nen sai shadcn variable, tai tran set trong theme
      // dpr={[2, perfSucks ? 1.5 : 2]}
      // //camera position x, y, z coordinate ; point of views the smaller number, the larger the object
      // camera={{ position: [0, 0.9, 10], fov: 50 }}
      >
        <ambientLight />
        <directionalLight color="gray" intensity={10} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div >
  );
}
