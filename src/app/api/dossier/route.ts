import { createDossier } from "@/lib/prisma/Dossier";
import { authMiddleware } from "@/lib/utils/authMiddleware";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, numDossier, nomDossier, client, dessinePar } =
    await req.json();

  try {
    const auth = await authMiddleware({
      email,
      password,
    });

    if (auth instanceof NextResponse) {
      if (auth.status !== 200) {
        return auth;
      }
    }

    const data = {
      numDossier,
      nomDossier,
      client,
      dessinePar,
      codeInsee: null,
    };

    const result = await createDossier(data);

    if (result.success) {
      return NextResponse.json(
        { message: `Dossier créé avec succès : ${result.success}` },
        { status: 200, statusText: "OK" }
      );
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 400, statusText: "Bad Request" }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
