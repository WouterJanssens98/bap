import { default as React, Fragment} from 'react';
import {useRef,useState, useEffect} from 'react'
import { useAuth, useApi } from '../../services';
import { DropdownLarge, DropdownMedium } from '../../components';
import { useHistory } from 'react-router-dom';
import * as Routes from '../../routes';
import { Button } from 'semantic-ui-react';
import S3 from "react-aws-s3";

const DashboardRittenAddPage = () => {

    let history = useHistory();
    const {getCookie} = useAuth();
    const {createRit} = useApi();

    const bannerPicture = useRef();
    const firstPicture = useRef();
    const secondPicture = useRef();
    const thirdPicture = useRef();


    
    // states to keep track of selected year
    const [victoryFirst,setVictoryFirst] = useState();
    const [victorySecond,setVictorySecond] = useState();
    const [victoryThird,setVictoryThird] = useState();
    const [victoryFourth,setVictoryFourth] = useState();
    const [victoryFifth,setVictoryFifth] = useState();


    const [rideType,setRideType] = useState();

  
    const Upload = async () => {
        const pictures = [bannerPicture,firstPicture,secondPicture,thirdPicture];
        let result = [];

        for(let i=0;i<pictures.length;i++){
            let fileInput = pictures[i]
            let file = fileInput.current.files[0];
            let newfilename = fileInput.current.files[0].name;
            const config = {
                bucketName: process.env.REACT_APP_BUCKET_NAME,
                dirName: process.env.REACT_APP_DIR_NAME /* optional */,
                region: process.env.REACT_APP_REGION,
                accessKeyId: process.env.REACT_APP_ACCESS_ID,
                secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
            };
            const ReactS3Client = new S3(config);
            let response = await ReactS3Client.uploadFile(file,newfilename);
            result[i] = response.location
        }
        return result;
    }


    function checkCompletion ()  {
        const pictures = [bannerPicture, firstPicture, secondPicture, thirdPicture];
        const name = document.getElementById('name').value;
        const distance = document.getElementById('distance').value;
        const region = document.getElementById('region').value;
        const firstedition = document.getElementById('firstedition').value;
        const type = rideType;
        const description = document.getElementById('description').value;
        if(name !== "" && distance !== "" && region !== "" && firstedition !== "" && type !== "" && description !== ""){
            let counter = 0;
            for(let i=0;i<pictures.length;i++) {
                let fileInput = pictures[i]
                let file = fileInput.current.files[0]
                if(file == undefined){
                    return false
                }else {
                    counter +=1
                }
            }
            if(counter === pictures.length){
                return true // all required images were selected
            }
        }else{
            return false
        }
        
    }

    const handleDropdown = (event, data) => {
        data.setState(data.value)
        

      };
    

    const handleClick = async(ev) => {
        ev.preventDefault();
        document.getElementsByClassName('error-status')[0].style.display = "none" ;
        let status = checkCompletion();
        if(status){
            let uploadedFiles = await Upload();
            const ritData = {
                "info" : {
                    "name" : document.getElementById('name').value,
                    "distance" : document.getElementById('distance').value,
                    "region" : document.getElementById('region').value,
                    "firstedition" : document.getElementById('firstedition').value,
                    "type" : rideType,
                    "description" : document.getElementById('description').value,
                },
                "media" : {
                    "bannerPicture" : uploadedFiles[0],
                    "firstPicture" : uploadedFiles[1],
                    "secondPicture" : uploadedFiles[2],
                    "thirdPicture" : uploadedFiles[3],
                },
                "victories" : {
                    "one" : {
                        "rider" : document.getElementById('victoryOneRider').value,
                        "amount" : victoryFirst,
                        "team" : document.getElementById('victoryOneTeam').value
                    },
                    "two" : {
                        "rider" : document.getElementById('victoryTwoRider').value,
                        "amount" : victorySecond,
                        "team" : document.getElementById('victoryTwoTeam').value
                    },
                    "three" : {
                        "rider" : document.getElementById('victoryThreeRider').value,
                        "amount" : victoryThird,
                        "team" : document.getElementById('victoryThreeTeam').value
                    },
                    "four" : {
                        "rider" : document.getElementById('victoryFourRider').value,
                        "amount" : victoryFourth,
                        "team" : document.getElementById('victoryFourTeam').value
                    },
                    "five" : {
                        "rider" : document.getElementById('victoryFiveRider').value,
                        "amount" : victoryFifth,
                        "team" : document.getElementById('victoryFiveTeam').value
                    }

                }
            }
            const request = await createRit(ritData,JSON.parse(getCookie('user')),JSON.parse(getCookie('userEmail')))
            if(request.status === 201 ){
                history.push(Routes.DASHBOARD_RENNERS)
            } else {
                document.getElementsByClassName('error-status')[0].style.display = "block" ;
            }
        }else{
            document.getElementsByClassName('error-status')[0].style.display = "block" ;
        }
        
    }


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
                    <input id="name" class="addrenner-input" type="text" placeholder="vb. Gent/Wevelgem"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Type</p>
                    <DropdownLarge setState={setRideType} onChange={handleDropdown} options={types}/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Regio</p>
                    <input id="region" class="addrenner-input" type="text" placeholder="vb. Vlaanderen"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Afstand</p>
                    <input id="distance" class="addrenner-input" type="text" placeholder="vb. 150km"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Eerste editie</p>
                    <input id="firstedition" class="addrenner-input" type="text" placeholder="vb. 1990"/>
                </div>

               
            </div>

            <div class="addrenner-formextra">
                <div class="ui form textarea addrenner-field">
                    <p class="addrenner-label">Beschrijving koers</p>
                    <textarea id="description" rows="15" cols="140" class="addrenner-input" type="text"/>
                </div>
            </div>
            
            <div class="addrenner-formextra mt-2">


                <div class="ui input addrenner-field">
                    <p class="addrenner-label">BANNER FOTO</p>
                    <input class="addrenner-input" ref={bannerPicture} accept="image/png, image/jpeg, image/jpg" type="file"/>
                </div>



                <div class="ui input addrenner-field">
                    <p class="addrenner-label">FOTO 1</p>
                    <input class="addrenner-input" ref={firstPicture} accept="image/png, image/jpeg, image/jpg" type="file"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">FOTO 2</p>
                    <input class="addrenner-input" ref={secondPicture} accept="image/png, image/jpeg, image/jpg" type="file"/>
                </div>



                <div class="ui input addrenner-field">
                    <p class="addrenner-label">FOTO 3</p>
                    <input class="addrenner-input" ref={thirdPicture} accept="image/png, image/jpeg, image/jpg" type="file"/>
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
                                    <input class="addrenner-input" id="victoryOneRider" type="text" placeholder="vb. Tom Boonen"/>
                                </div>
                            </td>
                            <td>
                                <DropdownMedium setState={setVictoryFirst} onChange={handleDropdown} options={jaren}/>
                            </td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-ploeg" id="victoryOneTeam" type="text" placeholder="Quick Step Cycling Team"/>
                                </div>
                            </td>
                        </tr>

                        <tr class="renner-tablecontent">
                            <td class="mt-2">2</td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-input" id="victoryTwoRider" type="text" placeholder="vb. Tom Boonen"/>
                                </div>
                            </td>
                            <td>
                                <DropdownMedium setState={setVictorySecond} onChange={handleDropdown} options={jaren}/>
                            </td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-ploeg" id="victoryTwoTeam" type="text" placeholder="Quick Step Cycling Team"/>
                                </div>
                            </td>
                        </tr>

                        <tr class="renner-tablecontent">
                            <td class="mt-2">3</td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-input" id="victoryThreeRider" type="text" placeholder="vb. Tom Boonen"/>
                                </div>
                            </td>
                            <td>
                                <DropdownMedium setState={setVictoryThird} onChange={handleDropdown} options={jaren}/>
                            </td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-ploeg" id="victoryThreeTeam" type="text" placeholder="Quick Step Cycling Team"/>
                                </div>
                            </td>
                        </tr>

                        <tr class="renner-tablecontent">
                            <td class="mt-2">4</td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-input" id="victoryFourRider" type="text" placeholder="vb. Tom Boonen"/>
                                </div>
                            </td>
                            <td>
                                <DropdownMedium setState={setVictoryFourth} onChange={handleDropdown} options={jaren}/>
                            </td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-ploeg" id="victoryFourTeam" type="text" placeholder="Quick Step Cycling Team"/>
                                </div>
                            </td>
                        </tr>

                        <tr class="renner-tablecontent">
                            <td class="mt-2">5</td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-input" id="victoryFiveRider" type="text" placeholder="vb. Tom Boonen"/>
                                </div>
                            </td>
                            <td>
                                <DropdownMedium setState={setVictoryFifth} onChange={handleDropdown} options={jaren}/>
                            </td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-ploeg" id="victoryFiveTeam" type="text" placeholder="Quick Step Cycling Team"/>
                                </div>
                            </td>
                        </tr>
                    </div>

                </div>
               
            </div>
            
            <div class="pb-5">
                <Button onClick={ (ev) => handleClick(ev)} href="/dashboard/overview" className="addrenner-btn" color="yellow">RIT TOEVOEGEN</Button>
                <div style={{ display : "none" }} class="error-status">Gelieve alle verplichte velden in te vullen</div>
            </div>
        </form>

        </div>

        
      </div>
    </Fragment>
  );
};

export default DashboardRittenAddPage;