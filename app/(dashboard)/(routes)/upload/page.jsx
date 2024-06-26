"use client"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import UploadForm from "./_comp/UploadForm"
import {app} from "./firebaseConfig"
// import {ProgressBar} from "."
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
export default function Upload() {
  const storage = getStorage(app);
  const [progress,setProgress] = useState(0);
  function handlerFunction(file){
      const storageRef = ref(storage, 'file-upload/'+file?.name)
      const metadata={
        contentType:file.type
      }
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log('Upload is ' + progress + '% done');
          progress === 100 && getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
      },)
  }
  return (
    <div className="p-5 px-8 md:px-28">
        <h2 className="text-[20px] text-center m-5 ">Start <strong className="text-secondary">Uploading</strong> Files and <strong>Share It</strong> </h2>
        <UploadForm func={(file)=>handlerFunction(file)} progress={progress}></UploadForm>
        
    </div>
  );
}

