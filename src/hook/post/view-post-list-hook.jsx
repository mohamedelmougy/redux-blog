import PostsExcerpt from "../../components/Post/postExcerpt";
import { useGetPostsQuery } from "../../features/posts/postsSlice";

const ViewPostListHook = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery("getPosts");

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = posts.ids.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return [content];
};

export default ViewPostListHook;
