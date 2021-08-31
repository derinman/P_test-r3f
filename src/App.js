import React, {useState,useEffect, useRef ,Suspense} from 'react'

import { Canvas} from '@react-three/fiber'

import { useGLTF } from "@react-three/drei"



import gltfNodeToMesh from './controller/gltfNodeToMesh.js'
import dumpObject from './controller/dump.js'

const PonyCartoonModel = (props)=> {
  
  const gltf = useGLTF('/box.jpg')
  const group = useRef()
  console.log(dumpObject(gltf.scene).join('\n'))

  let nodes = gltf.nodes
  let nodesMeshOnly = Object.values(nodes).filter(data=>data.type==='Mesh')

  return (
    <group
      ref={group}
    >
      {gltfNodeToMesh(nodesMeshOnly)}
    </group>
  )
}



const App=()=>{


  return( 
    <div style={{width:'100vw',height:'100vh'}}>
    <Canvas
      concurrent//這個關掉會很慘
      camera={{position:[0,0,13],fov:40}}
    >
      <ambientLight 
        intensity={0.3}
        color={'#42b8eb'}
      />
        <Suspense fallback={null}>
          <PonyCartoonModel/>
        </Suspense> 
    </Canvas>
    
    </div>
            )
}

export default App;

//useGLTF.preload('/glb/ponycartoon.glb')
