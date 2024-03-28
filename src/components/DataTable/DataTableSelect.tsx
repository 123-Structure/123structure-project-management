"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface IDataTableSelectProps {
  itemType: string;
  itemPerPage: string;
  setItemPerPage: React.Dispatch<React.SetStateAction<string>>;
}

const DataTableSelect = (props: IDataTableSelectProps) => {
  const options = ["10", "20", "50", "100"];

  return (
    <div className="flex items-center gap-2 text-base font-normal">
      <p className="hidden md:block">{`Nombre de ${props.itemType.toLowerCase()} par page :`}</p>
      <Select onValueChange={props.setItemPerPage} defaultValue={props.itemPerPage}>
        <SelectTrigger className="w-20 ">
          <SelectValue placeholder={props.itemPerPage} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DataTableSelect;
