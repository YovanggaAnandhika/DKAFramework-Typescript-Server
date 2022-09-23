import {Options, Server} from "../src";

(async () => {

    await Server({
        state : Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine : Options.Server.Engine.SOCKETIO,
        port : 213,
        getClientConnected : async (io) => {
            console.log(io.TotalClientConnected)
        },
        settings : {
            pingInterval : 1000
        }
    }).then(async (result) => {
        console.log(result)
    }).catch(async (e) => {
        console.error(e);
    })

})();