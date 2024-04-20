import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dispatch, SetStateAction } from "react";
import { Badge } from "./ui/badge";

interface IMultiselectProps {
  title: string;
  values: string[];
  selectedValues: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
}

const Multiselect = (props: IMultiselectProps) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">{props.title}</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-fit">
          <Button variant="outline">
            {props.selectedValues.length
              ? props.selectedValues.sort().map((value, index) => (
                  <Badge
                    key={value}
                    // variant={value === "autre" ? "secondary" : "default"}
                    className={
                      props.selectedValues.length - 1 === index ? "" : "mr-1"
                    }
                  >
                    {value}
                  </Badge>
                ))
              : "Sélectionner des options"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Multiselect;
