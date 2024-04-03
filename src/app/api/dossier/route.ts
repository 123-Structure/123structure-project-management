import { createDossier } from "@/lib/prisma/Dossier";
import { createLocation } from "@/lib/prisma/Location";
import createDossierFromApiSchema from "@/lib/schema/createDossierFromApiSchema";
import { authMiddleware } from "@/lib/utils/authMiddleware";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const parsedCredentials = createDossierFromApiSchema.parse(await req.json());

    const {
      email,
      password,
      numDossier,
      nomDossier,
      client,
      dessinePar,
      codePostal,
      ville,
    } = parsedCredentials;

    const auth = await authMiddleware({
      email,
      password,
    });

    if (auth instanceof NextResponse) {
      if (auth.status !== 200) {
        return auth;
      }
    }

    const dossierData = {
      numDossier,
      nomDossier,
      client,
      dessinePar,
      codeInsee: null,
    };

    const dossier = await createDossier(dossierData);

    if (dossier.success) {
      const locationData = {
        codePostal,
        ville,
      };
      const location = await createLocation(numDossier, locationData);

      if (location.success) {
        return NextResponse.json(
          { message: `Dossier créé avec succès : ${dossier.success}` },
          { status: 200, statusText: "OK" }
        );
      } else {
        return NextResponse.json(
          {
            error: `${location.error} (Dossier créé avec succès : ${dossier.success})`,
          },
          { status: 400, statusText: "Bad Request" }
        );
      }
    } else {
      return NextResponse.json(
        { error: dossier.error },
        { status: 400, statusText: "Bad Request" }
      );
    }
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      console.error(err.issues);
      return NextResponse.json(
        { error: err.issues },
        { status: 400, statusText: "Bad Request" }
      );
    }
    console.error(err);
    return NextResponse.json(
      { error: `Erreur interne du serveur : ${err.message}` },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
