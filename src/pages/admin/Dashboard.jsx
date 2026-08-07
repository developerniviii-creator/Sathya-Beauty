import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaCalendarCheck, 
  FaMoneyBillWave, 
  FaCut, 
  FaChartLine, 
  FaArrowUp, 
  FaClock 
} from 'react-icons/fa';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Customers', value: '1,234', icon: <FaUsers size={24} />, color: 'bg-blue-500', trend: '+12%', isPositive: true },
    { title: 'Total Bookings', value: '856', icon: <FaCalendarCheck size={24} />, color: 'bg-purple-500', trend: '+5%', isPositive: true },
    { title: 'Total Revenue', value: '₹1.2M', icon: <FaMoneyBillWave size={24} />, color: 'bg-green-500', trend: '+18%', isPositive: true },
    { title: 'Total Services', value: '45', icon: <FaCut size={24} />, color: 'bg-pink-500', trend: '0%', isPositive: true },
  ];

  const recentBookings = [
    { id: '#B001', customer: 'Alice Johnson', service: 'Bridal Makeup', date: 'Oct 25, 2026', status: 'Pending', amount: '₹15,000' },
    { id: '#B002', customer: 'Sarah Smith', service: 'Hair Coloring', date: 'Oct 26, 2026', status: 'Confirmed', amount: '₹3,500' },
    { id: '#B003', customer: 'Priya Patel', service: 'Facial & Spa', date: 'Oct 26, 2026', status: 'Completed', amount: '₹2,800' },
    { id: '#B004', customer: 'Anita Roy', service: 'Manicure & Pedicure', date: 'Oct 27, 2026', status: 'Pending', amount: '₹1,500' },
  ];

  const topServices = [
    { name: 'Bridal Makeup', bookings: 124, revenue: '₹1.8M', progress: 85 },
    { name: 'Keratin Treatment', bookings: 98, revenue: '₹490K', progress: 70 },
    { name: 'Advanced Facial', bookings: 156, revenue: '₹312K', progress: 65 },
    { name: 'Hair Coloring', bookings: 210, revenue: '₹735K', progress: 90 },
  ];

  return (
    <div className="space-y-8 font-sans pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1 font-medium">Welcome back! Here's the overall details about the site.</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center bg-white px-5 py-2.5 rounded-xl shadow-sm border border-pink-100">
          <FaClock className="text-primary mr-2" />
          <span className="text-sm font-bold text-gray-600">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-xl shadow-pink-100/40 border border-pink-50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-200/50 transition-all duration-300 relative overflow-hidden group"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 ${stat.color} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
            <div className="flex justify-between items-start relative z-10">
              <div>
                <h3 className="text-gray-500 text-sm font-bold mb-1 uppercase tracking-wider">{stat.title}</h3>
                <p className="text-3xl font-black text-primary">{stat.value}</p>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${stat.color} shadow-pink-200/50`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-5 flex items-center text-sm relative z-10">
              <span className={`flex items-center font-bold px-2 py-1 rounded-md ${stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {stat.isPositive && <FaArrowUp className="mr-1 text-xs" />}
                {stat.trend}
              </span>
              <span className="text-gray-400 ml-2 font-medium">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl shadow-pink-100/40 border border-pink-50 overflow-hidden">
          <div className="px-6 py-5 border-b border-pink-50 flex justify-between items-center bg-pink-50/30">
            <h2 className="text-lg font-extrabold text-primary">Recent Bookings</h2>
            <button className="text-primary text-sm font-bold hover:text-secondary transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-4">Booking ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.map((booking, i) => (
                  <tr key={i} className="hover:bg-pink-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-gray-700">{booking.id}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-600">{booking.customer}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-500">{booking.service}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                        booking.status === 'Completed' ? 'bg-green-100 text-green-700 border border-green-200' :
                        booking.status === 'Pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                        'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-primary">{booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Services Performance */}
        <div className="bg-white rounded-3xl shadow-xl shadow-pink-100/40 border border-pink-50 overflow-hidden">
          <div className="px-6 py-5 border-b border-pink-50 flex justify-between items-center bg-pink-50/30">
            <h2 className="text-lg font-extrabold text-primary flex items-center">
              <FaChartLine className="mr-2 text-primary" /> Top Services
            </h2>
          </div>
          <div className="p-6 space-y-7">
            {topServices.map((service, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">{service.name}</h4>
                    <p className="text-xs text-gray-400 font-medium mt-1">{service.bookings} bookings</p>
                  </div>
                  <span className="text-sm font-black text-primary">{service.revenue}</span>
                </div>
                <div className="w-full bg-pink-100/50 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full relative" 
                    style={{ width: `${service.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full h-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
