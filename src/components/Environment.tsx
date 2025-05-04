import * as THREE from "three"

function Environment({ lightPosition }: { lightPosition: THREE.Vector3 }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={lightPosition}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  )
}
export default Environment
