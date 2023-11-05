import { Point, Points } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import { UseThemeProps } from 'next-themes/dist/types'
import React, { useEffect, useState } from 'react'

const particleLightColors = ['#673ab7', '#f4b677', 'orange', 'blue', '#8bc34a', 'purple']
const particleDarkColors = ["#fff"]

function Particles({ size = 5000 }) {
    const { width, height } = useThree((state) => state.viewport)
    const { theme } = useTheme();

    const getParticleColor = () => {
        const color = theme === 'dark' ? particleDarkColors : particleLightColors
        const randomIdx = Math.floor(Math.random() * (color.length))
        return color[randomIdx]
    }

    return (
        <Points limit={size}>
            <pointsMaterial size={0.05} vertexColors />
            {Array.from({ length: size }).map((_, i) => (
                <Point
                    key={i}
                    position={[(0.5 - Math.random()) * width * 4, 0.5 * height + Math.random() ** 0.25 * height * -3, (1 - Math.random()) * -5]}
                    color={getParticleColor()}
                />
            ))}
        </Points>
    )
}

export { Particles }
