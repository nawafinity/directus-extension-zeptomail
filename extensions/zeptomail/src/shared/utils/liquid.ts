import {Liquid} from "liquidjs";

export function getEngine(dir: string[]) {
    return new Liquid({
        root: dir,
        extname: '.liquid',
    });
}