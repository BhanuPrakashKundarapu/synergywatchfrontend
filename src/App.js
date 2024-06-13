    
import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import Register from './Autherisation/reg/Register';
import Login from './Autherisation/login/Login';

import Watch from './Pages/Watch';
import Channel from './Pages/Channel';
import OverView from './Pages/OverView';
import Trending from './Pages/conditional/Trending';
import Games from './Pages/conditional/Games';
import Live from './Pages/conditional/Live';
import Saved from './Pages/conditional/Saved';
import Dashboard from './Pages/Dashboard';
import { store } from './Context/Store';
import { useState } from 'react';
import { Cookies } from './Imports';

const App = () => {
  var [token,setToken]=useState(()=>{
    const constToken=Cookies.get('token');
    return constToken||""
  });
  var [details,setDetails]=useState();
  var [theme,setTheme]=useState(true);
  var [conditions,setCondition]=useState([])

  return (
    <>
      {/* <Nav/> */}
    <div className={theme ? "body":"dark"}>
      <store.Provider value={[token,setToken,details,setDetails,theme,setTheme,conditions,setCondition]}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/log' element={<Login/>}/>
          <Route path='/watch' element={<Watch/>}/>
          <Route path='/channel' element={<Channel/>}/>
          <Route path='/overview' element={<OverView/>}/>
          <Route path='/trending' element={<Trending/>}/>
          <Route path='/game' element={<Games/>}/>
          <Route path='/live' element={<Live/>}/>
          <Route path='/save' element={<Saved/>}/>
          {/* <Route path='/share' element={<ShareModal/>}/> */}
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
      </store.Provider>
    </div>
    </>
  )
}

export default App
