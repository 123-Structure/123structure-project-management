"use server";
import { Location } from "@prisma/client";
import prisma from "../prisma";

const getLocationByCodeInsee = async (
  codeInsee: string
): Promise<Location | null> => {
  if (!codeInsee) {
    throw new Error("Localisation - Code INSEE est requis");
  }
  try {
    const location = await prisma.location.findUnique({
      where: {
        codeInsee,
      },
    });
    return location;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération de la localisation :",
      error
    );
    throw new Error("Erreur lors de la récupération de la localisation");
  }
};

export default getLocationByCodeInsee