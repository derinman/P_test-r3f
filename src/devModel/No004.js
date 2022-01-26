import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";

import {
  useGLTF,
  OrbitControls,
  PerspectiveCamera,
  Sky,
  Environment,
} from "@react-three/drei";

import { PointLight, HemisphereLight } from "./light/Light.js";

import cameraJson from "./camLightConfig/No004/camera.json";
import pointLightJson from "./camLightConfig/No004/pointLight.json";
import hemisphereLightJson from "./camLightConfig/No004/hemisphereLight.json";

import gltfNodeToMesh from "./helper/gltfNodeToMesh.js";
// import dumpObject from "./helper/dump.js";

import glbUrl from "./glb/no004.glb";

const No004 = () => {
  const glb = useGLTF(glbUrl);
  const nodes = glb.nodes;
  //console.log(dumpObject(glb.scene).join("\n"));

  const mainCameraRef = useRef();
  const controlsRef = useRef();
  const pointLight1Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    pointLight1Ref.current.position.y =
      pointLightJson.pointLight1.y + Math.cos(t * 0.5) * 6;
  });


  return (
    <group>
      {gltfNodeToMesh(nodes)}
      <PointLight
        pointLightConfig={pointLightJson.pointLight1}
        lightRef={pointLight1Ref}
      />
      <PointLight pointLightConfig={pointLightJson.pointLight2} />
      <PointLight pointLightConfig={pointLightJson.pointLight3} />
      <HemisphereLight
        hemisphereLightConfig={hemisphereLightJson.hemisphereLight1}
      />
      <PerspectiveCamera
        ref={mainCameraRef}
        controls={controlsRef.current}
        makeDefault={true}
        visible={false}
        up={[0, 1, 0]} //世界座標的向量
        position={cameraJson.position}
        fov={cameraJson.fov}
        near={cameraJson.near}
        far={cameraJson.far}
      />
      <OrbitControls
        ref={controlsRef}
        camera={mainCameraRef.current}
        enabled={cameraJson.enabled}
        enablePan={cameraJson.enablePan}
        enableZoom={cameraJson.enableZoom}
        enableRotate={cameraJson.enableRotate}
        maxPolarAngle={cameraJson.maxPolarAngle}
        minPolarAngle={cameraJson.minPolarAngle}
        maxAzimuthAngle={cameraJson.maxAzimuthAngle}
        minAzimuthAngle={cameraJson.minAzimuthAngle}
        maxDistance={cameraJson.maxDistance}
        minDistance={cameraJson.minDistance}
        target={cameraJson.orbitTarget}
      />
      <Sky
        distance={450000}
        sunPosition={[-1, 0, 0]}
        rayleigh={0.1}
        turbidity={0.3}
      />
      <Environment preset="warehouse" />
    </group>
  );
};

useGLTF.preload(glbUrl);

export default No004;
