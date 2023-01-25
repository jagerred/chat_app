import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'components/Home/Home';
import UserModal from 'components/user/UserModal/UserModal';
import ProtectedRoute from 'components/shared/ProtectedRoute/ProtectedRoute';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<ProtectedRoute outlet={<Home />} />}></Route>
				<Route path='sign-in' element={<UserModal />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
