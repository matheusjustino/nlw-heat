import styles from './styles.module.scss';
import { useState, FormEvent } from 'react';
import { VscSignOut, VscGithubInverted } from 'react-icons/vsc';

// CONTEXT
import { useAuth } from '../../context/auth.context';

// SERVICES
import { api } from '../../services/api';

export const SendMessageForm: React.FC = () => {
	const [message, setMessage] = useState<string>('');
	const { user, signOut } = useAuth();

	const handleSendMessage = async (event: FormEvent) => {
		event.preventDefault();

		if (!message.trim()) {
			return;
		}

		await api.post('messages', {
			message,
		});

		setMessage('');
	};

	return (
		<div className={styles.sendMessageFormWrapper}>
			<button onClick={signOut} className={styles.signOutButton}>
				<VscSignOut size="32" />
			</button>

			<header className={styles.userInformation}>
				<div className={styles.userImage}>
					<img src={user?.avatar_url} alt={user?.name} />
				</div>
				<strong className={styles.userName}>{user?.name}</strong>
				<span className={styles.userGithub}>
					<VscGithubInverted size="16" />
					{user?.login}
				</span>
			</header>

			<form className={styles.sendMessageForm}>
				<label htmlFor="message">Mensagem</label>
				<textarea
					name="message"
					id="message"
					placeholder="Digite aqui"
					onChange={(event) => setMessage(event.target.value)}
					value={message}
				/>

				<button onClick={handleSendMessage} type="submit">
					Enviar Mensagem
				</button>
			</form>
		</div>
	);
};
