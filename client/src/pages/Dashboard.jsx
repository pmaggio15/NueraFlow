import React, { useEffect, useState } from "react";
import { dummyCreationData } from "../assets/assets";
import { Gem, Sparkles } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import CreationGroup from "../components/CreationGroup";

const Dashboard = () => {
  const { user } = useUser();
  const [creations, setCreations] = useState([]);

  useEffect(() => {
    setCreations(dummyCreationData);
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
      <div className="space-y-4 mt-6">
        <p className="mb-2">Recent Creations</p>
        {groupsToShow.map((type) => (
          <CreationGroup key={type} type={type} items={grouped[type]} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;