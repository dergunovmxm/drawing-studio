import { useQuery } from "@tanstack/react-query";
import { fetchGallery } from "../api/fetch";

export const useFetchImage = () => {
  const {
    data: items,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gallery"],
    queryFn: fetchGallery,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    data: items,
    isLoading,
    error,
  };
};
