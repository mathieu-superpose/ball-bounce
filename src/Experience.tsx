import { Canvas } from "@react-three/fiber"

import "./Experience.css"

import Scene from "./Scene"

function Experience() {
  return (
    <div className="experience">
      <div className="canvas-container">
        <Canvas>
          <Scene />
        </Canvas>
      </div>
    </div>
  )
}

export default Experience
