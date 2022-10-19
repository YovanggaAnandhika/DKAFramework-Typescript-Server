import {Client, Options} from "./../../src";

(async () => {
    await Client({
        state : Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine : Options.Server.Engine.SOCKETIO.Client,
        host : "127.0.0.1",
        port : 213,
        io : async (io) => {
            io.on("test", async (data) => {
                console.log(data)
            })
        },
        onConnect : async (io) => {
            console.log(io.id)
        },
        onDisconnect : async (id) => {
            console.log(`user disconnect`, JSON.stringify(id))
        }
    }).then(async (result) => {
        console.log(result)
    }).catch(async (e) => {
        console.error(e);
    })
})();