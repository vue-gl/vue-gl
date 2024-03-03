import { PerspectiveCamera } from "three"
import { watchEffect, type ToRefs } from "vue"
import { setupCamera, CameraProps } from "./VglCamera"

export interface PerspectiveCameraProps extends CameraProps {
  aspect: number
  near: number
  far: number
  fov: number
}

export function setupPerspectiveCamera(propRefs: ToRefs<PerspectiveCameraProps>, object: PerspectiveCamera = new PerspectiveCamera()) {
  const ctx = setupCamera(propRefs, object)

  const { aspect, near, far, fov } = propRefs

  watchEffect(() => {
    object.aspect = aspect.value
  })

  watchEffect(() => {
    object.near = near.value
  })

  watchEffect(()=> {
    object.far = far.value
  })

  watchEffect(() => {
    object.fov = fov.value
  })

  return ctx
}
