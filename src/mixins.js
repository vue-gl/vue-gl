import {parseNumber} from "./utils.js";

export const hasMaterial = {
    props: ["material"],
    computed: {
        mtl() {
            const materials = Object.getPrototypeOf(this.assets.materials);
            if (materials) return materials[this.material];
        }
    },
    created() {
        if (this.mtl) this.inst.material = this.mtl;
    },
    watch: {
        mtl(mtl) {
            this.inst.material = mtl;
        }
    }
};

export const hasGeometry = {
    props: ["geometry"],
    computed: {
        geo() {
            const geometries = Object.getPrototypeOf(this.assets.geometries);
            if (geometries) return geometries[this.geometry];
        }
    },
    created() {
        if (this.geo) this.inst.geometry = this.geo;
    },
    watch: {
        geo(geo) {
            this.inst.geometry = geo;
        }
    }
};

export function hedronFactory(threeClass) {
    return {
        props: ["radius", "detail"],
        computed: {
            inst() {
                return new threeClass(
                    parseNumber(this.radius),
                    parseNumber(this.detail, true)
                );
            }
        }
    };
}
