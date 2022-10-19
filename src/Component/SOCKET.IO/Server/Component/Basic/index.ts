import Options from "../../../../../Const";
import mLogger from "../../../../../Function/Helper/logger";
import {isEmpty} from "lodash";
import * as Http from "http";
import {
    ConfigServerSocketIOOptionsSecurityAuthorizationBasic,
    ConfigSocketIO
} from "../../../../../Interfaces/Config/SocketIO/Server";

let logger = mLogger.logger;

function checkHeaders(headers : any, key : string) {
    return undefined === headers[key] && isEmpty(headers[key]);
}

export const Oauth2 = async (config : ConfigSocketIO, headers : Http.IncomingHttpHeaders, mAuth : ConfigServerSocketIOOptionsSecurityAuthorizationBasic, next : any) => {
    if (checkHeaders(headers, "authorization")){
        (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.error(`Field Header "authorization" not exist or Empty [DKA_AUTH_FIELD_AUTHORIZATION_REQUIRE_OR_EMPTY]`) : null;
        await next(new Error("Field Header `authorization` not exist"));
    }else{
        if(headers?.["authorization"]?.toString().includes("Basic")){
            let mAuthorizationField = headers?.["authorization"]?.toString();
            let arrayData = mAuthorizationField.split(" ");
            if (arrayData.length > 1 && arrayData.length < 3){
                (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    logger.info(`Field Header "authorization" PASS and NOT EMPTY [DKA_AUTH_FIELD_AUTORIZATION_PASS]`) : null;
                await mAuth.callback({
                    token : arrayData?.[1].toString()
                }, next);
            }else{
                (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    logger.error(`Field Header "authorization" illegal format [DKA_AUTH_FIELD_AUTORIZATION_ILLEGAL_FIELD]`) : null;
                await next(new Error("Field Header 'authorization' illegal format"));
            }

        }else{
            (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                logger.error(`Field Header "authorization" enough "Basic" or Empty [DKA_AUTH_FIELD_AUTHORIZATION_REQUIRE_OR_BASIC_VARIABLE]`) : null;
            await next(new Error("Field Header `authorization` enough 'Basic' "));
        }

    }



};

export default Oauth2;