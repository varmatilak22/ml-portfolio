import { k as useActor, l as useQuery, o as useQueryClient, p as useMutation, m as createActor } from "./index-CtTdumja.js";
function useSkills() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSkills();
    },
    enabled: !!actor && !isFetching
  });
}
function useUpdateSkills() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (skills) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.setSkills(skills);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    }
  });
}
export {
  useUpdateSkills as a,
  useSkills as u
};
