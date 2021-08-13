import { default as React, useState,useEffect } from 'react';
import { useParams } from 'react-router';
import * as Routes from '../routes';
import { AudioPlayerProvider } from "react-use-audio-player";
import { AudioPlayer } from '../components';
import {Fade} from 'react-reveal';

const Taskbar = (props) => {

  const { id } = useParams();
  

  const [file, setFile] = useState("");
 
  function drag(ev) {
    console.log("dragging!");
  }
  

  useEffect(() => {
    setFile(props.audioState)
  },[props.audioState,id]);

  return (

    
    <div className="taskbar-header">
        <Fade top>

          {props.periode != undefined ? 
          (
            props.id> 1 ?
            (
              <a href={Routes.RONDLEIDING_RENNERS.replace(':periode',props.periode).replace(':id',props.id-1)} className="taskbar-link">Vorige renner</a>
            )
              :
            (
              <a href={Routes.RONDLEIDING_PERIODE.replace(':id',props.periodeID)} className="taskbar-link">naar overzicht</a>
            )
          )
          :
          (
            <p></p>
          )
          }

          {props.periode === undefined ? 
          (
            id> 1 ?
            (
              <a href={Routes.RONDLEIDING_PERIODE.replace(':id',id-1)} className="taskbar-link">vorige periode</a>
            )
              :
            (
              <a href={Routes.SELECTION} className="taskbar-link">naar keuze</a>
            )
          )
          :
          (
            <p></p>
          )
          }   


          <div className="taskbar-actions">

            <i draggable="true" onDragStart={(ev) => drag(ev)}  class="taskbar-button fas fa-headphones-alt"></i>

            <AudioPlayerProvider>
                <AudioPlayer togglePlayingState={props.togglePlayingState} handleFile={props.handleFile} update={props.update} clearAudioState={props.clearAudioState} updateAudioState={props.updateAudioState} file={file}/>
            </AudioPlayerProvider>     


          </div>

          {
            (() => {
                if (props.periode != undefined && props.length === parseInt(props.id) && parseInt(props.periodeID) != 5)
                    return <a href={Routes.RONDLEIDING_PERIODE.replace(':id',props.periodeID+1)} className="taskbar-link2">Volgende periode</a>
                if (props.periode != undefined && props.length != parseInt(props.id) && parseInt(props.periodeID) != 5)
                    return <a href={Routes.RONDLEIDING_RENNERS.replace(':periode',props.periode).replace(':id',parseInt(props.id)+1)} className="taskbar-link2">Volgende renner</a>
                if (props.periode != undefined && props.length != parseInt(props.id) && parseInt(props.periodeID) === 5)
                    return <a href={Routes.RONDLEIDING_RENNERS.replace(':periode',props.periode).replace(':id',parseInt(props.id)+1)} className="taskbar-link2">Volgende renner</a>
                if (props.periode != undefined && props.length === parseInt(props.id) && parseInt(props.periodeID) === 5)
                    return <a href={Routes.RONDLEIDING_QUIZ} className="taskbar-link2">Einde rondleiding</a>  
                else
                  return <p></p>
            })()
          }
          </Fade>
  
    </div>

  );
};

export default Taskbar;