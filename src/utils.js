import {Vector3, Euler, Spherical} from "./three.js";

export function parseVector3(prop) {
    const vector3 = new Vector3();
    switch (typeof prop) {
        case "number":
            vector3.setScalar(prop);
            break;
        case "object":
            if (Array.isArray(prop)) {
                if (prop.length === 1) {
                    vector3.setScalar(parseFloat(prop[0]));
                } else {
                    vector3.fromArray(prop.map((p) => parseFloat(p)));
                }
            } else {
                vector3
                    .setX(parseFloat(prop.x || 0))
                    .setY(parseFloat(prop.y || 0))
                    .setZ(parseFloat(prop.z || 0));
            }
            break;
        case "string":
            if (prop.includes(";")) {
                const coos = prop.split(";").map((p) => p.split(":"));
                const v = coos.reduce((obj, sec) => {
                    obj[sec[0].trim()] = sec[1];
                    return obj;
                }, {});
                vector3
                    .setX(parseFloat(v.x))
                    .setY(parseFloat(v.y))
                    .setZ(parseFloat(v.z));
            } else {
                const array = prop.trim().split(/\s+/);
                if (array.length === 1) {
                    vector3.setScalar(parseFloat(array[0]));
                } else {
                    vector3.fromArray(array.map((p) => parseFloat(p)));
                }
            }
            break;
    }
    return vector3;
}

export function parseEuler(prop) {
    const euler = new Euler();
    switch (typeof prop) {
        case "object":
            if (Array.isArray(prop)) {
                euler.fromArray(prop.map((p, i) => i < 3 ? parseFloat(p): p.trim()));
            } else {
                const x = parseFloat(prop.x || 0);
                const y = parseFloat(prop.y || 0);
                const z = parseFloat(prop.z || 0);
                euler.set(x, y, z, prop.order && prop.order.trim());
            }
            break;
        case "string":
            if (prop.includes(";")) {
                const coos = prop.split(";").map((p) => p.split(":"));
                const e = coos.reduce((obj, sec) => {
                    obj[sec[0].trim()] = sec[1];
                    return obj;
                }, {});
                const x = parseFloat(e.x);
                const y = parseFloat(e.y);
                const z = parseFloat(e.z);
                euler.set(x, y, z, e.order && e.order.trim());
            } else {
                const array = prop.trim().split(/\s+/);
                euler.fromArray(array.map((p, i) => i < 3 ? parseFloat(p): p.trim()));
            }
            break;
    }
    return euler;
}

export function parseSpherical(prop) {
    const spherical = new Spherical();
    switch (typeof prop) {
        case "number":
            spherical.radius = prop;
            break;
        case "object":
            if (Array.isArray(prop)) {
                spherical.set(...prop.map((p) => parseFloat(p)));
            } else {
                const radius = parseFloat(prop.radius || 1);
                const phi = parseFloat(prop.phi || 0);
                const theta = parseFloat(prop.theta || 0);
                spherical.set(radius, phi, theta);
            }
            break;
        case "string":
            if (prop.includes(";")) {
                const coos = prop.split(";").map((p) => p.split(":"));
                const s = coos.reduce((obj, sec) => {
                    obj[sec[0].trim()] = sec[1];
                    return obj;
                }, {});
                const radius = parseFloat(s.radius);
                const phi = parseFloat(s.phi);
                const theta = parseFloat(s.theta);
                spherical.set(radius, phi, theta);
            } else {
                const array = prop.trim().split(/\s+/);
                spherical.set(...array.map((p) => parseFloat(p)));
            }
            break;
    }
    return spherical.makeSafe();
}

export function parseNumber(str) {
    return typeof str === "string" ? parseFloat(str): str;
}
