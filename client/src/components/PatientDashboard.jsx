import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PatientDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [statsData, setStatsData] = useState({ labels: [], datasets: [] });
  const [labData, setLabData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Mock data for Statistics (Line Chart)
    setStatsData({
      labels: [
        "Sep 10",
        "Sep 11",
        "Sep 12",
        "Sep 13",
        "Sep 14",
        "Sep 15",
        "Sep 16",
      ],
      datasets: [
        {
          label: "Blood Pressure",
          data: [110, 115, 118, 120, 115, 119, 114],
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Exercise",
          data: [2, 2.5, 2.2, 2.8, 2.3, 2.7, 2.4],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Blood Glucose",
          data: [3.5, 3.6, 3.4, 3.7, 3.6, 3.8, 3.5],
          borderColor: "rgb(153, 102, 255)",
          backgroundColor: "rgba(153, 102, 255, 0.5)",
          fill: true,
          tension: 0.4,
        },
      ],
    });

    // Mock data for Lab Results (Bar Chart)
    setLabData({
      labels: ["Jan", "Feb", "Mar", "Apr"],
      datasets: [
        {
          label: "Results",
          data: [5, 4, 6, 3],
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { name: "Activity", icon: "📊" },
    { name: "General", icon: "🏥", active: true },
    { name: "Fitness", icon: "🏋️" },
    { name: "Measurements", icon: "📏" },
    { name: "Health History", icon: "📋" },
    { name: "Resources", icon: "📚" },
    { name: "Help", icon: "❓" },
    { name: "Change Patient", icon: "🔄" },
  ];

  const medications = [
    { name: "Abacavir (Ziagen)", dose: "5 mg once daily", date: "14 May" },
    {
      name: "Leflunomide (Arava)",
      dose: "120 mg orally per day",
      date: "21 Feb",
    },
    { name: "Nystatin (Nyatorn)", dose: "20 mg once daily", date: "11 Jan" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-6 flex flex-col">
        <div className="mb-6">
          <img
            src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Logo"
            className="mb-4 h-20 mx-auto rounded-full"
          />
          {navItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center p-2 mb-2 rounded ${
                item.active ? "bg-blue-700" : "hover:bg-blue-700"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex space-x-4">
            <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              Messages (3)
            </button>
            <input
              type="text"
              placeholder="Search here"
              className="border rounded-full px-4 py-1"
            />
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span>{user.name || "Luke Henry"}</span>
            <button className="bg-blue-500 text-white px-2 py-1 rounded">
              🔵
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Doctor Illustration */}
          <div className="col-span-1 hidden lg:block">
            <img
              src="https://static.vecteezy.com/system/resources/previews/026/375/249/non_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
              alt="Doctor"
              className="w-full h-auto"
            />
          </div>

          {/* Statistics Card */}
          <div className="col-span-1 lg:col-span-2 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Statistics</h3>
            <div className="flex space-x-2 mb-2 text-sm">
              <button className="text-blue-500">All Time</button>
              <button>This Year</button>
              <button>This Week</button>
              <button>Today</button>
            </div>
            <p className="text-sm mb-2">
              Timeline of Activity 10/9/18 - 16/9/18
            </p>
            <Line
              data={statsData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  tooltip: { mode: "index", intersect: false },
                },
              }}
            />
            <div className="flex justify-between text-sm mt-2">
              <span>
                Blood Pressure <strong>115/94 mmHg</strong>
              </span>
              <span>
                Exercise <strong>2hr 20min</strong>
              </span>
              <span>
                Blood Glucose <strong>3.6 mmol/L</strong>
              </span>
            </div>
          </div>

          {/* Medication Card */}
          <div className="col-span-1 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Medication</h3>
            {medications.map((med, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <span className="text-blue-500">{med.name}</span>
                <span>{med.dose}</span>
                <span>{med.date}</span>
              </div>
            ))}
          </div>

          {/* Lab Results Card */}
          <div className="col-span-1 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Lab Results</h3>
            <div className="flex space-x-2 mb-2 text-sm">
              <button>Last 6 Months</button>
              <button>This Week</button>
              <button>Today</button>
            </div>
            <Bar
              data={labData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: false },
                },
              }}
            />
          </div>

          {/* Patient Profile Card */}
          <div className="col-span-1 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Chanuka Randitha</h3>
            <img
              src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Profile"
              className="w-12 h-12 rounded-full mb-2 mx-auto"
            />
            <p>Age: 30</p>
            <p>Weight: 58 kg</p>
            <p>Height: 180 cm</p>
            <p className="mt-2">Conditions: Arthritis</p>
            <p>Allergies: Penicillin, Spores</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
