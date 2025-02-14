'use client';

import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft } from "lucide-react";
// import SubHeader from "@/components/SubHeader/SubHeader";
import Header from "../Header/Header";

export default function ErrorPage({ message }: { message?: string }) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg max-w-md">
                    <AlertCircle className="h-14 w-14 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900">{message || "Ocorreu um erro inesperado"}</h1>
                    <p className="mt-2 text-gray-500">
                        Tente novamente ou volte para a página anterior.
                    </p>
                    <button
                        onClick={() => router.back()}
                        className="mt-6 flex items-center justify-center w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
}
