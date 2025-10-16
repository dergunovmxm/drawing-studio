import { useQuery } from "@tanstack/react-query";
import { fetchGallery } from "../api/fetch";

export const useFetchImage = () => {
  const {
    data: items,
    isLoading,
    isFetching,
    isPending,
    error,
  } = useQuery({
    queryKey: ["gallery"],
    queryFn: fetchGallery,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    data: items,
    isLoading,
    isFetching,
    isPending,
    error,
  };
};
