import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// INTERFACES
import { IAppConfigService } from './interfaces/app-config-service.interface';

@Injectable()
export class AppConfigService implements IAppConfigService {
	constructor(private readonly configService: ConfigService) {}

	public get databaseUrl(): string {
		return this.configService.get<string>('DATABASE_URL');
	}

	public get githubClientSecret(): string {
		return this.configService.get<string>('GITHUB_CLIENT_SECRET');
	}

	public get githubClientID(): string {
		return this.configService.get<string>('GITHUB_CLIENT_ID');
	}

	public get secretHash(): string {
		return this.configService.get<string>('SECRET_HASH');
	}
}
