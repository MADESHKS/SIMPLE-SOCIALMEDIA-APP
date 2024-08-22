
import React, { useEffect, useState } from "react";
import About from "./About";
import Footer from "./Footer";
import Head from "./Head";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import EditPage from './EditPost.js'
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import api from "./api/posts";
import Post from "./Post";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [posts,setposts]=useState([])
  const [search, setsearch]=useState('')
  const[searchresults, setsearchresults]=useState([])
  const[postTitle, setpostTitle]=useState('')
  const[postBody, setpostBody]=useState('')
  const[editTitle, seteditTitle]=useState('')
  const[editBody, seteditBody]=useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchPosts =async ()=>{
      try{
        const response = await api.get('/posts' )
          setposts(response.data)
      }catch(err){
        if (err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        }else{
          console.log(`Error:${err.message}`)
        }
      }
       
    }
    fetchPosts()
   },[])

  useEffect(()=>{
  const filterresults=posts.filter((post)=>
  ((post.body).toLowerCase()).includes(search.toLowerCase())
  ||((post.title).toLowerCase()).includes(search.toLowerCase())
  )
  setsearchresults(filterresults.reverse())
  },[posts, search])


  const handlesubmit= async (e)=>{
    e.preventDefault();
    const id= posts.length ? posts[posts.length-1].id+1:1
    const newPost={id,title:postTitle,  body:postBody}
    try {const response = await api.post('/posts',newPost)
      const allPost= [...posts,response]
      setposts(allPost)
      setpostTitle('')
      setpostBody('')
      navigate('/')
    }catch(err){
      if (err.response){
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      }else{
        console.log(`Error:${err.message}`)
      }
    }
      

  }
  const handleEdit = async(id)=>{
    const updatePost ={
      id,title:editTitle,body:editBody 
    }
    try{
      const response = await api.put(`/posts/${id}`,updatePost)
      setposts(posts.map((post)=>post.id===id?{...response.data}:post))
      seteditTitle('')
      seteditBody('')
      navigate('/')
      
    }catch(err){
      console.log(`Error: ${err.message}`)
    }
  }
  const handleDelete=async(id) =>{
    try{
    await api.delete(`posts/${id}`)
    const postList=posts.filter(post=>post.id !== id);
    setposts(postList)
    navigate('/')
  }catch(err){
    if (err.response){
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)
    }else{
      console.log(`Error:${err.message}`)
    }
  }

  }
  return (
    <div className="App">
      <Head  mtitle="social media"/>
      <Nav 
      search={search}
      setsearch={setsearch}
      />
     <Routes>
      <Route path="/" element={<Home posts={searchresults}/>}/>     
      <Route path="post">
      <Route index element={<NewPost 
      handlesubmit={handlesubmit}
      postTitle={postTitle}
      setpostTitle={setpostTitle}
      postBody={postBody}
      setpostBody={setpostBody}
      />}/>

      <Route path=":id" element={<PostPage 
      posts={posts} 
      handleDelete={handleDelete}/>} />
      </Route>
      <Route path="/edit/:id" element={<EditPage 

            posts={posts}
            handleEdit={handleEdit}
            editBody={editBody}
            seteditBody={seteditBody}
            editTitle={editTitle}
            seteditTitle={seteditTitle}/>
      }/>
      <Route path="about" element={<About />}/>
      <Route path="*" element={<Missing />} />
      </Routes>
      
      <Footer />
      
    </div>
  );
}

export default App;
