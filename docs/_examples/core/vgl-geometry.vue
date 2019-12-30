<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-geometry
          name="vertices"
          position-attribute="-5, 0, 0, 5, 0, 0, 5, 5, 0, -5, 5, 0, -5, 4, 0, 4, 4, 0, 4, 1, 0, -5,
                              1, 0"
          color-attribute="1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1"
        />
        <vgl-line-basic-material
          name="line"
          linewidth="2"
          vertex-colors="vertex"
        />
        <vgl-line-loop
          geometry="vertices"
          material="line"
        />
        <vgl-line-loop
          geometry="vertices"
          material="line"
          rotation="0 -1.5708 0 XYZ"
        />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="20 0.8 0.7" />
    </vgl-renderer>
  </div>
</template>
