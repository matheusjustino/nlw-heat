import {
	BadRequestException,
	Inject,
	Injectable,
	Logger,
} from '@nestjs/common';
import { sign } from 'jsonwebtoken';

// PRISMA ENTITIES
import { User } from '.prisma/client';

// CONFIG
import { githubAxios } from 'src/app-config/axios/axios-github';

// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';

// INTERFACES
import { AccessTokenResponse } from 'src/interfaces/github-access-token-response.interface';
import { GithubUserResponse } from 'src/interfaces/github-user-response.interface';
import { CreateUser } from 'src/interfaces/create-user.interface';
import { IAuthService } from './interfaces/auth-service.interface';
import {
	APP_CONFIG_SERVICE,
	IAppConfigService,
} from 'src/app-config/interfaces/app-config-service.interface';

@Injectable()
export class AuthService implements IAuthService {
	private readonly logger: Logger = new Logger(AuthService.name);

	constructor(
		@Inject(APP_CONFIG_SERVICE)
		private readonly appConfigService: IAppConfigService,
		private readonly prismaService: PrismaService,
	) {}

	public async authenticateUser(code: string): Promise<{
		token: string;
		user: User;
	}> {
		const accessTokenConfig = {
			params: {
				client_id: this.appConfigService.githubClientID,
				client_secret: this.appConfigService.githubClientSecret,
				code,
			},
		};
		const { data: getAccessTokenResponse } =
			await githubAxios.post<AccessTokenResponse>(
				'https://github.com/login/oauth/access_token',
				null,
				accessTokenConfig,
			);
		if (!getAccessTokenResponse) {
			this.logger.error('Erro ao autenticar o usuário');
			throw new BadRequestException('Erro ao autenticar o usuário');
		}

		const getUserConfig = {
			headers: {
				authorization: `Bearer ${getAccessTokenResponse.access_token}`,
			},
		};
		const { data: getUserResponse } =
			await githubAxios.get<GithubUserResponse>(
				`https://api.github.com/user`,
				getUserConfig,
			);
		if (!getUserResponse) {
			this.logger.error('Erro ao buscar as informações do usuário');
			throw new BadRequestException(
				'Erro ao buscar as informações do usuário',
			);
		}

		const { login, id, avatar_url, name } = getUserResponse;

		let user: User = await this.prismaService.user.findFirst({
			where: {
				github_id: id,
			},
		});

		if (!user) {
			user = await this.createUser({
				github_id: id,
				avatar_url,
				login,
				name,
			});
		}

		const token = this.generateToken(
			{
				user: {
					name: user.name,
					avatar_url: user.avatar_url,
					id: user.id,
				},
			},
			user.id,
		);

		return { token, user };
	}

	public generateToken(payload, subject): string {
		return sign(payload, this.appConfigService.secretHash, {
			subject,
			expiresIn: '1d',
		});
	}

	public async createUser({
		github_id,
		avatar_url,
		login,
		name,
	}: CreateUser): Promise<User> {
		return await this.prismaService.user.create({
			data: {
				github_id,
				avatar_url,
				login,
				name,
			},
		});
	}
}
