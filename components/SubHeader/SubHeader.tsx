'use client';

import React, { useState } from "react";
import Link from 'next/link';
import { Undo2, Share2 } from 'lucide-react';
// import { Link } from 'react-router-dom';
import './Header.module.css';  // Ajuste o caminho conforme necessário


function SubHeader() {
  const handleBack = () => {
    window.history.back();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Agendou!",
          text: "Não agendou? Então agende online!",
          url: window.location.href,
        })
        .catch((error) => console.error("Erro ao compartilhar:", error));
    } else {

      const url = encodeURIComponent(window.location.href);
      window.open(`https://api.whatsapp.com/send?text=${url}`, "_blank");
    }
  };


  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-sm flex items-center justify-between p-4 z-20">
      <button onClick={handleBack}><Undo2 className="h-6 w-6 text-purple-600" /></button>
      <button onClick={handleShare}><Share2 className="h-6 w-6 text-purple-600" /></button>
    </div>
  );
}

export default SubHeader;  // Alterado para exportação default