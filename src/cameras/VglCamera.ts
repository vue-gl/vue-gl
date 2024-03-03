import { Camera } from "three"
import { type ToRefs } from "vue"
import { setupObject3d, Object3dProps } from "../core/VglObject3d"

export interface CameraProps extends Object3dProps {}

export function setupCamera(propRefs: ToRefs<CameraProps>, object: Camera = new Camera()) {
  return setupObject3d(propRefs, object)
}
