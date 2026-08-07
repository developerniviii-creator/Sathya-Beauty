import React from 'react';
import { Link } from 'react-router-dom';
import { mockPackages } from '../../utils/dummyData';
import { FaCheck } from 'react-icons/fa';

const Packages = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Premium Packages</h1>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Discover our carefully curated beauty packages designed to give you the ultimate pampering experience at an incredible value.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {mockPackages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-primary/10 p-8 text-center border-b border-primary/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{pkg.duration}</p>
              <div className="text-4xl font-extrabold text-primary">₹{pkg.price}</div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <p className="text-gray-600 mb-6 italic">{pkg.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {pkg.services.map((service, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <FaCheck className="text-green-500 mr-3 shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
              <Link to="/book" state={{ service: pkg.name, price: pkg.price }} className="block text-center w-full bg-gray-900 hover:bg-primary text-white font-bold py-3 rounded-lg transition-colors shadow-md">
                Select Package
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
