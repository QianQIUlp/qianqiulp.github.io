// All hardware is stationary relative to the guitar. Batch opaque pieces by
// material, retaining every vertex, UV, normal and triangle of the original.
export function batchGuitar(THREE, guitar) {
  guitar.updateMatrixWorld(true);
  const batches = new Map(), originals = new Set();
  guitar.traverse(object => {
    if (!object.isMesh) return;
    const geometry = object.geometry.clone().applyMatrix4(object.matrixWorld);
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    const groups = Array.isArray(object.material) ? geometry.groups : [{start: 0, count: geometry.index?.count ?? geometry.attributes.position.count, materialIndex: 0}];
    for (const group of groups) {
      const material = materials[group.materialIndex];
      if (!batches.has(material)) batches.set(material, {parts: [], vertices: 0, indices: 0});
      const batch = batches.get(material);
      batch.parts.push({geometry, start: group.start, count: group.count});
      batch.vertices += geometry.attributes.position.count;batch.indices += group.count;
    }
    originals.add(object.geometry);
  });
  guitar.clear();
  const transformed = new Set();
  for (const [material, batch] of batches) {
    const position = new Float32Array(batch.vertices * 3), normal = new Float32Array(batch.vertices * 3), uv = new Float32Array(batch.vertices * 2);
    const index = batch.vertices > 65535 ? new Uint32Array(batch.indices) : new Uint16Array(batch.indices);
    let vertexOffset = 0, indexOffset = 0;
    for (const part of batch.parts) {
      const {geometry, start, count} = part, attributes = geometry.attributes;
      position.set(attributes.position.array, vertexOffset * 3);
      normal.set(attributes.normal.array, vertexOffset * 3);
      if (attributes.uv) uv.set(attributes.uv.array, vertexOffset * 2);
      for (let i = 0; i < count; i++) index[indexOffset + i] = vertexOffset + (geometry.index ? geometry.index.getX(start + i) : start + i);
      vertexOffset += attributes.position.count;indexOffset += count;transformed.add(geometry);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normal, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geometry.setIndex(new THREE.BufferAttribute(index, 1));
    guitar.add(new THREE.Mesh(geometry, material));
  }
  for (const geometry of [...originals, ...transformed]) geometry.dispose();
}
