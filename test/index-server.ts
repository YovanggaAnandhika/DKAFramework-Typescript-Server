import {Options, Server} from "../src";

(async () => {

    let io = await Server({
        state : Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine : Options.Server.Engine.SOCKETIO,
        port : 213,
        onConnection : async (io) => {

        },
        onClient : async (io) => {
            console.log(io.TotalClientConnected)
        },
        plugins : {

        },
        options : {
            socket : {
                pingInterval : 233
            }
        }
    });



})();