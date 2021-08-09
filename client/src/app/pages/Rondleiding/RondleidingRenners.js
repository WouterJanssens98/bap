import { default as React, Fragment,useState, useCallback, useEffect,useRef} from 'react';
import { useHistory, useParams } from 'react-router';
import ReactDOM from 'react-dom'
import { useAuth, useApi } from '../../services';
import {useSpring, animated} from 'react-spring';
import { Loading,ListenIcon,InfoIcon,Taskbar } from '../../components';
import {Fade,Slide,Zoom,Mirror} from 'react-reveal';
import Popup from 'reactjs-popup';
import makeCarousel from 'react-reveal/makeCarousel';

const RondleidingPeriode = () => {
  const { periode,id } = useParams();
  const history = useHistory();
  const [riderData, setRiderData] = useState();
  const [audioState, setAudioState] = useState("");
  const { getRidersFromPeriod} = useApi();

  const [open1,setOpen1] = useState(false)
  const [open2,setOpen2] = useState(false)

  const CarouselUI = ({ children }) => <div className="rider-carousel-container">{children}</div>;
  const Carousel = makeCarousel(CarouselUI);

  const updateAudioState = async (url) => {
    console.log("Setting new URl");
    setAudioState(url)
  }

  const clearAudioState = async () => {
    setAudioState("")
  }

  const ref = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const openModal1 = () => ref1.current.open();
  const closeModal1 = () => ref1.current.close();

  const openModal2 = () => ref2.current.open();
  const closeModal2 = () => ref2.current.close();

  const handleClick = async (ev,id) => {
    ev.preventDefault();
    switch(id) {
      case 1:
        openModal1();
        console.log("1!")
        break;
      
    } 
  }

  const handleOpen1 = (ev) => {
    ev.preventDefault();
    if(open1){
      document.getElementsByClassName('youth-media')[0].style.minHeight = "25vh";
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
      document.getElementsByClassName('career-media')[0].style.minHeight = "25vh";
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
      document.getElementsByClassName('aftercareer-media')[0].style.minHeight = "25vh";
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
        <Taskbar update={update} start={openModal2} clearAudioState={clearAudioState} updateAudioState={updateAudioState} audioState={audioState}/>
        {riderData ?
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
                <ListenIcon className={"rondleidingperiode-icon"} onClick={(ev) => handleClick(ev)} updateAudioState={updateAudioState} audioURL={riderData.media.audioURL}/>
                <div onClick={(ev,key) => handleClick(ev,1)}>
                  <InfoIcon className={"rondleiding-icon2"} />
                </div>
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
                  <i className="riderpage-info-2-top-icon fas fa-award"> </i>
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
                        <ListenIcon className={"rondleidingrenner-icon"} onClick={(ev) => handleClick(ev)} updateAudioState={updateAudioState} audioURL={riderData.media.audioURL}/> 
                        <div onClick={(ev) => handleOpen1(ev)}>
                          <InfoIcon />
                        </div>
                      </div>
                    </div>
                  </Fade>
                  <Fade delay={500} bottom>
                  <div className="youth-center"></div>
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
            backgroundImage: "url(" + riderData.media.youthPicture + ")",
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
                    <p>1965</p>                  
                  </div>
                  </Fade>

                  <Fade delay={500} bottom>
                  <div className="career-center"></div>
                  </Fade>
                  

                  <Fade delay={500} right>
                    <div className="career-left">
                      <p>{`WIELERCARRIERE`}</p>
                      <div className="career-listen">
                        <ListenIcon className={"rondleidingrenner-icon"} onClick={(ev) => handleClick(ev)} updateAudioState={updateAudioState} audioURL={riderData.media.audioURL}/> 
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

                    <p className="career-media-info-tag">{riderData.info.youth}</p>
                  
                  </div>
                </Fade>


                <Fade delay={500} right cascade>
                <div className="career-media-images">
                  <div className="career-media-image"  style={{  
            backgroundImage: "url(" + riderData.media.careerPicture + ")",
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
                        <ListenIcon className={"rondleidingrenner-icon"} onClick={(ev) => handleClick(ev)} updateAudioState={updateAudioState} audioURL={riderData.media.audioURL}/> 
                        <div onClick={(ev) => handleOpen3(ev)}>
                          <InfoIcon />
                        </div>
                      </div>
                    </div>
                  </Fade>
                  <Fade delay={500} bottom>
                  <div className="aftercareer-center"></div>
                  </Fade>
                  <Fade delay={500} right>
                  <div className="aftercareer-right">               
                    <p>1978</p>                  
                  </div>
                  </Fade>
              </div>

              <Fade delay={500} bottom cascade>
              <div className="aftercareer-media">

              <Fade delay={500} left cascade>
                <div className="aftercareer-media-images">
                  <div className="aftercareer-media-image"  style={{  
            backgroundImage: "url(" + riderData.media.afterCareerPicture + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}>
                  </div>
                </div>
                </Fade>

                <Fade delay={500} right cascade >
                <div className="aftercareer-media-info"> 

                  <p className="aftercareer-media-info-tag">{riderData.info.youth}</p>
                
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
                
                <h1>Meest memorable overwinningen</h1>
               
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
            <Loading />
        )
      }
      {riderData ?
      (
        <div>
        <Popup      
                modal
                nested
                ref={ref1}
            >
                {close => (
                <div className="popup-modal completepage">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    {/* <div className="header">Info</div> */}
                    <Fade bottom cascade>
                    <div className="content">
                        <p className="periode-info">{riderData.info.name}
                        </p>
                        <div className="periode-uitleg">
                            <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis nunc vulputate, bibendum urna in, sodales lacus. Sed pretium mi ac ultrices lobortis. Duis vitae tortor quam. Aenean et neque enim. Maecenas ac sapien non urna malesuada finibus a non leo. Maecenas a accumsan nisl, convallis consequat leo. Vivamus a aliquet enim. Curabitur non nisi eu arcu consequat feugiat eu eget dui. Cras ultrices mauris vitae massa malesuada, quis mattis diam facilisis. Praesent tempor, nulla et elementum molestie, massa mauris finibus lectus, in condimentum tortor sem quis sem. Pellentesque non libero tristique, efficitur nulla sed, tincidunt tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce facilisis convallis erat, sit amet lacinia diam sollicitudin et. Curabitur ut urna vel mi bibendum euismod nec a justo.</p>
                        </div>
                    </div>
                    </Fade>
                    <div className="actions">
                    <button
                        className="complete-btn-small"
                        onClick={() => {
                          closeModal1();
                        }}
                    >
                        INFO SLUITEN
                    </button>
                    </div>
                </div>
                )}
        </Popup>
        
        
        <Popup      
                modal
                nested
                ref={ref2}
            >
                {close => (
                <div className="popup-modal completepage">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    {/* <div className="header">Info</div> */}
                    <Fade bottom cascade>
                    <div className="content">
                       
                    <Carousel defaultWait={5000} >
                    <Slide right>
                      <div className="carousel-innerdiv" style={{  
                        backgroundImage: "url(" + riderData.media.bannerPicture + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                      }}>
                      </div>
                    </Slide>
                  </Carousel>
                    </div>
                    </Fade>
                    <div className="actions">
                    <button
                        className="complete-btn-small"
                        onClick={() => {
                          closeModal2();
                        }}
                    >
                        SLUITEN
                    </button>
                    </div>
                </div>
                )}
        </Popup>


        </div>
        


      )
      :
      (
        <Loading />
      )
      }
  </div>

  
  )};

export default RondleidingPeriode;