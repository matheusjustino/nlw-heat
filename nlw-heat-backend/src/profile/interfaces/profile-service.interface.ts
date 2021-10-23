import { User } from '@prisma/client';

export const PROFILE_SERVICE = 'PROFILE SERVICE';
export interface IProfileService {
	getUserProfile(user_id: string): Promise<User>;
}
