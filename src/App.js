import React, {useRef ,Suspense} from 'react'

import { Canvas} from '@react-three/fiber'
import { useGLTF, OrbitControls } from "@react-three/drei"

import gltfNodeToMesh from './controller/gltfNodeToMesh.js'
import dumpObject from './controller/dump.js'

// import glbUrl from './glb/ponycartoon.glb'
import glbUrl from './glb/polly.glb'

const PonyCartoonModel = ()=> {
  
  const glb = useGLTF(glbUrl)
  console.log(glb)
  const group = useRef()
  console.log(dumpObject(glb.scene).join('\n'))
  
  const nodes = glb.nodes
  
  const nodesMeshOnly = Object.values(nodes).filter(data=>data.type==='Mesh')

  return (
    <group
      ref={group}
    >
      <primitive object={glb.scene} />
      {/* {gltfNodeToMesh(nodesMeshOnly)} */}
    </group>
  )
}

const App=()=>{
  return( 
    <div style={{width:'100vw',height:'100vh'}}>
      <Canvas
        concurrent//這個關掉會很慘
        camera={{position:[0,0,2],fov:30}}
      >
        <ambientLight 
          intensity={1}
          color={'#FFF'}
        />
        <Suspense fallback={null}>
          <PonyCartoonModel />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}

export default App

//useGLTF.preload('/glb/ponycartoon.glb')


