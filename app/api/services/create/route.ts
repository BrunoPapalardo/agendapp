import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, companyId, image, price, duration } = body;

        if (!name || !companyId || !image || !price || !duration) {
            return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
        }

        const service = await prisma.service.create({
            data: {
                name,
                companyId,
                image,
                price: parseFloat(price),
                duration: parseInt(duration),
            },
        });

        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar serviço:", error);
        return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
    }
}