import { useMemo, useRef } from "react"
import * as THREE from "three"
import { extend, useFrame } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

import fragement from "./shader/fragment.glsl"
import vertex from "./shader/vertex.glsl"

const BouncingBallShaderMaterial = shaderMaterial({}, vertex, fragement)

extend({ BouncingBallShaderMaterial })

const GRAVITY = -9.8 * 2
const JUMP_VELOCITY = 20

function BouncingBall({ lightPosition }: { lightPosition: THREE.Vector3 }) {
  const ballRef = useRef<THREE.Mesh>(null)

  const material = useMemo(() => {
    const material = new BouncingBallShaderMaterial()

    material.uniforms.uLightPosition = new THREE.Uniform(lightPosition)
    material.uniforms.uVelocity = new THREE.Uniform(0)

    return material
  }, [])

  const velocity = useRef(0)

  useFrame((_state, delta) => {
    if (!ballRef?.current) {
      return
    }

    const ball = ballRef.current

    // Update the ball's position based on the velocity and gravity
    if (ball.position.y <= 0 && velocity.current <= 0) {
      velocity.current = JUMP_VELOCITY
    }

    ball.position.y += velocity.current * delta

    material.uniforms.uVelocity.value = velocity.current

    velocity.current += GRAVITY * delta
  })

  return (
    <mesh material={material} castShadow ref={ballRef}>
      <sphereGeometry args={[1, 32, 32]} />
    </mesh>
  )
}
export default BouncingBall
