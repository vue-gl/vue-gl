import {play} from "vue-play";
import * as gettingStarted from "./getting-started";

play("Getting started")
    .add("Creating a scene", gettingStarted.creatingAScene)
    .add("Import via modules", {
        template: `<button @click="$log('123')">Hello</button>`
    });

import preview from "vue-play/preview";
preview();
