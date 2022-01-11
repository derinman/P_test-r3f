import React from "react";

const gltfNodeToMesh = (nodes, excludedMeshNames = []) => {
  const nodesMeshOnly = Object.values(nodes).filter((data) =>
    data.type.includes("Mesh")
  );

  let nodesMeshOnlyIncluded = [];

  nodesMeshOnly.forEach((data) => {
    if (!excludedMeshNames.includes(data.name)) {
      nodesMeshOnlyIncluded.push(data);
    }
  });

  // console.log("nodesMeshOnlyIncluded: ", nodesMeshOnlyIncluded);

  return nodesMeshOnlyIncluded.map((data) => (
    <mesh
      key={data.name}
      geometry={data.geometry}
      material={data.material}
      position={[data.position.x, data.position.y, data.position.z]}
      castShadow={true}
      receiveShadow={true}
    />
  ));
};

export default gltfNodeToMesh;
