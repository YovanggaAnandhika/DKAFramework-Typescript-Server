import Server,{ Options } from "./../src";

(async () => {
    await Server({
        engine : Options.Server.Engine.SOCKETIO,
        settings : {

        },
        Constanta : {

        }
    }).then(async (res) => {
        console.log(JSON.stringify(res));
    }).catch(async (error) => {
        console.error(error)
    });
})();