import Server,{ Options } from "./../src";

(async () => {
    await Server({
        state : Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine : "FASTIFY",
        host : Options.Server.Host.WILDCARD,
        port : 822,
        app : (app, opts, next) => {
            app.get("/", async (request, response) => {

            })
            next();
        },
        plugins : {

        },
        Constanta : {
            DEFAULT_DELAY_PROGRESS : 300
        }
    }).then(async (res) => {
        console.log(res);
    }).catch(async (error) => {
        console.error(error)
    })
})();