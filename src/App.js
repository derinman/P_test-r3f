import React, {useState, useRef ,Suspense} from 'react'

import { Canvas} from '@react-three/fiber'
import { useGLTF, OrbitControls,PerspectiveCamera } from "@react-three/drei"

import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

import gltfNodeToMesh from './controller/gltfNodeToMesh.js'
import dumpObject from './controller/dump.js'

// import glbUrl from './glb/ponycartoon.glb'
import glbUrl from './glb/polly.glb'

const PonyCartoonModel = ()=> {
  
  const glb = useGLTF(glbUrl)
  console.log('glb/gltf:',glb)
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
  
  const [ptLight1, setptLight1]= useState({x:-4,y:5,z:4, intensity:2})

  const canvasRef = useRef()
  const mainCameraRef = useRef()
  const controlsRef = useRef()
  const spotLight1 = useRef()

  return( 
    <div style={{width:'100vw',height:'100vh'}}>
      <Canvas 
        ref={canvasRef}
        concurrent
      >
        <Suspense fallback={null}>
          <PonyCartoonModel />
        </Suspense>
        <axesHelper />
        <PerspectiveCamera
          makeDefault
          ref={mainCameraRef}
          position-x={ 0}
          position-y={0}
          position-z={5}
          up={[0, 1, 0]}//世界座標的向量
          fov={ 30 }
          //aspect={ width / height }
          near={ 1 }
          far={ 10000 }
          visible={false}
          controls={controlsRef}
        />
        <OrbitControls
          ref={controlsRef}
          camera={mainCameraRef.current}
          enabled={true}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          // minPolarAngle={Math.PI / 2} 
          // maxPolarAngle={Math.PI / 2}
          target-x={0}
          target-y={0}
          target-z={0}
        />
        <ambientLight 
          intensity={1}
          color={'#FFF'}
        />
        <hemisphereLight 
          intensity={0.7}
          skyColor={'#ff0800'} 
          groundColor={'#f77b77'} 
          castShadow
        />
        <spotLight
            ref={spotLight1}
            position={[ptLight1.x,ptLight1.y,ptLight1.z]}
            color={'#f2ca66'}
            distance={0}//Default is 0 (no limit)
            penumbra={0.5}//values between zero and 1. Default is zero.
            angle={Math.PI/7}//upper bound is Math.PI/2
            intensity={ptLight1.intensity}//Default is 1
            decay={2}
            castShadow
            shadow-mapSize-height={1024/512}//試試1024/500~1024
            shadow-mapSize-width={1024/512}//試試1024/500~1024
            shadow-bias={0.05}//試試0.01~0.07
            shadow-focus={0.001}//試試0.1~2
            target-position={[0, 0, 0]}
            visible={true}
        />
        <mesh
          visible
          userData={{ test: "hello" }}
          position={[ptLight1.x,ptLight1.y,ptLight1.z]}
          rotation={[0, 0, 0]}
          castShadow
        >
          <sphereGeometry attach="geometry" args={[0.1, 16, 16]} />
          <meshStandardMaterial
            attach="material"
            color="white"
            wireframe={true}
          />
        </mesh>
      </Canvas>
      
      <div style={{position:'absolute',top:'0.5%',right:2,width:200,height:'99%', border:'1px solid #000'}}>
        ptLightPos1
        <Slider
          tooltip={false}
          handleLabel={ptLight1.x}
          value={ptLight1.x}
          max={10}
          min={-10}
          orientation="horizontal"
          onChange={e=>setptLight1({...ptLight1,x:e})}
        />
        <Slider
          tooltip={false}
          handleLabel={ptLight1.y}
          value={ptLight1.y}
          max={10}
          min={-10}
          orientation="horizontal"
          onChange={e=>setptLight1({...ptLight1,y:e})}
        />
        <Slider
          tooltip={false}
          handleLabel={ptLight1.z}
          value={ptLight1.z}
          max={10}
          min={-10}
          orientation="horizontal"
          onChange={e=>setptLight1({...ptLight1,z:e})}
        />
        intensity
        <Slider
          tooltip={false}
          handleLabel={ptLight1.intensity}
          value={ptLight1.intensity}
          max={10}
          min={0}
          orientation="horizontal"
          onChange={e=>setptLight1({...ptLight1,intensity:e})}
        />
      </div>

    </div>
  )
}

export default App

// //useGLTF.preload('/glb/ponycartoon.glb')

