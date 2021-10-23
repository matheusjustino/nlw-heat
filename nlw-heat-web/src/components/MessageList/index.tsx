import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// SERVICES
import { api } from '../../services/api';

// IMAGES
import logoImg from '../../assets/logo.svg';

// INTERFACES
import { Message } from '../../types/message.type';

const messagesQueue: Message[] = [];
const socket = io('http://localhost:4000');

socket.on('new_message', (newMessage: Message) => {
	messagesQueue.push(newMessage);
});

export const MessageList: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		api.get<Message[]>('messages/last3').then((res) => {
			const apiResponse = res.data;
			setMessages(apiResponse);
		});
	}, []);

	useEffect(() => {
		setInterval(() => {
			if (messagesQueue.length > 0) {
				const queueMessage = messagesQueue.shift() as Message;

				setMessages((prevState) =>
					[queueMessage, prevState[0], prevState[1]].filter(Boolean),
				);
			}
		}, 1500);
	}, []);

	return (
		<div className={styles.messageListWrapper}>
			<img src={logoImg} alt="DoWhile 2021" />

			<ul className={styles.messageList}>
				{messages.map((message) => {
					return (
						<li key={message.id} className={styles.message}>
							<p className={styles.messageContent}>
								{message.text}
							</p>
							<div className={styles.messageUser}>
								<div className={styles.userImage}>
									<img
										src={message.user.avatar_url}
										alt={message.user.name}
									/>
								</div>
								<span>{message.user.name}</span>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
