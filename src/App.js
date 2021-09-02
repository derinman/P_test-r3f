import React, {useState, useRef ,Suspense, useEffect} from 'react'

import { Canvas} from '@react-three/fiber'
import { useGLTF, OrbitControls,PerspectiveCamera } from "@react-three/drei"

import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

import { SketchPicker } from 'react-color'

import gltfNodeToMesh from './helper/gltfNodeToMesh.js'
import dumpObject from './helper/dump.js'

// import glbUrl from './glb/ponycartoon.glb'
// import glbUrl from './glb/polly.glb'
import glbUrl from './glb/dinosaur.glb'

const PonyCartoonModel = ()=> {
  
  const glb = useGLTF(glbUrl)
  console.log('glb/gltf:',glb)
  const group = useRef()
  console.log(dumpObject(glb.scene).join('\n'))
  
  const nodes = glb.nodes
  
  

  return (
    <group
      ref={group}
    >
      {/* <primitive object={glb.scene} /> */}
      {gltfNodeToMesh(nodes)}
    </group>
  )
}

const App=()=>{
  
  const [up, setUp] = useState([0,1,0])

  const [ptLight1, setptLight1]= useState(
    { x:0,
      y:1,
      z:0, 
      intensity:5,
      color:'#FFFFFF',
      distance:0,
      penumbra:0.5,
      angle:Math.PI/7,
      targetX:0,
      targetY:0,
      targetZ:0
    }
  )

  const canvasRef = useRef()
  const mainCameraRef = useRef()
  const axesHelperRef = useRef()
  const controlsRef = useRef()
  const spotLight1Ref = useRef()
  const targetRef = useRef()

  useEffect(()=>{
    //console.log(axesHelperRef)
    console.log(spotLight1Ref)
  },
    []
  )
  

  return( 
    <div style={{width:'100vw',height:'100vh'}}>
      <Canvas 
        ref={canvasRef}
        concurrent
      >
        <Suspense fallback={null}>
          <PonyCartoonModel />
        </Suspense>
        <axesHelper 
          ref={axesHelperRef}
          scale={[10,10,10]}
          up={up}//世界座標的向量
        />
        <PerspectiveCamera
          makeDefault
          ref={mainCameraRef}
          position-x={ 0}
          position-y={0}
          position-z={25}
          up={up}//世界座標的向量
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
            ref={spotLight1Ref}
            position={[ptLight1.x,ptLight1.y,ptLight1.z]}
            color={ptLight1.color}
            distance={ptLight1.distance}//Default is 0 (no limit)
            penumbra={ptLight1.penumbra}//values between zero and 1. Default is zero.
            angle={ptLight1.angle}//upper bound is Math.PI/2
            intensity={ptLight1.intensity}//Default is 1
            decay={2}
            castShadow
            shadow-mapSize-height={1024/512}//試試1024/500~1024
            shadow-mapSize-width={1024/512}//試試1024/500~1024
            shadow-bias={0.05}//試試0.01~0.07
            shadow-focus={0.001}//試試0.1~2
            target={targetRef.current}
            visible={true}
        />
        <mesh
          visible
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
        <mesh
          ref={targetRef}
          visible
          position={[ptLight1.targetX,ptLight1.targetY,ptLight1.targetZ]}
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
      
      <div style={{position:'absolute',top:'0.5%',right:2,width:250,height:'99%', border:'1px solid #000'}}>
        ptLightPos1
        <Slider
          tooltip={false}
          handleLabel={ptLight1.x}
          value={ptLight1.x}
          step={0.25}
          max={20}
          min={-10}
          orientation="horizontal"
          onChange={e=>setptLight1({...ptLight1,x:e})}
        />
        <Slider
          tooltip={false}
          handleLabel={ptLight1.y}
          value={ptLight1.y}
          step={0.25}
          max={20}
          min={-10}
          orientation="horizontal"
          onChange={e=>setptLight1({...ptLight1,y:e})}
        />
        <Slider
          tooltip={false}
          handleLabel={ptLight1.z}
          value={ptLight1.z}
          step={0.25}
          max={20}
          min={-10}
          orientation="horizontal"
          onChange={e=>setptLight1({...ptLight1,z:e})}
        />
        intensity
        <Slider
          tooltip={false}
          handleLabel={ptLight1.intensity}
          value={ptLight1.intensity}
          step={0.25}
          max={10}
          min={0}
          orientation="horizontal"
          onChange={e=>setptLight1({...ptLight1,intensity:e})}
        />
        Distance
        <Slider
          tooltip={false}
          handleLabel={ptLight1.distance}
          value={ptLight1.distance}
          step={0.25}
          max={5}
          min={0}
          orientation="horizontal"
          onChange={e=>setptLight1({...ptLight1,distance:e})}
        />
        Penumbra
        <Slider
          tooltip={false}
          handleLabel={ptLight1.penumbra}
          value={ptLight1.penumbra}
          step={0.1}
          max={1}
          min={0}
          orientation="horizontal"
          onChange={e=>setptLight1({...ptLight1,penumbra:e})}
        />
        Angle
        <Slider
          tooltip={false}
          handleLabel={ptLight1.angle}
          value={ptLight1.angle}
          step={0.1}
          max={Math.PI/2}
          min={0}
          orientation="horizontal"
          onChange={e=>setptLight1({...ptLight1,angle:e})}
        />
        Target
        <Slider
          tooltip={false}
          handleLabel={ptLight1.targetX}
          value={ptLight1.targetX}
          step={0.25}
          max={10}
          min={-10}
          orientation="horizontal"
          onChange={e=>setptLight1({...ptLight1,targetX:e})}
        />
        <Slider
          tooltip={false}
          handleLabel={ptLight1.targetY}
          value={ptLight1.targetY}
          step={0.25}
          max={10}
          min={-10}
          orientation="horizontal"
          onChange={e=>setptLight1({...ptLight1,targetY:e})}
        />
        <Slider
          tooltip={false}
          handleLabel={ptLight1.targetZ}
          value={ptLight1.targetZ}
          step={0.25}
          max={10}
          min={-10}
          orientation="horizontal"
          onChange={e=>setptLight1({...ptLight1,targetZ:e})}
        />
        <SketchPicker
          color={ ptLight1.color }
          onChangeComplete={ e=>setptLight1({...ptLight1,color:e.hex}) }
          presetColors={[]}
        />
      </div>

    </div>
  )
}

export default App

useGLTF.preload(glbUrl)

