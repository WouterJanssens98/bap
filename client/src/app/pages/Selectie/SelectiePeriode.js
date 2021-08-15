import { default as React ,Fragment,useState,useEffect,useCallback} from 'react';
import { useApi } from '../../services';
import { useParams } from 'react-router';
import {Fade} from 'react-reveal';

const SelectiePeriode = () => {

    const { periode } = useParams();
    const { getRidersFromPeriod} = useApi();
    const [riderData, setRiderData] = useState();
    const initFetch = useCallback(
      () => {
        const getInfo = async () => {
          const riders = await getRidersFromPeriod(periode);
          setRiderData(riders);
        }
        getInfo();
      });

    useEffect(() => {
        let el = document.querySelector('.page');
        el.classList.add('fade-in');
        initFetch();
      },[]);

  return (
       <Fragment>
            <div className="selectie-div2">
            <a href={'/selectie'} >
                <Fade top >
                <div className="selectie-return">
                Periodes bekijken
                  </div>
                </Fade>
                
              </a>

                {riderData ? 

                (<Fade bottom cascade>
                  <div className="selectie-outer-div2">
                  {
                      riderData.map((item,index) => {
                        return (
                         
                        <a href={`/selectie/${periode}/${index+1}`} className="selectie-inner-div2" style={{  
                          backgroundImage: "url(" + item.media.bannerPicture + ")",
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          width : `${100/riderData.length}vw`
                        
                        }}>
                          <p className="selectie-inner-text2">{`${item.info.name}`}</p>
                        </a>
                       
                     
                        )
                      })
                  }
                  </div>
                  </Fade>



                )
                :
                (
                  <p></p>
                )
                }                        
                
                    
                    
            </div>
        </Fragment>
  );
};

export default SelectiePeriode;