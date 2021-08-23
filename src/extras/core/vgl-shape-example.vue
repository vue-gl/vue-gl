<template>
  <div>
    <vgl-renderer>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-shape-geometry>
                <template #shapes>
                  <vgl-shape
                    :d="outerD[outerPath]"
                    auto-close
                  >
                    <template #holes>
                      <vgl-path
                        v-for="{ key, path, offset: [x, y] } of innerPaths"
                        :key="key"
                        :d="'M' + x + ' ' + y + innerD[path]"
                        auto-close
                      />
                    </template>
                  </vgl-shape>
                </template>
              </vgl-shape-geometry>
            </template>
            <template #material>
              <vgl-mesh-basic-material />
            </template>
          </vgl-mesh>
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-orthographic-camera
          rotation="lookAt"
          :position-z="1"
          :top="11"
          :bottom="-11"
        />
      </template>
    </vgl-renderer>
    <aside>
      <label>
        Outer path:
        <select v-model="outerPath">
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
        </select>
      </label>
      <div>
        Inner paths:
        <div
          v-for="{ key, path, offset: [x, y] } of innerPaths"
          :key="key"
        >
          <label>
            Path {{ key }}:
            <select
              :selected="path"
              @change="setPath(key, $event)"
            >
              <option value="square">Square</option>
              <option value="triangle">Triangle</option>
            </select>
          </label>
          <label>
            Offset X:
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              :value="x"
              @change="setOffsetX(key, $event)"
            >
          </label>
          <label>
            Offset Y:
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              :value="y"
              @change="setOffsetY(key, $event)"
            >
          </label>
          <button @click="deletePath(key)">
            -
          </button>
        </div>
        <button @click="addPath">
          +
        </button>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    outerPath: 'square',
    innerPaths: [],
    outerD: {
      square: 'M -10, -10 h 20 v 20 h -20',
      triangle: 'M -12, -10 h 24 l -12, 20',
    },
    innerD: {
      square: 'm -2, -2 h 4 v 4 h -4',
      triangle: 'm -2.5, -2 h 5 l -2.5, 4',
    },
    maxKey: 1,
  }),
  methods: {
    deletePath(targetKey) {
      this.innerPaths.splice(this.innerPaths.findIndex(({ key }) => key === targetKey), 1);
    },
    addPath() {
      this.innerPaths.push({ key: this.maxKey, path: 'square', offset: [0, 0] });
      this.maxKey += 1;
    },
    setPath(targetKey, { target: { value } }) {
      const index = this.innerPaths.findIndex(({ key }) => key === targetKey);
      const obj = this.innerPaths[index];
      this.innerPaths.splice(index, 1, { ...obj, path: value });
    },
    setOffsetX(targetKey, { target: { value } }) {
      const index = this.innerPaths.findIndex(({ key }) => key === targetKey);
      const obj = this.innerPaths[index];
      this.innerPaths.splice(index, 1, { ...obj, offset: [value, obj.offset[1]] });
    },
    setOffsetY(targetKey, { target: { value } }) {
      const index = this.innerPaths.findIndex(({ key }) => key === targetKey);
      const obj = this.innerPaths[index];
      this.innerPaths.splice(index, 1, { ...obj, offset: [obj.offset[0], value] });
    },
  },
};
</script>
