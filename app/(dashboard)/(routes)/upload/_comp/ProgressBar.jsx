export default function ProgressBar({progress}){
    return(
        <div className="bg-gray-400 w-full h-4 mt-3 rounded-full">
            <div className="h-4 bg-sky-700 rounded-full text-[13px]" style={{width:`${progress}%`}}>
                {`${Number(progress).toFixed(0)}%`}
            </div>
        {/* Progress Bar */}
        </div>
    )
}