import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Wallet, Briefcase, MapPin, Phone, CreditCard } from 'lucide-react';

interface JobAd {
  id: number;
  title: string;
  description: string;
  category: string;
  city: string;
  area: string;
  budget: number;
}

const WorkerDashboard = () => {
  const [jobs, setJobs] = useState<JobAd[]>([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
    fetchWallet();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs');
      setJobs(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWallet = async () => {
    try {
      const response = await api.get('/wallet');
      setBalance(response.data.balance);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewContact = async (jobId: number) => {
    try {
      const response = await api.post(`/jobs/${jobId}/view-contact`);
      alert(response.data);
      fetchWallet(); // Update balance in case it was deducted
    } catch (err: any) {
      alert(err.response?.data || 'Failed to view contact');
    }
  };

  const addFunds = async () => {
    const amountStr = prompt("Enter amount to add to wallet:", "500");
    if (!amountStr) return;
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // In a real app, you would integrate Razorpay SDK here
    const paymentId = 'pay_' + Math.random().toString(36).substr(2, 9);
    try {
      await api.post(`/wallet/add-funds?amount=${amount}&paymentId=${paymentId}`);
      alert('₹' + amount + ' added to wallet!');
      fetchWallet();
    } catch (err) {
      alert('Payment failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Available Jobs</h2>
        <div className="bg-white px-6 py-3 rounded-lg shadow-md flex items-center space-x-4 border-l-4 border-green-500">
          <Wallet className="text-green-600 w-6 h-6" />
          <div>
            <p className="text-sm text-gray-500 font-medium">Wallet Balance</p>
            <p className="text-xl font-bold text-gray-800">₹{balance.toFixed(2)}</p>
          </div>
          <button
            onClick={addFunds}
            className="ml-4 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition text-sm flex items-center"
          >
            <CreditCard className="w-4 h-4 mr-1" /> Add Funds
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-blue-600">{job.title}</h3>
                <p className="text-gray-600 mt-1">{job.description}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">₹{job.budget}</p>
                <p className="text-sm text-gray-500">Budget</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <Briefcase className="w-4 h-4 mr-1" /> {job.category}
              </span>
              <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <MapPin className="w-4 h-4 mr-1" /> {job.area}, {job.city}
              </span>
            </div>
            <div className="mt-6">
              <button
                onClick={() => handleViewContact(job.id)}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center font-semibold"
              >
                <Phone className="w-4 h-4 mr-2" /> View Customer Contact
              </button>
              <p className="text-xs text-gray-400 mt-2 text-center">
                * First 10 jobs are free. Subsequent jobs cost ₹100 from wallet.
              </p>
            </div>
          </div>
        ))}
      </div>

      {jobs.length === 0 && !loading && (
        <p className="text-center text-gray-500 py-10">No jobs available at the moment.</p>
      )}
    </div>
  );
};

export default WorkerDashboard;
