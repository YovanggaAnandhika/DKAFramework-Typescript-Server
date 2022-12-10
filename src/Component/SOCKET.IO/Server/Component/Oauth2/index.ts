import {isEmpty} from "lodash";
import * as Http from "http";
import {
    ConfigServerSocketIOOptionsSecurityAuthorizationOauth,
    ConfigSocketIO
} from "../../../../../Interfaces/Config/SocketIO/Server";

function checkHeaders(headers : any, key : string) {
    return undefined === headers[key] && isEmpty(headers[key]);
}

export const Oauth2 = async (config: ConfigSocketIO, headers: Http.IncomingHttpHeaders, mAuth: ConfigServerSocketIOOptionsSecurityAuthorizationOauth, next: any) => {
    if (checkHeaders(headers, "secret_id")){
        await next(new Error("Field Header `secret_id` not exist"));
    }else{
    }
    if (checkHeaders(headers, "secret_key")){
        await next(new Error("Field Header `secret_key` not exist"));
    }else{
    }

    if (checkHeaders(headers, "redirect_uri")){
        await next(new Error("Field Header `redirect_uri` not exist"));
    }else{

    }
    await mAuth.callback({
        secret_id : headers?.["secret_id"]?.toString(),
        secret_key : headers?.["secret_key"]?.toString(),
        redirect_uri : headers?.["redirect_uri"]?.toString()
    }, next);
};

export default Oauth2;