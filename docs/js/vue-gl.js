(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(factory((global.VueGL = {}),global.THREE));
}(this, (function (exports,three) { 'use strict';

var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

babelHelpers.jsx = function () {
  var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;
  return function createRawReactElement(type, props, key, children) {
    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;

    if (!props && childrenLength !== 0) {
      props = {};
    }

    if (props && defaultProps) {
      for (var propName in defaultProps) {
        if (props[propName] === void 0) {
          props[propName] = defaultProps[propName];
        }
      }
    } else if (!props) {
      props = defaultProps || {};
    }

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);

      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 3];
      }

      props.children = childArray;
    }

    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key === undefined ? null : '' + key,
      ref: null,
      props: props,
      _owner: null
    };
  };
}();

babelHelpers.asyncIterator = function (iterable) {
  if (typeof Symbol === "function") {
    if (Symbol.asyncIterator) {
      var method = iterable[Symbol.asyncIterator];
      if (method != null) return method.call(iterable);
    }

    if (Symbol.iterator) {
      return iterable[Symbol.iterator]();
    }
  }

  throw new TypeError("Object is not async iterable");
};

babelHelpers.asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

babelHelpers.asyncGeneratorDelegate = function (inner, awaitWrap) {
  var iter = {},
      waiting = false;

  function pump(key, value) {
    waiting = true;
    value = new Promise(function (resolve) {
      resolve(inner[key](value));
    });
    return {
      done: false,
      value: awaitWrap(value)
    };
  }

  ;

  if (typeof Symbol === "function" && Symbol.iterator) {
    iter[Symbol.iterator] = function () {
      return this;
    };
  }

  iter.next = function (value) {
    if (waiting) {
      waiting = false;
      return value;
    }

    return pump("next", value);
  };

  if (typeof inner.throw === "function") {
    iter.throw = function (value) {
      if (waiting) {
        waiting = false;
        throw value;
      }

      return pump("throw", value);
    };
  }

  if (typeof inner.return === "function") {
    iter.return = function (value) {
      return pump("return", value);
    };
  }

  return iter;
};

babelHelpers.asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

babelHelpers.defineEnumerableProperties = function (obj, descs) {
  for (var key in descs) {
    var desc = descs[key];
    desc.configurable = desc.enumerable = true;
    if ("value" in desc) desc.writable = true;
    Object.defineProperty(obj, key, desc);
  }

  return obj;
};

babelHelpers.defaults = function (obj, defaults) {
  var keys = Object.getOwnPropertyNames(defaults);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = Object.getOwnPropertyDescriptor(defaults, key);

    if (value && value.configurable && obj[key] === undefined) {
      Object.defineProperty(obj, key, value);
    }
  }

  return obj;
};

babelHelpers.defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

babelHelpers.extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.instanceof = function (left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
};

babelHelpers.interopRequireDefault = function (obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
};

babelHelpers.interopRequireWildcard = function (obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj.default = obj;
    return newObj;
  }
};

babelHelpers.newArrowCheck = function (innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
};

babelHelpers.objectDestructuringEmpty = function (obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
};

babelHelpers.objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers.selfGlobal = typeof global === "undefined" ? self : global;

babelHelpers.set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

babelHelpers.slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

babelHelpers.slicedToArrayLoose = function (arr, i) {
  if (Array.isArray(arr)) {
    return arr;
  } else if (Symbol.iterator in Object(arr)) {
    var _arr = [];

    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);

      if (i && _arr.length === i) break;
    }

    return _arr;
  } else {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
};

babelHelpers.taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};

babelHelpers.taggedTemplateLiteralLoose = function (strings, raw) {
  strings.raw = raw;
  return strings;
};

babelHelpers.temporalRef = function (val, name, undef) {
  if (val === undef) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  } else {
    return val;
  }
};

babelHelpers.temporalUndefined = {};

babelHelpers.toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

babelHelpers.toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

babelHelpers;


var VglNamespace = {
  inject: {
    vglNamespace: {
      default: function _default() {
        var _this = this;

        var renderers = [];
        var updated = void 0;
        return {
          renderers: renderers,
          cameras: Object.create(null),
          scenes: Object.create(null),
          update: function update() {
            if (!updated) {
              _this.$nextTick(function () {
                renderers.forEach(function (vm) {
                  vm.render();
                });
                updated = false;
              });
              updated = true;
            }
          }
        };
      }
    },
    vglGeometries: { default: null },
    vglMaterials: { default: null },
    vglTextures: { default: null }
  },
  data: function data() {
    var data = {
      geometries: Object.create(Object.assign(Object.create(null), this.vglGeometries ? Object.getPrototypeOf(this.vglGeometries.forGet) : {}, this.vglGeometries ? this.vglGeometries.forGet : {})),
      materials: Object.create(Object.assign(Object.create(null), this.vglMaterials ? Object.getPrototypeOf(this.vglMaterials.forGet) : {}, this.vglMaterials ? this.vglMaterials.forGet : {})),
      textures: Object.create(Object.assign(Object.create(null), this.vglTextures ? Object.getPrototypeOf(this.vglTextures.forGet) : {}, this.vglTextures ? this.vglTextures.forGet : {}))
    };
    return data;
  },

  watch: {
    'vglGeometries.forGet': function watcher(geometries) {
      this.geometries = Object.assign(Object.create(Object.assign(Object.create(null), Object.getPrototypeOf(geometries), geometries)), this.geometries);
    },
    'vglMaterials.forGet': function watcher(materials) {
      this.materials = Object.assign(Object.create(Object.assign(Object.create(null), Object.getPrototypeOf(materials), materials)), this.materials);
    },
    'vglTextures.forGet': function watcher(textures) {
      this.textures = Object.assign(Object.create(Object.assign(Object.create(null), Object.getPrototypeOf(textures), textures)), this.textures);
    }
  },
  provide: function provide() {
    var vm = this;
    var provide = {
      vglNamespace: Object.create(this.vglNamespace, {}),
      vglGeometries: {
        get forGet() {
          return vm.geometries;
        },
        get forSet() {
          return this.forGet;
        }
      },
      vglMaterials: {
        get forGet() {
          return vm.materials;
        },
        get forSet() {
          return this.forGet;
        }
      },
      vglTextures: {
        get forGet() {
          return vm.textures;
        },
        get forSet() {
          return this.forGet;
        }
      }
    };
    return provide;
  },
  render: function render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  }
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * Returns a parsed vector3 object.
 */
function parseVector3(str) {
  return str.isVector3 ? str : new (Function.prototype.bind.apply(three.Vector3, [null].concat(toConsumableArray(str.trim().split(/\s+/).map(function (elm) {
    return parseFloat(elm);
  })))))();
}

/**
 * Returns a parsed euler object.
 */
function parseEuler(str) {
  return str.isEuler ? str : new (Function.prototype.bind.apply(three.Euler, [null].concat(toConsumableArray(str.trim().split(/\s+/).map(function (elm, i) {
    return i === 3 ? elm : parseFloat(elm);
  })))))();
}

/**
 * Returns a parsed spherical object.
 */
function parseSpherical(str) {
  return str.isSpherical ? str : new (Function.prototype.bind.apply(three.Spherical, [null].concat(toConsumableArray(str.trim().split(/\s+/).map(function (elm) {
    return parseFloat(elm);
  })))))().makeSafe();
}

var number = [String, Number];
var string = String;
var vector3 = [String, three.Vector3];
var spherical = [String, three.Spherical];
var boolean = Boolean;
var euler = [String, three.Euler];

var VglObject3d = {
  props: {
    position: vector3,
    rotation: euler,
    scale: vector3,
    castShadow: boolean,
    receiveShadow: boolean,
    name: string
  },
  computed: {
    inst: function inst() {
      return new three.Object3D();
    }
  },
  inject: {
    vglObject3d: { default: {} },
    vglNamespace: 'vglNamespace'
  },
  provide: function provide() {
    var vm = this;
    return { vglObject3d: { get inst() {
          return vm.inst;
        } } };
  },
  beforeUpdate: function beforeUpdate() {
    this.vglNamespace.update();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.inst.parent) this.inst.parent.remove(this.inst);
  },

  watch: {
    inst: {
      handler: function handler(inst, oldInst) {
        if (oldInst && oldInst.parent) oldInst.parent.remove(oldInst);
        if (this.vglObject3d.inst) this.vglObject3d.inst.add(inst);
        if (this.position) inst.position.copy(parseVector3(this.position));
        if (this.rotation) inst.rotation.copy(parseEuler(this.rotation));
        if (this.scale) inst.scale.copy(parseVector3(this.scale));
        Object.assign(inst, { castShadow: this.castShadow, receiveShadow: this.receiveShadow });
        if (this.vglUpdate) this.vglUpdate();
      },

      immediate: true
    },
    'vglObject3d.inst': function watch(inst) {
      inst.add(this.inst);
    },
    position: function position(_position) {
      this.inst.position.copy(parseVector3(_position));
      if (this.vglUpdate) this.vglUpdate();
    },
    rotation: function rotation(_rotation) {
      this.inst.rotation.copy(parseEuler(_rotation));
      if (this.vglUpdate) this.vglUpdate();
    },
    scale: function scale(_scale) {
      this.inst.scale.copy(parseVector3(_scale));
      if (this.vglUpdate) this.vglUpdate();
    },
    castShadow: function castShadow(_castShadow) {
      this.inst.castShadow = _castShadow;
      if (this.vglUpdate) this.vglUpdate();
    },
    receiveShadow: function receiveShadow(_receiveShadow) {
      this.inst.receiveShadow = _receiveShadow;
      if (this.vglUpdate) this.vglUpdate();
    }
  },
  render: function render(h) {
    if (this.$slots.default) return h('div', this.$slots.default);
    return undefined;
  }
};

var vglScene = {
  mixins: [VglObject3d],
  computed: {
    inst: function inst() {
      return new three.Scene();
    }
  },
  watch: {
    inst: {
      handler: function handler(inst) {
        this.vglNamespace.scenes[this.name] = inst;
      },

      immediate: true
    },
    name: function name(_name, oldName) {
      if (this.vglNamespace.scenes[oldName] === this.inst) delete this.vglNamespace.scenes[oldName];
      this.vglNamespace.scenes[_name] = this.inst;
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.vglNamespace.scenes[this.name] === this.inst) {
      delete this.vglNamespace.scenes[this.name];
    }
  }
};

function setPositionAndRotation(vm, orbitPosition, orbitTarget) {
  if (orbitPosition || orbitTarget) {
    var target = orbitTarget ? parseVector3(orbitTarget) : orbitTarget;
    if (orbitPosition) {
      var position = vm.inst.position.setFromSpherical(parseSpherical(orbitPosition));
      if (target) position.add(target);
    }
    vm.inst.lookAt(target || new three.Vector3());
  }
}

var VglCamera = {
  mixins: [VglObject3d],
  props: {
    orbitTarget: vector3,
    orbitPosition: spherical
  },
  computed: {
    inst: function inst() {
      return new three.Camera();
    }
  },
  watch: {
    inst: {
      handler: function handler(inst) {
        setPositionAndRotation(this, this.orbitPosition, this.orbitTarget);
        this.vglNamespace.cameras[this.name] = inst;
      },

      immediate: true
    },
    name: function name(_name, oldName) {
      var cameras = this.vglNamespace.cameras,
          inst = this.inst;

      if (cameras[oldName] === inst) delete cameras[oldName];
      cameras[_name] = inst;
    },
    orbitTarget: function orbitTarget(target) {
      setPositionAndRotation(this, this.orbitPosition, target);
    },
    orbitPosition: function orbitPosition(position) {
      setPositionAndRotation(this, position, this.orbitTarget);
    }
  },
  beforeDestroy: function beforeDestroy() {
    var cameras = this.vglNamespace.cameras,
        inst = this.inst;

    if (cameras[this.name] === inst) delete cameras[this.name];
  }
};

var vglRenderer = {
  mixins: [VglNamespace],
  props: {
    precision: string,
    alpha: boolean,
    disablePremultipliedAlpha: boolean,
    antialias: boolean,
    disableStencil: boolean,
    powerPreference: string,
    preserveDrawingBuffer: boolean,
    disableDepth: boolean,
    logarithmicDepthBuffer: boolean,
    camera: string,
    scene: string,
    shadowMapEnabled: boolean
  },
  computed: {
    inst: function inst() {
      var inst = new three.WebGLRenderer({
        precision: this.precision,
        alpha: this.alpha,
        premultipliedAlpha: !this.disablePremultipliedAlpha,
        antialias: this.antialias,
        stencil: !this.disableStencil,
        preserveDrawingBuffer: this.preserveDrawingBuffer,
        depth: !this.disableDepth,
        logarithmicDepthBuffer: this.logarithmicDepthBuffer,
        powerPreference: this.powerPreference
      });
      inst.shadowMap.enabled = this.shadowMapEnabled;
      return inst;
    }
  },
  methods: {
    resize: function resize() {
      this.inst.setSize(this.$el.clientWidth, this.$el.clientHeight);
      this.vglNamespace.update();
    },
    render: function render() {
      if (this.vglNamespace.scenes[this.scene] && this.vglNamespace.cameras[this.camera]) {
        if (this.vglNamespace.cameras[this.camera].isPerspectiveCamera) {
          var aspect = this.$el.clientWidth / this.$el.clientHeight;
          if (this.vglNamespace.cameras[this.camera].aspect !== aspect) {
            this.vglNamespace.cameras[this.camera].aspect = aspect;
            this.vglNamespace.cameras[this.camera].updateProjectionMatrix();
          }
        } else if (this.vglNamespace.cameras[this.camera].isOrthographicCamera) {
          var width = this.$el.clientWidth / 2;
          var height = this.$el.clientHeight / 2;
          if (this.vglNamespace.cameras[this.camera].left !== -width || this.vglNamespace.cameras[this.camera].top !== height) {
            this.vglNamespace.cameras[this.camera].left = -width;
            this.vglNamespace.cameras[this.camera].right = width;
            this.vglNamespace.cameras[this.camera].top = height;
            this.vglNamespace.cameras[this.camera].bottom = -height;
            this.vglNamespace.cameras[this.camera].updateProjectionMatrix();
          }
        } else {
          throw new TypeError('Unknown camera type.');
        }
        this.inst.render(this.vglNamespace.scenes[this.scene], this.vglNamespace.cameras[this.camera]);
      }
    }
  },
  watch: {
    inst: function inst(_inst, oldInst) {
      if (this.$el) this.$el.replaceChild(_inst.domElement, oldInst.domElement);
      oldInst.dispose();
    }
  },
  created: function created() {
    this.vglNamespace.renderers.push(this);
  },
  mounted: function mounted() {
    this.$el.insertBefore(this.inst.domElement, this.$el.firstChild);
    this.resize();
  },
  beforeDestroy: function beforeDestroy() {
    this.vglNamespace.renderers.splice(this.vglNamespace.renderers.indexOf(this), 1);
  },
  render: function render(h) {
    var _this = this;

    return h('div', [h('iframe', {
      style: { visibility: 'hidden', width: '100%', height: '100%' },
      on: {
        load: function load(evt) {
          evt.target.contentWindow.addEventListener('resize', _this.resize, false);
        }
      }
    }, this.$slots.default)]);
  }
};

var vglPerspectiveCamera = {
  mixins: [VglCamera],
  props: {
    zoom: { type: number, default: 1 },
    near: { type: number, default: 0.1 },
    far: { type: number, default: 2000 },
    fov: { type: number, default: 50 }
  },
  computed: {
    inst: function inst() {
      return new three.PerspectiveCamera();
    }
  },
  watch: {
    inst: {
      handler: function handler(inst) {
        Object.assign(inst, {
          zoom: parseFloat(this.zoom),
          near: parseFloat(this.near),
          far: parseFloat(this.far),
          fov: parseFloat(this.fov)
        });
      },

      immediate: true
    },
    zoom: function zoom(_zoom) {
      this.inst.zoom = parseFloat(_zoom);
    },
    near: function near(_near) {
      this.inst.near = parseFloat(_near);
    },
    far: function far(_far) {
      this.inst.far = parseFloat(_far);
    },
    fov: function fov(_fov) {
      this.inst.fov = parseFloat(_fov);
    }
  }
};

var vglGroup = {
  mixins: [VglObject3d],
  computed: {
    inst: function inst() {
      return new three.Group();
    }
  }
};

var VglLight = {
  mixins: [VglObject3d],
  props: {
    color: { type: string, default: '#fff' },
    intensity: { type: number, default: 1 }
  },
  computed: {
    inst: function inst() {
      return new three.Light();
    }
  },
  watch: {
    inst: {
      handler: function handler(inst) {
        inst.color.setStyle(this.color);
        Object.assign(inst, { intensity: parseFloat(this.intensity) });
      },

      immediate: true
    },
    color: function color(_color) {
      this.inst.color.setStyle(_color);
      if (this.vglUpdate) this.vglUpdate();
    },
    intensity: function intensity(_intensity) {
      this.inst.intensity = parseFloat(_intensity);
      if (this.vglUpdate) this.vglUpdate();
    }
  }
};

var vglDirectionalLight = {
  mixins: [VglLight],
  computed: {
    inst: function inst() {
      return new three.DirectionalLight();
    }
  },
  props: {
    castShadow: boolean
  },
  watch: {
    inst: {
      handler: function handler(inst) {
        Object.assign(inst, { castShadow: this.castShadow });
      },

      immediate: true
    },
    castShadow: function castShadow(_castShadow) {
      this.inst.castShadow = _castShadow;
      if (this.vglUpdate) this.vglUpdate();
    }
  }
};

var vglAmbientLight = {
  mixins: [VglLight],
  computed: {
    inst: function inst() {
      return new three.AmbientLight();
    }
  }
};

var geometries = Object.create(null);
var materials = Object.create(null);
var textures = Object.create(null);
var fonts = Object.create(null);

var VglMaterial = {
  inject: ['vglMaterials'],
  props: {
    name: string
  },
  computed: {
    inst: function inst() {
      return new three.Material();
    }
  },
  watch: {
    inst: {
      handler: function handler(inst, oldInst) {
        if (oldInst) delete materials[oldInst.uuid];
        materials[inst.uuid] = inst;
        this.$set(this.vglMaterials.forSet, this.name, inst.uuid);
      },

      immediate: true
    },
    name: function name(_name, oldName) {
      if (this.vglMaterials.forGet[oldName] === this.inst.uuid) {
        this.$delete(this.vglMaterials.forSet, oldName);
      }
      this.$set(this.vglMaterials.forSet, _name, this.inst.uuid);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.vglMaterials.forGet[this.name] === this.inst.uuid) {
      this.$delete(this.vglMaterials.forSet, this.name);
    }
  },
  render: function render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  }
};

var vglPointsMaterial = {
  mixins: [VglMaterial],
  props: {
    color: { type: string, default: '#fff' },
    size: { type: number, default: 1 },
    disableSizeAttenuation: boolean
  },
  computed: {
    inst: function inst() {
      return new three.PointsMaterial();
    }
  },
  watch: {
    inst: {
      handler: function handler(inst) {
        Object.assign(inst, {
          size: parseFloat(this.size),
          sizeAttenuation: !this.disableSizeAttenuation
        });
        inst.color.setStyle(this.color);
      },

      immediate: true
    },
    color: function color(_color) {
      this.inst.color.setStyle(_color);
      this.inst.dispatchEvent({ type: 'update' });
    },
    size: function size(_size) {
      this.inst.size = parseFloat(_size);
      this.inst.dispatchEvent({ type: 'update' });
    },
    disableSizeAttenuation: function disableSizeAttenuation(disabled) {
      this.inst.sizeAttenuation = !disabled;
      this.inst.dispatchEvent({ type: 'update' });
    }
  }
};

var VglGeometry = {
  inject: ['vglGeometries'],
  props: {
    name: string
  },
  computed: {
    inst: function inst() {
      return new three.BufferGeometry();
    }
  },
  watch: {
    inst: {
      handler: function handler(inst, oldInst) {
        if (oldInst) delete geometries[oldInst.uuid];
        geometries[inst.uuid] = inst;
        this.$set(this.vglGeometries.forSet, this.name, inst.uuid);
      },

      immediate: true
    },
    name: function name(_name, oldName) {
      if (this.vglGeometries.forGet[oldName] === this.inst.uuid) {
        this.$delete(this.vglGeometries.forSet, oldName);
      }
      this.$set(this.vglGeometries.forSet, _name, this.inst.uuid);
    }
  },
  beforeDestroy: function beforeDestroy() {
    delete geometries[this.inst.uuid];
    if (this.vglGeometries.forGet[this.name] === this.inst.uuid) {
      this.$delete(this.vglGeometries.forSet, this.name);
    }
  },
  render: function render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  }
};

var vglSphereGeometry = {
  mixins: [VglGeometry],
  props: {
    radius: { type: number, default: 1 },
    widthSegments: { type: number, default: 8 },
    heightSegments: { type: number, default: 6 },
    phiStart: { type: number, default: 0 },
    phiLength: { type: number, default: Math.PI * 2 },
    thetaStart: { type: number, default: 0 },
    thetaLength: { type: number, default: Math.PI }
  },
  computed: {
    inst: function inst() {
      return new three.SphereBufferGeometry(parseFloat(this.radius), parseInt(this.widthSegments, 10), parseInt(this.heightSegments, 10), parseFloat(this.phiStart), parseFloat(this.phiLength), parseFloat(this.thetaStart), parseFloat(this.thetaLength));
    }
  }
};

var vglMeshStandardMaterial = {
  mixins: [VglMaterial],
  inject: ['vglTextures'],
  props: {
    color: { type: string, default: '#fff' },
    map: string
  },
  computed: {
    inst: function inst() {
      return new three.MeshStandardMaterial();
    },
    mapObject: function mapObject() {
      return textures[this.vglTextures.forGet[this.map]] || null;
    }
  },
  watch: {
    inst: {
      handler: function handler(inst) {
        inst.color.setStyle(this.color);
        Object.assign(inst, { map: this.mapObject });
      },

      immediate: true
    },
    color: function color(_color) {
      this.inst.color.setStyle(_color);
      this.inst.dispatchEvent({ type: 'update' });
    },
    mapObject: function mapObject(map, oldMap) {
      this.inst.map = map;
      if (!oldMap) this.inst.needsUpdate = true;
      this.inst.dispatchEvent({ type: 'update' });
    }
  }
};

var VglObject3dWithMatarial = {
  mixins: [VglObject3d],
  props: {
    material: string
  },
  inject: ['vglMaterials'],
  computed: {
    materialObject: function materialObject() {
      return materials[this.vglMaterials.forGet[this.material]];
    }
  },
  mounted: function mounted() {
    if (this.materialObject) {
      this.inst.material = this.materialObject;
      this.materialObject.addEventListener('update', this.ud);
    }
  },

  methods: {
    ud: function ud() {
      if (this.vglUpdate) this.vglUpdate();
    }
  },
  watch: {
    materialObject: function materialObject(material, oldMaterial) {
      if (material !== oldMaterial) {
        this.inst.material = material;
        if (oldMaterial) oldMaterial.removeEventListener('update', this.ud);
        if (material) material.addEventListener('update', this.ud);
        this.ud();
      }
    }
  }
};

var VglObject3dWithMatarialAndGeometry = {
  mixins: [VglObject3dWithMatarial],
  props: {
    geometry: string
  },
  inject: ['vglGeometries'],
  computed: {
    geometryObject: function geometryObject() {
      return geometries[this.vglGeometries.forGet[this.geometry]];
    }
  },
  mounted: function mounted() {
    if (this.geometryObject) {
      this.inst.geometry = this.geometryObject;
      this.geometryObject.addEventListener('update', this.ud);
    }
  },

  watch: {
    geometryObject: function geometryObject(geometry, oldGeometry) {
      if (geometry !== oldGeometry) {
        this.inst.geometry = geometry;
        if (oldGeometry) oldGeometry.removeEventListener('update', this.ud);
        if (geometry) geometry.addEventListener('update', this.ud);
        this.ud();
      }
    }
  }
};

var VglHedronGeometry = {
  mixins: [VglGeometry],
  props: {
    radius: { type: number, default: 1 },
    detail: { type: number, default: 0 }
  }
};

var vglMesh = {
  mixins: [VglObject3dWithMatarialAndGeometry],
  computed: {
    inst: function inst() {
      return new three.Mesh();
    }
  }
};

var vglPoints = {
  mixins: [VglObject3dWithMatarialAndGeometry],
  computed: {
    inst: function inst() {
      return new three.Points();
    }
  }
};

var vglLineBasicMaterial = {
  mixins: [VglMaterial],
  props: {
    color: { type: string, default: '#fff' },
    lights: boolean,
    linewidth: { type: number, default: 1 },
    linecap: { type: string, default: 'round' },
    linejoin: { type: string, default: 'round' }
  },
  computed: {
    inst: function inst() {
      return new three.LineBasicMaterial();
    }
  },
  watch: {
    inst: {
      handler: function handler(inst) {
        Object.assign(inst, {
          lights: this.lights,
          linecap: this.linecap,
          linejoin: this.linejoin,
          linewidth: parseFloat(this.linewidth)
        });
        inst.color.setStyle(this.color);
      },

      immediate: true
    },
    color: function color(_color) {
      this.inst.color.setStyle(_color);
    },
    lights: function lights(_lights) {
      this.inst.lights = _lights;
    },
    linewidth: function linewidth(width) {
      this.inst.linewidth = parseFloat(width);
    },
    linecap: function linecap(cap) {
      this.inst.linecap = cap;
    },
    linejoin: function linejoin(join) {
      this.inst.linejoin = join;
    }
  }
};

var VglLine = {
  mixins: [VglObject3dWithMatarialAndGeometry],
  computed: {
    inst: function inst() {
      return new three.Line();
    }
  }
};

var vglSprite = {
  mixins: [VglObject3dWithMatarial],
  computed: {
    inst: function inst() {
      return new three.Sprite();
    }
  }
};

var vglBoxGeometry = {
  mixins: [VglGeometry],
  props: {
    width: { type: number, default: 1 },
    height: { type: number, default: 1 },
    depth: { type: number, default: 1 },
    widthSegments: { type: number, default: 1 },
    heightSegments: { type: number, default: 1 },
    depthSegments: { type: number, default: 1 }
  },
  computed: {
    inst: function inst() {
      return new three.BoxBufferGeometry(parseFloat(this.width), parseFloat(this.height), parseFloat(this.depth), parseInt(this.widthSegments, 10), parseInt(this.heightSegments, 10), parseInt(this.depthSegments, 10));
    }
  }
};

var vglCircleGeometry = {
  mixins: [VglGeometry],
  props: {
    radius: { type: number, default: 1 },
    segments: { type: number, default: 8 },
    thetaStart: { type: number, default: 0 },
    thetaLength: { type: number, default: Math.PI * 2 }
  },
  computed: {
    inst: function inst() {
      return new three.CircleBufferGeometry(parseFloat(this.radius), parseInt(this.segments, 10), parseFloat(this.thetaStart), parseFloat(this.thetaLength));
    }
  }
};

var VglLineSegments = {
  mixins: [VglLine],
  computed: {
    inst: function inst() {
      return new three.LineSegments();
    }
  }
};

var vglLineLoop = {
  mixins: [VglLine],
  computed: {
    inst: function inst() {
      return new three.LineLoop();
    }
  }
};

var VglCylinderGeometry = {
  mixins: [VglGeometry],
  props: {
    radiusTop: { type: number, default: 1 },
    radiusBottom: { type: number, default: 1 },
    height: { type: number, default: 1 },
    radialSegments: { type: number, default: 8 },
    heightSegments: { type: number, default: 1 },
    openEnded: Boolean,
    thetaStart: { type: number, default: 0 },
    thetaLength: { type: number, default: Math.PI * 2 }
  },
  computed: {
    inst: function inst() {
      return new three.CylinderBufferGeometry(parseFloat(this.radiusTop), parseFloat(this.radiusBottom), parseFloat(this.height), parseInt(this.radialSegments, 10), parseInt(this.heightSegments, 10), this.openEnded, parseFloat(this.thetaStart), parseFloat(this.thetaLength));
    }
  }
};

var vglConeGeometry = {
  mixins: [VglCylinderGeometry],
  props: {
    radius: { type: number, default: 1 }
  },
  computed: {
    inst: function inst() {
      return new three.ConeBufferGeometry(parseFloat(this.radius), parseFloat(this.height), parseInt(this.radialSegments, 10), parseInt(this.heightSegments, 10), this.openEnded, parseFloat(this.thetaStart), parseFloat(this.thetaLength));
    }
  }
};

var vglAxesHelper = {
  mixins: [VglLineSegments],
  props: {
    size: { type: number, default: 1 }
  },
  computed: {
    inst: function inst() {
      return new three.AxesHelper(parseFloat(this.size));
    }
  }
};

var vglOrthographicCamera = {
  mixins: [VglCamera],
  props: {
    zoom: { type: number, default: 1 },
    near: { type: number, default: 0.1 },
    far: { type: number, default: 2000 }
  },
  computed: {
    inst: function inst() {
      return new three.OrthographicCamera();
    }
  },
  watch: {
    inst: {
      handler: function handler(inst) {
        Object.assign(inst, {
          zoom: parseFloat(this.zoom),
          near: parseFloat(this.near),
          far: parseFloat(this.far)
        });
      },

      immediate: true
    },
    zoom: function zoom(_zoom) {
      this.inst.zoom = parseFloat(_zoom);
    },
    near: function near(_near) {
      this.inst.near = parseFloat(_near);
    },
    far: function far(_far) {
      this.inst.far = parseFloat(_far);
    }
  }
};

var vglPlaneGeometry = {
  mixins: [VglGeometry],
  props: {
    width: { type: number, default: 1 },
    height: { type: number, default: 1 },
    widthSegments: { type: number, default: 1 },
    heightSegments: { type: number, default: 1 }
  },
  computed: {
    inst: function inst() {
      return new three.PlaneBufferGeometry(parseFloat(this.width), parseFloat(this.height), parseInt(this.widthSegments, 10), parseInt(this.heightSegments, 10));
    }
  }
};

var vglDodecahedronGeometry = {
  mixins: [VglHedronGeometry],
  computed: {
    inst: function inst() {
      return new three.DodecahedronBufferGeometry(parseFloat(this.radius), parseInt(this.detail, 10));
    }
  }
};

var vglIcosahedronGeometry = {
  mixins: [VglHedronGeometry],
  computed: {
    inst: function inst() {
      return new three.IcosahedronBufferGeometry(parseFloat(this.radius), parseInt(this.detail, 10));
    }
  }
};

var vglOctahedronGeometry = {
  mixins: [VglHedronGeometry],
  computed: {
    inst: function inst() {
      return new three.OctahedronBufferGeometry(parseFloat(this.radius), parseInt(this.detail, 10));
    }
  }
};

var vglRingGeometry = {
  mixins: [VglGeometry],
  props: {
    innerRadius: { type: number, default: 0.5 },
    outerRadius: { type: number, default: 1 },
    thetaSegments: { type: number, default: 8 },
    phiSegments: { type: number, default: 1 },
    thetaStart: { type: number, default: 0 },
    thetaLength: { type: number, default: Math.PI * 2 }
  },
  computed: {
    inst: function inst() {
      return new three.RingBufferGeometry(parseFloat(this.innerRadius), parseFloat(this.outerRadius), parseInt(this.thetaSegments, 10), parseInt(this.phiSegments, 10), parseFloat(this.thetaStart), parseFloat(this.thetaLength));
    }
  }
};

var vglTetrahedronGeometry = {
  mixins: [VglHedronGeometry],
  computed: {
    inst: function inst() {
      return new three.TetrahedronBufferGeometry(parseFloat(this.radius), parseInt(this.detail, 10));
    }
  }
};

var vglTorusGeometry = {
  mixins: [VglGeometry],
  props: {
    radius: { type: number, default: 1 },
    tube: { type: number, default: 0.4 },
    radialSegments: { type: number, default: 8 },
    tubularSegments: { type: number, default: 6 },
    arc: { type: number, default: Math.PI * 2 }
  },
  computed: {
    inst: function inst() {
      return new three.TorusBufferGeometry(parseFloat(this.radius), parseFloat(this.tube), parseInt(this.radialSegments, 10), parseInt(this.tubularSegments, 10), parseFloat(this.arc));
    }
  }
};

var vglTorusKnotGeometry = {
  mixins: [VglGeometry],
  props: {
    radius: { type: number, default: 1 },
    tube: { type: number, default: 0.4 },
    radialSegments: { type: number, default: 8 },
    tubularSegments: { type: number, default: 64 },
    p: { type: number, default: 2 },
    q: { type: number, default: 3 }
  },
  computed: {
    inst: function inst() {
      return new three.TorusKnotBufferGeometry(parseFloat(this.radius), parseFloat(this.tube), parseInt(this.tubularSegments, 10), parseInt(this.radialSegments, 10), parseInt(this.p, 10), parseInt(this.q, 10));
    }
  }
};

var vglArrowHelper = {
  mixins: [VglObject3d],
  props: {
    dir: vector3,
    length: { type: number, default: 1 },
    color: { type: string, default: '#ff0' },
    headLength: number,
    headWidth: number
  },
  computed: {
    inst: function inst() {
      return new three.ArrowHelper(new three.Vector3(0, 1, 0), new three.Vector3());
    },
    len: function len() {
      return [parseFloat(this.length), this.headLength !== undefined ? parseFloat(this.headLength) : undefined, this.headWidth !== undefined ? parseFloat(this.headWidth) : undefined];
    }
  },
  watch: {
    inst: {
      handler: function handler(inst) {
        if (this.dir) inst.setDirection(parseVector3(this.dir).normalize());
        inst.setLength.apply(inst, toConsumableArray(this.len));
        inst.setColor(new three.Color(this.color));
      },

      immediate: true
    },
    dir: function dir(_dir) {
      this.inst.setDirection(parseVector3(_dir).normalize());
    },
    len: function len(_len) {
      var _inst;

      (_inst = this.inst).setLength.apply(_inst, toConsumableArray(_len));
    },
    color: function color(_color) {
      this.inst.setColor(new three.Color(_color));
    }
  }
};

var vglBoxHelper = {
  mixins: [VglLineSegments],
  props: {
    color: { type: string, default: '#ff0' }
  },
  computed: {
    inst: function inst() {
      return new three.BoxHelper();
    }
  },
  watch: {
    inst: {
      handler: function handler(inst) {
        var _this = this;

        this.$nextTick(function () {
          inst.setFromObject(_this.vglObject3d.inst);
        });
        inst.material.color.setStyle(this.color);
      },

      immediate: true
    },
    'vglObject3d.inst': function watcher(parent) {
      this.inst.setFromObject(parent);
    },
    color: function color(_color) {
      this.inst.material.color.setStyle(_color);
    }
  }
};

var vglPointLight = {
  mixins: [VglLight],
  props: {
    distance: { type: number, default: 0 },
    decay: { type: number, default: 1 }
  },
  computed: {
    inst: function inst() {
      return new three.PointLight();
    }
  },
  watch: {
    inst: {
      handler: function handler(inst) {
        Object.assign(inst, {
          distance: parseFloat(this.distance),
          decay: parseFloat(this.decay)
        });
      },

      immediate: true
    },
    distance: function distance(_distance) {
      this.inst.distance = parseFloat(_distance);
      if (this.vglUpdate) this.vglUpdate();
    },
    decay: function decay(_decay) {
      this.inst.decay = parseFloat(_decay);
      if (this.vglUpdate) this.vglUpdate();
    }
  }
};

var vglSpotLight = {
  mixins: [VglLight],
  props: {
    distance: { type: number, default: 0 },
    decay: { type: number, default: 1 },
    angle: { type: number, default: Math.PI / 3 },
    penumbra: { type: number, default: 0 },
    target: vector3
  },
  computed: {
    inst: function inst() {
      return new three.SpotLight();
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.inst.target.parent) this.inst.target.parent.remove(this.inst.target);
  },

  watch: {
    inst: {
      handler: function handler(inst) {
        if (this.target) {
          inst.target.position.copy(parseVector3(this.target));
          var $parent = this.vglObject3d.inst;
          if ($parent) $parent.add(inst.target);
        }
        Object.assign(inst, {
          distance: parseFloat(this.distance),
          decay: parseFloat(this.decay),
          angle: parseFloat(this.angle),
          penumbra: parseFloat(this.penumbra)
        });
      },

      immediate: true
    },
    'vglObject3d.inst': function watcher(parent) {
      if (parent) parent.add(this.inst.target);
    },
    distance: function distance(_distance) {
      this.inst.distance = parseFloat(_distance);
      if (this.vglUpdate) this.vglUpdate();
    },
    decay: function decay(_decay) {
      this.inst.decay = parseFloat(_decay);
      if (this.vglUpdate) this.vglUpdate();
    },
    angle: function angle(_angle) {
      this.inst.angle = parseFloat(_angle);
      if (this.vglUpdate) this.vglUpdate();
    },
    penumbra: function penumbra(_penumbra) {
      this.inst.penumbra = parseFloat(_penumbra);
      if (this.vglUpdate) this.vglUpdate();
    },
    target: function target(_target) {
      this.inst.target.position.copy(parseVector3(_target));
      if (this.vglUpdate) this.vglUpdate();
    }
  }
};

var vglTexture = {
  inject: ['vglTextures'],
  props: {
    src: string,
    name: string
  },
  data: function data() {
    return { uuid: undefined };
  },

  computed: {
    inst: function inst() {
      return this.uuid !== undefined ? textures[this.uuid] : null;
    }
  },
  watch: {
    src: {
      handler: function handler(src) {
        var _this = this;

        new three.TextureLoader().load(src, function (texture) {
          textures[texture.uuid] = texture;
          _this.uuid = texture.uuid;
        });
      },

      immediate: true
    },
    uuid: function uuid(_uuid, oldUuid) {
      if (oldUuid !== undefined) delete textures[oldUuid];
      this.$set(this.vglTextures.forSet, this.name, _uuid);
    },
    name: function name(_name, oldName) {
      if (this.vglTextures.forGet[oldName] === this.uuid) {
        this.$delete(this.vglTextures.forSet, oldName);
      }
      this.$set(this.vglTextures.forSet, _name, this.uuid);
    }
  },
  beforeDestroy: function beforeDestroy() {
    delete textures[this.uuid];
    if (this.vglTextures.forGet[this.name] === this.uuid) {
      this.$delete(this.vglTextures.forSet, this.name);
    }
  },
  render: function render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  }
};

var VglExtrudeGeometry = {
  mixins: [VglGeometry],
  computed: {
    inst: function inst() {
      return new three.ExtrudeGeometry([], {});
    }
  }
};

var vglTextGeometry = {
  mixins: [VglExtrudeGeometry],
  props: {
    font: string,
    size: { type: number, default: 100 },
    height: { type: number, default: 50 },
    curveSegments: { type: number, default: 12 },
    bevelEnabled: boolean,
    bevelThickness: { type: number, default: 10 },
    bevelSize: { type: number, default: 8 },
    bevelSegments: { type: number, default: 3 },
    text: { type: string, default: '' }
  },
  data: function data() {
    return { f: undefined };
  },

  computed: {
    inst: function inst() {
      return this.f !== undefined ? new three.TextBufferGeometry(this.text, {
        font: fonts[this.f],
        size: parseFloat(this.size),
        height: parseFloat(this.height),
        curveSegments: parseInt(this.curveSegments, 10),
        bevelEnabled: this.bevelEnabled,
        bevelThickness: parseFloat(this.bevelThickness),
        bevelSize: parseFloat(this.bevelSize),
        bevelSegments: parseInt(this.bevelSegments, 10)
      }) : new three.BufferGeometry();
    }
  },
  watch: {
    font: {
      handler: function handler(src) {
        var _this = this;

        if (!fonts[src]) {
          fonts[src] = [function () {
            if (src === _this.font) _this.f = src;
          }];
          if (!/^data:.*?(?:;base64)?,.*$/.test(src)) {
            // GET src data manually and pass as a data URI.
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('load', function () {
              new three.FontLoader().load('data:,' + encodeURIComponent(xhr.responseText), function (font) {
                var queue = fonts[src];
                fonts[src] = font;
                queue.forEach(function (f) {
                  f();
                });
              });
            }, false);
            xhr.open('GET', src);
            xhr.send();
          } else {
            new three.FontLoader().load(src, function (font) {
              var queue = fonts[src];
              fonts[src] = font;
              queue.forEach(function (f) {
                f();
              });
            });
          }
        } else if (fonts[src].isFont) {
          this.f = src;
        } else {
          fonts[src].push(function () {
            if (src === _this.font) _this.f = src;
          });
        }
      },

      immediate: true
    }
  }
};

var vglSpriteMaterial = {
  mixins: [VglMaterial],
  props: {
    color: { type: string, default: '#fff' },
    map: string
  },
  inject: ['vglTextures'],
  computed: {
    inst: function inst() {
      return new three.SpriteMaterial();
    },
    mapObject: function mapObject() {
      return this.vglTextures.forGet[this.map] || null;
    }
  },
  watch: {
    inst: {
      handler: function handler(inst) {
        inst.color.setStyle(this.color);
        Object.assign(inst, { map: this.mapObject });
      },

      immediate: true
    },
    color: function color(_color) {
      this.inst.color.setStyle(_color);
      this.inst.dispatchEvent({ type: 'update' });
    },
    mapObject: function mapObject(map, oldMap) {
      this.inst.map = map;
      if (!oldMap) this.inst.needsUpdate = true;
      this.inst.dispatchEvent({ type: 'update' });
    }
  }
};

var vglGridHelper = {
  mixins: [VglLineSegments],
  props: {
    size: { type: number, default: 10 },
    divisions: { type: number, default: 10 },
    colorCenterLine: { type: string, default: '#444444' },
    colorGrid: { type: string, default: '#888888' }
  },
  computed: {
    inst: function inst() {
      return new three.GridHelper(parseFloat(this.size), parseInt(this.divisions, 10), this.colorCenterLine, this.colorGrid);
    }
  }
};

var vglShadowMaterial = {
  mixins: [VglMaterial],
  computed: {
    inst: function inst() {
      return new three.ShadowMaterial();
    }
  }
};

var vglCameraHelper = {
  mixins: [VglLineSegments],
  props: {
    camera: string
  },
  computed: {
    inst: function inst() {
      var _this = this;

      var helper = new three.CameraHelper(new three.Camera());
      helper.onBeforeRender = function () {
        helper.camera = _this.vglNamespace.cameras[_this.camera];
        helper.update();
      };
      return helper;
    }
  }
};

var vglDirectionalLightHelper = {
  mixins: [VglObject3d],
  props: {
    color: { type: string },
    size: { type: number, default: 1 }
  },
  computed: {
    inst: function inst() {
      return this.i;
    },
    hex: function hex() {
      return 'color' in this.i && this.i.parent && this.i.parent.color.getHex();
    }
  },
  created: function created() {
    var p = this.vglObject3d.inst;
    if (p) this.i = new three.DirectionalLightHelper(p, parseFloat(this.size), this.color);
  },
  data: function data() {
    return {
      i: new three.Object3D()
    };
  },

  watch: {
    color: function color(_color) {
      if ('color' in this.i) {
        this.inst.color = _color;
        this.inst.update();
      }
    },
    hex: function hex(_hex) {
      if (_hex && !this.color) this.inst.update();
    },
    size: function size(_size) {
      if (this.i.parent) {
        this.i = new three.DirectionalLightHelper(this.i.parent, parseFloat(_size), this.color);
      }
    }
  }
};

exports.VglNamespace = VglNamespace;
exports.VglObject3d = VglObject3d;
exports.VglScene = vglScene;
exports.VglCamera = VglCamera;
exports.VglRenderer = vglRenderer;
exports.VglPerspectiveCamera = vglPerspectiveCamera;
exports.VglGroup = vglGroup;
exports.VglLight = VglLight;
exports.VglDirectionalLight = vglDirectionalLight;
exports.VglAmbientLight = vglAmbientLight;
exports.VglMaterial = VglMaterial;
exports.VglPointsMaterial = vglPointsMaterial;
exports.VglGeometry = VglGeometry;
exports.VglSphereGeometry = vglSphereGeometry;
exports.VglMeshStandardMaterial = vglMeshStandardMaterial;
exports.VglMesh = vglMesh;
exports.VglPoints = vglPoints;
exports.VglLineBasicMaterial = vglLineBasicMaterial;
exports.VglLine = VglLine;
exports.VglSprite = vglSprite;
exports.VglBoxGeometry = vglBoxGeometry;
exports.VglCircleGeometry = vglCircleGeometry;
exports.VglLineSegments = VglLineSegments;
exports.VglLineLoop = vglLineLoop;
exports.VglConeGeometry = vglConeGeometry;
exports.VglAxesHelper = vglAxesHelper;
exports.VglOrthographicCamera = vglOrthographicCamera;
exports.VglCylinderGeometry = VglCylinderGeometry;
exports.VglPlaneGeometry = vglPlaneGeometry;
exports.VglDodecahedronGeometry = vglDodecahedronGeometry;
exports.VglIcosahedronGeometry = vglIcosahedronGeometry;
exports.VglOctahedronGeometry = vglOctahedronGeometry;
exports.VglRingGeometry = vglRingGeometry;
exports.VglTetrahedronGeometry = vglTetrahedronGeometry;
exports.VglTorusGeometry = vglTorusGeometry;
exports.VglTorusKnotGeometry = vglTorusKnotGeometry;
exports.VglArrowHelper = vglArrowHelper;
exports.VglBoxHelper = vglBoxHelper;
exports.VglPointLight = vglPointLight;
exports.VglSpotLight = vglSpotLight;
exports.VglTexture = vglTexture;
exports.VglExtrudeGeometry = VglExtrudeGeometry;
exports.VglTextGeometry = vglTextGeometry;
exports.VglSpriteMaterial = vglSpriteMaterial;
exports.VglGridHelper = vglGridHelper;
exports.VglShadowMaterial = vglShadowMaterial;
exports.VglCameraHelper = vglCameraHelper;
exports.VglDirectionalLightHelper = vglDirectionalLightHelper;

Object.defineProperty(exports, '__esModule', { value: true });

})));
