import light from "./light";
import {DirectionalLight} from "three";

export default {
    mixins: [light],
    computed: {
        instance: () => new DirectionalLight()
    }
};
