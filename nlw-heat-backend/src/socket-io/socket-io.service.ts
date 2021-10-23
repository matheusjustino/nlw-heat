import { Injectable, Logger } from '@nestjs/common';
import {
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ISocketIOService } from './interfaces/socketIO-service.interface';

@Injectable()
@WebSocketGateway({ cors: true })
export class SocketIOService
	implements
		ISocketIOService,
		OnGatewayInit,
		OnGatewayConnection,
		OnGatewayDisconnect
{
	private logger: Logger = new Logger(SocketIOService.name);

	@WebSocketServer()
	public server: Server;

	public afterInit(server: Server): void {
		this.logger.log('Init');
	}

	public handleDisconnect(client: Socket): void {
		this.logger.warn(`Client disconnected: ${client.id}`);
	}

	public handleConnection(client: Socket, ...args: any[]): void {
		this.logger.log(`Client connected: ${client.id}`);
	}
}
