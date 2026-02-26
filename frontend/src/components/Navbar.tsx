import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Briefcase, PlusCircle, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, role, logout, username } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">WorkerConnect</Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {role === 'CUSTOMER' && (
                  <>
                    <Link to="/customer" className="flex items-center text-gray-700 hover:text-blue-600">
                      <LayoutDashboard className="w-5 h-5 mr-1" /> Dashboard
                    </Link>
                    <Link to="/post-job" className="flex items-center text-gray-700 hover:text-blue-600">
                      <PlusCircle className="w-5 h-5 mr-1" /> Post Job
                    </Link>
                  </>
                )}
                {role === 'WORKER' && (
                  <Link to="/worker" className="flex items-center text-gray-700 hover:text-blue-600">
                    <Briefcase className="w-5 h-5 mr-1" /> My Work
                  </Link>
                )}
                {role === 'ADMIN' && (
                  <Link to="/admin" className="flex items-center text-gray-700 hover:text-blue-600">
                    <LayoutDashboard className="w-5 h-5 mr-1" /> Admin
                  </Link>
                )}

                <span className="text-gray-600 font-medium">| Hi, {username}</span>
                <button onClick={handleLogout} className="flex items-center text-red-500 hover:text-red-700">
                  <LogOut className="w-5 h-5 mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
