import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Lê o corpo da requisição (JSON)
    const body = await request.json();
    const { code } = body; // Extrai o 'code' do corpo

    if (!code) {
      return NextResponse.json({ error: "Company code is required" }, { status: 400 });
    }

    // Faça a consulta ao banco
    const company = await prisma.company.findUnique({
      where: { code: code },
      include: {
        products: true, // Isso adiciona os produtos vinculados à empresa
      },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json(company, { status: 200 });
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

