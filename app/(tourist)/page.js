import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  const { data: dataPofile, errorProfile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single() 

  if (errorProfile) {
    redirect('/')
  }

  console.log(dataPofile)

  
  return (
    <>
      <p>Hello {data.user.email}</p>
      <p>Hello {dataPofile?.full_name}</p>
    </>
  );
}
