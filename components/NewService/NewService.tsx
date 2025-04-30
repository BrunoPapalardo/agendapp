"use client";

import { useState, useMemo } from "react";
import { SquarePlus } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import ReactCrop from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage";

type CustomFieldType = 'text' | 'select' | 'textarea';

interface CustomField {
    type: CustomFieldType;
    label: string;
    options?: string[];
}

interface ServiceFormData {
    name: string;
    image: FileList;
    price: string;
    hours: number;
    minutes: number;
    customFields: CustomField[];
}

export default function NewService() {
    const [isOpen, setIsOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [isCropOpen, setIsCropOpen] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const {
        register,
        handleSubmit,
        reset,
        control,
        watch,
        getValues,
        setValue,
        formState: { errors }
    } = useForm<ServiceFormData>({
        defaultValues: {
          customFields: []
        },
        resolver: (values) => {
          const errors: Record<string, any> = {};
          
          values.customFields?.forEach((field, index) => {
            if (field.type === 'select') {
              if (!field.options || field.options.length === 0) {
                errors.customFields = errors.customFields || [];
                errors.customFields[index] = {
                  options: { message: "Adicione pelo menos uma opção" }
                };
              }
            }
          });
          
          return { values, errors };
        }
      });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "customFields"
    });

    const watchedCustomFields = watch("customFields");

    const handleAddCustomField = () => {
        append({
            type: 'text',
            label: '',
            options: [] // Inicialize sempre com array vazio
        });
    };

    const handleAddOption = (fieldIndex: number) => {
        // Obter opções atuais ou array vazio se não existir
        const currentOptions = getValues(`customFields.${fieldIndex}.options`) || [];

        // Atualizar o campo específico mantendo outros valores
        setValue(`customFields.${fieldIndex}.options` as any, [
            ...currentOptions,
            "", // Nova opção vazia
        ]);
    };

    const onSubmit = async (data: ServiceFormData) => {
        const price = parseFloat(data.price.replace(/[^\d,]/g, "").replace(",", "."));
        const duration = data.hours * 60 + data.minutes;

        console.log(data.customFields);

        try {
            const response = await fetch("/api/services/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    price,
                    duration,
                    image: 'https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cindra/imagens/sem.jpg.gif', // croppedImage, // AJUSTAR
                    companyId: 1,
                    customFields: data.customFields.map(field => ({
                        type: field.type,
                        label: field.label,
                        ...(field.type === 'select' && { options: field.options })
                    }))
                }),
            });

            if (response.ok) {
                console.log("Serviço criado com sucesso");
                setIsOpen(false);
                reset();
                setPreviewImage(null);
                setCroppedImage(null);
            } else {
                console.error("Erro ao criar serviço");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

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
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-[90%] overflow-y-auto max-h-[90vh]">
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

                                {/* Botão para cortar imagem */}
                                {/* {previewImage && !isCropOpen && (
                                    <button 
                                        type="button"
                                        onClick={() => setIsCropOpen(true)} 
                                        className="mt-2 w-full px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        Cortar Imagem
                                    </button>
                                )} */}

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
                                                aspect={1} // Define o corte como redondo (1:1)
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

                            {/* Seção de Campos Customizados */}
                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-medium">Campos Personalizados</h3>
                                    <button
                                        type="button"
                                        onClick={handleAddCustomField}
                                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                                    >
                                        + Adicionar Campo
                                    </button>
                                </div>

                                {fields.map((field, index) => (
                                    <div key={field.id} className="border p-4 mb-4 rounded-lg bg-gray-50">
                                        <div className="flex gap-2 mb-3">
                                            <select
                                                {...register(`customFields.${index}.type`, {
                                                    required: "Tipo é obrigatório",
                                                    onChange: (e) => {
                                                        // Resetar opções ao mudar para não-select
                                                        if (e.target.value !== 'select') {
                                                            setValue(`customFields.${index}.options`, undefined);
                                                        }
                                                    }
                                                })}
                                                className="p-2 border rounded-md text-sm"
                                            >
                                                <option value="text">Texto</option>
                                                <option value="select">Seleção</option>
                                                <option value="textarea">Área de Texto</option>
                                            </select>

                                            <input
                                                {...register(`customFields.${index}.label`, { required: "Label é obrigatório" })}
                                                placeholder="Nome do campo"
                                                className="p-2 border rounded-md text-sm flex-grow"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="p-2 text-red-500 hover:text-red-700"
                                            >
                                                Remover
                                            </button>
                                        </div>

                                        {watchedCustomFields[index]?.type === 'select' && (
                                            <div className="space-y-2 ml-4">
                                                <label className="text-sm text-gray-600">Opções:</label>

                                                {/* Usar watchedCustomFields para obter as opções atualizadas */}
                                                {watchedCustomFields[index]?.options?.map((_, optionIndex) => (
                                                    <div key={optionIndex} className="flex gap-2 mb-2">
                                                        <input
                                                            {...register(`customFields.${index}.options.${optionIndex}`, {
                                                                required: "Opção é obrigatória",
                                                                validate: (value) =>
                                                                    value.trim() === "" ? "Digite uma opção válida" : undefined
                                                            })}
                                                            placeholder={`Opção ${optionIndex + 1}`}
                                                            className={`p-2 border rounded-md text-sm flex-grow ${errors.customFields?.[index]?.options?.[optionIndex]
                                                                ? 'border-red-500'
                                                                : ''
                                                                }`}
                                                        />
                                                        {errors.customFields?.[index]?.options?.[optionIndex] && (
                                                            <span className="text-red-500 text-sm">
                                                                {errors.customFields[index]?.options?.[optionIndex]?.message}
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}

                                                <button
                                                    type="button"
                                                    onClick={() => handleAddOption(index)}
                                                    className="px-2 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
                                                >
                                                    + Adicionar Opção
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Restante do formulário... */}

                            <div className="mt-6 flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false);
                                        reset();
                                        setPreviewImage(null);
                                        setCroppedImage(null);
                                    }}
                                    className="w-full px-4 py-2 text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-500"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                                >
                                    Adicionar Serviço
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}