import { useMemo, useRef } from "react"
import * as THREE from "three"
import { extend, useFrame } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

import fragement from "./shader/fragment.glsl"
import vertex from "./shader/vertex.glsl"
import { time } from "three/tsl"

const BouncingBallShaderMaterial = shaderMaterial({}, vertex, fragement)

extend({ BouncingBallShaderMaterial })

const GRAVITY = -9.8 * 2
const JUMP_VELOCITY = 20
const RADIUS = 1

function BouncingBall({ lightPosition }: { lightPosition: THREE.Vector3 }) {
  const ballRef = useRef<THREE.Mesh>(null)

  const material = useMemo(() => {
    const material = new BouncingBallShaderMaterial()

    material.uniforms.uLightPosition = new THREE.Uniform(lightPosition)

    return material
  }, [])

  const velocity = useRef(0)
  const timeRatioRef = useRef(1)

  useFrame((_state, delta) => {
    if (!ballRef?.current) {
      return
    }

    const ball = ballRef.current

    // Update the ball's position based on the velocity and gravity
    if (
      ball.position.y <= -RADIUS / 2 &&
      velocity.current <= 0 &&
      ball.scale.y == 0.5
    ) {
      velocity.current = JUMP_VELOCITY
    }

    const timeRatio = timeRatioRef.current

    ball.position.y += velocity.current * delta * timeRatio

    velocity.current += GRAVITY * delta * timeRatio

    if (ball.scale.y < 1 && velocity.current < 0) {
      timeRatioRef.current = Math.max(0.2, timeRatioRef.current - delta * 30)
    } else {
      timeRatioRef.current = Math.min(1, timeRatioRef.current + delta * 5)
    }

    if (ball.position.y < 0 && velocity.current < 0) {
      // update y scale to make it look like a bounce
      ball.scale.y -= delta * 10 * timeRatio
      ball.scale.y = Math.max(ball.scale.y, 0.5)

      ball.scale.x = 1 / (ball.scale.y * 1.2)
      ball.scale.z = 1 / (ball.scale.y * 1.2)
    } else {
      // reset y scale
      ball.scale.y += delta * 10 * timeRatio
      ball.scale.y = Math.min(ball.scale.y, 1)

      ball.scale.x = Math.max(1, ball.scale.x - delta * 10)
      ball.scale.z = Math.max(1, ball.scale.z - delta * 10)
    }
  })

  return (
    <mesh material={material} castShadow ref={ballRef}>
      <sphereGeometry args={[RADIUS, 32, 32]} />
    </mesh>
  )
}
export default BouncingBall
