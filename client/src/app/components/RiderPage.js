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
    
        

        {props.ridersData && props.ridersData.length > 0 ?
            (
                <div className="riderpage3">
                    <AwesomeSlider cssModule={AwesomeSliderStyles}>
                        {props.ridersData.map((currElement, index) => {
                            return (
                            <div id="thisone">
                                <div style={{  
                                    backgroundImage: "url(" + props.ridersData[id-1].bannerPicture + ")",
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}>
                                    <p>testing</p>
                                </div>

                                <div className="riderpage2">

                                    <p>nieuw!</p>
                                </div>
                                
                            </div>
                            )
                            })
                        }
                    </AwesomeSlider>
                

                </div>
            )
            :
            (
                <div></div>
            )
            
        
        }
       
       

        
    </div>

  );
};

export default RiderPage;