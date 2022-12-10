import {isEmpty} from "lodash";
import * as Http from "http";
import {
    ConfigServerSocketIOOptionsSecurityAuthorizationBasic,
    ConfigSocketIO
} from "../../../../../Interfaces/Config/SocketIO/Server";

function checkHeaders(headers : any, key : string) {
    return undefined === headers[key] && isEmpty(headers[key]);
}

export const Oauth2 = async (config : ConfigSocketIO, headers : Http.IncomingHttpHeaders, mAuth : ConfigServerSocketIOOptionsSecurityAuthorizationBasic, next : any) => {
    if (checkHeaders(headers, "authorization")){
        await next(new Error("Field Header `authorization` not exist"));
    }else{
        if(headers?.["authorization"]?.toString().includes("Basic")){
            let mAuthorizationField = headers?.["authorization"]?.toString();
            let arrayData = mAuthorizationField.split(" ");
            if (arrayData.length > 1 && arrayData.length < 3){
                await mAuth.callback({
                    token : arrayData?.[1].toString()
                }, next);
            }else{
                await next(new Error("Field Header 'authorization' illegal format"));
            }

        }else{
            await next(new Error("Field Header `authorization` enough 'Basic' "));
        }

    }



};

export default Oauth2;