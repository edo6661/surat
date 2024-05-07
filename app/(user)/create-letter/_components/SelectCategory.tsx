"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormulirType, formulirList } from "@/constants/letter";
import { Role } from "@prisma/client";

interface SelectCategoryProps {
  handleSelect: (value: FormulirType) => void;
  letterCount?: Record<string, number>;
  role?: Role;
}

const SelectCategory = ({ handleSelect, letterCount, role }: SelectCategoryProps) => {
  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Select a Letter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Letter</SelectLabel>
          {formulirList.map((item) => (
            <div key={item}>
              <SelectItem key={item} value={item}>
                {item} {letterCount && letterCount[item] ? `(${letterCount[item]})` : ""}
              </SelectItem>
            </div>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;
