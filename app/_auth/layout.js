import { Toaster } from "@/components/ui/sonner";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import "@/styles/shadcn-custom.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Poc",
  description: "Action Supabase POC",
};

export default async function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
