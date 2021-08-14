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
    const {getCookie} = useAuth();
    const {createRenner} = useApi();


    const profilePicture = useRef();
    const bannerPicture = useRef();
    const youthPicture = useRef();
    const careerPicture = useRef();
    const afterCareerPicture = useRef();
    const audioURLYouth = useRef();
    const audioURLCareer = useRef();
    const audioURLAfterCareer = useRef();


    // states to keep track of selected year
    const [victoryOneYear,setvictoryOneYear] = useState();
    const [victorySecondYear,setvictorySecondYear] = useState();
    const [victoryThirdYear,setvictoryThirdYear] = useState();
    const [victoryFourthYear,setvictoryFourthYear] = useState();
    const [victoryFifthYear,setvictoryFifthYear] = useState();


    // state to keep track of the selected period

    const [riderPeriod,setRiderPeriod] = useState();


    const Upload = async () => {
        const pictures = [profilePicture, bannerPicture];
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

   
    const Upload2 = async() => {
        const pictures = [youthPicture,careerPicture,afterCareerPicture];
        let result = [];
        for(let i=0;i<pictures.length;i++){
            let pictureArray = [];
            let fileInput = pictures[i]
            let files = fileInput.current.files;
            console.log(files);
            for(let i=0;i<files.length;i++){
                let file = fileInput.current.files[i];
                let newfilename = fileInput.current.files[i].name;
                const config = {
                    bucketName: process.env.REACT_APP_BUCKET_NAME,
                    dirName: process.env.REACT_APP_DIR_NAME /* optional */,
                    region: process.env.REACT_APP_REGION,
                    accessKeyId: process.env.REACT_APP_ACCESS_ID,
                    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
                };
                const ReactS3Client = new S3(config);
                let response = await ReactS3Client.uploadFile(file,newfilename);
                pictureArray[i] = response.location;
            }
            result[i] = pictureArray;          
        }
        return result;
    }

     
    const Upload3 = async () => {
        const sounds = [audioURLYouth, audioURLCareer,audioURLAfterCareer];
        let result = [];

        for(let i=0;i<sounds.length;i++){
            let fileInput = sounds[i]
            let file = fileInput.current.files[0];
            let newfilename = fileInput.current.files[0].name;
            const config = {
                bucketName: process.env.REACT_APP_BUCKET_NAME,
                dirName: process.env.REACT_APP_DIR_NAME2 /* optional */,
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
        const pictures = [profilePicture, bannerPicture,youthPicture,careerPicture,afterCareerPicture,audioURLYouth,audioURLCareer,audioURLAfterCareer];
        const name = document.getElementById('name').value;
        const nickname = document.getElementById('nickname').value;
        const placeofbirth = document.getElementById('placeofbirth').value;
        const dateofbirth = document.getElementById('dateofbirth').value;
        const periode = riderPeriod;
        const youth = document.getElementById('youth').value;
        const career = document.getElementById('career').value;
        const aftercareer = document.getElementById('aftercareer').value;
        const startCareer = document.getElementById('startCareer').value;
        const endCareer = document.getElementById('endCareer').value;
        if(name !== "" && nickname !== "" && placeofbirth !== "" && dateofbirth !== "" && periode !== "" && youth !== "" && career !== "" && aftercareer !== "" && startCareer !== "" && endCareer !== ""){
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
            let uploadedFiles1 = await Upload();
            let uploadedFiles2 = await Upload2();
            let uploadedFiles3 = await Upload3();
            const rennerData = {
                "info" : {
                    "name" : document.getElementById('name').value,
                    "nickname" : document.getElementById('nickname').value,
                    "placeofbirth" : document.getElementById('placeofbirth').value,
                    "dateofbirth" : document.getElementById('dateofbirth').value,
                    "startCareer" : document.getElementById('startCareer').value,
                    "endCareer" : document.getElementById('endCareer').value,
                    "youth" : document.getElementById('youth').value,
                    "career" : document.getElementById('career').value,
                    "aftercareer" : document.getElementById('aftercareer').value,
                    "periode" : riderPeriod
                },
                "media" : {
                    "profilePicture" : uploadedFiles1[0],
                    "bannerPicture" : uploadedFiles1[1],
                    "youthPicture" : uploadedFiles2[0],
                    "careerPicture" : uploadedFiles2[1],
                    "afterCareerPicture" : uploadedFiles2[2],
                    "audioURLYouth" : uploadedFiles3[0],
                    "audioURLCareer" : uploadedFiles3[1],
                    "audioURLAfterCareer" : uploadedFiles3[2],
                },
                "victories" : {
                    "one" : {
                        "year" : victoryOneYear,
                        "ride" : document.getElementById('victoryOneRide').value,
                        "team" : document.getElementById('victoryOneTeam').value
                    },
                    "two" : {
                        "year" : victorySecondYear,
                        "ride" : document.getElementById('victoryTwoRide').value,
                        "team" : document.getElementById('victoryTwoTeam').value
                    },
                    "three" : {
                        "year" : victoryThirdYear,
                        "ride" : document.getElementById('victoryThreeRide').value,
                        "team" : document.getElementById('victoryThreeTeam').value
                    },
                    "four" : {
                        "year" : victoryFourthYear,
                        "ride" : document.getElementById('victoryFourRide').value,
                        "team" : document.getElementById('victoryFourTeam').value
                    },
                    "five" : {
                        "year" : victoryFifthYear,
                        "ride" : document.getElementById('victoryFiveRide').value,
                        "team" : document.getElementById('victoryFiveTeam').value
                    }

                }
            }
            const request = await createRenner(rennerData,JSON.parse(getCookie('user')),JSON.parse(getCookie('userEmail')))
            if(request.status === 201 ){
                history.push(Routes.DASHBOARD_RENNERS)
            } else {
                document.getElementsByClassName('error-status')[0].style.display = "block" ;
            }
        }else{
            document.getElementsByClassName('error-status')[0].style.display = "block" ;
        }
        
    }
    const periods = [
        { key: 2, text: '1960-1970', value: "1960-1970" },
        { key: 3, text: '1970-1980', value: "1970-1980" },
        { key: 4, text: '1980-1990', value: "1980-1990" },
        { key: 5, text: '1990-2000', value: "1990-2000" },
        { key: 6, text: '2000-2010', value: "2000-2010" },
    ]

    const ritten = [
    { key: 1, text: 'De Ronde Van Vlaanderen', value: "De Ronde Van Vlaanderen" },
    { key: 2, text: 'Omloop het Nieuwsblad', value: "Omloop het Nieuwsblad" },
    { key: 3, text: 'Kuurne Brussel Kuurne', value: "Kuurne Brussel Kuurne" },
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
                    <p class="addrenner-label">Periode</p>
                    <DropdownLarge setState={setRiderPeriod} onChange={handleDropdown} options={periods}/>
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

               
            <div class="addrenner-form">

            <div class="ui input addrenner-field">
                    <p class="addrenner-label">Start carrière</p>
                    <input id="startCareer" class="addrenner-input" type="text" placeholder="vb. 1950"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Einde carrière</p>
                    <input id="endCareer" class="addrenner-input" type="text" placeholder="vb. 1960"/>
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
                    <textarea id="youth" rows="15" cols="140" class="addrenner-input" type="text"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Audiofragment jeugd</p>
                    <input class="addrenner-input" ref={audioURLYouth} accept="audio/*" type="file"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Jeugdfoto's</p>
                    <input class="addrenner-input" multiple ref={youthPicture} accept="image/png, image/jpeg, image/jpg" type="file" placeholder="vb. Gent"/>
                </div>

                <div class="ui form textarea addrenner-field">
                    <p class="addrenner-label">Samenvatting carrière</p>
                    <textarea id="career" rows="15" cols="140" class="addrenner-input" type="text" placeholder="vb. Gent"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Audiofragment carrière</p>
                    <input class="addrenner-input" ref={audioURLCareer} accept="audio/*" type="file"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Foto's in gloriedagen</p>
                    <input class="addrenner-input" multiple ref={careerPicture} accept="image/png, image/jpeg, image/jpg" type="file" placeholder="vb. Gent"/>
                </div>



                <div class="ui form textarea addrenner-field">
                    <p class="addrenner-label">Verloop na carrière</p>
                    <textarea id="aftercareer" rows="15" cols="140" class="addrenner-input" type="text" placeholder="vb. Gent"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Audiofragment na carrière</p>
                    <input class="addrenner-input" ref={audioURLAfterCareer} accept="audio/*" type="file"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Na carrière foto's</p>
                    <input class="addrenner-input" multiple ref={afterCareerPicture} accept="image/png, image/jpeg, image/jpg" type="file" placeholder="vb. Gent"/>
                </div>


            </div>
            
            <div class="addrenner-formextra pb-5 pt-3">
                <p class="addrenner-victorylabel">MEESTE MEMORABLE OVERWINNINGEN</p>
                <div class="addrenner-victorytable">
                    
                    <div class="renner-table">
                        <th class="addrenner-tablehead">
                            <td>NR.</td>
                            <td class="pr-5">JAAR</td>
                            <td class="pl-5">RIT</td>
                            <td>PLOEG</td>
                        </th>
                    

                   
                        <tr class="renner-tablecontent">
                            <td class="mt-2">1</td>
                            <td>
                                <DropdownMedium setState={setvictoryOneYear} onChange={handleDropdown} options={jaren}/>
                            </td>
                            <td>
                            <div class="ui input">
                                    <input class="addrenner-ploeg" id="victoryOneRide" type="text" placeholder="Ronde Van Vlaanderen"/>
                                </div>
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
                                <DropdownMedium setState={setvictorySecondYear} onChange={handleDropdown} options={jaren}/>
                            </td>
                            <td>
                            <div class="ui input">
                                    <input class="addrenner-ploeg" id="victoryTwoRide" type="text" placeholder="Ronde Van Vlaanderen"/>
                                </div>
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
                                <DropdownMedium setState={setvictoryThirdYear} onChange={handleDropdown} options={jaren}/>
                            </td>
                            <td>
                            <div class="ui input">
                                    <input class="addrenner-ploeg" id="victoryThreeRide" type="text" placeholder="Ronde Van Vlaanderen"/>
                                </div>
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
                                <DropdownMedium setState={setvictoryFourthYear} onChange={handleDropdown} options={jaren}/>
                            </td>
                            <td>
                            <div class="ui input">
                                    <input class="addrenner-ploeg" id="victoryFourRide" type="text" placeholder="Ronde Van Vlaanderen"/>
                                </div>
                            </td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-ploeg" id="victoryFourTeam" type="text" placeholder="Quick Step Cycling Team"/>
                                </div>
                            </td>
                        </tr>

                        <tr class="renner-tablecontent">
                            <td class="">5</td>
                            <td>
                                <DropdownMedium setState={setvictoryFifthYear} onChange={handleDropdown} options={jaren}/>
                            </td>
                            <td>
                                <div class="ui input">
                                    <input class="addrenner-ploeg" id="victoryFiveRide" type="text" placeholder="Ronde Van Vlaanderen"/>
                                </div>
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