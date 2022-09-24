import {Options, Server} from "../src";

(async () => {

    await Server({
        state : Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine : Options.Server.Engine.SOCKETIO,
        port : 213,
        onConnection : async (io) => {
            io.broadcast.emit("test", { halo : 1});
        },
        onClient : async (io) => {
            console.log(io.TotalClientConnected)
        },
        plugins : {

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