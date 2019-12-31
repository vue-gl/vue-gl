<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-torus-knot-geometry name="geo" />
        <vgl-mesh-normal-material name="mat" />
        <vgl-mesh
          geometry="geo"
          material="mat"
        />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="5 1 0.5" />
    </vgl-renderer>
  </div>
</template>
