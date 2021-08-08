import { default as React, Fragment,useState, useCallback, useEffect,useRef} from 'react';
import { useHistory, useParams } from 'react-router';
import ReactDOM from 'react-dom'
import { useAuth, useApi } from '../../services';
import {useSpring, animated} from 'react-spring';
import { Loading,ListenIcon,InfoIcon,Taskbar } from '../../components';
import {Fade,Slide} from 'react-reveal';

const RondleidingPeriode = () => {
  const { periode,id } = useParams();
  const history = useHistory();
  const [riderData, setRiderData] = useState();
  const [audioState, setAudioState] = useState("");
  const { getRidersFromPeriod} = useApi();

  const updateAudioState = async (url) => {
    console.log("Setting new URl");
    setAudioState(url)
  }

  const clearAudioState = async () => {
    setAudioState("")
  }

  const ref = useRef();
  const openModal = () => ref.current.open();

  const handleClick = async (ev) => {
    ev.preventDefault();
    console.log("Clicked!")
    openModal();
  }
  const update = async() => {
    console.log("Finished listening/reading")
  }

  const initFetch = useCallback(
    () => {
      const getInfo = async () => {
        const ridersData = await getRidersFromPeriod(periode);
        setRiderData(ridersData[id-1]);
        // console.log(riderData.media.audioURL)
        console.log(ridersData);
      }
      getInfo();
    });

    
    
  useEffect(() => {
    let el = document.querySelector('.page');
    el.classList.add('fade-in');
    initFetch();
  },[audioState]);
  

  
  
  return (
    <div>
        <Taskbar update={update} clearAudioState={clearAudioState} updateAudioState={updateAudioState} audioState={audioState}/>
        {riderData ?
        ( <Fade left cascade>
          <div className="riderpage-first" style={{  
            backgroundImage: "url(" + riderData.media.bannerPicture + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}>
              <div className="riderpage-title">
              <p >{riderData.info.name}</p>
              <ListenIcon  onClick={(ev) => handleClick(ev)} updateAudioState={updateAudioState} audioURL={riderData.media.audioURL}/>
              <div onClick={(ev,key) => handleClick(ev,1)}>
                <InfoIcon />
              </div>
              </div>
          </div>
          </Fade>
        )
        :
        (
            <Loading />
        )
      };
  </div>
  )};

export default RondleidingPeriode;