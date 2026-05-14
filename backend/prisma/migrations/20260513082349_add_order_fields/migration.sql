/*
  Warnings:

  - Added the required column `customerEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerSurname` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerSurname" TEXT NOT NULL,
ALTER COLUMN "shippingHouseNumber" SET DATA TYPE TEXT,
ALTER COLUMN "shippingApt" SET DATA TYPE TEXT,
ALTER COLUMN "shippingPostcode" SET DATA TYPE TEXT;
