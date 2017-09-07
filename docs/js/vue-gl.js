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
            switch (typeof pos === "undefined" ? "undefined" : _typeof(pos)) {
                case "string":
                case "number":
                    pos = (pos + "").trim().split(/\s+/);
                case "object":
                    var isArray = Array.isArray(pos);
                    return {
                        x: parseFloat(pos[isArray ? 0 : "x"] || 0),
                        y: parseFloat(pos[isArray ? 1 : "y"] || 0),
                        z: parseFloat(pos[isArray ? 2 : "z"] || 0)
                    };
            }
        }
    }

    function _rotation(rot) {
        if (rot) {
            switch (typeof rot === "undefined" ? "undefined" : _typeof(rot)) {
                case "string":
                case "number":
                    rot = (rot + "").trim().split(/\s+/);
                case "object":
                    var isArray = Array.isArray(rot);
                    var order = (rot[isArray ? 3 : "order"] + "").trim();
                    if (!/[XYZ]{3}/.test(order)) {
                        order = "XYZ";
                    }
                    return {
                        x: parseFloat(rot[isArray ? 0 : "x"] || 0),
                        y: parseFloat(rot[isArray ? 1 : "y"] || 0),
                        z: parseFloat(rot[isArray ? 2 : "z"] || 0),
                        order: order
                    };
            }
        }
    }

    function _scale(s) {
        if (s) {
            switch (typeof s === "undefined" ? "undefined" : _typeof(s)) {
                case "string":
                    s = (s + "").trim().split(/\s+/);
                case "object":
                    var isArray = Array.isArray(s);
                    if (!(isArray && s.length === 1)) {
                        return {
                            x: parseFloat(s[isArray ? 0 : "x"] || 0) || 1,
                            y: parseFloat(s[isArray ? 1 : "y"] || 0) || 1,
                            z: parseFloat(s[isArray ? 2 : "z"] || 0) || 1
                        };
                    }
                    s = parseFloat(s[0]);
                case "number":
                    return {
                        x: s,
                        y: s,
                        z: s
                    };
            }
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
