import { Button } from "@/components/ui/button"
import React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen grid grid-rows-[auto_1fr]">
      <div className="border-b-2 border-gray-200 p-2 flex flex-row justify-between items-center">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Project" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Feeds</SelectLabel>
              <SelectItem value="apple">Test1</SelectItem>
              <SelectItem value="banana">Test2</SelectItem>
              <SelectItem value="blueberry">Test3</SelectItem>
              <SelectItem value="grapes">Test4</SelectItem>
              <SelectItem value="pineapple">Test5</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button>New Project</Button>
      </div>
      <div className="grid grid-cols-[auto_1fr] h-full w-full">
        <div className="flex flex-col gap-2 border-r-2 border-gray-200 min-w-[250px]">
          <Button variant={'ghost'}>Home</Button>
          <Button variant={'ghost'}>Feeds</Button>
          <Button variant={'ghost'}>Profile</Button>
        </div>
        {children}
      </div>
    </div>
  )
}
export default DashboardLayout
