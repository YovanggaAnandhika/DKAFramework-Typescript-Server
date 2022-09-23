import {Options, Server} from "./../src";

(async () => {
    await Server({
        state : Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine : Options.Server.Engine.SOCKETIOCLIENT,
        host : "127.0.0.1",
        port : 213,
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