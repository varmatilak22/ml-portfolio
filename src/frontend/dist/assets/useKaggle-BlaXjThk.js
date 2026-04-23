import { k as useActor, l as useQuery, o as useQueryClient, p as useMutation, m as createActor } from "./index-CtTdumja.js";
function useKaggleStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["kaggle-stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getKaggleStats();
    },
    enabled: !!actor && !isFetching
  });
}
function useSetKaggleStats() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (stats) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.setKaggleStats(stats);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kaggle-stats"] });
    }
  });
}
function useKaggleNotebooks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["kaggle-notebooks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getKaggleNotebooks();
    },
    enabled: !!actor && !isFetching
  });
}
function useAddKaggleNotebook() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addKaggleNotebook(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kaggle-notebooks"] });
    }
  });
}
function useUpdateKaggleNotebook() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateKaggleNotebook(id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kaggle-notebooks"] });
    }
  });
}
function useDeleteKaggleNotebook() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteKaggleNotebook(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kaggle-notebooks"] });
    }
  });
}
export {
  useAddKaggleNotebook as a,
  useUpdateKaggleNotebook as b,
  useDeleteKaggleNotebook as c,
  useKaggleStats as d,
  useSetKaggleStats as e,
  useKaggleNotebooks as u
};
