import * as DKATypes from "./Type/types";
import { DKAServerCallback } from "./Interfaces/Callback";
import Options from "./Const";
import { ConfigFastify } from "./Interfaces/Config/Fastify";
import { ConfigSocketIO } from "./Interfaces/Config/SocketIO/Server";
import { ConfigSocketIOClient } from "./Interfaces/Config/SocketIO/Client";
import { ConfigReactJS } from "./Interfaces/Config/ReactJS";
export declare function Server(config?: ConfigFastify | ConfigSocketIO | ConfigReactJS): Promise<DKAServerCallback>;
export declare function Client(config?: ConfigSocketIOClient): Promise<DKAServerCallback>;
export { Options, DKATypes as Types };
export default Server;
//# sourceMappingURL=index.d.ts.map