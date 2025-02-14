import { signOut, signIn } from "next-auth/react";
import React, { useEffect } from "react";

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  status: "authenticated" | "unauthenticated" | "loading";
}

const UserMenu: React.FC<UserMenuProps> = ({ isOpen, onClose, status }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"; // Impede rolagem no fundo
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 w-full h-full bg-black/50 z-[1000] flex justify-end"
      onClick={onClose}
    >
      <div
        className={`w-4/5 max-w-[300px] h-full bg-white text-black flex flex-col p-5 relative shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro
      >
        <button
          className="bg-transparent border-none text-[20px] absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
          aria-label="Fechar"
        >
          ✖
        </button>

        <ul className="slideMenu">
          {status === "authenticated" ? (
            <>
              <li>Perfil</li>
              <li>Meus Favoritos</li>
              <li>Configurações</li>
              <li>
                <button onClick={() => signOut({ callbackUrl: "/" })}>
                  Sair
                </button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={() => signIn()} className="text-blue-600 font-bold">
                Entrar
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;