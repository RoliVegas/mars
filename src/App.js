import React, { Suspense } from 'react';
import { Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Mars from './components/Mars.js'
import './App.css'

export default function App() {
    return (
        <div className='App'>
        <div className='title'>
            <h1>MARS by Roland Krancz</h1>
        </div>
        <Canvas className='canvas'>
            <ambientLight intensity={0.1} />
            <pointLight color='#rgb(244, 243, 233)' position={[2,0,10]} intensity={0.8} />
            <Suspense fallback={null}>
                <Stars />
                <Mars />
            </Suspense>
        </Canvas>
        </div>
    )
}