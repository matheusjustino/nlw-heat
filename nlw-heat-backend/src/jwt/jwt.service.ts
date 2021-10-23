import { Inject, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

// INTERFACES
import {
	APP_CONFIG_SERVICE,
	IAppConfigService,
} from 'src/app-config/interfaces/app-config-service.interface';
import { IJWTService } from './interfaces/jwt-service.interface';
import { Payload } from './interfaces/payload.interface';

@Injectable()
export class JWTService implements IJWTService {
	constructor(
		@Inject(APP_CONFIG_SERVICE)
		private readonly appConfigService: IAppConfigService,
	) {}

	public validateToken(token: string): string {
		const { sub } = verify(
			token,
			this.appConfigService.secretHash,
		) as Payload;

		return sub;
	}
}
