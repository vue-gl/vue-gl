import VglAssets from "./vgl-assets.js";
import {WebGLRenderer} from "./three.js";

function resizeCamera(camera, domElement) {
    if (camera) {
        camera.aspect = domElement.clientWidth / domElement.clientHeight;
        camera.updateProjectionMatrix();
    }
}

function resizeRenderer(renderer, domElement) {
    renderer.setSize(domElement.clientWidth, domElement.clientHeight, false);
}

export default {
    mixins: [VglAssets],
    props: [
        "precision",
        "alpha",
        "premultipliedAlpha",
        "antialias",
        "stencil",
        "preserveDrawingBuffer",
        "depth",
        "logarithmicDepthBuffer",
        "camera",
        "scene"
    ],
    provide() {
        return {
            cameras: this.cameras,
            scenes: this.scenes,
            render: this.render
        };
    },
    data() {
        return {
            cameras: Object.create(null),
            scenes: Object.create(null),
            key: 0,
            req: true
        };
    },
    computed: {
        opt() {
            return {
                precision: this.precision,
                alpha: this.alpha,
                premultipliedAlpha: this.premultipliedAlpha === undefined || this.premultipliedAlpha,
                antialias: this.antialias,
                stencil: this.stencil === undefined || this.stencil,
                preserveDrawingBuffer: this.preserveDrawingBuffer,
                depth: this.depth === undefined || this.depth,
                logarithmicDepthBuffer: this.logarithmicDepthBuffer
            };
        },
        inst() {
            return new WebGLRenderer(Object.assign({
                canvas: this.$refs.renderer
            }, this.opt));
        },
        cmr() {
            return this.cameras[this.camera];
        },
        scn() {
            return this.scenes[this.scene];
        }
    },
    methods: {
        resize() {
            resizeRenderer(this.inst, this.$el);
            resizeCamera(this.cmr, this.$el);
            this.render();
        },
        render() {
            if (this.req) {
                this.$nextTick(() => {
                    requestAnimationFrame(() => {
                        if (this.scn && this.cmr) {
                            this.inst.render(this.scn, this.cmr);
                        }
                        this.req = true;
                    });
                });
                this.req = false;
            }
        }
    },
    watch: {
        opt() {
            ++this.key;
            this.$nextTick(() => {
                this.resize();
            });
        },
        scn() {
            this.render();
        },
        cmr(cmr) {
            resizeCamera(cmr, this.$el);
            this.render();
        }
    },
    mounted() {
        this.resize();
    },
    render(h) {
        return h("div", [h("canvas", {
            ref: "renderer",
            key: this.key
        }, this.$slots.default)]);
    }
};
