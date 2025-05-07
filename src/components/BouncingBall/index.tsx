import { useMemo, useRef } from "react"
import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

import { useBounce } from "../../hooks/useBounce"

import fragment from "./shader/fragment.glsl"
import vertex from "./shader/vertex.glsl"

const BouncingBallShaderMaterial = shaderMaterial({}, vertex, fragment)

extend({ BouncingBallShaderMaterial })

const RADIUS = 1

function BouncingBall({ lightPosition }: { lightPosition: THREE.Vector3 }) {
  const ballRef = useRef<THREE.Mesh>(null)

  const material = useMemo(() => {
    const material = new BouncingBallShaderMaterial()

    material.uniforms.uLightPosition = new THREE.Uniform(lightPosition)

    return material
  }, [])

  useBounce(ballRef)

  return (
    <mesh material={material} castShadow ref={ballRef}>
      <sphereGeometry args={[RADIUS, 32, 32]} />
    </mesh>
  )
}
export default BouncingBall
