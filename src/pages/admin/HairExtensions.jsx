import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSave, FaCut, FaRulerVertical, FaRupeeSign, FaStar, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const AdminHairExtensions = () => {
  const [formData, setFormData] = useState({
    inches: '',
    mediumPrice: '',
    maximumPrice: '',
    fullCoverPrice: '',
  });

  const [savedItems, setSavedItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.inches) return;
    
    if (editingId) {
      setSavedItems(savedItems.map(item => 
        item.id === editingId ? { ...formData, id: editingId } : item
      ));
      setEditingId(null);
    } else {
      setSavedItems([
        ...savedItems, 
        { ...formData, id: Date.now() }
      ]);
    }
    
    // Reset form
    setFormData({
      inches: '',
      mediumPrice: '',
      maximumPrice: '',
      fullCoverPrice: '',
    });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      inches: item.inches,
      mediumPrice: item.mediumPrice,
      maximumPrice: item.maximumPrice,
      fullCoverPrice: item.fullCoverPrice,
    });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this hair extension entry?')) {
      setSavedItems(savedItems.filter(item => item.id !== id));
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      inches: '',
      mediumPrice: '',
      maximumPrice: '',
      fullCoverPrice: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans pb-10 relative">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center md:text-left"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight mb-3">
          Add Hair Extension Services
        </h1>
        <p className="text-gray-500 font-medium text-lg">Manage lengths and pricing for premium hair extensions.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <div className="bg-white rounded-3xl shadow-xl shadow-pink-100/40 border border-pink-50 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-purple-600"></div>
            
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaCut className="text-pink-500 mr-3" /> 
                {editingId ? 'Edit Entry' : 'New Extension Entry'}
              </h2>
              {editingId && (
                <button 
                  onClick={handleCancelEdit}
                  className="text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-200 p-2 rounded-full transition-colors text-xs flex items-center"
                >
                  <FaTimes className="mr-1" /> Cancel
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Inches */}
              <div className="relative group">
                <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                  <FaRulerVertical className="mr-2 text-pink-500" /> Length (Inches)
                </label>
                <input 
                  type="number" 
                  name="inches"
                  value={formData.inches}
                  onChange={handleChange}
                  placeholder="Enter hair extension length in inches"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all shadow-sm text-gray-800"
                  required
                />
              </div>

              {/* Medium Price */}
              <div className="relative group">
                <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                  <FaRupeeSign className="mr-2 text-purple-500" /> Medium Package Price
                </label>
                <input 
                  type="number" 
                  name="mediumPrice"
                  value={formData.mediumPrice}
                  onChange={handleChange}
                  placeholder="Enter medium package price"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all shadow-sm text-gray-800"
                  required
                />
              </div>

              {/* Maximum Price */}
              <div className="relative group">
                <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                  <FaRupeeSign className="mr-2 text-purple-500" /> Maximum Package Price
                </label>
                <input 
                  type="number" 
                  name="maximumPrice"
                  value={formData.maximumPrice}
                  onChange={handleChange}
                  placeholder="Enter maximum package price"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all shadow-sm text-gray-800"
                  required
                />
              </div>

              {/* Full Cover Price */}
              <div className="relative group">
                <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                  <FaStar className="mr-2 text-yellow-500" /> Full Cover Price
                </label>
                <input 
                  type="number" 
                  name="fullCoverPrice"
                  value={formData.fullCoverPrice}
                  onChange={handleChange}
                  placeholder="Enter full cover package price"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 outline-none transition-all shadow-sm text-gray-800"
                  required
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl hover:shadow-[0_10px_20px_rgba(236,72,153,0.4)] hover:-translate-y-1 focus:outline-none overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                  <span className="relative flex items-center text-lg tracking-wide">
                    <FaSave className="mr-3 group-hover:scale-110 transition-transform" size={20} /> 
                    {editingId ? 'Update Entry' : 'Save Entry'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Display Section */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <div className="bg-white rounded-3xl shadow-xl shadow-pink-100/40 border border-pink-50 p-8 h-full min-h-[500px]">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
              Active Offerings
            </h2>
            
            {savedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center border-2 border-dashed border-pink-200 rounded-3xl bg-pink-50/50">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-5 shadow-sm text-pink-400">
                  <FaCut size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">No Services Yet</h3>
                <p className="text-gray-500 max-w-sm mt-3 font-medium">Add hair extension lengths and their corresponding package prices on the left.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                <AnimatePresence>
                  {savedItems.map((item) => (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      layout
                      key={item.id}
                      className="p-6 rounded-3xl bg-white border border-gray-100 hover:border-pink-200 shadow-sm hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-300 group relative overflow-hidden flex flex-col md:flex-row gap-4"
                    >
                      {/* Decorative element */}
                      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

                      <div className="relative z-10 flex-1 flex flex-col xl:flex-row xl:items-center justify-between">
                        <div className="mb-4 xl:mb-0 xl:mr-4">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                              <span className="font-extrabold text-xl">{item.inches}"</span>
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-gray-800 group-hover:text-pink-600 transition-colors">
                                {item.inches} Inches Extension
                              </h3>
                              <p className="text-sm text-gray-500 font-medium">Premium Quality Hair</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 bg-pink-50/50 p-4 rounded-2xl flex-1 border border-pink-50">
                          <div className="text-center">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Medium</p>
                            <p className="font-extrabold text-gray-800">₹{item.mediumPrice}</p>
                          </div>
                          <div className="text-center border-l border-r border-pink-100 px-2 sm:px-4">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Max</p>
                            <p className="font-extrabold text-gray-800">₹{item.maximumPrice}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-bold text-purple-500 uppercase tracking-wider mb-1">Full Cover</p>
                            <p className="font-black text-purple-600">₹{item.fullCoverPrice}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative z-10 flex md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-4 mt-2 md:mt-0">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="flex-1 md:flex-none flex items-center justify-center p-3 rounded-xl text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors bg-gray-50 md:bg-transparent"
                          title="Edit"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="flex-1 md:flex-none flex items-center justify-center p-3 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors bg-gray-50 md:bg-transparent"
                          title="Delete"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHairExtensions;
