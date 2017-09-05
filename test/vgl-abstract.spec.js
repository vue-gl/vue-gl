import {VglAbstract} from "../src/index.js";
const assert = chai.assert;

describe("VglAbstractコンポーネントのテスト", function() {
    describe("assetsのテスト", function() {
        it("コンポーネント自身のプロパティにアクセスできる", function() {
            const vm = new Vue(VglAbstract);
            vm.assets.materials.testMaterial = "Material Object";
            assert.equal(vm.assets.materials.testMaterial, "Material Object");
        });
        it("親コンポーネントのプロパティにアクセスできる", function() {
            const vm = new Vue({
                template: `<vgl-abstract ref="p"><vgl-abstract ref="c" /></vgl-abstract>`,
                components: {VglAbstract}
            }).$mount();
            vm.$refs.p.assets.materials.parentMaterial = "Parent Material Object";
            assert.equal(vm.$refs.c.assets.materials.parentMaterial, "Parent Material Object");
        });
        it("子コンポーネントのプロパティにはアクセスできない", function() {
            const vm = new Vue({
                template: `<vgl-abstract ref="p"><vgl-abstract ref="c" /></vgl-abstract>`,
                components: {VglAbstract}
            }).$mount();
            vm.$refs.c.assets.materials.childMaterial = "Child Material Object";
            assert.strictEqual(vm.$refs.p.assets.materials.childMaterial, undefined);
        });
        it("同じプロパティ名を使い分けられる", function() {
            const vm = new Vue({
                template: `<vgl-abstract ref="p"><vgl-abstract ref="c1"><vgl-abstract ref="gc1" /></vgl-abstract><vgl-abstract ref="c2"><vgl-abstract ref="gc2" /></vgl-abstract></vgl-abstract>`,
                components: {VglAbstract}
            }).$mount();
            vm.$refs.p.assets.materials.sameNameMaterial = "Parent Material Object";
            vm.$refs.c1.assets.materials.sameNameMaterial = "Child Material Object";
            vm.$refs.gc2.assets.materials.sameNameMaterial = "Grandchild Material Object";
            assert.equal(vm.$refs.p.assets.materials.sameNameMaterial, "Parent Material Object");
            assert.equal(vm.$refs.c1.assets.materials.sameNameMaterial, "Child Material Object");
            assert.equal(vm.$refs.gc1.assets.materials.sameNameMaterial, "Child Material Object");
            assert.equal(vm.$refs.c2.assets.materials.sameNameMaterial, "Parent Material Object");
            assert.equal(vm.$refs.gc2.assets.materials.sameNameMaterial, "Grandchild Material Object");
        });
        it("直接の親子関係でなくてもプロパティにアクセスできる", function() {
            const vm = new Vue({
                template: `<vgl-abstract ref="p"><child ref="o"><vgl-abstract ref="c" /></child></vgl-abstract>`,
                components: {
                    VglAbstract,
                    Child: {template: `<div><slot /></div>`}
                }
            }).$mount();
            vm.$refs.p.assets.materials.materialData = "Material Data";
            assert.equal(vm.$refs.c.assets.materials.materialData, "Material Data");
        });
        it("親Vglコンポーネントが存在しないときは、nullを継承する", function() {
            const vm = new Vue({
                template: `<parent-component ref="p"><vgl-abstract ref="v" /></parent-component>`,
                components: {
                    VglAbstract,
                    ParentComponent: {template: `<div><slot /></div>`}
                }
            }).$mount();
            Object.keys(vm.$refs.v.assets).forEach((type) => {
                assert.strictEqual(Object.getPrototypeOf(vm.$refs.v.assets[type]), null);
            });
        });
    });
});
