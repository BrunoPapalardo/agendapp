import Image from "next/image";
import React from "react";

interface Props {
  id: number;
  name: string;
  address: string;
  image: string; // Logo da loja
  rating: number; // Nota da loja (0-5)
  category: string; // Categoria da loja
}

const Store: React.FC<Props> = ({ name, address, image, rating, category }) => {
  // Função para renderizar estrelas com base na nota
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="flex bg-primary items-center rounded-xl shadow-lg border p-4 gap-4 hover:shadow-xl transition-shadow mb-4">
      {/* Imagem/logo da loja */}
      <div className="flex-shrink-0">
        <Image
          fill
          src={image}
          alt={`Logo da loja ${name}`}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full border object-cover"
        />
      </div>

      {/* Detalhes da loja */}
      <div className="flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{address}</p>
        <p className="text-xs text-gray-400 mt-1">{category}</p>

        {/* Nota da loja */}
        <div className="flex items-center mt-2">
          <div className="flex">{renderStars(rating)}</div>
          <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
        </div>
      </div>
    </div>
  );
};

export default Store;