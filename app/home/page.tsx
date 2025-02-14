'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Star } from 'lucide-react';
import { businesses, categories } from '../../public/data';
import Header from '../../components/Header/Header';
import Image from 'next/image';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBusinesses = businesses.filter(business => {
    const matchesCategory = selectedCategory ? business.category === selectedCategory : true;
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Buscar estabelecimentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === ''
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCategory === category.name
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Business List */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {filteredBusinesses.map((business) => (
            <Link
              key={business.id}
              href={`/business/${business.code}`}
              className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-24 w-full relative rounded-t-lg overflow-hidden">
                <Image
                  src={business.image}
                  alt={business.name}
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-md font-medium text-gray-900 overflow-hidden text-ellipsis">{business.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{business.category}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  {business.address}
                </div>
                <div className="mt-2 flex items-center">
                  <Star className="text-yellow-400 h-4 w-4" />
                  <span className="ml-1 text-sm text-gray-600">{business.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;  // Alterado para exportação default