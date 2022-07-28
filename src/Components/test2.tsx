import React, { useState } from 'react';
import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { DetectFacesResponse } from 'aws-sdk/clients/rekognition';
import { atob } from 'buffer';

export default function Test2(){

    let [ image , setImage ] = useState<String>("")
    let [ua , setUa ] = useState<any>()
      
      //Calls DetectFaces API and shows estimated ages of detected faces
      //Loads selected image and unencodes image bytes for Rekognition DetectFaces API
      
    return (
        <>
  <h1>Age Estimator</h1>
  <input type="file" name="fileToUpload" id="fileToUpload" accept="image/*" />
  <p id="opResult"></p>
       </>
    )
}