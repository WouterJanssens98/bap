import { default as React,Fragment, useState } from 'react';

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
    await props.updateAudioState(url,props.type);
    setHovering(false)
  }

  

  

  return (

  <Fragment >
    <i  onDrop={(ev) => {drop(ev,props.audioURL)}} onDragLeave={(ev) => leaveDrop(ev)} onDragOver={(ev) => allowDrop(ev)} class={hovering ? `listenIcon-hovering ${props.className} fas fa-headphones-alt` : `listenIcon ${props.className} fas fa-headphones-alt`}></i>   
  </Fragment>
  );
};

export default ListenIcon;