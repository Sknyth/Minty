/*
  Warnings:

  - Added the required column `cardType` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "cardType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "type" TEXT NOT NULL;
