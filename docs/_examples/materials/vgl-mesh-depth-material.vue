<template>
  <div>
    <vgl-renderer
      antialias
      camera="camera"
      scene="scene"
    >
      <vgl-scene name="scene">
        <vgl-torus-knot-geometry name="geo" />
        <vgl-mesh-depth-material name="mat" />
        <vgl-mesh
          geometry="geo"
          material="mat"
        />
      </vgl-scene>
      <vgl-perspective-camera
        orbit-position="5 1 0.5"
        near="3"
        far="7"
        name="camera"
      />
    </vgl-renderer>
  </div>
</template>
