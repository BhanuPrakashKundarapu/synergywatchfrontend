import {React,axios,Cookies,Nav,Link,useContext, useEffect, useState, useNavigate , ToastContainer, toast , store } from '../../Imports'
import '../../Style/Style.css'

const Login = () => {
  var [token,setToken]=useContext(store);
  var [obj,setObj]=useState({
    Email:"",
    Password:"",
})
var [bool,setBool]=useState(false)
var navigate=useNavigate()
const handleChange=(e,field)=>{
  e.preventDefault();
    setObj(prevState=>({
        ...prevState,
        [field]:e.target.value
    }))
}
useEffect(()=>{
  if(token){
    navigate('/watch')
  }else{
    toast.warning("login failed", {
      position: "top-center",
    });
  }
},[])
const handle=async()=>{
  // console.log(Cookies.get('token'))
    await axios.post('http://localhost:8080/log',obj)
    .then((res)=>{
      // console.log(res.data.message)
      if(res.data.status==200){
        Cookies.set('token',res.data.token,{ expires: 1/24 });
        console.log(res)
        setToken(res.data.token)
        navigate('/watch');
      }else if(res.data.status==400){
        toast.warn(`${res.data.message}`, {
          position: "top-center",
        });
      }
    }).catch(err=>{
        // console.log(err?)
        toast.warn(`something went wrong`, {
          position: "top-center",
        });
    })
  // }
}
const logout=()=>{
  Cookies.set('token',"");
  setToken("")
}
// const notify = () =>{
//   toast.success("Success Notification !", {
//   position: "top-center"
// });}

const showPassword=()=>{
  setBool(!bool)
}
// const notify = () => toast("Wow so easy!");
  return (
    <div>
      <ToastContainer />
      

      {/* <button onClick={notify}>Notify!</button> */}

    <Nav/>

    
      <div className='reg-body'>
      <div className='reg'>
      <div className="fields">
      <div className="div">
      <h2>Login</h2>
      <div><input type="email" className='inputs input-e' onChange={(e)=>handleChange(e,'Email')}   placeholder='Email' /></div>
      <div><input type={bool?"text":'password'}  className='inputs input-g' onChange={(e)=>handleChange(e,'Password')}  placeholder='Password' /></div>
      <div className='df'><input type="checkbox"  onChange={showPassword} /> <label>Show Password</label></div>
      <div >
      <input type="button" value={"Login"} className='inputs input-i' onClick={handle} /> 
      </div>
      <div className="resp">
      <p>Forgot password? <Link to="/">Click</Link></p>
      <p>New User? <Link to="/">Register</Link></p>
      </div>
      </div>
      </div>
      </div>
      {/* <input type="button" value={'click'} onClick={()=>toast('hello World')}/> */}
    </div>
    {/* <button onClick={logout}>Logout</button> */}
    </div>
  )
}

export default Login
