const assetTypes = [
    "scenes",
    "cameras",
    "materials",
    "geometries",
    "attributes"
];

function findParent(vm) {
    if (vm.$parent) {
        if (vm.$parent.$options.isVgl) {
            return vm.$parent;
        }
        return findParent(vm.$parent);
    }
    return null;
}

class Assets {
    constructor(vm) {
        const parent = findParent(vm);
        assetTypes.forEach((key) => {
            this[key] = parent ? Object.create(parent.assets[key]): Object.create(Object.create(null));
        });
        Object.defineProperty(this, "_vm", {value: vm});
    }
    set(type, name, instance) {
        this._vm.$set(Object.getPrototypeOf(this[type]), name, instance);
    }
    delete(type, name, instance) {
        const proto = Object.getPrototypeOf(this[type]);
        if (proto[name] === instance) {
            this._vm.$delete(proto, name);
        }
    }
}

export default {
    isVgl: true,
    data() {
        return {
            assets: new Assets(this)
        };
    },
    render(h) {
        if (this.$slots.default) {
            return h("div", this.$slots.default);
        }
    }
};
