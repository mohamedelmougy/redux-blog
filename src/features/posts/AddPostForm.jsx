import { useState } from "react";
import {  useAddNewPostMutation } from "./postsSlice";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersSlice";

const AddPostForm = () => {
  const navigate = useNavigate()
  const [addNewPost,{isLoading}]= useAddNewPostMutation()
  const {
    data: users,
    isLoading:isLoadingUsers,
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

  const onSavePostClicked =async () => {
         if (canSave) {
            try {
              await addNewPost({title,body:content,userId}).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate("/")
            } catch (err) {
                console.error('Failed to save the post', err)
            } 
        }
  };

  let userOptions;
  if (isLoadingUsers) {
    userOptions = <p>Loading...</p>;
  } else if (isSuccess) {
    userOptions = users.ids.map(userId=>(
      <option value={userId} key={userId}>
        {users.entities[userId].name}
      </option>
    ))
  } else if (isError) {
    userOptions = <p>{error}</p>;
  }



  return (
    <section>
      <h2>Add New post</h2>
      <form action="">
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onUserIdChange} >
            <option value=""></option>
            {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button  
            type="button" 
            onClick={onSavePostClicked}
            disabled={!canSave}
            >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
