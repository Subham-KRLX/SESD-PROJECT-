import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { MeshDistortMaterial, Sphere, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
function DataCore() {
    const meshRef = useRef(null);
    const [hovered, setHover] = useState(false);
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.x = Math.cos(t / 4) / 8;
        meshRef.current.rotation.y = Math.sin(t / 4) / 8;
        meshRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    });
    return (_jsx(Float, { speed: 2, rotationIntensity: 0.5, floatIntensity: 0.5, children: _jsx(Sphere, { ref: meshRef, args: [1, 100, 100], onPointerOver: () => setHover(true), onPointerOut: () => setHover(false), scale: hovered ? 1.1 : 1, children: _jsx(MeshDistortMaterial, { color: hovered ? "#3b82f6" : "#1e40af", attach: "material", distort: 0.4, speed: 3, roughness: 0, metalness: 1 }) }) }));
}
export default function TechCanvas() {
    return (_jsx("div", { className: "absolute inset-0 z-0 opacity-40", children: _jsxs(Canvas, { camera: { position: [0, 0, 4] }, children: [_jsx("ambientLight", { intensity: 0.5 }), _jsx("pointLight", { position: [10, 10, 10], intensity: 1.5, color: "#3b82f6" }), _jsx("pointLight", { position: [-10, -10, -10], intensity: 0.5, color: "#60a5fa" }), _jsx(DataCore, {}), _jsx(OrbitControls, { enableZoom: false, autoRotate: true, autoRotateSpeed: 0.5 })] }) }));
}
//# sourceMappingURL=TechCanvas.js.map