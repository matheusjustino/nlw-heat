import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';

// INTERFACES
import { IProfileService } from './interfaces/profile-service.interface';

@Injectable()
export class ProfileService implements IProfileService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getUserProfile(user_id: string): Promise<User> {
		const userProfile = await this.prismaService.user.findFirst({
			where: {
				id: user_id,
			},
		});

		return userProfile;
	}
}
