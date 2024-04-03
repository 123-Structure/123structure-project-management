"use client";
import DataTableContainer from "@/components/dataTable/DataTableContainer";
import DossierDialog from "@/components/dossierDialog/DossierDialog";
import PageTransition from "@/components/PageTransition";
import { PersonalDossier } from "@/lib/interfaces/PersonalDossier";
import { getAllDossier } from "@/lib/prisma/Dossier";
import useDossierStore from "@/lib/store/dossier.store";
import { Contact, Folder, Folders, Hash, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Equipe() {
  const [dossiers, setDossiers] = useState<PersonalDossier[]>([]);
  const router = useRouter();
  const { data: session, status } = useSession();
  const dossier = useDossierStore((s) => s.dossier);

  const tableHead: {
    icon?: JSX.Element;
    title: string;
  }[] = [
    {
      icon: <Hash className="size-4" />,
      title: "Numéro de dossier",
    },
    {
      icon: <Folder className="size-4" />,
      title: "Nom de dossier",
    },
    {
      icon: <Contact className="size-4" />,
      title: "Client",
    },
    {
      icon: <User className="size-4" />,
      title: "Dessiné par",
    },
  ];

  useEffect(() => {
    const getDossier = async () => {
      try {
        const dossiers = await getAllDossier();
        setDossiers(dossiers);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des dossiers :",
          error
        );
      }
    };

    getDossier();
  }, [dossier]);

  if (status === "loading") {
    return (
      <PageTransition className="flex h-screen w-screen items-center justify-center">
        <div>Chargement...</div>
      </PageTransition>
    );
  }

  if (!session) {
    router.push("auth/connexion");
  }

  return (
    <PageTransition className="flex gap-4">
      <div className="w-full">
        <DataTableContainer
          data={dossiers}
          itemType="Dossier"
          tableIcon={<Folders />}
          tableTitle="Dossiers enregistrés"
          tableHead={tableHead}
        />
      </div>
      <DossierDialog />
    </PageTransition>
  );
}
