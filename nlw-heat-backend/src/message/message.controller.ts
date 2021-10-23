import {
	Body,
	Controller,
	Post,
	Res,
	HttpStatus,
	UseGuards,
	Req,
	Get,
	Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthGuard } from 'src/auth/auth-guard.guard';

import { CreateMessageDto } from './dto/create-message.dto';
import {
	IMessageService,
	MESSAGE_SERVICE,
} from './interfaces/message-service.interface';

@Controller('messages')
export class MessageController {
	constructor(
		@Inject(MESSAGE_SERVICE)
		private readonly messageService: IMessageService,
	) {}

	@UseGuards(AuthGuard)
	@Post()
	public async createMessage(
		@Body() body: CreateMessageDto,
		@Req() req: Request,
		@Res() res: Response,
	) {
		const { message } = body;
		const { user_id } = req;
		const createdMessage = await this.messageService.createMessage(
			message,
			user_id,
		);
		return res.status(HttpStatus.OK).json(createdMessage);
	}

	@Get('last3')
	public async getLast3Messages(@Res() res: Response) {
		const messages = await this.messageService.getLast3Messages();
		return res.status(HttpStatus.OK).json(messages);
	}
}
