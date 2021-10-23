import { Module } from '@nestjs/common';

import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MESSAGE_SERVICE } from './interfaces/message-service.interface';
import { SocketIOModule } from 'src/socket-io/socket-io.module';

@Module({
	imports: [SocketIOModule],
	controllers: [MessageController],
	providers: [
		{
			useClass: MessageService,
			provide: MESSAGE_SERVICE,
		},
	],
	exports: [
		{
			useClass: MessageService,
			provide: MESSAGE_SERVICE,
		},
	],
})
export class MessageModule {}
