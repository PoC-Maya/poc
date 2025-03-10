"use client";

import PlaceHolder from "@/components/general/PlaceHolder";
import { ServerCrash } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-30vh)]">
      <PlaceHolder
        title="Something went wrong"
        message="We're working on it and we'll get it fixed as soon as we can."
        icon={<ServerCrash className="h-10 w-10 text-[#1a1a1a]" />}
      />
    </div>
  );
}
