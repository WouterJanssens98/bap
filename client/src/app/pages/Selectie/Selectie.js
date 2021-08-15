import { default as React ,Fragment,useState,useEffect,useCallback} from 'react';
import { useApi } from '../../services';
import {Fade} from 'react-reveal';

const Selectie = () => {
  const { getPeriodes} = useApi();
    const [periodesData, setPeriodesData] = useState();
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
      },[]);

  return (
       <Fragment>
            <div className="selectie-div">
              <a href='/selection' >
              <Fade top>
                <div className="selectie-return">
                Naar keuzemenu
                  </div>
              </Fade>
              </a>

                {periodesData && periodesData.length>0 ? 

                (<Fade bottom cascade>
                  <div className="selectie-outer-div">
                  {
                      periodesData.map((item,index) => {
                        return (
                         
                       
                        <a href={`/selectie/${item.start}-${item.end}`} className="selectie-inner-div" style={{  
                          backgroundImage: "url(" + item.bannerImage + ")",
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          width : `${100/periodesData.length}vw`
                         
                        }}>
                          <p className="selectie-inner-text">{`${item.start}-${item.end}`}</p>
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

export default Selectie;