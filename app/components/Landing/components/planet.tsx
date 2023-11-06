import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, Decal, MeshWobbleMaterial, useAnimations } from '@react-three/drei';
import { easing } from 'maath'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer, DepthOfField, Bloom, Vignette } from '@react-three/postprocessing'

export function Planet() {

    const model = useGLTF('/stylized_planet.glb');
    const scene = model.scene;
    const planetRef = useRef<any | undefined>();

    // const { width, height } = useThree(state => state.viewport)

    useFrame(({ clock, size }) => {
        // planetRef.current.rotation.y = (clock.elapsedTime % (2 * Math.PI)) * (1 / 20);
        //tui thấy cái gì hay nè thì tui mới hỏi Sơn nó làm cái gì . Tui dịnh bỏ dothử coi nó thay doi cái gì 
        // này qua tui thử của chat gpt rồi mà nó bị khùng khùng á nên cái này nó dễ hơn á fen :)))
        planetRef.current.rotation.y = planetRef.current.rotation.y + 1 / 150
        planetRef.current.scale.set(3.5, 3.5, 3.5);
        planetRef.current.position.set(size.width * 0.0014, 0.4, -0.7); // Adjust the position as needed
    });

    return (
        <primitive object={scene} ref={planetRef} />
    );
}

export function Hunter() {
    const model = useGLTF('/dinomei_space_explorer.glb');
    const scene = model.scene;
    const hunterRef = useRef<any | undefined>();

    // Set the background material's opacity to 0
    // useEffect(() => {
    //     if (hunterRef.current) {
    //         // Traverse through the model's children to find and adjust the background material
    //         hunterRef.current.traverse((child: any) => {
    //             if (child instanceof THREE.Mesh) {
    //                 // Check if this is the background mesh, you may need to inspect your model structure
    //                 // and identify the background material properly
    //                 if (child.name === 'background') {
    //                     // Disable the background by setting the material's opacity to 0 and enabling transparency
    //                     child.material.opacity = 0;
    //                     child.material.transparent = true;
    //                 }
    //             }
    //         });
    //     }
    // }, []);


    useFrame(({ clock, size }) => {
        // hunterRef.current.rotation.y = (clock.elapsedTime % (2 * Math.PI)) * (1 / 20);
        //tui thấy cái gì hay nè thì tui mới hỏi Sơn nó làm cái gì . Tui dịnh bỏ dothử coi nó thay doi cái gì 
        // này qua tui thử của chat gpt rồi mà nó bị khùng khùng á nên cái này nó dễ hơn á fen :)))
        hunterRef.current.rotation.set(0.2, 19.5, 0);
        hunterRef.current.scale.set(2.6, 2.6, 2.6);
        hunterRef.current.position.set(size.width * 0.001, -6, -0.7); // Adjust the position as needed
    });

    return (
        <primitive object={scene} ref={hunterRef} />
    );
}
export function Quester() {


    const { scene, nodes, animations } = useLoader(GLTFLoader, '/outhere_space_buddy.glb');
    // const node = useGLTF('/outhere_space_buddy.glb');
    const questerRef = useRef<any | undefined>();

    // const { width, height } = useThree(state => state.viewport)
    // Set the model animations

    // if (questerRef.current) {
    //     const mixer = new THREE.AnimationMixer(questerRef.current);
    //     const clipAction = mixer.clipAction(animations[0]);
    //     clipAction.play();
    // }

    useFrame(({ clock, size }) => {
        // questerRef.current.rotation.y = (clock.elapsedTime % (2 * Math.PI)) * (1 / 20);
        //tui thấy cái gì hay nè thì tui mới hỏi Sơn nó làm cái gì . Tui dịnh bỏ dothử coi nó thay doi cái gì 
        // này qua tui thử của chat gpt rồi mà nó bị khùng khùng á nên cái này nó dễ hơn á fen :)))
        // questerRef.current.rotation.y = questerRef.current.rotation.y + 1 / 150
        questerRef.current.rotation.set(0.2, 1, 0);
        questerRef.current.scale.set(4, 4, 4);
        questerRef.current.position.set(size.width * -0.0008, -5, -0.7); // Adjust the position as needed
    });


    return (
        <group ref={questerRef}>
            <primitive object={scene} />
        </group>
    );
}
