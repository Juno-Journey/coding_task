import React from 'react'
import './searchBar.styles.css'
import { IoIosSearch } from "react-icons/io";


const SearchBar = () => {
  
  return (
    <div className='searchBarContainer'>
      <IoIosSearch size={30}/>
      <input placeholder='Search'  />
    </div>
  )
}

export default SearchBar