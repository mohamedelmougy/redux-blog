import { useState } from "react";
import {  useSelector } from "react-redux";
import {  useAddNewPostMutation } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
   const [addNewPost,{isLoading}]= useAddNewPostMutation()
    const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users=  useSelector(selectAllUsers)

  
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onUserIdChange = (e) => setUserId(e.target.value);
  
  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClick =async () => {
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



  const userOptions = users.map(user=>(
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ))

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
            onClick={onSavePostClick}
            disabled={!canSave}
            >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
