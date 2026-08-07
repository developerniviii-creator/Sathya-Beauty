import React from 'react';
import { Link } from 'react-router-dom';
import { mockOffers } from '../../utils/dummyData';
import { FaPercent, FaClock } from 'react-icons/fa';

const Offers = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex items-center justify-center mb-8">
        <FaPercent className="text-4xl text-primary mr-4" />
        <h1 className="text-4xl font-bold text-gray-800">Special Offers</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockOffers.map((offer) => (
          <div key={offer.id} className="relative bg-gradient-to-r from-primary to-secondary rounded-2xl p-1 shadow-xl overflow-hidden group">
            <div className="absolute top-0 right-0 bg-white text-primary font-bold px-4 py-1 rounded-bl-xl z-10">
              Limited Time
            </div>
            <div className="bg-white rounded-xl p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">{offer.name}</h3>
                <p className="text-gray-600 mb-6">{offer.description}</p>
                <div className="flex items-end space-x-4 mb-4">
                  <span className="text-4xl font-extrabold text-gray-900">₹{offer.offerPrice}</span>
                  <span className="text-xl text-gray-400 line-through mb-1">₹{offer.originalPrice}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <FaClock className="mr-2 text-primary" />
                  Valid until {offer.validUntil}
                </div>
                <Link to="/book" className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Claim Offer
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
