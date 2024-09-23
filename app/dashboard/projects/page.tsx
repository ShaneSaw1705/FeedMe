'use client'
import { fetchSingleFeed } from '@/hooks/feed'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const Projects = () => {
  const searchParams = useSearchParams()
  const selectedProject = searchParams.get('project')
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['project'],
    queryFn: () => fetchSingleFeed(selectedProject || '')
  })

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  if (isPending) {
    return <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  }
  return (
    <div>
      {selectedProject ? (
        <p>Selected Project: {data?.title}</p>
      ) : (
        <p>No project selected</p>
      )}
    </div>
  )
}

export default Projects
