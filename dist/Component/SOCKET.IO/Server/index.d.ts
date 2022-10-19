import { ConfigSocketIO } from "../../../Interfaces/Config/SocketIO/Server";
import { Server as mServerHTTP } from "http";
import { Server as mServerHTTPS } from "https";
declare const SOCKET_IO: (config: ConfigSocketIO) => Promise<mServerHTTP | mServerHTTPS>;
export default SOCKET_IO;
//# sourceMappingURL=index.d.ts.map