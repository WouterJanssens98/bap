import { default as React, Fragment, useState, useCallback, useEffect} from 'react';
import { useAuth, useApi } from '../../services';
import { Loading } from '../../components';
const DashboardRennersPage = () => {
  const [rennerData, setRennerData] = useState();

  const { getRenners} = useApi();
  const initFetch = useCallback(
    () => {
      const getInfo = async () => {
        const rennerData = await getRenners();
        setRennerData(rennerData)
      }
      getInfo();
    });

  useEffect(() => {
  
    initFetch();
  },[]);


  return (
    <Fragment>
      <div>
      
      
        <div class="renner-add" >
          <p class="pt-3">Renner toevoegen</p>
          <a class="w-fit-content" href="./renners/add">
            <i class="renner-add-icon fas fa-plus-circle"></i>
          </a>
        </div>
      
        <div class="renner-overview">
      
      <table class="renner-table">
          <tr class="renner-tablehead">
            <td>ID</td>
            <td>NAAM</td>
            <td>PERIODE</td>
          </tr>
     
      
      {rennerData ?
            (
              rennerData.length > 0 ?
              (
                rennerData.map((item,index) => {
                  return (
                    <tr class="renner-tablecontent">
                      <td>{index + 1}</td>
                      <td>{item.info.name.toUpperCase()}</td>
                      <td>{item.info.periode.toUpperCase()}</td>
                    </tr>
                    )
                })
              )
              :
              (
                
                  <td class="renner-emptytable">Nog geen renners toegevoegd.</td>
               
              )
            )
            :
            (
              <tr class="renner-tablecontent pb-5">
                <div class="loader pb-3 pt-3">
                   <Loading  />
                </div>
              </tr>
            )}
      
      </table>
      </div>
      </div>
    </Fragment>
  );
};

export default DashboardRennersPage;