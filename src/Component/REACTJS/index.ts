import webpack, { Configuration } from "webpack";
import webpackDev from "webpack-dev-server";
import { ConfigReactJS } from "../../Interfaces/Config";
import {reject} from "lodash";
import * as fs from "fs";
import path from "path";
import {existsSync} from "fs";


export const REACTJS = async (config : ConfigReactJS) : Promise<webpackDev>=> {

    return new Promise(async (resolve, rejected) => {

        let mCompile = webpack({
            mode : config.state,
            entry : config.entry,
            plugins : config.plugins,
            output: {
                path: path.resolve(require?.main?.filename!, './../Assets'),
                filename: 'DKAFramework.js',
            },
            module : {
                rules : [
                    {
                        test: /\.tsx?$/,
                        exclude: /node_modules/,
                        loader: 'ts-loader'
                    },
                    {
                        test: /\.(ts|js)x?$/,
                        exclude: /node_modules/,
                        use: {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    "@babel/preset-env",
                                    "@babel/preset-react",
                                    "@babel/preset-typescript",
                                ],
                            },
                        },
                    },
                ]
            },
            resolve : {
                    extensions: [ '.tsx', '.ts', '.js' ],
            }
        });
        let mWebpackDev = new webpackDev(config.serverConfig, mCompile);
        await resolve(mWebpackDev)
    });

}

export default REACTJS;