import VglNamespace from "./vgl-namespace.js";
import {WebGLRenderer} from "./three.js";

function resizeCamera(camera, domElement) {
    const width = domElement.clientWidth;
    const height = domElement.clientHeight;
    if (camera.isPerspectiveCamera) {
        camera.aspect = width / height;
    } else { // isOrthographicCamera
        camera.left = width / -2;
        camera.right = width / 2;
        camera.top = height / 2;
        camera.bottom = height / -2;
    }
    camera.updateProjectionMatrix();
}

function resizeRenderer(renderer, domElement) {
    renderer.setSize(domElement.clientWidth, domElement.clientHeight, false);
}

export default {
    mixins: [VglNamespace],
    props: {
        precision: String,
        alpha: Boolean,
        disablePremultipliedAlpha: Boolean,
        antialias: Boolean,
        disableStencil: Boolean,
        preserveDrawingBuffer: Boolean,
        disableDepth: Boolean,
        logarithmicDepthBuffer: Boolean,
        camera: String,
        scene: String,
        shadowMapEnabled: Boolean
    },
    provide() {
        return {
            vglUpdate: this.render
        };
    },
    data() {
        return {
            key: 0,
            req: true
        };
    },
    computed: {
        opt() {
            return {
                precision: this.precision,
                alpha: this.alpha,
                premultipliedAlpha: !this.disablePremultipliedAlpha,
                antialias: this.antialias,
                stencil: !this.disableStencil,
                preserveDrawingBuffer: this.preserveDrawingBuffer,
                depth: !this.disableDepth,
                logarithmicDepthBuffer: this.logarithmicDepthBuffer
            };
        },
        inst() {
            return new WebGLRenderer(Object.assign({
                canvas: this.$refs.rdr
            }, this.opt));
        },
        cmr() {
            return (this.$data.vglCameras || this.vglCameras.forGet)[this.camera];
        },
        scn() {
            return (this.$data.vglScenes || this.vglScenes.forGet)[this.scene];
        }
    },
    methods: {
        resize() {
            resizeRenderer(this.inst, this.$el);
            if (this.cmr) {
                resizeCamera(this.cmr, this.$el);
                if (this.scn) this.render();
            }
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
        },
        init() {
            this.$nextTick(() => {
                this.inst.shadowMap.enabled = this.shadowMapEnabled;
                this.resize();
            });
        }
    },
    watch: {
        opt() {
            ++this.key;
            this.init();
        },
        scn(scn, oldScn) {
            if (oldScn) oldScn.removeEventListener("update", this.render);
            if (scn) {
                scn.addEventListener("update", this.render);
                this.render();
            }
        },
        cmr(cmr, oldCmr) {
            if (oldCmr) oldCmr.removeEventListener("update", this.render);
            if (cmr) {
                cmr.addEventListener("update", this.render);
                resizeCamera(cmr, this.$el);
                this.render();
            }
        },
        shadowMapEnabled(enabled) {
            this.inst.shadowMap.enabled = enabled;
        }
    },
    created() {
        if (this.scn) this.scn.addEventListener("update", this.render);
        if (this.cmr) this.cmr.addEventListener("update", this.render);
    },
    render(h) {
        return h("div", [
            h("canvas", {
                ref: "rdr",
                key: this.key
            }, this.$slots.default),
            h("iframe", {
                ref: "frm",
                style: {
                    visibility: "hidden",
                    width: "100%",
                    height: "100%"
                },
                on: {
                    load: (evt) => {
                        evt.target.contentWindow.addEventListener("resize", this.resize);
                        this.init();
                    }
                }
            })
        ]);
    }
};
