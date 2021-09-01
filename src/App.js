import React, {useRef ,Suspense} from 'react'

import { Canvas} from '@react-three/fiber'
import { useGLTF, OrbitControls,PerspectiveCamera } from "@react-three/drei"

import * as THREE from 'three'

import gltfNodeToMesh from './controller/gltfNodeToMesh.js'
import dumpObject from './controller/dump.js'

import glbUrl from './glb/ponycartoon.glb'
// import glbUrl from './glb/polly.glb'

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
  
  const mainCamera = useRef()
  const controls = useRef()

  return( 
    <div style={{width:'100vw',height:'100vh'}}>
      <Canvas concurrent>

        <ambientLight 
          intensity={1}
          color={'#FFF'}
        />
        <Suspense fallback={null}>
          <PonyCartoonModel />
        </Suspense>
        <PerspectiveCamera
          makeDefault
          ref={mainCamera}
          position-x={ 0}
          position-y={0}
          position-z={15}
          up={[0, 0, 1]}//世界座標的向量
          fov={ 30 }
          //aspect={ width / height }
          near={ 1 }
          far={ 10000 }
          visible={false}
          controls={controls}
        />
        <OrbitControls
          ref={controls}
          camera={mainCamera.current}
          enabled={true}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 2} 
          maxPolarAngle={Math.PI / 2}
          target-x={0}
          target-y={0}
          target-z={0}
        />
      </Canvas>
    </div>
  )
}

export default App

// //useGLTF.preload('/glb/ponycartoon.glb')

