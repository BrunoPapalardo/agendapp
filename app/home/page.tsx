'use client'

import { useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
  icon: string;
  locations: Location[];
}

interface Location {
  id: number;
  name: string;
  address: string;
  category: {
    name: string;
  };
}

const App = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    // Buscando as categorias
    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));

    // Buscando os locais
    fetch('/api/stores')
      .then((response) => response.json())
      .then((data) => setLocations(data));
  }, []);

  // Filtrar os locais com base na categoria selecionada
  const filteredLocations = selectedCategory
    ? locations.filter((location) => location.category.name === selectedCategory)
    : locations;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
      {/* Filtro de Categorias */}
      <div className="flex overflow-x-auto space-x-4 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
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
              key={location.id}
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