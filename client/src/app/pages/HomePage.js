import { default as React, Fragment, useEffect} from 'react';
import { useAuth, useApi } from '../services';
import * as Routes from '../routes';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import {Fade,Slide} from 'react-reveal';
import CookieConsent from "react-cookie-consent";

const HomePage = () => {

  let history = useHistory();

  const handleClick2 = () => {
    history.push(Routes.DASHBOARD_HOME)
  }

  const handleClick = () => {
    // check screen width here
    history.push(Routes.SELECTION)
  }

  useEffect(() => {
    let el = document.querySelector('.page');
    el.classList.add('fade-in');
  });

  return (
    <Fragment>
      <div className="home-div">
      <Fade top cascade>
        <div className="home-text">
          
            <h1 className="text-center">DE FLANDRIENS</h1>
         
         
            <h2 className="text-center">Een virtuele rit doorheen de geschiedenis <br></br>van de Belgische wielersport</h2>
        
          
        </div>
        </Fade>

        <Fade bottom>
          <Button onClick={() => handleClick()} className="home-btn" color="yellow">DE GESCHIEDENIS START HIER</Button>
        </Fade>

        
        <CookieConsent
          location="bottom"
          buttonText="Gebruik van cookies toestaan"
          cookieName="allowCookies"
          style={{ background: "#535353",  }}
          buttonStyle={{ color: "#4e503b", fontSize: "12px" }}
          expires={150}
        >
          Deze website gebruikt cookies om de juiste werking en functionaliteit te garanderen.{" "}
          <span style={{ fontSize: "13px" }}></span>
        </CookieConsent>
  
      </div>
    </Fragment>
  );
};

export default HomePage;