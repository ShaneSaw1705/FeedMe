'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { testServer } from "@/hooks/testFunc"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

const LandingPage = () => {
  const { user } = useUser()
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['test'],
    mutationFn: testServer,
    onSuccess: () => {
      toast.success('Button was pressed and the server was hit!', {
        description: 'This is where the description would show',
        action: {
          label: 'Log',
          onClick: () => console.log('action')
        }
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
          <CardTitle className="text-3xl">{user ? `Hello, ${user.name}` : 'Sign in?'}</CardTitle>
        </CardHeader>
        <CardContent>
          {user?.sub}
        </CardContent>
        <CardFooter>
          {!isPending ?
            <Button variant={'outline'} onClick={() => mutate()}>Press me</Button>
            :
            <Button variant={'outline'} disabled>
              Please wait
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          }
          <Button className="bg-green-300"><a href="/api/auth/login">login</a></Button>
          {user && <Button variant={'destructive'}><a href="/api/auth/logout">Logout</a></Button>}
        </CardFooter>
      </Card>
    </div>
  )
}

export default LandingPage
