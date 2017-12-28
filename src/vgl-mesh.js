import VglObject3d from './vgl-object3d.js'
import { objectMixinFactory } from './mixins.js'
import { Mesh } from './three.js'

export default {
  mixins: [VglObject3d, objectMixinFactory(true)],
  computed: {
    inst: () => new Mesh()
  }
}
