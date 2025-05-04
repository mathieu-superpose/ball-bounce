function Floor() {
  return (
    <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[3.5, 128]} />

      <meshStandardMaterial color="lightblue" />
    </mesh>
  )
}
export default Floor
