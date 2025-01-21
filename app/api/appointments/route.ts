import { prisma } from '@/lib/prisma'; // Prisma Client

// Função para listar os agendamentos (GET)
export async function GET() {
  const appointments = await prisma.appointment.findMany();
  return new Response(JSON.stringify(appointments), { status: 200 });
}

// Função para criar um novo agendamento (POST)
export async function POST(req: Request) {
  try {
    // Recebe o corpo da requisição como JSON
    const { dateTime, userId } = await req.json();

    // Cria um novo agendamento no banco
    const newAppointment = await prisma.appointment.create({
      data: {
        dateTime,
        userId,
      },
    });

    return new Response(JSON.stringify(newAppointment), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Erro ao criar agendamento', { status: 500 });
  }
}
