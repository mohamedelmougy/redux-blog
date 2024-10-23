import ViewUserPageHook from "../../hook/user/view-user-page-hook";

const UserPage = () => {
  const [user, content] = ViewUserPageHook();

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{content}</ol>
    </section>
  );
};

export default UserPage;
