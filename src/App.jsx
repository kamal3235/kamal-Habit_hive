import React, { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";

// Placeholder components
const Dashboard = () => <div></div>;
const Coding = () => <div></div>;
const Physical = () => <div></div>;
const MentalHealth = () => <div></div>;

function App() {
  const [entries, setEntries] = useLocalStorage("habit-hive-entries", []);
  const [hours, setHours] = useState("");
  const [showMosaic, setShowMosaic] = useState(false);

  // Check if user has already logged an entry today
  const hasLoggedToday = () => {
    const today = new Date().toDateString();
    return entries.some((entry) => entry.date === today);
  };

  // Get today's entries count
  const getTodayEntriesCount = () => {
    const today = new Date().toDateString();
    return entries.filter((entry) => entry.date === today).length;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hours (hoursValue < 0 && hoursValue > 24)) return;

    const newEntry = {
      hours: parseFloat(hours),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toDateString(), // Add date tracking
    };

    setEntries([...entries, newEntry]);
    setHours("");
    setShowMosaic(true);

    // Hide mosaic after 12 seconds
    setTimeout(() => setShowMosaic(false), 12000);
  };

  const handleClearData = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all your coding data? This cannot be undone.",
      )
    ) {
      setEntries([]);
    }
  };

  // Calculate progress metrics
  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);
  const totalSessions = entries.length;
  const averageHours =
    totalSessions > 0 ? (totalHours / totalSessions).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-yellow-400 text-yellow-400 font-montserrat">
      {/* Mosaic Progress Popup */}
      {showMosaic && (
        <div className="fixed inset-0 bg-black flex justify-center items-center animate-fadeIn z-50">
          <div className="bg-gray-900 rounded-3xl p-8 max-w-md text-center border-3 border-yellow-400 shadow-2xl shadow-yellow-400/30">
            <h2 className="text-yellow-400 mb-4 text-2xl">
              🐝 Progress Update! 🐝
            </h2>

            <div className="mb-6">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-white text-xl mb-1">
                Total Hours:{" "}
                <span className="text-yellow-400 font-bold">{totalHours}</span>
              </div>
              <div className="text-white text-lg mb-1">
                Sessions:{" "}
                <span className="text-yellow-400 font-bold">
                  {totalSessions}
                </span>
              </div>
              <div className="text-white text-lg">
                Average:{" "}
                <span className="text-yellow-400 font-bold">
                  {averageHours}h
                </span>
              </div>
            </div>

            {/* Progress Mosaic */}
            <div className="grid grid-cols-6 gap-2 mb-5">
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className={`w-5 h-5 rounded-full border border-yellow-400 ${
                    i < totalSessions ? "opacity-100" : "opacity-30"
                  }`}
                />
              ))}
            </div>

            <div className="text-yellow-400 text-sm">
              Keep building your hive! 🐝
            </div>
            <button
              onClick={() => setShowMosaic(false)}
              className="mt-2 px-4 py-2 rounded-lg bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition"
            >
              Close
            </button>
          </div>
          <br></br>
        </div>
      )}

      <header className="text-center py-8 pb-4 bg-black border-b-5 border-yellow-400">
        <h1 className="text-5xl tracking-wider m-0">🐝 Habit Hive</h1>
        <p className="text-white mt-2">
          Track your coding hours and build your hive!
        </p>
        {/* Put nav bar here? */}
          <Router>
            <NavBar />
            <div className="flex justify-center">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/coding" element={<Coding />} />
                <Route path="/physical" element={<Physical />} />
                <Route path="/mental" element={<MentalHealth />} />
                {/* Add more routes as needed  */}
              </Routes>
            </div>
          </Router>
      </header>

      <div className="flex justify-center">
        <main className="justify-center items-center text-center max-w-lg mx-auto my-8 bg-gray-900 rounded-2xl p-6 shadow-2xl shadow-black/50">

          {/* Today's Status */}
          <div className="mb-4 p-3 rounded-lg bg-gray-800 border border-yellow-400">
            <div className="text-yellow-400 font-semibold">
              Today's Progress
            </div>
            <div className="text-white text-sm">
              {hasLoggedToday() ? (
                <span className="text-green-400">
                  {getTodayEntriesCount()} session
                  {getTodayEntriesCount() !== 1 ? "s" : ""} logged today
                </span>
              ) : (
                <span className="text-yellow-400">
                  📝 Ready to log your progress
                </span>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label>
              <span className="text-yellow-400">
                How many hours did you code?
              </span>
              <input
                type="number"
                min="0"
                step="0.25"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="e.g. 2.5"
                className="w-full p-2 mt-1 rounded-lg border-2 border-yellow-400 bg-gray-800 text-yellow-400 text-base"
                required
              />
            </label>
            <button
              type="submit"
              className={
                "font-bold border-none rounded-lg py-3 text-lg cursor-pointer shadow-lg transition-shadow bg-gradient-to-r from-yellow-400 via-yellow-400 to-black text-black shadow-yellow-400/50 hover:shadow-yellow-400/70"
              }
            >
              Add to Hive
            </button>
          </form>

          <section className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-yellow-400 text-center text-2xl">
                Your Coding Hive
              </h2>
              {entries.length > 0 && (
                <button
                  onClick={handleClearData}
                  className="text-red-400 hover:text-red-300 text-sm underline"
                  title="Clear all data"
                >
                  Clear Data
                </button>
              )}
            </div>
            <div
              className="grid grid-cols-auto-fit gap-4 mt-4"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
              }}
            >
              {entries.map((entry, idx) => (
                <div
                  key={idx}
                  className={`hexagon p-4 text-center shadow-lg font-bold text-lg ${
                    idx % 2 === 0
                      ? "bg-yellow-400 text-black"
                      : "bg-black text-yellow-400"
                  }`}
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    width: "80px",
                    height: "92px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                  }}
                >
                  {/* <div className="text-2xl mb-1">🐝</div> */}
                  <div className="text-sm font-bold">{entry.hours}h 🐝</div>
                  {entry.date && (
                    <div className="text-xs opacity-75 mt-1">
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
              {entries.length === 0 && (
                <div className="text-yellow-400 text-opacity-60 text-center col-span-full py-8">
                  No entries yet. Add your first coding session!
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
