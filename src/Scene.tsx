import { useEffect, useMemo } from "react"
import * as THREE from "three"
import { useThree } from "@react-three/fiber"

import Environment from "./components/Environment"
import Floor from "./components/Floor"
import BouncingBall from "./components/BouncingBall/"

function Scene() {
  const { camera } = useThree()
  
  const lightPosition = useMemo(() => new THREE.Vector3(10, 24, 5), [])

  useEffect(() => {
    camera.lookAt(0, 4, 4)
  }, [])

  return (
    <>
      <Environment lightPosition={lightPosition} />
      <Floor />
      <BouncingBall lightPosition={lightPosition} />
    </>
  )
}
export default Scene
