import { default as React, Fragment } from 'react';
import {useRef,useState, useEffect} from 'react'
import { useAuth, useApi } from '../../services';
import { DropdownLarge,DropdownMedium } from '../../components';
import { Button } from 'semantic-ui-react';
import * as Routes from '../../routes';
import { useHistory } from 'react-router-dom';
import S3 from "react-aws-s3";



const DashboardRennersAddPage = () => {

    let history = useHistory();
    const {currentUser, getCookie} = useAuth();
    const {createRenner} = useApi();


    const profilePicture = useRef();
    const bannerPicture = useRef();
    const youthPicture = useRef();
    const careerPicture = useRef();
    const afterCareerPicture = useRef();


    // states to keep track of selected year
    const [victoryOneYear,setvictoryOneYear] = useState();
    const [victorySecondYear,setvictorySecondYear] = useState();
    const [victoryThirdYear,setvictoryThirdYear] = useState();
    const [victoryFourthYear,setvictoryFourthYear] = useState();
    const [victoryFifthYear,setvictoryFifthYear] = useState();

    // states to keep track of selected ride

    const [victoryOneRide,setvictoryOneRide] = useState();
    const [victorySecondRide,setvictorySecondRide] = useState();
    const [victoryThirdRide,setvictoryThirdRide] = useState();
    const [victoryFourthRide,setvictoryFourthRide] = useState();
    const [victoryFifthRide,setvictoryFifthRide] = useState();


    const Upload = async () => {
        const pictures = [profilePicture, bannerPicture,youthPicture,careerPicture,afterCareerPicture];
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
        const pictures = [profilePicture, bannerPicture,youthPicture,careerPicture,afterCareerPicture];
        const name = document.getElementById('name').value;
        const nickname = document.getElementById('nickname').value;
        const placeofbirth = document.getElementById('placeofbirth').value;
        const dateofbirth = document.getElementById('dateofbirth').value;
        const youth = document.getElementById('youth').value;
        const career = document.getElementById('career').value;
        const aftercareer = document.getElementById('aftercareer').value;

        let counter = 0;
        for(let i=0;i<pictures.length;i++) {
            let fileInput = pictures[i]
            let file = fileInput.current.files[0]
            console.log(file)
            if(file == undefined){
                return false
            }else {
                counter +=1
                console.log(counter)
            }
        }
        if(counter == 5){
            return true // all required images were selected
        }
    }

    const handleDropdown = (event, data) => {
        data.setState(data.value)
        

      };



    const handleClick = async(ev) => {
        ev.preventDefault();
        document.getElementsByClassName('error-status')[0].style.display = "none" ;
        let status = checkCompletion();
        console.log(status);
        if(status){
            let uploadedFiles = await Upload();
            const rennerData = {
                "info" : {
                    "name" : "testname",
                    "nickname" : "testnickname",
                    "placeofbirth" : "testplace",
                    "dateofbirth" : "testdate",
                    "youth" : "testyouth",
                    "career" : "testcareer",
                    "aftercareer" : "testaftercareer"
                },
                "media" : {
                    "profilePicture" : uploadedFiles[0],
                    "bannerPicture" : uploadedFiles[1],
                    "youthPicture" : uploadedFiles[2],
                    "careerPicture" : uploadedFiles[3],
                    "afterCareerPicture" : uploadedFiles[4]
                },
                "victories" : {
                    "one" : {
                        "year" : victoryOneYear,
                        "ride" : victoryOneRide,
                        "team" : "quickstep"
                    },
                    "two" : {
                        "year" : victorySecondYear,
                        "ride" : victorySecondRide,
                        "team" : "quickstep"
                    },
                    "three" : {
                        "year" : victoryThirdYear,
                        "ride" : victoryThirdRide,
                        "team" : "quickstep"
                    },
                    "four" : {
                        "year" : victoryFourthYear,
                        "ride" : victoryFourthRide,
                        "team" : "quickstep"
                    },
                    "five" : {
                        "year" : victoryFifthYear,
                        "ride" : victoryFifthRide,
                        "team" : "quickstep"
                    }

                }
            }
            const request = await createRenner(rennerData,JSON.parse(getCookie('user')),JSON.parse(getCookie('userEmail')))
            if(request.status == 201 ){
            //   history.push(Routes.DASHBOARD_RENNERS)
            } else {
                document.getElementsByClassName('error-status')[0].style.display = "block" ;
            }
        }else{
            document.getElementsByClassName('error-status')[0].style.display = "block" ;
        }
        
    }


    const ritten = [
    { key: 1, text: 'De Ronde Van Vlaanderen', value: 1 },
    { key: 2, text: 'Omloop het Nieuwsblad', value: 2 },
    { key: 3, text: 'Kuurne Brussel Kuurne', value: 3 },
    ]

    const jaren = [];
    let counter = 1;
    for(let i=1950;i<=2010;i++){
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
      
        <p class="addrenner-title">RENNER TOEVOEGEN</p>
      
        <div class="addrenner-overview">

        <form>
        
            <div class="addrenner-form">
                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Naam</p>
                    <input id="name" class="addrenner-input" type="text" placeholder="vb. Eddy Merkcx"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Bijnaam</p>
                    <input id="nickname" class="addrenner-input" type="text" placeholder="vb. De Kannibaal"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Plaats van geboorte</p>
                    <input id="placeofbirth" class="addrenner-input" type="text" placeholder="vb. Gent"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Geboortedatum</p>
                    <input id="dateofbirth" class="addrenner-input"  min="1920-01-01" max="2000-12-31" type="date"/>
                </div>

                

               
            </div>
            
            <div class="addrenner-formextra">

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Profielfoto (vierkant)</p>
                    <input class="addrenner-input" ref={profilePicture} accept="image/png, image/jpeg, image/jpg" type="file" placeholder="vb. Gent"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Banner foto (horizontaal)</p>
                    <input class="addrenner-input" ref={bannerPicture} accept="image/png, image/jpeg, image/jpg" type="file" placeholder="vb. Gent"/>
                </div>


                <div class="ui form textarea addrenner-field">
                    <p class="addrenner-label">Tekstje over jeugd</p>
                    <textarea id="youth" rows="15" cols="140" class="addrenner-input" type="text" placeholder="vb. Gent"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Jeugdfoto</p>
                    <input class="addrenner-input" ref={youthPicture} accept="image/png, image/jpeg, image/jpg" type="file" placeholder="vb. Gent"/>
                </div>

                <div class="ui form textarea addrenner-field">
                    <p class="addrenner-label">Samenvatting carrière</p>
                    <textarea id="career" rows="15" cols="140" class="addrenner-input" type="text" placeholder="vb. Gent"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Foto in gloriedagen</p>
                    <input class="addrenner-input" ref={careerPicture} accept="image/png, image/jpeg, image/jpg" type="file" placeholder="vb. Gent"/>
                </div>



                <div class="ui form textarea addrenner-field">
                    <p class="addrenner-label">Verloop na carrière</p>
                    <textarea id="aftercareer" rows="15" cols="140" class="addrenner-input" type="text" placeholder="vb. Gent"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Na carrière foto</p>
                    <input class="addrenner-input" ref={afterCareerPicture} accept="image/png, image/jpeg, image/jpg" type="file" placeholder="vb. Gent"/>
                </div>


            </div>
            
            <div class="addrenner-formextra pb-5 pt-3">
                <p class="addrenner-victorylabel">MEESTE MEMORABLE OVERWINNINGEN</p>
                <div class="addrenner-victorytable">
                    
                    <div class="renner-table">
                        <th class="addrenner-tablehead">
                            <td>NR.</td>
                            <td>JAAR</td>
                            <td>RIT</td>
                            <td>PLOEG</td>
                        </th>
                    </div>

                    <div>
                        <tr class="renner-tablecontent">
                            <td class="mt-2">1</td>
                            <td>
                                <DropdownMedium setState={setvictoryOneYear} onChange={handleDropdown} options={jaren}/>
                            </td>
                            <td>
                                <DropdownLarge setState={setvictoryOneRide} onChange={handleDropdown} options={ritten}/>
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
                                <DropdownMedium setState={setvictorySecondYear} onChange={handleDropdown} options={jaren}/>
                            </td>
                            <td>
                                <DropdownLarge setState={setvictorySecondRide} onChange={handleDropdown} options={ritten}/>
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
                                <DropdownMedium setState={setvictoryThirdYear} onChange={handleDropdown} options={jaren}/>
                            </td>
                            <td>
                                <DropdownLarge setState={setvictoryThirdRide} onChange={handleDropdown} options={ritten}/>
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
                                <DropdownMedium setState={setvictoryFourthYear} onChange={handleDropdown} options={jaren}/>
                            </td>
                            <td>
                                <DropdownLarge setState={setvictoryFourthRide} onChange={handleDropdown} options={ritten}/>
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
                                <DropdownMedium setState={setvictoryFifthYear} onChange={handleDropdown} options={jaren}/>
                            </td>
                            <td>
                                <DropdownLarge setState={setvictoryFifthRide} onChange={handleDropdown} options={ritten}/>
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
                <Button onClick={ (ev) => handleClick(ev)} className="addrenner-btn" color="yellow">RENNER TOEVOEGEN</Button>
                <div style={{ display : "none" }} class="error-status">Gelieve alle verplichte velden in te vullen</div>
            </div>
        </form>

        </div>

        
      </div>
    </Fragment>
  );
};

export default DashboardRennersAddPage;