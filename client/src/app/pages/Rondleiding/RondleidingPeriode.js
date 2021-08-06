import { default as React, Fragment,useState, useCallback, useEffect} from 'react';
import { useHistory, useParams } from 'react-router';
import ReactDOM from 'react-dom'
import { useAuth, useApi } from '../../services';
import {useSpring, animated} from 'react-spring';
import { Loading } from '../../components';

const RondleidingPeriode = () => {
  const { id } = useParams();
  const history = useHistory();
  const [periodesData, setPeriodesData] = useState();

  const { getPeriodes} = useApi();
  const initFetch = useCallback(
    () => {
      const getInfo = async () => {
        const periodesData = await getPeriodes();
        console.log(periodesData);
        setPeriodesData(periodesData);
      }
      getInfo();
    });
    
  useEffect(() => {
  
    initFetch();
  },[]);
  
  
  return (
    <Fragment>
      {periodesData ? 
      (
        <div className="rondleiding-info" style={{  
          backgroundImage: "url(" + periodesData[id-1].bannerImage + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}>
          <p className="rondleiding-title">{periodesData[id-1].start}-{periodesData[id-1].end}</p>
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