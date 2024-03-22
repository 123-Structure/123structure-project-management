import { Dossier, Feedback, Location } from "@prisma/client";
import { create } from "zustand";

interface IDossierDialog {
  open: boolean;
  dossier?: Dossier;
  location?: Location;
  feedback?: Feedback;
}

type DossierDialogType = {
  dossierDialog: IDossierDialog;
  setDossierDialog: (state: IDossierDialog) => void;
  resetDossierDialog: () => void;
};

const defaultDossierDialog = {
  open: false,
  dossier: undefined,
  location: undefined,
  feedback: undefined,
};

const useDossierDialogStore = create<DossierDialogType>((set) => ({
  dossierDialog: defaultDossierDialog,
  setDossierDialog: (newDossierDialog: {
    open: boolean;
    dossier?: Dossier;
    location?: Location;
    feedback?: Feedback;
  }) => {
    set({
      dossierDialog: {
        open: newDossierDialog.open,
        dossier: newDossierDialog.dossier,
        location: newDossierDialog.location,
        feedback: newDossierDialog.feedback,
      },
    });
  },
  resetDossierDialog: () => {
    set({ dossierDialog: defaultDossierDialog });
  },
}));

export default useDossierDialogStore;
