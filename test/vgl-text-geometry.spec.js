describe("VglTextGeometry component", function() {
    const {VglTextGeometry, VglNamespace, VglFont} = VueGL;
    const assert = chai.assert;
    before(function() {
        this.typeface = encodeURIComponent('{"glyphs":{"a":{"x_min":0,"x_max":698.609375,"ha":794,"o":"m 698 0 q 661 -12 679 -7 q 615 -17 643 -17 q 536 12 564 -17 q 500 96 508 41 q 384 6 456 37 q 236 -25 312 -25 q 65 31 130 -25 q 0 194 0 88 q 118 390 0 334 q 328 435 180 420 q 488 483 476 451 q 495 523 495 504 q 442 619 495 584 q 325 654 389 654 q 209 617 257 654 q 152 513 161 580 l 33 513 q 123 705 33 633 q 332 772 207 772 q 528 712 448 772 q 617 531 617 645 l 617 163 q 624 108 617 126 q 664 90 632 90 l 698 94 l 698 0 m 491 262 l 491 372 q 272 329 350 347 q 128 201 128 294 q 166 113 128 144 q 264 83 205 83 q 414 130 346 83 q 491 262 491 183 "}},"cssFontWeight":"normal","ascender":1189,"underlinePosition":-100,"cssFontStyle":"normal","boundingBox":{"yMin":-334,"xMin":-111,"yMax":1189,"xMax":1672},"resolution":1000,"original_font_information":{"postscript_name":"Helvetiker-Regular","version_string":"Version 1.00 2004 initial release","vendor_url":"http://www.magenta.gr/","full_font_name":"Helvetiker","font_family_name":"Helvetiker","copyright":"Copyright (c) Μagenta ltd, 2004","description":"","trademark":"","designer":"","designer_url":"","unique_font_identifier":"Μagenta ltd:Helvetiker:22-10-104","license_url":"http://www.ellak.gr/fonts/MgOpen/license.html","license_description":"Copyright (c) 2004 by MAGENTA Ltd. All Rights Reserved.\r\n\r\nPermission is hereby granted, free of charge, to any person obtaining a copy of the fonts accompanying this license (\"Fonts\") and associated documentation files (the \"Font Software\"), to reproduce and distribute the Font Software, including without limitation the rights to use, copy, merge, publish, distribute, and/or sell copies of the Font Software, and to permit persons to whom the Font Software is furnished to do so, subject to the following conditions: \r\n\r\nThe above copyright and this permission notice shall be included in all copies of one or more of the Font Software typefaces.\r\n\r\nThe Font Software may be modified, altered, or added to, and in particular the designs of glyphs or characters in the Fonts may be modified and additional glyphs or characters may be added to the Fonts, only if the fonts are renamed to names not containing the word \"MgOpen\", or if the modifications are accepted for inclusion in the Font Software itself by the each appointed Administrator.\r\n\r\nThis License becomes null and void to the extent applicable to Fonts or Font Software that has been modified and is distributed under the \"MgOpen\" name.\r\n\r\nThe Font Software may be sold as part of a larger software package but no copy of one or more of the Font Software typefaces may be sold by itself. \r\n\r\nTHE FONT SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL MAGENTA OR PERSONS OR BODIES IN CHARGE OF ADMINISTRATION AND MAINTENANCE OF THE FONT SOFTWARE BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM OTHER DEALINGS IN THE FONT SOFTWARE.","manufacturer_name":"Μagenta ltd","font_sub_family_name":"Regular"},"descender":-334,"familyName":"Helvetiker","lineHeight":1522,"underlineThickness":50}');
    });
    describe("Parameters of a instance should be same as the component properties.", function() {
        it("When properties are number.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-font ref="font" name="font" src="data:,${this.typeface}" /><vgl-text-geometry ref="geo" font="font" :size="10" :height="6" :curve-segments="8" :bevel-enabled="true" :bevel-thickness="3" :bevel-size="6" :bevel-segments="2">a</vgl-text-geometry></vgl-namespace>`,
                components: {VglTextGeometry, VglNamespace, VglFont}
            }).$mount();
            vm.$refs.font.$watch("inst", () => {
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.size, 10);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.height, 6);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.curveSegments, 8);
                        assert.isTrue(vm.$refs.geo.inst.parameters.parameters.bevelEnabled);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelThickness, 3);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSize, 6);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSegments, 2);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
        it("When properties are string.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-font ref="font" name="font" src="data:,${this.typeface}" /><vgl-text-geometry ref="geo" font="font" size="10" height="6" curve-segments="8" bevel-enabled bevel-thickness="3" bevel-size="6" bevel-segments="2">a</vgl-text-geometry></vgl-namespace>`,
                components: {VglTextGeometry, VglNamespace, VglFont}
            }).$mount();
            vm.$refs.font.$watch("inst", () => {
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.size, 10);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.height, 6);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.curveSegments, 8);
                        assert.isTrue(vm.$refs.geo.inst.parameters.parameters.bevelEnabled);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelThickness, 3);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSize, 6);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSegments, 2);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
        it("When properties are undefined.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-font ref="font" name="font" src="${this.typeface}" /><vgl-text-geometry ref="geo" font="font">a</vgl-text-geometry></vgl-namespace>`,
                components: {VglTextGeometry, VglNamespace, VglFont}
            }).$mount();
            vm.$refs.font.$watch("inst", () => {
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.size, 100);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.height, 50);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.curveSegments, 12);
                        assert.isFalse(vm.$refs.geo.inst.parameters.parameters.bevelEnabled);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelThickness, 10);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSize, 8);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSegments, 3);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
    });
    describe("Instance should be recreated when a property changed.", function() {
        it("When the width property changes.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-font ref="font" name="font" src="base/test/helvetiker_regular.typeface.json" /><vgl-text-geometry ref="geo" font="font" :size="size">a</vgl-text-geometry></vgl-namespace>`,
                components: {VglTextGeometry, VglNamespace, VglFont},
                data: {size: 120}
            }).$mount();
            vm.$refs.font.$watch("inst", () => {
                vm.$nextTick(() => {
                    const before = vm.$refs.geo.inst;
                    vm.size = 110;
                    vm.$nextTick(() => {
                        try {
                            assert.notEqual(before, vm.$refs.geo.inst);
                            done();
                        } catch(e) {
                            done(e);
                        }
                    });
                });
            });
        });
    });
});
