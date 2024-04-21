"use server";
import fetchAddress from "../../utils/fetchAddress";
import fetchSeismSnowWind from "../../utils/fetchSeismSnowWind";
import getLittoral from "../../utils/getLittoral";
import prisma from "../prisma";

const createOrUpdateLocation = async (
  numDossier: string,
  data: { codePostal: string; ville: string }
): Promise<{
  success?: string;
  error?: string;
}> => {
  try {
    const addresses = await fetchAddress({
      codePostal: data.codePostal,
      ville: data.ville,
    });

    const address = addresses[0];

    const coordinates = {
      latitude: address.geometry.coordinates[1],
      longitude: address.geometry.coordinates[0],
    };

    const codeInsee = address.properties.citycode;

    const existingLocation = await prisma.location.findUnique({
      where: { codeInsee: codeInsee },
    });

    if (existingLocation) {
      await prisma.location.update({
        where: { codeInsee: existingLocation.codeInsee },
        data: { updatedAt: new Date() },
      });

      await prisma.dossier.update({
        where: { numDossier: numDossier },
        data: { codeInsee: existingLocation.codeInsee, updatedAt: new Date() },
      });

      // console.log(
      //   `🎉 Localisation mise à jour et liée au dossier : ${dossier.numDossier}`
      // );
      return {
        success: `${existingLocation.codePostal} ${existingLocation.ville}`,
      };
    } else {
      const seismSnowWind = await fetchSeismSnowWind(coordinates);

      if (!seismSnowWind.code) {
        return {
          error: `Localisation - Erreur lors de la récupération des données`,
        };
      }

      const littoral = getLittoral(codeInsee);

      const location = await prisma.location.create({
        data: {
          codePostal: data.codePostal,
          codeInsee,
          ville: data.ville.toUpperCase(),
          seisme: seismSnowWind.seisme_ec8,
          vent: seismSnowWind.vent_ec1,
          neige: seismSnowWind.neige_ec1,
          littoral: littoral ? littoral.CLASSEMENT : "",
          ...coordinates,
        },
      });

      await prisma.dossier.update({
        where: { numDossier: numDossier },
        data: { codeInsee: location.codeInsee, updatedAt: new Date() },
      });

      // console.log(
      //   `🎉 Localisation créée et liée au dossier : ${dossier.numDossier}`
      // );
      return {
        success: `${location.codePostal} ${location.ville}`,
      };
    }
  } catch (error: any) {
    console.log(error.message);
    return {
      error: `Localisation - ${error.message as string}`,
    };
  }
};

export default createOrUpdateLocation;
