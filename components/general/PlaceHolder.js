import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PlaceHolder = ({ icon, title, message, button = null }) => {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="flex flex-col items-center justify-center space-y-6">
        <div className="rounded-full border-4 border-[#1a1a1a] p-4 pl-4 mb-4">
          {icon}
        </div>
        <h3 className="text-2xl text-center font-bold mb-2">{title}</h3>
        <p className="text-center text-gray-600">{message}</p>
        {button}
      </CardContent>
    </Card>
  );
};

export default PlaceHolder;
