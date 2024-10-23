import { useGetPostsQuery } from "../../features/posts/postsSlice";

const ViewPostExcerptHook = (postId) => {

  const { post } = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });

  
  return [post];
};

export default ViewPostExcerptHook;
