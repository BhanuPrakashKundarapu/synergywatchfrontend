import React, { useContext, useEffect, useState } from 'react'
import { store } from "../../Context/Store";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from '../../Component/Nav';
import LeftMenu from '../../Component/LeftMenu';

const Live = () => {
    var [token, setToken, details, setDetails, theme, setTheme,condition,setCondition] =
    useContext(store);
    var [state,setState]=useState([])
    var navigate=useNavigate();
    var location=useLocation();
    useEffect(()=>{
      if(!token){
        return navigate('/')
    }
        console.log(location.state)
        setState(location.state)
    },[])
    const overView=(e)=>{
        const data={arr:state,id:e}
        navigate('/overview',{state:data});
      }
    //   console.log(condition)
  return (
    <>
    <Nav/>
    <div className='dis'>
    <LeftMenu/>
    <div className='parent-video' >
      {
        state.map((i,k)=>(
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

export default Live
