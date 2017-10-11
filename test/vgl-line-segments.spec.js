describe("VglLineSegments component", function() {
    const {VglLineSegments, VglNamespace} = VueGL;
    const assert = chai.assert;
    it("The instance should be a LineSegments object.", function() {
        const vm = new Vue({
            template: `<vgl-namespace><vgl-line-segments ref="seg" /></vgl-namespace>`,
            components: {VglLineSegments, VglNamespace}
        }).$mount();
        assert.isTrue(vm.$refs.seg.inst.isLineSegments);
    });
});
