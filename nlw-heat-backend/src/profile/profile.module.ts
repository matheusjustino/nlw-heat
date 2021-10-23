import { Module } from '@nestjs/common';

// SERVICES
import { ProfileService } from './profile.service';

// CONTROLLERS
import { ProfileController } from './profile.controller';

// INTERFACES
import { PROFILE_SERVICE } from './interfaces/profile-service.interface';

@Module({
	controllers: [ProfileController],
	providers: [
		{
			useClass: ProfileService,
			provide: PROFILE_SERVICE,
		},
	],
	exports: [
		{
			useClass: ProfileService,
			provide: PROFILE_SERVICE,
		},
	],
})
export class ProfileModule {}
