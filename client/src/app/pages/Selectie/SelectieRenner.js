import { default as React, Fragment,useState, useCallback, useEffect,useRef} from 'react';
import { useParams } from 'react-router';
import * as Routes from '../../routes';
import { useAuth, useApi } from '../../services';
import { ListenIcon,InfoIcon,TaskbarSelectie } from '../../components';
import {Fade,Slide,Zoom,Mirror} from 'react-reveal';
import Popup from 'reactjs-popup';
import makeCarousel from 'react-reveal/makeCarousel';

const SelectieRenner = () => {
  
  const { periode,id } = useParams();
  const [riderData, setRiderData] = useState();
  const [audioState, setAudioState] = useState("");
  const [dataLength, setDataLength] = useState();
  const { getRidersFromPeriod,getPeriodes} = useApi();
  const [isPlaying, setPlayingState] = useState(false);
 
  const [open1,setOpen1] = useState(false)
  const [open2,setOpen2] = useState(false)

  const CarouselUI = ({ children }) => <div className="rider-carousel-container">{children}</div>;
  const Carousel = makeCarousel(CarouselUI);

  const updateAudioState = async (url,type) => {
    setAudioState(url);
    switch(type){
      case 1:
        openModal1();
        break;
      case 2:
        openModal2();
        break;
      case 3:
        openModal3();
        break;
      case 4:
        break;
    }
  }

  const clearAudioState = async () => {
    setAudioState("",4)
  }

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  const openModal1 = () => {
    setPlayingState(true);
    ref1.current.open();
  }

  const closeModal1 = async () => {
    await updateAudioState("",4);
    ref1.current.close();
  }

  const openModal2 = () => {
    setPlayingState(true);
    ref2.current.open();
  }
  const closeModal2 = async () => {
    await updateAudioState("",4);
    ref2.current.close();
  }
  const openModal3 = () => {
    setPlayingState(true);
    ref3.current.open();
  }

  const closeModal3 = async () => {
    await updateAudioState("",4);
    ref3.current.close();
  }

  const handleClick = async (ev,id) => {
    ev.preventDefault();
    switch(id) {
      case 1:
        openModal1();
        break;
      
    } 
  }

  const handleOpen1 = (ev) => {
    ev.preventDefault();
    if(open1){
      document.getElementsByClassName('youth-media')[0].style.minHeight = "20vh";
      document.getElementsByClassName('youth-media-info-tag')[0].style.display = "none" ;
      document.getElementsByClassName('youth-media-image')[0].style.display = "none" ;
      setOpen1(false)
    }else {
      document.getElementsByClassName('youth-media')[0].style.minHeight = "60vh";
      setTimeout(function(){ 
        document.getElementsByClassName('youth-media-info-tag')[0].style.display = "block";
        document.getElementsByClassName('youth-media-image')[0].style.display = "block"; 
      }, 500);
      setOpen1(true)
    }
  }

  const handleOpen2 = (ev) => {
    ev.preventDefault();
    if(open2){
      document.getElementsByClassName('career-media')[0].style.minHeight = "20vh";
      document.getElementsByClassName('career-media-info-tag')[0].style.display = "none" ;
      document.getElementsByClassName('career-media-image')[0].style.display = "none" ;
      setOpen2(false)
    }else {
      document.getElementsByClassName('career-media')[0].style.minHeight = "60vh";
      setTimeout(function(){ 
        document.getElementsByClassName('career-media-info-tag')[0].style.display = "block";
        document.getElementsByClassName('career-media-image')[0].style.display = "block"; 
      }, 500);
      setOpen2(true)
    }
  }

  const handleOpen3 = (ev) => {
    ev.preventDefault();
    if(open2){
      document.getElementsByClassName('aftercareer-media')[0].style.minHeight = "20vh";
      document.getElementsByClassName('aftercareer-media-info-tag')[0].style.display = "none" ;
      document.getElementsByClassName('aftercareer-media-image')[0].style.display = "none" ;
      setOpen2(false)
    }else {
      document.getElementsByClassName('aftercareer-media')[0].style.minHeight = "60vh";
      setTimeout(function(){
         document.getElementsByClassName('aftercareer-media-info-tag')[0].style.display = "block" ;
         document.getElementsByClassName('aftercareer-media-image')[0].style.display = "block" ; 
        }, 500);
      setOpen2(true)
    }
  }

  const update = async() => {
    console.log("Finished listening/reading")
    setAudioState("")
  }

  const start = async() => {
    await openModal1();
  }

  const togglePlayingState = () => {
    setAudioState("",4);
    console.log(`Current playing status": ${isPlaying}`);
    setPlayingState(false)
  }

  const initFetch = useCallback(
    () => {
      const getInfo = async () => {
        const ridersData = await getRidersFromPeriod(periode);
        const periodes = await getPeriodes();
        console.log(periodes);
        console.log(ridersData);
        setDataLength(ridersData.length)
        setRiderData(ridersData[id-1]);
      }
      getInfo();
    });
  
      
    
  useEffect(() => {
    let el = document.querySelector('.page');
    el.classList.add('fade-in');
    initFetch();
  },[audioState,id]);
  

  
  
  return (
    <div>
        <TaskbarSelectie togglePlayingState={togglePlayingState} periode={periode} id={id} periode={periode} update={update} start={console.log("starting!")} clearAudioState={clearAudioState} updateAudioState={updateAudioState} audioState={audioState}/>
        {riderData  ?
        ( 
        <div className="riderpage">
          <Fade bottom cascade>
          <div className="riderpage-first" style={{  
            backgroundImage: "url(" + riderData.media.bannerPicture + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}>
              <div className="riderpage-title">
                <p >{riderData.info.name}</p>                
              </div>
              
              <div className="riderpage-subtitle">
              <Fade bottom cascade delay={750}>
                <p >{`"${riderData.info.nickname}"`}</p>
                </Fade>               
              </div>
              <span class="scroll-btn">
                <p >
                  <span class="mouse">
                    <span>
                    </span>
                  </span>
                </p>
              </span>
          </div>
          </Fade>
          <div className="riderpage-second">
            <div className="riderpage-info">
            <Fade left>
              <div className="riderpage-info-1" style={{  
                backgroundImage: "url(" + riderData.media.profilePicture + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}>
              </div>
            </Fade>
            <Fade right>
              <div className="riderpage-info-2">
                <div className="riderpage-info-2-top">
                  <p className="riderpage-info-2-top-name">{riderData.info.name}</p>
                </div>
                <div className="riderpage-info-2-middle">
                  <i className="riderpage-info-2-middle-icon fas fa-birthday-cake"> </i>
                  <p className="riderpage-info-2-middle-name">{riderData.info.dateofbirth}</p>
                </div>
                <div className="riderpage-info-2-middle">
                  <i className="riderpage-info-2-middle-icon fas fa-map-marker-alt"> </i>
                  <p className="riderpage-info-2-middle-name">{riderData.info.placeofbirth}</p>
                </div>
              </div>
            </Fade>
            </div>
          </div>
          <div className="riderpage-timeline">
              <div className="youth">
                  <Fade delay={500} left>
                    <div className="youth-left">
                      <p>{`jeugd`}</p>
                      <div className="youth-listen">
                        <ListenIcon type={1} className={"rondleidingrenner-icon"} onClick={(ev) => handleClick(ev)} updateAudioState={updateAudioState} audioURL={riderData.media.audioURLYouth}/> 
                        <div onClick={(ev) => handleOpen1(ev)}>
                          <InfoIcon />
                        </div>
                      </div>
                    </div>
                  </Fade>
                  <Fade delay={500} bottom>
                  <div className="youth-center">
                    <i class="fas fa-child"></i>
                  </div>
                  </Fade>
                  <Fade delay={500} right>
                  <div className="youth-right">               
                    <p>1945</p>                  
                  </div>
                  </Fade>
              </div>
              <Fade delay={500} bottom cascade>
              <div className="youth-media">                
                <Fade delay={500} left cascade>
                <div className="youth-media-images">
                      <div className="youth-media-image"  style={{  
                        backgroundImage: "url(" + riderData.media.youthPicture[0] + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }}>
                      </div>                      
                </div>
                </Fade>
                <Fade delay={500} right cascade >
                <div className="youth-media-info">
                  <p className="youth-media-info-tag">{riderData.info.youth}</p>                
                </div>
                </Fade>
              </div>
              </Fade>

              <div className="career">
                   <Fade delay={500} left>
                  <div className="career-right">               
                    <p>{riderData.info.startCareer}</p>                  
                  </div>
                  </Fade>

                  <Fade delay={500} bottom>
                  <div className="career-center">
                    <i class="fas fa-bicycle"></i>
                  </div>
                  </Fade>
                  

                  <Fade delay={500} right>
                    <div className="career-left">
                      <p>{`WIELERCARRIERE`}</p>
                      <div className="career-listen">
                        <ListenIcon type={2} className={"rondleidingrenner-icon"} onClick={(ev) => handleClick(ev)} updateAudioState={updateAudioState} audioURL={riderData.media.audioURLCareer}/> 
                        <div onClick={(ev) => handleOpen2(ev)}>
                          <InfoIcon />
                        </div>
                      </div>
                    </div>
                  </Fade>

              </div>

              <Fade delay={500} bottom cascade>
              <div className="career-media">

                <Fade delay={500} left cascade >
                  <div className="career-media-info"> 

                    <p className="career-media-info-tag">{riderData.info.career}</p>
                  
                  </div>
                </Fade>


                <Fade delay={500} right cascade>
                <div className="career-media-images">
                  <div className="career-media-image"  style={{  
            backgroundImage: "url(" + riderData.media.careerPicture[0] + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}>
                  </div>
                </div>
                </Fade>        
              </div>
              </Fade>
              <div className="aftercareer">
                  <Fade delay={500} left>
                    <div className="aftercareer-left">
                      <p>{"Na het wielrennen"}</p>
                      <div className="aftercareer-listen">
                        <ListenIcon  type={3} className={"rondleidingrenner-icon"} onClick={(ev) => handleClick(ev)} updateAudioState={updateAudioState} audioURL={riderData.media.audioURLAfterCareer}/> 
                        <div onClick={(ev) => handleOpen3(ev)}>
                          <InfoIcon />
                        </div>
                      </div>
                    </div>
                  </Fade>
                  <Fade delay={500} bottom>
                  <div className="aftercareer-center">
                  <i class="fas fa-umbrella-beach"></i>
                  </div>
                  </Fade>
                  <Fade delay={500} right>
                  <div className="aftercareer-right">               
                    <p>{riderData.info.endCareer}</p>                  
                  </div>
                  </Fade>
              </div>

              <Fade delay={500} bottom cascade>
              <div className="aftercareer-media">

              <Fade delay={500} left cascade>
                <div className="aftercareer-media-images">
                  <div className="aftercareer-media-image"  style={{  
            backgroundImage: "url(" + riderData.media.afterCareerPicture[0] + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}>
                  </div>
                </div>
                </Fade>

                <Fade delay={500} right cascade >
                <div className="aftercareer-media-info"> 

                  <p className="aftercareer-media-info-tag">{riderData.info.aftercareer}</p>
                
                </div>
                </Fade>



              </div>
              </Fade>

              </div>
              <Fade delay={500} left opposite={true}>
              <div className="rider-spacer" style={{  
                  backgroundImage: "url(http://pngimg.com/uploads/cycling/cycling_PNG79.png)",
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'repeat',
                }}>
                
              </div>
              </Fade>
             
              <div className="rider-victories">
                
                <h1 >Meest memorable overwinningen</h1>
               
              <Fade delay={500} left cascade>
              <div>
                <div className="rider-victory">
                  <p className="rider-victory-count">1</p>
                  <p className="rider-victory-year">{riderData.victories.one.victoryOneYear}</p>
                  <div className="rider-victory-ride">
                      <p className="rider-victory-ride-name">{riderData.victories.one.victoryOneRide}</p>
                      <p className="rider-victory-ride-team">{riderData.victories.one.victoryOneTeam}</p>
                  </div>
                </div>

                <div className="rider-victory">
                  <p className="rider-victory-count">2</p>
                  <p className="rider-victory-year">{riderData.victories.two.victoryTwoYear}</p>
                  <div className="rider-victory-ride">
                      <p className="rider-victory-ride-name">{riderData.victories.two.victoryTwoRide}</p>
                      <p className="rider-victory-ride-team">{riderData.victories.two.victoryTwoTeam}</p>
                  </div>
                </div>

                <div className="rider-victory">
                  <p className="rider-victory-count">3</p>
                  <p className="rider-victory-year">{riderData.victories.three.victoryThreeYear}</p>
                  <div className="rider-victory-ride">
                      <p className="rider-victory-ride-name">{riderData.victories.three.victoryThreeRide}</p>
                      <p className="rider-victory-ride-team">{riderData.victories.three.victoryThreeTeam}</p>
                  </div>
                </div>

                <div className="rider-victory">
                  <p className="rider-victory-count">4</p>
                  <p className="rider-victory-year">{riderData.victories.four.victoryFourYear}</p>
                  <div className="rider-victory-ride">
                      <p className="rider-victory-ride-name">{riderData.victories.four.victoryFourRide}</p>
                      <p className="rider-victory-ride-team">{riderData.victories.four.victoryFourTeam}</p>
                  </div>
                </div>

                <div className="rider-victory">
                  <p className="rider-victory-count">5</p>
                  <p className="rider-victory-year">{riderData.victories.five.victoryFiveYear}</p>
                  <div className="rider-victory-ride">
                      <p className="rider-victory-ride-name">{riderData.victories.five.victoryFiveRide}</p>
                      <p className="rider-victory-ride-team">{riderData.victories.five.victoryFiveTeam}</p>
                  </div>
                </div>
              </div>
              </Fade>               
              </div>
              
        </div>
        )
        :
        (
           <div></div>
        )
      }
      {riderData ?
      (
        <div>
        <Popup      
                modal
                nested
                ref={ref1}
                closeOnDocumentClick={false}
            >
                {close => (
                <div className="popup-modal completepage">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    {/* <div className="header">Info</div> */}
                    <Fade bottom cascade>
                    <div className="content">
                    <h1 className="pb-2">De jeugd van {riderData.info.name} </h1>
                    <Carousel defaultWait={10000} maxTurns={100}>

                    {riderData.media.youthPicture.map((item,index) => {
                      return (
                        <Slide right>
                      <div className="carousel-innerdiv" style={{  
                        backgroundImage: "url(" + riderData.media.youthPicture[index] + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                      }}>
                      </div>
                    </Slide>
                      )
                    })}
                    

                  </Carousel>
                    </div>
                    </Fade>
                    {!isPlaying ?
                    (
                      <Fade bottom>
                      <div className="actions">
                      <button
                          className="complete-btn-small"
                          onClick={async () => {
                            await closeModal1();
                          }}
                      >
                          SLUITEN
                      </button>
                      </div>
                      </Fade>
                    )
                  :
                  (
                    <p></p>
                  )
                  }
                </div>
                )}
        </Popup>
        
        
        <Popup      
                modal
                nested
                ref={ref2}
                closeOnDocumentClick={false}
            >
                {close => (
                <div className="popup-modal completepage">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    {/* <div className="header">Info</div> */}
                    <Fade bottom cascade>
                    <div className="content">
                    <h1 className="pb-2">{riderData.info.name.split(' ')[0]}'s wielercarrière</h1>
                    <Carousel defaultWait={10000} maxTurns={100}>

                    {riderData.media.careerPicture.map((item,index) => {
                      return (
                        <Slide right>
                      <div className="carousel-innerdiv" style={{  
                        backgroundImage: "url(" + riderData.media.careerPicture[index] + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                      }}>
                      </div>
                    </Slide>
                      )
                    })}
                    

                  </Carousel>
                    </div>
                    </Fade>
                    {!isPlaying ?
                    (
                      <Fade bottom>
                      <div className="actions">
                      <button
                          className="complete-btn-small"
                          onClick={async () => {
                            await closeModal2();
                          }}
                      >
                          SLUITEN
                      </button>
                      </div>
                      </Fade>
                    )
                  :
                  (
                    <p></p>
                  )
                  }
                </div>
                )}
        </Popup>

        <Popup      
                modal
                nested
                ref={ref3}
                closeOnDocumentClick={false}
            >
                {close => (
                <div className="popup-modal completepage">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    {/* <div className="header">Info</div> */}
                    <Fade bottom cascade>
                    <div className="content">
                    <h1 className="pb-2">{riderData.info.name.split(' ')[0]} na het wielrennen</h1>
                    <Carousel defaultWait={10000} maxTurns={100}>

                    {riderData.media.afterCareerPicture.map((item,index) => {
                      return (
                        <Slide right>
                      
                      <div className="carousel-innerdiv" style={{  
                        backgroundImage: "url(" + riderData.media.afterCareerPicture[index] + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                      }}>
                      </div>
                    </Slide>
                      )
                    })}
                    

                  </Carousel>
                    </div>
                    </Fade>
                    {!isPlaying ?
                    (
                      <Fade bottom>
                      <div className="actions">
                      <button
                          className="complete-btn-small"
                          onClick={async () => {
                           await closeModal3();
                          }}
                      >
                          SLUITEN
                      </button>
                      </div>
                      </Fade>
                    )
                  :
                  (
                    <p></p>
                  )
                  }
                </div>
                )}
        </Popup>

        


        </div>
        


      )
      :
      (
        <div></div>
      )
      }
  </div>

  
  )};

export default SelectieRenner;