'use client';
import Header from "@/components/Header/Header";

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
      <Header>
        categories={categories}
        onSelectCategory={handleCategorySelect}
      </Header>
      <h1>Paps</h1>
    </div>
  );
};

export default Paps;