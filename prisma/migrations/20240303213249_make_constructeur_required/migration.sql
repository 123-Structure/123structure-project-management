/*
  Warnings:

  - Made the column `constructeur` on table `Dossier` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Dossier" ALTER COLUMN "constructeur" SET NOT NULL;
