import React, {useState,useEffect, useRef ,Suspense} from 'react'

import { Canvas} from '@react-three/fiber'

import { useGLTF } from "@react-three/drei"



import gltfNodeToMesh from './controller/gltfNodeToMesh.js'
import dumpObject from './controller/dump.js'

// import url from './glb/box.gltf'

import ab from './glb/box.gltf'

//console.log(ab)

const PonyCartoonModel = (props)=> {

  const {glb} = props

  
  const gltf = useGLTF('/glb/box.gltf')
  const group = useRef()
  // console.log(gltf)
  console.log(glb)
  //console.log(dumpObject(gltf.scene).join('\n'))


  let nodes = gltf.nodes
  let nodesTest = glb.nodes
  // console.log(nodes)
  // console.log(nodesTest)
  let nodesMeshOnly = Object.values(nodes).filter(data=>data.type==='Mesh')
  //let nodesMeshOnlyTest = Object.values(nodesTest).filter(data=>data.type==='Mesh')



  // console.log(nodesMeshOnly)
  // console.log(nodesTest)

  return (
    <group
      ref={group}
    >
      {gltfNodeToMesh(nodesMeshOnly)}
    </group>
  )
}



const App=()=>{

  const [jsonData, setJsonData] = useState({});
  const [isLoad, setIsLoad] = useState(true)


  useEffect(() => {
    const fetchJSON = async () => {
      const response = await fetch("/glb/box.gltf");
      //console.log(response)
      let json = await response.json();
      setJsonData(json);
    };

    fetchJSON();
    setIsLoad(false)
  }, []);

  return( 
    <div style={{width:'100vw',height:'100vh'}}>
    <Canvas
      concurrent//這個關掉會很慘
      camera={{position:[0,0,13],fov:40}}
    >
      <ambientLight 
        intensity={0.3}
        color={'#42b8eb'}
      />
        <Suspense fallback={null}>
          <PonyCartoonModel
            glb={jsonData}
          />
        </Suspense> 
    </Canvas>
    
    </div>
            )
}

export default App;

//useGLTF.preload('/glb/ponycartoon.glb')
