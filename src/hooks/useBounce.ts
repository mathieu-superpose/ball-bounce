import { useFrame, useThree } from "@react-three/fiber"
import { RefObject, useMemo, useRef } from "react"
import * as THREE from "three"

import { useBallStore } from "../stores/ball"
import { useObstaclesStore } from "../stores/obstacles"

const GRAVITY = -9.8 * 2
const JUMP_VELOCITY = 20
const MAX_FALL_VELOCITY = -20
const RADIUS = 1
const TIMESCALE = 1
const TRANSITION_SPEED = 5

export function useBounce(ref: RefObject<THREE.Mesh | null>) {
  const targetScale = useMemo(() => new THREE.Vector3(1, 1, 1), [])

  const currentStep = useBallStore((state) => state.currentStep)
  const setStep = useBallStore((state) => state.setStep)

  const velocity = useRef(0)

  const obstaclesRef = useObstaclesStore((state) => state.obstacles)
  const obstacles = useMemo(() => {
    return obstaclesRef.map((obstacle) => obstacle.current)
  }, [obstaclesRef])

  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const rayDirection = useMemo(() => new THREE.Vector3(0, -1, 0), [])

  const { camera } = useThree()

  useFrame((_state, delta) => {
    if (!ref?.current) {
      return
    }

    const ball = ref.current
    const dt = TIMESCALE * delta

    // check for collision with obstacles
    raycaster.set(ball.position, rayDirection)

    const intersects = raycaster.intersectObjects(obstacles, false)

    const minDistance = intersects.reduce((acc, intersect) => {
      const distance = intersect.distance
      if (distance < acc) {
        return distance
      }
      return acc
    }, 100)

    // update the velocity
    if (minDistance <= 0.5 * RADIUS) {
      velocity.current = JUMP_VELOCITY
    }
    velocity.current += GRAVITY * dt

    // clamp the velocity
    if (velocity.current < MAX_FALL_VELOCITY) {
      velocity.current = MAX_FALL_VELOCITY
    }

    // update the position
    ball.position.y += velocity.current * dt

    // replace the ball if it falls below the camera
    if (ball.position.y < camera.position.y - 10) {
      ball.position.y = camera.position.y + 10
    }

    if (Math.abs(velocity.current) < 2.5) {
      if (currentStep !== "weightless") {
        setStep("weightless")
        targetScale.set(1, 1, 1)
      }
    } else if (minDistance <= RADIUS * 2) {
      if (currentStep !== "compress") {
        setStep("compress")
        targetScale.set(1.3, 0.7, 1.3)
      }
    } else if (velocity.current < -2.5) {
      if (currentStep !== "fall") {
        setStep("fall")
        targetScale.set(0.9, 1.1, 0.9)
      }
    } else if (velocity.current > 12) {
      if (currentStep !== "release") {
        setStep("release")
        targetScale.set(0.7, 1.2, 0.7)
      }
    } else {
      if (currentStep !== "jump") {
        setStep("jump")
        targetScale.set(1, 1, 1)
      }
    }

    // update scale
    ball.scale.lerp(targetScale, dt * TRANSITION_SPEED)
  })
}
