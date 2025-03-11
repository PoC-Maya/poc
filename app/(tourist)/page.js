import PlaceHolder from "@/components/general/PlaceHolder";
import { HomeIcon } from "lucide-react";

export default async function Home() {
  return (
    <>
      <PlaceHolder
        title={"HOME"}
        message={"Welcome to the Home Page"}
        icon={<HomeIcon className="h-10 w-10"/>}
      />
    </>
  );
}
