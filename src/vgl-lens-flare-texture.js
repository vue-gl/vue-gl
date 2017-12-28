import { NormalBlending, Color } from './three.js'
import { validatePropString, validatePropNumber, findParent, parseFloat_, parseInt_, update } from './utils.js'

function findParent_ (vm) {
  return findParent(vm, 'isVglLensFlare')
}

export default {
  inject: ['vglTextures'],
  props: {
    texture: {
      type: validatePropString
    },
    size: {
      type: validatePropNumber,
      default: -1
    },
    distance: {
      type: validatePropNumber,
      default: 0
    },
    blending: {
      type: validatePropNumber,
      default: NormalBlending
    },
    color: {
      type: validatePropString,
      default: '#fff'
    }
  },
  data () {
    return {
      inst: null
    }
  },
  computed: {
    opts () {
      return [
        this.vglTextures.forGet[this.texture],
        parseInt_(this.size),
        parseFloat_(this.distance),
        parseInt_(this.blending),
        new Color(this.color)
      ]
    }
  },
  beforeDestroy () {
    const parent = findParent_(this)
    this.remove(parent)
    update(parent)
  },
  watch: {
    opts: {
      handler (opts) {
        const parent = findParent_(this)
        if (parent) {
          if (this.inst) {
            if (opts[0]) {
              this.replace(parent)
            } else {
              this.remove(parent)
              this.inst = null
            }
            update(parent)
          } else if (opts[0]) {
            this.add(parent)
            update(parent)
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    add (parent) {
      parent.inst.add(...this.opts)
      this.inst = parent.inst.lensFlares.slice(-1)[0]
    },
    remove (parent) {
      parent.inst.lensFlares.splice(parent.inst.lensFlares.indexOf(this.inst), 1)
    },
    replace (parent) {
      this.remove(parent)
      this.add(parent)
    }
  },
  render (h) {
    if (this.$slots.default) return h('div', this.$slots.default)
  }
}
