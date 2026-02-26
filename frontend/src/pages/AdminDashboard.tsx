import { useState, useEffect } from 'react';
import api from '../api/axios';
import { ShieldCheck } from 'lucide-react';

interface WorkerProfile {
  id: number;
  name: string;
  category: string;
  city: string;
  isVerified: boolean;
}

interface JobAd {
  id: number;
  title: string;
  budget: number;
}

interface Transaction {
  id: number;
  amount: number;
  type: string;
  status: string;
  timestamp: string;
}

const AdminDashboard = () => {
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [jobs, setJobs] = useState<JobAd[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState('workers');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [wRes, jRes, tRes] = await Promise.all([
        api.get('/admin/workers'),
        api.get('/admin/jobs'),
        api.get('/admin/transactions')
      ]);
      setWorkers(wRes.data);
      setJobs(jRes.data);
      setTransactions(tRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const verifyWorker = async (id: number) => {
    try {
      await api.post(`/admin/workers/${id}/verify`);
      fetchData();
    } catch (err) {
      alert('Verification failed');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Admin Control Panel</h2>

      <div className="flex space-x-4 border-b">
        <button
          className={`py-2 px-4 font-semibold ${activeTab === 'workers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('workers')}
        >
          Workers
        </button>
        <button
          className={`py-2 px-4 font-semibold ${activeTab === 'jobs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('jobs')}
        >
          Job Ads
        </button>
        <button
          className={`py-2 px-4 font-semibold ${activeTab === 'payments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('payments')}
        >
          Payments
        </button>
      </div>

      {activeTab === 'workers' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workers.map((worker) => (
                <tr key={worker.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{worker.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{worker.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{worker.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {worker.isVerified ? (
                      <span className="text-green-600 flex items-center"><ShieldCheck className="w-4 h-4 mr-1" /> Verified</span>
                    ) : (
                      <span className="text-yellow-600">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {!worker.isVerified && (
                      <button
                        onClick={() => verifyWorker(worker.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        Verify Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'jobs' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{job.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600 font-bold">₹{job.budget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">₹{t.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{t.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">{t.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{new Date(t.timestamp).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
