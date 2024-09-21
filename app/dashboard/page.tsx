'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { createFeed } from "@/hooks/createFeed"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

const Home = () => {
  const { mutate, isPending, isError, error: err } = useMutation({
    mutationKey: ['feed'],
    mutationFn: async (formData: FormData) => {
      const [err, res] = await createFeed(formData)
      if (err) {
        toast(`An error occured: ${err}`)
      }
      console.log(res)
      toast(`Feed called "${res?.title}" has been created successfully! 🎉`)
    }
  })

  if (isError) {
    return <p>An error has occured {`${err}`}</p>
  }

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
          <form action={async (formData: FormData) => {
            mutate(formData)
          }} className="flex flex-col gap-2">
            <label>Title</label>
            <Input type="text" name="title" />
            {!isPending ?
              <Button variant={'outline'}>Create Feed</Button>
              :
              <Button variant={'outline'} disabled>
                Please wait
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </Button>
            }
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
