import { EngineReactJS, State } from "../../Type/types";
import Webpack, { Compiler as WebpackCompiler, Configuration as WebpackConfiguration, EntryObject as WebpackEntryObject, MultiCompiler as WebpackMultiCompiler, MultiStats as WebpackMultiStats, Stats as WebpackStats } from "webpack";
import { ConfigSystemMultiTypes } from "../Global";
import { Configuration as WebpackDevConfig } from "webpack-dev-server";
import { Options as HTMLWebpackPluginOptions } from "html-webpack-plugin";
export interface ConfigReactJSConfig {
    compiler: WebpackConfiguration;
}
export declare type webpackDevTypes = WebpackCompiler | WebpackMultiCompiler | WebpackDevConfig;
interface CallbackWebpack<T> {
    (err?: Error, stats?: T): void;
}
export declare type ConfigReactJSOptionsWebpackConfiguration = WebpackConfiguration;
export declare type ConfigReactJSOptionsWebpackConfigurationArray = readonly ConfigReactJSOptionsWebpackConfiguration[] & MultiCompilerOptions;
export interface ConfigReactJSOptionsWebpackCompiler {
    configuration?: ConfigReactJSOptionsWebpackConfiguration | undefined;
    callback?: CallbackWebpack<WebpackStats>;
}
interface MultiCompilerOptions {
    /**
     * how many Compilers are allows to run at the same time in parallel
     */
    parallelism?: number;
}
export interface ConfigReactJSOptionsWebpackMultiCompiler {
    configuration?: readonly ConfigReactJSOptionsWebpackConfiguration[] & MultiCompilerOptions;
    callback?: CallbackWebpack<WebpackMultiStats> | undefined;
}
export interface ConfigReactJSOptions {
    Webpack?: ConfigReactJSOptionsWebpackCompiler | ConfigReactJSOptionsWebpackMultiCompiler;
    WebpackDev?: WebpackDevConfig;
}
export declare type ConfigReactJSPluginsDefault = (((this: WebpackCompiler, compiler: WebpackCompiler) => void) | Webpack.WebpackPluginInstance)[];
export interface ConfigReactJSPluginsModelHtmlWebpackPlugin {
    enabled?: boolean;
    options?: HTMLWebpackPluginOptions;
}
export interface ConfigReactJSPluginsModel {
    HtmlWebpackPlugin?: ConfigReactJSPluginsModelHtmlWebpackPlugin;
    costumPlugins?: ConfigReactJSPluginsDefault;
}
export interface ConfigReactJSSettingsBuildOutputFileSettings {
    path?: string;
}
export interface ConfigReactJSSettingsBuildOutputFile {
    enabled?: boolean;
    path?: string;
}
export interface ConfigReactJSSettings {
    buildOutputFile?: ConfigReactJSSettingsBuildOutputFile;
}
export interface ConfigReactJS {
    /**
     * The State Development or Production
     * **/
    state?: State;
    host?: string | undefined;
    port?: number | undefined;
    engine?: EngineReactJS | undefined;
    entry?: string | (() => string | WebpackEntryObject | string[] | Promise<string | WebpackEntryObject | string[]>) | WebpackEntryObject | string[];
    plugins?: ConfigReactJSPluginsModel;
    options?: ConfigReactJSOptions;
    settings?: ConfigReactJSSettings;
    getConfig?: (config: ConfigReactJS) => void | Promise<void>;
    Constanta?: ConfigSystemMultiTypes | undefined;
}
export {};
//# sourceMappingURL=ReactJS.d.ts.map