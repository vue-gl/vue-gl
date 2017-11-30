import {assetFactory} from "./mixins.js";
import {FontLoader} from "./three.js";
import {validatePropString} from "./utils.js";

let eventTargetAccessible;
(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "data:,a", true);
    xhr.addEventListener("load", (event) => {
        eventTargetAccessible = event.target.response === "a";
    }, false);
    xhr.send();
})();

function loadFont(vm, src) {
    new FontLoader().load(src, (font) => {
        vm.inst = font;
    });
}

export default {
    mixins: [assetFactory(null, "vglFonts")],
    props: {
        src: validatePropString
    },
    data() {
        return {inst: null};
    },
    watch: {
        src: {
            handler(src) {
                if (eventTargetAccessible) {
                    loadFont(this, src);
                } else {
                    // GET src data manually and pass as a data URI.
                    const xhr = new XMLHttpRequest();
                    xhr.open("GET", src, true);
                    xhr.addEventListener("load", () => {
                        loadFont(this, `data:,${encodeURIComponent(xhr.responseText)}`);
                    }, false);
                    xhr.send();
                }
            },
            immediate: true
        }
    }
};
