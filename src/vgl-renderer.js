import VglAssets from "./vgl-assets.js";
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
            scenes: this.scenes
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
                canvas: this.$refs.rdr
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
        }
    },
    watch: {
        opt() {
            ++this.key;
            this.$nextTick(() => {
                this.resize();
            });
        },
        scn(scn) {
            if (scn) this.render();
        },
        cmr(cmr) {
            if (cmr) {
                resizeCamera(cmr, this.$el);
                this.render();
            }
        }
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
                        this.$nextTick(this.resize);
                    }
                }
            })
        ]);
    }
};
