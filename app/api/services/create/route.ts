import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, companyId, image, price, duration, customFields = [] } = body;

        // Validação dos campos obrigatórios
        if (!name || !companyId || !image || !price || !duration) {
            return NextResponse.json(
                { error: "Todos os campos básicos são obrigatórios." },
                { status: 400 }
            );
        }

        // Validação dos campos customizados
        if (customFields && customFields.length > 0) {
            for (const field of customFields) {
                if (!field.type || !field.label) {
                    return NextResponse.json(
                        { error: "Campos personalizados devem ter tipo e label." },
                        { status: 400 }
                    );
                }

                if (field.type === 'select' && (!field.options || field.options.length === 0)) {
                    return NextResponse.json(
                        { error: "Campos do tipo select devem conter opções." },
                        { status: 400 }
                    );
                }
            }
        }

        // Conversão de tipos
        const priceNumber = parseFloat(price);
        const durationNumber = parseInt(duration);

        // Criação do serviço
        const service = await prisma.service.create({
            data: {
                name,
                companyId,
                image,
                price: priceNumber,
                duration: durationNumber,
                customFields: customFields.map((field: any) => ({
                    type: field.type,
                    label: field.label,
                    options: field.options || null
                }))
            },
        });

        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar serviço:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor." },
            { status: 500 }
        );
    }
}