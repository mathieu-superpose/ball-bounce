import { useMemo, useRef } from "react"
import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { shaderMaterial, Trail } from "@react-three/drei"

import { useBounce } from "../../hooks/useBounce"

import fragment from "./shader/fragment.glsl"
import vertex from "./shader/vertex.glsl"

const BouncingBallShaderMaterial = shaderMaterial({}, vertex, fragment)

extend({ BouncingBallShaderMaterial })

const RADIUS = 1

function BouncingBall({ lightPosition }: { lightPosition: THREE.Vector3 }) {
  const ballRef = useRef<THREE.Mesh>(null)

  const material = useMemo(() => {
    const material = new BouncingBallShaderMaterial()

    material.uniforms.uLightPosition = new THREE.Uniform(lightPosition)

    return material
  }, [])

  useBounce(ballRef)

  return (
    <Trail
      width={25} // Width of the line
      color={"hotpink"} // Color of the line
      length={1} // Length of the line
      decay={1} // How fast the line fades away
      local={false} // Wether to use the target's world or local positions
      stride={0} // Min distance between previous and current point
      interval={2} // Number of frames to wait before next calculation
      target={undefined} // Optional target. This object will produce the trail.
      attenuation={(width) => width} // A function to define the width in each point along it.
    >
      <mesh material={material} castShadow ref={ballRef} position={[0, 4, 0]}>
        <sphereGeometry args={[RADIUS, 32, 32]} />
      </mesh>
    </Trail>
  )
}
export default BouncingBall
