import React, { useState, useRef, Suspense, useEffect } from "react";

import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";

import styled from "styled-components";

import pointLightJson from "./config/pointLight.json";
import spotLightJson from "./config/spotLight.json";
import ambientLightJson from "./config/ambientLight.json";
import hemisphereLightJson from "./config/hemisphereLight.json";

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

  const [pointLight1, setPointLight1] = useState(pointLightJson.pointLight1);
  const [pointLight2, setPointLight2] = useState(pointLightJson.pointLight2);
  const [pointLight3, setPointLight3] = useState(pointLightJson.pointLight3);

  const [spotLight1, setSpotLight1] = useState(spotLightJson.spotLight1);

  const [ambientLight1, setAmbientLight1] = useState(ambientLightJson.ambientLight1);

  const [hemisphereLight1, setHemisphereLight1] = useState(hemisphereLightJson.hemisphereLight1);

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
        <PointLight pointLightConfig={pointLight2} />
        <PointLight pointLightConfig={pointLight3} />
        <SpotLight spotLightConfig={spotLight1} />
        <AmbientLight ambientLightConfig={ambientLight1} />
        <HemisphereLight hemisphereLightConfig={hemisphereLight1} />
      </Canvas>

      <GuiWrapper>
        <PointLightGUI
          pointLightConfig={pointLight1}
          setPointLightConfig={setPointLight1}
        />
        <PointLightGUI
          pointLightConfig={pointLight2}
          setPointLightConfig={setPointLight2}
        />
        <PointLightGUI
          pointLightConfig={pointLight3}
          setPointLightConfig={setPointLight3}
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
