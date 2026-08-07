import React from 'react';
import { FaEye, FaEnvelope, FaBan } from 'react-icons/fa';

const AdminCustomers = () => {
  const dummyCustomers = [
    { id: 'CUST-001', name: 'Alice Smith', email: 'alice.smith@example.com', phone: '+91 9876543210', totalBookings: 5, status: 'Active' },
    { id: 'CUST-002', name: 'Emily Johnson', email: 'emily.j@example.com', phone: '+91 8765432109', totalBookings: 2, status: 'Active' },
    { id: 'CUST-003', name: 'Sarah Connor', email: 's.connor@example.com', phone: '+91 7654321098', totalBookings: 12, status: 'Premium' },
  ];

  return (
    <div className="pb-10 font-sans relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <h1 className="text-3xl font-extrabold text-primary mb-6 tracking-tight">Customer Directory</h1>
      
      <div className="bg-white rounded-3xl shadow-xl shadow-pink-100/40 border border-pink-50 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-pink-50/50 border-b border-pink-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
              <th className="p-5">Customer</th>
              <th className="p-5">Contact</th>
              <th className="p-5">Total Bookings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {dummyCustomers.map((cust) => (
              <tr key={cust.id} className="hover:bg-pink-50/30 transition-colors">
                <td className="p-5">
                  <p className="font-extrabold text-gray-800 text-lg">{cust.name}</p>
                  <p className="text-xs font-bold text-gray-400 mt-1 uppercase">{cust.id}</p>
                </td>
                <td className="p-5">
                  <p className="text-gray-600 font-medium">{cust.email}</p>
                  <p className="text-gray-500 font-bold text-sm mt-1">{cust.phone}</p>
                </td>
                <td className="p-5">
                  <span className="bg-pink-50 text-pink-600 font-extrabold px-4 py-2 rounded-xl border border-pink-100">
                    {cust.totalBookings} Bookings
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;
