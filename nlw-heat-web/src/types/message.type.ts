import { User } from './user.type';

export type Message = {
	id: string;
	text: string;
	createdAt: string;
	user_id: string;
	user: User;
};
