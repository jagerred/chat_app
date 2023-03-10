import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/App';
import { AuthContextProvider } from 'context/AuthContext';
import { ChatContextProvider } from 'context/ChatContext';
import { ChatsContextProvider } from 'context/ChatsContext ';
import './index.scss';
const root = createRoot(document.getElementById('root')!);
root.render(
	<AuthContextProvider>
		<ChatsContextProvider>
			<ChatContextProvider>
				<StrictMode>
					<App />
				</StrictMode>
			</ChatContextProvider>
		</ChatsContextProvider>
	</AuthContextProvider>
);
