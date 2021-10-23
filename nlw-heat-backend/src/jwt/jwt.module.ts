import { Module, Global } from '@nestjs/common';

// INTERFACES
import { JWT_SERVICE } from './interfaces/jwt-service.interface';

// SERVICES
import { JWTService } from './jwt.service';

@Global()
@Module({
	providers: [
		{
			useClass: JWTService,
			provide: JWT_SERVICE,
		},
	],
	exports: [
		{
			useClass: JWTService,
			provide: JWT_SERVICE,
		},
	],
})
export class JwtModule {}
