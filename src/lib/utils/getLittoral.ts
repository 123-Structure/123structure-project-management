import littoral from "../assets/littoral.json";
import ILittoral from "../interfaces/ILittoral";

const getLittoral = (codeInsee: string): ILittoral | undefined => {
  return littoral.find((ville) => ville.INSEE_COM === codeInsee);
};

export default getLittoral;
