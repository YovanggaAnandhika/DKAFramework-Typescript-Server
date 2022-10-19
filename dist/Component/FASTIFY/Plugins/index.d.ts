import { FastifyInstance } from "fastify";
import { ConfigFastify } from "../../../Interfaces/Config/Fastify";
export declare function ServerViewInstance(config: ConfigFastify, app: FastifyInstance): Promise<FastifyInstance>;
export declare function ServerStaticInstance(config: ConfigFastify, app: FastifyInstance): Promise<FastifyInstance>;
export declare function ServerNgrokTunnelingInstance(config: ConfigFastify, app: FastifyInstance): Promise<FastifyInstance>;
export declare function Plugins(config: ConfigFastify, app: FastifyInstance): Promise<FastifyInstance>;
//# sourceMappingURL=index.d.ts.map