'use client';

import React, { useState } from "react";
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import './Header.module.css';  // Ajuste o caminho conforme necessário

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const toggleMenu = () => {
    if (menuOpen) {
      setClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setClosing(false);
      }, 300); // Tempo da animação
    } else {
      setMenuOpen(true);
    }
  };

  const closeMenu = () => {
    if (!menuOpen) return;
    setClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setClosing(false);
    }, 300); // Tempo da animação
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-purple-600"/>
            <span className="text-xl font-bold text-gray-900">Agendou!</span>
          </Link>
          <button
            onClick={toggleMenu}
            className="bg-white text-blue-600 border-none text-[20px] w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 active:scale-95"
            aria-label="Menu do usuário"
          >
            <User className="h-8 w-8 text-purple-600"/> 
          </button>
          {menuOpen && (
              <div className="fixed inset-0 w-full h-full bg-black/50 z-[1000] flex justify-end opacity-100 transition-opacity duration-300 ease-in-out" onClick={closeMenu}>
                <div
                  className={`$"w-4/5 max-w-[300px] h-full bg-white text-black flex flex-col p-5 relative shadow-lg translate-x-full" ${
                    closing ? "closing" : "opening"
                  }`}
                  onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro do menu
                >
                  <button
                    className="bg-transparent border-none text-[20px] absolute top-2 right-2 cursor-pointer"
                    onClick={closeMenu}
                    aria-label="Fechar"
                  >
                    ✖
                  </button>
                  <ul className="slideMenu">
                    <li>Perfil</li>
                    <li>Meus Favoritos</li>
                    <li>Configurações</li>
                    <li>Sair</li>
                  </ul>
                </div>
              </div>
            )}
          
        </div>
      </div>
    </header>
  );
}

export default Home;  // Alterado para exportação default