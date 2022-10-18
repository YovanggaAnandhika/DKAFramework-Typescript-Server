import webpackDev from "webpack-dev-server";
import {
    Compiler as WebpackCompiler,
    Configuration as WebpackConfiguration,
    MultiCompiler as WebpackMultiCompiler
} from "webpack";
import {
    ConfigReactJS,
    ConfigReactJSOptionsWebpackConfiguration,
    ConfigReactJSOptionsWebpackConfigurationArray,
} from "../../Interfaces/Config";
import {merge} from "lodash";
import {Plugins} from "./Middleware/Plugins";
import {Rules} from "./Middleware/Rules";
import {Entry} from "./Middleware/Entry";
import {Webpack} from "./Component/Webpack";
import {WebpackDev} from "./Component/WebpackDev";

export const REACTJS = async (config : ConfigReactJS) : Promise<webpackDev>=> {

    function checkModuleExist(name : string){
        try {
            require.resolve(name);
            return true;
        }catch (e) {
            return false;
        }
    }



    let reactProcessing : Promise<webpackDev> = new Promise(async (resolve, rejected) => {

        let WebpackCompiler : WebpackCompiler | WebpackMultiCompiler | WebpackConfiguration;

        /*let entryRefactor : string = ``;
        if (config.entry !== undefined && fs.existsSync(`${config.entry}`)){
            entryRefactor = `${config.entry}`
        }else{
            if (fs.existsSync(path.join(__dirname, "app.tsx"))){
                entryRefactor = path.join(__dirname, "app.tsx");
            }else{
                if (fs.existsSync(path.join(__dirname, "app.jsx"))){
                    entryRefactor = path.join(__dirname, "app.jsx");
                }else{

                    if (fs.existsSync(path.join(__dirname, "app.js"))){
                        entryRefactor = path.join(__dirname, "app.js");
                    }else{
                        entryRefactor = ``;
                    }
                }
            }
        }*/

        await Entry(config)
            .then(async (entry) => {
                await Plugins(config)
                    .then(async (plugins) => {
                        await Rules(config)
                            .then(async (rules) => {
                                let defaultConfigurationWebpack : ConfigReactJSOptionsWebpackConfiguration | ConfigReactJSOptionsWebpackConfigurationArray = {
                                    mode : config.state,
                                    entry : entry,
                                    plugins : plugins,
                                    output: {
                                        publicPath : "/",
                                        filename: 'DKAFramework.js'
                                    },
                                    module : {
                                        rules : rules
                                    },
                                    resolve : {
                                        extensions: [ '.tsx', '.ts', '.js','.jsx' ],
                                    }
                                }

                                if (config.settings?.buildOutputFile?.enabled === true){
                                    defaultConfigurationWebpack.output.path = config.settings.buildOutputFile.path
                                }
                                let configurationWebpackMergered : ConfigReactJSOptionsWebpackConfiguration = merge(defaultConfigurationWebpack, config?.options?.Webpack?.configuration);

                                Webpack(configurationWebpackMergered)
                                    .then(async (compiler) => {
                                        await WebpackDev(config, compiler)
                                            .then(async (server) => {
                                               await resolve(server);
                                            })
                                            .catch(async (error) => {
                                                rejected(error)
                                            });
                                    })
                                    .catch(async (error) => {
                                        rejected(error)
                                    })
                            })
                            .catch(async (error) => {
                                rejected(error)
                            })
                    })
                    .catch(async (error) => {
                        rejected(error)
                    })
            })
            .catch(async (error) => {
                rejected(error)
            })




    });
    /**
     * @return Promise<webpackDev>
     */
    return reactProcessing;
}

export default REACTJS;