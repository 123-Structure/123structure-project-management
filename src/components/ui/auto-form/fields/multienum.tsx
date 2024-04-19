import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import * as z from "zod";
import { Badge } from "../../badge";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { AutoFormInputComponentProps } from "../types";
import { getBaseSchema } from "../utils";

export default function AutoFormMultiEnum({
  label,
  isRequired,
  field,
  fieldConfigItem,
  zodItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  const baseValues = (getBaseSchema(zodItem) as unknown as z.ZodEnum<any>)._def
    .values;

  let values: [string, string][] = [];
  if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues);
  } else {
    values = baseValues.map((value) => [value, value]);
  }

  function findItem(value: any) {
    return values.find((item) => item[0] === value);
  }

  const [selectedValues, setSelectedValues] = useState<string[]>(
    field.value || []
  );

  return (
    <FormItem className="flex flex-col">
      <AutoFormLabel label={label} isRequired={isRequired} />
      <FormControl>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-fit">
            <Button variant="outline">
              {selectedValues.length
                ? selectedValues.sort().map((value, index) => (
                    <Badge
                      key={value}
                      variant={value === "autre" ? "secondary" : "default"}
                      className={
                        selectedValues.length - 1 === index ? "" : "mr-1"
                      }
                    >
                      {`${value[0].toUpperCase()}${value.slice(1)}`}
                    </Badge>
                  ))
                : "Selectioner des options"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {values.map(([value, label]) => (
              <DropdownMenuCheckboxItem
                checked={selectedValues.includes(value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedValues([...selectedValues, value]);
                  } else {
                    setSelectedValues(
                      selectedValues.filter((v) => v !== value)
                    );
                  }
                  field.onChange(selectedValues);
                }}
                key={value}
              >
                {`${label[0].toUpperCase()}${label.slice(1)}`}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </FormControl>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
