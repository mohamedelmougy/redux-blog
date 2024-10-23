import { Link, useParams } from "react-router-dom";
import { useGetUsersQuery } from "../../features/users/usersSlice";
import { useGetPostsByUserIdQuery } from "../../features/posts/postsSlice";


const ViewUserPageHook = () => {
    const { userId } = useParams();
    const {
      user,
      isSuccess: isSuccessUser,
      isLoading: isLoadingUser,
      isError: isErrorUser,
      error: errorUser,
    } = useGetUsersQuery("getUsers", {
      selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
        user: data?.entities[userId],
        isLoading,
        isSuccess,
        isError,
        error,
      }),
    });
  
    const {
      data: postsForUser,
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetPostsByUserIdQuery(userId);
  
    let content;
    if (isLoading || isLoadingUser) {
      content = <p>Loading...</p>;
    } else if (isSuccess && isSuccessUser) {
      const { ids, entities } = postsForUser;
      content =  ids.map((id) => (
        <li key={id}>
          <Link to={`/post/${id}`}>{entities[id].title}</Link>
        </li>
      ))
    } else if (isError || isErrorUser) {
      content = <p>{error || errorUser}</p>;
    }
  

    return [user,content]
}

export default ViewUserPageHook