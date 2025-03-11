"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowLeftCircle } from "lucide-react";

export const HeaderSectionForPage = ({ title, backButton = false }) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-4 border-b w-full h-20">
      <div className="w-10">
        {backButton && (
          <ArrowLeftCircle
            onClick={() => router.back()}
            className="w-6 h-6"
          />
        )}
      </div>
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="w-10"></div> {/* Espaçador para manter centralizado */}
    </div>
  );
};
