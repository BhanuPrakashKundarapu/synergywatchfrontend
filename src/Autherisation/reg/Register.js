import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import '../../Style/Style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../../Component/Nav';
import { store } from '../../Context/Store';
const Register = () => {
  var [token,setToken]=useContext(store);
    var [obj,setObj]=useState({
        UserName:"",
        FirstName:"",
        LastName:"",
        PhoneNumber:"",
        Email:"",
        Dob:"",
        Password:"",
        ConfirmPassword:""
    })
var [bool,setBool]=useState(false)

    var navigate=useNavigate()
    useEffect(()=>{
        if(token){
            return navigate('/watch');
        }
    },[])
    const handleChange=(e,field)=>{
        e.preventDefault();
        setObj(prevState=>({
            ...prevState,
            [field]:e.target.value
        }))
    }
    const handle=()=>{
        axios.post('http://localhost:8080/reg',obj)
        .then((res)=>{
            // console.log(res.data.status)
            if(res.data.status===200){
                    toast.success("Successfully Registered!", {
                    position: "top-center"
                  })      
                return navigate('/log')
            }else if(res.data.status===400){
                toast("user Already exist")
                window.alert("user Already exist")
            }else if(res.data.status===500){
                // window.alert('password not match')
                toast.success("password not Matched", {
                    position: "top-center"
                  })      
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    const showPassword=()=>{
        setBool(!bool)
      }
  return (
    <>
    <ToastContainer />
    <Nav/>
    <div className='reg-body'>
      <div className='reg'>
      <div className="fields">
      <div className="div">
      <h2>Register</h2>
      <div><input type="text"  className='inputs input-a' onChange={(e)=>handleChange(e,'UserName')}  placeholder='User Name' /></div>
      <div><input type="text"  className='inputs input-b' onChange={(e)=>handleChange(e,'FirstName')}   placeholder='First Name' /></div>
      <div><input type="text"  className='inputs input-c' onChange={(e)=>handleChange(e,'LastName')}   placeholder='Last Name' /></div>
      <div><input type="text"  className='inputs input-d' onChange={(e)=>handleChange(e,'PhoneNumber')}   placeholder='Phone Number' /></div>
      <div><input type="email" className='inputs input-e' onChange={(e)=>handleChange(e,'Email')}   placeholder='Email' /></div>
      <div className='db'>
      <label >Date of birth</label>
      <input type="date"  className='inputs input-f' onChange={(e)=>handleChange(e,'Dob')}  placeholder='Dob' />
      </div>
      <div><input type={bool?"text":'password'}  className='inputs input-g' onChange={(e)=>handleChange(e,'Password')}  placeholder='Password' /></div>
      <div><input type={bool?"text":'password'}  className='inputs input-h' onChange={(e)=>handleChange(e,'ConfirmPassword')}  placeholder='Confirm Password' /></div>
      <div className='df'><input type="checkbox"  onChange={showPassword} /> <label>Show Password</label></div>

      <input type="button" value={"Register"} className='inputs input-i' onClick={handle} />
      <p>Already a User? <Link to="/log">Login</Link></p>
      </div>
      </div>
      </div>
      {/* <input type="button" value={'click'} onClick={()=>toast('hello World')}/> */}
    </div>
    </>

  )
}

export default Register
