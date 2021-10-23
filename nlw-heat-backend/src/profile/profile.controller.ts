import {
	Controller,
	Get,
	Req,
	Res,
	HttpStatus,
	UseGuards,
	Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';

// GUARDS
import { AuthGuard } from 'src/auth/auth-guard.guard';

// INTERFACES
import {
	IProfileService,
	PROFILE_SERVICE,
} from './interfaces/profile-service.interface';

@UseGuards(AuthGuard)
@Controller('profiles')
export class ProfileController {
	constructor(
		@Inject(PROFILE_SERVICE)
		private readonly profileService: IProfileService,
	) {}

	@Get()
	public async getUserProfile(@Req() req: Request, @Res() res: Response) {
		const { user_id } = req;
		const userProfile = await this.profileService.getUserProfile(user_id);
		return res.status(HttpStatus.OK).json(userProfile);
	}
}
