import React, { useState } from 'react'
import '../Style/Style.css'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Channel = () => {

  const [data,setDate]=useState({
    Video_Url:"",
    Video_title:"",
    description:"",
    views_count:`${Math.floor(Math.random()*9000)+100}`,
    date:"",
    channel_logo_url:"",
    channel_name:"",
    subscribers:`${Math.floor(Math.random()*300)+100}`,
    category:"",
    liked:`${Math.floor(Math.random()*400)+100}`,
    thumbnail:"",
    bucketlist:false,
    live:false
  })
  // Math.floor(Math.random()*900)+100
    const handle=async()=>{
      await axios.post('http://localhost:8080/video',data)
      .then(res=>{
        if(res.data.status==200){
          toast.success(`${res.data.message}`, {
            position: "top-center",
          });
        }else{
          toast.warn(`${res.data.message}`, {
            position: "top-center",
          });
        }
      })
    }
    const onHandleChange=(e,field)=>{
      e.preventDefault();
      setDate(prev=>({
        ...prev,
        [field]:e.target.value
      }))
      console.log(data)
    }
  return (
    <div className='channel'>
      <ToastContainer />
    <div className='channel-fields'>
    <div><input type="text"  className="inputs input1" onChange={(e)=>onHandleChange(e, "Video_Url")} placeholder='Video Url'/></div>
    <div><input type="text"  className="inputs input2" onChange={(e)=>onHandleChange(e, "Video_title")} placeholder='Video title'/></div>
    <div><input type="text"  className="inputs input3" onChange={(e)=>onHandleChange(e, "description")} placeholder='description'/></div>
    <div><input type="date"  className="inputs input4" onChange={(e)=>onHandleChange(e, "date")} /></div>
    <div><input type="text"  className="inputs input5" onChange={(e)=>onHandleChange(e, "channel_logo_url")} placeholder='channel logo url' /></div>
    <div><input type="text"  className="inputs input6" onChange={(e)=>onHandleChange(e, "channel_name")}  placeholder='channel_name'/></div>
    <div><input type="text"  className="inputs input8"  onChange={(e)=>onHandleChange(e,"category")} placeholder='category'/></div>
    {/* <div><input type="text"  className="inputs input9"  onChange={(e)=>onHandleChange(e,"bucketlist")} placeholder='bucketlist'/></div> */}
    <div className='radio-div'>
    <p>Bucket list :</p>
    <div>
      
      <input type="radio" className=" radio-a" value={true} name="bucketList" onChange={(e)=>onHandleChange(e, "bucketlist")} /> <label >true</label>
    </div>
    <div>
      <input type="radio" className=" radio-a" value={false} name="bucketList" onChange={(e)=>onHandleChange(e, "bucketlist")} /> <label>false</label>
    </div>
    </div>
    <div className='radio-div'>
    <p>live :</p>
    <div>
      
      <input type="radio" className=" radio-a" name="live" value={true} onChange={(e)=>onHandleChange(e, "live")} /> <label >true</label>
    </div>
    <div>
      <input type="radio" className=" radio-a" name="live" value={false} onChange={(e)=>onHandleChange(e, "live")} /> <label>false</label>
    </div>
    </div>
    <div><input type="text"  className="inputs input10" onChange={(e)=>onHandleChange(e,"thumbnail")} placeholder='thumbnail' /></div> 
       <div>
        <input type="button" className='inputs input-11' onClick={handle} value={'Create'}/>
       </div>
    </div>
    </div>
  )
}

export default Channel
