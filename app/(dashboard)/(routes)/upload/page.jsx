"use client"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import UploadForm from "./_comp/UploadForm"
export default function Upload() {
  // const { user, isLoading } = useUser();
  // const router = useRouter();
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  // if (!user){
  //   router.push('/sign-in');
  //   return null;
  // }
  return (
    <div className="p-5 px-8 md:px-28">
        <h2 className="text-[20px] text-center m-5 ">Start <strong className="text-secondary">Uploading</strong> Files and <strong>Share It</strong> </h2>
        <UploadForm></UploadForm>
    </div>
  );
}
