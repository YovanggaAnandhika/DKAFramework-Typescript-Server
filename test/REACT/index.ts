import {Options, Server} from "../..";
import path from "path";

(async () => {

    await Server({
        state : Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine : Options.Server.Engine.REACTJS,
        entry : path.join(__dirname, "./app.tsx"),
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