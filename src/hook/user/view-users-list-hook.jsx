import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../features/users/usersSlice";


const ViewUsersListHook = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
      } = useGetUsersQuery("getUsers");
    
      let content;
      if (isLoading) {
        content = <p>Loading...</p>;
      } else if (isSuccess) {
        content = users.ids.map((userId) => (
          <li key={userId}>
            <Link to={`/user/${userId}`}>{users.entities[userId].name}</Link>
          </li>
        ));
      } else if (isError) {
        content = <p>{error}</p>;
      }
    

      return [content]
}

export default ViewUsersListHook