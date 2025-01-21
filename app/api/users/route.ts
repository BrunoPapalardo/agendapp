import { prisma } from '@/lib/prisma'; // Prisma Client

export async function GET() {
  const appointments = await prisma.user.findMany();
  return new Response(JSON.stringify(appointments), { status: 200 });
}

// Criar um novo usuário (POST)
export async function POST(req: Request) {
  try {
    const { name, email, telephone, password } = await req.json();

    // Criação do usuário no banco
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        telephone, // Aqui está o campo 'telephone'
        password,
      },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Erro ao criar usuário', { status: 500 });
  }
}