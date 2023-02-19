import {Options, Server} from "../../dist";

(async () => {

    await Server({
        state: Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine: Options.Server.Engine.REACTJS,
        logger: {
            enabled: true
        },
        port: 213,
        licenceKey: "./dka.env",
        options: {
            WebpackDev: {
                open: true
            }
        },
        Constanta: {
            PUBLIC_URL: "http://localhost:213"
        }
    })
        .then(async () => {

        })
        .catch(async (error) => {
            console.log(error)
        })



})();