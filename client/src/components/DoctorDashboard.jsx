import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Dr.ohn Doe",
    role: "Doctor",
  };
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    setAppointments([
      {
        id: 1,
        patient: "chanuka Randitha",
        time: "10.00 AM",
        date: "2025-08-30",
        status: "confirmed",
      },
      {
        id: 1,
        patient: "saman bandara",
        time: "8.00 AM",
        date: "2025-08-30",
        status: "pending",
      },
      {
        id: 1,
        patient: "mahesh perera",
        time: "4.00 PM",
        date: "2025-09-02",
        status: "confirmed",
      },
    ]);

    setChartData({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Appointments",
          data: [5, 3, 7, 4, 6],
          backgroundColor: "rgba(75,192,192,0.6)",
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
    { name: "Appointment", icon: "📅", active: true },
    { name: "Patient", icon: "👤" },
    { name: "Schedule", icon: "👤" },
    { name: "Profile", icon: "🩺" },
  ];
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-6 flex flex-col">
        <div className="mb-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrx8lA0XpmKw_o96dUJMnQ4lpNOJ_4N2hvBA&s"
            alt="Logo"
            className="mb-4"
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
          <h2 className="text-xl font-semibold">Doctor Dashboard</h2>
          <div className="flex items-center space-x-2">
            <img
              src="https://static.vecteezy.com/system/resources/previews/026/375/249/non_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span>{user.name}</span>
            <button className="bg-blue-500 text-white px-2 py-1 rounded">
              🔵
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">
              Upcoming Appointments
            </h3>
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="flex justify-between mb-2 p-2 border-b"
              >
                <span>{appt.patient}</span>
                <span>
                  {appt.time} - {appt.date}
                </span>
                <span
                  className={
                    appt.status === "Confirmed"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }
                >
                  {appt.status}
                </span>
              </div>
            ))}
          </div>

          {/* Patient Details */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Patient Details</h3>
            <p>Name: Alice Smith</p>
            <p>Age: 34</p>
            <p>Last Visit: 2025-08-25</p>
            <p>Conditions: Hypertension</p>
          </div>

          {/* Schedule Overview */}
          <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-2">Schedule Overview</h3>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: false },
                },
              }}
            />
          </div>

          {/* Notifications */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Notifications</h3>
            <p>New patient message: Please review Alice Smith's file.</p>
            <p>Appointment reminder for 11:00 AM today.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
