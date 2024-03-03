<script setup lang="ts">
import { nextTick, shallowRef, watch } from 'vue'
import VglSlot from '../private/VglSlot.vue'
import { type Scene, type Camera, WebGLRenderer } from 'three'

const canvas = shallowRef<HTMLCanvasElement | null>(null)
let renderer: WebGLRenderer | undefined
let scene: Scene | undefined
let camera: Camera | undefined
let requested = false

function requestRender() {
  if (requested) return
  nextTick(() => {
    if (scene && camera) renderer?.render(scene, camera)
    requested = false
  })
  requested = true
}

watch(canvas, (el) => {
  if (renderer) renderer.dispose()
  if (!el) {
    renderer = undefined
    return
  }

  renderer = new WebGLRenderer({
    canvas: el,
  })

  requestRender()
})

function setScene(s: Scene) {
  scene = s
  requestRender()
}

function unsetScene(s: Scene) {
  if (scene === s) scene = undefined
}

function setCamera(c: Camera) {
  camera = c
  requestRender()
}

function unsetCamera(c: Camera) {
  if (camera === c) camera = undefined
}
</script>

<template>
  <canvas ref="canvas"/>
  <VglSlot @add="setScene" @remove="unsetScene">
    <slot name="scene"/>
  </VglSlot>
  <VglSlot @add="setCamera" @remove="unsetCamera">
    <slot name="camera"/>
  </VglSlot>
</template>
