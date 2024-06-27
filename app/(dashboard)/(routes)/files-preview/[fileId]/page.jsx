"use client"
import { useEffect } from "react"

export default function FilePreview({params}){
    useEffect(()=>{
        console.log(params?.fileId)
    },[])
    return(
        <div>
            FilePreivew
        </div>
    )
}