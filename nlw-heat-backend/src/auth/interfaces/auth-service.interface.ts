import { User } from '@prisma/client';

// INTERFACES
import { CreateUser } from 'src/interfaces/create-user.interface';

export const AUTH_SERVICE = 'AUTH SERVICE';
export interface IAuthService {
	authenticateUser(code: string): Promise<{
		token: string;
		user: User;
	}>;
	generateToken(payload: any, subject: any): string;
	createUser({
		github_id,
		avatar_url,
		login,
		name,
	}: CreateUser): Promise<User>;
}
