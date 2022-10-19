import {EntryObject as WebpackEntryObject} from "webpack";
import * as fs from "fs";
import {ConfigReactJS} from "../../../Interfaces/Config/ReactJS";

type entry = undefined | string | (() => string | WebpackEntryObject | string[] | Promise<string | WebpackEntryObject | string[]>) | WebpackEntryObject | string[];

export async function Entry(config : ConfigReactJS) : Promise<entry> {
    return new Promise(async (resolve, rejected) => {
        if (fs.existsSync(`${config.entry}`)){
            resolve(config.entry)
        }else{
            rejected({ status : false, code : 500, msg : `entry not found. please located the files`})
        }
    })
}