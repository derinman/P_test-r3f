import React from 'react'

const gltfNodeToMesh =(nodes)=>{

    //動畫應該寫在這邊
    return(
    nodes.map(
        (data)=>
        
        <mesh
            key={data.name}
            geometry={data.geometry}
            material={data.material}
            position={[data.position.x,data.position.y,data.position.z]}
            //castShadow
            receiveShadow
        />
        
        ))
}

export default gltfNodeToMesh