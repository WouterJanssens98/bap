import { default as React, Fragment} from 'react';
import { useAuth, useApi } from '../../services';
import { DropdownLarge, DropdownMedium } from '../../components';
import { Button } from 'semantic-ui-react';
import * as Routes from '../../routes';
import { useHistory } from 'react-router-dom';

const DashboardPeriodesAddPage = () => {
    let history = useHistory();
    const {currentUser, getCookie} = useAuth();
    const {createPeriode} = useApi();

    const handleOnclick = async (ev) => {
      ev.preventDefault();
      const fromYear = document.getElementById('fromYear').value;
      const toYear = document.getElementById('toYear').value;
      if(fromYear && toYear !== ""){
        const request = await createPeriode(fromYear, toYear, JSON.parse(getCookie('user')),JSON.parse(getCookie('userEmail')))
        if(request.status == 201 ){
          history.push(Routes.DASHBOARD_PERIODES)
        } else {
          console.log(request)
        }

      }else{
        document.getElementsByClassName('error-status')[0].style.display = "block" ;
      }

        
    }
  return (
    <Fragment>
      <div>
      
        <p className="addrenner-title">PERIODE TOEVOEGEN</p>
      
        <div className="addrenner-overview">

        <form >
        
            <div className="addperiode-form">
                <div className="ui input addrenner-field">
                    <p className="addrenner-label">Van</p>
                    <input id="fromYear" className="addrenner-input" type="text" placeholder="vb. 1970"/>
                </div>
                <div className="ui input addrenner-field">
                    <p className="addrenner-label">Tot</p>
                    <input id="toYear" className="addrenner-input" type="text" placeholder="vb. 1980"/>
                </div>
               
            </div>
                       
            <div class="pt-5 pb-5">
                <Button  onClick={ (ev) => handleOnclick(ev)} type="submit"  className="addrenner-btn" color="yellow">PERIODE TOEVOEGEN</Button>
                <div style={{ display : "none" }} class="error-status">Vul alle velden correct in</div>
            </div>

        </form>

        </div>

        
      </div>
    </Fragment>
  );
};

export default DashboardPeriodesAddPage;