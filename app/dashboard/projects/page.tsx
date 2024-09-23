'use client'
import { fetchSingleFeed } from '@/hooks/feed'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'


const Projects = () => {
  const searchParams = useSearchParams();
  const selectedProject = searchParams.get('project');

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['project', selectedProject], // Add the selected project to the queryKey to ensure it fetches fresh data
    queryFn: () => fetchSingleFeed(selectedProject || ''),
    enabled: !!selectedProject, // Only run query if a project is selected
  });

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (isPending) {
    return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
  }

  if (!selectedProject) {
    return <p>No project selected</p>
  }

  return (
    <div>
      <p>Selected Project: {data?.title}</p>
    </div>
  );
};

export default Projects;

