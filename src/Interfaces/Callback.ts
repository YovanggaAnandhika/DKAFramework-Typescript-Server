
export interface DKACallback {
    status : true,
    code : 200 | 202
    msg : string
}

export interface DKAServerCallbackMetadata {
    author : string | undefined,
    version : string | undefined
}
export interface DKAServerCallback extends DKACallback {
    status : true,
    code : 200 | 202
    msg : string,
    metadata : DKAServerCallbackMetadata
}

export interface CallbackError {
    status : false,
    code : 404 | 500 | 502 | 503
    msg : string,
    error : object
}