import { default as React, Fragment, useState, useCallback, useEffect} from 'react';
import { useAuth, useApi } from '../../services';

const DashboardRittenPage = () => {

  const [rittenData, setRittenData] = useState();

  const {getRitten} = useApi();
  const initFetch = useCallback(
    () => {
      const getInfo = async () => {
        const rittenData = await getRitten();
        setRittenData(rittenData)
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
        <p class="pt-3">Rit toevoegen</p>
        <a class="w-fit-content" href="./ritten/add">
          <i class="renner-add-icon fas fa-plus-circle"></i>
        </a>
      </div>
    
      <div class="renner-overview">
      
      <div class="renner-table">
          <th class="renner-tablehead">
            <td>ID</td>
            <td>RIT</td>
            <td>TYPE</td>
            <td>ACTIES</td>
          </th>
      </div>
      
      {rittenData ?
            (
              rittenData.length > 0 ?
              (
                rittenData.map((item,index) => {
                  return (
                    <tr class="renner-tablecontent">
                      <td class="pl-2">{index + 1}</td>
                      <td  class="pl-4 pr-3">{item.info.name.toUpperCase()}</td>
                      <td  class="ml-2">{item.info.type.toUpperCase()}</td>
                      <td>
                        <div class="renner-tableactions d-flex">
                          <a href="/edit" class="d-flex renner-tablelink mr-4">
                            <i class="fas fa-pen mr-2"></i>
                            {/* <p>BEWERK</p> */}
                          </a>
                          <a href="/edit" class="d-flex renner-tablelink">
                            <i class="fas fa-eye mr-2"></i>
                            {/* <p>TONEN</p> */}
                          </a>
                        </div>
                      </td>
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
              <p class="renner-loadingtable">Loading data....</p>
            )}
      

      </div>

      
    </div>
    </Fragment>
  );
};

export default DashboardRittenPage;