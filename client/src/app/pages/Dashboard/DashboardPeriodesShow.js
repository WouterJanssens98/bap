import { default as React, Fragment, useState, useCallback, useEffect } from 'react';
import { useAuth, useApi } from '../../services';
import { useHistory, useParams } from 'react-router';
import { DropdownLarge, DropdownMedium } from '../../components';
import { Button } from 'semantic-ui-react';

const DashboardPeriodesShow = () => {

const {currentUser, getCookie} = useAuth();
const {getPeriode} = useApi();
const { id } = useParams();
const { getPeriodes } = useApi();
const [ periode, setPeriode ] = useState();

  const initFetch = useCallback(
    () => {
      const getInfo = async () => {
        const data = await getPeriode(id);
        setPeriode(data);
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
        {periode && periode ?
        (
        <div>
        
            <p className="addrenner-title">{`PERIODE ${periode.fromYear}-${periode.toYear}`}</p>
            
            <div class="addrenner-overview">

                <div class="renner-table">
                    <th class="renner-tablehead">
                    <td>ID</td>
                    <td>RENNER</td>
                    <td>TOEGEVOEGD OP</td>
                    <td>ACTIES</td>
                    </th>
                </div>

                <div class="renner-table">

                {periode.referredRiders.length > 0 ? 
                (
                    periode.referredRiders.map((rider) => {
                        return (
                            <tr class="renner-tablecontent">
                            <td>{periode.referredRiders.indexOf(rider) + 1}</td>
                            <td>{rider.name}</td>
                            <td class="">{(periode.referredRiders).length}</td>
                            <div class="renner-tableactions d-flex">
                                <a href={`periodes/edit/${periode.id}`} class="d-flex renner-tablelink mr-4">
                                <i class="fas fa-trash-alt mr-2"></i>
                                <p>VERWIJDEREN</p>
                                </a>
                                <a href={`renners/show/${periode.id}`} class="d-flex renner-tablelink">
                                <i class="fas fa-eye mr-2"></i>
                                <p>RENNER BEKIJKEN</p>
                                </a>
                            </div>
                            </tr>
                        )
                    })
                ):
                (
                    <p className="text-center mt-5 mb-5">No riders added yet </p>
                )}
                </div>
            </div>
        </div>
        ):
        (
            <p></p>
        )}
      
    </Fragment>
  );
};

export default DashboardPeriodesShow;