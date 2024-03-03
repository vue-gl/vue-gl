<script setup lang="ts">
import { toRefs } from 'vue';
import VglSlot from '../private/VglSlot.vue'
import { PerspectiveCameraProps, setupPerspectiveCamera } from './VglPerspectiveCamera'

const props = defineProps<PerspectiveCameraProps>()
const { add, remove } = setupPerspectiveCamera(toRefs(props))
</script>

<template>
  <VglSlot @add="add" @remove="remove">
    <slot />
  </VglSlot>
  
</template>
