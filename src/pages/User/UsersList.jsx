import ViewUsersListHook from "../../hook/user/view-users-list-hook";


const UsersList = () => {
  const [content] =ViewUsersListHook()


  return (
    <section>
      <h2>Users</h2>
      <ul>{content}</ul>
    </section>
  );
};

export default UsersList;
