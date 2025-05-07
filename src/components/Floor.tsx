import * as THREE from "three"

import { useEffect, useRef } from "react"
import { useObstaclesStore, ObstacleState } from "../stores/obstacles"

function Floor() {
  const floorRef = useRef<THREE.Mesh>(null)
  const addObstacle = useObstaclesStore(
    (state: ObstacleState) => state.addObstacle
  )

  useEffect(() => {
    if (floorRef.current) {
      addObstacle({ current: floorRef.current })
    }
  }, [floorRef, addObstacle])

  return (
    <mesh
      ref={floorRef}
      position={[0, -1, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <circleGeometry args={[3.5, 128]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  )
}

export default Floor
