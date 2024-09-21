'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const Home = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card>
        <div className="w-full flex flex-row items-center justify-end">
          <Button className="text-[14px] p-2 h-8 w-8" variant={'ghost'}>X</Button>
        </div>
        <CardHeader>
          <CardTitle>Create a Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2">
            <label>Title</label>
            <Input type="text" name="title" />
            <Button>Create</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
