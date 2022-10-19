import { ConfigSocketIOClient } from "../../../Interfaces/Config/SocketIO/Client";
import * as Sock from "socket.io-client";
declare const SOCKET_IO_CLIENT: (config: ConfigSocketIOClient) => Promise<Sock.Socket>;
export default SOCKET_IO_CLIENT;
//# sourceMappingURL=index.d.ts.map