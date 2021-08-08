import { default as React, Fragment,useState, useCallback, useEffect} from 'react';
import { useHistory, useParams } from 'react-router';
import ReactDOM from 'react-dom'
import { useAuth, useApi } from '../../services';
import {useSpring, animated} from 'react-spring';
import { Loading,ListenIcon,Taskbar } from '../../components';
import AwesomeSlider from 'react-awesome-slider';

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
        <Taskbar clearAudioState={clearAudioState} updateAudioState={updateAudioState} audioState={audioState}/>
        <div className=" taskbar-setup">
          <div className="rondleiding-info" style={{  
            backgroundImage: "url(" + periodesData[id-1].bannerImage + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}>
            <div className="listen">
            
              <p className="rondleiding-title">{periodesData[id-1].start}-{periodesData[id-1].end}</p>
              <ListenIcon  updateAudioState={updateAudioState} audioURL={periodesData[id-1].audioURL}/>
              
            </div>            
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