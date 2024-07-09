import React, { useState } from 'react'
import "./login.css";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import upload from '../../lib/upload';

const Login = () => {

    const [avatar,setAvatar] = useState({
        file: null,
        url:""
    })

    const [loading,setLoading] = useState(false);

    const handleAvatar = e =>{
        if (e.target.files[0])
        setAvatar({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })
    }

    const handleLogIn = async (e) =>{
      e.preventDefault();
      setLoading(true);
      toast.success("Signing in...");
      const formData = new FormData(e.target);
      const {email,password} = Object.fromEntries(formData);

      try{
          await signInWithEmailAndPassword(auth,email,password)

          toast.success("Signed in..."); 
      }
      catch(err){
        let errormessage = err.message.split(" ")
        let message = errormessage[2];
        let result = message.slice(6, -2);
        if (result == "invalid-email")
          toast.error("Invalid email...");
        else
          toast.error(result);
      }
      finally{
        setLoading(false);
      }

    }

    const handleRegister = async (e) =>{
      e.preventDefault();
      setLoading(true);
      toast.success("Registering new user details...");
      const formData = new FormData(e.target);
      const {username,email,password} = Object.fromEntries(formData);

      try{
          const res = await createUserWithEmailAndPassword(auth,email,password)

          const imgUrl = await upload(avatar.file)

          await setDoc(doc(db, "users", res.user.uid), {
            username,
            email,
            avatar:imgUrl,
            id: res.user.uid,
            blocked:[],
          });

          await setDoc(doc(db, "userchats", res.user.uid), {
            chats:[],
          });
          
          toast.success("Successfully registered ! You can log in now...");
      }
      catch(err){
        let errormessage = err.message.split(" ")
        let message = errormessage[2];
        let result = message.slice(6, -2);
        if (result == "invalid-email")
          toast.error("Invalid email...");
        else
          toast.error(result);
      }
      finally{
        setLoading(false);
      }
    }

  return (
    <div className='login'>
      <div className="item signin">
        <h2>Welcome back</h2>
        <form onSubmit={handleLogIn}>
            <input type="text" placeholder='Email' name="email" />
            <input type="password" placeholder='Password' name="password" />
            <button className=" signin" disabled={loading}>{loading ? "loading" : "Sign in"}</button>
        </form>
      </div>
      <div className="seperator"></div>
      <div className="item signup">
        <h2>Create an account</h2>
        <form onSubmit={handleRegister}>
            <label htmlFor="file">
                <img src={avatar.url || "./avatar.png"} alt="" />
                Upload an image: </label>
            <input type="file" style={{display:"none"}} id="file"
            onChange={handleAvatar} />
            <input type="text" placeholder='Username' name="username" />
            <input type="text" placeholder='Email' name="email" />
            <input type="password" placeholder='Password' name="password" />
            <button className="signup" disabled={loading} >{loading ? "loading" : "Sign up"}</button>
        </form>
      </div>
    </div>
  )
}

export default Login
