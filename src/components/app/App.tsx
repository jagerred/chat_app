import './App.scss';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from 'components/Home/Home';
import UserModal from 'components/user/UserModal/UserModal';
import ProtectedRoute from 'components/shared/ProtectedRoute/ProtectedRoute';
const App = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path='/' element={<ProtectedRoute outlet={<Home />} />}></Route>
				<Route path='sign-in' element={<UserModal />} />
			</Routes>
		</HashRouter>
	);
};

export default App;
