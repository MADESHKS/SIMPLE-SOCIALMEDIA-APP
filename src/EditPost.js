import { useEffect } from "react"
import { useParams } from "react-router-dom"
import React from "react"

const EditPost =({
     posts,handleEdit,seteditBody,editBody,seteditTitle,editTitle
})=>{
     const {id}=useParams()
     const post=posts.find(post=>(post.id).toString()===id)
     useEffect(()=>{
          if(post){
               seteditBody(post.title)
               seteditTitle(post.body)
          }

     },[post,seteditBody,seteditTitle])
return(
     <main className="NewPost">
          {editTitle && <>
          <h2>Edit Post</h2>
          <form className='newPostForm'
          onSubmit={(e)=>e.preventDefault()}>
               <label
               htmlFor="postTitle">Title</label>
               <input
               id='postTitle'
               type='text'
               required
               value={editTitle}
               onChange={(e)=>seteditTitle(e.target.value)}/>
                <label
               htmlFor="postBody">Post</label>
               <textarea
               id='postBody'
               type='text'
               required
               value={editBody}
               onChange={(e)=>seteditBody(e.target.value)}/>
               <button type="submit" onClick={()=>handleEdit(post.id)}>Submitt</button>
          </form>
          </>}

     </main>
)
}

export default EditPost