import {
	Body,
	Controller,
	Res,
	HttpStatus,
	Post,
	Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';

// INTERFACES
import {
	AUTH_SERVICE,
	IAuthService,
} from './interfaces/auth-service.interface';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(AUTH_SERVICE)
		private readonly authService: IAuthService,
	) {}

	@Post('authenticate')
	public async authenticateUser(
		@Body() body: AuthenticateUserDto,
		@Res() res: Response,
	) {
		const { code } = body;
		const result = await this.authService.authenticateUser(code);
		return res.status(HttpStatus.OK).json(result);
	}
}
