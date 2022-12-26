import React, { Suspense, useState } from 'react';
import { Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Mars from './components/Mars.js'
import './App.css'
import Apod from './components/Apod.js';
import Camera from './components/Camera.js';

export default function App() {

    const [state, setState] = useState(undefined);

    const handleClick = (e) => {
        if(e.target.id === state) {
            setState(undefined);
        } else {
            setState(e.target.id);
        }
    }

    return (
        <div className='App'>
            <div className='menu'>
                <h2>View:</h2>
                <ul>
                    <li id={'weather'} onClick={handleClick}>Mars Weather</li>
                    <li id={'cam'} onClick={handleClick}>Mars Rover Cam</li>
                    <li id={'apod'} onClick={handleClick}>Astronomy Picture of the Day</li>
                </ul>
            </div>
            <Canvas className='canvas'>
                <ambientLight intensity={0.1} />
                <pointLight color='rgb(244, 243, 233)' position={[2,0,10]} intensity={0.8} />
                <Suspense fallback={null}>
                    <Stars />
                    <Mars />
                </Suspense>
            </Canvas>
            <>
                {state === 'apod'
                ? <Apod />
                : state === 'cam'
                    ? <Camera />
                    : <></>}
            </>
        </div>
    )
}