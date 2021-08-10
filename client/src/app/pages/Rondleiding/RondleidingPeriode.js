import { default as React, Fragment,useState, useCallback, useEffect,useRef} from 'react';
import { useHistory, useParams } from 'react-router';
import ReactDOM from 'react-dom';
import * as Routes from '../../routes';
import { useAuth, useApi } from '../../services';
import {useSpring, animated} from 'react-spring';
import { Loading,ListenIcon,InfoIcon,Taskbar } from '../../components';
import AwesomeSlider from 'react-awesome-slider';
import Popup from 'reactjs-popup';
import {Fade,Slide} from 'react-reveal';

const RondleidingPeriode = () => {
  const { id } = useParams();
  const history = useHistory();
  const [periodesData, setPeriodesData] = useState();
  const [audioState, setAudioState] = useState("");

  const updateAudioState = async (url) => {
    console.log("Setting new URl");
    setAudioState(url)
  }

  const clearAudioState = async () => {
    setAudioState("")
  }

  const { getPeriodes} = useApi();
  const initFetch = useCallback(
    () => {
      const getInfo = async () => {
        const periodesData = await getPeriodes();
        setPeriodesData(periodesData);
      }
      getInfo();
    });

  const ref = useRef();
  const openModal = () => ref.current.open();
  const closeModal = async () => {
    await update();
    ref.current.close();
  }

  const handleClick = async (ev) => {
    ev.preventDefault();
    console.log("Clicked!")
    openModal();
  }

  const handleRoute = async (ev) => {
    ev.preventDefault();
    // history.push(Routes.RONDLEIDING_RENNERS.replace(':periode',`${periodesData[id-1].start}-${periodesData[id-1].end}`).replace(':id',1));
    history.push(Routes.RONDLEIDING_RENNERS.replace(':periode',"1960-1970").replace(':id',1));

  }

  const update = async() => {
    console.log("Finished listening/reading")
  }

  useEffect(() => {
    let el = document.querySelector('.page');
    el.classList.add('fade-in');
    initFetch();
  },[audioState]);
  

  
  
  return (
    <Fragment>
      
      {periodesData ? 
      ( 
      <div>
        <Taskbar update={update} clearAudioState={clearAudioState} updateAudioState={updateAudioState} audioState={audioState}/>
        <div className=" taskbar-setup">
          <div className="rondleiding-info" style={{  
            backgroundImage: "url(" + periodesData[id-1].bannerImage + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}>
            <div className="listen">
              <p className="rondleiding-title">{periodesData[id-1].start}-{periodesData[id-1].end}</p>
              <ListenIcon  className={"rondleidingperiode-icon"} onClick={(ev) => handleClick(ev)} updateAudioState={updateAudioState} audioURL={periodesData[id-1].audioURL}/>
              <div onClick={(ev) => handleClick(ev)}>
                <InfoIcon className={"rondleiding-icon2"} />
              </div>
            </div>
            <div className="continue">
              <div>
                <button onClick={(ev) => handleRoute(ev)} class="arrow -long -huge -red"></button>
              </div>
            </div>

            <Popup      
                modal
                nested
                ref={ref}
            >
                {close => (
                <div className="popup-modal completepage">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    {/* <div className="header">Info</div> */}
                    <Fade bottom cascade>
                    <div className="content">
                        <p className="periode-info">UITLEG BIJ DE JAREN {periodesData[id-1].start}-{periodesData[id-1].end}
                        </p>
                        <div className="periode-uitleg">
                            <p className="mt-4">{periodesData[id-1].description}</p>
                        </div>
                    </div>
                    </Fade>
                    <div className="actions">
                    <button
                        className="complete-btn-small"
                        onClick={() => {
                          closeModal();
                        }}
                    >
                        INFO SLUITEN
                    </button>
                    </div>
                </div>
                )}
            </Popup>            
          </div>
        </div>
      </div>


      )
    :
    (
      <Loading />
    )
    }
       
    </Fragment>
  );
};

export default RondleidingPeriode;