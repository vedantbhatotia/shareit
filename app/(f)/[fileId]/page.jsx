"use client"
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from ".././../(dashboard)/(routes)/files-preview/firebaseConfig";
import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import Image from "next/image";
import { saveAs } from "file-saver";

export default function FileView({ params }) {
    const db = getFirestore(app);
    const [fileInfo, setFileInfo] = useState(null);
    const [password, setPassword] = useState('');
    useEffect(() => {
        if (params.fileId) {
            getFileInfo();
        }
    }, [params.fileId]);

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

    return (
        <div className="bg-black h-screen w-full flex justify-center items-center flex-col gap-6 p-4">
            <FileItem fileInfo={fileInfo} password={password} setPassword={setPassword} />
        </div>
    )
}

function FileItem({ fileInfo, password, setPassword }) {
    const isPasswordProtected = fileInfo?.password;

    const handleDownload = async () => {
        if (fileInfo?.fileUrl) {
            try {
                window.open(fileInfo?.fileUrl);
            } catch (error) {
                console.error('Error downloading the file:', error);
            }
        }
    };

    return (
        <div className="p-6 rounded-md bg-gray-800 text-white shadow-lg flex flex-col items-center">
            <div className="text-center flex flex-col gap-3 items-center">
                <h2 className="text-[20px]">
                    <strong className="text-blue-400">{fileInfo?.userName}</strong> Shared File With You
                </h2>
                <h2 className="text-[12px] text-gray-400">Find File Details Below</h2>
                <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUKajWR4QvFYjH-3Te2gut72BdDa_zjHxwsQ&s' alt="image" width={150} height={150} className="rounded-md shadow-md" />
                <h2 className="text-gray-300 text-[15px] mt-3">
                    File Name: {fileInfo?.fileName || 'Unknown'} | Type: {fileInfo?.fileType || 'Unknown'} | Size: {fileInfo?.fileSize ? `${fileInfo.fileSize} Bytes` : 'Unknown'}
                </h2>
            </div>
            {isPasswordProtected && (
                <input
                    type="password"
                    className="p-2 border border-gray-600 rounded-md text-[14px] mt-5 text-center outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 placeholder-gray-500"
                    placeholder="Enter Password To Access"
                    onChange={(e) => setPassword(e.target.value)}
                />
            )}
            <button
                className={`flex gap-2 p-2 rounded-full w-full items-center justify-center mt-5 ${isPasswordProtected ? (fileInfo.password === password ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-500 cursor-not-allowed') : 'bg-blue-600 hover:bg-blue-500'}`}
                disabled={isPasswordProtected && fileInfo.password !== password}
                onClick={handleDownload}
            >
                <Download className="h-4 w-4" />
                <span className="text-[14px]">Download</span>
            </button>
            <span className="text-gray-400 text-[12px] mt-2">*Terms And Conditions Apply</span>
        </div>
    )
}
