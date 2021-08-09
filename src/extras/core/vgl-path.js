import { Path } from 'three';
import VglCurvePath from './vgl-curve-path';
import { d, inst } from '../../constants';

function chunk(array, chunkSize) {
  return array.reduce((acc, element, index) => {
    if (index % chunkSize) acc[Math.floor(index / chunkSize)].push(element);
    else acc.push([element]);
    return acc;
  }, []);
}

const pathFunctions = {
  M(obj, params) { obj.moveTo(params[params.length - 2], params[params.length - 1]); },
  m(obj, params) {
    obj.moveTo(...chunk(params, 2)
      .reduce(([x, y], [dx, dy]) => [x + dx, y + dy], obj.currentPoint.toArray()));
  },
  L(obj, params) { chunk(params, 2).forEach(([x, y]) => { obj.lineTo(x, y); }); },
  l(obj, params) {
    chunk(params, 2).forEach(([dx, dy]) => {
      obj.lineTo(obj.currentPoint.x + dx, obj.currentPoint.y + dy);
    });
  },
  H(obj, params) { params.forEach((x) => { obj.lineTo(x, obj.currentPoint.y); }); },
  h(obj, params) {
    params.forEach((dx) => { obj.lineTo(obj.currentPoint.x + dx, obj.currentPoint.y); });
  },
  V(obj, params) { params.forEach((y) => { obj.lineTo(obj.currentPoint.x, y); }); },
  v(obj, params) {
    params.forEach((dy) => { obj.lineTo(obj.currentPoint.x, obj.currentPoint.y + dy); });
  },
  Q(obj, params) {
    const paramArray = chunk(params, 4);
    paramArray.forEach(([cpX, cpY, x, y]) => { obj.quadraticCurveTo(cpX, cpY, x, y); });
    const [cpX, cpY] = paramArray[paramArray.length - 1];
    return { cpX, cpY };
  },
  q(obj, params) {
    const paramArray = chunk(params, 4);
    paramArray.forEach(([dCpX, dCpY, dx, dy]) => {
      const { x, y } = obj.currentPoint;
      obj.quadraticCurveTo(x + dCpX, y + dCpY, x + dx, y + dy);
    });
    const [dCpX, dCpY, dx, dy] = paramArray[paramArray.length - 1];
    return { cpX: obj.currentPoint.x - dx + dCpX, cpY: obj.currentPoint.y - dy + dCpY };
  },
  T(obj, params, ctx) {
    let { cpX, cpY } = ctx || { cpX: obj.currentPoint.x, cpY: obj.currentPoint.y };
    chunk(params, 2).forEach(([x, y]) => {
      cpX = obj.currentPoint.x * 2 - cpX;
      cpY = obj.currentPoint.y * 2 - cpY;
      obj.quadraticCurveTo(cpX, cpY, x, y);
    });
    return { cpX, cpY };
  },
  t(obj, params, ctx) {
    let { cpX, cpY } = ctx || { cpX: obj.currentPoint.x, cpY: obj.currentPoint.y };
    chunk(params, 2).forEach(([dx, dy]) => {
      cpX = obj.currentPoint.x * 2 - cpX;
      cpY = obj.currentPoint.y * 2 - cpY;
      obj.quadraticCurveTo(cpX, cpY, obj.currentPoint.x + dx, obj.currentPoint.y + dy);
    });
    return { cpX, cpY };
  },
};

const pathCommands = Object.keys(pathFunctions).join('');

function parseCommands(cmds) {
  if (!cmds.length) return [];
  return cmds.match(new RegExp(`[${pathCommands}][^${pathCommands}]*`, 'g'))
    .map((cmd) => [cmd[0], cmd.slice(1).trim().split(/\s*,\s*|\s+/).map(parseFloat)]);
}

export default {
  extends: VglCurvePath,
  props: {
    /** A path definition like SVG syntax. */
    [d]: {
      type: String,
      default: '',
      validator: (v) => {
        const trimed = v.trim();
        if (!trimed.length) return true;
        if (!pathCommands.includes(trimed[0])) return false;
        return parseCommands(v).every(([cmd, params]) => {
          if (params.some(Number.isNaN)) return false;
          if ('MmLlTt'.includes(cmd)) return !(params.length % 2);
          if ('Qq'.includes(cmd)) return !(params.length % 4);
          return true;
        });
      },
    },
  },
  computed: {
    /** The THREE.Path instance. */
    [inst]() { return this.path(new Path()); },
    path() {
      const cmds = parseCommands(this.d);
      return (obj) => {
        let ctx;
        cmds.forEach(([cmd, params]) => { ctx = pathFunctions[cmd](obj, params, ctx); });
        return obj;
      };
    },
  },
};
