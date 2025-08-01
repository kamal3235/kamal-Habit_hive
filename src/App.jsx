import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./components/Header";
import Dashboard from "./routes/Dashboard";
import CodingTracker from "./routes/CodingTracker";
import PhysicalTracker from "./routes/PhysicalTracker";
import MentalHealthTracker from "./routes/MentalHealthTracker";

function App() {
  const [codingEntries, setCodingEntries] = useLocalStorage(
    "coding-entries",
    [],
  );
  const [physicalEntries, setPhysicalEntries] = useLocalStorage(
    "physical-entries",
    [],
  );
  const [mentalEntries, setMentalEntries] = useLocalStorage(
    "mental-entries",
    [],
  );

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-black via-black to-yellow-400 text-yellow-400 font-montserrat">
        <Header />
        <div className="flex justify-center">
          <main className="w-full max-w-4xl mx-auto p-4">
            <Routes>
              <Route path="/" element={<Dashboard entries={codingEntries} />} />
              <Route
                path="/coding"
                element={
                  <CodingTracker
                    entries={codingEntries}
                    setEntries={setCodingEntries}
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
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
