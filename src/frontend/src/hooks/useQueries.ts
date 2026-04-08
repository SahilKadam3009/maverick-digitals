import { createActor } from "@/backend";
import type { BlogArticle, ContactSubmission } from "@/backend";
import type { ContactFormData } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type { BlogArticle, ContactSubmission };

export function useGetBlogArticles() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BlogArticle[]>({
    queryKey: ["blog-articles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBlogArticles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBlogArticleById(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BlogArticle | null>({
    queryKey: ["blog-article", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBlogArticleById(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchBlogArticles(
  searchQuery: string,
  category: string | null,
  tag: string | null,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BlogArticle[]>({
    queryKey: ["blog-search", searchQuery, category, tag],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchBlogArticles(searchQuery, category, tag);
    },
    enabled: !!actor && !isFetching && (!!searchQuery || !!category || !!tag),
  });
}

export function useGetContacts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ContactSubmission[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContacts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<bigint, Error, ContactFormData>({
    mutationFn: async (data: ContactFormData) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitContact(
        data.name,
        data.email,
        data.serviceType,
        data.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}
