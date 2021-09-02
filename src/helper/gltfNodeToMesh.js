import React from 'react'



const gltfNodeToMesh =(nodes)=>{

    // console.log(nodes)

    const nodesMeshOnly = Object.values(nodes).filter(data=>data.type.includes('Mesh')  )
    
    console.log(nodesMeshOnly)

    // nodesMeshOnly.forEach((data) => {
    //     console.log(data)  
    // })
    return(
        nodesMeshOnly.map(
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