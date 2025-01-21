"use client";

import React, { useState } from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
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
    <header className={styles.header}>
      <div className={styles.logo}>Oi, bocó!</div>
      <div className={styles.actions}>
        <button className={styles.searchButton} aria-label="Pesquisar">
          🔍
        </button>
        <button
          onClick={toggleMenu}
          className={styles.menuButton}
          aria-label="Menu do usuário"
        >
          👤
        </button>
      </div>
      {menuOpen && (
        <div className={styles.overlay} onClick={closeMenu}>
          <div
            className={`${styles.slideMenu} ${
              closing ? styles.closing : styles.opening
            }`}
            onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro do menu
          >
            <button
              className={styles.closeButton}
              onClick={closeMenu}
              aria-label="Fechar"
            >
              ✖
            </button>
            <ul>
              <li>Perfil</li>
              <li>Meus Favoritos</li>
              <li>Configurações</li>
              <li>Sair</li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
