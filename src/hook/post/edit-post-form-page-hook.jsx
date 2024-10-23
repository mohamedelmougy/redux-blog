import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from "../../features/posts/postsSlice";
import { useGetUsersQuery } from "../../features/users/usersSlice";

const EditPostFormPageHook = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const {
    post,
    isLoading: isLoadingPosts,
    isSuccess,
  } = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({
      post: data?.entities[postId],
      isLoading,
      isSuccess,
    }),
  });

  const { data: users, isSuccess: isSuccessUsers } =
    useGetUsersQuery("getUsers");

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);

  useEffect(() => {
    if (isSuccess) {
      setTitle(post.title);
      setContent(post.body);
      setUserId(post.userId);
    }
  }, [isSuccess, post?.title, post?.body, post?.userId]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await updatePost({
          id: post.id,
          title,
          body: content,
          userId,
        }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  
  let usersOptions;
  if (isLoadingPosts) {
    usersOptions = <p>Loading...</p>;
  } else if (isSuccessUsers) {
    usersOptions = users.ids.map((id) => (
      <option key={id} value={id}>
        {users.entities[id].name}
      </option>
    ));
  } else if (!post) {
    usersOptions = (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onDeletePostClicked = async () => {
    try {
      await deletePost({ id: post.id }).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  return [
    title,
    onTitleChanged,
    userId,
    onAuthorChanged,
    usersOptions,
    onContentChanged,
    onSavePostClicked,
    canSave,
    onDeletePostClicked,
    content,
  ];
};

export default EditPostFormPageHook;
