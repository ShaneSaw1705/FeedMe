'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Loader2 } from "lucide-react"
import { Input } from "./ui/input"
import { createFeed, fetchUserFeeds } from "@/hooks/feed"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const NavBar = () => {
  const [modal, setModal] = useState(false)
  const qc = useQueryClient()
  const { mutate, isPending, isError, error: err } = useMutation({
    mutationKey: ['feed'],
    mutationFn: async (formData: FormData) => {
      const [err, res] = await createFeed(formData)
      if (err) {
        toast(`An error occured: ${err}`)
      }
      console.log(res)
      if (res?.title != undefined) {
        toast(`Feed called "${res?.title}" has been created successfully! 🎉`)
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['feeds'] })
    }
  })
  const { data: feeds, isPending: feedsLoading, isError: feedError, error } = useQuery({
    queryKey: ['feeds'],
    queryFn: () => fetchUserFeeds()
  })

  if (isError) {
    return <p>An error has occured {`${err}`}</p>
  }
  if (feedError) {
    return <p>Error loading feeds: {error.message}</p>
  }

  return (
    <>
      <div className="border-b-2 border-gray-200 p-2 flex flex-row justify-between items-center">
        {feedsLoading ? <p>loading</p> :
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Feeds</SelectLabel>
                {feeds?.map((element) => (
                  <SelectItem value={element.title} key={element.id}>{element.title}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        }
        <Button onClick={() => setModal(true)}>New Project</Button>
      </div>
      {modal &&
        <div className="w-full h-screen flex justify-center items-center absolute top-0 right-0 left-0 bottom-0">
          <Card>
            <div className="w-full flex flex-row items-center justify-end">
              <Button onClick={() => setModal(false)} className="text-[14px] p-2 h-8 w-8" variant={'ghost'}>X</Button>
            </div>
            <CardHeader>
              <CardTitle>Create a Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={async (e) => {
                e.preventDefault() // Prevent the default form submission behavior
                const formData = new FormData(e.target as HTMLFormElement)
                mutate(formData)
              }} className="flex flex-col gap-2">
                <label>Title</label>
                <Input type="text" name='title' />
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
      }
    </>
  )
}
