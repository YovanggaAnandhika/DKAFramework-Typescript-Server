import Webpack, {Compiler as WebpackCompiler} from "webpack";
import {merge} from "lodash";
import {ConfigReactJS} from "../../../Interfaces/Config";
import HtmlWebpackPlugin, {Options} from "html-webpack-plugin";
import path from "path";


type PluginsWebpackTypes = (
    | ((this: WebpackCompiler, compiler: WebpackCompiler) => void)
    | Webpack.WebpackPluginInstance
    )[];

export async function Plugins(config : ConfigReactJS) : Promise<PluginsWebpackTypes> {
    return new Promise(async (resolve, rejected) => {
        let pluginsModules : PluginsWebpackTypes = [];

        if (config.plugins?.HtmlWebpackPlugin.enabled){
            let defaultOptionsHTMLWebpackPlugin : Options = {
                template : path.join(__dirname,"./../Template/index.html"),

            }
            let mergeConfigOptionsHTMLWebpackPlugin : Options = merge(defaultOptionsHTMLWebpackPlugin, config.plugins.HtmlWebpackPlugin.options)
            pluginsModules.push(new HtmlWebpackPlugin(mergeConfigOptionsHTMLWebpackPlugin))
        }

        await config.plugins?.costumPlugins?.forEach(function (value) {
            pluginsModules.push(value);
        });

        let defaultPluginsWebpack : PluginsWebpackTypes = merge(pluginsModules, config.plugins);

        resolve(defaultPluginsWebpack)
    })
}