import PostAuthor from "../../components/Post/PostAuthor";
import TimeAgo from "../../components/Post/TimeAgo";
import ReactionButtons from "../../components/Post/ReactionButtons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetPostsQuery } from "../../features/posts/postsSlice";
const SinglePostPage = () => {
  const { postId } = useParams();

  const { post, isLoading } = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data, isLoading }) => ({
      post: data?.entities[postId],
      isLoading,
    }),
  });
  if (isLoading) return <p>Loading...</p>;

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
