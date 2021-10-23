import { Message, User } from '@prisma/client';

export const MESSAGE_SERVICE = 'MESSAGE SERVICE';
export interface IMessageService {
	createMessage(
		text: string,
		user_id: string,
	): Promise<
		Message & {
			user: User;
		}
	>;

	getLast3Messages(): Promise<
		(Message & {
			user: User;
		})[]
	>;
}
