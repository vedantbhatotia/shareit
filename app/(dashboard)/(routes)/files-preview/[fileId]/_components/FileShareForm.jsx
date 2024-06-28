import { Copy } from "lucide-react";
import { useState } from "react";

export default function FileShareForm({ file, onPasswordSave }) {
  const [password, setPassword] = useState();
  const [isEnabled, setIsEnabled] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(file.shortUrl).then(() => {
      alert('Short URL copied to clipboard!');
    }, () => {
      alert('Failed to copy the URL.');
    });
  };

  return (
    file && (
      <div className="flex flex-col gap-4 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
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
              disabled={password?.length < 3}
              onClick={() => onPasswordSave(password)}
            >
              Save
            </button>
          </div>
        )}
      </div>
    )
  );
}
