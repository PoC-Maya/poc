'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChangePasswordDialog } from "./change-password-dialog";

export function ChangePasswordButton() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={() => setOpen(true)}
      >
        Change your password
      </Button>
      <ChangePasswordDialog open={open} setOpen={setOpen} />
    </>
  );
}