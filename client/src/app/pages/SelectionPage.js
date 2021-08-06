import { default as React, Fragment} from 'react';
import { useAuth, useApi } from '../services';
import * as Routes from '../routes';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const SelectionPage = () => {

  let history = useHistory();

  const handleClick2 = () => {
    history.push(Routes.DASHBOARD_HOME)
  }

  const handleClick = () => {
    history.push(Routes.COMPLETE_INFO)
  }

  return (
    <Fragment>
    
      <div className="selection-div">
        
        <div onClick={handleClick} className="selection1">
            <p className="selection-text1">RONDLEIDING <br></br>VOLGEN</p>
        </div>

        <div className="selection2">
            <p className="selection-text2">ZELF  <br></br>ONTDEKKEN</p>
        </div>



       
      </div>
    </Fragment>
  );
};

export default SelectionPage;