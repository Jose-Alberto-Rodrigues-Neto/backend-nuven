/*
  Warnings:

  - Added the required column `link` to the `Dataset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dataset" ADD COLUMN     "link" TEXT NOT NULL;
