<script setup lang="ts">
import { toRefs } from 'vue';
import VglSlot from '../private/VglSlot.vue'
import { Object3dProps, setupObject3d } from './VglObject3d'

const props = defineProps<Object3dProps>()
const { add, remove } = setupObject3d(toRefs(props))
</script>

<template>
  <VglSlot @add="add" @remove="remove">
    <slot />
  </VglSlot>

</template>
