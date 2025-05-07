import { create } from "zustand"

type TStep = "weightless" | "fall" | "compress" | "release" | "jump"

interface BallState {
  currentStep: TStep
  setStep: (step: TStep) => void
}

export const useBallStore = create<BallState>((set) => ({
  currentStep: "weightless",
  setStep: (step: TStep) => set({ currentStep: step }),
}))
