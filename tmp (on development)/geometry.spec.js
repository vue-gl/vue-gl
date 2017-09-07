import {geometry} from "../src";
import assert from "assert";
import Vue from "vue";
import {vgl} from "../src";
import {BoxGeometry, CircleGeometry} from "three";

describe("geometryコンポーネントのテスト", function() {
    describe("instanceが親コンポーネントのassetに適切にセットされる。", function() {
        it("起動すると、instanceが親コンポーネントのassets.geometriesにセットされる。", function() {
            const vm = new Vue({
                template: `<vgl ref="p"><geometry ref="g" name="x" /></vgl>`,
                components: {
                    vgl,
                    geometry
                }
            });
            vm.$mount();
            assert.equal(vm.$refs.p.assets.geometries.x, vm.$refs.g.instance);
        });
        it("破棄すると、instanceが親コンポーネントのassets.geometriesから取り除かれる。", function(done) {
            const vm = new Vue({
                template: `<vgl ref="p"><geometry ref="g" v-if="on" name="x" /></vgl>`,
                data: {
                    on: true
                },
                components: {
                    vgl,
                    geometry
                }
            });
            vm.$mount();
            vm.on = false;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.p.assets.geometries.x, undefined);
                done();
            });
        });
        it("instanceを再生成すると、親コンポーネントのassets.geometriesに反映される。", function(done) {
            const vm = new Vue({
                template: `<vgl ref="p"><geometry-ex ref="g" name="x" /></vgl>`,
                components: {
                    vgl,
                    "geometry-ex": {
                        mixins: [geometry],
                        computed: {
                            instance() {
                                if (this.sw) {
                                    return new BoxGeometry(1, 1, 1);
                                }
                                return new CircleGeometry();
                            }
                        },
                        data() {
                            return {
                                sw: false
                            };
                        }
                    }
                }
            });
            vm.$mount();
            assert(vm.$refs.g.instance instanceof CircleGeometry);
            assert.equal(vm.$refs.p.assets.geometries.x, vm.$refs.g.instance);
            vm.$refs.g.sw = true;
            Vue.nextTick(() => {
                assert(vm.$refs.g.instance instanceof BoxGeometry);
                assert.equal(vm.$refs.p.assets.geometries.x, vm.$refs.g.instance);
                done();
            });
        });
        it("同じnameプロパティを持つコンポーネントに入れ替える場合。", function(done) {
            const vm = new Vue({
                template: `<vgl ref="p"><geometry ref="g" v-if="on" name="x" /><geometry ref="h" v-else name="x" /></vgl>`,
                data: {
                    on: false
                },
                components: {
                    vgl,
                    geometry
                }
            });
            vm.$mount();
            assert.equal(vm.$refs.p.assets.geometries.x, vm.$refs.h.instance);
            assert.equal(vm.$refs.g, undefined);
            vm.on = true;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.p.assets.geometries.x, vm.$refs.g.instance);
                assert.equal(vm.$refs.h, undefined);
                done();
            });
        });
    });
});
