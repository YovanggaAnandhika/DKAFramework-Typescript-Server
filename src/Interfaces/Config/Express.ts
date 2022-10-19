import {EngineExpressJS, ExpressJSRoutesInstance, State} from "../../Type/types";
import {ConfigSystemMultiTypes} from "../Global";

export interface ConfigExpressJS {
    state? : State,
    engine ?: EngineExpressJS | undefined,
    host ?: string | undefined,
    port ? : number | undefined,
    routes ?: ExpressJSRoutesInstance,
    getConfig? : (config : ConfigExpressJS) => void | Promise<void>,
    Constanta ?: ConfigSystemMultiTypes | undefined
}