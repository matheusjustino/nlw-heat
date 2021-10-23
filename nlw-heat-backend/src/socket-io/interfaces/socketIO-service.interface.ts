import { Server, Socket } from 'socket.io';

export const SOCKET_IO_SERVICE = 'SOCKET IO SERVICE';
export interface ISocketIOService {
	server: Server;
	afterInit(server: Server): void;
	handleDisconnect(client: Socket): void;
	handleConnection(client: Socket, ...args: any[]): void;
}
