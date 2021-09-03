import React, { useState, useRef, Suspense, useEffect } from "react";

import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";

import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

import { SketchPicker } from "react-color";

import gltfNodeToMesh from "./helper/gltfNodeToMesh.js";
import dumpObject from "./helper/dump.js";

// import glbUrl from './glb/ponycartoon.glb'
import glbUrl from "./glb/polly.glb";
// import glbUrl from './glb/dinosaur.glb'

const PonyCartoonModel = () => {
  const glb = useGLTF(glbUrl);
  // console.log('glb/gltf:',glb)
  const group = useRef();
  // console.log(dumpObject(glb.scene).join('\n'))

  const nodes = glb.nodes;

  return (
    <group ref={group}>
      {/* <primitive object={glb.scene} /> */}
      {gltfNodeToMesh(nodes)}
    </group>
  );
};

const SpotLight = (props) => {
  const { spotLightConfig } = props;
  const targetRef = useRef();

  return (
    <>
      <spotLight
        // ref={}
        position={[spotLightConfig.x, spotLightConfig.y, spotLightConfig.z]}
        color={spotLightConfig.color}
        distance={spotLightConfig.distance} //Default is 0 (no limit)
        penumbra={spotLightConfig.penumbra} //values between zero and 1. Default is zero.
        angle={spotLightConfig.angle} //upper bound is Math.PI/2
        intensity={spotLightConfig.intensity} //Default is 1
        decay={2}
        castShadow
        shadow-mapSize-height={1024 / 512} //試試1024/500~1024
        shadow-mapSize-width={1024 / 512} //試試1024/500~1024
        shadow-bias={0.05} //試試0.01~0.07
        shadow-focus={0.001} //試試0.1~2
        target={targetRef.current}
        visible={true}
      />
      <mesh
        visible
        position={[spotLightConfig.x, spotLightConfig.y, spotLightConfig.z]}
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
        position={[
          spotLightConfig.targetX,
          spotLightConfig.targetY,
          spotLightConfig.targetZ,
        ]}
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
    </>
  );
};

const SpotLightGUI = (props) => {
  const { name, spotLightConfig, setSpotLightConfig } = props;
  const [isClose, setIsClose] = useState(true)

  return (
    <>
      <div
        onClick={()=>setIsClose(c=>!c)}
      >
        {name}
      </div>
        

      {!isClose &&<>
        <div
        onClick={()=>console.log(spotLightConfig)}
      >
        snapshot
      </div>
      <Slider
        tooltip={false}
        handleLabel={spotLightConfig.x}
        value={spotLightConfig.x}
        step={0.25}
        max={20}
        min={-10}
        orientation="horizontal"
        onChange={(e) => setSpotLightConfig({ ...spotLightConfig, x: e })}
      />
      <Slider
        tooltip={false}
        handleLabel={spotLightConfig.y}
        value={spotLightConfig.y}
        step={0.25}
        max={20}
        min={-10}
        orientation="horizontal"
        onChange={(e) => setSpotLightConfig({ ...spotLightConfig, y: e })}
      />
      <Slider
        tooltip={false}
        handleLabel={spotLightConfig.z}
        value={spotLightConfig.z}
        step={0.25}
        max={20}
        min={-10}
        orientation="horizontal"
        onChange={(e) => setSpotLightConfig({ ...spotLightConfig, z: e })}
      />
      intensity
      <Slider
        tooltip={false}
        handleLabel={spotLightConfig.intensity}
        value={spotLightConfig.intensity}
        step={0.25}
        max={10}
        min={0}
        orientation="horizontal"
        onChange={(e) =>
          setSpotLightConfig({ ...spotLightConfig, intensity: e })
        }
      />
      Distance
      <Slider
        tooltip={false}
        handleLabel={spotLightConfig.distance}
        value={spotLightConfig.distance}
        step={0.25}
        max={5}
        min={0}
        orientation="horizontal"
        onChange={(e) =>
          setSpotLightConfig({ ...spotLightConfig, distance: e })
        }
      />
      Penumbra
      <Slider
        tooltip={false}
        handleLabel={spotLightConfig.penumbra}
        value={spotLightConfig.penumbra}
        step={0.1}
        max={1}
        min={0}
        orientation="horizontal"
        onChange={(e) =>
          setSpotLightConfig({ ...spotLightConfig, penumbra: e })
        }
      />
      Angle
      <Slider
        tooltip={false}
        handleLabel={spotLightConfig.angle}
        value={spotLightConfig.angle}
        step={0.1}
        max={Math.PI / 2}
        min={0}
        orientation="horizontal"
        onChange={(e) => setSpotLightConfig({ ...spotLightConfig, angle: e })}
      />
      Target
      <Slider
        tooltip={false}
        handleLabel={spotLightConfig.targetX}
        value={spotLightConfig.targetX}
        step={0.25}
        max={10}
        min={-10}
        orientation="horizontal"
        onChange={(e) => setSpotLightConfig({ ...spotLightConfig, targetX: e })}
      />
      <Slider
        tooltip={false}
        handleLabel={spotLightConfig.targetY}
        value={spotLightConfig.targetY}
        step={0.25}
        max={10}
        min={-10}
        orientation="horizontal"
        onChange={(e) => setSpotLightConfig({ ...spotLightConfig, targetY: e })}
      />
      <Slider
        tooltip={false}
        handleLabel={spotLightConfig.targetZ}
        value={spotLightConfig.targetZ}
        step={0.25}
        max={10}
        min={-10}
        orientation="horizontal"
        onChange={(e) => setSpotLightConfig({ ...spotLightConfig, targetZ: e })}
      />
      <SketchPicker
        color={spotLightConfig.color}
        onChangeComplete={(e) =>
          setSpotLightConfig({ ...spotLightConfig, color: e.hex })
        }
        presetColors={[]}
      />
      </>}
    </>
  );
};

const App = () => {
  const [up, setUp] = useState([0, 1, 0]);

  const [spotLight1, setSpotLight1] = useState({
    x: 0,
    y: 1,
    z: 0,
    intensity: 5,
    color: "#FFFFFF",
    distance: 0,
    penumbra: 0.5,
    angle: Math.PI / 7,
    targetX: 0,
    targetY: 0,
    targetZ: 0,
  });

  const [spotLight2, setSpotLight2] = useState({
    x: 1,
    y: 1,
    z: 0,
    intensity: 5,
    color: "#FFFFFF",
    distance: 0,
    penumbra: 0.5,
    angle: Math.PI / 7,
    targetX: 0,
    targetY: 0,
    targetZ: 0,
  });

  const canvasRef = useRef();
  const mainCameraRef = useRef();
  const axesHelperRef = useRef();
  const controlsRef = useRef();

  useEffect(() => {
    //console.log(axesHelperRef)
    // console.log(spotLight1Ref)
    // console.log(mainCameraRef)
  }, []);

  return (
    <div 
      style={{ 
        position:'relative',
        width: "100%", 
        height: "100%",
        top:'0px',
        left:'0px',
        overflow:'hidden',
        // border:'1px solid #000'  
    }}>
      <Canvas 
        ref={canvasRef} 
        concurrent
      >
        <Suspense fallback={null}>
          <PonyCartoonModel />
        </Suspense>
        <axesHelper
          ref={axesHelperRef}
          scale={[10, 10, 10]}
          up={up} //世界座標的向量
        />
        <PerspectiveCamera
          makeDefault
          ref={mainCameraRef}
          controls={controlsRef.current}
          position-x={0}
          position-y={-0}
          position-z={25}
          up={up} //世界座標的向量
          fov={30}
          //aspect={ width / height }
          near={1}
          far={10000}
          visible={false}
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
        <ambientLight intensity={0.3} color={"#FFF"} />
        <hemisphereLight
          intensity={0.5}
          skyColor={"#ff0800"}
          groundColor={"#f77b77"}
          castShadow
        />
        <SpotLight spotLightConfig={spotLight1} />
        <SpotLight spotLightConfig={spotLight2} />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: "2.5vh",
          right: "2.5vh",
          width: '250px',
          height: "95%",
          border: "1px solid #000"
        }}
      >
        <SpotLightGUI
          name = {'spotLight1'}
          spotLightConfig={spotLight1}
          setSpotLightConfig={setSpotLight1}
        />
        <SpotLightGUI
          name = {'spotLight2'}
          spotLightConfig={spotLight2}
          setSpotLightConfig={setSpotLight2}
        />
      </div>
    </div>
  );
};

export default App;

useGLTF.preload(glbUrl);
