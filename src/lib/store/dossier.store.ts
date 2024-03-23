import { Dossier, Feedback, Location } from "@prisma/client";
import { create } from "zustand";

interface IDossier {
  openDialog: boolean;
  dossier?: Dossier;
  location?: Location;
  feedback?: Feedback;
}

type DossierType = {
  dossier: IDossier;
  setDossier: (state: IDossier) => void;
  resetDossier: () => void;
};

const defaultDossier = {
  openDialog: false,
  dossier: undefined,
  location: undefined,
  feedback: undefined,
};

const useDossierStore = create<DossierType>((set) => ({
  dossier: defaultDossier,
  setDossier: (newDossier: {
    openDialog: boolean;
    dossier?: Dossier;
    location?: Location;
    feedback?: Feedback;
  }) => {
    set({
      dossier: {
        openDialog: newDossier.openDialog,
        dossier: newDossier.dossier,
        location: newDossier.location,
        feedback: newDossier.feedback,
      },
    });
  },
  resetDossier: () => {
    set({ dossier: defaultDossier });
  },
}));

export default useDossierStore;
