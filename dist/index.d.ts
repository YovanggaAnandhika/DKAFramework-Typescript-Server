import * as DKATypes from "./Type/types";
import { DKAServerCallback } from "./Interfaces/Callback";
import Options from "./Const";
import { ConfigFastify } from "./Interfaces/Config/Fastify";
import { ConfigSocketIO } from "./Interfaces/Config/SocketIO/Server";
import { ConfigSocketIOClient } from "./Interfaces/Config/SocketIO/Client";
import { ConfigReactJS } from "./Interfaces/Config/ReactJS";
import { ConfigExpressJS } from "./Interfaces/Config/Express";
export declare function Server(config?: ConfigFastify | ConfigSocketIO | ConfigReactJS | ConfigExpressJS): Promise<DKAServerCallback>;
export declare function Client(config?: ConfigSocketIOClient): Promise<DKAServerCallback>;
export { Options, DKATypes as Types };
export default Server;
//# sourceMappingURL=index.d.ts.map