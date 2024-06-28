// Files.js
"use client"
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { saveAs } from 'file-saver';
import { app } from '../files-preview/firebaseConfig'; // Adjust path as per your project structure

export default function Files() {
  const { user, isLoading } = useUser();
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    if (!isLoading && user) {
      fetchUserFiles(user.primaryEmailAddress.emailAddress); // Assuming userEmail is the correct field name
    }
  }, [isLoading, user]);

  const db = getFirestore(app);

  const fetchUserFiles = async (userEmail) => {
    try {
      const q = query(collection(db, 'uploadedId'), where('userEmail', '==', userEmail));
      const querySnapshot = await getDocs(q);

      const files = [];
      querySnapshot.forEach((doc) => {
        files.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setUserFiles(files);
    } catch (error) {
      console.error('Error fetching user files:', error);
    }
  };

  const handleDownload = (fileUrl, fileName) => {
    saveAs(fileUrl, fileName);
  };

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Your Uploaded Files</h1>

        {userFiles.length === 0 && (
          <p className="text-gray-300 text-lg">You haven't uploaded any files yet.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {userFiles.map((file) => (
            <FileItem key={file.id} file={file} handleDownload={handleDownload} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FileItem({ file, handleDownload }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-white truncate">{file.fileName}</h2>
      <p className="text-gray-400">{file.fileType}</p>
      <div className="mt-4 flex justify-between items-center">
        <button
          className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
          onClick={() => handleDownload(file.fileUrl, file.fileName)}
        >
          Download
        </button>
      </div>
    </div>
  );
}
