import { default as React, useState,useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { AudioPlayerProvider } from "react-use-audio-player";
import { useHistory, useParams } from 'react-router';
import { Taskbar } from '../components';
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/open-animation';

const RiderPage = (props) => {
  const { periode,id } = useParams();
  const [isPlaying, setPlayingState] = useState(false);
  console.log(props.audioState)
 
  const handleClick = () => {
    setPlayingState(!isPlaying);
  }

  function drag(ev) {
    console.log("dragging!");
  }

  return (

    <div>
    
        

       
       
       

        
    </div>

  );
};

export default RiderPage;