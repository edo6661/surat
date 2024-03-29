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
import { useState } from "react";

interface SelectCategoryProps {
  handleSelect: (value: FormulirType) => void;
}

const SelectCategory = ({ handleSelect }: SelectCategoryProps) => {
  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Select a Letter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Letter</SelectLabel>
          {formulirList.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;
