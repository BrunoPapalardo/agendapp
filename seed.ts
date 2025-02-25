import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Criando categorias
  await prisma.category.createMany({
    data: [
      { name: "Barbearia", icon: "✂️" },
      { name: "Salão de Beleza", icon: "💇" },
      { name: "Clínica Estética", icon: "💆" },
      { name: "SPA", icon: "🧖" },
      { name: "Massoterapia", icon: "💆‍♂️" },
    ],
  });

  // Criando negócios
  await prisma.company.createMany({
    data: [
      { name: "Barbearia do João", code: "BarbeariaJoao", address: "Rua das Barbas, 123", categoryId: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmofOKQsM7vnvn1OIR88eeCOGYtsQKMBEv4Q&s" },
      { name: "Salão da Maria", code: "SalaoMaria", address: "Avenida dos Cabelos, 456", categoryId: 2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh-hXWaNG7Ae3S_5mriINshxUPcxRVvzcXDA&s" },
      { name: "Clínica Bella", code: "ClinicaBella", address: "Praça da Estética, 789", categoryId: 3, image: "https://clinicabelladerme.com.br/wp-content/uploads/2022/04/clinica.jpg" },
      { name: "SPA Relaxante", code: "SPARelax", address: "Rua do Descanso, 101", categoryId: 4, image: "https://www.roteirosdecharme.com.br/wp-content/uploads/2023/01/unnamed-6-1024x683.jpg" },
      { name: "Centro de Massoterapia", code: "CentroMasso", address: "Av. da Terapia, 202", categoryId: 5, image: "https://cpp.org.br/wp-content/uploads/2024/10/Massoterapeuta-com-desconto-especial-para-associados-no-CPP-Mairipora.jpg" },
    ],
  });

  // Criando funcionários
  await prisma.employee.createMany({
    data: [
      { name: "Carlos Cabeludo", companyId: 1, image: "carlos.jpg" },
      { name: "Ana Tranças", companyId: 2, image: "ana.jpg" },
      { name: "Beatriz Estética", companyId: 3, image: "beatriz.jpg" },
      { name: "Fernando Relax", companyId: 4, image: "fernando.jpg" },
      { name: "Juliana Masso", companyId: 5, image: "juliana.jpg" },
    ],
  });

  // Criando produtos/serviços
  await prisma.service.createMany({
    data: [
      { name: "Corte Simples", companyId: 1, price: 80, duration: 30, image: "https://belezamoderna.com.br/wp-content/uploads/2023/08/Corte-de-cabelo-em-camadas-1.jpeg" },
      { name: "Pintura de Cabelo", companyId: 2, price: 80, duration: 30, image: "https://prohall.com.br/wp-content/uploads/2022/11/hair-stylist-dyes-hair-with-a-brush-with-foil-2021-09-04-02-26-57-utc-1.jpg" },
      { name: "Limpeza de Pele", companyId: 3, price: 80, duration: 30, image: "https://media.buddhaspa.com.br/uploads/2019/05/Limpeza-de-pele.jpg" },
      { name: "Massagem Relaxante", companyId: 4, price: 80, duration: 30, image: "https://trovoterapias.com.br/wp-content/uploads/2023/07/Massagem-Relaxante.jpg" },
      { name: "Terapia de Pedras Quentes", companyId: 5, price: 80, duration: 30, image: "https://spasorocaba.com.br/wp-content/uploads/2018/04/Terapia-das-Pedras-Quente-2-e1522083509901.jpg" },
    ],
  });

  // Criando usuários
  await prisma.user.createMany({
    data: [
      { name: "Bruno Cliente", email: "bruno@email.com", telephone: "(11) 99999-9999", password: "hashed_password", image: "bruno.jpg" },
      { name: "Carlos Cliente", email: "carlos@email.com", telephone: "(21) 98888-8888", password: "hashed_password", image: "carlos.jpg" },
      { name: "Ana Cliente", email: "ana@email.com", telephone: "(31) 97777-7777", password: "hashed_password", image: "ana.jpg" },
      { name: "Fernando Cliente", email: "fernando@email.com", telephone: "(41) 96666-6666", password: "hashed_password", image: "fernando.jpg" },
      { name: "Juliana Cliente", email: "juliana@email.com", telephone: "(51) 95555-5555", password: "hashed_password", image: "juliana.jpg" },
    ],
  });

  // Criando agendamentos com datas futuras aleatórias
  await prisma.appointment.createMany({
    data: Array.from({ length: 15 }).map((_, i) => ({
      dateTime: new Date(Date.now() + Math.random() * 1000000000),
      userId: (i % 5) + 1,
      employeeId: (i % 5) + 1,
      companyId: (i % 5) + 1,
      serviceId: (i % 5) + 1,
    })),
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });