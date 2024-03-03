<script setup lang="ts">
import { toRefs } from 'vue';
import VglSlot from '../private/VglSlot.vue'
import { CameraProps, setupCamera } from './VglCamera'

const props = defineProps<CameraProps>()
const { add, remove } = setupCamera(toRefs(props))
</script>

<template>
  <VglSlot @add="add" @remove="remove">
    <slot />
  </VglSlot>
  
</template>
