"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CircleUserRound, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import PlaceHolder from "./PlaceHolder";
import LogoutButton from "./LogoutButton";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Navbar = ({ user }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseDrawer = () => {
    setIsOpen(false);
  };

  const handleOpenDrawer = () => {
    setIsOpen(true);
  };

  return (
    <section className="py-6 pb-2 px-6 shadow overflow-hidden sticky top-0 z-50 bg-background">
      <div className="container">
        <div className="block">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.svg" className="h-7" alt="XploraCancun" />
            </Link>
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <CircleUserRound className="h-10" />
              </DrawerTrigger>
              <DrawerContent className="max-h-screen overflow-hidden">
                <DrawerHeader>
                  <DrawerTitle>
                    <img src="/logo.svg" className="h-7" alt="XploraCancun" />
                  </DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col h-full overflow-y-auto">
                  {!user && (
                    <PlaceHolder
                      icon={<UserCheck className="h-10 w-10 text-[#1a1a1a]" />}
                      title="Sign in to your account "
                      message="Time to start planning your next adventure with our locals"
                      button={
                        <Button
                          onClick={() => {
                            handleCloseDrawer();
                            router.push("/login");
                            router.refresh();
                          }}
                          className="bg-[#00A884] hover:bg-[#008f70] w-full mt-4 btn-primary"
                        >
                          start the adventure
                        </Button>
                      }
                    />
                  )}
                  {user && <TouristMenu />}
                  {/* <ProviderMenu /> */}
                  <Separator className="" />
                  <InstitutionalMenu />
                </div>
                <DrawerFooter>{user && <LogoutButton />}</DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TouristMenu = () => {
  return (
    <Card className="mb-6 border-none shadow-none">
      <CardContent className="p-6 flex flex-col items-start justify-center">
        <ul className="space-y-2 text-gray-700">
          <li>
            <Link href="#" className="block p-3 hover:bg-gray-100 rounded-lg">
              My Reservations
            </Link>
          </li>
          <li>
            <Link href="#" className="block p-3 hover:bg-gray-100 rounded-lg">
              Explore Experiences
            </Link>
          </li>
          <li>
            <Link href="#" className="block p-3 hover:bg-gray-100 rounded-lg">
              Favorites
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block p-3 hover:bg-gray-100 rounded-lg font-semibold text-[#00A884] gap-2"
            >
              Support
            </Link>
          </li>
          <li>
            <Link href="#" className="block p-3 hover:bg-gray-100 rounded-lg">
              Profile
            </Link>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export const ProviderMenu = () => {
  return (
    <Card className="mb-6 border-none shadow-none">
      <CardContent className="p-6 flex flex-col items-start justify-center">
        <ul className="space-y-2 text-gray-700">
          <li>
            <Link href="#" className="block p-3 hover:bg-gray-100 rounded-lg">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="#" className="block p-3 hover:bg-gray-100 rounded-lg">
              My Experiences
            </Link>
          </li>
          <li>
            <Link href="#" className="block p-3 hover:bg-gray-100 rounded-lg">
              Schedule
            </Link>
          </li>
          <li>
            <Link href="#" className="block p-3 hover:bg-gray-100 rounded-lg">
              Orders
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block p-3 hover:bg-gray-100 rounded-lg font-semibold text-[#00A884] gap-2"
            >
              Support
            </Link>
          </li>
          <li>
            <Link href="#" className="block p-3 hover:bg-gray-100 rounded-lg">
              Settings
            </Link>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export const InstitutionalMenu = () => {
  return (
    <Card className="mb-6 border-none shadow-none">
      <CardContent className="p-6 flex flex-col items-start justify-center">
        <ul className="space-y-2 text-gray-500 text-sm">
          <li>
            <Link href="#" className="block p-2 hover:text-gray-700">
              About Us
            </Link>
          </li>
          <li>
            <Link href="#" className="block p-2 hover:text-gray-700">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="#" className="block p-2 hover:text-gray-700">
              Cancellation Policy
            </Link>
          </li>
          <li>
            <Link href="#" className="block p-2 hover:text-gray-700">
              Terms of Use
            </Link>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export { Navbar };
