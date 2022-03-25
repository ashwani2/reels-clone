import React,{useContext} from 'react'
import ProfileComp from "../components/ProfileComp.js";
import {AuthContext} from "../context/auth.js"
import {useRouter} from "next/router";
function profile() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {user} =useContext(AuthContext);

  const Redirect=()=>{
      const router=useRouter()
      router.push("/login");
      return null;
  }
  return (
    <div>
      {
        user?.uid?<ProfileComp/>:<Redirect/>
      }
      
      
      </div>
  )
}

export default profile