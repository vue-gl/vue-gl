describe('VglTextGeometry:', function suite() {
  const { VglTextGeometry, VglNamespace } = VueGL;
  const { expect } = chai;
  if (navigator.appVersion.toLowerCase().indexOf("msie 9.") != -1) this.timeout(60000);
  const font1 = `data:,${encodeURIComponent('{"glyphs":{"a":{"x_min":0,"x_max":698.609375,"ha":794,"o":"m 698 0 q 661 -12 679 -7 q 615 -17 643 -17 q 536 12 564 -17 q 500 96 508 41 q 384 6 456 37 q 236 -25 312 -25 q 65 31 130 -25 q 0 194 0 88 q 118 390 0 334 q 328 435 180 420 q 488 483 476 451 q 495 523 495 504 q 442 619 495 584 q 325 654 389 654 q 209 617 257 654 q 152 513 161 580 l 33 513 q 123 705 33 633 q 332 772 207 772 q 528 712 448 772 q 617 531 617 645 l 617 163 q 624 108 617 126 q 664 90 632 90 l 698 94 l 698 0 m 491 262 l 491 372 q 272 329 350 347 q 128 201 128 294 q 166 113 128 144 q 264 83 205 83 q 414 130 346 83 q 491 262 491 183 "}},"ascender":1189,"underlinePosition":-100,"boundingBox":{"yMin":-334,"xMin":-111,"yMax":1189,"xMax":1672},"resolution":1000,"descender":-334,"lineHeight":1522,"underlineThickness":50}')}`;
  const font2 = `data:,${encodeURIComponent('{"glyphs":{"a":{"x_min":0,"x_max":698.609375,"ha":794,"o":"m 691 0 q 661 -12 679 -7 q 615 -17 643 -17 q 536 12 564 -17 q 500 96 508 41 q 384 6 456 37 q 236 -25 312 -25 q 65 31 130 -25 q 0 194 0 88 q 118 390 0 334 q 328 435 180 420 q 488 483 476 451 q 495 523 495 504 q 442 619 495 584 q 325 654 389 654 q 209 617 257 654 q 152 513 161 580 l 33 513 q 123 705 33 633 q 332 772 207 772 q 528 712 448 772 q 617 531 617 645 l 617 163 q 624 108 617 126 q 664 90 632 90 l 698 94 l 698 0 m 491 262 l 491 372 q 272 329 350 347 q 128 201 128 294 q 166 113 128 144 q 264 83 205 83 q 414 130 346 83 q 491 262 491 183 "}},"ascender":1189,"underlinePosition":-100,"boundingBox":{"yMin":-334,"xMin":-111,"yMax":1189,"xMax":1672},"resolution":1000,"descender":-334,"lineHeight":1522,"underlineThickness":50}')}`;
  it('with properties', function test(done) {
    const vm = new Vue({
      template: `<vgl-namespace><vgl-text-geometry ref="g" font="${font1}" size="120" height="6" curve-segments="8" bevel-enabled bevel-thickness="3" bevel-size="6" bevel-segments="2" text="a" /></vgl-namespace>`,
      components: { VglTextGeometry, VglNamespace },
    }).$mount();
    new THREE.FontLoader().load(font1, (font) => {
      const expected = new THREE.TextBufferGeometry('a', {
        font,
        size: 120,
        height: 6,
        curveSegments: 8,
        bevelEnabled: true,
        bevelThickness: 3,
        bevelSize: 6,
        bevelSegments: 2,
      });
      vm.$refs.g.$watch('inst', (inst) => {
        if (inst.type === expected.type) {
          vm.$nextTick(() => {
            try {
              const mediator = new THREE.BufferGeometry();
              expect(mediator.copy(inst).toJSON()).to.deep.equal(mediator.copy(expected).toJSON());
              done();
            } catch (e) {
              done(e);
            }
          });
        }
      }, { immediate: true });
    });
  });
  it('without properties', function test(done) {
    const vm = new Vue({
      template: `<vgl-namespace><vgl-text-geometry ref="g" font="${font1}" text="a" /></vgl-namespace>`,
      components: { VglTextGeometry, VglNamespace },
    }).$mount();
    new THREE.FontLoader().load(font1, (font) => {
      const expected = new THREE.TextBufferGeometry('a', { font });
      vm.$refs.g.$watch('inst', (inst) => {
        if (inst.type === expected.type) {
          vm.$nextTick(() => {
            try {
              const mediator = new THREE.BufferGeometry();
              expect(mediator.copy(inst).toJSON()).to.deep.equal(mediator.copy(expected).toJSON());
              done();
            } catch (e) {
              done(e);
            }
          });
        }
      }, { immediate: true });
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-text-geometry ref="g" :font="font" :size="size" :height="height" :curve-segments="curveSegments" :bevel-enabled="bevelEnabled" :bevel-thickness="bevelThickness" :bevel-size="bevelSize" :bevel-segments="bevelSegments" text="a" /></vgl-namespace>',
      components: { VglTextGeometry, VglNamespace },
      data: {
        font: font1,
        size: 120,
        height: 8,
        curveSegments: 7,
        bevelEnabled: false,
        bevelThickness: 2,
        bevelSize: 5,
        bevelSegments: 3,
      },
    }).$mount();
    new THREE.FontLoader().load(font1, (fontBefore) => {
      const mediator = new THREE.BufferGeometry();
      const expected1 = new THREE.TextBufferGeometry('a', {
        font: fontBefore,
        size: 120,
        height: 8,
        curveSegments: 7,
        bevelEnabled: false,
        bevelThickness: 2,
        bevelSize: 5,
        bevelSegments: 3,
      });
      const unwatch1 = vm.$refs.g.$watch('inst', (inst1) => {
        if (inst1.type === expected1.type) {
          vm.$nextTick(() => {
            try {
              const actualJson1 = mediator.copy(inst1).toJSON();
              const expectedJson1 = mediator.copy(expected1).toJSON();
              expect(actualJson1).to.deep.equal(expectedJson1);
              unwatch1();
            } catch (e) {
              done(e);
            }
            vm.size = 152.3;
            vm.height = 7;
            vm.curveSegments = 6;
            vm.bevelEnabled = true;
            vm.bevelThickness = 3;
            vm.bevelSize = 4;
            vm.bevelSegments = 4;
            vm.$nextTick(() => {
              try {
                const expected2 = new THREE.TextBufferGeometry('a', {
                  font: fontBefore,
                  size: 152.3,
                  height: 7,
                  curveSegments: 6,
                  bevelEnabled: true,
                  bevelThickness: 3,
                  bevelSize: 4,
                  bevelSegments: 4,
                });
                const actualJson2 = mediator.copy(vm.$refs.g.inst).toJSON();
                const expectedJson2 = mediator.copy(expected2).toJSON();
                expect(actualJson2).to.deep.equal(expectedJson2);
              } catch (e) {
                done(e);
              }
              vm.font = font2;
              vm.$refs.g.$watch('inst', (inst2) => {
                new THREE.FontLoader().load(font2, (fontAfter) => {
                  try {
                    const expected3 = new THREE.TextBufferGeometry('a', {
                      font: fontAfter,
                      size: 152.3,
                      height: 7,
                      curveSegments: 6,
                      bevelEnabled: true,
                      bevelThickness: 3,
                      bevelSize: 4,
                      bevelSegments: 4,
                    });
                    const actualJson3 = mediator.copy(inst2).toJSON();
                    const expectedJson3 = mediator.copy(expected3).toJSON();
                    expect(actualJson3).to.deep.equal(expectedJson3);
                    done();
                  } catch (e) {
                    done(e);
                  }
                });
              });
            });
          });
        }
      }, { immediate: true });
    });
  });
});
