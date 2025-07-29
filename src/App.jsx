import React, { useState } from "react";

function App() {
  const [entries, setEntries] = useState([]);
  const [hours, setHours] = useState("");
  const [showMosaic, setShowMosaic] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hours) return;
    
    const newEntry = { 
      hours: parseFloat(hours), 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setEntries([...entries, newEntry]);
    setHours("");
    setShowMosaic(true);
    
    // Hide mosaic after 3 seconds
    setTimeout(() => setShowMosaic(false), 3000);
  };
  
    // Calculate progress metrics
    const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);
    const totalSessions = entries.length;
    const averageHours = totalSessions > 0 ? (totalHours / totalSessions).toFixed(1) : 0;
    
    // Progress colors based on consistency
    const getProgressColor = (index) => {
      const colors = ['#FFD600', '#FFA500', '#FF6B35', '#FF4500', '#FF0000'];
      const consistency = Math.min(Math.floor(totalSessions / 5), 4);
      return colors[consistency];
    };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #000 60%, #FFD600 100%)",
      color: "#FFD600",
      fontFamily: "Montserrat, Arial, sans-serif",
      padding: "0",
      margin: "0"
    }}>
      {/* Simple Bee Mosaic Popup */}
      {/* Mosaic Progress Popup */}
      {showMosaic && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          animation: "fadeIn 0.3s ease-in"
        }}>
          <div style={{
            background: "#111",
            borderRadius: 20,
            padding: 32,
            maxWidth: 400,
            textAlign: "center",
            border: "3px solid #FFD600",
            boxShadow: "0 8px 32px rgba(255, 214, 0, 0.3)"
          }}>
            <h2 style={{ color: "#FFD600", marginBottom: 16 }}>🐝 Progress Update! 🐝</h2>
            
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>🎯</div>
              <div style={{ color: "#fff", fontSize: "1.2rem", marginBottom: 4 }}>
                Total Hours: <span style={{ color: "#FFD600", fontWeight: "bold" }}>{totalHours}</span>
              </div>
              <div style={{ color: "#fff", fontSize: "1.1rem", marginBottom: 4 }}>
                Sessions: <span style={{ color: "#FFD600", fontWeight: "bold" }}>{totalSessions}</span>
              </div>
              <div style={{ color: "#fff", fontSize: "1.1rem" }}>
                Average: <span style={{ color: "#FFD600", fontWeight: "bold" }}>{averageHours}h</span>
              </div>
            </div>

            {/* Progress Mosaic */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: 8,
              marginBottom: 20
            }}>
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: i < totalSessions ? getProgressColor(i) : "#333",
                  border: "1px solid #FFD600",
                  opacity: i < totalSessions ? 1 : 0.3
                }} />
              ))}
            </div>

            <div style={{ color: "#FFD600", fontSize: "0.9rem" }}>
              Keep building your hive! 🐝
            </div>
          </div>
        </div>
      )}
      <header style={{
        textAlign: "center",
        padding: "2rem 0 1rem 0",
        background: "#000",
        borderBottom: "5px solid #FFD600"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          letterSpacing: "0.1em",
          margin: 0
        }}>
          🐝 Habit Hive
        </h1>
        <p style={{ color: "#fff", marginTop: "0.5rem" }}>
          Track your coding hours and build your hive!
        </p>
      </header>

      <main style={{ maxWidth: 500, margin: "2rem auto", background: "#111", borderRadius: 16, padding: 24, boxShadow: "0 4px 24px #0008" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <label>
            <span style={{ color: "#FFD600" }}>How many hours did you code?</span>
            <input
              type="number"
              min="0"
              step="0.25"
              value={hours}
              onChange={e => setHours(e.target.value)}
              placeholder="e.g. 2.5"
              style={{
                width: "100%",
                padding: 8,
                marginTop: 4,
                borderRadius: 8,
                border: "2px solid #FFD600",
                background: "#222",
                color: "#FFD600",
                fontSize: "1rem"
              }}
              required
            />
          </label>
          {/* <label>
            <span style={{ color: "#FFD600" }}>At what time?</span>
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              style={{
                width: "100%",
                padding: 8,
                marginTop: 4,
                borderRadius: 8,
                border: "2px solid #FFD600",
                background: "#222",
                color: "#FFD600",
                fontSize: "1rem"
              }}
              required
            />
          </label> */}
          <button type="submit" style={{
            background: "linear-gradient(90deg, #FFD600 60%, #000 100%)",
            color: "#000",
            fontWeight: "bold",
            border: "none",
            borderRadius: 8,
            padding: "0.75rem",
            fontSize: "1.1rem",
            cursor: "pointer",
            boxShadow: "0 2px 8px #FFD60088"
          }}>
            Add to Hive
          </button>
        </form>

        <section style={{ marginTop: 32 }}>
          <h2 style={{ color: "#FFD600", textAlign: "center" }}>Your Coding Hive</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
            gap: 16,
            marginTop: 16
          }}>
            {entries.map((entry, idx) => (
              <div key={idx} style={{
                background: idx % 2 === 0 ? "#FFD600" : "#000",
                color: idx % 2 === 0 ? "#000" : "#FFD600",
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                padding: 16,
                textAlign: "center",
                boxShadow: "0 2px 8px #0006",
                fontWeight: "bold",
                fontSize: "1.1rem"
              }}>
                <div style={{ fontSize: "2rem" }}>🐝</div>
                <div>{entry.hours}h</div>
                <div style={{ fontSize: "0.9rem" }}>{entry.time}</div>
              </div>
            ))}
            {entries.length === 0 && (
              <div style={{ color: "#FFD60099", textAlign: "center", gridColumn: "1/-1" }}>
                No entries yet. Add your first coding session!
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
