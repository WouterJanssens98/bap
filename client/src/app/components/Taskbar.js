import { default as React, useState,useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { AudioPlayerProvider } from "react-use-audio-player";
import { AudioPlayer } from '../components';
import {Fade,Slide} from 'react-reveal';

const Taskbar = (props) => {

  const [isPlaying, setPlayingState] = useState(false);

  const [file, setFile] = useState("");


  console.log(props.audioState)
 
  const handleClick = () => {
    setPlayingState(!isPlaying);
  }

  function drag(ev) {
    console.log("dragging!");
  }
  const handleFile = () => {
    setFile("")
  }

  useEffect(() => {
    console.log("Useffect called!")
    setFile(props.audioState)
  },[props.audioState]);

  return (

    
    <div className="taskbar-header">
        <Fade top>
          <div className="taskbar-actions">

            <i draggable="true" onDragStart={(ev) => drag(ev)}  class="taskbar-button fas fa-headphones-alt"></i>

            <AudioPlayerProvider>
                <AudioPlayer start={props.start} handleFile={handleFile} update={props.update} clearAudioState={props.clearAudioState} updateAudioState={props.updateAudioState} file={file}/>
            </AudioPlayerProvider>

            
            {/* <i draggable="true" onClick={(ev) => handleClick()} class=" taskbar-button fas fa-award"></i> */}


          </div>
          </Fade>
  
    </div>

  );
};

export default Taskbar;