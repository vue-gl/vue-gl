describe('VglRenderer:', function component() {
  const { VglRenderer, VglNamespace } = VueGL;
  const { assert } = chai;
  this.timeout(0);
  const testCamera = (() => {
    const camera = new THREE.PerspectiveCamera();
    camera.position.y = 10;
    camera.position.z = 10;
    camera.aspect = 287 / 199;
    camera.lookAt(new THREE.Vector3());
    camera.updateProjectionMatrix();
    return camera;
  })();
  const testScene = (() => {
    const scene = new THREE.Scene();
    let light;
    light = new THREE.AmbientLight(0x404040);
    scene.add(light);
    light = new THREE.DirectionalLight();
    light.position.set(3, 10, 0);
    light.castShadow = true;
    scene.add(light);
    const geometry = new THREE.TorusKnotGeometry();
    const material = new THREE.MeshStandardMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    return scene;
  })();
  const testCamera2 = (() => {
    const camera = testCamera.clone();
    camera.fov = 40;
    camera.updateProjectionMatrix();
    return camera;
  })();
  const testScene2 = (() => {
    const scene = testScene.clone();
    scene.fog = new THREE.Fog(0xffffff);
    return scene;
  })();
  const RscSetter = {
    inject: ['vglNamespace'],
    data() {
      return {
        camera: testCamera.clone(),
        scene: testScene.clone(),
        camera2: testCamera2.clone(),
        scene2: testScene2.clone(),
      };
    },
    created() {
      this.$set(this.vglNamespace.cameras, 'cmr', this.camera);
      this.$set(this.vglNamespace.scenes, 'scn', this.scene);
      this.$set(this.vglNamespace.cameras, 'cmr2', this.camera2);
      this.$set(this.vglNamespace.scenes, 'scn2', this.scene2);
    },
    render() {},
  };
  beforeEach(function hook(done) {
    this.sandbox = document.createElement('div');
    this.sandbox.innerHTML = '<div class="app"></div>';
    document.body.appendChild(this.sandbox);
    this.sandboxApp = this.sandbox.querySelector('.app');
    done();
  });
  afterEach(function hook(done) {
    document.body.removeChild(this.sandbox);
    done();
  });
  describe('The drawn images should be configured correctly', function suite() {
    before(function hook(done) {
      // Skip if WebGLRenderer creation fails.
      const sandbox = document.createElement('div');
      document.body.appendChild(sandbox);
      try {
        const renderer = new THREE.WebGLRenderer();
        sandbox.appendChild(renderer.domElement);
        renderer.setSize(287, 199);
        renderer.render(testScene.clone(), testCamera.clone());
        this.defaultImage = renderer.domElement.toDataURL();
        assert.match(this.defaultImage, /^data:image\/png[,;]/);
      } catch (e) {
        document.body.removeChild(sandbox);
        this.skip();
      }
      document.body.removeChild(sandbox);
      done();
    });
    it('with default properties', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" scene="scn" style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        try {
          const actual = vm.$el.getElementsByTagName('canvas')[0].toDataURL();
          assert.strictEqual(actual, this.defaultImage, 'Rendering results are different.');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('with alpha = true', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" scene="scn" alpha style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
      }).$mount(this.sandboxApp);
      const testRenderer = new THREE.WebGLRenderer({ alpha: true });
      testRenderer.setSize(287, 199);
      testRenderer.render(testScene.clone(), testCamera.clone());
      const expected = testRenderer.domElement.toDataURL();
      try {
        assert.notEqual(expected, this.defaultImage);
      } catch (e) {
        // Skip if the option does not affect.
        this.skip();
      }
      vm.$nextTick(() => {
        try {
          const actual = vm.$el.getElementsByTagName('canvas')[0].toDataURL();
          assert.strictEqual(actual, expected, 'Rendering results are different.');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('with antialias = true', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" scene="scn" antialias style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
      }).$mount(this.sandboxApp);
      const testRenderer = new THREE.WebGLRenderer({ antialias: true });
      testRenderer.setSize(287, 199);
      testRenderer.render(testScene.clone(), testCamera.clone());
      const expected = testRenderer.domElement.toDataURL();
      try {
        assert.notEqual(expected, this.defaultImage);
      } catch (e) {
        // Skip if the option does not affect.
        this.skip();
      }
      vm.$nextTick(() => {
        try {
          const actual = vm.$el.getElementsByTagName('canvas')[0].toDataURL();
          assert.strictEqual(actual, expected, 'Rendering results are different.');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('with disablePremultipliedAlpha = true', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" scene="scn" disable-premultiplied-alpha style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
      }).$mount(this.sandboxApp);
      const testRenderer = new THREE.WebGLRenderer({ premultipliedAlpha: false });
      testRenderer.setSize(287, 199);
      testRenderer.render(testScene.clone(), testCamera.clone());
      const expected = testRenderer.domElement.toDataURL();
      try {
        assert.notEqual(expected, this.defaultImage);
      } catch (e) {
        // Skip if the option does not affect.
        this.skip();
      }
      vm.$nextTick(() => {
        try {
          const actual = vm.$el.getElementsByTagName('canvas')[0].toDataURL();
          assert.strictEqual(actual, expected, 'Rendering results are different.');
          done();
        } catch (e) {
          done();
        }
      });
    });
    it('with shadowMapEnabled = true', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" scene="scn" shadow-map-enabled style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
      }).$mount(this.sandboxApp);
      const testRenderer = new THREE.WebGLRenderer();
      testRenderer.shadowMap.enabled = true;
      testRenderer.setSize(287, 199);
      testRenderer.render(testScene.clone(), testCamera.clone());
      const expected = testRenderer.domElement.toDataURL();
      try {
        assert.notEqual(expected, this.defaultImage);
      } catch (e) {
        // Skip if the option does not affect.
        this.skip();
      }
      vm.$nextTick(() => {
        try {
          const actual = vm.$el.getElementsByTagName('canvas')[0].toDataURL();
          assert.strictEqual(actual, expected, 'Rendering results are different.');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('when the alpha property is changed after initilization', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" scene="scn" :alpha="alpha" style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
        data: { alpha: false },
      }).$mount(this.sandboxApp);
      const testRenderer = new THREE.WebGLRenderer({ alpha: true });
      testRenderer.setSize(287, 199);
      testRenderer.render(testScene.clone(), testCamera.clone());
      const expected = testRenderer.domElement.toDataURL();
      try {
        assert.notEqual(expected, this.defaultImage);
      } catch (e) {
        // Skip if the option does not affect.
        this.skip();
      }
      vm.$nextTick(() => {
        vm.alpha = true;
        vm.$nextTick(() => {
          try {
            const actual = vm.$el.getElementsByTagName('canvas')[0].toDataURL();
            assert.strictEqual(actual, expected, 'Rendering results are different.');
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('without camera', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="scn" style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
      }).$mount(this.sandboxApp);
      const testRenderer = new THREE.WebGLRenderer();
      testRenderer.setSize(287, 199);
      const expected = testRenderer.domElement.toDataURL();
      vm.$nextTick(() => {
        try {
          const actual = vm.$el.getElementsByTagName('canvas')[0].toDataURL();
          assert.strictEqual(actual, expected, 'Rendering results are different.');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('without scene', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
      }).$mount(this.sandboxApp);
      const testRenderer = new THREE.WebGLRenderer();
      testRenderer.setSize(287, 199);
      const expected = testRenderer.domElement.toDataURL();
      vm.$nextTick(() => {
        try {
          const actual = vm.$el.getElementsByTagName('canvas')[0].toDataURL();
          assert.strictEqual(actual, expected, 'Rendering results are different.');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('when camera is set after initilization', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer :camera="camera" scene="scn" style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
        data: { camera: undefined },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        vm.camera = 'cmr';
        vm.$nextTick(() => {
          try {
            const actual = vm.$el.getElementsByTagName('canvas')[0].toDataURL();
            assert.strictEqual(actual, this.defaultImage, 'Rendering results are different.');
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when scene is set after initialization', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" :scene="scene" style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
        data: { scene: undefined },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        vm.scene = 'scn';
        vm.$nextTick(() => {
          try {
            const actual = vm.$el.getElementsByTagName('canvas')[0].toDataURL();
            assert.strictEqual(actual, this.defaultImage, 'Rendering results are different.');
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when camera is changed after initialization', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer :camera="camera" scene="scn" style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
        data: { camera: 'cmr' },
      }).$mount(this.sandboxApp);
      const testRenderer = new THREE.WebGLRenderer();
      testRenderer.setSize(287, 199);
      testRenderer.render(testScene.clone(), testCamera2.clone());
      const expected = testRenderer.domElement.toDataURL();
      assert.notEqual(expected, this.defaultImage, 'Two test cameras are not different.');
      vm.$nextTick(() => {
        vm.camera = 'cmr2';
        vm.$nextTick(() => {
          try {
            const actual = vm.$el.getElementsByTagName('canvas')[0].toDataURL();
            assert.strictEqual(actual, expected, 'Rendering results are different.');
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when scene is changed after initialization', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" :scene="scene" style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
        data: { scene: 'scn' },
      }).$mount(this.sandboxApp);
      const testRenderer = new THREE.WebGLRenderer();
      testRenderer.setSize(287, 199);
      testRenderer.render(testScene2.clone(), testCamera.clone());
      const expected = testRenderer.domElement.toDataURL();
      assert.notEqual(expected, this.defaultImage, 'Two test scenes are not different.');
      vm.$nextTick(() => {
        vm.scene = 'scn2';
        vm.$nextTick(() => {
          try {
            const actual = vm.$el.getElementsByTagName('canvas')[0].toDataURL();
            assert.strictEqual(actual, expected, 'Rendering results are different.');
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
  describe('Rendering function should be called appropriate times', function suite() {
    before(function hook(done) {
      const mocha = this;
      this.WebGLRenderer = THREE.WebGLRenderer;
      THREE.WebGLRenderer = class extends this.WebGLRenderer {
        constructor(...params) {
          super(...params);
          const { render } = this;
          this.render = function spyedRender(...args) {
            mocha.renderingTimes += 1;
            return render.call(this, ...args);
          };
        }
      };
      this.renderingTimes = 0;
      try {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(287, 199);
        renderer.render(testScene.clone(), testCamera.clone());
      } catch (e) {
        this.skip();
      }
      assert.strictEqual(this.renderingTimes, 1);
      done();
    });
    after(function hook(done) {
      THREE.WebGLRenderer = this.WebGLRenderer;
      done();
    });
    beforeEach(function hook(done) {
      this.renderingTimes = 0;
      done();
    });
    it('after initialization with camera and scene', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" scene="scn" style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        try {
          // should be called on watcher after mounted.
          assert.strictEqual(this.renderingTimes, 1);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after initialization without camera', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="scn" style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        try {
          // should not be called.
          assert.strictEqual(this.renderingTimes, 0);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after initialization without scene', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        try {
          // should not be called.
          assert.strictEqual(this.renderingTimes, 0);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('when an \'update\' event is dispatched from the scene', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" scene="scn" style="width: 287px; height: 199px;"><rsc-setter ref="rsc" /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        try {
          vm.$refs.rsc.scene.dispatchEvent({ type: 'update' });
          // should be called on watcher after mounted and when an event is dispatched.
          assert.strictEqual(this.renderingTimes, 2);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('when an \'update\' event is dispatched from the camera', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" scene="scn" style="width: 287px; height: 199px;"><rsc-setter ref="rsc" /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        try {
          vm.$refs.rsc.camera.dispatchEvent({ type: 'update' });
          // should be called on watcher after mounted and when an event is dispatched.
          assert.strictEqual(this.renderingTimes, 2);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('when the scene is set after initialization', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" :scene="scene" style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
        data: { scene: '' },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        vm.scene = 'scn';
        vm.$nextTick(() => {
          try {
            // should be called on watcher after the scene is set.
            assert.strictEqual(this.renderingTimes, 1);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when the camera is set after initialization', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer :camera="camera" scene="scn" style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
        data: { camera: '' },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        vm.camera = 'cmr';
        vm.$nextTick(() => {
          try {
            // should be called on watcher after the camera is set.
            assert.strictEqual(this.renderingTimes, 1);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when scene and camera are set at the same time after initialization', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer :camera="camera" :scene="scene" style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
        data: { camera: '', scene: '' },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        vm.camera = 'cmr';
        vm.scene = 'scn';
        vm.$nextTick(() => {
          try {
            // should be called on watcher in a lump.
            assert.strictEqual(this.renderingTimes, 1);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when an \'update\' event is dispatched from the scene which is set after initialization', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" :scene="scene" style="width: 287px; height: 199px;"><rsc-setter ref="rsc" /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
        data: { scene: '' },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        vm.scene = 'scn';
        vm.$nextTick(() => {
          try {
            vm.$refs.rsc.scene.dispatchEvent({ type: 'update' });
            // should be called on watcher after the scene is set and when an event is dispatched.
            assert.strictEqual(this.renderingTimes, 2);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when an \'update\' event is dispatched from the camera which is set after initialization', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer :camera="camera" scene="scn" style="width: 287px; height: 199px;"><rsc-setter ref="rsc" /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
        data: { camera: '' },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        vm.camera = 'cmr';
        vm.$nextTick(() => {
          try {
            vm.$refs.rsc.camera.dispatchEvent({ type: 'update' });
            // should be called on watcher after the camera is set and when an event is dispatched.
            assert.strictEqual(this.renderingTimes, 2);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when the scene is changed after initialization', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" :scene="scene" style="width: 287px; height: 199px;"><rsc-setter ref="rsc" /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
        data: { scene: 'scn' },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        vm.scene = 'scn2';
        vm.$nextTick(() => {
          try {
            // should be called on watcher after mounted,
            // when the scene is changed, and when an event is dispatched.
            assert.strictEqual(this.renderingTimes, 2);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when an \'update\' event is dispatched from the scene which is changed after initialization', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" :scene="scene" style="width: 287px; height: 199px;"><rsc-setter ref="rsc" /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
        data: { scene: 'scn' },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        vm.scene = 'scn2';
        vm.$nextTick(() => {
          try {
            vm.$refs.rsc.scene2.dispatchEvent({ type: 'update' });
            // should be called on watcher after mounted,
            // when the scene is changed, and when an event is dispatched.
            assert.strictEqual(this.renderingTimes, 3);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when an \'update\' event is dispatched from a replaced old scene', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" :scene="scene" style="width: 287px; height: 199px;"><rsc-setter ref="rsc" /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
        data: { scene: 'scn' },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        vm.scene = 'scn2';
        vm.$nextTick(() => {
          try {
            vm.$refs.rsc.scene.dispatchEvent({ type: 'update' });
            // should be called on watcher after mounted and when the scene is changed.
            // should not be called when an event is dispatched from an old scene.
            assert.strictEqual(this.renderingTimes, 2);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when the camera is changed after initialization', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer :camera="camera" scene="scn" style="width: 287px; height: 199px;"><rsc-setter ref="rsc" /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
        data: { camera: 'cmr' },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        vm.camera = 'cmr2';
        vm.$nextTick(() => {
          try {
            // should be called on watcher after mounted,
            // when the camera is changed, and when an event is dispatched.
            assert.strictEqual(this.renderingTimes, 2);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when an \'update\' event is dispatched from the camera which is changed after initialization', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer :camera="camera" scene="scn" style="width: 287px; height: 199px;"><rsc-setter ref="rsc" /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
        data: { camera: 'cmr' },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        vm.camera = 'cmr2';
        vm.$nextTick(() => {
          try {
            vm.$refs.rsc.camera2.dispatchEvent({ type: 'update' });
            // should be called on watcher after mounted,
            // when the camera is changed, and when an event is dispatched.
            assert.strictEqual(this.renderingTimes, 3);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when an \'update\' event is dispatched from a replaced old camera', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer :camera="camera" scene="scn" style="width: 287px; height: 199px;"><rsc-setter ref="rsc" /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
        data: { camera: 'cmr' },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        vm.camera = 'cmr2';
        vm.$nextTick(() => {
          try {
            vm.$refs.rsc.camera.dispatchEvent({ type: 'update' });
            // should be called on watcher after mounted and when the camera is changed.
            // should not be called when an event is dispatched from an old camera.
            assert.strictEqual(this.renderingTimes, 2);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when an \'update\' event is dispatched from the scene after destroyed', function test(done) {
      const vm = new Vue({
        template: '<div><vgl-renderer v-if="exist" camera="cmr" scene="scn" style="width: 287px; height: 199px;"><rsc-setter ref="rsc" /></vgl-renderer></div>',
        components: { VglRenderer, RscSetter },
        data: { exist: true },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        const { scene } = vm.$refs.rsc;
        vm.exist = false;
        vm.$nextTick(() => {
          try {
            scene.dispatchEvent({ type: 'update' });
            // should be called only after mounted.
            assert.strictEqual(this.renderingTimes, 1);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when an \'update\' event is dispatched from the camera after destroyed', function test(done) {
      const vm = new Vue({
        template: '<div><vgl-renderer v-if="exist" camera="cmr" scene="scn" style="width: 287px; height: 199px;"><rsc-setter ref="rsc" /></vgl-renderer></div>',
        components: { VglRenderer, RscSetter },
        data: { exist: true },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        const { camera } = vm.$refs.rsc;
        vm.exist = false;
        vm.$nextTick(() => {
          try {
            camera.dispatchEvent({ type: 'update' });
            // should be called only after mounted.
            assert.strictEqual(this.renderingTimes, 1);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
  describe('Scenes and cameras in the namespace should be accessible', function suite() {
    before(function hook(done) {
      // Skip if WebGLRenderer creation fails.
      const sandbox = document.createElement('div');
      document.body.appendChild(sandbox);
      try {
        const renderer = new THREE.WebGLRenderer();
        sandbox.appendChild(renderer.domElement);
        renderer.setSize(287, 199);
        renderer.render(testScene.clone(), testCamera.clone());
        this.defaultImage = renderer.domElement.toDataURL();
        assert.match(this.defaultImage, /^data:image\/png[,;]/);
      } catch (e) {
        document.body.removeChild(sandbox);
        this.skip();
      }
      document.body.removeChild(sandbox);
      done();
    });
    it('when they are children of the renderer', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" scene="scn" style="width: 287px; height: 199px;"><rsc-setter /></vgl-renderer>',
        components: { VglRenderer, RscSetter },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        const actual = vm.$el.getElementsByTagName('canvas')[0].toDataURL();
        try {
          assert.strictEqual(actual, this.defaultImage);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('when they are in a child namespace', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="cmr" scene="scn" style="width: 287px; height: 199px;"><vgl-namespace><rsc-setter /></vgl-namespace></vgl-renderer>',
        components: { VglRenderer, RscSetter, VglNamespace },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        const actual = vm.$el.getElementsByTagName('canvas')[0].toDataURL();
        try {
          assert.strictEqual(actual, this.defaultImage);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('when they are siblings of the renderer', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-renderer camera="cmr" scene="scn" style="width: 287px; height: 199px;" /><rsc-setter /></vgl-namespace>',
        components: { VglRenderer, RscSetter, VglNamespace },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        vm.$nextTick(() => {
          const actual = vm.$el.getElementsByTagName('canvas')[0].toDataURL();
          try {
            assert.strictEqual(actual, this.defaultImage);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when they are in the parent namespace', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-namespace><vgl-renderer camera="cmr" scene="scn" style="width: 287px; height: 199px;" /></vgl-namespace><rsc-setter /></vgl-namespace>',
        components: { VglRenderer, RscSetter, VglNamespace },
      }).$mount(this.sandboxApp);
      vm.$nextTick(() => {
        const actual = vm.$el.getElementsByTagName('canvas')[0].toDataURL();
        try {
          assert.strictEqual(actual, this.defaultImage);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
