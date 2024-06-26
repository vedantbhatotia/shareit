// export default FilePreview(){
//     return(
//         <>
//         </>
//     )
// 
import { X } from "lucide-react"
import Image from "next/image"
export default function FilePreview({file,removeFile}){
    return(
        <div className="flex items-center gap-2 justify-between mt-5 border rounded-md p-2 border-blue-200">
            <div className="flex items-center p-2">
            <Image src='https://raw.githubusercontent.com/openintents/filemanager/master/promotion/icons/ic_launcher_filemanager_512.png' alt='file' width={50} height={50}></Image>
            <div className="text-left">
                <h2>
                    {File.name}
                </h2>
                <h2 className="text-[12px] text-gray-400">
                    {file?.type}/{(file.size/1024/1024).toFixed(2)}MB
                </h2>
            </div>
            </div>
            <X className="text-red-500 cursor-pointer" onClick={()=>removeFile()}>
            </X>
        </div>
    )
}