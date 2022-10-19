import Webpack, { Compiler as WebpackCompiler } from "webpack";
import { ConfigReactJS } from "../../../Interfaces/Config/ReactJS";
declare type PluginsWebpackTypes = (((this: WebpackCompiler, compiler: WebpackCompiler) => void) | Webpack.WebpackPluginInstance)[];
export declare function Plugins(config: ConfigReactJS): Promise<PluginsWebpackTypes>;
export {};
//# sourceMappingURL=Plugins.d.ts.map