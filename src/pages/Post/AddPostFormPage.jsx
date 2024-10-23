import AddPostFormHook from "../../hook/post/add-post-form-hook";

const AddPostForm = () => {
  const [
    userOptions,
    title,
    onTitleChange,
    userId,
    onUserIdChange,
    content,
    onContentChange,
    canSave,
    onSavePostClicked,
  ] = AddPostFormHook();

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
        <select id="postAuthor" value={userId} onChange={onUserIdChange}>
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
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
