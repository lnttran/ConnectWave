import { useIntersect } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'		// to step 11
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import React, { useMemo, useRef, useState } from 'react'
import { Vector3 } from 'three';
import * as THREE from 'three'


function Objects() {
    const { height, width } = useThree((state) => state.viewport)
    // const roundedBoxGeometry = createBoxWithRoundedEdges(8, 4, 0.6, 0.40, 10); // Adjust parameters as needed
    const roundedPlaneGeometry = createRoundedCornerPlane(5, 5, 1);
    return (
        <>
            {/* <pointLight color="blue" position={[8, -25, 5]} intensity={20} />
            <pointLight color="red" position={[0, -height * 2.25, 5]} intensity={10} /> */}
            <mesh geometry={roundedPlaneGeometry} position={[-4, -5, 0.4]} rotation={[0, 0, -Math.PI / 2]} >
                <meshStandardMaterial color="#fc5e03" />
            </mesh>

            {/* <Item color="gray" position={[-width / 5, -height * 1.8, -2]}>
                <coneGeometry args={[1, 1, 6]} />
            </Item>
            <Item color="purple" position={[width / 4, -height * 2, 0]}>
                <coneGeometry args={[1.5, 2, 3]} />
            </Item>
            <Item color="orange" position={[-width / 12, -height * 2.25, 0.5]}>
                <coneGeometry args={[0.75, 2.5, 12]} />
            </Item> */}
        </>
    )
}

export function createBoxWithRoundedEdges(width: number, height: number, depth: number, radius0: number, smoothness: number) {
    let shape = new THREE.Shape();
    let eps = 0.00001;
    let radius = radius0 - eps;
    shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
    shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
    shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
    shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
    let geometry = new THREE.ExtrudeGeometry(shape, {
        depth: depth - radius0 * 2,
        bevelEnabled: true,
        bevelSegments: smoothness * 2,
        steps: 1,
        bevelSize: radius,
        bevelThickness: radius0,
        curveSegments: smoothness
    });

    geometry.center();

    return geometry;
}

// Create a rounded corner plane geometry
export function createRoundedCornerPlane(width: number, height: number, radius: number) {
    const shape = new THREE.Shape();

    const x = 0;
    const y = 0;

    shape.moveTo(x, y + radius);
    shape.lineTo(x, y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius, y + height);
    shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    shape.lineTo(x + width, y + radius);
    shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    shape.lineTo(x + radius, y);
    shape.quadraticCurveTo(x, y, x, y + radius);

    const geometry = new THREE.ShapeGeometry(shape);
    return geometry;
}

function Item({ color, position, children }: { color: string, position: number[], children: React.ReactNode }) {
    const visible = useRef<boolean | undefined>() //initialse the useRef with boolean or undefined
    const ref = useIntersect((isVisible) => {
        if (typeof isVisible === 'boolean') {
            visible.current = isVisible;
        }
    }) as React.MutableRefObject<THREE.Mesh>;

    const [xRandomFactor, yRandomFactor] = useMemo(() => [(0.5 - Math.random()) * 0.5, (0.5 - Math.random()) * 0.5], [])

    useFrame(({ clock }, delta) => {
        const elapsedTime = clock.getElapsedTime()

        ref.current.rotation.x = elapsedTime * xRandomFactor
        ref.current.rotation.y = elapsedTime * yRandomFactor

        const scale = THREE.MathUtils.damp(ref.current.scale.x, visible.current ? 1.5 : 0.2, 5, delta)
        ref.current.scale.set(scale, scale, scale)
    })

    return (
        <mesh ref={ref} position={new Vector3(position[0], position[1], position[2])}>
            {children}
            <meshPhysicalMaterial transparent color={color} />
        </mesh>
    )
}

export { Objects }
