'use client'
import { fetchSingleFeed } from '@/hooks/feed'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { ProjectDashboardComponent } from '@/components/project-dashboard'


export default function Projects({ params }: { params: { projectId: string } }) {
	const { data, isPending, isError, error } = useQuery({
		queryKey: ['project', params.projectId], // Add the selected project to the queryKey to ensure it fetches fresh data
		queryFn: () => fetchSingleFeed(params.projectId || ''),
		enabled: !!params.projectId, // Only run query if a project is selected
	});

	if (isError) {
		return <p>Error: {error.message}</p>;
	}

	if (isPending) {
		return (
			<div className='flex w-screen h-screen items-center justify-center'>
				<Loader2 className="mr-2 h-4 w-4 animate-spin" />
			</div>
		);
	}

	if (!params.projectId) {
		return <p>No project selected</p>
	}

	if (data == null) {
		return <p>data is non existance</p>
	}

	return (
		<div className='flex flex-col w-screen justify-center items-center'>
			<ProjectDashboardComponent project={data} />
		</div>
	);
};
