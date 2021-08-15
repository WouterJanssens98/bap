import { default as React, useState,useEffect } from 'react';
import { useParams } from 'react-router';
import * as Routes from '../routes';
import { AudioPlayerProvider } from "react-use-audio-player";
import { AudioPlayer } from '../components';
import {Fade} from 'react-reveal';

const Taskbar = (props) => {

  const { id } = useParams();
  const [file, setFile] = useState("");



  useEffect(() => {
    setFile(props.audioState)
  },[props.audioState,id]);

  return (

    
    <div className="taskbar-header">
        <Fade top>

          <a href={Routes.SELECTIE_PERIODE.replace(':periode',props.periode)} className="taskbar-link">naar overzicht</a>



          <div className="taskbar-actions">

            <i draggable="true"  class="taskbar-button fas fa-headphones-alt"></i>

            <AudioPlayerProvider>
                <AudioPlayer togglePlayingState={props.togglePlayingState} update={props.update} clearAudioState={props.clearAudioState} updateAudioState={props.updateAudioState} file={file}/>
            </AudioPlayerProvider>     


          </div>

          </Fade>
  
    </div>

  );
};

export default Taskbar;