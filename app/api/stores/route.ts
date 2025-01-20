import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Prisma Client

export async function GET() {
    try {
        const locations = await prisma.store.findMany({
            include: { category: true }, // Inclui a categoria relacionada ao local
        });

        return NextResponse.json(locations);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erro ao buscar locais' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, address, categoryId } = await req.json();

        if (!name || !address || !categoryId) {
            return NextResponse.json(
                { error: 'Os campos name, address e categoryId são obrigatórios.' },
                { status: 400 }
            );
        }

        // Verifica se a categoria existe
        const categoryExists = await prisma.category.findUnique({
            where: { id: categoryId },
        });

        if (!categoryExists) {
            return NextResponse.json(
                { error: 'Categoria não encontrada.' },
                { status: 404 }
            );
        }

        const newLocation = await prisma.store.create({
            data: {
                name,
                address,
                categoryId,
            },
        });

        return NextResponse.json(newLocation, { status: 201 });
    } catch (error) {
        console.error('Erro ao criar local:', error);
        return NextResponse.json(
            { error: 'Erro ao criar local.' },
            { status: 500 }
        );
    }
}
