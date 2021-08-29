import React, { useRef ,Suspense} from 'react'

import { Canvas} from '@react-three/fiber'

import { useGLTF } from "@react-three/drei"

import gltfNodeToMesh from './controller/gltfNodeToMesh.js'

const PonyCartoonModel = ()=> {

  const gltf_ = useGLTF('/glb/ponycartoon.glb')
  const group = useRef()
  
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
