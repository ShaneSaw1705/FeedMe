import { useQuery } from "@tanstack/react-query";
import { fetchUserFeeds } from "./feed";

export function useFeeds() {
  return useQuery({
    queryKey: ['feeds'],
    queryFn: fetchUserFeeds
  })
}
