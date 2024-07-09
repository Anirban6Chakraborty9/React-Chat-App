import React from 'react';
import './list.css';
import Chatlist from './chatlist/Chatlist';
import Userinfo from './userinfo/Userinfo';
import Searchitem from './searchitem/Searchitem';

const List = () => {
  return (
    <div className='list'>
      <Userinfo/>
      <Searchitem/>
      <Chatlist/>
    </div>
  )
}

export default List
