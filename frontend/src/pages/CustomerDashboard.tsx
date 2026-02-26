import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Star, MapPin, Briefcase } from 'lucide-react';

interface WorkerProfile {
  id: number;
  name: string;
  city: string;
  area: string;
  category: string;
  rating: number;
  isVerified: boolean;
}

const CustomerDashboard = () => {
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');

  const fetchWorkers = async () => {
    if (!city) return;
    try {
      const response = await api.get(`/workers/best?city=${city}&area=${area}`);
      setWorkers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRate = async (id: number, rating: number) => {
    try {
      await api.post(`/workers/${id}/rate?rating=${rating}`);
      fetchWorkers();
    } catch (err) {
      alert('Failed to rate worker');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Find Best Workers</h2>

      <div className="bg-white p-6 rounded-lg shadow-md flex space-x-4 items-end">
        <div className="flex-1">
          <label className="block text-gray-700 mb-2">City</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 mb-2">Area (Optional)</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter area"
          />
        </div>
        <button
          onClick={fetchWorkers}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 h-10"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.map((worker) => (
          <div key={worker.id} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{worker.name}</h3>
              {worker.isVerified && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                  Verified
                </span>
              )}
            </div>
            <div className="mt-2 space-y-1 text-gray-600">
              <p className="flex items-center"><Briefcase className="w-4 h-4 mr-2" /> {worker.category}</p>
              <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {worker.area}, {worker.city}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="ml-1 font-bold">{worker.rating.toFixed(1)}</span>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRate(worker.id, star)}
                    className="hover:text-yellow-500 text-gray-300"
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {workers.length === 0 && city && (
        <p className="text-center text-gray-500">No workers found in this area.</p>
      )}
    </div>
  );
};

export default CustomerDashboard;
