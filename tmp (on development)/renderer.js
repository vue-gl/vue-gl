import {WebGLRenderer} from "three";
import vgl from "./vgl";

export default {
    mixins: [vgl],
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
    data() {
        return {
            key: 0
        };
    },
    computed: {
        options() {
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
        instance() {
            return new WebGLRenderer(
                Object.create(this.options, {
                    canvas: {value: this.$refs.renderer}
                })
            );
        }
    },
    methods: {
        resize() {
            this.instance.setSize(this.$el.clientWidth, this.$el.clientHeight, false);
            this.assets.cameras[this.camera].aspect = this.$el.clientWidth / this.$el.clientHeight;
            this.assets.cameras[this.camera].updateProjectionMatrix();
            this.$emit("update");
        }
    },
    watch: {
        options() {
            ++this.key;
            this.$nextTick(() => {
                this.resize();
            });
        },
        scene() {
            this.$emit("update");
        },
        camera(camera) {
            this.assets.cameras[camera].aspect = this.$el.clientWidth / this.$el.clientHeight;
            this.assets.cameras[camera].updateProjectionMatrix();
            this.$emit("update");
        }
    },
    beforeCreate() {
        let updateRequested = false;
        this.$on("update", () => {
            if (!updateRequested) {
                this.$nextTick(() => {
                    this.instance.render(this.assets.scenes[this.scene], this.assets.cameras[this.camera]);
                    updateRequested = false;
                });
                updateRequested = true;
            }
        });
    },
    mounted() {
        this.resize();
    },
    render(h) {
        if (process.env.NODE_ENV !== "production") {
            return h("div", [h("canvas", {
                ref: "renderer",
                key: this.key,
                attrs: this.$props
            }, this.$slots.default)]);
        }
        return h("div", [h("canvas", {
            ref: "renderer",
            key: this.key
        }, this.$slots.default)]);
    }
};
