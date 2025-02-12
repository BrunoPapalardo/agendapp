/*
  Warnings:

  - Added the required column `image` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT NOT NULL;
