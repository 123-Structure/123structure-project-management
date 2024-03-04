"use server";
import { Dossier } from "@prisma/client";
import prisma from "./prisma";

export const createDossier = async (
  data: Omit<Dossier, "id" | "createdAt" | "updatedAt">
) => {
  if (
    !data.numDossier ||
    !data.nomDossier ||
    !data.cp ||
    !data.ville ||
    !data.client ||
    !data.dessinePar
  ) {
    return {
      message: "Toutes les données sont requises",
    };
  }

  try {
    const dossier = await prisma.dossier.create({
      data,
    });
    console.log(dossier);
    return {
      message: "Nouveau dossier créé",
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      message: error.message as string,
    };
  }
};
