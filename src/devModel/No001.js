import React from "react";

import { useGLTF } from "@react-three/drei";

import gltfNodeToMesh from "../helper/gltfNodeToMesh.js";
import dumpObject from "../helper/dump.js";

import glbUrl from "../glb/no001.glb";
// import glbUrl from "../glb/polly.glb";
// import glbUrl from './glb/dinosaur.glb'

const No001 = () => {
  const glb = useGLTF(glbUrl);
  const nodes = glb.nodes;

  // console.log(dumpObject(glb.scene).join('\n'))

  return <group>{gltfNodeToMesh(nodes)}</group>;
};

useGLTF.preload(glbUrl);

export default No001;
