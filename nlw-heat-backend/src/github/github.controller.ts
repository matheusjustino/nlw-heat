import { Controller, Get, HttpStatus, Inject, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

// INTERFACES
import {
	APP_CONFIG_SERVICE,
	IAppConfigService,
} from 'src/app-config/interfaces/app-config-service.interface';

@Controller('github')
export class GithubController {
	constructor(
		@Inject(APP_CONFIG_SERVICE)
		private readonly appConfigService: IAppConfigService,
	) {}

	@Get()
	public oauth(@Res() res: Response) {
		res.redirect(
			`https://github.com/login/oauth/authorize?client_id=${this.appConfigService.githubClientID}`,
		);
	}

	@Get('signin/callback')
	public callback(@Req() req: Request, @Res() res: Response) {
		const { code } = req.query;
		return res.status(HttpStatus.OK).json(code);
	}
}
