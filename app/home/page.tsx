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
  image: string;
  rating: number;
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
      { id: 1, name: 'Barbearia do João', address: 'Rua A, 123', category: { name: 'Barbeiro' }, rating: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmofOKQsM7vnvn1OIR88eeCOGYtsQKMBEv4Q&s' },
      { id: 2, name: 'Clínica Saúde Total', address: 'Av. B, 456', category: { name: 'Médico' }, rating: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFN24Eyjtcni7ox8HbV_RhD2QN8UFP2nn7ig&s'},
      { id: 3, name: 'Nail Spa', address: 'Praça C, 789', category: { name: 'Manicure' }, rating: 2, image: 'https://cptstatic.s3.amazonaws.com/imagens/enviadas/materias/materia8041/treinamento-manicure-artigos-cursos-cpt.jpg' },
      { id: 4, name: 'Casa do Nenê', address: 'Praça C, 789', category: { name: 'Barbeiro'}, rating: 99, image: 'https://psicologafabiola.com.br/wp-content/uploads/2016/07/forma-de-amar-psicologa-fabiola.jpg' },
      { id: 5, name: 'Nail Spa do Centro', address: 'Praça C, 789', category: { name: 'Manicure'}, rating: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkRiiQ-9KlJsVB9qqsuajjRQZ2e7g-pMhaag&s' },
      { id: 6, name: 'Nail Spa da pqp', address: 'Praça C, 789', category: { name: 'Manicure'}, rating: 0, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNyZBRteUmQEXO0Jl7BaxiE0PeYQV98u-mXg&s', },
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
      <link rel="icon" type="image/png" href="/public/logo.png" />

      <Header />

      {/* <div className={styles.categoryFilter}> */}
      {/* <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scroll-snap-x mandatory no-scrollbar"> */}
      <div className={`${styles.categoryFilter} flex gap-3 mb-6`}>
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
              image={location.image}
              rating={location.rating}
              category={location.category.name}
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