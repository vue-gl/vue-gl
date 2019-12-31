---
parent: Guide
nav_order: 3
---

# Namespaces
{: .no_toc}

## Table of contents
{: .no_toc .text-delta}

* toc
{:toc}

---

## How namespaces work
VueGL provides namespaces to specify named objects for used in another component.
For example, [`VglMesh`](/components/objects/vgl-mesh) component accepts a name
string as `geometry` prop. The `VglMesh` component will specify a geometry object
in `geometries` namespace by given name string, and use the found geometry as its
geometry.

[`VglNamespace`](/components/core/vgl-namespace) component provides namespaces such
as `geometries`. Some of components like [`VglGeometry`](/components/core/vgl-geometry)
and extended ones automatically register their created objects to the corresponding
namespace when components are instantiated.

`VglMesh` component below uses `VglGeometry` and `VglMaterial` specified by given
names.

```html
<vgl-namespace>
  <!-- This will be registered to the geometries namespace. -->
  <vgl-geometry name="ex-1"></vgl-geometry>
  <!-- This will be registered to the materials namespace. -->
  <vgl-material name="ex-2"></vgl-material>
  <!-- This mesh will use the geometry and material defined above. -->
  <vgl-mesh geometry="ex-1" material="ex-2"></vgl-mesh>
</vgl-namespace>
```

Actually [`VglRenderer`](/components/renderers/vgl-renderer) component extends [`VglNamespace`](/components/core/vgl-namespace)
component, so that `VglRenderer` also provides namespaces.

```html
<vgl-renderer>
  <!-- Namespaces are also provided under the VglRenderer component. -->
  <vgl-geometry name="ex-1"></vgl-geometry>
  <vgl-material name="ex-2"></vgl-material>
  <vgl-mesh geometry="ex-1" material="ex-2"></vgl-mesh>
</vgl-renderer>
```

## Nested namespaces
Names of registered components should be unique. But if you use a [`VglNamespace`](/components/core/vgl-namespace)
component in another one, the object identified by name can be overwritten only
in child namespaces. It might be helpful when building large applications.

Note that `cameras` and `scenes` namespaces do NOT create child namespaces.

```html
<vgl-namespace>
  <vgl-geometry name="ex-1"></vgl-geometry><!-- A -->
  <vgl-geometry name="ex-2"></vgl-geometry><!-- B -->
  <!-- This uses A. -->
  <vgl-mesh geometry="ex-1"></vgl-mesh>
  <vgl-namespace>
    <vgl-geometry name="ex-1"></vgl-geometry><!-- C -->
    <!-- This uses C because the geometry named 'ex-1' is overwritten. -->
    <vgl-mesh geometry="ex-1"></vgl-mesh>
    <!-- This uses B because the geometry named 'ex-2' is not overwritten. -->
    <vgl-mesh geometry="ex-2"></vgl-mesh>
  </vgl-namespace>
</vgl-namespace>
```

## Sharing namespaces with multiple renderers
[`VglRenderer`](/components/renderers/vgl-renderer) also can be a child of another
[`VglNamespace`](/components/core/vgl-namespace). In this case, objects to be rendered
can be defined outside `VglRenderer` and the renderer can share the objects with
other renderers. It is useful when multiple canvases project same objects from different
angles.

Note that canvases should be same size if the renderers share a camera because
the projection matrix of the camera is set from the canvas size.

<div class="code-example">
  <div class="max-width-1-2">
    <div class="aspect-1618-1000">
      <vgl-namespace id="multiple-renderer" class="d-flex">
        <vgl-box-geometry name="ex-geometry"></vgl-box-geometry>
        <vgl-mesh-standard-material name="ex-material"></vgl-mesh-standard-material>
        <vgl-scene name="ex-scene">
          <vgl-mesh geometry="ex-geometry" material="ex-material"></vgl-mesh>
          <vgl-directional-light position="1 2 3"></vgl-directional-light>
        </vgl-scene>
        <vgl-renderer scene="ex-scene" camera="ex-camera-1" class="flex-1 mr-1">
          <vgl-perspective-camera name="ex-camera-1" orbit-position="3 1 0.5"></vgl-perspective-camera>
        </vgl-renderer>
        <vgl-renderer scene="ex-scene" camera="ex-camera-2" class="flex-1">
          <vgl-perspective-camera name="ex-camera-2" orbit-position="4 1 1"></vgl-perspective-camera>
        </vgl-renderer>
      </vgl-namespace>
    </div>
  </div>
</div>
```html
<vgl-namespace>
  <vgl-box-geometry name="ex-geometry"></vgl-box-geometry>
  <vgl-mesh-standard-material name="ex-material"></vgl-mesh-standard-material>
  <!-- This scene is shared with 2 renderers. -->
  <vgl-scene name="ex-scene">
    <vgl-mesh geometry="ex-geometry" material="ex-material"></vgl-mesh>
    <vgl-directional-light position="1 2 3"></vgl-directional-light>
  </vgl-scene>
  <!-- This creates left canvas and use the scene defined above. -->
  <vgl-renderer scene="ex-scene" camera="ex-camera-1">
    <vgl-perspective-camera name="ex-camera-1" orbit-position="3 1 0.5"></vgl-perspective-camera>
  </vgl-renderer>
  <!-- This creates right canvas and use the same scene as left side canvas. -->
  <vgl-renderer scene="ex-scene" camera="ex-camera-2">
    <vgl-perspective-camera name="ex-camera-2" orbit-position="4 1 1"></vgl-perspective-camera>
  </vgl-renderer>
</vgl-namespace>
```

[Getting started](getting-started){: .btn .nav-prev}
[Interactive drawing](interactive-drawing){: .btn .nav-next}
{: .d-flex .mt-8 .justify-between}
