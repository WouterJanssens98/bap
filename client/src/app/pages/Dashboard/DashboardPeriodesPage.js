import { default as React, Fragment,useState,useEffect, useCallback} from 'react';
import { useAuth, useApi } from '../../services';
import { Loading } from '../../components';

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

     
      <table class="renner-table">
          <tr class="renner-tablehead">
            <td>ID</td>
            <td>START</td>
            <td>EINDE</td>
            <td>ACTIES</td>
          </tr>
     
      
      {periodes ?
            (
              periodes.length > 0 ?
              (
                periodes.map((item,index) => {
                  return (
                    <tr class="renner-tablecontent">
                      <td>{index + 1}</td>
                      <td>{item.start}</td>
                      <td>{item.end}</td>
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

export default DashboardPeriodesPage;