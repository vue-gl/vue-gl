<script setup lang="ts">
import { sandbox, provideSlotInstance } from './context'

defineEmits<{
  add: any[]
  remove: any[]
  change: any[]
}>()

provideSlotInstance()
</script>

<template>
  <Teleport :to="sandbox">
    <slot />
  </Teleport>
</template>
