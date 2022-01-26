import React, { useRef } from "react";

import {
  useGLTF,
  OrbitControls,
  PerspectiveCamera,
  Sky,
  Stars,
  Environment,
} from "@react-three/drei";

import { PointLight, HemisphereLight } from "./light/Light.js";

import cameraJson from "./camLightConfig/No003/camera.json";
import pointLightJson from "./camLightConfig/No003/pointLight.json";
import hemisphereLightJson from "./camLightConfig/No003/hemisphereLight.json";

import gltfNodeToMesh from "./helper/gltfNodeToMesh.js";
// import dumpObject from "./helper/dump.js";

import glbUrl from "./glb/no003.glb";

const No003 = () => {
  const glb = useGLTF(glbUrl);
  const nodes = glb.nodes;
  //console.log(dumpObject(glb.scene).join("\n"));
  // console.log(nodes)
  const mainCameraRef = useRef();
  const controlsRef = useRef();

  return (
    <group>
      {gltfNodeToMesh(nodes)}
      <PointLight pointLightConfig={pointLightJson.pointLight1} />
      <PointLight pointLightConfig={pointLightJson.pointLight2} />
      <PointLight pointLightConfig={pointLightJson.pointLight3} />
      <PointLight pointLightConfig={pointLightJson.pointLight4} />
      <PointLight pointLightConfig={pointLightJson.pointLight5} />
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

export default No003;