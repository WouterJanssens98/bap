import { default as React, Fragment,useState, useCallback, useEffect} from 'react';
import { useHistory, useParams } from 'react-router';
import ReactDOM from 'react-dom'
import { useAuth, useApi } from '../../services';
import {useSpring, animated} from 'react-spring';
import { Loading,ListenIcon,Taskbar,RiderPage } from '../../components';
import AwesomeSlider from 'react-awesome-slider';
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/open-animation';

const RondleidingPeriode = () => {
  const { periode,id } = useParams();
  const history = useHistory();
  const [ridersData, setRidersData] = useState();
  const [audioState, setAudioState] = useState("");
  const { getRidersFromPeriod} = useApi();
  const initFetch = useCallback(
    () => {
      const getInfo = async () => {
        const ridersData = await getRidersFromPeriod(periode);
        setRidersData(ridersData);
        console.log(ridersData[0].media)
      }
      getInfo();
    });

    const buttonStyle = {
        padding: "15px",
        borderRadius: "50%",
        background: "red",
        opacity: 0.7,
        fontSize: "20px"
        };
        const contentStyle = {
        color: "black",
        fontSize: "20px"
        };
        const bgImg = {
        position: "absolute",
        zIndex: -1,
        left: 0,
        top: 0,
        width: "100%"
        };
    
  useEffect(() => {
  
    initFetch();
  },[]);
  

  
  
  return (
    <div>
        <Taskbar />
        <div>
            <RiderPage ridersData={ridersData} id={1}/>





            {/* {ridersData && ridersData.length > 0 ?
            (
                <AwesomeSlider cssModule={AwesomeSliderStyles}>
                    {ridersData.map((currElement, index) => {
                        return (
                            <div>
                                <RiderPage id={index}/>
                            </div>
                        )
                        })
                    }
                </AwesomeSlider>
            )
            :
            (
                <div></div>
            )
            
        
        }; */}
        </div>
  </div>
  )};

export default RondleidingPeriode;