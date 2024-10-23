import { Link } from "react-router-dom";
import ViewPostAuthorHook from "../../hook/post/view-post-author-hook"

const PostAuthor = ({ userId }) => {
  
  const [author]= ViewPostAuthorHook(userId)


  return (
    <span>
      by{" "}
      {author ? (
        <Link to={`/user/${userId}`}>{author.name}</Link>
      ) : (
        "Unknoun author"
      )}
    </span>
  );
};

export default PostAuthor;
