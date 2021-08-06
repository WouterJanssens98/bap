import { default as React, useState } from 'react';
import { NavLink } from "react-router-dom";



const Taskbar = (props) => {

  const [isPlaying, setPlayingState] = useState(true);
  const [soundItem, setSoundItem] = useState("")
  // button.addEventListener("click", function(){
  //   if(audio.paused){
  //     setSoundPlaying(true)
  //   } else {
  //     audio.pause();
  //     button.innerHTML = "Play";
  //   }
  // });
  const handleClick = () => {
    setPlayingState(!isPlaying);
  }

  return (

    
    <div className="taskbar-header">

          <div className="taskbar-actions">

            <i class="taskbar-button fas fa-headphones-alt"></i>

            {isPlaying ? 
            (
              <i class="taskbar-button2 far fa-pause-circle"></i>
            ):
            (
              <i class="taskbar-button2 far fa-play-circle"></i>
            )}
            <i onClick={(ev) => handleClick()} class=" taskbar-button fas fa-award"></i>


          </div>
  
    </div>

  );
};

export default Taskbar;