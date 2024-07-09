import { useState } from "react";
import React from 'react';
import "./searchitem.css";
import AddUser from "./addUser/AddUser.jsx";

const Searchitem = () => {

  const [addMode,setAddMode] = useState(false);

  return (
    <div className='searchitem'>
      <div className="search">
        <div className="searchBar">
            <img src="./search.png" alt="" />
            <input type="text" placeholder='Search' />
        </div>
        <img 
        src={addMode ? "./minus.png" : "./plus.png"} alt="" className='add' 
        onClick={() => setAddMode((prev)=>!prev)}/>
      </div>
      {addMode && <AddUser/>}
    </div>
  )
}

export default Searchitem
