import React, { useState } from 'react';
import * as AWS from 'aws-sdk';
import atob from 'atob';
import { FaceDetailList } from 'aws-sdk/clients/rekognition';
export default function Test(){
    let [ res , setRes ] = useState<object>();

    function DetectFaces(imageData: any, setResult: (data: any) => void) {
      var rekognition = new AWS.Rekognition({region:"eu-west-2"});
      var params = {
        Image: {
          Bytes: imageData
        },
        Attributes: [
          'ALL',
        ]
      };
      rekognition.detectFaces(params, function (err, data : any) {
        if (err) console.log(err.stack); // an error occurred
        else {
          //let obj : object | undefined = data?.FaceDetails[0]
          const { FaceDetails } = data;
          const [result, ...rest] = FaceDetails;
          setResult(result);
        console.log(setRes);
        
          }
      });
    }
    //Loads selected image and unencodes image bytes for Rekognition DetectFaces API
    function ProcessImage(setRes: any) {
      AnonLog();
      var control = document.getElementById("fileToUpload") as HTMLInputElement;
      var file = control.files![0];
      //URL.createObjectURL(e.target.files[0]) mampiditra anle sary anaty page
    
   // Load base64 encoded image 
      var reader = new FileReader();
      reader.onload = (function (file) {
        return function (e: any) {
          let img = document.createElement('img');
          let image : string =""; 
          img.src = e.target.result
          var jpg: boolean = true;
          //const buf = Buffer.from(e.target.result.toString().split("data:image/jpeg;base64,")[1], "base64")
          try {
            //setImage(buf.toString("base64"));
           image = atob(e.target.result.split("data:image/jpeg;base64,")[1]);
          } catch (e) {
            jpg = false;
          }
          if (jpg == false) {
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
          DetectFaces(imageBytes, setRes);
        };
      })(file);
      reader.readAsDataURL(file);
    }

    function AnonLog() {
      // Configure the credentials provider to use your identity pool
      AWS.config.region = 'eu-west-2'; // Region
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-2:371cdf1c-657e-4e3f-a6a0-3cdcf905bfdc',
      });
      // Make the call to obtain credentials

      /*AWS.config.credentials.get(function () {
        // Credentials will be available when this function is called.
        var accessKeyId = AWS.config.credentials.accessKeyId;
        var secretAccessKey = AWS.config.credentials.secretAccessKey;
        var sessionToken = AWS.config.credentials.sessionToken;
      });*/
    }
return(
    <div>
        <h1>Estimator</h1>
        <input type="file" name="fileToUpload" id="fileToUpload" accept="image/*" onChange={() => ProcessImage(setRes)}/>
        <p id="opResult"></p>
    </div>
)
      //Provides anonymous log on to AWS services
      
}

