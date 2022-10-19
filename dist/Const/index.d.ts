import * as Server from "./Server";
export interface PackageJson {
    author: string | undefined;
    version: string | undefined;
}
export declare const Options: {
    Server: typeof Server;
    Information: PackageJson;
    DELAY_DEFAULT: number;
    READY_STATE: string;
    LOADING_STATE: string;
    LOADED_STATE: string;
    COMPLETE_STATE: string;
    START_STATE: string;
    STOP_STATE: string;
    ERROR_STATE: string;
    WARNING_STATE: string;
};
export { Server };
export default Options;
//# sourceMappingURL=index.d.ts.map