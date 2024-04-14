import IAddress from "@/lib/interfaces/IAddress";
import IExtendAddress from "@/lib/interfaces/IExtendAddress";
import fetchContour from "@/lib/utils/fetchContour";
import fetchSeismSnowWind from "@/lib/utils/fetchSeismSnowWind";
import getLittoral from "@/lib/utils/getLittoral";
import { ChevronRight, Waves } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface IAddressItemProps {
  address: IAddress;
  insee: string | undefined;
  setCurrentAddress: Dispatch<SetStateAction<IExtendAddress | undefined>>;
}

const AddressItem = (props: IAddressItemProps) => {

  const littoral = getLittoral(props.address.properties.citycode)

  const handleClick = async () => {
    const promise = async () => {
      const coordinates = {
        latitude: props.address.geometry.coordinates[1],
        longitude: props.address.geometry.coordinates[0],
      };

      const codeInsee = props.address.properties.citycode;

      const seismSnowWind = await fetchSeismSnowWind(coordinates);
      const geoJSON = await fetchContour(codeInsee);
      const littoral = getLittoral(codeInsee);

      return {
        ...props.address,
        zones: {
          vent: seismSnowWind.vent_ec1,
          neige: seismSnowWind.neige_ec1,
          seisme: seismSnowWind.seisme_ec8,
          littoral: littoral ? littoral.CLASSEMENT : "",
        },
        geoJSON,
      };
    };

    toast.promise(promise, {
      loading: "Chargement...",
      success: (data) => {
        props.setCurrentAddress(data);
        return `${
          data.properties.postcode
        } - ${data.properties.city.toUpperCase()} (${
          props.address.properties.citycode
        })`;
      },
      error: "Erreur lors du chargement des données",
    });
  };

  return (
    <div
      className={`flex items-center gap-2 rounded p-2 transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-muted dark:text-slate-50 ${
        props.insee === props.address.properties.citycode ? "bg-primary/10" : ""
      }`}
      onClick={handleClick}
    >
      <ChevronRight className="size-4" />
      <div className="flex flex-col gap-1">
        <p className="flex items-center gap-2">
          {props.address.properties.city.toUpperCase()}
          {littoral?.CLASSEMENT && <Waves className="size-4" />}
        </p>
        <p className="text-sm italic text-muted-foreground">
          Code Postal : {props.address.properties.postcode} - INSEE :{" "}
          {props.address.properties.citycode}
        </p>
      </div>
    </div>
  );
};

export default AddressItem;
