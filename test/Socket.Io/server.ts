import {Options, Server} from "./../../src";

(async () => {
    await Server({
        state: Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine: Options.Server.Engine.SOCKETIO.Server,
        port: 213,
        licence: {
            method: "LICENCE_KEY_OFFLINE",
            key: "./dka.env"
        },
        io: async (io) => {
            io.on("test", async (data) => {
                console.log(data)
            })
        },
        onDisconnect: async (id) => {
            console.log(`user disconnect`, JSON.stringify(id))
        }
    }).then(async (result) => {
        console.log(result);
        setInterval(function () {
            console.log(process.env.DATAM)
        }, 2000)
    }).catch(async (e) => {
        console.error(e);
    })
})();