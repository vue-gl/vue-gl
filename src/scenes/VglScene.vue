<script setup lang="ts">
import { toRefs } from 'vue';
import VglSlot from '../private/VglSlot.vue'
import { SceneProps, setupScene } from './VglScene'

const props = defineProps<SceneProps>()
const { add, remove } = setupScene(toRefs(props))
</script>

<template>
  <VglSlot @add="add" @remove="remove">
    <slot />
  </VglSlot>

</template>
