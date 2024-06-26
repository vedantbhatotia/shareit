"use client"
import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import FilePreview from "./FilePreview";
import ProgressBar from "./ProgressBar";

export default function UploadForm({ func, progress }) {
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const onFieldSelect = (file) => {
    console.log(file);
    if (file && file.size > 2000000) {
      console.log("size greater than 2MB");
      setErrorMsg('Maximum File Upload Size is 2MB');
      return;
    }
    setErrorMsg(null);
    setFile(file);
  };

  useEffect(() => {
    if (progress === 100) {
      setShowAnnouncement(true);
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 3500); // Start fading out after 3.5 seconds
      const timerHide = setTimeout(() => {
        setShowAnnouncement(false);
        setFadeOut(false);
      }, 4000); // Remove after 4 seconds

      return () => {
        clearTimeout(timer);
        clearTimeout(timerHide);
      }; // Cleanup the timers on component unmount or when progress changes
    }
  }, [progress]);

  return (
    <div className="text-center">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX 2MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(event) => onFieldSelect(event.target.files[0])}
          />
        </label>
      </div>
      {errorMsg ? <AlertMsg msg={errorMsg} /> : null}
      {file ? <FilePreview file={file} removeFile={() => setFile(null)} /> : null}
      {progress > 0 ? (
        <ProgressBar progress={progress} />
      ) : (
        <button
          disabled={!file}
          className="p-2 bg-gray-50 text-black w-[30%] rounded-full mt-5 disabled:bg-gray-400"
          onClick={() => func(file)}
        >
          Upload
        </button>
      )}
      {showAnnouncement && <Announcement fadeOut={fadeOut} />}
    </div>
  );
}

function AlertMsg({ msg }) {
  return (
    <div className="p-4 bg-red-500 text-white rounded-lg flex gap-5 items-center">
      <AlertCircle />
      {msg}
    </div>
  );
}

function Announcement({ fadeOut }) {
  return (
    <div className={`fixed bottom-0 p-6 w-[30%] right-0 fade-out ${fadeOut ? 'hidden' : ''}`}>
      <div className="relative flex items-center justify-between gap-4 rounded-lg bg-indigo-600 px-4 py-3 text-white shadow-lg">
        <p className="text-sm font-medium">File Uploaded Successfully!!</p>
      </div>
    </div>
  );
}
