import React, { useEffect, useMemo } from 'react'

import classnames from 'classnames'
import { Spinner } from '../../components/Spinner'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { useGetPostsQuery } from '../api/apiSlice'

let PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export const PostsList = () => {
  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPostsQuery()

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice()
    //sorted posts in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])

  let content

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))

    const containerClassname = classnames('posts-container', {
      disabled: isFetching,
    })

    content = <div className={containerClassname}>{renderedPosts}</div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {content}
    </section>
  )
}
