import { default as React, Fragment} from 'react';
import { useAuth, useApi } from '../../services';

const DashboardRittenPage = () => {

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
            <td>TOEGEVOEGD OP</td>
            <td>ACTIES</td>
          </th>
      </div>

      <div class="renner-table">
          <tr class="renner-tablecontent">
            <td>1</td>
            <td>RONDE VAN VLAANDEREN</td>
            <td class="mr-4">26/3/2021</td>
            <div class="renner-tableactions d-flex">
              <a href="/edit" class="d-flex renner-tablelink mr-4">
                <i class="fas fa-pen mr-2"></i>
                <p>BEWERK</p>
              </a>
              <a href="/edit" class="d-flex renner-tablelink">
                <i class="fas fa-eye mr-2"></i>
                <p>TONEN</p>
              </a>
            </div>
          </tr>
      </div>
      

      </div>

      
    </div>
    </Fragment>
  );
};

export default DashboardRittenPage;