import { create } from "zustand"

type TStep = "weightless" | "fall" | "compress" | "release" | "jump"

interface BearState {
  currentStep: TStep
  nextStep: () => void
}

function nextStep(currentStep: TStep): TStep {
  switch (currentStep) {
    case "weightless":
      return "fall"
    case "fall":
      return "compress"
    case "compress":
      return "release"
    case "release":
      return "jump"
    case "jump":
      return "weightless"
  }
}

export const useBallStore = create<BearState>((set) => ({
  currentStep: "weightless",
  nextStep: () =>
    set((state) => ({ currentStep: nextStep(state.currentStep) })),
}))
