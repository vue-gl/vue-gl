import { provide, getCurrentInstance, inject } from 'vue'
import type { InjectionKey } from 'vue'
import type VglSlot from './VglSlot.vue'

export const injectionKey = Symbol() as InjectionKey<InstanceType<typeof VglSlot> | null>
export const sandbox = document.createElement('template')

export function provideSlotInstance() {
  provide(injectionKey, getCurrentInstance() as InstanceType<typeof VglSlot> | null)
}

export function injectSlotInstance() {
  return inject(injectionKey)
}