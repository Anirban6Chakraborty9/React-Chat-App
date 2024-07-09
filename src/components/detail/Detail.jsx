import React from 'react';
import './detail.css';
import { auth, db } from "../../lib/firebase"
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

const Detail = () => {

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } =
    useChatStore();

  const { currentUser } = useUserStore();

  const handleBlock = async ()=>{
    if (!user) return;

    const userDocRef = doc(db,"users",currentUser.id)

    try{
      await updateDoc(userDocRef,{
        blocked: isReceiverBlocked ? arrayRemove(user.id): arrayUnion(user.id)
      });
      changeBlock();
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <div className="texts">
          <h2>{user?.username}</h2>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
          
      <div className="info">
        <div className="option">
          <div className="title">
            <p>Chat Settings</p>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <p>Privacy & Help</p>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <p>Shared Photos</p>
            <img src="./arrowUp.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photodetail">
                <img src="https://images.pexels.com/photos/20564358/pexels-photo-20564358/free-photo-of-a-woman-standing-by-a-lake-with-a-cell-phone.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                <span>photo_2024.png</span>
              </div>
              <img src="./download.png" className='download' alt="" />
            </div>
            <div className="photoItem">
              <div className="photodetail">
                <img src="https://images.pexels.com/photos/20564358/pexels-photo-20564358/free-photo-of-a-woman-standing-by-a-lake-with-a-cell-phone.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                <span>photo_2024.png</span>
              </div>
              <img src="./download.png" className='download' alt="" />
            </div>
            <div className="photoItem">
              <div className="photodetail">
                <img src="https://images.pexels.com/photos/20564358/pexels-photo-20564358/free-photo-of-a-woman-standing-by-a-lake-with-a-cell-phone.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                <span>photo_2024.png</span>
              </div>
              <img src="./download.png" className='download' alt="" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <p>Shared Files</p>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>{isCurrentUserBlocked ? "You are blocked!" : isReceiverBlocked ? "User Blocked!" : "Block user"}</button>
        <button className='logout' onClick={()=>auth.signOut()}>Logout</button>
      </div>
    </div>
  )
}

export default Detail
