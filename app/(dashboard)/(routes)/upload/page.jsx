"use client";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import UploadForm from "./_comp/UploadForm";
import { app } from "./firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { generateRandomString } from "../../../../random";
import Link from "next/link";

export default function Upload() {
  const { user } = useUser();
  const storage = getStorage(app);
  const db = getFirestore(app);
  const router = useRouter();
  const [docId, setDocId] = useState('');
  const [progress, setProgress] = useState(0);

  function handlerFunction(file) {
    const storageRef = ref(storage, 'file-upload/' + file?.name);
    const metadata = {
      contentType: file.type,
    };
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log('Upload is ' + progress + '% done');
        if (progress === 100) {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            SaveInfo(file, downloadURL);
          });
        }
      }
    );
  }

  async function SaveInfo(file, fileUrl) {
    const docId = generateRandomString(); // Call the function to get the string
    const resp = await setDoc(doc(db, "uploadedId", docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userEmail: user?.primaryEmailAddress.emailAddress,
      userName: user?.fullName,
      password: '',
      id: docId,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docId,
    });
    setDocId(docId);
    console.log(resp);
  }

  return (
    <div className="p-5 px-8 md:px-28">
      <h2 className="text-[20px] text-center m-5">
        Start <strong className="text-secondary">Uploading</strong> Files and <strong>Share It</strong>
      </h2>
      <UploadForm func={(file) => handlerFunction(file)} progress={progress}></UploadForm>
      {progress === 100 && (
        <div className="flex justify-center items-center mt-4">
          <button className="p-2 bg-gray-50 text-black w-[30%] rounded-full mt-5 disabled:bg-gray-400">
            <Link href={`http://localhost:3000/files-preview/${docId}`}>
              Go To file Preview
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}
