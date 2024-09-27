'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
import { fetchFeedForms } from "@/hooks/forms";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Forms({ params }: { params: { projectId: string } }) {
	const router = useRouter()
	const pathname = usePathname()
	const { data, isPending, isError, error } = useQuery({
		queryKey: ['forms'],
		queryFn: async () => fetchFeedForms(Number(params.projectId))
	})

	if (isError) {
		return <p>Error occured: {error.message}</p>
	}
	return (
		<div className="w-full h-full flex items-center justify-center">
			<Card>
				<CardHeader>
					<CardTitle>Forms</CardTitle>
					<CardDescription>List of forms attached to this feed</CardDescription>
				</CardHeader>
				<CardContent>
					{isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
					{data?.map((form) => (
						<>
							<Form key={form.id} title={String(form.id)} />
							<Separator />
						</>
					))}
				</CardContent>
				<CardFooter>
					<Button onClick={() => {
						router.push(`${pathname}/createform`)
					}}>New Form</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

const Form = (props: { title: string }) => {
	return (
		<div>
			{props.title}
		</div>
	)
}
