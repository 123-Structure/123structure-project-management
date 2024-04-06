"use client";
import { PersonalDossier } from "@/lib/interfaces/PersonalDossier";
import { getAllDossier } from "@/lib/prisma/Dossier";
import useDossierStore from "@/lib/store/dossier.store";
import { Contact, Folder, Folders, Hash, User } from "lucide-react";
import { useEffect, useState } from "react";
import DataTableContainer from "../../DataTable/DataTableContainer";

const TeamDataTable = () => {
  const [dossiers, setDossiers] = useState<PersonalDossier[]>([]);
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
  return (
    <DataTableContainer
      data={dossiers}
      itemType="Dossier"
      tableIcon={<Folders />}
      tableTitle="Dossiers enregistrés"
      tableHead={tableHead}
    />
  );
};

export default TeamDataTable;
