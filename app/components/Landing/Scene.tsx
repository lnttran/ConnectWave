import { Scroll, ScrollControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React from 'react'
import * as THREE from 'three'
import { Html } from './components/Html'
import { Objects } from './components/Objects'
import { Particles } from './components/Particles'
import { Hunter, Planet, Quester } from './components/planet'
import { EffectComposer, DepthOfField, Bloom, Vignette } from '@react-three/postprocessing'
import { AccordionDemo } from './components/accordionPage'

function Scene() {
    return (
        <ScrollControls pages={4}>
            <Scroll>
                <>
                    <EffectComposer>
                        <Bloom intensity={2} luminanceThreshold={0.1} luminanceSmoothing={10} height={1000} />
                    </EffectComposer>
                    <Particles />
                    {/* <Objects /> */}
                    <Planet />
                    {/* <Hunter /> */}
                    {/* <Quester /> */}
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
