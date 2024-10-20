import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersSlice";

// eslint-disable-next-line react/prop-types
const PostAuthor = ({ userId }) => {
  const { user: author } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data, isLoading }) => ({
      user: data?.entities[userId],
    }),
  });

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
