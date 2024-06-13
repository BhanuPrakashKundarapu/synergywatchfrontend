import React, { useContext, useEffect, useState } from "react";
import { store } from "../Context/Store";
import { FaFire, FaBookmark } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { SiYoutubegaming } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { RiLiveFill } from "react-icons/ri";
const LeftMenu = () => {
  // console.log(window.location.pathname)
  const path=window.location.pathname;
  var [
    token,
    setToken,
    details,
    setDetails,
    theme,
    setTheme,
    condition,
    setCondition,
  ] = useContext(store);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      return navigate('/');
    }
    const data = localStorage.getItem('condition');
    if (data) {
      setCondition(JSON.parse(data));
    }
  }, [token])
  // console.log(condition)
  const trend = () => {
    const arr = [];
    condition.filter((i) => (i.bucketlist ? arr.push(i) : null));
    navigate("/trending", { state: arr });
  };
  const live = () => {
    const arr = [];
    condition.filter((i) => (i.live ? arr.push(i) : null));
    navigate("/live", { state: arr });
  };
  const games = () => {
    const arr = [];
    condition.filter((i) => (i.category == "Sports" ? arr.push(i) : null));
    navigate("/game", { state: arr });
  };
  const saved = () => {
    const arr = [];
    condition.filter((i) => arr.push(i));
    navigate("/save", { state: arr });
  };
  return (
    <div>
      <div className={theme ? "left-menu" : "black left-menu"}>
        <div>
          <div className={path=='/watch'? "navigators active":"navigators"}>
            <IoMdHome className="icons" />
            <Link to="/watch" className={theme ? "white nav" : "black nav"}>
              Home
            </Link>
          </div>
          <div className={path=='/trending'? "navigators active":"navigators"}>
            <FaFire className="icons" />
            <label
              className={theme ? "white nav" : "black nav"}
              onClick={trend}
            >
              Trending
            </label>
          </div>
          <div className={path=='/game'? "navigators active":"navigators"}>
            <SiYoutubegaming className="icons" />
            <label className="nav" onClick={games}>
              Gaming
            </label>
          </div>
          <div className={path=='/save'? "navigators active":"navigators"}>
            <FaBookmark className="icons" />
            <label className="nav" onClick={saved}>
              Saved
            </label>
          </div>
          <div className={path=='/live'? "navigators active":"navigators"}>
            <RiLiveFill className="icons" />
            <label className="nav" onClick={live}>
              Live
            </label>
          </div>
        </div>
      </div>

      <div className={theme ? "responsive " : "black responsive "}>
        <div>
          <div className={path=='/watch'? "navigators active":"navigators"}>
            <Link to="/watch" className={theme ? "white nav icons" : "black nav icons"}>
            <IoMdHome className="icons" />
            </Link>
          </div>
          <div className={path=='/trending'? "navigators active":"navigators"}>
            <FaFire className={theme ? "white nav icons" : "black nav icons"} onClick={trend}/>
          </div>
          <div className={path=='/game'? "navigators active":"navigators"}>
            <SiYoutubegaming className="icons nav" onClick={games}/>
          </div>
          <div className={path=='/save'? "navigators active":"navigators"}>
            <FaBookmark className="icons nav" onClick={saved}/>
          </div>
          <div className={path=='/live'? "navigators active":"navigators"}>
            <RiLiveFill className="icons nav" onClick={live}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
