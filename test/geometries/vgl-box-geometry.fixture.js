/* global fixture, test, THREE, Vue, VueGL */
import { Selector, ClientFunction } from 'testcafe';
import { join } from 'path';
import {
  screenshotPathFactory, clear, getElementScreenshotBuffer, createMountPoint,
} from '../utils';

fixture('VglBoxGeometry')
  .clientScripts(
    { module: 'vue/dist/vue' },
    { module: 'three/build/three' },
    `${process.cwd()}/dist/vue-gl.js`,
  )
  .before((ctx) => {
    ctx.screenshotPath = screenshotPathFactory(join('geometries', 'vgl-box-geometry'));
  });

test('default geometry', async (t) => {
  await ClientFunction(() => {
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhysicalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    const dLight = new THREE.DirectionalLight();
    dLight.position.x = 1;
    dLight.position.y = 3;
    const aLight = new THREE.AmbientLight();
    aLight.intensity = 0.5;
    scene.add(dLight);
    scene.add(aLight);
    const camera = new THREE.PerspectiveCamera();
    camera.aspect = 2;
    camera.position.x = 3 * Math.sin(1) * Math.sin(1);
    camera.position.z = 3 * Math.sin(1) * Math.cos(1);
    camera.position.y = 3 * Math.cos(1);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(300, 150);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);
  })();
  const expected = await getElementScreenshotBuffer(t, Selector('canvas'));
  await clear(t);
  await ClientFunction((el) => {
    // eslint-disable-next-line no-new
    new Vue({
      el: el(),
      components: VueGL,
      template: `
        <vgl-renderer
          camera="c"
          scene="s"
          style="width: 300px; height: 150px;"
        >
          <vgl-perspective-camera
            name="c"
            orbit-position="3 1 1"
          />
          <vgl-scene name="s">
            <vgl-box-geometry name="g" />
            <vgl-mesh-physical-material name="m" />
            <vgl-mesh
              geometry="g"
              material="m"
            />
            <vgl-directional-light position="1 3 0" />
            <vgl-ambient-light intensity="0.5" />
          </vgl-scene>
        </vgl-renderer>
      `,
    });
  })(await createMountPoint(t));
  const actual = await getElementScreenshotBuffer(t, Selector('canvas'));
  await t.expect(actual).eql(expected);
});

test('size specified geometry', async (t) => {
  await ClientFunction(() => {
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(1.32, 0.44, 2.101);
    const material = new THREE.MeshPhysicalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    const dLight = new THREE.DirectionalLight();
    dLight.position.x = 1;
    dLight.position.y = 3;
    const aLight = new THREE.AmbientLight();
    aLight.intensity = 0.5;
    scene.add(dLight);
    scene.add(aLight);
    const camera = new THREE.PerspectiveCamera();
    camera.aspect = 2;
    camera.position.x = 3 * Math.sin(1) * Math.sin(1);
    camera.position.z = 3 * Math.sin(1) * Math.cos(1);
    camera.position.y = 3 * Math.cos(1);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(300, 150);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);
  })();
  const expected = await getElementScreenshotBuffer(t, Selector('canvas'));
  await clear(t);
  await ClientFunction((el) => {
    // eslint-disable-next-line no-new
    new Vue({
      el: el(),
      components: VueGL,
      template: `
          <vgl-renderer
            camera="c"
            scene="s"
            style="width: 300px; height: 150px;"
          >
            <vgl-perspective-camera
              name="c"
              orbit-position="3 1 1"
            />
            <vgl-scene name="s">
              <vgl-box-geometry
                name="g"
                width="1.32"
                height="0.44"
                depth="2.101"
              />
              <vgl-mesh-physical-material name="m" />
              <vgl-mesh
                geometry="g"
                material="m"
              />
              <vgl-directional-light position="1 3 0" />
              <vgl-ambient-light intensity="0.5" />
            </vgl-scene>
          </vgl-renderer>
        `,
    });
  })(await createMountPoint(t));
  const actual = await getElementScreenshotBuffer(t, Selector('canvas'));
  await t.expect(actual).eql(expected);
});
