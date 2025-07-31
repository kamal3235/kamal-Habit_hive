import React from "react";
<header className="text-center py-8 pb-4 bg-black border-b-5 border-yellow-400">
        <h1 className="text-5xl tracking-wider m-0">🐝 Habit Hive</h1>
        <p className="text-white mt-2">
          Track your coding hours and build your hive!
        </p>
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