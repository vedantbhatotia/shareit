"use client"
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export default function Upload() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!user){
    router.push('/sign-in');
    return null;
  }

  return (
    <>
      <p>UPLOAD</p>
      <UserButton afterSignOutUrl="/" />
    </>
  );
}
