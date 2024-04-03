"use server";
import { Dossier } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AllDossier } from "../interfaces/AllDossier";
import { PersonalDossier } from "../interfaces/PersonalDossier";
import prisma from "./prisma";

export const createDossier = async (
  data: Omit<Dossier, "id" | "createdAt" | "updatedAt">
): Promise<{
  success?: string;
  error?: string;
}> => {
  if (
    !data.numDossier ||
    !data.nomDossier ||
    !data.client ||
    !data.dessinePar
  ) {
    return {
      error: "Information du dossier - Toutes les données sont requises",
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
    // console.log(`🎉 Nouveau dossier créé : ${dossier.numDossier}`);
    return {
      success: dossier.numDossier,
    };
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(
          `Information du dossier - Le numéro de dossier ${data.numDossier} existe déjà`
        );
        return {
          error: `Information du dossier - Le numéro de dossier ${data.numDossier} existe déjà`,
        };
      }
    }
    console.log(error.message);
    return {
      error: `Information du dossier - Une erreur inconnue s'est produite : ${
        error.message as string
      }`,
    };
  }
};

export const updateDossier = async (
  numDossier: string,
  data: Partial<Omit<Dossier, "id" | "createdAt" | "updatedAt">>
): Promise<{
  success?: string;
  error?: string;
}> => {
  if (!numDossier) {
    return {
      error: "Information du dossier - Numéro de dossier est requis",
    };
  }

  try {
    const updatedDossier = await prisma.dossier.update({
      where: {
        numDossier,
      },
      data: {
        numDossier: data.numDossier,
        nomDossier: data.nomDossier,
        client: data.client,
        dessinePar: data.dessinePar,
        updatedAt: new Date(),
      },
    });
    // console.log(`🎉 Dossier mis à jour : ${updatedDossier.numDossier}`);
    return {
      success: updatedDossier.numDossier,
    };
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.log(
          `Information du dossier - Le dossier avec l'identifiant ${numDossier} n'existe pas`
        );
        return {
          error: `Information du dossier - Le dossier avec l'identifiant ${numDossier} n'existe pas`,
        };
      }
    }
    console.log(error.message);
    return {
      error: `Information du dossier - Une erreur inconnue s'est produite : ${
        error.message as string
      }`,
    };
  }
};

export const getPersonalDossier = async (
  dessinePar: string
): Promise<PersonalDossier[]> => {
  if (!dessinePar) {
    throw new Error("Information du dossier - 'Dessiné par' est requis");
  }
  try {
    const dossiers = await prisma.dossier.findMany({
      where: {
        dessinePar,
      },
      select: {
        numDossier: true,
        nomDossier: true,
        client: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return dossiers;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des dossiers :",
      error
    );
    throw new Error("Erreur lors de la récupération des dossiers");
  }
};

export const getAllDossier = async (): Promise<AllDossier[]> => {
  try {
    const dossiers = await prisma.dossier.findMany({
      select: {
        numDossier: true,
        nomDossier: true,
        client: true,
        createdAt: true,
        dessinePar: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return dossiers;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des dossiers :",
      error
    );
    throw new Error("Erreur lors de la récupération des dossiers");
  }
};

export const getDossierByNumDossier = async (
  numDossier: string
): Promise<Dossier | null> => {
  if (!numDossier) {
    throw new Error("Information du dossier - Numéro de dossier est requis");
  }
  try {
    const dossier = await prisma.dossier.findUnique({
      where: {
        numDossier,
      },
    });
    return dossier;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des dossiers :",
      error
    );
    throw new Error("Erreur lors de la récupération des dossiers");
  }
};
