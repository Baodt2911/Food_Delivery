import { io } from "socket.io-client";
import { SOCKET_URL } from "@env";
const socket = io(SOCKET_URL);
export default socket;
