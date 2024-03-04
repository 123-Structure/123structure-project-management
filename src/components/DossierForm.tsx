"use client";
import { createDossier } from "@/lib/prisma/Dossier";
import { createFeedback } from "@/lib/prisma/Feedback";
import { Dossier, Feedback } from "@prisma/client";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";

// Define your form schema using zod
const formSchema = z.object({
  // Create sub-objects to create accordion sections
  dossier: z
    .object({
      numDossier: z
        .string({
          required_error: "Numéro de dossier est requis",
        })
        .describe("Numéro de dossier"),
      nomDossier: z
        .string({
          required_error: "Nom de dossier est requis",
        })
        .describe("Nom de dossier"),
      cp: z
        .string({
          required_error: "Code postal est requis",
        })
        .describe("Code postal"),
      ville: z.string({
        required_error: "Ville est requis",
      }),
      client: z.string(),
      dessinePar: z
        .string({
          required_error: "Dessiné par est requis",
        })
        .describe("Dessiné par"),
    })
    .describe("📂 Informations du dossier"),
  feedback: z
    .object({
      comment: z.string().describe("Commentaires"),
      note: z.number().min(1).max(5).default(3),
    })
    .describe("📝 Remarques sur le dossier")
    .optional(),
});

const DossierForm = () => {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    console.log(data);
    const newDossier = await createDossier(data.dossier as Dossier);
    toast(newDossier.message);
    const newFeedback = await createFeedback(
      data.feedback as Feedback,
      data.dossier as Dossier
    );
    toast(newFeedback.message);

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
