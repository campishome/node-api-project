import express from "express";

import multer from "multer";
import path from "path";

//create router of this api
export const router = express.Router();//libraly สำหรับทำ api , object app => web api

  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAkbEK5_BnedDgbaaE3CIj6fpWhEtSZ_JU",
    authDomain: "project-upload-image-41825.firebaseapp.com",
    projectId: "project-upload-image-41825",
    storageBucket: "project-upload-image-41825.appspot.com",
    messagingSenderId: "461983508516",
    appId: "1:461983508516:web:6edf86580aca37a0cf50b1"
  };
  
  //import librays
    import { getStorage, ref ,getDownloadURL ,uploadBytesResumable} from "firebase/storage";//libraly ในการ upload

  // Initialize Firebase
  
  initializeApp(firebaseConfig);

  
//create obj from firebase storage
const storage = getStorage();

class FileMiddleware { 
    filename = "";
    //สร้าง object multer to save file in disk
    public readonly diskLoader = multer({
      //diskStorage = save to memory
      storage: multer.memoryStorage(),
      //limit file size to be uploaded
      limits: {
        fileSize: 67108864, // 64 MByte
      },
    });
  }

  const fileupload = new FileMiddleware();
  //use fileupload object to handle uploading file
  router.post("/",fileupload.diskLoader.single("file"),async (req,res)=>{
    //create filename
    const filename = Math.round(Math.random() * 10000)+ ".png";
    //set name to be saved on firebase storage
    const storageRef = ref(storage,"images/" + filename);
    //set detail of file to be uploaded
    const metadata = {
        contentType : req.file!.mimetype
    }

    //upload to storage
    const snapshot = await uploadBytesResumable(storageRef,req.file!.buffer,metadata)
    
    const dowloadUrl = await getDownloadURL(snapshot.ref);
    res.json(
                { 
                    filename: dowloadUrl 
                }
            );
  });

