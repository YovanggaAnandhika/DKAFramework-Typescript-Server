import {RuleSetRule} from "webpack";
import {ConfigReactJS} from "../../../Interfaces/Config/ReactJS";


export async function Rules(config : ConfigReactJS) : Promise<(RuleSetRule | "...")[]> {
    return new Promise(async (resolve, rejected) => {
        let WebpackRules : (RuleSetRule | "...")[] = [];

        WebpackRules.push({
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
        });
        await resolve(WebpackRules);
    })
}