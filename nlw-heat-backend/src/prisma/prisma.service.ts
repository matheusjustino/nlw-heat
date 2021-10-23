import {
	INestApplication,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor() {
		super({
			log: ['info'],
		});
	}

	public async onModuleInit(): Promise<void> {
		await this.$connect();
	}

	public async onModuleDestroy(): Promise<void> {
		await this.$disconnect();
	}

	public async enableShutdownHooks(app: INestApplication): Promise<void> {
		this.$on('beforeExit', async () => {
			await app.close();
		});
	}
}
