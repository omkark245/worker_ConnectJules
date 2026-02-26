import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    city: '',
    area: '',
    budget: 0
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/jobs', formData);
      alert('Job posted successfully!');
      navigate('/customer');
    } catch (err) {
      alert('Failed to post job');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Post a New Job/Ad</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text" className="w-full px-3 py-2 border rounded-md"
            onChange={(e) => setFormData({...formData, title: e.target.value})} required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            className="w-full px-3 py-2 border rounded-md" rows={4}
            onChange={(e) => setFormData({...formData, description: e.target.value})} required
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <input
              type="text" className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => setFormData({...formData, category: e.target.value})} required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Budget (₹)</label>
            <input
              type="number" className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})} required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">City</label>
            <input
              type="text" className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => setFormData({...formData, city: e.target.value})} required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Area</label>
            <input
              type="text" className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => setFormData({...formData, area: e.target.value})} required
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition">
          Post Ad
        </button>
      </form>
    </div>
  );
};

export default PostJob;
