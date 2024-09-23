import React from "react"
import { getSession } from "@auth0/nextjs-auth0"
import { redirect } from "next/navigation"
import { NavBar } from "@/components/nav"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getSession()
  if (!user?.user) {
    redirect('/')
  }

  return (
    <div className="h-screen w-screen grid grid-rows-[auto_1fr]">
      <NavBar />
      {children}
    </div>
  )
}
export default DashboardLayout
