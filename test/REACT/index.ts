import {Options, Server} from "../../src";

(async () => {

    await Server({
        state : Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine : Options.Server.Engine.REACTJS,
        port : 213,
        options : {
            WebpackDev : {
                open : true
            }
        }
    })
        .catch(async (error) => {
            console.log(error)
        })



})();