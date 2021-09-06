import React, { useState, useRef, Suspense, useEffect } from "react";

import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";

import styled from "styled-components";

import {
  PointLight,
  PointLightGUI,
  SpotLight,
  SpotLightGUI,
  AmbientLight,
  AmbientLightGUI,
  HemisphereLight,
  HemisphereLightGUI,
} from "./Light.js";

import gltfNodeToMesh from "./helper/gltfNodeToMesh.js";
import dumpObject from "./helper/dump.js";

// import glbUrl from './glb/ponycartoon.glb'
import glbUrl from "./glb/polly.glb";
// import glbUrl from './glb/dinosaur.glb'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  overflow: hidden;
  // border:1px solid #000;
`;
const GuiWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 2.5vh;
  right: 2.5vh;
  width: 250px;
  height: 95%;
  border: 2px solid #555;
  border-radius: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  //border: 1px solid #000;
`;

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

const App = () => {
  const [up, setUp] = useState([0, 1, 0]);

  const [pointLight1, setPointLight1] = useState({
    castShadow: true,
    color: "#FFFFFF",
    decay: 2,
    distance: 0,
    intensity: 1,
    name: "pointLight1",
    x: 0,
    y: 1,
    z: 0,
    visible: true,
  });

  const [spotLight1, setSpotLight1] = useState({
    angle: Math.PI / 7,
    castShadow: true,
    color: "#FFFFFF",
    decay: 2,
    distance: 0,
    intensity: 1,
    name: "spotLight1",
    penumbra: 0.5,
    x: 1,
    y: 1,
    z: 0,
    targetX: 0,
    targetY: 0.5,
    targetZ: 0,
    visible: true,
  });

  const [ambientLight1, setAmbientLight1] = useState({
    castShadow: true,
    color: "#FFFFFF",
    intensity: 1,
    name: "ambientLight1",
    visible: true,
  });

  const [hemisphereLight1, setHemisphereLight1] = useState({
    castShadow: true,
    color: "#FFFFFF",
    groundColor: "#FFFFFF",
    intensity: 1,
    name: "hemisphereLight1",
    skyColor: "#FFFFFF",
    visible: true,
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
    <Wrapper>
      <Canvas ref={canvasRef} concurrent>
        <Suspense fallback={null}>
          <PonyCartoonModel />
        </Suspense>
        <axesHelper
          ref={axesHelperRef}
          scale={[1, 1, 1]}
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

        <PointLight pointLightConfig={pointLight1} />
        <SpotLight spotLightConfig={spotLight1} />
        <AmbientLight ambientLightConfig={ambientLight1} />
        <HemisphereLight hemisphereLightConfig={hemisphereLight1} />
      </Canvas>

      <GuiWrapper>
        <PointLightGUI
          pointLightConfig={pointLight1}
          setPointLightConfig={setPointLight1}
        />
        <SpotLightGUI
          spotLightConfig={spotLight1}
          setSpotLightConfig={setSpotLight1}
        />
        <AmbientLightGUI
          ambientLightConfig={ambientLight1}
          setAmbientLightConfig={setAmbientLight1}
        />
        <HemisphereLightGUI
          hemisphereLightConfig={hemisphereLight1}
          setHemisphereLightConfig={setHemisphereLight1}
        />
      </GuiWrapper>
    </Wrapper>
  );
};

export default App;

useGLTF.preload(glbUrl);
