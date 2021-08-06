import { default as React, Fragment} from 'react';
import { useAuth, useApi } from '../services';
import * as Routes from '../routes';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const HomePage = () => {

  let history = useHistory();

  const handleClick2 = () => {
    history.push(Routes.DASHBOARD_HOME)
  }

  const handleClick = () => {
    // check screen width here
    history.push(Routes.SELECTION)
  }

  return (
    <Fragment>
      <div className="home-div">

        <div className="home-text">
          <h1 className="text-center">DE FLANDRIENS</h1>
          <h2 className="text-center">Een virtuele rit doorheen de geschiedenis van de Belgische wielersport</h2>
        </div>

        <Button onClick={() => handleClick()} className="home-btn" color="yellow">DE GESCHIEDENIS START HIER</Button>
        <Button onClick={() => handleClick2()} className="home-btn" color="yellow">DASH</Button>
      </div>
    </Fragment>
  );
};

export default HomePage;