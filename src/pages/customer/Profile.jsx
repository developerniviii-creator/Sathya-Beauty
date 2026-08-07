import React from 'react';
import { FaUserEdit, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Profile = () => {
  return (
    <div className="container mx-auto px-6 py-12 flex justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-primary to-secondary h-32 relative">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-500 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-16 pb-8 px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Alice Smith</h2>
          <p className="text-gray-500 mb-6">Premium Member</p>
          
          <div className="space-y-4 max-w-md mx-auto text-left mb-8">
            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <FaEnvelope className="text-primary mr-4" />
              <span>alice.smith@example.com</span>
            </div>
            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <FaPhone className="text-primary mr-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <FaMapMarkerAlt className="text-primary mr-4" />
              <span>123 Beauty Ave, Chennai, Tamil Nadu</span>
            </div>
          </div>
          
          <button className="bg-gray-900 hover:bg-primary text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center mx-auto shadow-md">
            <FaUserEdit className="mr-2" /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
