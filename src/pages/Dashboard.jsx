jsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [actions, setActions] = useState([]);

  // Fetch user actions (replace '/api/user-actions' with actual endpoint)
  useEffect(() => {
    fetch('/api/user-actions')
      .then((res) => res.json())
      .then((data) => setActions(data))
      .catch((error) => console.error('Error fetching actions:', error));
  }, []);

  // Prepare chart data
  const chartData = {
    labels: actions.map((action) => action.type),
    datasets: [
      {
        label: 'User Actions Count',
        data: actions.reduce((acc, action) => {
          acc[action.type] = (acc[action.type] || 0) + 1;
          return acc;
        }, {}),
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
      },
    ],
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Actions Dashboard</h1>
      
      {/* Actions Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Action Log</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left border-b">Action</th>
                <th className="p-2 text-left border-b">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((action) => (
                <tr key={action.id} className="border-b">
                  <td className="p-2">{action.type}</td>
                  <td className="p-2">{action.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Action Distribution</h2>
        <div className="h-96">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Count' } },
                x: { title: { display: true, text: 'Action Type' } },
              },
              plugins: { legend: { display: true, position: 'top' } },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;