import { Toaster } from "@/components/ui/sonner";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import "@/styles/shadcn-custom.css";
import { Navbar } from "@/components/general/Navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Poc",
  description: "Action Supabase POC",
};

import { createClient } from "@/lib/supabase/server";

export default async function TouristLayout({ children }) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.log("User not logged in");
  } else {
    console.log("User logged in", data.user);
  }

  return (
    // <AuthProvider initialUser={initialUser}>
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        <Navbar user={data?.user ? data.user : null} />
        {children}
        <Toaster />
      </body>
    </html>
    // </AuthProvider>
  );
}
