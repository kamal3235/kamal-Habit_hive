import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./components/Header";
import Dashboard from "./routes/Dashboard";
import ReadingTracker from "./routes/ReadingTracker";
import PhysicalTracker from "./routes/PhysicalTracker";
import MentalHealthTracker from "./routes/MentalHealthTracker";
import AchievementPage from "./routes/AchievementPage";

function App() {
  const [readingEntries, setReadingEntries] = useLocalStorage(
    "habit-hive-reading-entries",
    [],
  );
  const [physicalEntries, setPhysicalEntries] = useLocalStorage(
    "habit-hive-physical-entries",
    [],
  );
  const [mentalEntries, setMentalEntries] = useLocalStorage(
    "habit-hive-mental-health-entries",
    [],
  );

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-yellow-400 text-yellow-400 font-montserrat">
        <Header />
        <div className="flex justify-center">
          <main className="w-full max-w-4xl mx-auto p-4">
            <Routes>
              <Route path="/" element={<Dashboard entries={readingEntries} />} />
              <Route
                path="/reading"
                element={
                  <ReadingTracker
                    entries={readingEntries}
                    setEntries={setReadingEntries}
                  />
                }
              />
              <Route
                path="/physical"
                element={
                  <PhysicalTracker
                    entries={physicalEntries}
                    setEntries={setPhysicalEntries}
                  />
                }
              />
              <Route
                path="/mental"
                element={
                  <MentalHealthTracker
                    entries={mentalEntries}
                    setEntries={setMentalEntries}
                  />
                }
              />
              <Route
                path="/achievements"
                element={
                  <AchievementPage
                    entries={readingEntries}
                    physicalEntries={physicalEntries}
                    mentalEntries={mentalEntries}
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
