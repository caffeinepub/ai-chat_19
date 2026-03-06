import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Conversation } from "../backend.d";
import { useActor } from "./useActor";

// ─── Conversations ────────────────────────────────────────────────

export function useGetConversations() {
  const { actor, isFetching } = useActor();
  return useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getConversations(BigInt(0), BigInt(100));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetConversation(conversationId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Conversation | null>({
    queryKey: ["conversation", conversationId?.toString()],
    queryFn: async () => {
      if (!actor || conversationId === null) return null;
      const result = await actor.getConversation(conversationId);
      return result ?? null;
    },
    enabled: !!actor && !isFetching && conversationId !== null,
  });
}

// ─── Mutations ────────────────────────────────────────────────────

export function useCreateConversation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createConversation(title);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useAddMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      conversationId,
      role,
      content,
    }: {
      conversationId: bigint;
      role: string;
      content: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.addMessage(conversationId, role, content);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: ["conversation", variables.conversationId.toString()],
      });
      void queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useDeleteConversation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (conversationId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      await actor.deleteConversation(conversationId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useUpdateConversationTitle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      conversationId,
      newTitle,
    }: {
      conversationId: bigint;
      newTitle: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.updateConversationTitle(conversationId, newTitle);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ["conversations"] });
      void queryClient.invalidateQueries({
        queryKey: ["conversation", variables.conversationId.toString()],
      });
    },
  });
}
