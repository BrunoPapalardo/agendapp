import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function updateCompany(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    res.setHeader("Allow", ["PATCH"]);
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }

  try {
    // Extrai o ID e os demais campos do body
    const { id, ...fields } = req.body;

    if (!id) {
      return res.status(400).json({ message: "O ID da empresa é obrigatório." });
    }

    // Monta o objeto de atualização somente com os campos enviados
    const updateData: any = {};
    if (fields.name !== undefined) updateData.name = fields.name;
    if (fields.code !== undefined) updateData.code = fields.code;
    if (fields.address !== undefined) updateData.address = fields.address;
    if (fields.categoryId !== undefined) updateData.categoryId = Number(fields.categoryId);
    if (fields.image !== undefined) updateData.image = fields.image;
    if (fields.telephone !== undefined) updateData.telephone = fields.telephone;
    if (fields.ispublic !== undefined) updateData.ispublic = Number(fields.ispublic);
    if (fields.cnpj !== undefined) updateData.cnpj = fields.cnpj;
    if (fields.email !== undefined) updateData.email = fields.email;
    if (fields.instagram !== undefined) updateData.instagram = fields.instagram;
    if (fields.whatsapp !== undefined) updateData.whatsapp = fields.whatsapp;
    if (fields.coordinates !== undefined) updateData.coordinates = fields.coordinates;

    // Atualiza os dados no banco usando o Prisma
    const updatedCompany = await prisma.company.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return res.status(200).json(updatedCompany);
  } catch (error: any) {
    console.error("Erro ao atualizar a empresa:", error);
    return res.status(500).json({ message: "Erro ao atualizar a empresa", error: error.message });
  }
}