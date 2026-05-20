import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../services/tmdb";

export const useMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchPopularMovies,
  });
};
