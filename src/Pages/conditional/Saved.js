import React, { useContext, useEffect, useState } from 'react'
import { store } from "../../Context/Store";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from '../../Component/Nav';
import LeftMenu from '../../Component/LeftMenu';
import axios from 'axios'

const Saved = () => {
    var [token, setToken, details, setDetails, theme, setTheme,condition,setCondition] =
    useContext(store);
    var [state,setState]=useState([])
    var [arr,setArr]=useState([])
    var navigate=useNavigate();
    var location=useLocation();
    useEffect(()=>{
        if(!token){
            return navigate('/')
        }
        handle()
    },[token])
    const handle=async()=>{
        await axios.get('http://localhost:8080/save-tab',{
            headers:{
                'x-token':token
            }
        }).then(res=>{
            setArr(res.data.data)
            localStorage.setItem('savedId', JSON.stringify(res.data.data));
        }).catch(err=>{
            console.log(err);
        })
    }
    const overView=(e)=>{
        const data={arr:arr,id:e}
        navigate('/overview',{state:data});
      }
  return (
    <>
    <Nav/>
    <div className='dis'>
    <LeftMenu/>
    <div className='parent-video' >
      {
        arr.map((i,k)=>(
          <div className='video' onClick={()=>overView(i._id)}>
          <p>{i.condition}</p>
          {/* <p>{i.condition.cond1}</p> */}
          <img src={i.thumbnail} alt="" className='thumbnail'/>
      <div className="title-logo">
        <img src={i.channel_logo} alt="" />
            <p className={theme ?"white title":"black"}>{(i.video_title).slice(0,100)} <br /> {i.views_count}views</p>
      </div>
            
            <div className='video-details'>
              <p className={theme ?"white":"black"}>{i.channel_name}</p>
            <p className={theme ?"white":"black"}>{i.published_date}</p>
            </div>
            </div>
        ))
      }
      </div>
    </div>
    </>

  )
}

export default Saved
