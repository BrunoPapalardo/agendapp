'use client';
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";

const categories = [
  { id: 1, name: "Barbeiro", icon: "💈" },
  { id: 2, name: "Médico", icon: "🩺" },
  { id: 3, name: "Manicure", icon: "💅" },
];

const Paps = () => {
  const handleCategorySelect = (id: number) => {
    console.log(`Categoria selecionada: ${id}`);
  };
  
  return (
    <div>
      <CategoryFilter
        categories={categories}
        onSelectCategory={handleCategorySelect}
      />
      <h1>Paps</h1>
    </div>
  );
};

export default Paps;