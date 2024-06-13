import React, { useEffect, useState } from 'react'
import { ImEmbed } from "react-icons/im";
import { FaLink } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import '../Style/Style.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ShareModal = (props) => {
  const [global,setGlob]=useState();
  useEffect(()=>{
    embed();
  },[])
  const embed=()=>{
    setGlob(props.emb)
    console.log(props.emb)
  }
  const urlShare=()=>{
    setGlob(props.urllink);
    console.log(props.urllink)
  }
  const copyto=async()=>{
    try{
      await navigator.clipboard.writeText(global)
      toast.success("Coppied!", {
        position: "top-center",
      });
    }catch(err){
      toast.warn(err, {
        position: "top-center",
      });
    }
  }
  return (
    <div>
        <div className="sharing" >
        <div className="child">
        <div className="sharing-Header">
            <div className='sharing-icons'>
            <FaLink className='emb-icon' onClick={urlShare}/>
            </div>
            <div className='sharing-icons'>
            <ImEmbed className='emb-icon' onClick={embed} />
            </div>
        </div>
        <div className='link-text'>
          <input type="text" value={global} disabled/>
        </div>
        <div className="link-button">
          <button onClick={copyto}>copy</button>
        </div>
        </div>
        <div className='close' onClick={props.eventClick}>
        <RxCross2 />
        </div>
        </div>
    </div>
    
  )     
}

export default ShareModal
