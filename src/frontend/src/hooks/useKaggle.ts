import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  KaggleNotebook,
  KaggleNotebookInput,
  KaggleStats,
} from "../types";

export function useKaggleStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<KaggleStats | null>({
    queryKey: ["kaggle-stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getKaggleStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetKaggleStats() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, KaggleStats>({
    mutationFn: async (stats) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.setKaggleStats(stats);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kaggle-stats"] });
    },
  });
}

export function useKaggleNotebooks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<KaggleNotebook[]>({
    queryKey: ["kaggle-notebooks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getKaggleNotebooks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddKaggleNotebook() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<KaggleNotebook, Error, KaggleNotebookInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addKaggleNotebook(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kaggle-notebooks"] });
    },
  });
}

export function useUpdateKaggleNotebook() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    boolean,
    Error,
    { id: bigint; input: KaggleNotebookInput }
  >({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateKaggleNotebook(id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kaggle-notebooks"] });
    },
  });
}

export function useDeleteKaggleNotebook() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteKaggleNotebook(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kaggle-notebooks"] });
    },
  });
}
