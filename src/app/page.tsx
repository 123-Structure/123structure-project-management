"use client";
import DataTableContainer from "@/components/dataTable/DataTableContainer";
import DossierDialog from "@/components/dossierDialog/DossierDialog";
import PageTransition from "@/components/PageTransition";
import { Skeleton } from "@/components/ui/skeleton";
import { PersonalDossier } from "@/lib/interfaces/PersonalDossier";
import { getPersonalDossier } from "@/lib/prisma/Dossier";
import { Contact, Folder, Folders, Hash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [dossiers, setDossiers] = useState<PersonalDossier[]>([]);
  const router = useRouter();
  const { data: session, status } = useSession();

  const getDossier = async () => {
    try {
      const personalDossier = await getPersonalDossier();
      setDossiers(personalDossier);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des dossiers :",
        error
      );
    }
  };

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
  ];

  useEffect(() => {
    getDossier();
  }, []);

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
      <div className="w-1/2">
        <DataTableContainer
          data={dossiers}
          itemType="Dossier"
          tableIcon={<Folders />}
          tableTitle="Derniers dossiers enregistrés"
          tableHead={tableHead}
        />
      </div>
      <div className="flex w-1/4 flex-col gap-4">
        <div className="flex size-full flex-col gap-2 rounded-lg border border-border p-4">
          <Skeleton className="h-4 w-1/2 rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-1/4 rounded-full" />
        </div>
        <div className="flex size-full flex-col gap-2 rounded-lg border border-border p-4">
          <Skeleton className="h-4 w-1/2 rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-1/4 rounded-full" />
        </div>
      </div>
      <div className="flex w-1/4 grow flex-col gap-2 rounded-lg border border-border p-4">
        <Skeleton className="h-4 w-1/2 rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-1/4 rounded-full" />
      </div>
      <DossierDialog />
    </PageTransition>
  );
}
