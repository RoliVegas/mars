import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'

import MarsMap from '../assets/5672_mars_4k_color.jpg';
import MarsNormalMap from '../assets/5672_mars_4k_normal.jpg';
import { TextureLoader } from 'three';

export default function Mars(props) {

    const [colorMap, normalMap] = useLoader(TextureLoader, [MarsMap, MarsNormalMap]);

    const marsRef = useRef();

    useFrame(({clock}) => {
        const elapsed = clock.elapsedTime;
        marsRef.current.rotation.y = elapsed / 20;
    })

    return(
        <>
            <mesh ref={marsRef}>
                <sphereGeometry args={[1.7, 64, 64]} />
                <meshStandardMaterial 
                    map={colorMap} 
                    normalMap={normalMap} 
                    roughness={0.4} 
                    metalness={0.4}
                    />
            </mesh>
        </>
    )
}

