import {Options, Server} from "../../src";

(async () => {

    let io = await Server({
        state : Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine : Options.Server.Engine.REACTJS,
        mode : "server",
        port : 213,
        plugins : {
          HtmlWebpackPlugin : {
              options : {

              }
          }
        },
        options : {
            WebpackDev : {
                open : true,
                hot : true,
                historyApiFallback: true,
                liveReload : true,
            }
        }
    });



})();