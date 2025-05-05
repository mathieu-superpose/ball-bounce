import { useFrame } from "@react-three/fiber"
import { RefObject, useRef } from "react"
import * as THREE from "three"

const GRAVITY = -9.8 * 2
const JUMP_VELOCITY = 20
const RADIUS = 1

export function useBounce(ref: RefObject<THREE.Mesh | null>) {
  const velocity = useRef(0)

  useFrame((_state, delta) => {
    if (!ref?.current) {
      return
    }

    const ball = ref.current

    // update the velocity
    if (ball.position.y <= 0 - RADIUS) {
      velocity.current = JUMP_VELOCITY
    }

    // update the position
    ball.position.y += velocity.current * delta

    // update the velocity
    velocity.current += GRAVITY * delta
  })
}
