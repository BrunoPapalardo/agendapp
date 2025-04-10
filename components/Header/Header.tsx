'use client';

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import UserMenu from '../UserMenu/UserMenu'; // Componente do menu do usuário
import Image from "next/image";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { status } = useSession(); // Verifica autenticação

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="flex items-center">
            {/* <Calendar className="h-8 w-8 text-purple-600"/> */}
            <Image
              src='/img/logo.png'
              alt='logo'
              className="w-8 h-8 object-cover"
              width={100}
              height={100}
            />
            <span className="text-xl font-bold text-gray-900">enday</span>
          </Link>

          {/* Botão do usuário sempre visível */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-white border-none w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 active:scale-95"
            aria-label="Menu do usuário"
          >
            <User className="h-8 w-8 text-purple-600"/> 
          </button>

          {/* Menu do usuário */}
          <UserMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} status={status} />
        </div>
      </div>
    </header>
  );
}

export default Header;