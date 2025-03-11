// app/(protected)/profile/page.js
import { getUser } from "@/hooks/useUserProfile";
import { redirect } from "next/navigation";
import { ProfileForm } from "./components/profile-form";
import { ChangePasswordButton } from "./components/change-password-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeaderSectionForPage } from "@/components/general/HeaderPage";
export default async function ProfilePage() {
  const { user, profile } = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container max-w-md">
      
      <HeaderSectionForPage title="Profile" backButton={true} />

      <div className="flex flex-col space-y-6 px-6 py-6">
        <Card className="">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="text-xl">
                {profile?.full_name
                  ? profile.full_name.charAt(0).toUpperCase()
                  : user.email.charAt(0).toUpperCase()}
              </AvatarFallback>
              {profile?.avatar_url && <AvatarImage src={profile.avatar_url} />}
            </Avatar>
            <CardTitle>{profile?.full_name || "Usuário"}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>

          <CardContent>
            <ProfileForm userProfile={profile} userId={user.id} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>
              Atualize suas credenciais de login
            </CardDescription>
          </CardHeader>

          <CardFooter>
            <ChangePasswordButton />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
