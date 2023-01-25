import Sidebar from 'components/Sidebar/Sidebar';
import Chats from 'components/chats/Chats/Chats';
import Chat from 'components/chat/Chat/Chat';

const Home = () => {
	return (
		<div className='wrapper'>
			<div className='container'>
				<Sidebar />
				<Chats />
				<Chat />
			</div>
		</div>
	);
};

export default Home;
