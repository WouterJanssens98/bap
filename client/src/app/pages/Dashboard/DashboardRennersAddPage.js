import { default as React, Fragment } from 'react';
import {useRef} from 'react'
import { useAuth, useApi } from '../../services';
import { DropdownLarge,DropdownMedium } from '../../components';
import { Button } from 'semantic-ui-react';
import S3 from "react-aws-s3";



const DashboardRennersAddPage = () => {


    const Upload = async () => {
        const profilePicture = useRef();
        const bannerPicture = useRef()
        const pictures = [profilePicture, bannerPicture]

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
            ReactS3Client.uploadFile(file,newfilename).then(data => {
                console.log(data);
                if(data.status === 204) {
                    console.log("Success")
                } else {
                    console.log("Failed")
                }
            })
        }
    }

    const handleClick = async(ev) => {
        ev.preventDefault();
        const uploadFiles = await Upload();
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
                    <input class="addrenner-input" type="text" placeholder="vb. Eddy Merkcx"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Bijnaam</p>
                    <input class="addrenner-input" type="text" placeholder="vb. De Kannibaal"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Plaats van geboorte</p>
                    <input class="addrenner-input" type="text" placeholder="vb. Gent"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Geboortedatum</p>
                    <input class="addrenner-input"  min="1920-01-01" max="2000-12-31" type="date"/>
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
                    <p class="addrenner-label">Tekstje over jeugd (optioneel)</p>
                    <textarea rows="15" cols="140" class="addrenner-input" type="text" placeholder="vb. Gent"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Jeugdfoto (optioneel)</p>
                    <input class="addrenner-input" accept="image/png, image/jpeg, image/jpg" type="file" placeholder="vb. Gent"/>
                </div>

                <div class="ui form textarea addrenner-field">
                    <p class="addrenner-label">Verloop na carrière (optioneel)</p>
                    <textarea rows="15" cols="140" class="addrenner-input" type="text" placeholder="vb. Gent"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Na carrière foto (optioneel)</p>
                    <input class="addrenner-input" accept="image/png, image/jpeg, image/jpg" type="file" placeholder="vb. Gent"/>
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
                                <DropdownMedium options={jaren}/>
                            </td>
                            <td>
                                <DropdownLarge options={ritten}/>
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
                                <DropdownMedium options={jaren}/>
                            </td>
                            <td>
                                <DropdownLarge options={ritten}/>
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
                                <DropdownMedium options={jaren}/>
                            </td>
                            <td>
                                <DropdownLarge options={ritten}/>
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
                                <DropdownMedium options={jaren}/>
                            </td>
                            <td>
                                <DropdownLarge options={ritten}/>
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
                                <DropdownMedium options={jaren}/>
                            </td>
                            <td>
                                <DropdownLarge options={ritten}/>
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
            </div>
        </form>

        </div>

        
      </div>
    </Fragment>
  );
};

export default DashboardRennersAddPage;