import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Project, ProjectInput } from "../types";

export function useProjects() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProject(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Project | null>({
    queryKey: ["project", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getProject(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useAddProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<Project, Error, ProjectInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addProject(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { id: bigint; input: ProjectInput }>({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateProject(id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
