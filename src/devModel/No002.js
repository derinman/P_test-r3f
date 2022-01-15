import React, { useEffect, useRef } from "react";

import { useFrame } from "@react-three/fiber";

import {
  useGLTF,
  Sky,
  Stars,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

import {
  PointLight,
  SpotLight,
  AmbientLight,
  HemisphereLight,
  DirectionalLight,
  RectAreaLight,
} from "./light/Light.js";

import gltfNodeToMesh from "./helper/gltfNodeToMesh.js";
import dumpObject from "./helper/dump.js";

import glbUrl from "./glb/no002.glb";

import cameraJson from "./camLightConfig/No002/camera.json";
import pointLightJson from "./camLightConfig/No002/pointLight.json";
import spotLightJson from "./camLightConfig/No002/spotLight.json";
import ambientLightJson from "./camLightConfig/No002/ambientLight.json";
import hemisphereLightJson from "./camLightConfig/No002/hemisphereLight.json";
import directionalLightJson from "./camLightConfig/No002/directionalLight.json";
import rectAreaLightJson from "./camLightConfig/No002/rectAreaLight.json";

const No002 = () => {
  const glb = useGLTF(glbUrl);
  const nodes = glb.nodes;

  //console.log(dumpObject(glb.scene).join("\n"));
  console.log(nodes)

  const mainCameraRef = useRef();
  const controlsRef = useRef();
  const meshBenchRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshBenchRef.current.rotation.y = Math.sin(t / 4) / 30;
    meshBenchRef.current.position.y = Math.abs(Math.sin(t / 0.25) / 10);

  });

  return (
    <group>
      {gltfNodeToMesh(nodes, ["bench"])}

      <mesh
        ref={meshBenchRef}
        {...nodes.bench}
        castShadow={true}
        receiveShadow={true}
      />

      <PointLight pointLightConfig={pointLightJson.pointLight1} />
      <PointLight pointLightConfig={pointLightJson.pointLight2} />
      <PointLight pointLightConfig={pointLightJson.pointLight3} />
      <PointLight pointLightConfig={pointLightJson.pointLight4} />
      <PointLight pointLightConfig={pointLightJson.pointLight5} />
      <PointLight pointLightConfig={pointLightJson.pointLight6} />
      <SpotLight spotLightConfig={spotLightJson.spotLight1} />
      <SpotLight spotLightConfig={spotLightJson.spotLight2} />
      <SpotLight spotLightConfig={spotLightJson.spotLight3} />
      <AmbientLight ambientLightConfig={ambientLightJson.ambientLight1} />
      <HemisphereLight
        hemisphereLightConfig={hemisphereLightJson.hemisphereLight1}
      />
      <DirectionalLight
        directionalLightConfig={directionalLightJson.directionalLight1}
      />
      <RectAreaLight rectAreaLightConfig={rectAreaLightJson.rectAreaLight1} />

      <Sky
        distance={450000}
        sunPosition={[1, 1, 0]}
        inclination={0}
        azimuth={0.25}
        rayleigh={0}
      />
      <Stars
        radius={100}
        depth={50}
        count={30000}
        factor={4}
        saturation={0}
        fade
      />
      <Environment preset="night" />

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
    </group>
  );
};

useGLTF.preload(glbUrl);

export default No002;
