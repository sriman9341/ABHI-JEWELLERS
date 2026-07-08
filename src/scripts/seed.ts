import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const superAdminPassword = await bcrypt.hash("admin123", 10);
  
  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@abhijewellers.com" },
    update: {},
    create: {
      email: "admin@abhijewellers.com",
      name: "Super Admin",
      passwordHash: superAdminPassword,
      role: "SUPER_ADMIN",
      isEmailVerified: true,
      isPhoneVerified: true,
    },
  });
  
  console.log("Database seeded successfully.");
  console.log("Admin Email:", superAdmin.email);
  console.log("Admin Password: admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
