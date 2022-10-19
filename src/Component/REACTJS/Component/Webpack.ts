import webpack, {Compiler} from "webpack"
import {ConfigReactJSOptionsWebpackConfiguration} from "../../../Interfaces/Config/ReactJS";


export async function Webpack(config : ConfigReactJSOptionsWebpackConfiguration) : Promise<Compiler> {
    let mCompiler : Compiler;
    return new Promise(async (resolve, rejected) => {
        mCompiler = await webpack(config)
        resolve(mCompiler);
    })
}