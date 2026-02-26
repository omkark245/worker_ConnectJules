import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Users, ShieldCheck, CreditCard } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-16 py-10">
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Connect with the <span className="text-blue-600">Best Workers</span> in Your Area
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The ultimate platform for service providers and customers. Post jobs, find workers, and get things done.
        </p>
        {!isAuthenticated && (
          <div className="flex justify-center space-x-4">
            <Link to="/register" className="bg-blue-600 text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-blue-700 transition">
              Get Started
            </Link>
            <Link to="/login" className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-50 transition">
              Login
            </Link>
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center space-y-4">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
            <Briefcase className="text-blue-600 w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Post Ads</h3>
          <p className="text-gray-500 text-sm">Customers can post job ads easily like OLX.</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center space-y-4">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
            <Users className="text-green-600 w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Verify Workers</h3>
          <p className="text-gray-500 text-sm">Admin verifies workers to ensure quality service.</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center space-y-4">
          <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="text-yellow-600 w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Rating System</h3>
          <p className="text-gray-500 text-sm">Find the best workers based on customer reactions.</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center space-y-4">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
            <CreditCard className="text-purple-600 w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Wallet & Payments</h3>
          <p className="text-gray-500 text-sm">Secure payments and wallet system for workers.</p>
        </div>
      </section>

      <section className="bg-blue-600 rounded-2xl p-12 text-center text-white space-y-6">
        <h2 className="text-3xl font-bold">Are you a Worker?</h2>
        <p className="text-xl opacity-90 max-w-xl mx-auto">
          Join thousands of professionals and grow your business today.
          First 10 jobs are absolutely free!
        </p>
        <Link to="/register" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-100 transition">
          Register as Worker
        </Link>
      </section>
    </div>
  );
};

export default Home;
