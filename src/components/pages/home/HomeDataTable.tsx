"use client";
import { PersonalDossier } from "@/lib/interfaces/PersonalDossier";
import { getPersonalDossier } from "@/lib/prisma/Dossier";
import useDossierStore from "@/lib/store/dossier.store";
import { Contact, Folder, Folders, Hash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DataTableContainer from "../../DataTable/DataTableContainer";

const HomeDataTable = () => {
  const [dossiers, setDossiers] = useState<PersonalDossier[]>([]);
  const dossier = useDossierStore((s) => s.dossier);
  const { data: session, status } = useSession();

  useEffect(() => {
    const getDossier = async () => {
      try {
        const userId =
          `${session?.user?.firstName?.[0]?.toLowerCase()}.${session?.user?.lastName?.toLowerCase()}` ||
          "";
        const personalDossier = await getPersonalDossier(userId);
        setDossiers(personalDossier);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des dossiers :",
          error
        );
      }
    };

    getDossier();
  }, [session?.user?.firstName, session?.user?.lastName, dossier]);

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
  return (
    <DataTableContainer
      data={dossiers}
      itemType="Dossier"
      tableIcon={<Folders />}
      tableTitle="Derniers dossiers enregistrés"
      tableHead={tableHead}
    />
  );
};

export default HomeDataTable;
