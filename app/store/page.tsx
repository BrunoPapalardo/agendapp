'use client';
// import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import Header from "@/components/Header/Header";
import { useState } from "react";
import Image from 'next/image';

const Store = () => {
  const [showReviews, setShowReviews] = useState(false);

  const storeInfo = {
    name: "Paps",
    logo: "https://via.placeholder.com/150", // Exemplo de logo
    phone: "+55 11 99999-9999",
    address: "Rua das Flores, 123, Centro - São Paulo, SP",
    instagram: "https://www.instagram.com/papsstore",
    whatsapp: "https://wa.me/5511999999999",
    map: "https://www.google.com/maps?q=Rua+das+Flores,+123,+Centro,+São+Paulo,+SP",
  };

  const reviews = [
    { user: "Ana", rating: 4, comment: "Ótimo serviço! Recomendo." },
    { user: "Carlos", rating: 5, comment: "Atendimento excelente!" },
    { user: "Joana", rating: 3, comment: "Boa loja, mas poderia melhorar." },
  ];

  const products = [
    { 
      name: "Produto 1", 
      price: "R$ 50,00", 
      description: "Descrição do Produto 1", 
      image: "https://via.placeholder.com/200" 
    },
    { 
      name: "Produto 2", 
      price: "R$ 80,00", 
      description: "Descrição do Produto 2", 
      image: "https://via.placeholder.com/200" 
    },
    { 
      name: "Produto 3", 
      price: "R$ 120,00", 
      description: "Descrição do Produto 3", 
      image: "https://via.placeholder.com/200" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4">
        {/* Informações da loja */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex flex-col items-center">
          <Image fill src={storeInfo.logo} alt="Logo da loja" className="w-32 h-32 object-contain mb-4" />
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">{storeInfo.name}</h1>
          <p className="text-lg text-gray-600 mb-2">{storeInfo.address}</p>
          <p className="text-lg text-gray-600 mb-4">{storeInfo.phone}</p>

          {/* Botões de redes sociais e contato */}
          <div className="flex gap-4 mb-4">
            <a
              href={storeInfo.instagram}
              className="bg-gradient-to-r from-blue-500 to-pink-500 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-blue-400"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a
              href={storeInfo.whatsapp}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-green-400"
            >
              <i className="fab fa-whatsapp text-xl"></i>
            </a>
            <a
              href={`tel:${storeInfo.phone}`}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-yellow-400"
            >
              <i className="fas fa-phone-alt text-xl"></i>
            </a>
            <a
              href={storeInfo.map}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-indigo-400"
            >
              <i className="fas fa-map-marker-alt text-xl"></i>
            </a>
          </div>
        </div>

        {/* Produtos */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Produtos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-primary p-4 rounded-lg shadow-md">
                <Image fill src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-lg text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-semibold text-gray-900">{product.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Avaliações - Aba toggle */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <button
            onClick={() => setShowReviews(!showReviews)}
            className="w-full text-left text-xl font-semibold text-gray-800 mb-4"
          >
            {showReviews ? 'Ocultar Avaliações' : 'Ver Avaliações'}
          </button>
          {showReviews && (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-800">{review.user}</span>
                    <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;