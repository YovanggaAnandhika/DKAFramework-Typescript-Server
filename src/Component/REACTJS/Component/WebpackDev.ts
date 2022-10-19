import webpackDev, {Configuration as WebpackDevConfig} from "webpack-dev-server";
import {Compiler as WebpackCompiler} from "webpack";
import {merge} from "lodash";
import {ConfigReactJS} from "../../../Interfaces/Config/ReactJS";

export async function WebpackDev(config : ConfigReactJS, WebpackCompiler : WebpackCompiler) : Promise<webpackDev>{
    return new Promise(async (resolve, rejected) => {
        let mWebpackCompilerOptions : WebpackDevConfig= {
            host : config.host,
            port : config.port,
            historyApiFallback : config.options?.WebpackDev?.historyApiFallback
        }
        /*** Mergering Options Compiler Options WebPack Dev Server */
        let mWebpackDevDefaultCompilerOptions : WebpackDevConfig = merge(mWebpackCompilerOptions, config.options?.WebpackDev)
        let mWebpackDev = new webpackDev(mWebpackDevDefaultCompilerOptions, WebpackCompiler);
        /** Return Variable Data Webpack Development **/
        await resolve(mWebpackDev);
    })
}