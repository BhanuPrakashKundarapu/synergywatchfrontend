import React, { useContext, useEffect, useState } from "react";
import { store } from "../Context/Store";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../Component/Nav";
import Video from "./Video";
import LeftMenu from "../Component/LeftMenu";
import { IoIosThumbsUp, IoIosThumbsDown } from "react-icons/io";
import { FaShareAlt, FaBookmark, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { GoBookmarkSlashFill } from "react-icons/go";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShareModal from "../Component/ShareModal";
const OverView = () => {
  const [token, setToken, details, setDetails, theme, condition, setCondition] =
    useContext(store);
  const [bool, setBool] = useState(false);
  const [data, setData] = useState([]);
  const [inSave, setInSave] = useState([]);
  const [id, setId] = useState();
  const [modal,setModal]=useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // const p=JSON.parse(storage);

  useEffect(() => {
    if (!token) navigate("/log");
    else fetchDetails();
    setData(location.state.arr);
    setId(location.state.id);
    const storage = localStorage.getItem("savedId");
    const p = JSON.parse(storage);
    // p.map(i=>setInSave(i));
    setInSave(p);
    console.log(inSave);
  }, [location, token]);



  const fetchDetails = async () => {
    try {
      const res = await axios.get("http://localhost:8080/details", {
        headers: { "x-token": token },
      });
      console.log(res);
      setDetails(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const focused = (id) => navigate("/overview", { state: { arr: data, id } });

  const saveItem = async (item) => {
    console.log(inSave);
    // console.log(item._id);
    const filt = inSave.filter((i) => i.videoid.includes(item._id));
    if (filt.length >= 1) {
      toast.success("video is already save!", {
        position: "top-center",
      });
    } else if (filt.length == 0) {
      try {
        const email = details._id;
        await axios.post("http://localhost:8080/saved", { email, ...item });
        toast.success("Video Saved!", {
          position: "top-center",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deletHandle=async(item)=>{
    try {
      const email = item._id;
      console.log("==>"+item._id)
      await axios.delete("http://localhost:8080/delete-save/"+email).then((res)=>{
        console.log(res.data.status);
        if(res.data.status===200){
          toast.success("Video removed!", {
            position: "top-center",
          });
          // window.location.reload();
          if(inSave.length<1){
            return navigate('/watch')
          }else{
            return navigate('/save')
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  const modalClose=()=>{
    setModal(!modal)
  }
  const liked=()=>{
    toast.success("You liked a video",{
      position:"top-center"
    })
  }
  const dislike=()=>{
    toast.success("you're like removed",{
      position:"top-center"
    })
  }
  return (
    <>
      <ToastContainer />
      <Nav />
      <div className={`dis ${theme ? "white" : "black"}`}>
      <LeftMenu />
        {data.map((item) => {
          if (item._id === id) {
            return (
              <div className="overView" key={item._id} >
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${item.video_url
                    .split("/")
                    .pop()}?rel=0&autoplay=1&allow='autoplay';fullscreen`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                {/* <p>{item._id}</p> */}
                <div className="video-details">
                  <div className="title">
                  <h5> {item.video_title} </h5>
                  </div>
                  <div className="share-like">
                      <IoIosThumbsUp className="overview-icons" onClick={liked}/>
                      <IoIosThumbsDown className="overview-icons" onClick={dislike}/>
                      <FaShareAlt className="overview-icons" onClick={modalClose}/>
                      {
                        modal ?
                        <ShareModal emb={'<iframewidth="560"height="315"src={`https://www.youtube.com/embed/${item.video_url  .split("/")  .pop()}?rel=0&autoplay=1&allow=`autoplay`;fullscreen`}title="YouTube video player"frameBorder="0"allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"allowFullScreen/>'} urllink={item.video_url} eventClick={modalClose}/>
                        :null
                      }
                      <div>
                        {item.saved ? (
                          <GoBookmarkSlashFill className="overview-icons" onClick={()=>deletHandle(item)}/>
                        ) : (
                          <FaBookmark
                            className="overview-icons"
                            onClick={() => saveItem(item)}
                          />
                        )}
                      </div>
                    </div>


                  <div className="overview-channel">
                    <div className="name-logo">
                      <img src={item.channel_logo} className="logo" alt="" />
                      <div className="channel-details">
                        <h5>{item.channel_name}</h5>
                        <p>{item.subscribers}</p>
                      </div>
                    </div>
                    <div className="name-logo">
                      <p>{item.views_count} liked</p>
                      <p>{item.liked} views</p>
                    </div>
                  </div>



                </div>
                <div className="video-description">
                  <div className="controlled">
                    <div className="statement">
                      <p>Description</p>
                    </div>
                    <div className="button">
                      {!bool?
                        <FaCaretUp
                        className="button-icon"
                        onClick={() => setBool(!bool)}
                      />:
                      <FaCaretDown
                        className="button-icon"
                        onClick={() => setBool(!bool)}
                      />}
                    </div>
                  </div>
                  {bool && (
                    <div className="description">
                      <div>
                        <p>published date: {item.published_date}</p>
                        <p>{item.views_count} views</p>
                      </div>
                      <p className="p">{item.description}</p>
                      <a href={item.video_url}>{item.video_url}</a>
                    </div>
                  )}
                </div>
                <hr />
                <div className="suggestions">
                  {data.map((i) => {
                    if (i._id !== id) {
                      return (
                        <div
                          className="suggest-video"
                          key={i._id}
                          onClick={() => focused(i._id)}
                        >
                          <div className="suggest-image">
                            <img
                              src={i.thumbnail}
                              alt=""
                              className="suggestion-images"
                            />
                          </div>
                          <div className="suggest-details">
                            <p className="title">{i.video_title}</p>
                            <div >
                              <img
                                src={i.channel_logo}
                                className="logo"
                                alt=""
                              />
                              <p>{i.channel_name}</p>
                            </div>
                            <div className="suggest-video-details">
                            <p>{i.views_count}views</p>
                            <p>{i.liked}</p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default OverView;
