import { default as React, Fragment,useEffect} from 'react';
import { useAuth, useApi } from '../services';
import * as Routes from '../routes';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import {Fade,Slide} from 'react-reveal';

const SelectionPage = () => {

  
  let history = useHistory();

  const handleClick2 = () => {
    history.push(Routes.DASHBOARD_HOME)
  }

  const handleClick = () => {
    history.push(Routes.COMPLETE_INFO)
  }
  useEffect(() => {
    let el = document.querySelector('.page');
    el.classList.add('fade-in');
  });

  return (
    <Fragment>
    
      <div className="selection-div">
        <Slide left>
        <div onClick={handleClick} className="selection1">
            <Slide right>
            <p className="selection-text1">RONDLEIDING <br></br>VOLGEN</p>
            </Slide>
        </div>
        </Slide>

        <Slide right>
        <div className="selection2">
            <Slide left>
            <p className="selection-text2">ZELF  <br></br>ONTDEKKEN</p>
            </Slide>
        </div>
        </Slide>


       
      </div>
    </Fragment>
  );
};

export default SelectionPage;