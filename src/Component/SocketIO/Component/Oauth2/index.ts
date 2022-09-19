import Options from "../../../../Const";
import {
    ConfigServerSocketIOSettingsSecurityAuthorizationOauth, ConfigSocketIO
} from "../../../../Interfaces/Config";
import mLogger from "../../../../Function/Helper/logger";
import {isEmpty, keys} from "lodash";
import * as Http from "http";
import {DKAConfig} from "../../../../Type/types";

let logger = mLogger.logger;

function checkHeaders(headers : any, key : string) {
    return undefined === headers[key] && isEmpty(headers[key]);
}

export const Oauth2 = async (config: ConfigSocketIO, headers: Http.IncomingHttpHeaders, mAuth: ConfigServerSocketIOSettingsSecurityAuthorizationOauth, next: any) => {
    if (checkHeaders(headers, "secret_id")){
        (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.error(`Field Header "secret_id" not exist or Empty [DKA_AUTH_FIELD_SECRET_KEY_REQUIRE_OR_EMPTY]`) : null;
        await next(new Error("Field Header `secret_id` not exist"));
    }else{
        (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.info(`Field Header "secret_id" PASS and NOT EMPTY [DKA_AUTH_FIELD_SECRET_ID_PASS]`) : null;
    }
    if (checkHeaders(headers, "secret_key")){
        (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.error(`Field Header "secret_key" not exist or Empty [DKA_AUTH_FIELD_SECRET_KEY_REQUIRE_OR_EMPTY]`) : null;
        await next(new Error("Field Header `secret_key` not exist"));
    }else{
        (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.info(`Field Header "secret_key" PASS and NOT EMPTY [DKA_AUTH_FIELD_SECRET_KEY_PASS]`) : null;
    }

    if (checkHeaders(headers, "redirect_uri")){
        (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.error(`Field Header "redirect_uri" not exist or Empty [DKA_AUTH_FIELD_REDIRECT_URI_REQUIRE_OR_EMPTY]`) : null;
        await next(new Error("Field Header `redirect_uri` not exist"));
    }else{
        (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.info(`Field Header "redirect_uri" PASS and NOT EMPTY [DKA_AUTH_FIELD_REDIRECT_URI_PASS]`) : null;
    }
    await mAuth.callback({
        secret_id : headers?.["secret_id"]?.toString(),
        secret_key : headers?.["secret_key"]?.toString(),
        redirect_uri : headers?.["redirect_uri"]?.toString()
    }, next);
};

export default Oauth2;