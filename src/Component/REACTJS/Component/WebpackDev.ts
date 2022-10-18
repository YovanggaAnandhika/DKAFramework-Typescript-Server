import webpackDev, {Configuration as WebpackDevConfig} from "webpack-dev-server";
import {Compiler as WebpackCompiler} from "webpack";
import {ConfigReactJS} from "../../../Interfaces/Config";
import {merge} from "lodash";


export async function WebpackDev(config : ConfigReactJS, WebpackCompiler : WebpackCompiler) : Promise<webpackDev>{
    return new Promise(async (resolve, rejected) => {
        let mWebpackCompilerOptions : WebpackDevConfig= {
            host : config.host,
            port : config.port,
            historyApiFallback : config.options.WebpackDev.historyApiFallback
        }
        let mWebpackDevDefaultCompilerOptions : WebpackDevConfig = merge(mWebpackCompilerOptions, config.options?.WebpackDev)
        let mWebpackDev = new webpackDev(mWebpackDevDefaultCompilerOptions, WebpackCompiler);

        await resolve(mWebpackDev)
    })
}