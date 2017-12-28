import { assetFactory } from './mixins.js'
import { TextureLoader } from './three.js'
import { validatePropString } from './utils.js'

export default {
  mixins: [assetFactory(null, 'vglTextures')],
  props: {
    src: validatePropString
  },
  data () {
    return { inst: null }
  },
  watch: {
    src: {
      handler (src) {
        new TextureLoader().load(src, (texture) => {
          this.inst = texture
        })
      },
      immediate: true
    }
  }
}
