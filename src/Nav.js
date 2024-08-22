import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({search, setsearch}) => {
  return (
    <nav className='Nav'> 
    <form className='searchForm' onSubmit={(e)=>e.preventDefault}>
      <label htmlFor='search'>search Posts</label>
      <input 
      type="text"
      id="seacrrh"
      placeholder='seacrh post'
      value={search} 
      onChange={(e)=> setsearch(e.target.value)}
      />
    </form>
    <ul>
      <li><Link to="/">HOME</Link></li>
      <li><Link to="post">POST</Link></li>
      <li><Link to="about">ABOUT</Link></li>

    </ul>
    </nav>
  )
}

export default Nav