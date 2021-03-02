<template>
  <vgl-renderer
    camera="camera"
    scene="scene"
  >
    <vgl-scene name="scene">
      <vgl-obj-loader src="/obj/seahorse.obj" />
      <vgl-ambient-light intensity="0.5" />
      <vgl-directional-light
        position="1 1 1"
        intensity="0.5"
      />
    </vgl-scene>
    <vgl-perspective-camera
      name="camera"
      orbit-position="300 1 0.2"
      orbit-target="0 0 -300"
    />
  </vgl-renderer>
</template>
