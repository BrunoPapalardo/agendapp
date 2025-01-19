'use client'

import { useState } from 'react';

const categories = [
  { name: 'Barbeiro', icon: '🧔' },
  { name: 'Médico', icon: '👨‍⚕️' },
  { name: 'Manicure', icon: '💅' },
  { name: 'Dentista', icon: '🦷' },
  { name: 'Cabeleireiro', icon: '💇‍♂️' },
];

const locations = [
  { name: 'Salão XYZ', address: 'Rua ABC, 123', category: 'Cabeleireiro' },
  { name: 'Clínica ABC', address: 'Av. 1, 456', category: 'Médico' },
  { name: 'Barbearia Rio', address: 'Rua 3, 789', category: 'Barbeiro' },
  { name: 'Manicure Bela', address: 'Rua 5, 101', category: 'Manicure' },
];

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredLocations = selectedCategory
    ? locations.filter(location => location.category === selectedCategory)
    : locations;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
      {/* Filtro de Categorias */}
      <div className="flex overflow-x-auto space-x-4 mb-6">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all ${
              selectedCategory === category.name
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            <span className="text-xl">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Listagem de Locais */}
      <div className="space-y-4">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <div
              key={location.name}
              className="p-4 bg-white rounded-lg shadow-lg border"
            >
              <h2 className="text-lg font-semibold">{location.name}</h2>
              <p className="text-sm text-gray-500">{location.address}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhum local encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default App;