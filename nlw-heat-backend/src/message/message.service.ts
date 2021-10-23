import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { Message, User } from '@prisma/client';
import { IMessageService } from './interfaces/message-service.interface';
import {
	ISocketIOService,
	SOCKET_IO_SERVICE,
} from 'src/socket-io/interfaces/socketIO-service.interface';

@Injectable()
export class MessageService implements IMessageService {
	constructor(
		private readonly prismaService: PrismaService,
		@Inject(SOCKET_IO_SERVICE)
		private readonly io: ISocketIOService,
	) {}

	public async createMessage(
		text: string,
		user_id: string,
	): Promise<
		Message & {
			user: User;
		}
	> {
		const message = await this.prismaService.message.create({
			data: {
				text,
				user_id,
			},
			include: {
				user: true,
			},
		});

		this.mapAndCreateInfoWSMessage(message);

		return message;
	}

	public async getLast3Messages(): Promise<
		(Message & {
			user: User;
		})[]
	> {
		const messages = await this.prismaService.message.findMany({
			take: 3,
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				user: true,
			},
		});

		return messages;
	}

	private mapAndCreateInfoWSMessage(
		data: Message & {
			user: User;
		},
	): void {
		const infoWS = {
			id: data.id,
			text: data.text,
			user_id: data.user_id,
			createdAt: data.createdAt,
			user: {
				id: data.user.id,
				name: data.user.name,
				github_id: data.user.github_id,
				avatar_url: data.user.avatar_url,
				login: data.user.login,
			},
		};

		this.io.server.emit('new_message', infoWS);
	}
}
