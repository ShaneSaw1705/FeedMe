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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Loader2 } from "lucide-react"
import { Input } from "./ui/input"
import { createFeed, fetchUserFeeds } from "@/hooks/feed"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'


export const NavBar = () => {
  const [modal, setModal] = useState(false);
  const router = useRouter(); // To handle navigation
  const qc = useQueryClient();

  const { mutate, isPending, isError, error: err } = useMutation({
    mutationKey: ['feed'],
    mutationFn: async (formData: FormData) => {
      const [err, res] = await createFeed(formData);
      if (err) {
        toast(`An error occurred: ${err}`);
      }
      if (res?.title != undefined) {
        toast(`Feed "${res?.title}" created successfully! 🎉`);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['feeds'] });
    },
  });

  const { data: feeds, isPending: feedsLoading, isError: feedError } = useQuery({
    queryKey: ['feeds'],
    queryFn: () => fetchUserFeeds(),
  });

  const handleSelect = (value: string) => {
    qc.setQueryData(['project'], null); // Reset project query data before fetching a new one
    qc.invalidateQueries({ queryKey: ['project'] }); // Invalidate project query
    router.push(`/dashboard/projects/?project=${value}`); // Navigate to the selected project
  };

  if (isError) {
    return <p>An error has occurred {`${err}`}</p>;
  }

  return (
    <>
      <div className="border-b-2 border-gray-200 p-2 flex flex-row justify-between items-center">
        <div className="z-50">
          {feedsLoading ? (
            <p>loading</p>
          ) : (
            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Feeds</SelectLabel>
                  {feedError && <SelectItem value="error">Failed to load Feeds</SelectItem>}
                  {feeds?.map((element) => (
                    <SelectItem value={`${element.id}`} key={element.id}>
                      {element.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
        <Button onClick={() => setModal(true)}>New Project</Button>
      </div>

      {/* Modal for creating a new feed */}
      {modal && (
        <div className="w-full h-screen flex justify-center items-center absolute top-0 right-0 left-0 bottom-0">
          <Card>
            <div className="w-full flex flex-row items-center justify-end">
              <Button onClick={() => setModal(false)} className="text-[14px] p-2 h-8 w-8" variant={'ghost'}>
                X
              </Button>
            </div>
            <CardHeader>
              <CardTitle>Create a Feed</CardTitle>
              <CardDescription>Enter a title for your feedback.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  mutate(formData);
                }}
                className="flex flex-col gap-2"
              >
                <label>Title</label>
                <Input type="text" name="title" required />
                {!isPending ? (
                  <Button>Create Feed</Button>
                ) : (
                  <Button disabled>
                    Please wait
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

