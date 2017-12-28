import VglObject3d from './vgl-object3d.js'
import { DirectionalLightHelper, Object3D } from './three.js'
import { validatePropString, validatePropNumber, parseFloat_ } from './utils.js'

export default {
  mixins: [VglObject3d],
  props: {
    color: {
      type: validatePropString
    },
    size: {
      type: validatePropNumber,
      default: 1
    }
  },
  computed: {
    inst () { return this.i }
  },
  data () {
    return {
      i: new Object3D(),
      uw: null
    }
  },
  beforeDestroy () {
    if (this.uw) this.uw()
  },
  watch: {
    color (color) {
      if (this.i.parent) {
        this.i.color = color
        this.i.update()
      }
    },
    'i.parent': {
      handler (light, oldLight) {
        if (light !== oldLight) {
          if (oldLight) {
            this.uw()
            if (!light) {
              this.i = new Object3D()
              return
            }
          }
          if (light) {
            this.i = new DirectionalLightHelper(light, parseFloat_(this.size), this.color)
            this.uw = this.$watch(() => this.i.parent && this.i.parent.color.getHex(), () => {
              if (!this.color) {
                this.$nextTick(() => {
                  this.i.update()
                })
              }
            })
          }
        }
      },
      immediate: true
    }
  }
}
