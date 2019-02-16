import config from './rollup.config';
import path from 'path';
import { version } from 'three/package.json';

export default Object.assign(config, {
  output: {
    file: path.resolve('dist/vue-gl.module.js'),
    format: 'es',
    paths: { three: `//unpkg.com/three@${version}/build/three.module.js` },
  },
});
