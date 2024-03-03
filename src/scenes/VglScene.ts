import { Scene } from "three"
import { type ToRefs, watchEffect } from "vue"
import { setupObject3d, Object3dProps } from "../core/VglObject3d"

export interface SceneProps extends Object3dProps {
  backgroundIntensity: number
}

export function setupScene(propRefs: ToRefs<SceneProps>, object: Scene = new Scene()) {
  const ctx = setupObject3d(propRefs, object)

  const { backgroundIntensity } = propRefs

  watchEffect(() => {
    object.backgroundIntensity = backgroundIntensity.value
  })

  return ctx
}
