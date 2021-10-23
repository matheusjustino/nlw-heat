import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

// SERVICES
import { api } from '../services/api';

// TYPES
import { User } from '../types/user.type';
import { AuthenticateResponse } from '../types/authenticate-response.type';

type AuthContextData = {
	user: User | null;
	signInUrl: string;
	signOut: () => void;
};

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>(
	{} as AuthContextData,
);

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
	const [user, setUser] = useState<User | null>(null);

	const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${
		import.meta.env.VITE_GITHUB_CLIENT_ID
	}`;

	useEffect(() => {
		const url = window.location.href;
		const hasGithubCode = url.includes('?code=');

		if (hasGithubCode) {
			const [urlWithoutCode, githubCode] = url.split('?code=');
			window.history.pushState({}, '', urlWithoutCode);
			signIn(githubCode);
		}
	}, []);

	useEffect(() => {
		const token = localStorage.getItem('@dowhile:token');

		if (token) {
			api.defaults.headers.common.authorization = `Bearer ${token}`;
			(async () => {
				const user = await getProfile();
				setUser(user);
			})();
		}
	}, []);

	const getProfile = async (): Promise<User> => {
		const apiResponse = await api.get<User>('profiles');
		return apiResponse.data;
	};

	const signIn = async (githubCode: string): Promise<void> => {
		const apiResult = await api.post<AuthenticateResponse>(
			'auth/authenticate',
			{
				code: githubCode,
			},
		);

		const { token, user } = apiResult.data;

		localStorage.setItem('@dowhile:token', token);

		api.defaults.headers.common.authorization = `Bearer ${token}`;

		setUser(user);
	};

	const signOut = (): void => {
		setUser(null);
		localStorage.removeItem('@dowhile:token');
	};

	const authProviderData: AuthContextData = {
		user,
		signInUrl,
		signOut,
	};

	return (
		<AuthContext.Provider value={authProviderData}>
			{props.children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const authContext = useContext(AuthContext);
	return authContext;
};
