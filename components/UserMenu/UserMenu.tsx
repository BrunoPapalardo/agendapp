import { signOut } from "next-auth/react";
import React, { useEffect } from "react";
import Link from "next/link";

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
                className={`w-4/5 max-w-[300px] h-full bg-white text-black flex flex-col p-5 relative shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
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
                            {/* <button onClick={() => signIn()} className="text-blue-600 font-bold"> */}
                            <Link
                                href="/login"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                            >Entrar</Link>
                            <p className="mt-4 text-sm text-gray-600 text-center">
                                Ainda não tem uma conta? {" "}
                                <Link href="/register" className="text-purple-600 hover:underline">
                                    Cadastre-se
                                </Link>
                            </p>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default UserMenu;