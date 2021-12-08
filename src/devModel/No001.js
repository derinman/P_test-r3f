import React, { useRef } from "react";

import {
  useGLTF,
} from "@react-three/drei";


import gltfNodeToMesh from "../helper/gltfNodeToMesh.js";
import dumpObject from "../helper/dump.js";

import glbUrl from '../glb/no001.glb'
// import glbUrl from "../glb/polly.glb";
// import glbUrl from './glb/dinosaur.glb'

const No001 = () => {
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

export default No001
