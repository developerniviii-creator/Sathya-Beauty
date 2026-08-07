import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockPackages } from '../../utils/dummyData';
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes, FaSave, FaMinusCircle } from 'react-icons/fa';

const AdminPackages = () => {
  const [packages, setPackages] = useState(mockPackages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentPackage, setCurrentPackage] = useState(null);

  const defaultServiceDetail = {
    serviceName: '',
    hand: '',
    leg: '',
    sittings: '',
    times: ''
  };

  const defaultPackage = {
    id: '',
    name: '',
    price: '',
    duration: '',
    description: '',
    serviceDetails: [{ ...defaultServiceDetail }], // Array of specific service objects
    services: [] // For backward compatibility
  };

  const handleOpenAdd = () => {
    setModalMode('add');
    setCurrentPackage({ ...defaultPackage, serviceDetails: [{ ...defaultServiceDetail }] });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pkg) => {
    setModalMode('edit');
    // If the package being edited doesn't have serviceDetails, generate one empty block
    const editPkg = { ...defaultPackage, ...pkg };
    if (!editPkg.serviceDetails || editPkg.serviceDetails.length === 0) {
      editPkg.serviceDetails = [{ ...defaultServiceDetail }];
    }
    setCurrentPackage(editPkg);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setCurrentPackage(null), 300);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPackage(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceDetailChange = (index, field, value) => {
    const updatedDetails = [...currentPackage.serviceDetails];
    updatedDetails[index][field] = value;
    setCurrentPackage(prev => ({ ...prev, serviceDetails: updatedDetails }));
  };

  const addServiceBlock = () => {
    setCurrentPackage(prev => ({
      ...prev,
      serviceDetails: [...prev.serviceDetails, { ...defaultServiceDetail }]
    }));
  };

  const removeServiceBlock = (index) => {
    const updatedDetails = [...currentPackage.serviceDetails];
    updatedDetails.splice(index, 1);
    setCurrentPackage(prev => ({ ...prev, serviceDetails: updatedDetails }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Auto-generate services array for backward-compatibility display if needed
    const generatedServices = currentPackage.serviceDetails.map(detail => {
      let str = detail.serviceName || 'Unnamed Service';
      let extras = [];
      if (detail.hand) extras.push(`Hand: ${detail.hand}`);
      if (detail.leg) extras.push(`Leg: ${detail.leg}`);
      if (detail.sittings) extras.push(`Sittings: ${detail.sittings}`);
      if (detail.times) extras.push(`Times: ${detail.times}`);
      
      if (extras.length > 0) {
        str += ` (${extras.join(', ')})`;
      }
      return str;
    });
    
    const finalPackage = {
      ...currentPackage,
      services: generatedServices.length > 0 ? generatedServices : currentPackage.services
    };

    if (modalMode === 'add') {
      finalPackage.id = `P${Date.now()}`;
      setPackages([...packages, finalPackage]);
    } else {
      setPackages(packages.map(p => p.id === currentPackage.id ? finalPackage : p));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  return (
    <div className="relative font-sans min-h-[80vh] pb-10">
      {/* Abstract Backgrounds (kept for subtle flair, though the bg is already light) */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl -z-10"></div>

      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">Manage Packages</h1>
          <p className="text-gray-500 mt-2 font-medium">Create and manage your service packages.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md shadow-pink-200/50 hover:shadow-lg text-white px-6 py-3 rounded-xl flex items-center transition-all duration-300 transform hover:-translate-y-1 font-bold"
        >
          <FaPlus className="mr-2" /> Create Package
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        <AnimatePresence>
          {packages.map((pkg) => (
            <motion.div 
              key={pkg.id} 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-xl shadow-pink-100/40 border border-pink-50 flex overflow-hidden group hover:shadow-2xl hover:shadow-pink-200/50 transition-all duration-300"
            >
              <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-primary group-hover:text-pink-600 transition-colors">{pkg.name}</h3>
                  <span className="text-xl font-extrabold text-primary">₹{pkg.price}</span>
                </div>
                <p className="text-sm text-gray-500 font-medium mb-4">{pkg.duration} • {pkg.serviceDetails?.length || pkg.services?.length || 0} Services Included</p>
                
                {pkg.description && (
                  <p className="text-gray-600 mb-4 text-sm italic border-l-2 border-primary pl-3">{pkg.description}</p>
                )}

                <ul className="space-y-3 mb-4">
                  {/* Prioritize detailed rendering if available, else fallback to standard string array */}
                  {pkg.serviceDetails && pkg.serviceDetails.length > 0 
                    ? pkg.serviceDetails.map((sd, index) => (
                        <li key={index} className="text-sm text-gray-700 font-medium">
                          <div className="flex items-center">
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                              <FaCheck className="text-green-500 text-xs" />
                            </div>
                            <span className="font-bold text-primary">{sd.serviceName || 'Service'}</span>
                          </div>
                          <div className="ml-8 mt-1 text-xs text-gray-500 grid grid-cols-2 gap-1 font-medium">
                            {sd.hand && <div>Hand: {sd.hand}</div>}
                            {sd.leg && <div>Leg: {sd.leg}</div>}
                            {sd.sittings && <div>Sittings: {sd.sittings}</div>}
                            {sd.times && <div>Times: {sd.times}</div>}
                          </div>
                        </li>
                      ))
                    : pkg.services?.map((service, index) => (
                        <li key={index} className="text-sm text-gray-700 font-medium flex items-center">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                            <FaCheck className="text-green-500 text-xs" />
                          </div>
                          {service}
                        </li>
                      ))
                  }
                </ul>
              </div>
              
              <div className="bg-pink-50/50 flex flex-col justify-center border-l border-pink-50 p-4 space-y-4">
                <button 
                  onClick={() => handleOpenEdit(pkg)}
                  className="text-gray-500 hover:text-pink-600 p-3 rounded-xl hover:bg-white transition-colors shadow-sm bg-white/50" 
                  title="Edit"
                >
                  <FaEdit size={20} />
                </button>
                <button 
                  onClick={() => handleDelete(pkg.id)}
                  className="text-gray-500 hover:text-red-500 p-3 rounded-xl hover:bg-white transition-colors shadow-sm bg-white/50" 
                  title="Delete"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
              onClick={handleCloseModal}
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-3xl p-8 shadow-2xl shadow-pink-200/50 relative z-10 border border-pink-100 max-h-[90vh] flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-primary">
                  {modalMode === 'add' ? 'Create New Package' : 'Edit Package'}
                </h2>
                <button 
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-primary bg-gray-50 hover:bg-pink-50 p-2 rounded-full transition-colors"
                >
                  <FaTimes size={18} />
                </button>
              </div>
              
              <div className="overflow-y-auto pr-4 flex-1 custom-scrollbar">
                <form id="package-form" onSubmit={handleSubmit} className="space-y-8 pb-4">
                  {/* Basic Info */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Package Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={currentPackage?.name || ''} 
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all shadow-sm text-gray-800"
                      placeholder="e.g. Bridal Beauty Pack"
                    />
                  </div>

                  {/* Dynamic Services Array */}
                  <div>
                    <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                      <h3 className="text-lg font-bold text-primary">Services in Package</h3>
                    </div>
                    
                    <div className="space-y-6">
                      {currentPackage?.serviceDetails?.map((serviceDetail, index) => (
                        <div key={index} className="bg-pink-50/40 p-6 rounded-2xl border border-pink-100 relative">
                          <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 text-primary rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                            {index + 1}
                          </div>
                          
                          {currentPackage.serviceDetails.length > 1 && (
                            <button 
                              type="button"
                              onClick={() => removeServiceBlock(index)}
                              className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
                            >
                              <FaMinusCircle size={20} />
                            </button>
                          )}

                          <div className="pt-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Service Name</label>
                            <input 
                              type="text" 
                              value={serviceDetail.serviceName}
                              onChange={(e) => handleServiceDetailChange(index, 'serviceName', e.target.value)}
                              required
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all shadow-sm mb-4 text-gray-800"
                              placeholder="e.g. Bridal Mehandi"
                            />
                            
                            <label className="block text-sm font-bold text-gray-700 mb-2">Service Description (Optional)</label>
                            <textarea 
                              value={serviceDetail.description || ''}
                              onChange={(e) => handleServiceDetailChange(index, 'description', e.target.value)}
                              rows="2"
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all shadow-sm resize-none text-gray-800"
                              placeholder="Brief details about this specific service..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      type="button"
                      onClick={addServiceBlock}
                      className="mt-4 flex items-center text-pink-600 font-bold hover:text-pink-800 transition-colors bg-pink-50 px-4 py-2 rounded-xl border border-pink-100"
                    >
                      <FaPlus className="mr-2" /> Add More Services
                    </button>
                  </div>
                  
                  {/* Pricing and Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Total Prize (₹)</label>
                      <input 
                        type="number" 
                        name="price"
                        value={currentPackage?.price || ''} 
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all shadow-sm font-bold text-pink-600"
                        placeholder="e.g. 5000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Total Duration</label>
                      <input 
                        type="text" 
                        name="duration"
                        value={currentPackage?.duration || ''} 
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all shadow-sm text-gray-800"
                        placeholder="e.g. 5 hours"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea 
                      name="description"
                      value={currentPackage?.description || ''} 
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all shadow-sm resize-none text-gray-800"
                      placeholder="Enter detailed description of the package..."
                    />
                  </div>
                </form>
              </div>

              <div className="pt-6 mt-2 border-t border-gray-100">
                <button 
                  type="submit"
                  form="package-form"
                  className="w-full group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl hover:shadow-[0_10px_20px_rgba(236,72,153,0.4)] hover:-translate-y-1 focus:outline-none overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                  <span className="relative flex items-center text-lg tracking-wide">
                    <FaSave className="mr-3 group-hover:scale-110 transition-transform" size={20} /> 
                    {modalMode === 'add' ? 'Save Package' : 'Update Package'}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPackages;
