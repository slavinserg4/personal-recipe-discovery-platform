// src/layouts/MainLayout/MainLayout.tsx
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const MainLayout = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                            <Link to="/" className="text-gray-700 hover:text-gray-900">
                                Головна
                            </Link>
                            {user && (
                                <>
                                    <Link to="/addrecipe" className="text-gray-700 hover:text-gray-900">
                                        Додати рецепт
                                    </Link>
                                    <Link to="/me" className="text-gray-700 hover:text-gray-900">
                                        Мої рецепти
                                    </Link>
                                </>
                            )}
                        </div>
                        <div>
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-600">{user.email}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Вийти
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Увійти
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;