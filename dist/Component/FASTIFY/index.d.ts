import { FastifyInstance } from "fastify";
import { ConfigFastify } from "../../Interfaces/Config/Fastify";
/**
 *
 * @param { ConfigFastify } config
 * @param { FastifyInstances } config.app
 * @constructor
 * @return Promise<FastifyInstance>
 */
declare const FASTIFY: (config: ConfigFastify) => Promise<FastifyInstance>;
export default FASTIFY;
//# sourceMappingURL=index.d.ts.map