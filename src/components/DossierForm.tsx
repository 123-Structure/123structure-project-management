"use client";
import { createDossier } from "@/lib/prisma/Dossier";
import { Dossier, Feedback } from "@prisma/client";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";
import { createLocation } from "@/lib/prisma/Location";
import { createFeedback } from "@/lib/prisma/Feedback";

// Define your form schema using zod
const formSchema = z.object({
  // Create sub-objects to create accordion sections
  dossier: z
    .object({
      numDossier: z
        .string({
          required_error: "Numéro de dossier est requis",
        })
        // .min(1, { message: "Numéro de dossier ne peut pas être vide" })
        // .max(10, {
        //   message: "Numéro de dossier ne peut pas dépasser 10 caractères",
        // })
        .length(10, {
          message: "Numéro de dossier doit faire 10 caractères",
        })
        .describe("Numéro de dossier"),
      nomDossier: z
        .string({
          required_error: "Nom de dossier est requis",
        })
        .min(1, { message: "Nom de dossier ne peut pas être vide" })
        .max(100, {
          message: "Nom de dossier ne peut pas dépasser 100 caractères",
        })
        .describe("Nom de dossier"),
      cp: z
        .string({
          required_error: "Code postal est requis",
        })
        .length(5, { message: "Code postal doit faire 5 caractères" })
        .describe("Code postal"),
      ville: z
        .string({
          required_error: "Ville est requis",
        })
        .min(1, { message: "Ville ne peut pas être vide" })
        .max(100, { message: "Ville ne peut pas dépasser 100 caractères" }),
      client: z
        .string()
        .min(1, { message: "Client ne peut pas être vide" })
        .max(100, { message: "Client ne peut pas dépasser 100 caractères" }),
      dessinePar: z
        .string({
          required_error: "Dessiné par est requis",
        })
        .min(1, { message: "Dessiné par ne peut pas être vide" })
        .max(50, {
          message: "Dessiné par ne peut pas dépasser 50 caractères",
        })
        .describe("Dessiné par"),
    })
    .describe("📂 Informations du dossier"),
  feedback: z
    .object({
      generalComment: z
        .string()
        .describe("Commentaires")
        .describe("Remarques général sur le projet")
        .optional(),
      generalNote: z
        .enum([
          "1 - Non satisfaisant",
          "2 - Médiocre",
          "3 - Acceptable",
          "4 - Bon",
          "5 - Excellent",
        ])
        .describe("Note général sur le projet")
        .optional(),
    })
    .describe("📝 Remarques sur le dossier")
    .optional(),
});

const DossierForm = () => {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    console.log(data);
    const newDossier = await createDossier(data.dossier as Dossier);
    const newLocation = await createLocation(
      {
        cp: data.dossier.cp,
        ville: data.dossier.ville,
      },
      data.dossier.numDossier
    );
    if (data.feedback !== undefined) {
      const newFeedback = await createFeedback(
        data.feedback as Feedback,
        data.dossier.numDossier
      );
      toast("Message du serveur", {
        description: `${newDossier.message} / ${newFeedback.message}`,
      });
      router.refresh();
      return;
    }

    toast("Message du serveur", {
      description: `${newDossier.message} ${newLocation.message}`,
    });

    router.refresh();
  };

  return (
    <AutoForm
      formSchema={formSchema}
      onSubmit={(data: any) => handleSubmit(data)}
      fieldConfig={{
        dossier: {
          numDossier: {
            inputProps: { placeholder: "00.00.000A" },
          },
          nomDossier: {
            inputProps: { placeholder: "PROPRIETE ABC" },
          },
          cp: {
            inputProps: { placeholder: "00000" },
          },
          ville: {
            inputProps: { placeholder: "VILLE" },
          },
          client: {
            inputProps: { placeholder: "ABC Construction" },
          },
          dessinePar: {
            inputProps: { placeholder: "b.lechat" },
          },
        },
        feedback: {
          generalComment: {
            inputProps: {
              placeholder: "Commentaires",
            },
            fieldType: "textarea",
          },
          generalNote: {
            fieldType: "radio",
          },
        },
      }}
    >
      <AutoFormSubmit>
        <Save className="mr-2 size-4" />
        Enregistrer un nouveau dossier
      </AutoFormSubmit>
    </AutoForm>
  );
};

export default DossierForm;
