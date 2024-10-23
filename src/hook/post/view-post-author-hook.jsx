import {useGetUsersQuery} from "../../features/users/usersSlice"

const ViewPostAuthorHook = (userId) => {
    const { user: author } = useGetUsersQuery("getUsers", {
        selectFromResult: ({ data, isLoading }) => ({
          user: data?.entities[userId],
        }),
      });

      return [author]
}

export default ViewPostAuthorHook