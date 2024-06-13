import React, { useContext, useEffect, useState } from "react";
import { store } from "../Context/Store";
import Nav from "../Component/Nav";
import LeftMenu from "../Component/LeftMenu";
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from 'axios';
const Dashboard = () => {
  const [token, setToken, details, setDetails, theme, condition, setCondition] =useContext(store);
  const [update,setUpdate]=useState(
    {
        oldpassword:"",
        confirmpassword:'',
        newpassword:""
    }
  )
  const [data,setData]=useState({
    email:'',
    newpassword:""
})
  
  const [bool,setBool]=useState(0)
  const location=useLocation();
 const storedData=location.state


 const updatePassword=async()=>{
    const id=storedData._id;
    await axios.put('http://localhost:8080/update/'+id,update).then(res=>{
        // console.log(res.data.status)
        if(res.data.status==400){
            toast.warn(`${res.data.message}`, {
                position: "top-center",
              });
        }else if(res.data.status==200){
            toast.warn(`${res.data.message}`, {
                position: "top-center",
              });
        }
    }).catch(err=>{
        console.log(err);
    })
 }
 const onHandleChange=(e,field)=>{
        e.preventDefault();
        setUpdate(prev=>({
            ...prev,
            [field]:e.target.value
        }))
        console.log(update);
 }
 const onForgot=(e,field)=>{
    e.preventDefault();
        setData(prev=>({
            ...prev,
            [field]:e.target.value
        }))
 }
 const forgot="hgd"
  return (
    <>
    <ToastContainer />
    <Nav/>
       <div className="dis">
       <LeftMenu/>
       
      {
        storedData &&
    <div className={`${theme ? "white dashboards" : "black dashboards"}`}>
    <div className="col">
        <div className="profile">
            <p className={`${theme ? "white dashboard" : "black dashboard"}`}>UserName:</p>
            <p className={`${theme ? "white dashboard" : "black dashboard"}`}>{storedData.UserName}</p>
        </div>
        <div className="profile">
            <p className={`${theme ? "white dashboard" : "black dashboard"}`}>FirstName:</p>
            <p className={`${theme ? "white dashboard" : "black dashboard"}`}>{storedData.firstname}</p>
        </div>
        <div className="profile">
            <p className={`${theme ? "white dashboard" : "black dashboard"}`}>LastName:</p>
            <p className={`${theme ? "white dashboard" : "black dashboard"}`}>{storedData.lastName}</p>
        </div>
        <div className="profile">
            <p className={`${theme ? "white dashboard" : "black dashboard"}`}>phoneNumber:</p>
            <p className={`${theme ? "white dashboard" : "black dashboard"}`}>{storedData.phoneNumber}</p>
        </div>
        <div className="profile">
            <p className={`${theme ? "white dashboard" : "black dashboard"}`}>email:</p>
            <p className={`${theme ? "white dashboard" : "black dashboard"}`}>{storedData.email}</p>
        </div>
        <div className="profile">
            <p className={`${theme ? "white dashboard" : "black dashboard"}`}>Dob:</p>
            <p className={`${theme ? "white dashboard" : "black dashboard"}`}>{new Date(storedData.dob).getFullYear()+"/"+(new Date(storedData.dob).getMonth()+1)+"/"+new Date(storedData.dob).getDate()}</p>
        </div>
        </div>
        {/* <div className="col-2">
            <button onClick={()=>{setBool(2)}}>forgot password</button>
            <button onClick={()=>{setBool(1)}}>update Password</button>
        </div> */}
        {/* {bool==1?
      <div className="update-password">
        <div>
            <input type="text" className="inputs input1" placeholder="Old password" onChange={(e)=>onHandleChange(e,"oldpassword")}/>
            <input type="text" className="inputs input2" placeholder="Confirm Password" onChange={(e)=>onHandleChange(e,"confirmpassword")}/>
            <input type="text" className="inputs input" placeholder="New Password" onChange={(e)=>onHandleChange(e,'newpassword')}/>
            <input type="button" value={"Update password"} onClick={updatePassword}/>
        </div>
      </div> :
      <div className="update-password">
        <div>
            <input type="email" className="inputs input1" placeholder="email" onChange={(e)=>onForgot(e,"email")}/>
            <input type="text" className="inputs input3" placeholder="New Password" onChange={(e)=>onForgot(e,"password")}/>
            <input type="button" value={"Update password"} onClick={forgot}/>
        </div>
      </div> 
      } */}
    </div>
      }   
       </div> 
    </>
  )
}

export default Dashboard
