'use client';

import { useEffect, useState } from 'react';
import Header from "@/components/Header/Header";
import Store from "@/components/Store/Store";
import styles from "./Home.module.css";

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
    // Dados fictícios
    const mockCategories: Category[] = [
      { id: 1, name: 'Barbeiro', icon: '💈', locations: [] },
      { id: 2, name: 'Médico', icon: '🩺', locations: [] },
      { id: 3, name: 'Manicure', icon: '💅', locations: [] },
      { id: 4, name: 'Restaurante', icon: '🍴', locations: [] },
      { id: 5, name: 'Cabelereiro', icon: '✂️', locations: [] },
      { id: 6, name: 'Academia', icon: '🏋️', locations: [] },
    ];

    const mockLocations: Location[] = [
      { id: 1, name: 'Barbearia do João', address: 'Rua A, 123', category: { name: 'Barbeiro' } },
      { id: 2, name: 'Clínica Saúde Total', address: 'Av. B, 456', category: { name: 'Médico' } },
      { id: 3, name: 'Nail Spa', address: 'Praça C, 789', category: { name: 'Manicure' } },
      { id: 4, name: 'Casa do Nenê', address: 'Praça C, 789', category: { name: 'Barbeiro' } },
      { id: 5, name: 'Nail Spa do Centro', address: 'Praça C, 789', category: { name: 'Manicure' } },
      { id: 6, name: 'Nail Spa da pqp', address: 'Praça C, 789', category: { name: 'Manicure' } },
    ];

    mockCategories.forEach((category) => {
      category.locations = mockLocations.filter(
        (location) => location.category.name === category.name
      );
    });

    setCategories(mockCategories);
    setLocations(mockLocations);
  }, []);

  const filteredLocations = selectedCategory
    ? locations.filter((location) => location.category.name === selectedCategory)
    : locations;

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.categoryFilter}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className={`${styles.categoryButton} ${selectedCategory === category.name ? styles.selected : ''}`}
          >
            <span className={styles.categoryIcon}>{category.icon}</span>
            <span className={styles.categoryName}>{category.name}</span>
          </button>
        ))}
      </div>

      <div className={styles.locationList}>
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <Store
              key={location.id}
              id={location.id}
              name={location.name}
              address={location.address}
            />
          ))
        ) : (
          <p className={styles.noLocations}>Nenhum local encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default App;