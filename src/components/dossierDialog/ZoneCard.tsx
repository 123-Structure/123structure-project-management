import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface IZoneCardProps {
  title: string;
  value: string | undefined;
  icon: JSX.Element;
  type: "seism" | "wind" | "snow";
}

const ZoneCard = (props: IZoneCardProps) => {
  const seism = {
    1: "#9f9f9f",
    2: "#86bb5f",
    3: "#079992",
    4: "#cca86b",
    5: "#e55039",
  };

  const wind = {
    1: "#9f9f9f",
    2: "#86bb5f",
    3: "#079992",
    4: "#cca86b",
    5: "#e55039",
  };

  const snow = {
    0: "#9f9f9f",
    A1: "#86bb5f",
    A2: "#82ccdd",
    B1: "#079992",
    B2: "#6a89cc",
    C1: "#cca86b",
    C2: "#e58e26",
    D: "#e55039",
    E: "#b71540",
  };

  const colors = {
    seism,
    wind,
    snow,
  };

  const getColor = (type: "seism" | "wind" | "snow", key: string): string => {
    const colorObject = colors[type];
    if (colorObject.hasOwnProperty(key)) {
      return colorObject[key as keyof typeof colorObject];
    }
    return "#000000";
  };

  return (
    <Card className="w-full">
      <CardHeader className="p-3">
        <CardTitle className="text-lg font-semibold">{props.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-3">
        <div
          className="flex w-full justify-center"
          style={{
            color: getColor(props.type, props.value ?? ""),
          }}
        >
          {props.icon}
        </div>
        <div
          className="w-full text-right text-lg font-semibold"
          style={{
            color: getColor(props.type, props.value ?? ""),
          }}
        >
          {props.value}
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoneCard;
