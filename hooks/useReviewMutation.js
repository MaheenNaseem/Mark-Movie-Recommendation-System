import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(reviewData);
        }, 500);
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },
  });
};
