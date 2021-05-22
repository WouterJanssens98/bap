import { default as React, Fragment,useState,useEffect, useCallback} from 'react';
import { useAuth, useApi } from '../../services';

const DashboardPeriodesPage = () => {

  const { getPeriodes } = useApi();
  const [ periodes, setPeriodes ] = useState();

  const initFetch = useCallback(
    () => {
      const getInfo = async () => {
        const data = await getPeriodes();
        setPeriodes(data);
        console.log(data)
      }
      getInfo();
    },[],
  )

  useEffect(() => {
    initFetch();

    return () => {
      // no cleanup
    }
  }, [initFetch]);

  return (
    <Fragment>
      <div>
      
      
      <div class="renner-add" >
        <p class="pt-3">Periode toevoegen</p>
        <a class="w-fit-content" href="./periodes/add">
          <i class="renner-add-icon fas fa-plus-circle"></i>
        </a>
      </div>
    
      <div class="renner-overview">

      <div class="renner-table">
          <th class="renner-tablehead">
            <td>ID</td>
            <td>PERIODE</td>
            <td>AANTAL RENNERS</td>
            <td>ACTIES</td>
          </th>
      </div>

      <div class="renner-table">

        {periodes && periodes.map((periode) => {
          return (
            <tr class="renner-tablecontent">
            <td>{periodes.indexOf(periode) + 1}</td>
            <td>{periode.fromYear}-{periode.toYear}</td>
            <td class="">{(periode.referredRiders).length}</td>
              <div class="renner-tableactions d-flex">
                <a href={`periodes/edit/${periode.id}`} class="d-flex renner-tablelink mr-4">
                  <i class="fas fa-pen mr-2"></i>
                  <p>BEWERK</p>
                </a>
                <a href={`periodes/show/${periode.id}`} class="d-flex renner-tablelink">
                  <i class="fas fa-eye mr-2"></i>
                  <p>TONEN</p>
                </a>
              </div>
            </tr>
          )
        })}
                  

      </div>
      

      </div>

      
    </div>
    </Fragment>
  );
};

export default DashboardPeriodesPage;