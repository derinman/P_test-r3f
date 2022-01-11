import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";

import {
  useGLTF,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  ContactShadows,
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

import glbUrl from "./glb/ponycartoon.glb";

import cameraJson from "./camLightConfig/PonyCartoon/camera.json";
import pointLightJson from "./camLightConfig/PonyCartoon/pointLight.json";
import spotLightJson from "./camLightConfig/PonyCartoon/spotLight.json";
import ambientLightJson from "./camLightConfig/PonyCartoon/ambientLight.json";
import hemisphereLightJson from "./camLightConfig/PonyCartoon/hemisphereLight.json";
import directionalLightJson from "./camLightConfig/PonyCartoon/directionalLight.json";
import rectAreaLightJson from "./camLightConfig/PonyCartoon/rectAreaLight.json";

const PonyCartoon = () => {
  const glb = useGLTF(glbUrl);
  const nodes = glb.nodes;

  //console.log(dumpObject(glb.scene).join('\n'))
  // console.log(glb.scene)

  const glbRef = useRef();
  const mainCameraRef = useRef();
  const controlsRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    glbRef.current.rotation.z = Math.sin(t / 1.5) / 20;
    glbRef.current.rotation.x = Math.cos(t / 4) / 20;
    glbRef.current.rotation.y = Math.sin(t / 4) / 8;
    glbRef.current.position.y = Math.sin(t / 1.5) / 10;
  });

  return (
    <group>
      <group ref={glbRef}>{gltfNodeToMesh(nodes)}</group>
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

      <Environment preset="lobby" />

      <ContactShadows
        rotation-x={Math.PI / 2}
        position={[0, -0.7, 0]}
        opacity={0.4}
        width={20}
        height={20}
        blur={0.9}
        far={5}
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
    </group>
  );
};

useGLTF.preload(glbUrl);

export default PonyCartoon;
