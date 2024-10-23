import ViewPostListHook from "../../hook/post/view-post-list-hook";


const PostsList = () => {
  const [content] = ViewPostListHook();

  return <section>{content}</section>;
};

export default PostsList;
