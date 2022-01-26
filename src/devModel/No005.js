import React, { useRef } from "react";

import {
  useGLTF,
  OrbitControls,
  PerspectiveCamera,
  Sky,
  Stars,
  Environment,
} from "@react-three/drei";

import gltfNodeToMesh from "./helper/gltfNodeToMesh.js";
// import dumpObject from "./helper/dump.js";

import glbUrl from "./glb/no005.glb";

import cameraJson from "./camLightConfig/No005/camera.json";

const No005 = () => {
  const glb = useGLTF(glbUrl);
  const nodes = glb.nodes;
  //console.log(dumpObject(glb.scene).join("\n"));

  const mainCameraRef = useRef();
  const controlsRef = useRef();

  return (
    <group>
      {gltfNodeToMesh(nodes)}
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

export default No005;