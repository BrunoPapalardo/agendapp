// app\api\services\search\route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ServiceResponse {
  id: number;
  name: string;
  companyId: number;
  duration: number;
  prepareTime: number;
  intervalTime: number;
  image: string;
  employees: Array<{
    id: number;
    name: string;
    image: string;
  }>;
}

export async function POST(request: NextRequest): Promise<NextResponse<ServiceResponse | { error: string }>> {
  try {
    // Verificação de corpo vazio
    const text = await request.text();
    if (!text) {
      return NextResponse.json(
        { error: "Corpo da requisição vazio" },
        { status: 400 }
      );
    }

    // Parse seguro do JSON
    let body;
    try {
      body = JSON.parse(text);
    } catch (e) {
      return NextResponse.json(
        { error: "Formato JSON inválido" },
        { status: 400 }
      );
    }

    // Validação do serviceId
    const serviceId = Number(body.serviceId);
    if (isNaN(serviceId)) {
      return NextResponse.json(
        { error: "serviceId deve ser um número" },
        { status: 400 }
      );
    }

    // Query com tratamento de erros
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: {
        company: { select: { id: true } },
        employees: true
      }
    });

    if (!service) {
      return NextResponse.json(
        { error: "Serviço não encontrado" },
        { status: 404 }
      );
    }

    // Resposta formatada
    return NextResponse.json({
      ...service,
      companyId: service.company.id
    });

  } catch (error) {
    console.error("Erro interno:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}