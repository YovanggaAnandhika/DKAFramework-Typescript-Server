import Webpack, {Compiler as WebpackCompiler} from "webpack";
import {merge} from "lodash";
import {ConfigReactJS} from "../../../Interfaces/Config";
import HtmlWebpackPlugin from "html-webpack-plugin";


type PluginsWebpackTypes = (
    | ((this: WebpackCompiler, compiler: WebpackCompiler) => void)
    | Webpack.WebpackPluginInstance
    )[];

export async function Plugins(config : ConfigReactJS) : Promise<PluginsWebpackTypes> {
    return new Promise(async (resolve, rejected) => {
        let pluginsModules : PluginsWebpackTypes = [];

        pluginsModules.push(new Webpack.HotModuleReplacementPlugin());

        if (config.plugins?.HtmlWebpackPlugin.enabled as boolean){
            pluginsModules.push(new HtmlWebpackPlugin(config.plugins.HtmlWebpackPlugin.options))
        }

        await config.plugins?.costumPlugins?.forEach(function (value) {
            pluginsModules.push(value);
        });

        let defaultPluginsWebpack : PluginsWebpackTypes = merge(pluginsModules, config.plugins);

        resolve(defaultPluginsWebpack)
    })
}