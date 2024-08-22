import React from 'react'

const NewPost = ({
  handlesubmit, postTitle, setpostTitle, postBody, setpostBody
}) => {
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form className='newPostForm' onSubmit={handlesubmit}>
        <label htmlFor='postTitle'>Title</label>
        <input
        id="postTitle"
        type="text"
        required
        value={postTitle}
        onChange={(e)=>setpostTitle(e.target.value)}
        />
        <label htmlFor='postBody'>post :</label>
        <textarea
        id='postBody'
        required
        value={postBody}
        onChange={(e)=>setpostBody(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>

    </main>
  )
}

export default NewPost