import { useEffect, useRef } from "react"
import * as THREE from "three"
import { DragControls, Text } from "@react-three/drei"

import { useObstaclesStore, ObstacleState } from "../stores/obstacles"

function Floor() {
  const floorRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Mesh>(null)
  const addObstacle = useObstaclesStore(
    (state: ObstacleState) => state.addObstacle
  )

  useEffect(() => {
    if (floorRef.current) {
      addObstacle({ current: floorRef.current })
    }
  }, [floorRef, addObstacle])

  const handleOver = () => {
    document.body.style.cursor = "grab"
    if (textRef.current) {
      textRef.current.visible = true
    }
  }
  const handleOut = () => {
    document.body.style.cursor = "auto"
    if (textRef.current) {
      textRef.current.visible = false
    }
  }

  return (
    <DragControls>
      <group onPointerOver={handleOver} onPointerOut={handleOut}>
        <mesh
          ref={floorRef}
          position={[0, -1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <circleGeometry args={[3.5, 128]} />
          <meshStandardMaterial color="lightblue" />
        </mesh>
        <Text
          ref={textRef}
          visible={false}
          fontSize={1}
          position={[0, 0, 1]}
          color="#cccccc"
        >
          Drag me
        </Text>
      </group>
    </DragControls>
  )
}

export default Floor
