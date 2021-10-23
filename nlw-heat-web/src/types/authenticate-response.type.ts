import { User } from './user.type';

export type AuthenticateResponse = {
	token: string;
	user: User;
};
