import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/general/Navbar";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>

      <Card>
        <CardHeader>TESTE</CardHeader>
        <CardContent>
          {" "}
          <p>Hello {data.user.email}</p>
        </CardContent>
        <CardFooter>
          <Button>teste</Button>
        </CardFooter>
      </Card>
    </>
  );
}
