import React from "react";

import { useGLTF } from "@react-three/drei";

import gltfNodeToMesh from "../helper/gltfNodeToMesh.js";
import dumpObject from "../helper/dump.js";

import glbUrl from "../glb/alphatest.glb";

const AlphaTest = () => {
  const glb = useGLTF(glbUrl);
  const nodes = glb.nodes;

  // console.log(dumpObject(glb.scene).join('\n'))

  return <group>{gltfNodeToMesh(nodes)}</group>;
};

useGLTF.preload(glbUrl);

export default AlphaTest;
