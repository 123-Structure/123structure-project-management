-- CreateTable
CREATE TABLE "Dossier" (
    "id" SERIAL NOT NULL,
    "numDossier" TEXT NOT NULL,
    "nomDossier" TEXT NOT NULL,
    "cp" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "constructeur" TEXT,
    "dessinePar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dossier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dossier_numDossier_key" ON "Dossier"("numDossier");
