'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { testServer } from "@/hooks/testFunc"
import { useMutation } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

const LandingPage = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['testing'],
    mutationFn: testServer,
    onSuccess: () => {
      toast.success('Server hit!', {
        description: 'this is a test toast',
        action: {
          label: 'test action',
          onClick: () => console.log('action commited'),
        },
      })
    }
  })

  if (isError) {
    return <p>Error occured: {`${error}`}</p>
  }
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={() => mutate()} className="flex flex-col gap-2">
            <label>Email</label>
            <Input type="email" name="email" />
            <label>Password</label>
            <Input type="password" name="password" />
            <div className="grid grid-cols-2">
              {!isPending
                ?
                <Button variant={'outline'}>login</Button>
                :
                <Button variant={'outline'} disabled>
                  Loading...
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </Button>
              }
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LandingPage
