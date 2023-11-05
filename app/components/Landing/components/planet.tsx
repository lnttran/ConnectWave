import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, Decal } from '@react-three/drei';
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';
import { EffectComposer, DepthOfField, Bloom, Vignette } from '@react-three/postprocessing'

function Planet() {

    // const { nodes, materials } = useGLTF('app/assets/stylized_planet.glb');
    const model = useGLTF('/stylized_planet.glb');
    const scene = model.scene;
    const planetRef = useRef<any | undefined>();

    // const { width, height } = useThree(state => state.viewport)

    useFrame(({ clock, size }) => {
        // planetRef.current.rotation.y = (clock.elapsedTime % (2 * Math.PI)) * (1 / 20);
        //tui thấy cái gì hay nè thì tui mới hỏi Sơn nó làm cái gì . Tui dịnh bỏ dothử coi nó thay doi cái gì 
        // này qua tui thử của chat gpt rồi mà nó bị khùng khùng á nên cái này nó dễ hơn á fen :)))
        planetRef.current.rotation.y = planetRef.current.rotation.y + 1 / 150
        planetRef.current.scale.set(2.6, 2.6, 2.6);
        planetRef.current.position.set(size.width * 0.001, 2, -0.7); // Adjust the position as needed
    });

    return (
        <primitive object={scene} ref={planetRef} />
    );
}

export default Planet;
