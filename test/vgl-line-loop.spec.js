describe("VglLineLoop component", function() {
    const {VglLineLoop, VglNamespace} = VueGL;
    const assert = chai.assert;
    it("The instance should be a LineLoop object.", function() {
        const vm = new Vue({
            template: `<vgl-namespace><vgl-line-loop ref="loop" /></vgl-namespace>`,
            components: {VglLineLoop, VglNamespace}
        }).$mount();
        assert.isTrue(vm.$refs.loop.inst.isLineLoop);
    });
});
