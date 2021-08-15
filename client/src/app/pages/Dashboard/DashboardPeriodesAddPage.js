import {useRef, Fragment} from 'react'
import { useAuth, useApi } from '../../services';
import { Button } from 'semantic-ui-react';
import * as Routes from '../../routes';
import { useHistory } from 'react-router-dom';
import S3 from "react-aws-s3";


const DashboardPeriodesAddPage = () => {
    let history = useHistory();
    const {getCookie} = useAuth();
    const {createPeriode} = useApi();
    const bannerPicture = useRef();
    const audioURL = useRef();

    const Upload1 = async () => {
      const pictures = [bannerPicture];
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

    const Upload2 = async () => {
      const audio = [audioURL];
      let result = [];

      for(let i=0;i<audio.length;i++){
          let fileInput = audio[i]
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
      const pictures = [bannerPicture];
      const start = document.getElementById('start').value;
      const end = document.getElementById('end').value;
      const description = document.getElementById('description').value;
      if(start !== "" && end !== "" && description !== ""){
          let counter = 0;
          for(let i=0;i<pictures.length;i++) {
              let fileInput = pictures[i]
              let file = fileInput.current.files[0]
              if(file === undefined){
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
    
    const handleOnclick = async (ev) => {
      ev.preventDefault();
        document.getElementsByClassName('error-status')[0].style.display = "none" ;
        let status = checkCompletion();
        if(status){
            let uploadedImages = await Upload1();
            let uploadedSounds = await Upload2();
            const start = document.getElementById('start').value;
            const end = document.getElementById('end').value;
            const description = document.getElementById('description').value;
            const periodeData = {
              "info" : {
                "start" : start,
                "end" : end,
                "bannerImage" : uploadedImages[0],
                "audioURL" : uploadedSounds[0],
                "description" : description
              }
            }
            const request = await createPeriode(periodeData,JSON.parse(getCookie('user')),JSON.parse(getCookie('userEmail')))
            if(request.status === 201 ){
                history.push(Routes.DASHBOARD_PERIODES)
            } else {
                document.getElementsByClassName('error-status')[0].style.display = "block" ;
            }
        }else{
            document.getElementsByClassName('error-status')[0].style.display = "block" ;
        }

        
    }
  return (
    <Fragment>
      <div>
      
        <p className="addrenner-title">PERIODE TOEVOEGEN</p>
      
        <div className="addrenner-overview">

        <form >
        
        <div class="addrenner-form">
                <div class="ui input addrenner-field">
                    <p class="addrenner-label">BEGINJAAR</p>
                    <input id="start" class="addrenner-input" type="text" placeholder="vb. 1960"/>
                </div>

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">EINDJAAR</p>
                    <input id="end" class="addrenner-input" type="text" placeholder="vb. 1970"/>
                </div>

                <div class="ui form textarea addrenner-field">
                    <p class="addrenner-label">Tekst over periode</p>
                    <textarea id="description" rows="15" cols="140" class="addrenner-input" type="text"/>
                </div>
          </div>

            <div class="addrenner-formextra">

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Omslagfoto (horizontaal)</p>
                    <input class="addrenner-input" ref={bannerPicture} accept="image/png, image/jpeg, image/jpg" type="file" placeholder="vb. Gent"/>
                </div>

                

            </div>

            <div class="addrenner-formextra">

                <div class="ui input addrenner-field">
                    <p class="addrenner-label">Audiofragment</p>
                    <input class="addrenner-input" ref={audioURL} accept="audio/*" type="file"/>
                </div>

                

            </div>
                       
            <div class="pt-5 pb-5">
                <Button  onClick={ (ev) => handleOnclick(ev)} type="submit"  className="addrenner-btn" color="yellow">PERIODE TOEVOEGEN</Button>
                <div style={{ display : "none" }} class="error-status">Vul alle velden correct in</div>
            </div>

        </form>

        </div>

        
      </div>
    </Fragment>
  );
};

export default DashboardPeriodesAddPage;