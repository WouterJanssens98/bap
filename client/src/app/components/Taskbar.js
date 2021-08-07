import { default as React, useState,useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { AudioPlayerProvider } from "react-use-audio-player";
import { AudioPlayer } from '../components';

const Taskbar = (props) => {

  const [isPlaying, setPlayingState] = useState(false);
  console.log(props.audioState)
 
  const handleClick = () => {
    setPlayingState(!isPlaying);
  }

  function drag(ev) {
    console.log("dragging!");
  }

  return (

    
    <div className="taskbar-header">

          <div className="taskbar-actions">

            <i draggable="true" onDragStart={(ev) => drag(ev)}  class="taskbar-button fas fa-headphones-alt"></i>

            <AudioPlayerProvider>
                <AudioPlayer clearAudioState={props.clearAudioState} updateAudioState={props.updateAudioState} file={props.audioState}/>
            </AudioPlayerProvider>

            
            <i draggable="true" onClick={(ev) => handleClick()} class=" taskbar-button fas fa-award"></i>


          </div>
          
  
    </div>

  );
};

export default Taskbar;