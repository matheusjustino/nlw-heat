import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { HttpExceptionFilter } from './app-config/filters/http-exception.filter';

const logger: Logger = new Logger('MAIN');

async function bootstrap() {
	const API_PORT = process.env.API_PORT || 4000;
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.enableCors();

	const prismaService: PrismaService = app.get(PrismaService);
	prismaService.enableShutdownHooks(app);

	app.useGlobalFilters(new HttpExceptionFilter());

	await app.listen(API_PORT, () =>
		logger.log(`APP running on port ${API_PORT}...`),
	);
}
bootstrap();
