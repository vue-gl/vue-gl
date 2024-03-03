import { Object3D } from "three"
import { type ToRefs, watchEffect, onBeforeUnmount } from "vue"
import { injectSlotInstance } from "../private/context";

export interface Object3dProps {
    castShadow: boolean;
  }
  
export function setupObject3d(propRefs: ToRefs<Object3dProps>, object: Object3D = new Object3D()) {
  const slot = injectSlotInstance()

  const { castShadow } = propRefs

  watchEffect(() => {
    object.castShadow = castShadow.value
  })

  slot?.$emit('add', object)
  onBeforeUnmount(() => slot?.$emit('remove', object))

  return {
    add(child: Object3D) {
      object.add(child)
    },
    remove(child: Object3D) {
      object.remove(child)
    }
  }
}
