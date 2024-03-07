"use server";
import { Dossier } from "@prisma/client";
import prisma from "./prisma";

export const createDossier = async (
  data: Omit<Dossier, "id" | "createdAt" | "updatedAt">
) => {
  if (
    !data.numDossier ||
    !data.nomDossier ||
    !data.client ||
    !data.dessinePar
  ) {
    return {
      message: "⚠ Dossier - Toutes les données sont requises",
    };
  }

  try {
    const dossier = await prisma.dossier.create({
      data: {
        numDossier: data.numDossier,
        nomDossier: data.nomDossier,
        client: data.client,
        dessinePar: data.dessinePar,
      },
    });
    console.log(`🎉 Nouveau dossier créé : ${dossier.numDossier}`);
    return {
      message: `🎉 Nouveau dossier créé : ${dossier.numDossier}`,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      message: `💥 Erreur - Création dossier : ${error.message as string}`,
    };
  }
};
