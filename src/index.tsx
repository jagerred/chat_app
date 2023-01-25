import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/app/App';
import { AuthContextProvider } from 'context/AuthContext';
import { ChatContextProvider } from 'context/ChatContext';
import { ChatsContextProvider } from 'context/ChatsContext ';
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
	<AuthContextProvider>
		<ChatsContextProvider>
			<ChatContextProvider>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</ChatContextProvider>
		</ChatsContextProvider>
	</AuthContextProvider>
);
