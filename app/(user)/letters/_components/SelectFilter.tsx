import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Role } from '@prisma/client';
import React from 'react'

interface SelectFilterProps {
  handleSelect: (value: string) => void;
  letterCount: any;
  role: Role;
}

const SelectFilter = (
  {
    handleSelect,
    letterCount,
    role
  }: SelectFilterProps
) => {
  const filterList = [
    "All",
    "Approved",
    "Not Approved",
  ]
  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Select a Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter</SelectLabel>
          {filterList.map((item) => (
            <div key={item}>
              <SelectItem key={item} value={item}>
                {item} {letterCount[item]}
              </SelectItem>
            </div>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectFilter