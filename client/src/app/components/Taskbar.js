import { default as React, useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import * as Routes from '../routes';
import { AudioPlayerProvider } from "react-use-audio-player";
import { AudioPlayer } from '../components';
import {Fade,Slide} from 'react-reveal';

const Taskbar = (props) => {

  const { id } = useParams();
  let history = useHistory();
  const [isPlaying, setPlayingState] = useState(false);

  const [file, setFile] = useState("");
 
  const handleClick = () => {
    setPlayingState(!isPlaying);
  }


  function drag(ev) {
    console.log("dragging!");
  }
  const handleFile = () => {
    setFile("")
  }

  const handlePreviousRider = (ev) => {
    ev.preventDefault();
    history.push(Routes.RONDLEIDING_RENNERS.replace(':periode',props.periode).replace(':id',props.id-1))
  }

  const handleNextRider = (ev) => {
    ev.preventDefault();
    history.push(Routes.RONDLEIDING_RENNERS.replace(':periode',props.periode).replace(':id',parseInt(props.id)+1))
  }

  const handlePreviousPeriod = (ev) => {
    ev.preventDefault();
    history.push(Routes.RONDLEIDING_PERIODE.replace(':id',props.periodeID))
  }

  const handleNextPeriod = (ev) => {
    ev.preventDefault();
    history.push(Routes.RONDLEIDING_PERIODE.replace(':id',props.periodeID+1))
  }

  const handleEnd = (ev) => {
    ev.preventDefault();
    history.push(Routes.HOME)
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
                <AudioPlayer start={props.start} handleFile={handleFile} update={props.update} clearAudioState={props.clearAudioState} updateAudioState={props.updateAudioState} file={file}/>
            </AudioPlayerProvider>     


          </div>

          {
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
          }
          </Fade>
  
    </div>

  );
};

export default Taskbar;