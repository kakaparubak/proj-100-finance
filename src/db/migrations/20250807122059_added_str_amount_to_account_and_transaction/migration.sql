/*
  Warnings:

  - Added the required column `strAmount` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strAmount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Account" ADD COLUMN     "strAmount" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "strAmount" TEXT NOT NULL;
