import React from "react";

import { useGLTF, Sky, Stars } from "@react-three/drei";

import gltfNodeToMesh from "../helper/gltfNodeToMesh.js";
import dumpObject from "../helper/dump.js";

import glbUrl from "../glb/no001.glb";
// import glbUrl from "../glb/polly.glb";
// import glbUrl from './glb/dinosaur.glb'

const No001 = () => {
  const glb = useGLTF(glbUrl);
  const nodes = glb.nodes;

  // console.log(dumpObject(glb.scene).join('\n'))
  //console.log(nodes)

  return (
    <group>
      {gltfNodeToMesh(nodes)}
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
        count={50000}
        factor={4}
        saturation={0}
        fade
      />
    </group>
  );
};

useGLTF.preload(glbUrl);

export default No001;
