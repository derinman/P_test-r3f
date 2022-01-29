import React, { useEffect, useRef } from "react";

import { useFrame } from "@react-three/fiber";

import {
  useGLTF,
  OrbitControls,
  PerspectiveCamera,
  Sky,
  Environment,
} from "@react-three/drei";

import { PointLight, HemisphereLight, AmbientLight } from "./light/Light.js";

import gltfNodeToMesh from "./helper/gltfNodeToMesh.js";
// import dumpObject from "./helper/dump.js";

import glbUrl from "./glb/no005.glb";

import cameraJson from "./camLightConfig/No005/camera.json";
import pointLightJson from "./camLightConfig/No005/pointLight.json";
import hemisphereLightJson from "./camLightConfig/No005/hemisphereLight.json";
import ambientLightJson from "./camLightConfig/No005/ambientLight.json";

const No005 = () => {
  const glb = useGLTF(glbUrl);
  const nodes = glb.nodes;
  //console.log(dumpObject(glb.scene).join("\n"));

  const mainCameraRef = useRef();
  const controlsRef = useRef();
  const screen_1Ref = useRef();
  const screen_2Ref = useRef();
  const screen_3Ref = useRef();
  const screen_4Ref = useRef();
  const screen_5Ref = useRef();
  const screen_6Ref = useRef();
  const screen_7Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    let seed = Math.floor(Math.random() * 7) + 1;

    screen_1Ref.current.position.y =
      -6.968888759613037 + Math.abs(Math.sin(t)) * 2.5;
    if (Math.random() > 0.9 && seed === 1) {
      screen_1Ref.current.scale.y = Math.abs(Math.sin(t / 10)) * 20 + 1;
    } else {
      screen_1Ref.current.scale.y = Math.abs(Math.sin(t / 10)) * 2 + 1;
    }
    screen_1Ref.current.scale.z = Math.abs(Math.sin(t / 20)) * 2 + 1;

    screen_2Ref.current.position.y =
      -6.968888759613037 + Math.abs(Math.sin(t)) * 2.25;
    if (Math.random() > 0.9 && seed === 2) {
      screen_2Ref.current.scale.y = Math.abs(Math.sin(t / 10)) * 25 + 1;
    } else {
      screen_2Ref.current.scale.y = Math.abs(Math.sin(t / 10)) * 1.75 + 1;
    }
    screen_2Ref.current.scale.z = Math.abs(Math.sin(t / 20)) * 1.75 + 1;

    screen_3Ref.current.position.y =
      -6.968888759613037 + Math.abs(Math.sin(t)) * 2;
    if (Math.random() > 0.9 && seed === 3) {
      screen_3Ref.current.scale.y = Math.abs(Math.sin(t / 10)) * 30 + 1;
    } else {
      screen_3Ref.current.scale.y = Math.abs(Math.sin(t / 10)) * 1.5 + 1;
    }
    screen_3Ref.current.scale.z = Math.abs(Math.sin(t / 20)) * 1.5 + 1;

    screen_4Ref.current.position.y =
      -6.968888759613037 + Math.abs(Math.sin(t)) * 1.75;
    if (Math.random() > 0.9 && seed === 4) {
      screen_4Ref.current.scale.y = Math.abs(Math.sin(t / 10)) * 35 + 1;
    } else {
      screen_4Ref.current.scale.y = Math.abs(Math.sin(t / 10)) * 1.25 + 1;
    }
    screen_4Ref.current.scale.z = Math.abs(Math.sin(t / 20)) * 1.25 + 1;

    screen_5Ref.current.position.y =
      -6.968888759613037 + Math.abs(Math.sin(t)) * 1.5;
    if (Math.random() > 0.9 && seed === 5) {
      screen_5Ref.current.scale.y = Math.abs(Math.sin(t / 10)) * 40 + 1;
    } else {
      screen_5Ref.current.scale.y = Math.abs(Math.sin(t / 10)) * 1 + 1;
    }
    screen_5Ref.current.scale.z = Math.abs(Math.sin(t / 20)) * 1 + 1;

    screen_6Ref.current.position.y =
      -6.968888759613037 + Math.abs(Math.sin(t)) * 1.25;
    if (Math.random() > 0.9 && seed === 6) {
      screen_6Ref.current.scale.y = Math.abs(Math.sin(t / 10)) * 45 + 1;
    } else {
      screen_6Ref.current.scale.y = Math.abs(Math.sin(t / 10)) * 0.75 + 1;
    }
    screen_6Ref.current.scale.z = Math.abs(Math.sin(t / 20)) * 0.75 + 1;

    screen_7Ref.current.position.y =
      -6.968888759613037 + Math.abs(Math.sin(t)) * 1;
    if (Math.random() > 0.9 && seed === 7) {
      screen_7Ref.current.scale.y = Math.abs(Math.sin(t / 10)) * 50 + 1;
    } else {
      screen_7Ref.current.scale.y = Math.abs(Math.sin(t / 10)) * 0.5 + 1;
    }
    screen_7Ref.current.scale.z = Math.abs(Math.sin(t / 20)) * 0.5 + 1;
  });

  useEffect(() => {
    screen_1Ref.current.material.wireframe = true;
    screen_1Ref.current.material.color.r = 0;
    screen_1Ref.current.material.color.g = 0;
    screen_1Ref.current.material.color.b = 0;
  }, []);

  return (
    <group>
      {gltfNodeToMesh(nodes, [
        "screen_1",
        "screen_2",
        "screen_3",
        "screen_4",
        "screen_5",
        "screen_6",
        "screen_7",
      ])}
      <mesh
        ref={screen_1Ref}
        {...nodes.screen_1}
        castShadow={true}
        receiveShadow={true}
      />
      <mesh
        ref={screen_2Ref}
        {...nodes.screen_2}
        castShadow={true}
        receiveShadow={true}
      />
      <mesh
        ref={screen_3Ref}
        {...nodes.screen_3}
        castShadow={true}
        receiveShadow={true}
      />
      <mesh
        ref={screen_4Ref}
        {...nodes.screen_4}
        castShadow={true}
        receiveShadow={true}
      />
      <mesh
        ref={screen_5Ref}
        {...nodes.screen_5}
        castShadow={true}
        receiveShadow={true}
      />
      <mesh
        ref={screen_6Ref}
        {...nodes.screen_6}
        castShadow={true}
        receiveShadow={true}
      />
      <mesh
        ref={screen_7Ref}
        {...nodes.screen_7}
        castShadow={true}
        receiveShadow={true}
      />
      <PointLight pointLightConfig={pointLightJson.pointLight1} />
      <HemisphereLight
        hemisphereLightConfig={hemisphereLightJson.hemisphereLight1}
      />
      <AmbientLight
        ambientLightConfig={ambientLightJson.ambientLight1}
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

export default No005;
