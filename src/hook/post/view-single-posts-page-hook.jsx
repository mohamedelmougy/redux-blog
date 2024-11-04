import { useParams } from "react-router-dom"
import { useGetPostsQuery } from "../../features/posts/postsSlice"

const ViewSinglePostsPageHook = () => {
 
    const {postId}= useParams()

    const { post, isLoading } = useGetPostsQuery('getPosts', {
        selectFromResult: ({ data, isLoading }) => ({
            post: data?.entities[postId],
            isLoading
        }),
    })
    if (isLoading) return <p>Loading...</p>

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }


    return post
}

export default ViewSinglePostsPageHook