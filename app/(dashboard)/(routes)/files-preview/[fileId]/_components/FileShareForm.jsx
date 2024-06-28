import { Copy, FileType } from "lucide-react";
import { useState } from "react";
import globalapi from "../../../../../globalapi";
import { useUser } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function FileShareForm({ file, onPasswordSave }) {
  const [password, setPassword] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [email, setEmail] = useState("");
  const { user } = useUser();

  const sendEmail = () => {
    const data = {
      emailToSend: email,
      userName: user?.fullName,
      fileName: file?.fileName,
      fileSize: file?.fileSize,
      fileType: file?.fileType,
      shortUrl: file.shortUrl,
    };
    globalapi.sendEmail(data).then(resp => {
      console.log(resp);
      toast.success('Email sent successfully!');
    }).catch(err => {
      console.error(err);
      toast.error('Failed to send email.');
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(file.shortUrl).then(() => {
      toast.success('Short URL copied to clipboard!');
    }, () => {
      toast.error('Failed to copy the URL.');
    });
  };

  return (
    file && (
      <div className="flex flex-col gap-4 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
        <ToastContainer />
        <div>
          <label className="text-[14px] text-gray-400">Short Url</label>
          <div className="flex gap-3 p-2 border border-gray-700 rounded-md items-center">
            <input
              type="text"
              value={file.shortUrl}
              disabled
              className="disabled:text-gray-500 bg-transparent outline-none w-full"
            />
            <Copy
              className="text-gray-400 hover:text-blue-400 cursor-pointer"
              onClick={copyToClipboard}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <input
            type="checkbox"
            onChange={(e) => setIsEnabled(!isEnabled)}
            className="form-checkbox text-blue-500"
          />
          <label className="text-gray-400">Enable Password?</label>
        </div>
        {isEnabled && (
          <div className="flex gap-3 items-center mt-3">
            <div className="border border-gray-700 rounded-md w-full p-2">
              <input
                type="password"
                className="disabled:text-gray-500 bg-transparent w-full outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="p-2 bg-blue-600 text-white rounded-md disabled:bg-gray-500"
              disabled={password.length < 3}
              onClick={() => onPasswordSave(password)}
            >
              Save
            </button>
          </div>
        )}
        <div className="border rounded-md p-3 mt-5">
          <label className="text-[14px] text-gray-500">Send Email</label>
          <div className="border rounded-md p-2">
            <input
              type="email"
              placeholder="example@gmail.com"
              className="bg-transparent outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="p-2 w-full mt-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md hover:from-blue-600 hover:to-blue-800 transition-colors duration-300 shadow-lg transform hover:scale-105"
            onClick={sendEmail}
          >
            Send Email
          </button>
        </div>
      </div>
    )
  );
}
