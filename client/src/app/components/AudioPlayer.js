import { default as React, useState,useEffect } from 'react';
import { useAudioPlayer } from "react-use-audio-player";
 
const AudioPlayer = (props) => {

    const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
        src: props.file,
        format: "mp3",
        autoplay: true,
        onend: props.togglePlayingState,
        onplay : console.log("Starting")
    })
 
    if (!ready && !loading) return <i disabled onClick={togglePlayPause} class="taskbar-button3 far fa-play-circle"></i>
    if (loading) return <i onClick={togglePlayPause} disabled class="taskbar-button3 far fa-play-circle"></i>
    if(playing) return <i onClick={togglePlayPause} class="taskbar-button2 far fa-pause-circle"></i>
    if(!playing) return <i onClick={togglePlayPause} class="taskbar-button2 far fa-play-circle"></i>
    
}

export default AudioPlayer