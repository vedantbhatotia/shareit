"use client";
import { useEffect, useState } from "react";
import { app } from "../firebaseConfig";
import Link from "next/link";
import { getFirestore, doc, getDoc,updateDoc} from "firebase/firestore";
import { ArrowLeftSquare } from "lucide-react";
import FileInfo from "./_components/FileInfo";
import FileShareForm from "./_components/FileShareForm";
// import { doc, getDoc } from "firebase/firestore";
export default function FilePreview({ params }) {
  const db = getFirestore(app);
  const [fileInfo, setFileInfo] = useState();

  useEffect(() => {
    console.log(params?.fileId);
    if (params?.fileId) {
      getFileInfo();
    }
  }, [params]);

  const getFileInfo = async () => {
    const docRef = doc(db, "uploadedId", params?.fileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setFileInfo(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const onPasswordSave = async (password) => {
    const docRef = doc(db,"uploadedId",params?.fileId)
    await updateDoc(docRef,{
        password:password
    })
    // Add password save logic here
    console.log("Password saved:", password);
  };

  return (
    <div className="py-10 px-20 bg-gray-900 text-white min-h-screen">
      <Link href="/upload" className="flex gap-3 text-white items-center">
        <ArrowLeftSquare className="w-6 h-6" />
        <span>Go To Upload</span>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-4">
        <FileInfo file={fileInfo} />
        <FileShareForm file={fileInfo} onPasswordSave={onPasswordSave} />
      </div>
    </div>
  );
}
