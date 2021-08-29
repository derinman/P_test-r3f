import React, { useRef ,Suspense} from 'react'

import { Canvas, useFrame, useThree } from '@react-three/fiber'

import { useGLTF } from "@react-three/drei"

import gltfNodeToMesh from './controller/gltfNodeToMesh.js'

const PonyCartoonModel = ()=> {

  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const gltf_ = useGLTF('../gltf/PonyCartoon.glb')
  const group = useRef();
  
  let nodes = gltf_.nodes
  let nodesMeshOnly = Object.values(nodes).filter(data=>data.type==='Mesh')

  return (
    <group
      ref={group}
    >
      {gltfNodeToMesh(nodesMeshOnly)}
    </group>
  )
}

//useGLTF.preload('./resources/gltf/Pony Cartoon.glb')

const App=()=>{

  return( 
    <div style={{width:'100vw',height:'100vh',border:'1px solid #000'}}>
    <Canvas
      //concurrent//這個關掉會很慘
      pixelRatio={[1, 2]}
      camera={{position:[0,0,13],fov:40}}
      shadowMap
      colorManagement
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
