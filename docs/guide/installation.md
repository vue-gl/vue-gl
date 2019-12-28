---
parent: Guide
nav_order: 1
---
# Installation
{: .no_toc}

## Table of contents
{: .no_toc .text-delta}

* toc
{:toc}

---

## Load with \<script\> tag
Download and include libraries with `<script>` elements. Note that you also need
to load Vue.js and three.js as dependencies.

<a href="/js/vue-gl.js" download class="btn btn-green">Download VueGL</a>

* [Download Vue.js](//vuejs.org/v2/guide/installation.html#Direct-lt-script-gt-Include)
* [Download three.js](//github.com/mrdoob/three.js/#usage)

Download and put them, then insert HTML codes like below.

```html
<script src="/path/to/vue.min.js"></script>
<script src="/path/to/three.min.js"></script>
<script src="/path/to/vue-gl.js"></script>
```

Executing VueGL script exposes `VueGL` object as a global variable. To register
VueGL components as [global components](//vuejs.org/v2/guide/components-registration.html#Global-Registration),
run following script after loading libraries.

```js
Object.keys(VueGL).forEach((name) => Vue.component(name, VueGL[name]));
```

### Load from CDN (Content delivery networks)
You also can load libraries from [CDN](//en.wikipedia.org/wiki/Content_delivery_network)s.
We recommend linking to specific versions for production.

#### [UNPKG](//unpkg.com)

```html
<!-- Loading latest versions from UNPKG -->
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/three"></script>
<script src="https://unpkg.com/vue-gl"></script>
```

#### [jsDeliver](//www.jsdelivr.com)

```html
<!-- Loading latest versions from jsDeliver -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://cdn.jsdelivr.net/npm/three"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-gl"></script>
```

## Using npm (Package manager for Node.js)
If you are using module bundlers such as [Webpack](//webpack.js.org) or [rollup.js](//rollupjs.org),
[npm](//www.npmjs.com) would be a better option to install libraries.

To install libraries, run following command in your project directory.

```sh
npm i vue three vue-gl
```

Then you can import VueGL components like below.

```js
const { VglRenderer, VglScene } = require('vue-gl');
```

[What is VueGL?](index){: .btn .nav-prev}
[Getting started](getting-started){: .btn .nav-next}
{: .d-flex .mt-8 .justify-between}
