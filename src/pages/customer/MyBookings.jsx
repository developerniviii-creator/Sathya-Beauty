import React, { useState } from 'react';
import { mockBookings } from '../../utils/dummyData';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

const MyBookings = () => {
  const [bookings, setBookings] = useState(mockBookings.filter(b => b.customer === 'Alice Smith'));

  const handleCancel = (bookingId) => {
    Swal.fire({
      title: 'Cancel Booking?',
      text: 'Are you sure you want to cancel this appointment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E91E63',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'Yes, cancel it'
    }).then((result) => {
      if (result.isConfirmed) {
        setBookings(bookings.filter(b => b.id !== bookingId));
        Swal.fire({
          title: 'Cancelled!',
          text: 'Your booking has been cancelled.',
          icon: 'success',
          confirmButtonColor: '#E91E63'
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF5F8] py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">My Bookings</h1>
          <p className="text-gray-500 mt-2">Manage your upcoming appointments and history.</p>
        </div>
        
        <div className="space-y-6">
          <AnimatePresence>
            {bookings.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm"
              >
                <div className="text-gray-400 mb-4 text-6xl">📅</div>
                <h3 className="text-xl font-bold text-gray-700">No bookings found</h3>
                <p className="text-gray-500 mt-2">You don't have any active bookings at the moment.</p>
              </motion.div>
            ) : (
              bookings.map((booking) => (
                <motion.div 
                  key={booking.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl shadow-lg border border-pink-50 p-6 md:p-8 flex flex-col md:flex-row justify-between md:items-center group"
                >
                  <div className="mb-6 md:mb-0 flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="font-mono text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-md">{booking.id}</span>
                      <span className={`px-4 py-1 rounded-full text-xs font-bold shadow-sm ${
                        booking.status === 'Completed' ? 'bg-green-100 text-green-700 border border-green-200' :
                        booking.status === 'Accepted' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      }`}>
                        {booking.status}
                      </span>
                      <span className={`px-4 py-1 rounded-full text-xs font-bold shadow-sm ${
                        booking.type === 'Home' ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'bg-primary/10 text-primary border border-primary/20'
                      }`}>
                        {booking.type} Service
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{booking.service}</h3>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 font-medium">
                      <div className="flex items-center mr-6 mb-2 sm:mb-0">
                        <span className="text-primary mr-2">📅</span> {booking.date}
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary mr-2">⏰</span> {booking.time}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end justify-between md:ml-6 min-w-[200px]">
                    
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 w-full mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total</span>
                        <span className="font-extrabold text-gray-900">₹{booking.totalPrice}</span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Paid ({booking.paymentStatus})</span>
                        <span className="font-bold text-green-600">₹{booking.advancePaid}</span>
                      </div>
                      {booking.pendingAmount > 0 && (
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                          <span className="text-xs text-primary font-bold uppercase tracking-wider">Pending</span>
                          <span className="font-extrabold text-primary">₹{booking.pendingAmount}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-3 w-full justify-end">
                      {booking.status === 'Pending' && (
                        <button 
                          onClick={() => handleCancel(booking.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors border border-red-200 flex-1 md:flex-none"
                        >
                          Cancel
                        </button>
                      )}
                      {booking.status === 'Completed' && (
                        <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-xl text-sm font-bold transition-colors border border-primary/20 flex-1 md:flex-none">
                          Write Review
                        </button>
                      )}
                      <button className="bg-gray-900 hover:bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors shadow-md flex-1 md:flex-none">
                        Details
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
