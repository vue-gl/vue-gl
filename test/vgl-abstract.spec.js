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
            assert.isUndefined(vm.$refs.p.assets.materials.childMaterial);
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
        it("親Vglコンポーネントが存在しないときは、空のオブジェクトを継承する", function() {
            const vm = new Vue({
                template: `<parent-component ref="p"><vgl-abstract ref="v" /></parent-component>`,
                components: {
                    VglAbstract,
                    ParentComponent: {template: `<div><slot /></div>`}
                }
            }).$mount();
            Object.keys(vm.$refs.v.assets).forEach((type) => {
                let count = 0;
                const proto = Object.getPrototypeOf(vm.$refs.v.assets[type]);
                for (let _ in proto) {
                    ++count;
                }
                assert.equal(count, 0);
                assert.isObject(proto);
                assert.isNull(Object.getPrototypeOf(proto));
            });
        });
    });
    describe("Assetsクラスのテスト", function() {
        it("setメソッドで親コンポーネントのassetsを更新する", function() {
            const vm = new Vue({
                template: `<vgl-abstract ref="p"><vgl-abstract ref="c" /></vgl-abstract>`,
                components: {VglAbstract}
            }).$mount();
            vm.$refs.c.assets.set("materials", "mt1", "Material data");
            assert.equal(vm.$refs.p.assets.materials.mt1, "Material data");
        });
        it("ルートコンポーネントでも自分自身を参照できる", function() {
            const vm = new Vue(VglAbstract);
            assert.doesNotThrow(() => {
                vm.assets.set("materials", "mt2", "Root material");
            });
            assert.equal(vm.assets.materials.mt2, "Root material");
        });
        it("deleteメソッドで親コンポーネントのassetsを削除する", function() {
            const vm = new Vue({
                template: `<vgl-abstract ref="p"><vgl-abstract ref="c" /></vgl-abstract>`,
                components: {VglAbstract}
            }).$mount();
            vm.$refs.c.assets.set("materials", "mt3", "Material will be deleted");
            assert.equal(vm.$refs.p.assets.materials.mt3, "Material will be deleted");
            vm.$refs.c.assets.delete("materials", "mt3", "Material will be deleted");
            assert.isUndefined(vm.$refs.p.assets.materials.mt3);
        });
        it("インスタンスが一致しなければ削除しない", function() {
            const vm = new Vue({
                template: `<vgl-abstract ref="p"><vgl-abstract ref="c" /></vgl-abstract>`,
                components: {VglAbstract}
            }).$mount();
            vm.$refs.c.assets.set("materials", "mt4", "Material will not be deleted");
            assert.equal(vm.$refs.p.assets.materials.mt4, "Material will not be deleted");
            vm.$refs.c.assets.delete("materials", "mt4", "Material will be deleted");
            assert.equal(vm.$refs.p.assets.materials.mt4, "Material will not be deleted");
        });
    });
});
