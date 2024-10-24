import { useForm } from "react-hook-form";
import AddPostFormHook from "../../hook/post/add-post-form-hook";

const AddPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [userOptions, canSave, onSavePostClicked] = AddPostFormHook(reset,watch);

  return (
    <section>
      <h2>Add New post</h2>
      <form onSubmit={handleSubmit(onSavePostClicked)}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          {...register("postTitle", { required: "Title is required" })}
        />
        {errors.postTitle && <p>{errors.postTitle.message}</p>}

        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          {...register("postAuthor", { required: "Author is required" })}
        >
          <option value=""></option>
          {userOptions}
        </select>
        {errors.postAuthor && <p>{errors.postAuthor.message}</p>}

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          {...register("postContent", { required: "Content is required" })}
        />
        {errors.postContent && <p>{errors.postContent.message}</p>}

        <button type="submit" disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
