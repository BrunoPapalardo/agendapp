import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params?: { code?: string } }) {
  const code = context?.params?.code;

  if (!code) {
    return NextResponse.json({ error: "Company code is required" }, { status: 400 });
  }

  try {
    const company = await prisma.company.findUnique({
      where: { code },
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