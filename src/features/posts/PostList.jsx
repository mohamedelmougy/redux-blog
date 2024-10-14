
import {  useSelector } from "react-redux";
import { getPostsError, getPostsStatus, selectPostIds } from "./postsSlice";
import PostsExcerpt from "./postsExcerpt";





const PostList = () => {

  const orderedPostIds = useSelector(selectPostIds)
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  

  let content;
  if (postsStatus === 'loading') {
      // eslint-disable-next-line react/no-unescaped-entities
      content = <p>"Loading..."</p>;
  } else if (postsStatus === 'succeeded') {
    content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
  } else if (postsStatus === 'failed') {
      content = <p>{error}</p>;
  }

    return (
      <section>

        {content}
      </section>
    );
  };

export default PostList;
