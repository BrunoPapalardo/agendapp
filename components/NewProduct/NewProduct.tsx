"use client";

import { useState } from "react";
import { SquarePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import ReactCrop from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage"; // Função para cortar a imagem

interface ServiceFormData {
    name: string;
    image: FileList;
    price: string;
    hours: number;
    minutes: number;
}

export default function NewProduct() {
    const [isOpen, setIsOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [isCropOpen, setIsCropOpen] = useState(false); // Controle de visibilidade do modal de corte
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceFormData>();

    const onSubmit = (data: ServiceFormData) => {
        const price = parseFloat(data.price.replace(/[^\d,]/g, "").replace(",", "."));
        const duration = data.hours * 60 + data.minutes;

        console.log("Novo serviço:", { ...data, price, duration });

        setIsOpen(false);
        reset();
        setPreviewImage(null);
        setCroppedImage(null);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // Função para cortar a imagem
    const handleCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        getCroppedImg(previewImage!, croppedAreaPixels).then((croppedImg) => {
            setCroppedImage(croppedImg);
        });
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)} 
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
            >
                <SquarePlus />
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Novo serviço</h2>
                        <p className="mb-4">Preencha as informações</p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Nome */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nome</label>
                                <input
                                    {...register("name", { required: "Nome é obrigatório" })}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>

                            {/* Imagem */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Imagem</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("image", { required: "Imagem é obrigatória" })}
                                    className="hidden"
                                    id="image-upload"
                                    onChange={handleImageChange}
                                />
                                <label 
                                    htmlFor="image-upload" 
                                    className="cursor-pointer mt-2 flex justify-center items-center px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300"
                                >
                                    Selecionar imagem
                                </label>

                                {previewImage && !isCropOpen && (
                                    <img 
                                        src={previewImage} 
                                        alt="Prévia da imagem" 
                                        className="mt-2 w-32 h-32 object-cover rounded-full border-2 border-gray-300 mx-auto"
                                    />
                                )}

                                {croppedImage && !isCropOpen && (
                                    <img 
                                        src={croppedImage} 
                                        alt="Imagem cortada" 
                                        className="mt-2 w-32 h-32 object-cover rounded-full border-2 border-gray-300 mx-auto"
                                    />
                                )}

                                {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

                                {/* Modal para cortar imagem */}
                                {isCropOpen && previewImage && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                                            <h2 className="text-xl font-bold mb-4">Cortar imagem</h2>
                                            <ReactCrop
                                                image={previewImage}
                                                crop={crop}
                                                zoom={zoom}
                                                onCropChange={setCrop}
                                                onZoomChange={setZoom}
                                                onCropComplete={handleCropComplete}
                                            />
                                            
                                            {/* Controle de zoom visível apenas durante o corte */}
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700">Zoom</label>
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="3"
                                                    step="0.1"
                                                    value={zoom}
                                                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                                                    className="w-full mt-2"
                                                />
                                                <span className="text-sm text-gray-600">{zoom.toFixed(1)}x</span>
                                            </div>

                                            <div className="mt-4 flex space-x-2">
                                                <button 
                                                    type="button"
                                                    onClick={() => setIsCropOpen(false)} 
                                                    className="w-full px-4 py-2 text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-500"
                                                >
                                                    Cancelar
                                                </button>
                                                <button 
                                                    type="button"
                                                    onClick={() => setIsCropOpen(false)} 
                                                    className="w-full px-4 py-2 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                                                >
                                                    Confirmar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Preço */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Preço</label>
                                <input
                                    type="text"
                                    {...register("price", { required: "Preço é obrigatório" })}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    placeholder="R$ 0,00"
                                    onInput={(e) => {
                                        let value = e.currentTarget.value.replace(/\D/g, "");
                                        value = (parseFloat(value) / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                                        e.currentTarget.value = value;
                                    }}
                                />
                                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                            </div>

                            {/* Duração */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Duração</label>
                                <div className="flex space-x-2">
                                    <select {...register("hours", { valueAsNumber: true })} className="p-2 border rounded-md">
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <option key={i} value={i}>{i}h</option>
                                        ))}
                                    </select>
                                    <select {...register("minutes", { valueAsNumber: true })} className="p-2 border rounded-md">
                                        {[0, 15, 30, 45].map((min) => (
                                            <option key={min} value={min}>{min}min</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Botões */}
                            <div className="mt-2 flex items-center space-x-2">
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false);
                                        reset();
                                        setPreviewImage(null);
                                        setCroppedImage(null);
                                    }} 
                                    className="mt-4 w-full px-4 py-2 text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-500"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit"
                                    className="mt-4 w-full px-4 py-2 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                                >
                                    Adicionar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
