"use client";

import { createClient } from "@/lib/supabase/client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const LogoutButton = () => {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      router.push("/error");
    }

    router.push("/");
    router.refresh();

    toast.success("Logout successful");
  };

  return (
    <div className="flex flex-col p-2">
      <Separator className="mb-2" />
      <Button
        variant="outline"
        onClick={handleLogout}
        className="bg-[#00A884] hover:bg-[#008f70] w-full"
      >
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
