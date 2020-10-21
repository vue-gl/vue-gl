<template>
  <div>
    <vgl-renderer
      antialias
      camera="camera"
      scene="scene"
    >
      <vgl-scene name="scene">
        <vgl-texture
          name="tex"
          src="/img/star.gif"
        />
        <vgl-sprite-material
          name="spm"
          map="tex"
        />
        <vgl-sprite material="spm" />
      </vgl-scene>
      <vgl-perspective-camera
        orbit-position="20 1 1"
        name="camera"
      />
    </vgl-renderer>

    <aside class="control-panel">
      <label>No effect<input type="range"></label>
    </aside>
  </div>
</template>
