import { ProfileForm } from "./components/profile-form";
import { PasswordForm } from "./components/password-form";
import { getUser } from "@/hooks/useUserProfile";
import { HeaderSectionForPage } from "@/components/general/HeaderPage";

export default async function ProfilePage() {
  const { user, profile } = await getUser();

  return (
    <section className="bg-gray-100">
      <HeaderSectionForPage
        title="Informações Pessoais"
        bgColor="bg-primary text-white"
      />

      <div className="space-y-6 max-w-lg mx-auto min-h-[calc(100vh-6rem)] px-6">
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-6">Su perfil</h2>
          <ProfileForm userProfile={profile} />
        </div>

        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-6">Alterar Senha</h2>
          <PasswordForm />
        </div>
      </div>
    </section>
  );
}
