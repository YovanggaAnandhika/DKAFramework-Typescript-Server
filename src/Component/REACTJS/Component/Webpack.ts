import webpack, {Compiler} from "webpack"
import {ConfigReactJSOptionsWebpackConfiguration} from "../../../Interfaces/Config";


export async function Webpack(config : ConfigReactJSOptionsWebpackConfiguration) : Promise<Compiler> {
    let mCompiler : Compiler;
    return new Promise(async (resolve, rejected) => {

        mCompiler = await webpack(config, async (error,stats) => {
            if (!error){
                resolve(mCompiler);
            }else{
                rejected({ status : false, code : 500, msg : `error processing stats Webpack compile`, error : error});
            }
        })
    })
}