import { Toaster } from "@/components/ui/sonner";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import "@/styles/shadcn-custom.css";
import { Navbar } from "@/components/general/Navbar";
import { getUser } from "@/hooks/useUserProfile";
import { MenuWrapper } from "@/components/layout/MenuWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Poc",
  description: "Action Supabase POC",
};

export default async function TouristLayout({ children }) {
  const { user, profile } = await getUser();

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        <MenuWrapper user={user} profile={profile} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
