import { create } from "zustand"

type TStep = "weightless" | "fall" | "compress" | "release" | "jump"

interface BearState {
  currentStep: TStep
  setStep: (step: TStep) => void
}

export const useBallStore = create<BearState>((set) => ({
  currentStep: "weightless",
  setStep: (step: TStep) => set({ currentStep: step }),
}))
