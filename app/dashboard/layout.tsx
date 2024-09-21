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
import { getSession } from "@auth0/nextjs-auth0"
import { redirect } from "next/navigation"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getSession()
  if (!user?.user) {
    redirect('/')
  }
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
      {children}
    </div>
  )
}
export default DashboardLayout
