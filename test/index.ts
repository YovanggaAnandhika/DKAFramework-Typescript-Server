import { Server, Options } from "./../src";

(async () => {
    await Server({
        state : Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine : Options.Server.Engine.FASTIFY
    }).then(async (res) => {
        console.log(JSON.stringify(res));
    }).catch(async (error) => {
        console.error(error)
    });
})();