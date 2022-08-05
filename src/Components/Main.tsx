import React, {  useState } from 'react';
import * as AWS from 'aws-sdk';
import atob from 'atob';
import Card from './Card'
import LoadingSpinner from "./spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSmile } from '@fortawesome/free-regular-svg-icons'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { AWSError } from 'aws-sdk';
import getPosition from './GetPosition';

export default function Main(): JSX.Element{
    const [ errorMessage, setErrorMessage ] = useState<Error>();
    const [ res , setRes ] = useState<any>();
    const [ imgSrc , setImgSrc ] = useState<string>("")
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    
    function DetectFaces(imageData: any, ) {
      var rekognition = new AWS.Rekognition({ region: `eu-west-2` });
      var params = { 
         
          Image: {
            Bytes: imageData
          },
          Attributes: 
            [
              'ALL',
            ],
        } 
        rekognition.detectFaces(params, function (err: AWSError, data : any) {
          if (err) {
            setErrorMessage(err)
            console.log(err.stack);
          }
          else {
            setRes(data.FaceDetails);
             console.log(data.FaceDetails);
          }
          setIsLoading(false)
          
        });
      
      };

     

    //Loads selected image and unencodes image bytes for Rekognition DetectFaces API
    function ProcessImage() {
      Log();
      var control = document.getElementById("fileToUpload") as HTMLInputElement;
      var file = control.files![0]; 
      setIsLoading(true)
    
   // Load base64 encoded image 
      var reader = new FileReader();
      reader.onload = (function (file) {
        return function (e: any) {
            setImgSrc(URL.createObjectURL(file))
          let img = document.createElement('img');
          let image : string =""; 
          img.src = e.target.result
          var jpg: boolean = true;
          try {
              image = atob(e.target.result.split("data:image/jpeg;base64,")[1]);
          } catch (e) {
            jpg = false;
          }
          if (!jpg) {
            try {
              image = atob(e.target.result.split("data:image/jpeg;base64,")[1]);  
            } catch (e) {
              alert("Not an image file Rekognition can process");
              return;
            }
          } 
          //unencode image bytes for Rekognition DetectFaces API 
          var length = image.length;
          let imageBytes = new ArrayBuffer(length);
          var ua = new Uint8Array(imageBytes);
          for (var i = 0; i < length; i++) {
            ua[i] = image.charCodeAt(i);
          }
          //Call Rekognition  
          DetectFaces(imageBytes);
          
        };
      })(file);
      reader.readAsDataURL(file);
    }

   function Log() {
      AWS.config.region = `${process.env.REACT_APP_REGION}`; // Region
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: `${process.env.REACT_APP_CREDENTIALS}`,
    });
    }

     function getBoundingBox(e: any, data: object){
       const bord = document.getElementById('border');
         bord!.style.height = Object.values(data)[0]; 
         bord!.style.left = Object.values(data)[1]; 
         bord!.style.top = Object.values(data)[2];
         bord!.style.width = Object.values(data)[3]; 
     }
     
     function getNumber(doc : string){
      const value = doc.substring(0, doc.length-2)
      console.log(value);
      return parseInt(doc)
  } 
      
  
     
  return(
        <div className='body'>
            <div className='nav'>
              <div className='h2'>
              <FontAwesomeIcon icon={faSmile} style={{margin: '0.5vh 1vw' , fontSize: '95%' , fontWeight: 'bold'}}/>
              <h2>FaceDetector</h2>
              </div>
            
            </div>
              <label htmlFor="fileToUpload">
                Select image 
                <input disabled={isLoading} type="file" id="fileToUpload" name="fileToUpload" placeholder="Ohatra" accept="image/*" onChange={ProcessImage} />
              </label>
              {isLoading ? <LoadingSpinner/> : 
                 res ? <> 
                 <div className='contain'>
                <div className='inputt' style={{position: 'relative'}}>
                <div className='border' style={{ border :'2px solid red'}} id='border'></div>
                        <img src={imgSrc} id='img' onLoad={ (e: any)=>{getPosition(e, res)}} />
                </div>                 
                <div className='output'>
                <Card datas={res}></Card> 
                    </div>
                    </div>
                    </> : ""
                    }
                    {errorMessage && <div className="error">
                     <div style={{
                         color: 'red'
                     }}>
                       <FontAwesomeIcon icon={faTriangleExclamation} style={{marginTop: '3%' , fontSize: '150%' }}/>
                      <p>ERROR</p>  
                      <p style={{marginTop: '-3vh'}}>Missing Credentials or network issues</p></div>
                 </div>
                   }
                   
                  
              
            
        </div>

)
      //Provides anonymous log on to AWS services
      
}

