import { default as React, Fragment} from 'react';
import { useAuth, useApi } from '../../services';
import { DropdownLarge, DropdownMedium } from '../../components';
import { Button } from 'semantic-ui-react';

const DashboardRittenAddPage = () => {

    const ritten = [
        { key: 1, text: 'De Ronde Van Vlaanderen', value: 'De Ronde Van Vlaanderen' },
        { key: 2, text: 'Omloop het Nieuwsblad', value: 'Omloop het Nieuwsblad' },
        { key: 3, text: 'Kuurne Brussel Kuurne', value: 'Kuurne Brussel Kuurne' },
    ]

    const types = [
        { key: 1, text: 'Eendagsrit', value: 'Eendagsrit' },
        { key: 2, text: 'Meerdaagse ronde', value: 'Meerdaagse ronde' },
        { key: 3, text: 'Wereldkampioenschap', value: 'Wereldkampioenschap' },
        { key: 3, text: 'Belgisch Kampioenschap', value: 'Belgisch Kampioenschap' }
    ]

    const jaren = [];
    let counter = 1;
    for(let i=1;i<=20;i++){
        jaren.push(
            {
                key : counter,
                text: `${i}`,
                value : i
            }
        )
        counter ++
    }
    

  return (
    <Fragment>
      <div>
      
        <p class="addrenner-title">RIT TOEVOEGEN</p>
      
        <div class="addrenner-overview">

        <form>
        
            <div class="addrenner-form">
                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Officiële naam</p>
                    <input class="addrenner-input" type="text" placeholder="vb. Gent/Wevelgem"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Type</p>
                    <DropdownLarge options={types}/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Regio</p>
                    <input class="addrenner-input" type="text" placeholder="vb. Vlaanderen"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Periode</p>
                    <input class="addrenner-input" type="text" placeholder="vb. 1960/1970"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Afstand</p>
                    <input class="addrenner-input" type="text" placeholder="vb. 150km"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Eerste editie</p>
                    <input class="addrenner-input" type="text" placeholder="vb. 1990"/>
                </div>

               
            </div>
            
            <div class="addrenner-formextra mt-2">


                <div class="ui input addrenner-field">
                    <p class="addrenner-label">BANNER FOTO</p>
                    <input class="addrenner-input" accept="image/png, image/jpeg, image/jpg" type="file"/>
                </div>



                <div class="ui input addrenner-field">
                    <p class="addrenner-label">FOTO 1</p>
                    <input class="addrenner-input" accept="image/png, image/jpeg, image/jpg" type="file"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">FOTO 2</p>
                    <input class="addrenner-input" accept="image/png, image/jpeg, image/jpg" type="file"/>
                </div>



                <div class="ui input addrenner-field">
                    <p class="addrenner-label">FOTO 3</p>
                    <input class="addrenner-input" accept="image/png, image/jpeg, image/jpg" type="file"/>
                </div>


            </div>
            
            <div class="addrenner-formextra pb-5 pt-3">
                <p class="addrenner-victorylabel">MEESTE MEMORABELE WINNAARS</p>
                <div class="addrenner-victorytable">
                    
                    <div class="renner-table">
                        <th class="addrenner-tablehead">
                            <td>NR.</td>
                            <td>NAAM</td>
                            <td>OVERWINNINGEN</td>
                            <td>PLOEG</td>
                        </th>
                    </div>

                    <div>
                        <tr class="renner-tablecontent">
                            <td class="mt-2">1</td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-input" type="text" placeholder="vb. Tom Boonen"/>
                                </div>
                            </td>
                            <td>
                                <DropdownMedium options={jaren}/>
                            </td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-ploeg" type="text" placeholder="Quick Step Cycling Team"/>
                                </div>
                            </td>
                        </tr>

                        <tr class="renner-tablecontent">
                            <td class="mt-2">2</td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-input" type="text" placeholder="vb. Tom Boonen"/>
                                </div>
                            </td>
                            <td>
                                <DropdownMedium options={jaren}/>
                            </td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-ploeg" type="text" placeholder="Quick Step Cycling Team"/>
                                </div>
                            </td>
                        </tr>

                        <tr class="renner-tablecontent">
                            <td class="mt-2">3</td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-input" type="text" placeholder="vb. Tom Boonen"/>
                                </div>
                            </td>
                            <td>
                                <DropdownMedium options={jaren}/>
                            </td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-ploeg" type="text" placeholder="Quick Step Cycling Team"/>
                                </div>
                            </td>
                        </tr>

                        <tr class="renner-tablecontent">
                            <td class="mt-2">4</td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-input" type="text" placeholder="vb. Tom Boonen"/>
                                </div>
                            </td>
                            <td>
                                <DropdownMedium options={jaren}/>
                            </td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-ploeg" type="text" placeholder="Quick Step Cycling Team"/>
                                </div>
                            </td>
                        </tr>

                        <tr class="renner-tablecontent">
                            <td class="mt-2">5</td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-input" type="text" placeholder="vb. Tom Boonen"/>
                                </div>
                            </td>
                            <td>
                                <DropdownMedium options={jaren}/>
                            </td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-ploeg" type="text" placeholder="Quick Step Cycling Team"/>
                                </div>
                            </td>
                        </tr>
                    </div>

                </div>
               
            </div>
            
            <div class="pb-5">
                <Button href="/dashboard/overview" className="addrenner-btn" color="yellow">RIT TOEVOEGEN</Button>
            </div>
        </form>

        </div>

        
      </div>
    </Fragment>
  );
};

export default DashboardRittenAddPage;