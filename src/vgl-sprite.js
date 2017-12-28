import VglObject3d from './vgl-object3d.js'
import { objectMixinFactory } from './mixins.js'
import { Sprite } from './three.js'

export default {
  mixins: [VglObject3d, objectMixinFactory()],
  computed: {
    inst: () => new Sprite()
  }
}
