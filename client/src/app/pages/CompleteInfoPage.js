import { default as React, Component  ,Fragment,useState,useEffect, useRef} from 'react';
import { useAuth, useApi } from '../services';
import * as Routes from '../routes';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {Fade,Slide} from 'react-reveal';

const CompleteInfoPage = () => {

    let history = useHistory();
    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }


    
 
    const ref = useRef();
    const openModal = () => ref.current.open();
    const closeModal = () => ref.current.close();

    const handleClick = async (ev) => {
        ev.preventDefault();
        document.getElementsByClassName('error-completion')[0].style.display = "none" ;
        const name = document.getElementById('name').value;
        const location = document.getElementById('location').value;
        const age = document.getElementById('age').value;
        if(name !== "" && location !== "" && age !== "" ){
            setCookie("name", name)
            setCookie("location", location)
            setCookie("age", age)
            openModal();
        }else{
            openModal();
            document.getElementsByClassName('error-completion')[0].style.display = "block" ;
        }
    }

    const handleClose = () => {
        history.push(Routes.RONDLEIDING_PERIODE.replace(':id',1))
    };

   

    useEffect(() => {
        let el = document.querySelector('.page');
        el.classList.add('fade-in');
      });

    



  return (
       <Fragment>
            <div className="complete-div">
            <a href={'/selection'} >
                <Fade top>
                <div className="selectie-return">
                naar keuzemenu
                  </div>
                </Fade>
              </a>
                
                    <div className="complete-info">
                        <h1 className="complete-info-title">VERVOLLEDIG JOUW PROFIEL</h1>
                        <Fade top cascade>
                        <div className="complete-input">

                            <div class="ui input complete-field">
                                <p className="complete-label">NAAM</p>
                                <input id="name" class="addrenner-input" type="text" placeholder="vb. Jan Janssens"/>
                            </div>

                            <div class="ui input complete-field">
                                <p className="complete-label">WOONPLAATS</p>
                                <input id="location" class="addrenner-input" type="text" placeholder="vb. Gent"/>
                            </div>

                            <div class="ui input complete-field">
                                <p className="complete-label">LEEFTIJD</p>
                                <input id="age" class="addrenner-input" type="number" placeholder="vb. 18"/>
                            </div>

                        </div>
                        </Fade>
                        
                        <button onClick={(ev) => handleClick(ev)} className="button complete-btn"> START DE RONDLEIDING</button>
                        <div style={{ display : "none" }} class="error-completion">Gelieve alle verplichte velden in te vullen.</div>
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
                                <div className="content">
                                    <p className="popup-info">DOORHEEN DEZE INTERACTIEVE RONDLEIDING KRIJG JE 
                                    TWEE ICONEN TER BESCHIKKING.
                                    </p>
                                    <div className="popup-iconen">

                                        <div className="popup-uitleg">
                                            <i class="popup-icon fas fa-headphones-alt"></i>
                                            <p className="mt-4">SLEEP DEZE HOOFDTELEFOON  NAAR GELIJKAARDIGE ICONEN OM HET GELUIDSFRAGMENT TE STARTEN</p>
                                        </div>

                                        <div className="popup-uitleg">
                                            <i class="popup-icon fas fa-info-circle"></i>
                                            <p className="mt-4">GEEN HOOFDTELEFOON TER BESCHIKKING? VIA HET INFO-ICOON KAN JE STEEDS TEKST VERKIEZEN OVER AUDIO</p>
                                        </div>


                                    </div>
                                </div>
                                <div className="actions">
                                <button
                                    className="complete-btn-small"
                                    onClick={() => {
                                    handleClose();
                                    }}
                                >
                                    OK, BEGREPEN!
                                </button>
                                </div>
                            </div>
                            )}
                        </Popup>
                    </div>
                    
                
            </div>
            </Fragment>
  );
};

export default CompleteInfoPage;