import light from "./light";
import {AmbientLight} from "three";

export default {
    mixins: [light],
    computed: {
        instance: () => new AmbientLight()
    }
};
