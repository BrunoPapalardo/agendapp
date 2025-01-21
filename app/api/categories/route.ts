import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Prisma Client

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            include: { locations: true }, // Inclui locais relacionados à categoria
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erro ao buscar categorias' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, icon } = await req.json();

        if (!name || !icon) {
            return NextResponse.json(
                { error: 'Os campos name e icon são obrigatórios.' },
                { status: 400 }
            );
        }

        const newCategory = await prisma.category.create({
            data: {
                name,
                icon,
            },
        });

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        return NextResponse.json(
            { error: 'Erro ao criar categoria.' },
            { status: 500 }
        );
    }
}  