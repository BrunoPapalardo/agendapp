import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface UserMenuProps {
    isOpen: boolean;
    onClose: () => void;
    status: "authenticated" | "unauthenticated" | "loading";
}

const UserMenu: React.FC<UserMenuProps> = ({ isOpen, onClose, status }) => {
    const { data: session } = useSession();

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 w-full h-full bg-black/50 z-[1000] flex justify-end"
            onClick={onClose}
        >
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: isOpen ? "0%" : "100%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-4/5 max-w-[320px] h-full bg-white text-black flex flex-col p-6 relative shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botão de Fechar */}
                <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl"
                    onClick={onClose}
                    aria-label="Fechar"
                >
                    ✖
                </button>

                {status === "authenticated" ? (
                    <>
                        {/* Perfil do Usuário */}
                        <div className="flex flex-col items-center gap-3 border-b pb-4">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500">
                                {session?.user.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt={session.user.name || "Usuário"}
                                        className="w-full h-full object-cover"
                                        width={80}
                                        height={80}
                                        onError={(e) => (e.currentTarget.style.display = "none")}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                                        Sem imagem
                                    </div>
                                )}
                            </div>
                            <p className="text-lg font-semibold">Olá, {session?.user.name?.split(" ")[0]} 👋</p>
                        </div>

                        {/* Links do Menu */}
                        <ul className="mt-4 space-y-3 text-gray-700">
                            <li>
                                <Link href="/profile" className="block py-2 hover:text-purple-600">Perfil</Link>
                            </li>
                            <li>
                                <Link href="/schedule" className="block py-2 hover:text-purple-600">Minha agenda</Link>
                            </li>
                            <li>
                                <Link href="/settings" className="block py-2 hover:text-purple-600">Configurações</Link>
                            </li>
                            <li>
                                <button
                                    className="w-full text-left py-2 text-red-600 hover:text-red-700"
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                >
                                    Sair
                                </button>
                            </li>
                        </ul>
                    </>
                ) : (
                    <div className="text-center">
                        <Link
                            href="/login"
                            className="inline-flex items-center px-6 py-3 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition"
                        >
                            Entrar
                        </Link>
                        <p className="mt-4 text-sm text-gray-600">
                            Ainda não tem uma conta?{" "}
                            <Link href="/register" className="text-purple-600 hover:underline">
                                Cadastre-se
                            </Link>
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default UserMenu;
