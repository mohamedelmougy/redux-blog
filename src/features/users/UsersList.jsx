import { useGetUsersQuery } from "./usersSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  
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

  return (
    <section>
      <h2>Users</h2>
      <ul>{content}</ul>
    </section>
  );
};

export default UsersList;
