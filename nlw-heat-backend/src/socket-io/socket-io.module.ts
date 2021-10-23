import { Module } from '@nestjs/common';

import { SOCKET_IO_SERVICE } from './interfaces/socketIO-service.interface';
import { SocketIOService } from './socket-io.service';

@Module({
	providers: [
		{
			useClass: SocketIOService,
			provide: SOCKET_IO_SERVICE,
		},
	],
	exports: [
		{
			useClass: SocketIOService,
			provide: SOCKET_IO_SERVICE,
		},
	],
})
export class SocketIOModule {}
