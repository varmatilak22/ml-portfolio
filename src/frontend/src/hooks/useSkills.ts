import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

export function useSkills() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<string[]>({
    queryKey: ["skills"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSkills();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateSkills() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: async (skills) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.setSkills(skills);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
}
