"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, PerspectiveCamera, Environment, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// 3D Scene components (Yahan aap apne 3D models import karenge)
function Scene() {
    const scroll = useScroll();
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

    useFrame((state, delta) => {
        // Scroll ki value 0 se 1 tak hoti hai
        const offset = scroll.offset;

        // Camera movement logic: Scroll ke saath position badlegi
        // 0 = Meeting, 0.33 = Strategy, 0.66 = Teamwork, 1.0 = Delivery
        state.camera.position.z = 10 - offset * 20;
        state.camera.position.y = offset * 5;
        state.camera.lookAt(0, 0, 0);
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />

            {/* Stage 1: Meeting Table */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[4, 0.5, 2]} />
                <meshStandardMaterial color="brown" />
            </mesh>

            {/* Stage 2: Strategy Board */}
            <mesh position={[0, 5, -10]}>
                <planeGeometry args={[6, 4]} />
                <meshStandardMaterial color="white" />
            </mesh>

            {/* Stage 3: Teamwork area */}
            <mesh position={[5, 0, -20]}>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="blue" />
            </mesh>
        </>
    );
}

export default function Process2() {
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <Canvas>
                <ScrollControls pages={4} damping={0.2}>
                    <Scene />
                </ScrollControls>
            </Canvas>

            {/* Scrollable HTML Content */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
                <section style={{ height: '100vh', padding: '50px' }}><h1>1. Meeting Room</h1></section>
                <section style={{ height: '100vh', padding: '50px' }}><h1>2. Strategy Planning</h1></section>
                <section style={{ height: '100vh', padding: '50px' }}><h1>3. Team Work</h1></section>
                <section style={{ height: '100vh', padding: '50px' }}><h1>4. Project Delivery</h1></section>
            </div>
        </div>
    );
}