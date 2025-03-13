import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FloatingButtons({
  step,
  onNext,
  onBack,
  nextText = "Continuar",
  backText = "Volver",
  title = "¿Has leído y entendido todo?",
  description = "Es muy importante para nosotros que hayas leido lo que escribimos porque ahora la cosa se pone chida",
  disabled = false,
}) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      const previousPath =
        step === 1
          ? "/onboarding/registro"
          : `/onboarding/registro/paso-${step - 1}`;
      router.push(previousPath);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg safe-area-inset-bottom p-6 pb-10">
      <div className="pb-6 container max-w-md mx-auto">
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p>{description}</p>
      </div>
      <div
        className={`grid ${
          step === 0 ? "grid-cols-1" : "grid-cols-3"
        } gap-4 max-w-md m-auto`}
      >
        {step > 0 && (
          <div>
            <Button
              variant="ghost"
              className="w-full"
              onClick={handleBack}
              disabled={disabled}
            >
              <ArrowLeft />
              <span className="grow">{backText}</span>
            </Button>
          </div>
        )}
        <div className={step === 0 ? "col-span-1" : "col-span-2"}>
          <Button className="w-full" onClick={onNext} disabled={disabled}>
            <span className="grow">{nextText}</span>
            {disabled ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}