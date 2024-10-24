import { useAddNewPostMutation } from "../../features/posts/postsSlice";
import { useGetUsersQuery } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

const AddPostFormHook = (reset, watch) => {
  const navigate = useNavigate();
  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const {
    data: users,
    isLoading: isLoadingUsers,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  const { postTitle, postContent, postAuthor } = watch();

  const canSave =
    [postTitle, postContent, postAuthor].every(Boolean) && !isLoading;

  const onSavePostClicked = async (data) => {
    if (!isLoading) {
      console.log(data);
      try {
        await addNewPost({
          title: data.postTitle,
          body: data.postContent,
          userId: data.postAuthor,
        }).unwrap();
        reset();
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  let userOptions;
  if (isLoadingUsers) {
    userOptions = <p>Loading...</p>;
  } else if (isSuccess) {
    userOptions = users.ids.map((userId) => (
      <option value={userId} key={userId}>
        {users.entities[userId].name}
      </option>
    ));
  } else if (isError) {
    userOptions = <p>{error}</p>;
  }

  return [userOptions, canSave, onSavePostClicked];
};

export default AddPostFormHook;
