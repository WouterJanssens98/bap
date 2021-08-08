import { default as React, useState } from 'react';
import { NavLink } from "react-router-dom";



const ListenIcon = (props) => {

  const [hovering, setHovering] = useState(false)

  function allowDrop(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
    setHovering(true)
  }

  function leaveDrop(ev) {
    ev.preventDefault();
    setHovering(false)
  }



  async function drop(ev,url) {
    ev.preventDefault();
    await props.updateAudioState(url);
    setHovering(false)
  }

  

  return (

    
    <i  onDrop={(ev) => {drop(ev,props.audioURL)}} onDragLeave={(ev) => leaveDrop(ev)} onDragOver={(ev) => allowDrop(ev)} className={hovering ? "listenIcon-hovering fas fa-headphones-alt" : "listenIcon fas fa-headphones-alt"}></i>

  );
};

export default ListenIcon;