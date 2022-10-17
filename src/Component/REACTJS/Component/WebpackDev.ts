import webpackDev, {Compiler as WebpackDevCompiler, Configuration as WebpackDevConfig} from "webpack-dev-server";
import {Compiler as WebpackCompiler, MultiCompiler as WebpackMultiCompiler} from "webpack";
import path from "path";
import {ConfigReactJS} from "../../../Interfaces/Config";
import {merge} from "lodash";


export async function WebpackDev(config : ConfigReactJS, WebpackCompiler : WebpackCompiler) : Promise<webpackDev>{
    return new Promise(async (resolve, rejected) => {
        let mWebpackCompilerOptions : WebpackDevCompiler | WebpackDevConfig | WebpackMultiCompiler = {
            host : config.host,
            port : config.port,
            historyApiFallback : true,
            static : path.join(__dirname, "./../public")
        }
        let mWebpackDevDefaultCompilerOptions : WebpackDevCompiler | WebpackDevConfig | WebpackMultiCompiler = merge(mWebpackCompilerOptions, config.options?.WebpackDev)
        let mWebpackDev = new webpackDev(mWebpackDevDefaultCompilerOptions, WebpackCompiler);

        await resolve(mWebpackDev)
    })
}