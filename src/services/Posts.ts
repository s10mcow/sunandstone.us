import api from "./Api";
import { useQuery } from "@tanstack/react-query";

type Post = { id: number; title: string; body: string; userId: number };

function createPostsQueryKey(params: { startDate?: number } = {}) {
  return ["post", params];
}

export function usePosts() {
  return useQuery({
    queryKey: createPostsQueryKey(),
    queryFn: async () =>
      (
        await api.get<Post[]>("https://jsonplaceholder.typicode.com/posts/", {
          baseURL: "",
        })
      ).data.slice(0, 5),
  });
}
