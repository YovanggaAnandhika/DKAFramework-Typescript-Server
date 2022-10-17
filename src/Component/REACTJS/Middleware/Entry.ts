import {ConfigReactJS} from "../../../Interfaces/Config";
import {EntryObject as WebpackEntryObject} from "webpack";

type entry = undefined | string | (() => string | WebpackEntryObject | string[] | Promise<string | WebpackEntryObject | string[]>) | WebpackEntryObject | string[];

export async function Entry(config : ConfigReactJS) : Promise<entry> {
    return new Promise(async (resolve, rejected) => {
        resolve(config.entry)
    })
}