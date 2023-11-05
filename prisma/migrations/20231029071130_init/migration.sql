/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('Quester', 'Hunter', 'Undecided');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "accountType" "AccountType" NOT NULL DEFAULT 'Undecided',
ADD COLUMN     "creditBalance" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "PaymentIntents" (
    "id" TEXT NOT NULL,
    "amountCaptured" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "amountRefunded" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "PaymentIntents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaymentIntents" ADD CONSTRAINT "PaymentIntents_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
