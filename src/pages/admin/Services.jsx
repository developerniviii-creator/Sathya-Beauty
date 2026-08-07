import React, { useState } from 'react';
import { mockServices } from '../../utils/dummyData';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ServiceRow = ({ service, handleOpenEdit, handleDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr className="hover:bg-pink-50/50 transition-colors">
        <td className="p-5 flex items-center space-x-4">
          <img src={service.image} alt={service.name} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
          <div>
            <p className="font-extrabold text-primary">{service.name}</p>
            <p className="text-sm font-medium text-gray-500 hidden md:block">{service.status}</p>
          </div>
        </td>
        <td className="p-5 font-medium text-gray-600">{service.category}</td>
        <td className="p-5 font-black text-primary hidden md:table-cell">₹{service.price}</td>
        <td className="p-5 font-medium text-gray-600 hidden md:table-cell">{service.duration}</td>
        <td className="p-5 text-center hidden md:table-cell">
          <button 
            onClick={() => handleOpenEdit(service)}
            className="text-blue-500 hover:text-blue-700 mx-2 p-2 rounded-full hover:bg-blue-50 transition-colors" 
            title="Edit"
          >
            <FaEdit size={18} />
          </button>
          <button 
            onClick={() => handleDelete(service.id)}
            className="text-red-500 hover:text-red-700 mx-2 p-2 rounded-full hover:bg-red-50 transition-colors" 
            title="Delete"
          >
            <FaTrash size={18} />
          </button>
        </td>
        <td className="p-5 md:hidden text-right">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary p-2 bg-pink-50 hover:bg-pink-100 transition-colors rounded-lg flex items-center justify-center w-full"
          >
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            <span className="ml-2 text-xs font-bold">Details</span>
          </button>
        </td>
      </tr>
      
      {/* Mobile Expanded Details */}
      {isExpanded && (
        <tr className="md:hidden bg-gray-50/50">
          <td colSpan="3" className="p-5 border-t border-gray-100 shadow-inner">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">Price</p>
                <p className="font-black text-primary text-sm">₹{service.price}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">Duration</p>
                <p className="font-medium text-gray-600 text-sm">{service.duration}</p>
              </div>
              <div className="col-span-2 pt-2 border-t border-gray-100 mt-1">
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">Status</p>
                <span className={`inline-block px-3 py-1 rounded-xl text-xs font-bold shadow-sm ${
                  service.status === 'Active' ? 'bg-green-100 text-green-700 border border-green-200' :
                  'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {service.status}
                </span>
              </div>
              <div className="col-span-2 pt-3 border-t border-gray-200 mt-2 flex space-x-3">
                <button 
                  onClick={() => handleOpenEdit(service)}
                  className="flex-1 flex items-center justify-center bg-blue-50 text-blue-600 py-2 rounded-lg font-bold text-sm"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(service.id)}
                  className="flex-1 flex items-center justify-center bg-red-50 text-red-600 py-2 rounded-lg font-bold text-sm"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const AdminServices = () => {
  const [services, setServices] = useState(mockServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentService, setCurrentService] = useState(null);

  const defaultService = {
    id: '',
    name: '',
    category: '',
    price: '',
    duration: '',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1560944527-a4a429848866?auto=format&fit=crop&q=80&w=200'
  };

  const handleOpenAdd = () => {
    setModalMode('add');
    setCurrentService({ ...defaultService });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service) => {
    setModalMode('edit');
    setCurrentService({ ...service });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentService(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentService(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newService = {
        ...currentService,
        id: `S${Date.now()}`
      };
      setServices([...services, newService]);
    } else {
      setServices(services.map(s => s.id === currentService.id ? currentService : s));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  return (
    <div className="relative font-sans pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">Manage Services</h1>
        <button 
          onClick={handleOpenAdd}
          className="bg-primary hover:bg-secondary text-white px-5 py-2.5 rounded-xl flex items-center transition-all shadow-md shadow-pink-200 hover:-translate-y-0.5"
        >
          <FaPlus className="mr-2" /> Add Service
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-pink-100/40 border border-pink-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pink-50/30 border-b border-pink-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <th className="p-5">Service</th>
                <th className="p-5">Category</th>
                <th className="p-5 hidden md:table-cell">Price</th>
                <th className="p-5 hidden md:table-cell">Duration</th>
                <th className="p-5 text-center hidden md:table-cell">Actions</th>
                <th className="p-5 md:hidden">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.map((service) => (
                <ServiceRow 
                  key={service.id} 
                  service={service} 
                  handleOpenEdit={handleOpenEdit} 
                  handleDelete={handleDelete} 
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 md:p-8 shadow-2xl shadow-pink-200/50 transform transition-all border border-pink-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-extrabold text-primary">
                {modalMode === 'add' ? 'Add New Service' : 'Edit Service'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-primary bg-gray-50 hover:bg-pink-50 p-2 rounded-full transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Service Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={currentService?.name || ''} 
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-gray-800"
                  placeholder="e.g. Advanced Facial"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
                  <input 
                    type="text" 
                    name="category"
                    value={currentService?.category || ''} 
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-gray-800"
                    placeholder="e.g. Skin Care"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Price (₹)</label>
                  <input 
                    type="number" 
                    name="price"
                    value={currentService?.price || ''} 
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-gray-800"
                    placeholder="e.g. 1500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Duration</label>
                  <input 
                    type="text" 
                    name="duration"
                    value={currentService?.duration || ''} 
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-gray-800"
                    placeholder="e.g. 45 mins"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Status</label>
                  <select
                    name="status"
                    value={currentService?.status || 'Active'}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-gray-800"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-4">
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full md:w-auto px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-full md:w-auto px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-secondary transition-colors font-bold shadow-md shadow-pink-200"
                >
                  {modalMode === 'add' ? 'Save Service' : 'Update Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
