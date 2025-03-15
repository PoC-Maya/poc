"use client";

import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import "react-datepicker/dist/react-datepicker.css";

// Registrar o locale português
registerLocale("pt-BR", ptBR);

export function DateSelectionDrawer({
  isOpen,
  onClose,
  onSelect,
  availableDates = [],
  availableTimes = [],
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateSelect = (date) => {
    console.log("Data selecionada:", date);
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onSelect({ date: selectedDate, time: selectedTime });
      onClose();
    }
  };

  const defaultTimes = [
    { id: "1", time: "08:00", label: "08:00" },
    { id: "2", time: "09:00", label: "09:00" },
    { id: "3", time: "10:00", label: "10:00" },
    { id: "4", time: "13:00", label: "13:00" },
    { id: "5", time: "14:00", label: "14:00" },
  ];

  const timesToShow = availableTimes.length > 0 ? availableTimes : defaultTimes;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="sm:max-w-md mx-auto w-full">
          <DrawerTitle className="text-xl font-semibold text-text">
            Selecione a data e horário
          </DrawerTitle>
        </DrawerHeader>

        <div className="py-6 px-4 sm:max-w-md mx-auto w-full">
          <div className="calendar-wrapper font-sans">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateSelect}
              inline
              locale="pt-BR"
              dateFormat="P"
              minDate={new Date()}
              className="w-full rounded-lg border border-border bg-background"
              calendarClassName="font-sans"
              wrapperClassName="w-full"
              // Removendo propriedades que causavam erro
              // Usando formatação correta para customização
              formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
              dayClassName={() =>
                "text-text hover:bg-primary-light transition-colors duration-200"
              }
              // Adicionando mais customizações úteis
              showPopperArrow={false}
              fixedHeight
              todayButton="Hoje"
            />
          </div>

          {selectedDate && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4 text-text">
                Horários disponíveis para {formatDate(selectedDate)}
              </h3>

              <RadioGroup
                value={selectedTime}
                onValueChange={setSelectedTime}
                className="grid grid-cols-3 gap-4"
              >
                {timesToShow.map((timeOption) => (
                  <div
                    key={timeOption.id}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={timeOption.time}
                      id={`time-${timeOption.id}`}
                      className="border-primary text-primary"
                    />
                    <Label
                      htmlFor={`time-${timeOption.id}`}
                      className="flex items-center text-text-muted hover:text-text"
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      {timeOption.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>

        <DrawerFooter className="sm:max-w-md mx-auto w-full pb-8">
          <Button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            Confirmar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
