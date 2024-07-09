import React, { useEffect, useState } from 'react'
import "./chatlist.css";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useUserStore } from "../../../lib/userStore"
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';

const Chatlist = () => {

  const [chats,setChats] = useState([]);

  const { currentUser } = useUserStore()
  const { chatId, changeChat } = useChatStore()

  useEffect(()=>{
      const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
        const items = res.data().chats;

         const promises = items.map(async  (item)=>{
            const userDocRef = doc(db,"users",item.receiverId);
            const userDocSnap = await getDoc(userDocRef);

            const user = userDocSnap.data();
            return {...item, user};
         });

         const chatData = await Promise.all(promises);
         setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt));
      }
  );

    return ()=>{
      unSub()
    }
  },[currentUser.id]);

  const handleSelect = async (chat) =>{
    const userChats = chats.map((item)=>{
      const {user, ...rest} = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen=true;
    const userChatsRef = doc(db, "userchats", currentUser.id);

    try{
      await updateDoc(userChatsRef,{
        chats:userChats
      });
      changeChat(chat.chatId,chat.user);
    }catch(err){
      console.log(err);
    }

  }

  return (
    <div className='chatlist'>
      {chats.map(chat=>(
        <div 
        className="item" 
        key={chat.chatId} 
        onClick={()=>handleSelect(chat)}
        style={{backgroundColor: chat?.isSeen ? "transparent" : "#1a59c688"}}>
          <img src={chat.user.blocked.includes(currentUser.id) ? "./avatar.png" : chat.user.avatar } alt=""/>
          <div className="text">
              <span>{chat.user.blocked.includes(currentUser.id) ? "User" : chat.user.username}</span>
              <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      
    </div>
  )
}

export default Chatlist
