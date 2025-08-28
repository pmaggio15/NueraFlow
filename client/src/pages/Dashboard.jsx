import React, { useEffect, useState } from "react";
import { Gem, Sparkles } from "lucide-react";
import { useUser, useAuth } from "@clerk/clerk-react";
import CreationGroup from "../components/CreationGroup";
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  // Get current plan from user metadata
  const getCurrentPlan = () => {
    return user?.unsafeMetadata?.plan || 'free';
  };

  const isPremium = getCurrentPlan() === 'premium';

  // Group by type
  const grouped = creations.reduce((acc, item) => {
    const t = item.type || "other";
    (acc[t] ||= []).push(item);
    return acc;
  }, {});

  // Decide which 3 groups you want to show (adjust as needed)
  const groupOrder = ["blog-title", "article", "image"];
  const groupsToShow = groupOrder.filter((t) => grouped[t]?.length);

  return (
    <div className="h-full overflow-y-scroll p-6">
      {/* Top cards */}
      <div className="flex justify-start gap-4 flex-wrap">
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588f2] to-[#0bb0d7] text-white flex justify-center items-center">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              {isPremium ? 'Premium' : 'Free'}
            </h2>
          </div>
          <div className={`w-10 h-10 rounded-lg text-white flex justify-center items-center ${
            isPremium 
              ? 'bg-gradient-to-br from-[#ff61c5] to-[#9e53ee]' 
              : 'bg-gradient-to-br from-[#10b981] to-[#059669]'
          }`}>
            <Gem className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Grouped dropdowns */}
      {loading ? (
        <div className='flex justify-center items-center h-3/4'>
          <div className='animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent'></div>
        </div>
      ) : (
        <div className="space-y-4 mt-6">
          <p className="mb-2">Recent Creations</p>
          {groupsToShow.map((type) => (
            <CreationGroup key={type} type={type} items={grouped[type]} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;