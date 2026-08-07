import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSave, FaMagic, FaClock, FaTag, FaInfoCircle, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const AdminMehandi = () => {
  const [formData, setFormData] = useState({
    mehandiType: '',
    prize: '',
    description: '',
    duration: '',
  });

  const [savedItems, setSavedItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.mehandiType || !formData.prize) return;
    
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
      mehandiType: '',
      prize: '',
      description: '',
      duration: '',
    });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      mehandiType: item.mehandiType,
      prize: item.prize,
      description: item.description,
      duration: item.duration,
    });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this mehandi entry?')) {
      setSavedItems(savedItems.filter(item => item.id !== id));
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      mehandiType: '',
      prize: '',
      description: '',
      duration: '',
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans pb-10">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-end mb-8 relative z-10"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-2">
            Mehandi Prize Management
          </h1>
          <p className="text-gray-500 font-medium">Create and manage your premium mehandi service offerings.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <div className="bg-white rounded-3xl shadow-xl shadow-pink-100/40 border border-pink-50 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/50 to-purple-200/50 rounded-bl-full -z-0"></div>
            
            <div className="p-8 relative z-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FaMagic className="text-pink-500 mr-2" /> 
                  {editingId ? 'Edit Entry' : 'Add New Entry'}
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
                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                    <FaTag className="mr-2 text-pink-400" /> Mehandi Type
                  </label>
                  <select 
                    name="mehandiType"
                    value={formData.mehandiType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all shadow-sm text-gray-800"
                    required
                  >
                    <option value="" disabled>Select mehandi type</option>
                    <option value="Bridal Mehandi">Bridal Mehandi</option>
                    <option value="Arabic Mehandi">Arabic Mehandi</option>
                    <option value="Indo-Arabic Mehandi">Indo-Arabic Mehandi</option>
                    <option value="Minimalist Design">Minimalist Design</option>
                    <option value="Portrait Mehandi">Portrait Mehandi</option>
                    <option value="Custom Design">Custom Design</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                    <span className="mr-2 text-pink-500 font-black">₹</span> Prize Amount
                  </label>
                  <input 
                    type="number" 
                    name="prize"
                    value={formData.prize}
                    onChange={handleChange}
                    placeholder="Enter prize amount"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all shadow-sm text-gray-800 font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                    <FaClock className="mr-2 text-purple-400" /> Duration
                  </label>
                  <input 
                    type="text" 
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 2-3 hours"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all shadow-sm text-gray-800"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                    <FaInfoCircle className="mr-2 text-blue-400" /> Description
                  </label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter detailed description of the design..."
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all shadow-sm resize-none text-gray-800"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-primary via-pink-500 to-purple-600 rounded-xl hover:shadow-[0_10px_20px_rgba(233,30,99,0.3)] hover:-translate-y-1 focus:outline-none overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                    <span className="relative flex items-center">
                      <FaSave className="mr-2 group-hover:scale-110 transition-transform" size={18} /> 
                      {editingId ? 'Update Entry' : 'Save Entry'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Display Section */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <div className="bg-white rounded-3xl shadow-xl shadow-pink-100/40 border border-pink-50 p-8 h-full">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Entries</h2>
            
            {savedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-pink-200 rounded-2xl bg-pink-50/50">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-pink-400 shadow-sm">
                  <FaMagic size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-800">No Mehandi Entries Yet</h3>
                <p className="text-gray-500 max-w-xs mt-2 text-sm font-medium">Fill out the form on the left to add a new mehandi prize offering.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {savedItems.map((item, index) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      layout
                      key={item.id}
                      className="p-5 rounded-2xl border border-gray-100 hover:border-pink-200 hover:shadow-lg hover:shadow-pink-100/50 transition-all duration-300 bg-white group flex flex-col md:flex-row gap-4 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-50 to-purple-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 pointer-events-none -z-0"></div>
                      
                      <div className="flex-1 relative z-10">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg text-gray-800 group-hover:text-pink-600 transition-colors">
                            {item.mehandiType}
                          </h3>
                          <span className="bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text font-extrabold text-xl">
                            ₹{item.prize}
                          </span>
                        </div>
                        {item.duration && (
                          <p className="text-sm text-gray-500 flex items-center mb-2 font-medium">
                            <FaClock className="mr-1 text-pink-400 text-xs" /> {item.duration}
                          </p>
                        )}
                        {item.description && (
                          <p className="text-gray-600 text-sm leading-relaxed mt-2 p-3 bg-gray-50 rounded-xl border border-gray-100 font-medium">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="relative z-10 flex md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-4">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="flex-1 md:flex-none flex items-center justify-center p-2 rounded-xl text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors bg-gray-50 md:bg-transparent"
                          title="Edit"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="flex-1 md:flex-none flex items-center justify-center p-2 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors bg-gray-50 md:bg-transparent"
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

export default AdminMehandi;
