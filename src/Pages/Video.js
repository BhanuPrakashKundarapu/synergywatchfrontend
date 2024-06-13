import React, { useContext, useEffect, useState } from 'react'
import { store } from '../Context/Store';
import axios from 'axios';
import '../Style/Style.css'
import OverView from './OverView';
import { useNavigate } from 'react-router-dom';
import Trending from './conditional/Trending';
import Banner from '../Component/Banner';
import img1 from '../sources/Na_Nov_26-Photoroom.png-Photoroom.png'
const Video = (props) => {
  var [token, setToken, details, setDetails, theme, setTheme,condition,setCondition] =useContext(store);
      var [arr,setArr]=useState([])
      var [bool,setBool]=useState("")
      var [id,setId]=useState('')
      var navigate=useNavigate();
    useEffect(()=>{
      // console.log(condition)
      if(!token){
        return navigate('/')
    }
        handle();
    },[token])
    const handle=async()=>{
        await axios.get('http://localhost:8080/get-video',{
          headers:{
            'x-token':token
        }
        }).then((res)=>{
            // console.log(res.data.data)
            setArr(res.data.data)
            setCondition(res.data.data)
            localStorage.setItem('condition', JSON.stringify(res.data.data));
        }).catch(err=>{
            console.log(err)
        })
    }
    const findUser=arr.filter((user) =>
      user.description.toLowerCase().includes(props.val.toLowerCase())
  );
  const overView=(e)=>{
    const data={arr:findUser,id:e}
    navigate('/overview',{state:data});
  }
  return (
    <>
      <Banner/>
      <div className='parent-video' >
      {
        findUser.length>=1 ?
        findUser.map((i,k)=>(
          <div className='video' onClick={()=>overView(i._id)}>
          {/* <p>{i.condition}</p> */}
          {/* <p>{i.condition.cond1}</p> */}
          <img src={i.thumbnail} alt="" className='thumbnail'/>
      <div className="title-logo">
        <img src={i.channel_logo} alt="" />
            <p className={theme ?"white title":"black"}>{(i.video_title)}</p>
      </div>
            <div className='video-details'>
              <p className={theme ?"white":"black"}>{i.channel_name}</p>
            <p className={theme ?"white":"black"}>{i.views_count}views</p>
            </div>
            </div>
        )):
        <div>
          <img src={img1} alt="" />
          {/* <h1>Hello world</h1> */}
        </div>
      }
      </div>
    {/* } */}
    </>
  )
}

export default Video
