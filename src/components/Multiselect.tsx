import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

interface IMultiselectProps {
  title: string;
  values:
    | string[]
    | {
        [key: string]: string[];
      };
  selectedValues: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
  orientation?: "row" | "column";
  customValue?: boolean;
}

const Item = (props: IMultiselectProps) => {
  if (Array.isArray(props.values)) {
    return (
      <>
        {props.values.map((value) => (
          <DropdownMenuCheckboxItem
            checked={props.selectedValues.includes(value)}
            onCheckedChange={(checked) => {
              if (checked) {
                props.setSelectedValues([...props.selectedValues, value]);
              } else {
                props.setSelectedValues(
                  props.selectedValues.filter((v) => v !== value)
                );
              }
            }}
            key={value}
          >
            {value}
          </DropdownMenuCheckboxItem>
        ))}
      </>
    );
  } else if (typeof props.values === "object") {
    const keys = Object.keys(props.values);
    return (
      <ScrollArea className="h-96">
        {keys.map((key, index) => (
          <div key={key}>
            {index > 0 ? <DropdownMenuSeparator /> : <></>}
            <DropdownMenuLabel>{key}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(props.values as { [key: string]: string[] })[key].map((value) => (
              <DropdownMenuCheckboxItem
                checked={props.selectedValues.includes(value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    props.setSelectedValues([...props.selectedValues, value]);
                  } else {
                    props.setSelectedValues(
                      props.selectedValues.filter((v) => v !== value)
                    );
                  }
                }}
                key={value}
              >
                {value}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
        ))}
      </ScrollArea>
    );
  }

  return <></>;
};
const Multiselect = (props: IMultiselectProps) => {
  const handleRemoveValue = (value: string) => {
    props.setSelectedValues(props.selectedValues.filter((v) => v !== value));
  };

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">{props.title}</p>
      <div
        className="flex items-center gap-2"
        style={{
          flexDirection: props.orientation,
          alignItems: props.orientation === "column" ? "flex-start" : "",
        }}
      >
        {props.selectedValues.sort().map((value, index) => (
          <Badge
            key={value}
            // variant={value === "autre" ? "secondary" : "default"}
            className="flex gap-2"
          >
            {value}
            <Trash2
              className="size-4 transition-all duration-200 ease-in-out hover:scale-110 hover:cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveValue(value);
              }}
            />
          </Badge>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {props.selectedValues.length > 0 ? (
              <Button variant="outline" size="icon">
                <Plus className="size-4" />
              </Button>
            ) : (
              <Button variant="outline" className="w-fit">
                <Plus className="mr-2 size-4" />
                Sélectionner des options
              </Button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {props.customValue ? (
              <>
                <Input placeholder="..." className="m-1 mb-2 w-52" />
                <DropdownMenuSeparator />
              </>
            ) : (
              <></>
            )}

            <Item {...props} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Multiselect;
