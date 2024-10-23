import PostAuthor from "../../components/Post/PostAuthor";
import TimeAgo from "../../components/Post/TimeAgo";
import ReactionButtons from "../../components/Post/ReactionButtons";
import { Link } from "react-router-dom";
import ViewSinglePostsPage from "../../hook/post/view-single-posts-page-hook";

const SinglePostPage = () => {
  const [post] = ViewSinglePostsPage();

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
