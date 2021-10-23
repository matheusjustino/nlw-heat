import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
	Inject,
} from '@nestjs/common';
import { Request } from 'express';

// INTERFACES
import {
	IJWTService,
	JWT_SERVICE,
} from 'src/jwt/interfaces/jwt-service.interface';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		@Inject(JWT_SERVICE)
		private readonly jwtService: IJWTService,
	) {}

	public canActivate(context: ExecutionContext): boolean {
		const req = context.switchToHttp().getRequest<Request>();

		if (!req.headers['authorization']) {
			throw new UnauthorizedException('Sem token de autorização');
		}

		const [, token] = req.headers['authorization'].split(' ');

		const sub = this.jwtService.validateToken(token);

		if (!sub) {
			throw new UnauthorizedException('Falha na autenticação');
		}

		req.user_id = sub;
		return true;
	}
}
