import { useBallStore } from "../../stores/ball"

function State() {
  const currentStep = useBallStore((state) => state.currentStep)

  return <div>{currentStep}</div>
}
export default State
