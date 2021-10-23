import styles from './App.module.scss';

// CONTEXT
import { useAuth } from './context/auth.context';

// COMPONENTS
import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import { SendMessageForm } from './components/SendMessageForm';

export const App: React.FC = () => {
	const { user } = useAuth();

	return (
		<main
			className={`${styles.contentWrapper} ${
				!!user ? styles.contentSigned : ''
			}`}
		>
			<MessageList />
			{!!user ? <SendMessageForm /> : <LoginBox />}
		</main>
	);
};
