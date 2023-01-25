import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ outlet }: { outlet: JSX.Element }) => {
	const { currentUser } = useContext(AuthContext);
	return !currentUser ? <Navigate to='/sign-in' /> : outlet;
};
export default ProtectedRoute;
