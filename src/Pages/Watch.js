import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import "../Style/Style.css";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../Component/Nav";
import { store } from "../Context/Store";
import axios from "axios";
import Video from "./Video";
import LeftMenu from "../Component/LeftMenu";
const Watch = () => {
  var [token, setToken, details, setDetails, theme, setTheme,condition,setCondition] =
  useContext(store);
  var [find,setFind]=useState("")
  var navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      return navigate("/log");
    } else {
      login();
    }
  }, [token,"abc"]);
  const login = async () => {
    await axios
      .get("http://localhost:8080/details", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setDetails(res.data.data);
        localStorage.setItem("details",JSON.stringify(details))
      })
      .catch((err) => console.log(err));
    };
  const search=(e)=>{
    // console.log(e.target.value)
    setFind(e.target.value)
  }

  return (
    <>
      <Nav />
      <div className="dis">
        <LeftMenu/>
        <div className="video-grid-a">
        <div className="search-div">
        <input type="search" onChange={(e)=>search(e)} placeholder="search" />
        </div>
        
        <Video val={find}/>
        </div>
      </div>
    </>
  );
};

export default Watch;
