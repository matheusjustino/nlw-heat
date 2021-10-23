import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { GithubModule } from './github/github.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessageModule } from './message/message.module';
import { JwtModule } from './jwt/jwt.module';
import { ProfileModule } from './profile/profile.module';
import { SocketIOModule } from './socket-io/socket-io.module';

@Module({
	imports: [
		AppConfigModule,
		GithubModule,
		AuthModule,
		PrismaModule,
		MessageModule,
		JwtModule,
		ProfileModule,
		SocketIOModule,
	],
})
export class AppModule {}
