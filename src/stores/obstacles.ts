import { create } from "zustand"

import { RefObject } from "react"
import * as THREE from "three"

export interface ObstacleState {
  obstacles: RefObject<THREE.Mesh | THREE.Group>[]
  setObstacles: (obstacles: RefObject<THREE.Mesh | THREE.Group>[]) => void
  addObstacle: (obstacle: RefObject<THREE.Mesh>) => void
}

export const useObstaclesStore = create<ObstacleState>((set) => ({
  obstacles: [],
  setObstacles: (obstacles: RefObject<THREE.Mesh | THREE.Group>[]) =>
    set({ obstacles }),
  addObstacle: (obstacle: RefObject<THREE.Mesh | THREE.Group>) =>
    set((state) => ({
      obstacles: [...state.obstacles, obstacle],
    })),
}))
