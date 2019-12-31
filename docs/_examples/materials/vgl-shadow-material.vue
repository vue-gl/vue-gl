<template>
  <div>
    <vgl-renderer
      antialias
      shadow-map-enabled
      alpha
    >
      <vgl-scene>
        <vgl-box-geometry
          name="box"
          width="1"
          height="1"
          depth="1"
        />
        <vgl-mesh-standard-material
          name="std"
          color="#ffbbaa"
        />
        <vgl-mesh
          geometry="box"
          material="std"
          position="0 0.5 0"
          cast-shadow
        />
        <vgl-plane-geometry
          name="plane"
          width="3.5"
          height="3.5"
        />
        <vgl-shadow-material name="shadow" />
        <vgl-mesh
          geometry="plane"
          material="shadow"
          rotation="-1.570796 0 0"
          receive-shadow
        />
        <vgl-ambient-light color="#ffeecc" />
        <vgl-directional-light
          position="-1 2 2"
          cast-shadow
        />
      </vgl-scene>
      <vgl-perspective-camera
        orbit-position="3 1 0.7"
        orbit-target="0 0.5 0"
      />
    </vgl-renderer>

    <aside class="control-panel">
      <label>No effect<input type="range"></label>
    </aside>
  </div>
</template>
