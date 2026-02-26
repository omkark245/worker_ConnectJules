import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'CUSTOMER',
    city: '',
    area: '',
    category: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', formData);
      login(response.data.token, response.data.role, response.data.username);

      if (response.data.role === 'ADMIN') navigate('/admin');
      else if (response.data.role === 'WORKER') navigate('/worker');
      else navigate('/customer');
    } catch (err: any) {
      setError('Registration failed. Username or email might be taken.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input name="username" type="text" className="w-full px-3 py-2 border rounded-md" onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input name="email" type="email" className="w-full px-3 py-2 border rounded-md" onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input name="password" type="password" className="w-full px-3 py-2 border rounded-md" onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Role</label>
          <select name="role" className="w-full px-3 py-2 border rounded-md" onChange={handleChange}>
            <option value="CUSTOMER">Customer</option>
            <option value="WORKER">Worker</option>
          </select>
        </div>

        {formData.role === 'WORKER' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">City</label>
              <input name="city" type="text" className="w-full px-3 py-2 border rounded-md" onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Area</label>
              <input name="area" type="text" className="w-full px-3 py-2 border rounded-md" onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Category</label>
              <input name="category" type="text" className="w-full px-3 py-2 border rounded-md" placeholder="e.g. Plumber, Electrician" onChange={handleChange} required />
            </div>
          </>
        )}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
