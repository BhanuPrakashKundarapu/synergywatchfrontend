import React, {useContext, useEffect, useState } from 'react'
import logo from '../sources/Synergy_Wacth-removebg-preview.png'
import '../Style/Style.css'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '../Context/Store';
import { RxCross2 } from "react-icons/rx";
import { FaBars, FaMoon } from "react-icons/fa";
import { Link,useNavigate } from 'react-router-dom';
// import { LuSun } from "react-icons/lu";
import { HiSun } from "react-icons/hi2";
const Nav = () => {
  var [token,setToken,details,setDetails,theme,setTheme]=useContext(store);
  var [fs,setFs]=useState('');
  var [bool,setBool]=useState(true);
  const navigate=useNavigate()
  // var []=useS(true);
  useEffect(()=>{
    // console.log(details)
    // Cookies.set('token',"");
    if(details){
      const letter=details.UserName;
      const firstLetter=letter.slice(0,1);
      // console.log(firstLetter)
      setFs(firstLetter);
    }
    // console.log("==>"+details)
  },[details])
  const logout=()=>{
    Cookies.remove('token');
    setToken("")
    window.location.reload();
    localStorage.removeItem('condition')
  }
  const toDash=()=>{
    navigate('/dashboard',{state:details})
  }
  // const notify = () =>{toast("Wow so easy!") ;}
  return (
    <div>
      <div className="Header">
        <div className='a'>
        <img src={logo} alt="" />
        </div>
        
        {
          token?
        <div className='settings'>
        <FaMoon  className={theme ? 'moon':'hide moon'} onClick={()=>setTheme(!theme)}/>
        <HiSun  className={theme ? 'hide moon':'moon'} onClick={()=>setTheme(!theme)}/>
        {
          bool?
        <div onClick={()=>setBool(!bool)} className='setting-parent'>
        <p>
        {fs} 
        </p> 
        <FaBars className='bar'/>
        </div>:
        <div className='cross-div'>
         <RxCross2 className='cross' onClick={()=>setBool(!bool)}/>
        </div>
        }
        </div>:""
        }
      </div>

      <div className={bool ? 'menu hide':'menu'}>
      <div className='menu-first'>
      <p className='Link Dash' to={'/dashboard' } onClick={toDash}>Dashboard</p> 
      <Link to={'/channel'} className='Link cha'>Post Video</Link>
      <Link className='Link Set'>Settings</Link>
      {/* <div className="rep"> */}
      <p className={theme ? 'rep Link Set':'hide rep Link Set'} onClick={()=>setTheme(!theme)}>Light</p>
      <p className={theme ? 'hide rep Link Set':'rep Link Set'} onClick={()=>setTheme(!theme)}>Dark</p>
      {/* <FaMoon  className={theme ? 'rep':'hide rep'} onClick={()=>setTheme(!theme)}/> */}
      {/* <HiSun  className={theme ? 'hide rep':'rep'} onClick={()=>setTheme(!theme)}/> */}
      {/* </div> */}
      {/* <button onClick={notify}>notify</button> */}
      </div>
      <div className='menu-final'>
      <button onClick={logout}>Logout</button>
      </div>
      </div>
    </div>
  )
}

export default Nav

