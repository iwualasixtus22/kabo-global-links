import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import RequestPage from "./RequestPage";

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login?callbackUrl=/request');
  }

  return <RequestPage />;
}
