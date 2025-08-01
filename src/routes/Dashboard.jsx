import React from "react";
import MosaicReveal from "../components/MosaicReveal";
import WelcomeLanding from "../components/WelcomeLanding";
import codingImage from "../assets/codingImage.jpg";
import healthImage from "../assets/Health.jpg";
import mentalImage from "../assets/mental.jpg";

// This Dashboard page summarizes the user's habit data collected from other pages.
// For this example, we'll use localStorage to simulate collected data from other pages.
// In a real app, you might fetch this from a backend or a global state.

const HABIT_CATEGORIES = [
  { 
    name: "Coding", 
    key: "coding",
    image: codingImage,
    goal: 16 // Weekly goal: 16 sessions = all 16 squares filled in MosaicReveal
  },
  { 
    name: "Physical Health", 
    key: "physical",
    image: healthImage,
    goal: 16 // Weekly goal: 16 activities = all 16 squares filled in MosaicReveal
  },
  { 
    name: "Mental Health", 
    key: "mental",
    image: mentalImage,
    goal: 16 // Weekly goal: 16 activities = all 16 squares filled in MosaicReveal
  },
];

// Helper to get habit data from localStorage (or mock data if not present)
function getHabitData() {
  // Example structure: { coding: [timestamp, ...], physical: [...], mental: [...] }
  let data = {};
  try {
    // Check for the actual localStorage key being used
    const stored = localStorage.getItem("habit-hive-entries");
    console.log("🗄️ localStorage data:", stored);
    if (stored) {
      const entries = JSON.parse(stored);
      console.log("📋 Parsed entries:", entries);
      // Convert the entries array to the expected format
      data = {
        coding: entries.map(entry => entry.date), // Use date as timestamp for coding entries
        physical: [], // Physical tracker not implemented yet
        mental: []    // Mental health tracker not implemented yet
      };
      console.log("🔄 Converted data:", data);
    }
  } catch (e) {
    console.error("❌ Error reading localStorage:", e);
    // fallback to empty
    data = {};
  }
  // Ensure all categories exist
  HABIT_CATEGORIES.forEach((cat) => {
    if (!Array.isArray(data[cat.key])) data[cat.key] = [];
  });
  return data;
}

// Helper to calculate 7-day totals for a category
function getSevenDayTotal(timestamps) {
  if (!Array.isArray(timestamps)) return 0;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return timestamps.filter((timestamp) => {
    const entryDate = new Date(timestamp);
    return entryDate >= sevenDaysAgo;
  }).length;
}

const Dashboard = ({ entries = [] }) => {
  const [habitData, setHabitData] = React.useState(getHabitData());

  // Function to update habit data from localStorage
  const updateHabitData = React.useCallback(() => {
    console.log("🔄 Updating habit data from localStorage...");
    const newData = getHabitData();
    console.log("📊 New habit data:", newData);
    setHabitData(newData);
  }, []);

  // Listen for changes in localStorage (e.g., from other tabs/pages)
  React.useEffect(() => {
    const onStorage = () => updateHabitData();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [updateHabitData]);

  // Also listen for custom events (for same-tab updates)
  React.useEffect(() => {
    const onCustomStorage = () => updateHabitData();
    window.addEventListener("habitDataUpdated", onCustomStorage);
    return () => window.removeEventListener("habitDataUpdated", onCustomStorage);
  }, [updateHabitData]);

  // Update habitData when entries prop changes (for immediate updates)
  React.useEffect(() => {
    console.log("📝 Entries prop changed:", entries.length, "entries");
    const updatedData = {
      coding: entries.map(entry => entry.date),
      physical: [], // Physical tracker not implemented yet
      mental: []    // Mental health tracker not implemented yet
    };
    console.log("🔄 Setting habit data from entries:", updatedData);
    setHabitData(updatedData);
  }, [entries]);

  // Set up interval to check for localStorage changes (fallback)
  React.useEffect(() => {
    const interval = setInterval(() => {
      updateHabitData();
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [updateHabitData]);

  // Calculate 7-day totals for each category
  const sevenDayTotals = HABIT_CATEGORIES.map((cat) => {
    const total = getSevenDayTotal(habitData[cat.key]);
    console.log(`📊 ${cat.name}: ${total} entries in last 7 days`);
    return {
      ...cat,
      total: total,
    };
  });

  // Calculate summary stats
  const totalActions = sevenDayTotals.reduce((sum, cat) => sum + cat.total, 0);

  const handleMosaicComplete = (categoryName) => {
    console.log(`${categoryName} goal completed!`);
    // You could add celebration logic here
  };

  // Show welcome landing page if no progress
  if (totalActions === 0) {
    return <WelcomeLanding />;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-yellow-400">
          Your Habit Dashboard
        </h1>
        <button
          onClick={updateHabitData}
          className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Category Sections with MosaicReveal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {sevenDayTotals.map((cat) => {
          const progress = Math.min(cat.total, cat.goal);
          const percentage = Math.round((progress / cat.goal) * 100);
          
          return (
            <div
              key={cat.key}
              className="bg-black border-2 border-yellow-400 rounded-lg p-6 shadow-lg"
            >
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                  {cat.name}
                </h2>
                <div className="flex justify-between items-center text-sm text-yellow-200">
                  <span>Progress: {cat.total}/{cat.goal}</span>
                  <span>{percentage}%</span>
                </div>
              </div>
              
              <div className="mb-4">
                <MosaicReveal
                  imageSrc={cat.image}
                  filledSquares={progress}
                  onComplete={() => handleMosaicComplete(cat.name)}
                  gridSize={4}
                />
              </div>
              
              <div className="text-center">
                <div className="w-full bg-yellow-950 rounded-full h-2 mb-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-yellow-200 text-sm">
                  {cat.total >= cat.goal 
                    ? "Goal achieved! 🎉" 
                    : `${cat.goal - cat.total} more to reach your goal`
                  }
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="bg-black border-2 border-yellow-400 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-yellow-300 text-center">
          Weekly Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">{totalActions}</div>
            <div className="text-yellow-200">Total Actions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {Math.round((totalActions / (HABIT_CATEGORIES.reduce((sum, cat) => sum + cat.goal, 0))) * 100)}%
            </div>
            <div className="text-yellow-200">Overall Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {sevenDayTotals.filter(cat => cat.total >= cat.goal).length}
            </div>
            <div className="text-yellow-200">Goals Completed</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-black border-2 border-yellow-400 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-yellow-300">
          Recent Activity
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 text-left border-b border-yellow-400 text-yellow-300">
                  Category
                </th>
                <th className="p-2 text-left border-b border-yellow-400 text-yellow-300">
                  Details
                </th>
                <th className="p-2 text-left border-b border-yellow-400 text-yellow-300">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Show coding entries */}
              {entries.slice(0, 10).map((entry, idx) => (
                <tr key={`coding-${idx}`} className="border-b border-yellow-900">
                  <td className="p-2 text-yellow-200">Coding</td>
                  <td className="p-2 text-white">{entry.hours}h session</td>
                  <td className="p-2 text-white">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-yellow-500">
                    No activity logged yet. Start tracking your habits!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
