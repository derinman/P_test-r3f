import React from "react";

const gltfNodeToMesh = (nodes) => {
  const nodesMeshOnly = Object.values(nodes).filter((data) =>
    data.type.includes("Mesh")
  );

  return nodesMeshOnly.map((data) => 
    <mesh
      key={data.name}
      geometry={data.geometry}
      material={data.material}
    position={[data.position.x,data.position.y,data.position.z]}
    //position={[0,0,0]}
      castShadow={true}
      receiveShadow={true}
    />
  );
};

export default gltfNodeToMesh;
