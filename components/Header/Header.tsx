import React from "react";
import styles from "./CategoryFilter.module.css";

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface Props {
  categories: Category[];
  onSelectCategory: (id: number) => void;
}

const Header: React.FC<Props> = ({ categories, onSelectCategory }) => {
  return (
    <div className={styles.container}>
      {categories.map((category) => (
        <button
          key={category.id}
          className={styles.categoryButton}
          onClick={() => onSelectCategory(category.id)}
        >
          <span className={styles.icon}>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Header;

// 'use client';

// const Header = () => {
//   return (
//     <div>
//       <h1>HEADER</h1>
//     </div>
//   );
// };

// export default Header;