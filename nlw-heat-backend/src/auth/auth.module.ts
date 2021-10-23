import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.guard';
import { AUTH_SERVICE } from './interfaces/auth-service.interface';

@Module({
	controllers: [AuthController],
	providers: [
		{
			useClass: AuthService,
			provide: AUTH_SERVICE,
		},
		AuthGuard,
	],
	exports: [
		{
			useClass: AuthService,
			provide: AUTH_SERVICE,
		},
		AuthGuard,
	],
})
export class AuthModule {}
