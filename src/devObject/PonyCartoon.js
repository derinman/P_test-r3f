import React, { useState, useRef, Suspense, useEffect } from "react";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  PerspectiveCamera,
  softShadows,
} from "@react-three/drei";


import gltfNodeToMesh from "../helper/gltfNodeToMesh.js";
import dumpObject from "../helper/dump.js";

import glbUrl from '../glb/ponycartoon.glb'
// import glbUrl from "../glb/polly.glb";
// import glbUrl from './glb/dinosaur.glb'


const PonyCartoon = () => {
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

useGLTF.preload(glbUrl);

export default PonyCartoon
