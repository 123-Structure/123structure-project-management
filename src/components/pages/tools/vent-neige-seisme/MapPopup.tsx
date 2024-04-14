import IExtendAddress from "@/lib/interfaces/IExtendAddress";
import { Popup } from "react-leaflet";

interface IMapPopupProps {
  currentAddress: IExtendAddress | undefined;
}

const MapPopup = (props : IMapPopupProps) => {
  
  if(!props.currentAddress) {
    return <></>
  }

  return (
    <Popup>
      <div>
        <p>
          {props.currentAddress.properties.postcode} -{" "}
          {props.currentAddress.properties.city.toUpperCase()} (
          {props.currentAddress.properties.citycode})
        </p>
        <p className="text-sm text-muted-foreground">
          Vent : {props.currentAddress.zones.vent}
        </p>
        <p className="text-sm text-muted-foreground">
          Neige : {props.currentAddress.zones.neige}
        </p>
        <p className="text-sm text-muted-foreground">
          Séisme : {props.currentAddress.zones.seisme}
        </p>
        {props.currentAddress.zones.littoral && <p className="text-sm text-muted-foreground">
          Littoral : {props.currentAddress.zones.littoral}
        </p>}
      </div>
    </Popup>
  );
};

export default MapPopup;
