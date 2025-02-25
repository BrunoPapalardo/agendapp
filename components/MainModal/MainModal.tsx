"use client";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function MainModal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null; // Não renderiza nada se não estiver aberto

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
                <div>{children}</div>
                <div className="flex justify-end mt-4">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}