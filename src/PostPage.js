import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PostPage = ({posts, handleDelete}) => {
  const {id} = useParams()
    const post=posts.find(post=>(post.id).toString()===id)
  return (
    <main className='PostPage'>
      <article className='post'>
        {post&&
        <>
        <h2>{post.title}</h2>
        <p className='postBody'>{post.body}</p>
        <Link to={`/edit/${post.id}`}>
        <button className='editbutton'>Edit post</button>
        </Link>
        <button onClick={()=>handleDelete(post.id) } className='deletebutton'>delete post</button>
        </>
        }
        {
          !post&&
          <>
          <h2>
            post NOT Found
          </h2>
          <p>well,that disappinting</p>
          <p>
            <Link to="/">visit Our Homepage</Link>
          </p>
          </>
        }

      </article>
    </main>
    
  )
}

export default PostPage