import { useState } from "react";
import { useAddNewPostMutation } from "../../features/posts/postsSlice";
import { useGetUsersQuery } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

const AddPostFormHook = () => {
  const navigate = useNavigate();
  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const {
    data: users,
    isLoading: isLoadingUsers,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onUserIdChange = (e) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, body: content, userId }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
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

  return [
    userOptions,
    title,
    onTitleChange,
    userId,
    onUserIdChange,
    content,
    onContentChange,
    canSave,
    onSavePostClicked,
  ];
};

export default AddPostFormHook;
