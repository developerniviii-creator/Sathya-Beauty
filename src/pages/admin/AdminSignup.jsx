import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserPlus, FaLock, FaEnvelope, FaSpa, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';

const AdminSignup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Passwords do not match.',
        icon: 'error',
        confirmButtonColor: '#ec4899',
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate slight delay for animation
    setTimeout(() => {
      login({ name: formData.name, email: formData.email }, 'admin');
      setIsLoading(false);
      Swal.fire({
        title: 'Account Created!',
        text: 'Welcome to the Admin Dashboard.',
        icon: 'success',
        confirmButtonColor: '#ec4899',
        background: '#fff',
        color: '#1f2937'
      }).then(() => navigate('/admin'));
    }, 800);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-3xl -z-0 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-3xl -z-0 transform -translate-x-1/3 translate-y-1/3"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white rounded-[40px] shadow-2xl shadow-pink-200/60 z-10 flex flex-col md:flex-row overflow-hidden border border-pink-100 min-h-[600px]"
      >
        {/* Left Side - Image/Branding (Hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 relative bg-gradient-to-br from-pink-400 to-primary p-12 flex-col justify-between overflow-hidden">
          {/* Overlay Image */}
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
            <img 
              src="https://images.unsplash.com/photo-1560944527-a4a429848866?auto=format&fit=crop&q=80&w=1000" 
              alt="Spa Background" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
                <FaSpa size={24} />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">Sathya Beauty</h1>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-white leading-tight mb-6">
                Join our<br/>Premium Salon<br/>Platform
              </h2>
              <p className="text-pink-50 text-lg font-medium max-w-sm">
                Register as an admin to orchestrate elegant beauty experiences and manage your elite salon.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Right Side - Signup Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
          
          <div className="text-center md:text-left mb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-primary mb-4 mx-auto md:mx-0 shadow-inner"
            >
              <FaUserPlus className="text-2xl" />
            </motion.div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Admin Registration</h2>
            <p className="text-gray-500 font-medium">Create your administrative account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-gray-700 text-sm font-bold mb-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <FaUser />
                </div>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-500/20 focus:border-primary outline-none transition-all text-gray-800 font-semibold shadow-sm"
                  placeholder="Admin Name" 
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-gray-700 text-sm font-bold mb-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <FaEnvelope />
                </div>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-500/20 focus:border-primary outline-none transition-all text-gray-800 font-semibold shadow-sm"
                  placeholder="admin@sathyabeauty.com" 
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <FaLock />
                </div>
                <input 
                  type="password" 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-500/20 focus:border-primary outline-none transition-all text-gray-800 font-semibold shadow-sm"
                  placeholder="••••••••" 
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-gray-700 text-sm font-bold mb-1">Confirm Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <FaLock />
                </div>
                <input 
                  type="password" 
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-500/20 focus:border-primary outline-none transition-all text-gray-800 font-semibold shadow-sm"
                  placeholder="••••••••" 
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="pt-2"
            >
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full relative inline-flex items-center justify-center px-8 py-3.5 font-bold text-white transition-all duration-300 bg-gradient-to-r from-pink-500 to-primary rounded-2xl hover:shadow-[0_10px_25px_rgba(236,72,153,0.4)] hover:-translate-y-1 focus:outline-none overflow-hidden disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                <span className="relative text-lg tracking-wide flex items-center">
                  {isLoading ? 'Creating Account...' : 'Register Securely'}
                </span>
              </button>
            </motion.div>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-500 font-medium">
              Already have an admin account? <a href="/admin-login" className="text-primary font-bold hover:underline">Sign In</a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSignup;
