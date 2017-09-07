"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var VueGL = function (exports, three_js) {
    'use strict';

    var assetTypes = ["scenes", "cameras", "materials", "geometries", "attributes"];

    function findParent(vm) {
        if (vm.$parent) {
            if (vm.$parent.$options.isVgl) {
                return vm.$parent;
            }
            return findParent(vm.$parent);
        }
        return null;
    }

    function extend(parent) {
        return assetTypes.reduce(function (obj, key) {
            obj[key] = Object.create(parent && parent.assets[key]);
            return obj;
        }, {});
    }

    var VglAbstract = {
        isVgl: true,
        data: function data() {
            return {
                assets: extend(findParent(this))
            };
        },
        render: function render(h) {
            if (this.$slots.default) {
                return h("div", this.$slots.default);
            }
        }
    };

    function findParent$1(vm) {
        var parent = vm.$parent;
        if (parent) {
            if (parent.$options.isVgl && parent.inst && parent.inst.isObject3D) {
                return parent;
            }
            return findParent$1(parent);
        }
    }

    function _position(pos) {
        if (pos) {
            if (Array.isArray(pos)) {
                return new (Function.prototype.bind.apply(Vector3, [null].concat(_toConsumableArray(pos.map(function (item) {
                    return parseFloat(item);
                })))))();
            }
            if ((typeof pos === "undefined" ? "undefined" : _typeof(pos)) === "object") {
                return new Vector3(parseFloat(pos.x), parseFloat(pos.y), parseFloat(pos.z));
            }
            return new (Function.prototype.bind.apply(Vector3, [null].concat(_toConsumableArray(pos.trim().split(/\s+/).map(function (item) {
                return parseFloat(item);
            })))))();
        }
    }

    function _rotation(rot) {
        if (rot) {
            if (Array.isArray(rot)) {
                var _xyz = rot.slice(0, 3).map(function (item) {
                    return parseFloat(item);
                });
                _xyz.length = 3;
                var _order = Euler.RotationOrders.indexOf((rot[3] + "").trim()) < 0 ? "XYZ" : rot[3].trim();
                return new (Function.prototype.bind.apply(Euler, [null].concat(_toConsumableArray(_xyz), [_order])))();
            }
            if ((typeof rot === "undefined" ? "undefined" : _typeof(rot)) === "object") {
                var _order2 = Euler.RotationOrders.indexOf((rot.order + "").trim()) < 0 ? "XYZ" : rot.order.trim();
                return new Euler(parseFloat(rot.x), parseFloat(rot.y), parseFloat(rot.z), _order2);
            }
            var xyzo = (rot + "").trim().split(/\s+/);
            var xyz = xyzo.slice(0, 3).map(function (item) {
                return parseFloat(item);
            });
            xyz.length = 3;
            var order = Euler.RotationOrders.indexOf(xyzo[3]) < 0 ? "XYZ" : xyzo[3];
            return new (Function.prototype.bind.apply(Euler, [null].concat(_toConsumableArray(xyz), [order])))();
        }
    }

    function _scale(s) {
        if (s) {
            if (Array.isArray(s)) {
                if (!s.length) {
                    return new Vector3(1, 1, 1);
                }
                if (s.length < 2) {
                    var t = parseFloat(s[0]) || 1;
                    return new Vector3(t, t, t);
                }
                var _arr = s.length < 3 ? [].concat(_toConsumableArray(s), [1]) : s;
                return new (Function.prototype.bind.apply(Vector3, [null].concat(_toConsumableArray(_arr.map(function (item) {
                    return parseFloat(item) || 1;
                })))))();
            }
            if ((typeof s === "undefined" ? "undefined" : _typeof(s)) === "object") {
                return new Vector3(parseFloat(s.x) || 1, parseFloat(s.y) || 1, parseFloat(s.z) || 1);
            }
            var arr = (s + "").trim().split(/\s+/);
            if (arr.length < 2) {
                var _t = parseFloat(arr[0]) || 1;
                return new Vector3(_t, _t, _t);
            }
            if (arr.length < 3) {
                arr.push(1);
            }
            return new (Function.prototype.bind.apply(Vector3, [null].concat(_toConsumableArray(arr.map(function (item) {
                return parseFloat(item) || 1;
            })))))();
        }
    }

    function setValues(obj, properties) {
        if (properties) {
            Object.keys(properties).forEach(function (key) {
                obj[key] = properties[key];
            });
        }
    }

    var vglObject3d = {
        mixins: [VglAbstract],
        props: ["name", "position", "rotation", "scale"],
        computed: {
            inst: function inst() {
                return new three_js.Object3D();
            }
        },
        created: function created() {
            var inst = this.inst;
            setValues(inst.position, _position(this.position));
            setValues(inst.rotation, _rotation(this.rotation));
            setValues(inst.scale, _scale(this.scale));
            var parent = findParent$1(this);
            if (parent) {
                parent.inst.add(inst);
            }
        },
        beforeDestroy: function beforeDestroy() {
            var inst = this.inst;
            if (inst.parent) {
                inst.parent.remove(inst);
            }
        },

        watch: {
            position: function position(pos) {
                setValues(this.inst.position, _position(pos));
            },
            rotation: function rotation(rot) {
                setValues(this.inst.rotation, _rotation(rot));
            },
            scale: function scale(s) {
                setValues(this.inst.scale, _scale(s));
            },
            inst: function inst(_inst, oldInst) {
                _inst.add.apply(_inst, _toConsumableArray(oldInst.children));
                _inst.position.copy(oldInst.position);
                _inst.rotation.copy(oldInst.rotation);
                _inst.scale.copy(oldInst.scale);
                var parent = oldInst.parent;
                if (parent) {
                    parent.remove(oldInst);
                    parent.add(_inst);
                }
            }
        }
    };

    exports.VglAbstract = VglAbstract;
    exports.VglObject3d = vglObject3d;

    return exports;
}({}, THREE);
