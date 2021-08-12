import { default as React, useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import * as Routes from '../routes';
import { AudioPlayerProvider } from "react-use-audio-player";
import { AudioPlayer } from '../components';
import {Fade,Slide} from 'react-reveal';

const Taskbar = (props) => {

  const { id } = useParams();
  const [file, setFile] = useState("");

  function drag(ev) {
    console.log("dragging!");
  }
  const handleFile = () => {
    setFile("")
  }


  useEffect(() => {
    setFile(props.audioState)
  },[props.audioState,id]);

  return (

    
    <div className="taskbar-header">
        <Fade top>

          <a href={Routes.SELECTIE_PERIODE.replace(':periode',props.periode)} className="taskbar-link">naar overzicht</a>



          <div className="taskbar-actions">

            <i draggable="true" onDragStart={(ev) => drag(ev)}  class="taskbar-button fas fa-headphones-alt"></i>

            <AudioPlayerProvider>
                <AudioPlayer start={props.start} handleFile={handleFile} update={props.update} clearAudioState={props.clearAudioState} updateAudioState={props.updateAudioState} file={file}/>
            </AudioPlayerProvider>     


          </div>

          {/* {
            (() => {
                if (props.periode != undefined && props.length === parseInt(props.id) && parseInt(props.periodeID) != 2)
                    return <a href={Routes.RONDLEIDING_PERIODE.replace(':id',props.periodeID+1)} className="taskbar-link2">Volgende periode</a>
                if (props.periode != undefined && props.length != parseInt(props.id) && parseInt(props.periodeID) != 2)
                    return <a href={Routes.RONDLEIDING_RENNERS.replace(':periode',props.periode).replace(':id',parseInt(props.id)+1)} className="taskbar-link2">Volgende renner</a>
                if (props.periode != undefined && props.length != parseInt(props.id) && parseInt(props.periodeID) === 2)
                    return <a href={Routes.RONDLEIDING_RENNERS.replace(':periode',props.periode).replace(':id',parseInt(props.id)+1)} className="taskbar-link2">Volgende renner</a>
                if (props.periode != undefined && props.length === parseInt(props.id) && parseInt(props.periodeID) === 2)
                    return <a href={Routes.HOME} className="taskbar-link2">Einde rondleiding</a>  
                else
                  return <p></p>
            })()
          } */}
          </Fade>
  
    </div>

  );
};

export default Taskbar;