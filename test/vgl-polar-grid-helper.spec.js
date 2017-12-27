/* globals chai Vue VueGL */

describe("VglPolarGridHelper component's", function() {
    const {VglPolarGridHelper, VglNamespace} = VueGL;
    const assert = chai.assert;
    describe("initial property:", function() {
        describe("radius should be the passed value", function() {
            it("When the property is a number", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-polar-grid-helper :radius="3.8" ref="helper" /></vgl-namespace>`,
                    components: {VglPolarGridHelper, VglNamespace}
                }).$mount();
                vm.$refs.helper.inst.geometry.computeBoundingBox();
                const size = vm.$refs.helper.inst.geometry.boundingBox.getSize();
                assert.closeTo(size.x, 7.6, 1e-6);
                assert.closeTo(size.y, 0, 1e-6);
                assert.closeTo(size.z, 7.6, 1e-6);
            });
            it("When the property is a string", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-polar-grid-helper radius="4.3" ref="helper" /></vgl-namespace>`,
                    components: {VglPolarGridHelper, VglNamespace}
                }).$mount();
                vm.$refs.helper.inst.geometry.computeBoundingBox();
                const size = vm.$refs.helper.inst.geometry.boundingBox.getSize();
                assert.closeTo(size.x, 8.6, 1e-6);
                assert.closeTo(size.y, 0, 1e-6);
                assert.closeTo(size.z, 8.6, 1e-6);
            });
            it("When the property is undefined", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-polar-grid-helper ref="helper" /></vgl-namespace>`,
                    components: {VglPolarGridHelper, VglNamespace}
                }).$mount();
                vm.$refs.helper.inst.geometry.computeBoundingBox();
                const size = vm.$refs.helper.inst.geometry.boundingBox.getSize();
                assert.closeTo(size.x, 20, 1e-6);
                assert.closeTo(size.y, 0, 1e-6);
                assert.closeTo(size.z, 20, 1e-6);
            });
        });
        describe("radials should be the passed value", function() {
            it("when the property is a number", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-polar-grid-helper :radials="3" ref="helper" /></vgl-namespace>`,
                    components: {VglPolarGridHelper, VglNamespace}
                }).$mount();
                const vertices = vm.$refs.helper.inst.geometry.getAttribute("position").array;
                assert.lengthOf(vertices, 6 * (3 + 1) + 6 * 64 * (8 + 1));
            });
            it("When the property is a string", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-polar-grid-helper radials="4" ref="helper" /></vgl-namespace>`,
                    components: {VglPolarGridHelper, VglNamespace}
                }).$mount();
                const vertices = vm.$refs.helper.inst.geometry.getAttribute("position").array;
                assert.lengthOf(vertices, 6 * (4 + 1) + 6 * 64 * (8 + 1));
            });
            it("When the property is undefined", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-polar-grid-helper ref="helper" /></vgl-namespace>`,
                    components: {VglPolarGridHelper, VglNamespace}
                }).$mount();
                const vertices = vm.$refs.helper.inst.geometry.getAttribute("position").array;
                assert.lengthOf(vertices, 6 * (16 + 1) + 6 * 64 * (8 + 1));
            });
        });
        describe("circles should be the passed value", function() {
            it("when the property is a number", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-polar-grid-helper :circles="3" ref="helper" /></vgl-namespace>`,
                    components: {VglPolarGridHelper, VglNamespace}
                }).$mount();
                const vertices = vm.$refs.helper.inst.geometry.getAttribute("position").array;
                assert.lengthOf(vertices, 6 * (16 + 1) + 6 * 64 * (3 + 1));
            });
            it("When the property is a string", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-polar-grid-helper circles="4" ref="helper" /></vgl-namespace>`,
                    components: {VglPolarGridHelper, VglNamespace}
                }).$mount();
                const vertices = vm.$refs.helper.inst.geometry.getAttribute("position").array;
                assert.lengthOf(vertices, 6 * (16 + 1) + 6 * 64 * (4 + 1));
            });
            it("When the property is undefined", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-polar-grid-helper ref="helper" /></vgl-namespace>`,
                    components: {VglPolarGridHelper, VglNamespace}
                }).$mount();
                const vertices = vm.$refs.helper.inst.geometry.getAttribute("position").array;
                assert.lengthOf(vertices, 6 * (16 + 1) + 6 * 64 * (8 + 1));
            });
        });
        describe("divisions should be the passed value", function() {
            it("when the property is a number", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-polar-grid-helper :divisions="24" ref="helper" /></vgl-namespace>`,
                    components: {VglPolarGridHelper, VglNamespace}
                }).$mount();
                const vertices = vm.$refs.helper.inst.geometry.getAttribute("position").array;
                assert.lengthOf(vertices, 6 * (16 + 1) + 6 * 24 * (8 + 1));
            });
            it("When the property is a string", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-polar-grid-helper divisions="48" ref="helper" /></vgl-namespace>`,
                    components: {VglPolarGridHelper, VglNamespace}
                }).$mount();
                const vertices = vm.$refs.helper.inst.geometry.getAttribute("position").array;
                assert.lengthOf(vertices, 6 * (16 + 1) + 6 * 48 * (8 + 1));
            });
            it("When the property is undefined", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-polar-grid-helper ref="helper" /></vgl-namespace>`,
                    components: {VglPolarGridHelper, VglNamespace}
                }).$mount();
                const vertices = vm.$refs.helper.inst.geometry.getAttribute("position").array;
                assert.lengthOf(vertices, 6 * (16 + 1) + 6 * 64 * (8 + 1));
            });
        });
        describe("second color should be the passed value", function() {
            it("When the property is a string", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-polar-grid-helper color2="#2819fe" ref="helper" /></vgl-namespace>`,
                    components: {VglPolarGridHelper, VglNamespace}
                }).$mount();
                const colors = vm.$refs.helper.inst.geometry.getAttribute("color").array;
                assert.closeTo(colors[0], 0.1568627, 1e-6);
                assert.closeTo(colors[1], 0.0980392, 1e-6);
                assert.closeTo(colors[2], 0.9960784, 1e-6);
            });
            it("When the property is undefined", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-polar-grid-helper ref="helper" /></vgl-namespace>`,
                    components: {VglPolarGridHelper, VglNamespace}
                }).$mount();
                const colors = vm.$refs.helper.inst.geometry.getAttribute("color").array;
                assert.closeTo(colors[0], 0.5333333, 1e-6);
                assert.closeTo(colors[1], 0.5333333, 1e-6);
                assert.closeTo(colors[2], 0.5333333, 1e-6);
            });
        });
        describe("first color should be the passed value", function() {
            it("When the property is a string", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-polar-grid-helper color1="#dea54f" ref="helper" /></vgl-namespace>`,
                    components: {VglPolarGridHelper, VglNamespace}
                }).$mount();
                const colors = vm.$refs.helper.inst.geometry.getAttribute("color").array;
                assert.closeTo(colors[6], 0.8705882, 1e-6);
                assert.closeTo(colors[7], 0.6470588, 1e-6);
                assert.closeTo(colors[8], 0.3098039, 1e-6);
            });
            it("When the property is undefined", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-polar-grid-helper ref="helper" /></vgl-namespace>`,
                    components: {VglPolarGridHelper, VglNamespace}
                }).$mount();
                const colors = vm.$refs.helper.inst.geometry.getAttribute("color").array;
                assert.closeTo(colors[6], 0.2666667, 1e-6);
                assert.closeTo(colors[7], 0.2666667, 1e-6);
                assert.closeTo(colors[8], 0.2666667, 1e-6);
            });
        });
    });
    describe("Watching properties", function() {
        it("The instance should be recreated when a property changes.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-polar-grid-helper :radius="radius" ref="helper" /></vgl-namespace>`,
                components: {VglPolarGridHelper, VglNamespace},
                data: {radius: 1.1}
            }).$mount();
            const before = vm.$refs.helper.inst;
            vm.radius = 1.5;
            vm.$nextTick(() => {
                try {
                    assert.notEqual(before, vm.$refs.helper.inst);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
    });
});
