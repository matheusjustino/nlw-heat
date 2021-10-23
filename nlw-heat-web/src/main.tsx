import './styles/global.scss';
import React from 'react';
import ReactDOM from 'react-dom';

// COMPONENTES
import { App } from './App';
import { AuthProvider } from './context/auth.context';

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
