import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import './index.scss'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }
  const data = await response.json()
  return data.slice(0, 10) // Only show the first 10 posts
}

const deletePost = async (postId: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      method: 'DELETE',
    },
  )
  if (!response.ok) {
    throw new Error('Failed to delete post')
  }
  return postId
}

function Example() {
  const queryClient = useQueryClient()

  // Fetch posts
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  // Mutation to delete post optimistically
  const mutation = useMutation({
    mutationFn: () => deletePost(1),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      // Snapshot current state
      const previousPosts = queryClient.getQueryData<Post[]>(['posts'])

      // Optimistically remove post with ID 1
      queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) => {
        return oldPosts ? oldPosts.filter((post) => post.id !== 1) : []
      })

      // Return previous state to OnError for rolling back optimistic update
      return { previousPosts }
    },
    onError: (err, variables, context) => {
      // Rollback to previous state
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts)
      }
    },
  })

  const deleteFirstPost = () => {
    'background only'
    mutation.mutate()
  }

  const renderContent = () => {
    if (isLoading) {
      return <text className="container__loading">Loading...</text>
    }

    if (isError) {
      return (
        <text className="container__error">
          {error?.message || 'Error fetching posts'}
        </text>
      )
    }

    return posts?.map((post) => (
      <view key={post.id} className="container__post">
        <text className="container__post-text">{`${post.id} : ${post.title}`}</text>
      </view>
    ))
  }

  return (
    <view className="container">
      {renderContent()}

      {/* Button to trigger mutation */}
      <view bindtap={deleteFirstPost} className="container__button">
        <text className="container__button-text">Delete Post 1</text>
      </view>
    </view>
  )
}

export { Example }
