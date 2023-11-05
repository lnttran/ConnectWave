import { Scroll, ScrollControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React from 'react'
import * as THREE from 'three'
import { Html } from './components/Html'
import { Objects } from './components/Objects'
import { Particles } from './components/Particles'
import Planet from './components/planet'
import { EffectComposer, DepthOfField, Bloom, Vignette } from '@react-three/postprocessing'

function Scene() {
    const { mouse, camera } = useThree();

    useFrame(() => {
    })

    return (


        <ScrollControls pages={2}>
            <Scroll>
                <>
                    <EffectComposer>
                        <Bloom intensity={2} luminanceThreshold={0.1} luminanceSmoothing={10} height={1000} />
                    </EffectComposer>
                    <Particles />
                    {/* <Objects /> */}
                    <Planet />
                </>
            </Scroll>
            <Scroll html>
                <Html />
            </Scroll>
        </ScrollControls>
        // </>
    )
}

export { Scene }
