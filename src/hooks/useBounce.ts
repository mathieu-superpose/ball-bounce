import { useFrame } from "@react-three/fiber"
import { RefObject, useMemo, useRef } from "react"
import * as THREE from "three"

import { useBallStore } from "../stores/ball"

const GRAVITY = -9.8 * 2
const JUMP_VELOCITY = 20
const RADIUS = 1
const TIMESCALE = 1 / 4

// type TStep = "weightless" | "fall" | "compress" | "release" | "jump"

export function useBounce(ref: RefObject<THREE.Mesh | null>) {
  const targetScale = useMemo(() => new THREE.Vector3(1, 1, 1), [])

  const currentStep = useBallStore((state) => state.currentStep)
  const setStep = useBallStore((state) => state.setStep)

  const velocity = useRef(0)

  useFrame((_state, delta) => {
    if (!ref?.current) {
      return
    }

    const ball = ref.current
    const dt = TIMESCALE * delta

    // update the velocity
    if (ball.position.y <= 0 - RADIUS) {
      velocity.current = JUMP_VELOCITY
    }
    velocity.current += GRAVITY * dt

    // update the position
    ball.position.y += velocity.current * dt

    if (Math.abs(velocity.current) < 1) {
      setStep("weightless")
    } else if (ball.position.y <= 0 + RADIUS) {
      setStep("compress")
    } else if (velocity.current < -0.2) {
      setStep("fall")
    } else if (velocity.current > 15) {
      setStep("release")
    } else {
      setStep("jump")
    }
  })
}
